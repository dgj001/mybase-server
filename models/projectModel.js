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
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  // users: [
  //   {
  //     user: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: 'User'
  //     },
  //     status: {
  //       type: String,
  //       enum: ['INVITED', 'ACTIVE', 'DELETED'],
  //       default: 'INVITED'
  //     },      
  //     role: {
  //       type: String,
  //       enum: ['STUDENT', 'INSTRUCTOR', 'ADMIN', 'SUPER_ADMIN'],
  //       default: 'STUDENT'
  //     },
  //   }
  // ],
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
