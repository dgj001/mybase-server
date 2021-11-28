const Project = require('../models/projectModel');
const factory = require('./handlerFactory');

exports.post = factory.createOne(Project);

exports.get = factory.getOne(Project);

exports.update = factory.updateOne(Project);

exports.delete = factory.deleteOne(Project);

exports.getAll = factory.getAll(Project);