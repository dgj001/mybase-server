const kebabCase = require('lodash/kebabCase');
const Chance = require('chance');

const Project = require('../models/projectModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

const chance = new Chance();

exports.post = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new AppError('Name must not be empty', 500));
  }
  
  const result = await findTarget(name);
  if (!result.available) {
    return next(new AppError('Target not available', 500));
  }
  req.body.target = result.target;

  const createOne = factory.createOne(Project);
  createOne(req, res, next);
});

exports.get = factory.getOne(Project);

exports.update = factory.updateOne(Project);

exports.delete = factory.deleteOne(Project);

exports.getAll = factory.getAll(Project);

exports.findAvailableTarget = catchAsync(async (req, res, next) => {
  const { candidateName } = req.body;
  if (!candidateName) {
    return next(new AppError('Name must not be empty', 500));
  }
  
  const targetResult = await findTarget(candidateName);

  res.status(200).json({
    status: 'success',
    ...targetResult,
  });
});

async function findTarget(candidateName) {
  let targetBase = kebabCase(candidateName);
  
  let attempts = 1;
  let target = targetBase;
  let project = await Project.findOne({ target });
  while (project && attempts < 10) {
    target = targetBase + '-' + chance.string({ length: 5, casing: 'lower', alpha: true, numeric: true });
    project = await Project.findOne({ target });
  }

  const foundTarget = (project === null);  
  return {
    available: foundTarget,
    target: foundTarget ? target : null,
  };
}