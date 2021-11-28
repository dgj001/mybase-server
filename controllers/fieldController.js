const Field = require('../models/fieldModel');
const factory = require('./handlerFactory');

exports.post = factory.createOne(Field);

exports.get = factory.getOne(Field);

exports.update = factory.updateOne(Field);

exports.delete = factory.deleteOne(Field);

exports.getAll = factory.getAll(Field);