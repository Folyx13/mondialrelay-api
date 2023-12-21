// index.js
const express = require('express');
const mondialRelayRoutes = require('./src/routes/mondialRelayRoutes');
const expeditionRoutes = require('./src/routes/expeditionRoute');

const app = express();
const PORT = process.env.PORT || 3000;
console.clear();

app.use(express.json());
app.use('/mondialRelay', mondialRelayRoutes);
app.use('/expedition', expeditionRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
