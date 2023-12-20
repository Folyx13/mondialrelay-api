const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

// The MD5 hash for BDTEST13FR57000PrivateK is : 0a50c81549f3680e98bafc046c92b044

const hash = '0a50c81549f3680e98bafc046c92b044'.toUpperCase();

const API_URL = process.env.API_URL;
const ENSEIGNE = process.env.ENSEIGNE;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PAYS = "FR";
async function generateSecurityHash(enseigne, pays, cp, privateKey) {
    const concatenatedString = `${enseigne}${pays}${cp}${privateKey}`;
    const securityParameter = crypto.createHash('md5').update(concatenatedString.toUpperCase()).digest("hex").toUpperCase();
    return securityParameter;
}

async function getMondialRelayData(codePostal) {
    try {
        const securityParameter = await generateSecurityHash(`${ENSEIGNE}${PAYS}${codePostal}${PRIVATE_KEY}`);
        console.log(securityParameter);
        const soapRequest = `
            <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://www.mondialrelay.fr/webservice/">
                <soap:Body>
                    <WSI3_PointRelais_Recherche>
                        <Enseigne>${ENSEIGNE}</Enseigne>
                        <Pays>${PAYS}</Pays>
                        <CP>${codePostal}</CP>
                        <Security>${hash}</Security>
                    </WSI3_PointRelais_Recherche>
                </soap:Body>
            </soap:Envelope>
        `;

        const response = await axios.post(API_URL, soapRequest, {
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': 'http://www.mondialrelay.fr/webservice/WSI3_PointRelais_Recherche',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getMondialRelayData,
};
