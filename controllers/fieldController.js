const catchAsync = require('./../utils/catchAsync');
const Field = require('../models/fieldModel');
const factory = require('./handlerFactory');

exports.post = factory.createOne(Field);

exports.get = factory.getOne(Field);

exports.update = factory.updateOne(Field);

exports.delete = factory.deleteOne(Field);

exports.deleteAll = catchAsync(async (req, res, next) => {
  const { documentId } = req.query;
  await Field.deleteMany({ documentId }, (err, result) => {
    if (err) {
      return next(err);
    } else {
      res.status(204).json({
        status: 'success',
        count: result.deletedCount
      });
    }
  });
});

exports.getAll = factory.getAll(Field);