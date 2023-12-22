const express = require('express');
const router = express.Router();
const mondialRelayController = require('../controllers/mondialRelayController');

router.post('/:codePostal', mondialRelayController.getMondialRelayData);

module.exports = router;
