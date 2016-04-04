function(head, req) {
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
        // Add the view metadata
        var docs = head;
        // Add the self link
        docs._links = {
          "self": {
            "href": "/_all_docs",
            "title": "All Docs in " + req.info.db_name
          }
        };
        // CouchDB "rows" (from _view) are essentially HAL partial embedded
        // objects with an "item" link relationship, so we're prepping for that
        docs._embedded = {"item": []};
        var row;
        // Iterate through rows provided by the CouchDB view
        while (row = getRow()) {
          var hal_row = row;
          // Push an item link into the item array
          hal_row._links = {
            "self": {
              // The URI of the item
              "href": "/" + encodeURIComponent(row.key),
              // The title of the item or the id
              "title": row.value.title || row.id
            }
          };
          docs._embedded.item.push(hal_row);
        }
        // Send the JSON object, seralized as a string
        send(JSON.stringify(docs));
    });
}
