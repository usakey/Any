from datetime import datetime

from scrapy.utils.reqser import request_to_dict, request_from_dict
from scrapy import log
import pymongo


class Scheduler(object):

    def __init__(self, mongo_database, logunser=False, stats=None):
        self.database = mongo_database
        self.logunser = logunser
        self.stats = stats

    @classmethod
    def from_crawler(cls, crawler):
        settings = crawler.settings
        logunser = settings.getbool('LOG_UNSERIALIZABLE_REQUESTS')
        mongo_database = settings.get('MONGO_DATABASE')
        return cls(mongo_database, logunser, crawler.stats)

    def has_pending_requests(self):
        request = self.collection.find_one({'last_downloaded': {'$exists': False}})
        return request is not None

    def open(self, spider):
        self.spider = spider
        self.collection = self.database['requests.{}'.format(spider.name)]
        self.collection.ensure_index('url')
        self.collection.ensure_index([('last_downloaded', pymongo.ASCENDING), ('priority', pymongo.DESCENDING)])

    def close(self, reason):
        pass

    def enqueue_request(self, request):
        if not request.dont_filter:
            if self.collection.find_one({'url': request.url, 'method': request.method}) is not None:
                return
        try:
            self.collection.insert(request_to_dict(request, self.spider))
            self.stats.inc_value('scheduler/enqueued', spider=self.spider)
        except ValueError as e:  # non serializable request
            if self.logunser:
                log.msg(format="Unable to serialize request: %(request)s - reason: %(reason)s",
                        level=log.ERROR, spider=self.spider,
                        request=request, reason=e)
            return

    def next_request(self):
        request = self.collection.find_and_modify({'last_downloaded': {'$exists': False}},
                                                  sort=[('priority', pymongo.DESCENDING)],
                                                  update={'$set': {'last_downloaded': datetime.today()}})
        if request:
            request = request_from_dict(request, spider=self.spider)
            self.stats.inc_value('scheduler/dequeued', spider=self.spider)
        return request

    def __len__(self):
        return self.collection.find({'last_downloaded': {'$exists': False}}).count()