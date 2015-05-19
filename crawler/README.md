# Crawler #
This part of the project crawls websites to gather documents.

The documents are stored in mongodb, using the database configured in settings.py.

Mime types to download are defined in spiders/document.py.

Start urls are obtained from the collection start_urls in the mongo database, using the url field.
Once a start url has been used, it is deleted from the database.