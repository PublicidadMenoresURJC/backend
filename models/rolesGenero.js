const { sequelize } = require("../config/connection");
const { DataTypes } = require("sequelize");

const RolesGenero = sequelize.define(
    "rolesgenero",
    {
        idPubl:{
            type: DataTypes.INTEGER,
        },
        rolMujer:{
            type: DataTypes.STRING,
        },   
        rolHombre:{
            type: DataTypes.STRING,
        },
        relacion:{
            type: DataTypes.STRING,
        },  
    },
    {
        timestamps: false,
        tableName: 'rolesgenero'
    }
);

sequelize.models.modelName;

module.exports = RolesGenero;