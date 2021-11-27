const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findOneAndDelete({
    _id: req.params.id,
    userId: req.user,
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
  });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findOneAndUpdate({
      _id: req.params.id,
      userId: req.user,
    }, 
    req.body, {
    new: true,
    runValidators: true
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    document: doc
  });
});

exports.createOne = (Model) => catchAsync(async (req, res, next) => {
  const newDoc = await Model.create({
    ...req.body,
    userId: req.user,
  });
  res.status(201).json({
    status: 'success',
    document: newDoc
  });
});

exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
  let query = Model.findOne({ 
    _id: req.params.id,
    userId: req.user,
  });
  if (popOptions) {
    query = query.populate(popOptions);
  }
  const doc = await query;

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    document: doc
  });
});

exports.getAll = (Model, popOptions) => catchAsync(async (req, res, next) => {
  console.log(req.user)
  let filter = {
    userId: req.user
  };

  // EXECUTE QUERY
  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  let docs;
  if (popOptions) {
    docs = await features.query.populate(popOptions);
  } else {
    docs = await features.query;
  }

  // SEND RESULTS
  res.status(200).json({
    status: 'success',
    results: docs.length,
    documents: docs
  });
});