const enseigne = ENSEIGNE;
const modeCol = 'CCC';
const modeLiv = '24R';
const expeLangage = 'FR';
const expeAd1 = 'MRDUPONTPIERRE';
const expeAd3 = '1RUEDUTEST';
const expeVille = 'PARIS';
const expeCp = '75002';
const expePays = 'FR';
const expeTel1 = '0606060606';
const destLangage = 'FR';
const destAd1 = 'MRDUPONTPAUL';
const destAd3 = '2RUEDUTEST';
const destVille = 'PARIS';
const destCp = '75002';
const destPays = 'FR';
const destTel1 = '0606060606';
const poids = '55';
const nbColis = '1';
const crtValeur = '50';

function genSecurityParameter() {
    const hash = crypto.createHash('md5').update(concatenatedString);
    return hash.digest('hex').toUpperCase();
}


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
                <COL_Rel_Pays>${colRelPays}</COL_Rel_Pays>
                <COL_Rel>${colRel}</COL_Rel>
                <LIV_Rel_Pays>${livRelPays}</LIV_Rel_Pays>
                <LIV_Rel>${livRel}</LIV_Rel>
                <Security>${genSecurityParameter(`${ENSEIGNE}${modeCol}${modeLiv}${expeLangage}${expeAd1}${expeAd3}${expeVille}${expeCp}${expePays}${expeTel1}${destLangage}${destAd1}${destAd3}${destVille}${destCp}${destPays}${destTel1}${poids}${nbColis}${crtValeur}${colRelPays}${colRel}${livRelPays}${livRel}`)}</Security>
            </WSI2_CreationEtiquette>
        </soap:Body>
    </soap:Envelope>`,
    {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            SOAPAction: 'http://www.mondialrelay.fr/webservice/WSI2_CreationEtiquette',
        },
    }
);
