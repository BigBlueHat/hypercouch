function(doc, req) {
  // TODO: do something good if doc is empty

  // Register the "hal" key with the "application/hal+json" content type
  registerType("hal", "application/hal+json");
  // Handle a request for the "hal" content type
  provides("hal", function() {
    var hal = doc;
    // TODO: turn CouchDB _revisions identifiers into "previous-version" links
    // http://tools.ietf.org/html/rfc5829
    delete hal._revisions;
    hal._links = {
      "self": {
        "href": "/" + doc._id,
        "title": doc.title || doc._id
      },
      "collection": {
        "href": "/",
        "title": req.info.db_name
      }
    };

    // Return the response
    return {
      "headers": {
        // Tell the client we are responding with the "application/hal+json" content type
        "Content-Type": "application/hal+json",
        // Instruct the client to vary caching based on the "Accept" HTTP request header
        "Vary": "Accept"
      },
      // Set the JSON object, seralized as a string, as the response body
      "body": JSON.stringify(hal)
    };
  });
}
