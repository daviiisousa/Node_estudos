const express = require('express');
const router = express.Router();
const addressController = require('../controllers/AddressController');

router.post('/', addressController.createAddress)

module.exports = router;