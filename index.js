const express = require('express');
const app = express();
const bodyParser  = require('body-parser');

const apiRoutes = require('./src/routes/index');
const {PORT} = require("./src/config/configServer");

const SetupAndStartServer = async () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}));


    app.use('/api', apiRoutes);

    app.listen(PORT, ()=> {
        console.log(`Server started on ${PORT}`);
    });
}

SetupAndStartServer();