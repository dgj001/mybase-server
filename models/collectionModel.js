const mongoose = require('mongoose');
// const Chance = require('chance');

// const chance = new Chance();

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userId: {
    type: String,
  },
  projectId: {
    type: String,
  },
  documentId: {
    type: String,
  },
});

// collectionSchema.pre('save', function(next) {
//   next();
// });

const Collection = mongoose.model('collection', collectionSchema);

module.exports = Collection;
