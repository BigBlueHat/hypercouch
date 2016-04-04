function(doc, req) {
    // Register the "hal" key with the "application/hal+json" content type
    registerType("hal", "application/hal+json");
    // Handle a request for the "hal" content type
    provides("hal", function() {
        // Return the response
        return {
            "headers": {
                // Tell the client we are responding with the "application/hal+json" content type
                "Content-Type": "application/hal+json",
                // Instruct the client to vary caching based on the "Accept" HTTP request header
                "Vary": "Accept"
            },
            // Set the JSON object, seralized as a string, as the response body
            "body": JSON.stringify(doc.resource)
        };
    });
}
