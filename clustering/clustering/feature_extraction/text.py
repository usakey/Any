from __future__ import unicode_literals, print_function

import numbers
import array

import numpy as np
from scipy import sparse


class MongoCountVectorizer:

    def __init__(self, collection, max_df=1.0, min_df=1, max_features=None, dtype=np.int64):
        self.collection = collection
        self.max_df = max_df
        self.min_df = min_df
        self.max_features = max_features
        if max_features is not None:
            if (not isinstance(max_features, numbers.Integral) or
                    max_features <= 0):
                raise ValueError(
                    "max_features=%r, neither a positive integer nor None"
                    % max_features)
        self.dtype = dtype

    def _count(self, raw_documents):
        pipelines = [{'$group': {'_id': '$wordid', 'count': {'$sum': '$count'}}}, {'$sort': {'count': -1}}]
        if self.max_features is not None:
            pipelines.append({'$limit': self.max_features})
        if raw_documents is not None:
            pipelines.insert(0, {'$match': {'docid': {'$in': raw_documents}}})

        vocabulary = dict([(word['_id'], word_number) for (word_number, word) in enumerate(self.collection.aggregate(pipelines)['result'])])

        query = {}
        if raw_documents is not None:
            query['docid'] = {'$in': raw_documents}
        if self.max_features is not None:
            query['wordid'] = {'$in': vocabulary.keys()}
        document_stats = self.collection.find(query).sort([('docid', 1)])

        values = array.array('i'.encode('ascii'))
        j_indices = array.array('i'.encode('ascii'))
        indptr = array.array('i'.encode('ascii'))
        current_doc = None
        documents = []
        for stat in document_stats:
            if stat['docid'] != current_doc:
                documents.append(stat['docid'])
                indptr.append(len(j_indices))
                current_doc = stat['docid']
            values.append(int(stat['wordfrequence']))
            j_indices.append(vocabulary[stat['wordid']])
        indptr.append(len(j_indices))

        count = sparse.csr_matrix((values, j_indices, indptr),
                                  shape=(len(indptr) - 1, len(vocabulary)),
                                  dtype=self.dtype)

        return documents, vocabulary, count

    def fit(self, raw_documents=None):
        """Learn a vocabulary dictionary of all tokens in the raw documents.

        Parameters
        ----------
        raw_documents : iterable or None
            An iterable which yields mongo documents ids, or None to iterate over all documents in mongo

        Returns
        -------
        self
        """
        self.fit_transform(raw_documents)
        return self

    def fit_transform(self, raw_documents=None):
        """Learn the vocabulary dictionary and return the count vectors.

        This is more efficient than calling fit followed by transform.

        Parameters
        ----------
        raw_documents : iterable or None
            An iterable which yields mongo documents ids, or None to iterate over all documents in mongo

        Returns
        -------
        vectors : array, [n_samples, n_features]
        """

        documents, vocabulary, count = self._count(raw_documents)
        count = count.tocsc()

        return documents, count


if __name__ == '__main__':
    from pymongo import MongoClient
    from sklearn.feature_extraction.text import TfidfTransformer

    client = MongoClient()
    db = client.test
    coll = db.test

    vectorizer = MongoCountVectorizer(coll)
    transformer = TfidfTransformer()
    data = vectorizer.fit_transform()
    print(data)
    data = transformer.fit_transform(data)
    print(data)