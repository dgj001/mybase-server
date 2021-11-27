const mongoose = require("mongoose");

// Since data is arbitrary, use empty schema
// A better solution would be to use the mongodb driver
// directly, but that is beyond the scope of this project
const DataSchema = new mongoose.Schema({},
  { strict: false }
);

const Data = mongoose.model('data', DataSchema);

module.exports = Data;