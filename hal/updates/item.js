function(doc, req) {
    // Handle document deletions
    if ("DELETE" == req.method) {
        // Set the special CouchDB "_deleted" field to true, thus deleting the document
        doc._deleted = true;
        return [
            doc,
            {
                "headers": {
                    // Tell the client we are responding with the "application/hal+json" content type
                    "Content-Type": "application/hal+json",
                    // Instruct the client to vary caching based on the "Accept" HTTP request header
                    "Vary": "Accept"
                },
                // Set a response body that indicates that the deletion was successful
                "body": JSON.stringify({"ok": true})
            }
        ];
    }
    // Vary the response based on the "Content-Type" HTTP request header
    switch (req.headers["Content-Type"]) {
        // Handle a request for the "application/hal+json" content type
        case "application/hal+json":
            if (doc) {
                // Update the existing document, if there is one
                updatedDoc = doc;
            } else {
                // Create a new document, if there is no existing document
                var updatedDoc = {};                
            }
            // Set the documents "resource" field to the value of the request body
            updatedDoc.resource = JSON.parse(req.body);
            if (!updatedDoc._id) {
                if (req.id) {
                    // Set the document ID to that in the request, if specified
                    updatedDoc._id = req.id;
                } else if (req.uuid) {
                    // Use the CouchDB supplied UUID for the document's ID
                    updatedDoc._id = req.uuid;
                }
            }
            if (req.query.collection) {
                // Set the parent collection, if specified
                updatedDoc.collection = req.query.collection;
            }
            if (!updatedDoc.resource._links) {
                // Create an empty "_links" object, if it doesn't exist
                updatedDoc.resource._links = {};
            }
            // Set the resource's "self" link
            updatedDoc.resource._links.self = { "href": "/api/" + updatedDoc._id };
            // Set the resources "edit" link
            updatedDoc.resource._links.edit = { "href": "/api/" + updatedDoc._id + "/edit" };
            if (updatedDoc.collection) {
                // Set the resources "collection" link, if it has a parent collection
                updatedDoc.resource._links.collection = { "href": "/api/" + updatedDoc.collection };
            } else {
                // Set the resources "up" link if it does not have a parent collection
                updatedDoc.resource._links.up = { "href": "/api/" };
            }
            // Return the repsonse
            return [
                // The updated document for CouchDB to process
                updatedDoc,
                {
                    "headers": {
                        // Tell the client the location of the resource
                        "Location": updatedDoc.resource._links.self.href,
                        // Tell the client we are responding with the "application/hal+json" content type
                        "Content-Type": "application/hal+json",
                        // Instruct the client to vary caching based on the "Accept" HTTP request header
                        "Vary": "Accept"
                    },
                    // Set the updated document's resource, serialized as a string, as the response body
                    "body": JSON.stringify(updatedDoc.resource)
                }
            ];
         // Handle a request for an unknown content type
        default:
            return [
                null,
                {
                    // Unsupported Media Type
                    "code": 415,
                    "headers": {
                        // Tell the client we are responding with the "text/plain;charset=utf-8" content type
                        "Content-Type": "text/plain;charset=utf-8",
                        // Instruct the client to vary caching based on the "Accept" HTTP request header
                        "Vary": "Accept"
                    },
                    // Set a response body with a human-readable message
                    "body": JSON.stringify({"error":"unsupported_media_type","reason":"The media type sent is not supported."})
                }
            ];
    }
}
