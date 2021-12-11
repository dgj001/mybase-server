const Document = require('../models/documentModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.post = factory.createOne(Document);

exports.get = factory.getOne(Document);

exports.update = factory.updateOne(Document);

exports.delete = factory.deleteOne(Document);

exports.getAll = factory.getAll(Document);

exports.isAvailable = catchAsync(async (req, res, next) => {
  const { collectionId, id } = req.body;
  if (!collectionId || !id) {   
    return next(new AppError('Must specify collection id and id', 500));
  }

  const doc = await Document.findOne({ collectionId, id });
  
  res.status(200).json({
    status: 'success',
    isAvailable: (doc === null),
  });
});