const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.API_URL;
const ENSEIGNE = process.env.ENSEIGNE;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PAYS = process.env.PAYS;

const createShippingLabel = async (shipmentData) => {
    try {
        const response = await axios.post(
            `${API_URL}/WSI2_CreationEtiquette`,
            {
                Enseigne: ENSEIGNE,
                // Ajoutez d'autres données de l'expédition ici
                ...shipmentData,
            },
            {
                headers: {
                    PrivateKey: PRIVATE_KEY,
                    Pays: PAYS,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(`Error creating shipping label: ${error.message}`);
    }
};

module.exports = {
    createShippingLabel,
};
