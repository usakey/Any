from __future__ import unicode_literals, print_function

import argparse
import time

from pymongo import MongoClient
from sklearn.cluster import MiniBatchKMeans
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import Normalizer

from clustering.feature_extraction.text import MongoCountVectorizer


parser = argparse.ArgumentParser()
parser.add_argument('n_clusters', type=int, help='number of clusters')
parser.add_argument('--language', type=str, default=None, help='document language')
parser.add_argument('--max-dist', type=float, default=None, help='max distance to cluster center')
parser.add_argument('--features', type=int, default=10000, help='maximum number of features to extract from text')
parser.add_argument('--database', type=str, default='db_index_normal', help='database to connect to')
parser.add_argument('--lsa', type=int, default=None, help='lsa feature number')

args = parser.parse_args()

client = MongoClient()
database = client[args.database]
collection = database.wordlocation

documents = None
if args.language:
    documents = [doc['_id'] for doc in database.doclist.find({'language': args.language}, fields=['_id'])]

t0 = time.time()
vectorizer = MongoCountVectorizer(collection, max_features=args.features)
transformer = TfidfTransformer()
documents, data = vectorizer.fit_transform(documents)
data = transformer.fit_transform(data)
if args.lsa:
    lsa = TruncatedSVD(args.lsa)
    data = lsa.fit_transform(data)
    data = Normalizer(copy=False).fit_transform(data)

print("Finished building matrix ({}x{}, {} elements). Time taken: {}".format(data.shape[0], data.shape[1], data.nnz, time.time() - t0))
t0 = time.time()

clustering_complete = False

n_clusters = args.n_clusters

while not clustering_complete:

    km = MiniBatchKMeans(n_clusters=n_clusters)
    res = km.fit_transform(data)

    clustering_complete = True

    if args.max_dist:
        for i in xrange(res.shape[0]):
            m = res.item(i, 0)
            for j in xrange(1, res.shape[1]):
                if res.item(i, j) < m:
                    m = res.item(i, j)
            if m > args.max_dist:
                clustering_complete = False
                n_clusters += 1
                print('Distance too big ({}). Increasing cluster number to {}'.format(m, n_clusters))
                break
print("Clustering complete. Time taken: {}".format(time.time() - t0))

with open('cluster.properties', 'w') as f:
    for docid, cluster in zip(documents, km.labels_):
        f.write('{docid}={cluster}\n'.format(docid=docid, cluster=cluster))
        database.doclist.update({'_id': docid}, {'$set': {'cluster': int(cluster), 'clustered': True}})

