const serverConfig = require('./config/serverConfig');
const express = require('express');








const app = express();


app.listen(serverConfig.port,()=>console.log(`listening on port ${serverConfig.port}`));

module.exports = app;