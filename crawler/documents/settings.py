# Scrapy settings for documents project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#

from pymongo import MongoClient

BOT_NAME = 'documents'

SPIDER_MODULES = ['documents.spiders']
NEWSPIDER_MODULE = 'documents.spiders'

CONCURRENT_REQUESTS = 10
CONCURRENT_REQUESTS_PER_DOMAIN = 1
ROBOTSTXT_OBEY = True

SIZE_LIMIT = 10*1024*1024  # 10MB
DOWNLOAD_TIMEOUT = 10

DOWNLOADER_MIDDLEWARES = {
    'documents.downloadermiddlewares.SizeMiddleware': 800,
}

ITEM_PIPELINES = {
    'documents.pipelines.DocumentStoringPipeline': 300,
}

SCHEDULER = 'documents.scheduler.Scheduler'

MONGO_DATABASE = MongoClient().documents

# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'documents (+http://www.yourdomain.com)'
