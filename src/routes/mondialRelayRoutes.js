const express = require('express');
const router = express.Router();
const mondialRelayController = require('../controllers/mondialRelayController');

router.get('/:codePostal', mondialRelayController.getMondialRelayData,);

module.exports = router;
