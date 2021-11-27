const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController')

router.route('/')
  .get(authController.protect, projectController.getAll)
  .post(authController.protect, projectController.post);

router.route('/:id')
  .get(authController.protect, projectController.get)
  .patch(authController.protect, projectController.update)
  .delete(authController.protect, projectController.delete);

module.exports = router;