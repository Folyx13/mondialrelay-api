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

function genSecurityParameter(string) {
    const hash = crypto.createHash('md5').update(string)
    return hash.digest('hex').toUpperCase();
}

const createShippingLabel = async () => {
    const enseigne = ENSEIGNE;
    const modeCol = 'CCC';
    const modeLiv = 'LCC';
    const expeLangage = 'FR';
    const expeAd1 = 'MR DUPONT Pierrot';
    const expeAd3 = '1 RUE DU TEST';
    const expeVille = 'PARIS';
    const expeCp = '75001';
    const expePays = 'FR';
    const expeTel1 = '0606060606';
    const destLangage = 'FR';
    const destAd1 = 'MR DUPONT Paulot';
    const destAd3 = '2 RUE DU TEST';
    const destVille = 'PARIS';
    const destCp = '75002';
    const destPays = 'FR';
    const destTel1 = '0606060606';
    const poids = '55';
    const nbColis = '1';
    const crtValeur = '0';


    try {
        const securityParameter = generateSecurityKey(
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
        );

        const response = await axios.post(
            `${API_URL}`,
            `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://www.mondialrelay.fr/webservice/">
                    <soap:Body>
                        <WSI2_CreationEtiquette xmlns="http://www.mondialrelay.fr/webservice/">
                            
                            <Enseigne>${enseigne}</Enseigne>
                            <ModeCol>${modeCol}</ModeCol>
                            <ModeLiv>${modeLiv}</ModeLiv>
                            <Expe_Langage>${expeLangage}</Expe_Langage>
                            <Expe_Ad1>${expeAd1}</Expe_Ad1>
                            <Expe_Ad3>${expeAd3}</Expe_Ad3>
                            <Expe_Ville>${expeVille}</Expe_Ville>
                            <Expe_CP>${expeCp}</Expe_CP>
                            <Expe_Pays>${expePays}</Expe_Pays>
                            <Expe_Tel1>${expeTel1}</Expe_Tel1>
                            <Dest_Langage>${destLangage}</Dest_Langage>
                            <Dest_Ad1>${destAd1}</Dest_Ad1>
                            <Dest_Ad3>${destAd3}</Dest_Ad3>
                            <Dest_Ville>${destVille}</Dest_Ville>
                            <Dest_CP>${destCp}</Dest_CP>
                            <Dest_Pays>${destPays}</Dest_Pays>
                            <Dest_Tel1>${destTel1}</Dest_Tel1>
                            <Poids>${poids}</Poids>
                            <NbColis>${nbColis}</NbColis>
                            <CRT_Valeur>${crtValeur}</CRT_Valeur>
                            <Security>${genSecurityParameter(`${enseigne}${modeCol}${modeLiv}${expeLangage}${expeAd1}${expeAd3}${expeVille}${expeCp}${expePays}${expeTel1}${destLangage}${destAd1}${destAd3}${destVille}${destCp}${destPays}${destTel1}${poids}${nbColis}${crtValeur}${PRIVATE_KEY}`)}</Security>

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
