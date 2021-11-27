const Data = require('../models/dataModel');

exports.post = async (req, res) => {
  console.log(req.params.id)
  console.log(req.body)

  const newDoc = await Data.create({
    ...req.body,
  });
  res.status(201).json({
    status: 'success',
    document: newDoc
  });
}

exports.get = (req, res) => {
  console.log(req.params.id)
  res.status(200).json({
    status: 'success',
    temp: 'get junk',
  });
}
