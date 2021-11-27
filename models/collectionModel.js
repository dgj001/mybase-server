const mongoose = require("mongoose");

// Since data is arbitrary, use empty schema
// A better solution would be to use the mongodb driver
// directly, but that is beyond the scope of this project
const CollectionSchema = new mongoose.Schema({
  target: {
    type: String,
    required: true,
    length: 16,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32,
  },
  documents: {
    type: Object,
  },
},
{ strict: false }
);

const Data = mongoose.model('collection', CollectionSchema);

module.exports = Data;