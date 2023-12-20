const mondialRelayService = require('../services/mondialRelayService');

async function getMondialRelayData(req, res) {
    try {
        const { city } = req.params;
        const jsonData = await mondialRelayService.getMondialRelayData(city);
        res.json({ data: jsonData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getMondialRelayData,
};
