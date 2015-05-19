import urllib
import urlparse

from scrapy.utils.url import parse_url, safe_url_string, _unquotepath


def canonicalize_url(url, keep_blank_values=True, keep_fragments=False,
        encoding=None):
    """Canonicalize the given url by applying the following procedures:

    - sort query arguments, first by key, then by value
    - percent encode paths and query arguments. non-ASCII characters are
      percent-encoded using UTF-8 (RFC-3986)
    - normalize all spaces (in query arguments) '+' (plus symbol)
    - normalize percent encodings case (%2f -> %2F)
    - remove query arguments with blank values (unless keep_blank_values is True)
    - remove duplicate query arguments
    - remove fragments (unless keep_fragments is True)

    The url passed can be a str or unicode, while the url returned is always a
    str.

    This builds on scrapy.utils.url.canonicalize_url to remove duplicate arguments.
    """

    scheme, netloc, path, params, query, fragment = parse_url(url)
    keyvals = urlparse.parse_qsl(query, keep_blank_values)
    keyvals = list(set(keyvals))
    keyvals.sort()
    query = urllib.urlencode(keyvals)
    path = safe_url_string(_unquotepath(path)) or '/'
    fragment = '' if not keep_fragments else fragment
    return urlparse.urlunparse((scheme, netloc.lower(), path, params, query, fragment))