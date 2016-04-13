# HyperCouch

[![GitHub license](https://img.shields.io/github/license/bigbluehat/hypercouch.svg?style=flat-square)](http://github.com/bigbluehat/hypercouch)
[![Patreon](https://img.shields.io/badge/donate-patreon-orange.svg?style=flat-square)](https://www.patreon.com/BigBlueHat)

HyperCouch is (to be) a collection of CouchApps that enable various
Hypermedia APIs within an [Apache CouchDB](http://couchdb.apache.org/) database.

The goal is to provide *browse-able* alternate APIs for CouchDB.

## Hypermedia Application Language (HAL) - `application/hal+json`

Bradley Holt began a
[CouchDB Hypermedia API](https://github.com/bradley-holt/couchdb-hypermedia-api/)
project back in 2012 which worked on `collection` and `resource` documents.

The variant included here is based on that (New BSD licensed) code, but
includes a default collection which *is* the primary index of the current
database.

### Usage

1. Setup a `hypercouch.dev` (or whatever you like) in your `/etc/hosts` file pointing to the IP
of your CouchDB or to a Cloudant account.
2. Add a `vhosts` entry to your CouchDB config pointing to `/hypercouch/_design/hal/_rewrite/`

```
$ couchapp push hal/ http://{user}:{pass}@localhost:5984/hypercouch
```

3. Use the
[HAL Browser](http://haltalk.herokuapp.com/explorer/browser.html#http://hypercouch.dev:5984)
to...browse it!

## Collection+JSON

TBD

## Siren

TBD

## JSON API

TBD


### License

Apache 2.0 License
