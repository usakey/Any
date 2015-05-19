from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from scrapy.http import Request
from scrapy.spider import Spider

from documents.items import DocumentItem
from documents.utils import canonicalize_url


def _get_mime_type(response):
    if 'Content-Type' not in response.headers:
        return 'application/octet-stream'
    return response.headers['Content-Type'].split(';', 1)[0]


class DocumentSpider(Spider):

    name = "documents"

    download_mime_types = ('application/pdf',
                           'application/msword',
                           'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                           'application/vnd.ms-excel',
                           'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                           'application/vnd.ms-powerpoint',
                           'application/vnd.openxmlformats-officedocument.presentationml.presentation')

    link_extractor = SgmlLinkExtractor(deny_extensions=tuple())

    def __init__(self, *args, **kwargs):
        super(DocumentSpider, self).__init__(*args, **kwargs)
        self.item_id = 0

    def start_requests(self):
        db = self.settings.get('MONGO_DATABASE')
        requests = db.start_urls.find()
        for request in requests:
            yield Request(request['url'])
            db.start_urls.remove(request)

    def parse(self, response):
        if response.request.method == 'HEAD':
            mime_type = _get_mime_type(response)
            if mime_type in ('text/html', 'application/xhml+xml'):
                yield Request(response.request.url)
            elif mime_type in self.download_mime_types:
                yield DocumentItem(url=response.url, referer=response.meta['referer'],
                                   link_text=response.meta['link_text'],
                                   link_number=response.meta['link_number'],
                                   fragment=response.meta['link_fragment'],
                                   nofollow=response.meta['link_nofollow'],
                                   mime_type=mime_type)
        else:
            for link_number, link in enumerate(self.link_extractor.extract_links(response)):
                request = Request(canonicalize_url(link.url), method='HEAD')
                request.meta['link_text'] = link.text
                request.meta['link_fragment'] = link.fragment
                request.meta['link_nofollow'] = link.nofollow
                request.meta['link_number'] = link_number
                request.meta['referer'] = response.url
                yield request
