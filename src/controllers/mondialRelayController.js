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
                        // console.log(pointRelais);
                        return {
                            Num: pointRelais.Num[0].trim(),
                            adresse1: pointRelais.LgAdr1[0].trim(),
                            adresse2: pointRelais.LgAdr3[0].trim(),
                            CodePostals: pointRelais.CP[0].trim(),
                            Ville: pointRelais.Ville[0].trim(),
                            Pays: pointRelais.Pays[0].trim(),
                            Latitude: pointRelais.Latitude[0].trim(),
                            Longitude: pointRelais.Longitude[0].trim(),
                            Horaires: {
                                Lundi: `${pointRelais.Horaires_Lundi[0].string[0]} - ${pointRelais.Horaires_Lundi[0].string[1]} et de ${pointRelais.Horaires_Lundi[0].string[2]} - ${pointRelais.Horaires_Lundi[0].string[3]}`,
                                Mardi: `${pointRelais.Horaires_Mardi[0].string[0]} - ${pointRelais.Horaires_Mardi[0].string[1]} et de ${pointRelais.Horaires_Mardi[0].string[2]} - ${pointRelais.Horaires_Mardi[0].string[3]}`,
                                Mercredi: `${pointRelais.Horaires_Mercredi[0].string[0]} - ${pointRelais.Horaires_Mercredi[0].string[1]} et de ${pointRelais.Horaires_Mercredi[0].string[2]} - ${pointRelais.Horaires_Mercredi[0].string[3]}`,
                                Jeudi: `${pointRelais.Horaires_Jeudi[0].string[0]} - ${pointRelais.Horaires_Jeudi[0].string[1]} et de ${pointRelais.Horaires_Jeudi[0].string[2]} - ${pointRelais.Horaires_Jeudi[0].string[3]}`,
                                Vendredi: `${pointRelais.Horaires_Vendredi[0].string[0]} - ${pointRelais.Horaires_Vendredi[0].string[1]} et de ${pointRelais.Horaires_Vendredi[0].string[2]} - ${pointRelais.Horaires_Vendredi[0].string[3]}`,
                                Samedi: `${pointRelais.Horaires_Samedi[0].string[0]} - ${pointRelais.Horaires_Samedi[0].string[1]} et de ${pointRelais.Horaires_Samedi[0].string[2]} - ${pointRelais.Horaires_Samedi[0].string[3]}`,
                                Dimanche: `${pointRelais.Horaires_Dimanche[0].string[0]} - ${pointRelais.Horaires_Dimanche[0].string[1]} et de ${pointRelais.Horaires_Dimanche[0].string[2]} - ${pointRelais.Horaires_Dimanche[0].string[3]}`,
                            }
                        };
                    })
                }
            };

            res.json(formattedData);
            console.log('formatterData', formattedData);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMondialRelayData,
};
