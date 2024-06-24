const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const publicacionRoute = require('./routes/publicacion');
const usuariosRoute = require('./routes/usuarios');
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '500mb' }));  
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true })); 
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

app.use('/api', publicacionRoute);
app.use('/api/usuarios', usuariosRoute);
app.use(express.static('./public'))



module.exports = app;