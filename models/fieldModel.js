const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A field must have a name'],
    trim: true,
    maxlength: 32,
    minlength: 1
  },
  value: {
    type: String,
  },
  userId: {
    type: String,
  },
  projectId: {
    type: String,
  },
});

const Field = mongoose.model('field', fieldSchema);

module.exports = Field;
