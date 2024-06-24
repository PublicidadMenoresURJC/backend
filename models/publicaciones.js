const { sequelize } = require("../config/connection");
const { DataTypes }  = require("sequelize");
const PalabraClave = require("./palabraClave");
const Menor = require("./menor");
const RolHombre = require("./rolHombre");
const RolMujer = require("./rolesMujer");
const RelacionGenero = require("./relacionesGenero");

const Publicaciones = sequelize.define(
    "publicaciones",
    {
        anunciante:{
            type: DataTypes.STRING,
        },
        tipo: {
            type: DataTypes.STRING,
        },
        tematica: {
            type: DataTypes.STRING,
        },
        medios: {
            type: DataTypes.STRING,
        },
        ano: {
            type: DataTypes.NUMBER,
        },
        nombreMedio: {
            type: DataTypes.STRING,
        },
        objetivo: {
            type: DataTypes.STRING,
        },
        publicoObjetivo: {
            type: DataTypes.STRING,
        },
        presupuesto: {
            type: DataTypes.INTEGER,
        },
        sinopsis: {
            type: DataTypes.STRING,
        },
        urlFile: {
            type: DataTypes.STRING,
        },
        nameFile: {
            type: DataTypes.STRING,
        },
        typeFile: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
        tableName: 'publicaciones'
    }
);

Publicaciones.hasMany(PalabraClave, { foreignKey: "idPubl", as: "palabrasclave"});
// Publicaciones.hasOne(RolesGenero, { foreignKey: "idPubl", as: "rolesgenero"});
Publicaciones.hasMany(RolHombre, { foreignKey: "idPubl", as: "roleshombre"});
Publicaciones.hasMany(RolMujer, { foreignKey: "idPubl", as: "rolesmujer"});
Publicaciones.hasMany(RelacionGenero, { foreignKey: "idPubl", as: "relacionesgenero"});
Publicaciones.hasMany(Menor, { foreignKey: "idPubl", as: "menores"});

module.exports = Publicaciones;