const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A project must have a name'],
    trim: true,
    maxlength: [40, 'A project name must be <= 40 characters'],
    minlength: [1, 'A project name must be >= 1 characters']
  },
  userId: {
    type: String,
  },
  target: {
    type: String,
    length: 16,
  },
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
