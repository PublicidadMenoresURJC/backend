const { sequelize } = require("../config/connection");
const { DataTypes } = require("sequelize");
const RolMenor = require("./rolMenor");

const Menor = sequelize.define(
    "menor",
    {
        idPubl:{
            type: DataTypes.INTEGER,
        },
        protagonismo:{
            type: DataTypes.ENUM(["P", "S"]),
        },   
        genero:{
            type: DataTypes.ENUM(["M", "F"]),
        }, 
    },
    {
        timestamps: false,
        tableName: 'menor'
    }
);

sequelize.models.modelName;

Menor.hasMany(RolMenor, { foreignKey: "idMenor", as: "roles"});

module.exports = Menor;