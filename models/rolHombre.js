const { sequelize } = require("../config/connection");
const { DataTypes } = require("sequelize");

const RolHombre = sequelize.define(
    "rolesHombre",
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
        tableName: 'roleshombre'
    }
);

sequelize.models.modelName;

module.exports = RolHombre;