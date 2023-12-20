const express = require('express');
const router = express.Router();
const mondialRelayController = require('../controllers/mondialRelayController');

router.get('/:city', mondialRelayController.getMondialRelayData);

module.exports = router;