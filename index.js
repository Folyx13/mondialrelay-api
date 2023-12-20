const express = require('express');
const mondialRelayRoutes = require('./src/routes/mondialRelay.route');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/mondialRelay', mondialRelayRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

