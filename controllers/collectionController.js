const Collection = require('../models/collectionModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.post = factory.createOne(Collection);

exports.get = factory.getOne(Collection);

exports.update = factory.updateOne(Collection);

exports.delete = factory.deleteOne(Collection);

exports.getAll = factory.getAll(Collection);

exports.isAvailable = catchAsync(async (req, res, next) => {
  const { projectId, name } = req.body;
  if (!projectId || !name) {   
    return next(new AppError('Must specify project id and name', 500));
  }

  const col = await Collection.findOne({ projectId, name });
  
  res.status(200).json({
    status: 'success',
    isAvailable: (col === null),
  });
});