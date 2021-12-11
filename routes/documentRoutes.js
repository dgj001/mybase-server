const express = require('express');
const router = express.Router();

const documentController = require('../controllers/documentController');
const authController = require('../controllers/authController')

router.route('/')
  .get(authController.protect, documentController.getAll)
  .post(authController.protect, documentController.post);

router.route('/is-available')
  .post(authController.protect, documentController.isAvailable);

router.route('/:id')
  .get(authController.protect, documentController.get)
  .patch(authController.protect, documentController.update)
  .delete(authController.protect, documentController.delete);

module.exports = router;