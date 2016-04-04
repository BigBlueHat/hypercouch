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
        // Create a JSON object to send to the client
        var resource = {};
        var row;
        // Iterate through rows provided by the CouchDB view
        while (row = getRow()) {
            // Is it a parent collection row or a child row?
            if (0 == row.key[1]) {
                // Overwrite the resource variable with the parent collection resource
                resource = row.value;
                // Create an empty array within which to put item links
                resource._links.item = [];
            } else if (1 == row.key[1] && resource._links) {
                // Push an item link into the item array
                resource._links.item.push({
                    // The URI of the item
                    "href": "/api/" + row.id,
                    // The title of the item
                    "title": row.value.title
                });
            }
        }
        // Send the JSON object, seralized as a string
        send(JSON.stringify(resource));
    });
}
