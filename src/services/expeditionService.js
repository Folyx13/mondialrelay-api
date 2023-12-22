const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const API_URL = process.env.API_URL;
const ENSEIGNE = process.env.ENSEIGNE;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PAYS = process.env.PAYS;

const generateSecurityKey = (
    enseigne,
    modeCol,
    modeLiv,
    expeLangage,
    expeAd1,
    expeAd3,
    expeVille,
    expeCp,
    expePays,
    expeTel1,
    destLangage,
    destAd1,
    destAd3,
    destVille,
    destCp,
    destPays,
    destTel1,
    poids,
    nbColis,
    crtValeur,
    // colRelPays,
    // colRel,
    // livRelPays,
    // livRel,
) => {
    const concatenatedString = `${enseigne}${modeCol}${modeLiv}${expeLangage}${expeAd1}${expeAd3}${expeVille}${expeCp}${expePays}${expeTel1}${destLangage}${destAd1}${destAd3}${destVille}${destCp}${destPays}${destTel1}${poids}${nbColis}${crtValeur}`;

    const md5Hash = input => {
        const hash = crypto.createHash('md5');
        hash.update(input);
        return hash.digest('hex').toUpperCase();
    };

    const securityKey = md5Hash(concatenatedString);
    return securityKey;
};

function genSecurityParameter(arg) {
    const hash = crypto.createHash('md5').update(arg)
    return hash.digest('hex').toUpperCase();
}

console.log('hash = ', genSecurityParameter("BDTEST13PrivateK"))

const createShippingLabel = async () => {
    const enseigne = ENSEIGNE;
    const modeCol = 'REL';
    // const modeLiv = '24X';
    // const expeLangage = 'FR';
    // const expeAd1 = '5 Rue de la Paix';
    // const expeAd3 = 'Appt 123';
    // const expeVille = 'Paris';
    // const expeCp = '75001';
    // const expePays = 'FR';
    // const expeTel1 = '+33123456789';
    // const destLangage = 'FR';
    // const destAd1 = '123 Main Street';
    // const destAd3 = 'Apt 456';
    // const destVille = 'New York';
    // const destCp = '10001';
    // const destPays = 'FR';
    // const destTel1 = '+12125551234';
    // const poids = '1.5';
    // const nbColis = '1';
    // const crtValeur = '50';
    // const colRelPays = 'FR';
    // const colRel = '123456';
    // const livRelPays = 'US';
    // const livRel = '789012';
    // const texte = 'Description de lenvoi';

    try {
        // const securityParameter = generateSecurityKey(
        //     enseigne,
        //     modeCol,
        //     modeLiv,
        //     expeLangage,
        //     expeAd1,
        //     expeAd3,
        //     expeVille,
        //     expeCp,
        //     expePays,
        //     expeTel1,
        //     destLangage,
        //     destAd1,
        //     destAd3,
        //     destVille,
        //     destCp,
        //     destPays,
        //     destTel1,
        //     poids,
        //     nbColis,
        //     crtValeur,
        //     colRelPays,
        //     colRel,
        //     livRelPays,
        //     livRel,
        //     texte
        // );

        const response = await axios.post(
            `${API_URL}`,
            `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://www.mondialrelay.fr/webservice/">
                    <soap:Body>
                        <WSI2_CreationEtiquette xmlns="http://www.mondialrelay.fr/webservice/">
                            <Enseigne>${ENSEIGNE}</Enseigne>
                            <ModeCol>CCC</ModeCol>
                            <ModeLiv>LCC</ModeLiv>
                            <Expe_Langage>FR</Expe_Langage>
                            <Expe_Ad1>MRDUPONTPIERRE</Expe_Ad1>
                            <Expe_Ad3>1RUEDUTEST</Expe_Ad3>
                            <Expe_Ville>PARIS</Expe_Ville>
                            <Expe_CP>75002</Expe_CP>
                            <Expe_Pays>FR</Expe_Pays>
                            <Expe_Tel1>0606060606</Expe_Tel1>
                            <Dest_Langage>FR</Dest_Langage>
                            <Dest_Ad1>MRDUPONTPAUL</Dest_Ad1>
                            <Dest_Ad3>2RUEDUTEST</Dest_Ad3>
                            <Dest_Ville>PARIS</Dest_Ville>
                            <Dest_CP>75002</Dest_CP>
                            <Dest_Pays>FR</Dest_Pays>
                            <Dest_Tel1>0606060606</Dest_Tel1>
                            <Poids>55</Poids>
                            <NbColis>1</NbColis>
                            <CRT_Valeur>0</CRT_Valeur>
                  

                            <Security>${genSecurityParameter("BDTEST13CCCLCCFRMRDUPONTPIERRE1RUEDUTESTPARIS75002FR0606060606FRMRDUPONTPAUL2RUEDUTESTPARIS75002FR06060606065510PrivateK")}</Security>

                        </WSI2_CreationEtiquette>Enseigne
                    </soap:Body>
                </soap:Envelope>`,
            {
                headers: {
                    'Content-Type': 'text/xml; charset=utf-8',
                    SOAPAction: 'http://www.mondialrelay.fr/webservice/WSI2_CreationEtiquette',
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
