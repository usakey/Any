# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import pymongo
from gridfs import GridFS
from scrapy import log
from scrapy.http import Request
from scrapy.exceptions import IgnoreRequest, NotConfigured
from scrapy.contrib.pipeline.media import MediaPipeline

from documents.items import DocumentItem


class DocumentStoringPipeline(MediaPipeline):

    def __init__(self, settings):
        if settings.get('MONGO_DATABASE') is None:
            raise NotConfigured()
        self.database = settings.get('MONGO_DATABASE')
        self.gridfs = GridFS(self.database)
        self.links = self.database.links
        self.links.ensure_index([('file', pymongo.ASCENDING), ('referer', pymongo.ASCENDING),
                                 ('number', pymongo.ASCENDING)])
        super(DocumentStoringPipeline, self).__init__()

    @classmethod
    def from_settings(cls, settings):
        return cls(settings)

    def media_failed(self, failure, request, info):
        if not isinstance(failure.value, IgnoreRequest):
            referer = request.headers.get('Referer')
            log.msg(format='File (unknown-error): Error downloading '
                           '%(request)s referred in '
                           '<%(referer)s>: %(exception)s',
                    level=log.WARNING, spider=info.spider, exception=failure.value,
                    request=request, referer=referer)

    def media_downloaded(self, response, request, info):
        referer = request.headers.get('Referer')

        if response.status != 200:
            log.msg(
                format='File (code: %(status)s): Error downloading document from %(request)s referred in <%(referer)s>',
                level=log.WARNING, spider=info.spider,
                status=response.status, request=request, referer=referer)
            return

        if not response.body:
            log.msg(
                format='File (empty-content): Empty document from %(request)s referred in <%(referer)s>: no-content',
                level=log.WARNING, spider=info.spider,
                request=request, referer=referer)
            return

        log.msg(format='File: Downloaded document from %(request)s referred in <%(referer)s>',
                level=log.DEBUG, spider=info.spider, request=request, referer=referer)

        f = self.gridfs.new_file(content_type=request.meta['item']['mime_type'], url=request.url)
        try:
            f.write(response.body)
        finally:
            f.close()
        info.spider.crawler.stats.inc_value('downloaded_documents', spider=info.spider)
        info.spider.crawler.stats.inc_value('downloaded_documents/bytes_downloaded',
                                            len(response.body),
                                            spider=info.spider)
        self.store_link(info, request.meta['item'], f._id)

    def get_media_requests(self, item, info):
        if not isinstance(item, DocumentItem):
            return
        if self.gridfs.exists({'url': item['url']}):
            f = self.gridfs.get_last_version(url=item['url'])
            self.store_link(info, item, f._id)
        else:
            request = Request(item['url'])
            request.meta['item'] = item
            return [request]

    def store_link(self, info, item, file_id):
        if self.links.find({'file': file_id, 'referer': item['referer'], 'number': item['link_number']}).count() > 0:
            return
        self.links.insert({'file': file_id,
                           'referer': item['referer'],
                           'text': item['link_text'],
                           'number': item['link_number'],
                           'fragment': item['fragment'],
                           'nofollow': item['nofollow']})
        info.spider.crawler.stats.inc_value('links_collected', spider=info.spider)