const mongoose = require('mongoose');
const Chance = require('chance');

const chance = new Chance();

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A project must have a name'],
    trim: true,
    maxlength: [40, 'A project name must be <= 40 characters'],
    minlength: [1, 'A project name must be >= 1 characters']
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  target: {
    type: String,
    length: 16,
  },
});

projectSchema.pre('save', function(next) {
  if (this.isNew) {
    this.target = chance.string({ length: 16, casing: 'lower', alpha: true, numeric: true });
    next();
  }
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
