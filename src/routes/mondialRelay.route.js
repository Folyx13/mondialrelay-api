const express = require('express');
const router = express.Router();
const mondialRelayController = require('../controllers/mondialRelay.controller');

router.get('/:codePostal', mondialRelayController.getDataByPostalCode);
module.exports = router;
