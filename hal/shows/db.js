function(doc, req) {
  // This is meant only for the database metadata
  if (!doc) {
    // Register the "hal" key with the "application/hal+json" content type
    registerType("hal", "application/hal+json");
    // Handle a request for the "hal" content type
    provides("hal", function() {
      // Send the HTTP headers
      start({
        "headers": {
          // Tell the client we are responding with the "application/hal+json" content type
          "Content-Type": "application/hal+json",
          // Instruct the client to vary caching based on the "Accept" HTTP request header
          "Vary": "Accept"
        }
      });

      // This resource is the database itself, so we're presenting metadata
      var db = req.info;
      // and related links
      db._links = {
        // This is our URI and the title contains the database name
        "self": {
          "href": "/",
          "title": req.info.db_name
        },
        "index": {
          "href": "/_all_docs",
          "title": "All Docs in " + req.info.db_name
        }
      };

      // Send the JSON serialized object
      return JSON.stringify(db);
    });
  }
}
