const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.API_URL;
const ENSEIGNE = process.env.ENSEIGNE;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PAYS = process.env.PAYS;

const createShippingLabel = async (shipmentData) => {
    try {
        const response = await axios.post(
            `${API_URL}`,
            `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://www.mondialrelay.fr/webservice/">
                <soap:Body>
                    <WSI2_CreationEtiquette>
                        <Enseigne>${ENSEIGNE}</Enseigne>
                        <Pays>${PAYS}</Pays>
                        <CP>${codePostal}</CP>
                        <Security>${securityParameter}</Security>
                    </WSI2_CreationEtiquette>
                </soap:Body>
            </soap:Envelope>`,
            {
                headers: {
                    'Content-Type': 'application/xml',
                    SOAPAction: "http://www.mondialrelay.fr/webservice/WSI2_CreationEtiquette"
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
