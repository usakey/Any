from scrapy import log
from scrapy.exceptions import NotConfigured, IgnoreRequest


class SizeMiddleware(object):

    """
    This middleware limits the size of downloaded documents. This only filters HEAD requests, as GET
    requests have already downloaded the document before the headers are available.

    This middleware only reads the Content-Length of a response. As such, chunked responses and partial
    responses may not be filtered by this middleware, even if their total size exceeds the size limit.

    Responses without Content-Length are not filtered.
    """

    def __init__(self, crawler):
        if crawler.settings.getint('SIZE_LIMIT') == 0:
            raise NotConfigured()
        self.size_limit = crawler.settings.getint('SIZE_LIMIT')

    @classmethod
    def from_crawler(cls, crawler):
        return cls(crawler)

    def process_response(self, request, response, spider):
        if request.method != 'HEAD':
            return response
        if 'Content-Length' not in response.headers:
            return response
        if int(response.headers['Content-Length']) > self.size_limit:
            spider.log("Filtered too big response. {} ({} > {})".format(
                response, response.headers['Content-Length'], self.size_limit), log.DEBUG)
            raise IgnoreRequest()
        return response