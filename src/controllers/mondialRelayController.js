const mondialRelayService = require('../services/mondialRelayService');

const getMondialRelayData = async (req, res) => {
    try {
        const { codePostal } = req.params;

        const jsonData = await mondialRelayService.getMondialRelayData(codePostal);
        res.json({ data: jsonData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMondialRelayData,
};
