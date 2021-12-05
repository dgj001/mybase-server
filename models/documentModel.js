const mongoose = require('mongoose');
const Chance = require('chance');

const chance = new Chance();

const documentSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  userId: {
    type: String,
  },
  projectId: {
    type: String,
    required: true,
  },
});

documentSchema.pre('save', function(next) {
  if (this.isNew && !this.id) {
    this.id = chance.string({ length: 16, casing: 'lower', alpha: true, numeric: true });
  }
  next();
});

const Document = mongoose.model('document', documentSchema);

module.exports = Document;
