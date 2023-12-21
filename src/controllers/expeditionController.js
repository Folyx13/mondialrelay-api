const mondialRelayService = require('../services/expeditionService');

const expeditionController = {
    createShippingLabel: async (req, res) => {
        try {
            const shipmentData = req.body;
            const shippingLabel = await mondialRelayService.createShippingLabel(shipmentData);
            res.status(200).json({ shippingLabel });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = expeditionController;
