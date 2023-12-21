const mondialRelayService = require('../services/mondialRelayService');
const xml2js = require('xml2js');

const getMondialRelayData = async (req, res) => {
    try {
        const { codePostal } = req.params;

        const xmlData = await mondialRelayService.getMondialRelayData(codePostal);

        xml2js.parseString(xmlData, (err, result) => {
            if (err) {
                console.error('Erreur lors de la conversion XML en JSON :', err);
                return res.status(500).json({ error: 'Erreur lors de la conversion XML en JSON' });
            }

            const formattedData = {
                data: {
                    PointsRelais: result['soap:Envelope']['soap:Body'][0]['WSI3_PointRelais_RechercheResponse'][0]['WSI3_PointRelais_RechercheResult'][0]['PointsRelais'][0]['PointRelais_Details'].map(pointRelais => {
                        return {
                            Num: pointRelais.Num[0],
                            LgAdr1: pointRelais.LgAdr1[0],
                            LgAdr3: pointRelais.LgAdr3[0],
                            CP: pointRelais.CP[0],
                            Ville: pointRelais.Ville[0],
                            Pays: pointRelais.Pays[0],
                            Latitude: pointRelais.Latitude[0],
                            Longitude: pointRelais.Longitude[0],
                            Horaires: {
                                Lundi: pointRelais.Horaires_Lundi[0].string,
                                Mardi: pointRelais.Horaires_Mardi[0].string,
                                Mercredi: pointRelais.Horaires_Mercredi[0].string,
                                Jeudi: pointRelais.Horaires_Jeudi[0].string,
                                Vendredi: pointRelais.Horaires_Vendredi[0].string,
                                Samedi: pointRelais.Horaires_Samedi[0].string,
                                Dimanche: pointRelais.Horaires_Dimanche[0].string
                            }
                        };
                    })
                }
            };

            res.json(formattedData);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMondialRelayData,
};
