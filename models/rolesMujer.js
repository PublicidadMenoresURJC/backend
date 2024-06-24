const { sequelize } = require("../config/connection");
const { DataTypes } = require("sequelize");

const RolMujer = sequelize.define(
    "rolesMujer",
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
        tableName: 'rolesmujer'
    }
);

sequelize.models.modelName;

module.exports = RolMujer;