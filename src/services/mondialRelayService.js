const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
async function getMondialRelayData(city) {
    try {
        console.log('API_URL', API_URL);
        const response = await axios.get(`${API_URL}/${city}`, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY,
            },
        });

        return jsonData;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getMondialRelayData,
};