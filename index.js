require('dotenv').config();
const http = require('http');
const app = require('./server');
const { connection } = require('./config/connection');

const server = http.createServer(app);
server.listen(process.env.PORT);
connection();