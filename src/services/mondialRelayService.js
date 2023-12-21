const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const API_URL = process.env.API_URL;
const ENSEIGNE = process.env.ENSEIGNE;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PAYS = "FR";

async function generateSecurityHash(enseigne, pays, codePostal, privateKey) {
    const concatenatedString = `${enseigne}${pays}${codePostal}${privateKey}`;
    console.log('concatstring', concatenatedString); // OK

    const md5Hash = input => {
        const hash = crypto.createHash('md5');
        hash.update(input);
        return hash.digest('hex').toUpperCase();
    };
    console.log(md5Hash(concatenatedString));

    const securityHash = md5Hash(concatenatedString);
    return securityHash;
}


async function getMondialRelayData(codePostal) {
    try {
        const securityParameter = await generateSecurityHash(ENSEIGNE, PAYS, codePostal, PRIVATE_KEY);

        const soapRequest = `
            <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://www.mondialrelay.fr/webservice/">
                <soap:Body>
                    <WSI3_PointRelais_Recherche>
                        <Enseigne>${ENSEIGNE}</Enseigne>
                        <Pays>${PAYS}</Pays>
                        <CP>${codePostal}</CP>
                        <Security>${securityParameter}</Security>
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
