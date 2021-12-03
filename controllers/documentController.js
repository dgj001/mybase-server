const Document = require('../models/documentModel');
const factory = require('./handlerFactory');

exports.post = factory.createOne(Document);

exports.get = factory.getOne(Document);

exports.update = factory.updateOne(Document);

exports.delete = factory.deleteOne(Document);

exports.getAll = factory.getAll(Document);