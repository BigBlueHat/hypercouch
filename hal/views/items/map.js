function(doc) {
    // Emit a compound key containing the document ID and the number 0
    // Emit the document's resource as the value
    emit([doc._id, 0], doc.resource);
    // Does the document have a parent collection?
    if (doc.collection) {
        // Emit a compound key containing the parent collection's document ID and the number 1
        // Emit the document's resource as the value
        emit([doc.collection, 1], doc.resource);
    }
}
