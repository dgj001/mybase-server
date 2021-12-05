const express = require('express');
const router = express.Router();

const collectionController = require('../controllers/collectionController');
const authController = require('../controllers/authController')

router.route('/')
  .get(authController.protect, collectionController.getAll)
  .post(authController.protect, collectionController.post);

router.route('/:id')
  .get(authController.protect, collectionController.get)
  .patch(authController.protect, collectionController.update)
  .delete(authController.protect, collectionController.delete);

module.exports = router;