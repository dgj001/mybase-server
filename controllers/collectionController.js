const Collection = require('../models/collectionModel');

exports.post = async (req, res) => {
  const target = req.params.id;
  const { collection, documentId, payload } = req.body;

  // Find collection (create if needed)
  let col = await Collection.findOne({
    target,
    name: collection,
  });
  if (!col) {
    col = await Collection.create({
      target,
      name: collection,
      documents: [ payload ],
    });
  }
  res.status(201).json({
    status: 'success',
    document: payload
  });

  // If document exists, update; otherwise, insert
  const document = col.documents[documentId];
  if (document) {
    document
  }
}

exports.get = (req, res) => {
  console.log(req.params.id)
  res.status(200).json({
    status: 'success',
    temp: 'get junk',
  });
}
