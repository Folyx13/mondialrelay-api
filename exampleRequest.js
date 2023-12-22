
const enseigne = ENSEIGNE;
const modeCol = 'REL';
const modeLiv = '24X';
const expeLangage = 'FR';
const expeAd1 = '5 Rue de la Paix';
const expeAd3 = 'Appt 123';
const expeVille = 'Paris';
const expeCp = '75001';
const expePays = 'FR';
const expeTel1 = '+33123456789';
const destLangage = 'FR';
const destAd1 = '123 Main Street';
const destAd3 = 'Apt 456';
const destVille = 'New York';
const destCp = '10001';
const destPays = 'FR';
const destTel1 = '+12125551234';
const poids = '1.5';
const nbColis = '1';
const crtValeur = '50';
const colRelPays = 'FR';
const colRel = '123456';
const livRelPays = 'US';
const livRel = '789012';
const texte = 'Description de lenvoi';



`${API_URL}`,
    `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://www.mondialrelay.fr/webservice/">
        <soap:Body>
            <WSI2_CreationEtiquette xmlns="http://www.mondialrelay.fr/webservice/">
                <Enseigne>${ENSEIGNE}</Enseigne>
                <ModeCol>CCC</ModeCol>
                <ModeLiv>24R</ModeLiv>
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
                <CRT_Valeur>50</CRT_Valeur>
      

                <Security>${genSecurityParameter("BDTEST13CCC24RFRMRDUPONTPIERRE1RUEDUTESTPARIS75002FR0606060606FRMRDUPONTPAUL2RUEDUTESTPARIS75002FR060606060655150PrivateK")}</Security>

            </WSI2_CreationEtiquette>Enseigne
        </soap:Body>
    </soap:Envelope>`