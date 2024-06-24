const {Sequelize} = require("sequelize");
require('dotenv').config();

const database = process.env.DB_NAME;
const port = process.env.DB_PORT;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(
    database,
    user,
    password,
    {
        host,
        dialect:"mysql"
    }
);

const connection = async() => {
    try {
        await sequelize.authenticate();
        console.log("Connected");
    } catch (error) {
        console.log("Error: ", error);
    }
};

module.exports = { sequelize, connection };










// const mysql = require('mysql2');
// require('dotenv').config();

// var connection = mysql.createConnection({
//     port: process.env.DB_PORT,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
// });

// connection.connect((err)=> {
//     if (!err){
//         console.log("Connected");
//     } else {
//         console.log("Error: ", err);
//     }
// });

// module.exports = connection;
