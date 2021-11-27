const express = require('express');
const router = express.Router();

const collectionController = require('../controllers/collectionController');
const authController = require('../controllers/authController')

router.route('/:id')
  .post(authController.protect, collectionController.post)
  .get(authController.protect, collectionController.get)

module.exports = router;