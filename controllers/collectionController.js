const Collection = require('../models/collectionModel');
const factory = require('./handlerFactory');

exports.post = factory.createOne(Collection);

exports.get = factory.getOne(Collection);

exports.update = factory.updateOne(Collection);

exports.delete = factory.deleteOne(Collection);

exports.getAll = factory.getAll(Collection);