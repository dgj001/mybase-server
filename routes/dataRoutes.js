const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataController');
const authController = require('../controllers/authController')

router.route('/:id')
  .post(authController.protect, dataController.post)
  .get(authController.protect, dataController.get)

module.exports = router;