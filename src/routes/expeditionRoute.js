const express = require('express');
const router = express.Router();
const expeditionController = require('../controllers/expeditionController');

router.get('/create', expeditionController.createShippingLabel);

module.exports = router;
