const { sequelize } = require("../config/connection");
const { DataTypes } = require("sequelize");

const RelacionGenero = sequelize.define(
    "relacionesGenero",
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
        tableName: 'relacionesgenero'
    }
);

sequelize.models.modelName;

module.exports = RelacionGenero;