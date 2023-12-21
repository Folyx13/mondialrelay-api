const express = require('express');
const router = express.Router();
const expeditionController = require('../controllers/expeditionController');

router.post('/create', expeditionController.createShippingLabel);

module.exports = router;
