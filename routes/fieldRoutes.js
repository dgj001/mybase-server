const express = require('express');
const router = express.Router();

const fieldController = require('../controllers/fieldController');
const authController = require('../controllers/authController')

router.route('/')
  .get(authController.protect, fieldController.getAll)
  .post(authController.protect, fieldController.post)
  .delete(authController.protect, fieldController.deleteAll);

router.route('/:id')
  .get(authController.protect, fieldController.get)
  .patch(authController.protect, fieldController.update)
  .delete(authController.protect, fieldController.delete);

module.exports = router;