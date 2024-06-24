const { sequelize } = require("../config/connection");
const { DataTypes } = require("sequelize");

const PalabraClave = sequelize.define(
    "palabrasclave",
    {
        nombre:{
            type: DataTypes.STRING,
        },      
        idPubl:{
            type: DataTypes.INTEGER,
        },     
    },
    {
        timestamps: false,
        tableName: 'palabrasclave'
    }
);

sequelize.models.modelName;

module.exports = PalabraClave;