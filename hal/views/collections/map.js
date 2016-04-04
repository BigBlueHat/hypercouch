function(doc) {
    // Does the document not have a parent collection?
    if (!doc.collection) {
        // Emit the document ID as the key and the document's resource as the value
        emit(doc._id, doc.resource);
    }
}
