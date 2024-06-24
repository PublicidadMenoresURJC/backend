const { sequelize } = require("../config/connection");
const { DataTypes } = require("sequelize");

const RolMenor = sequelize.define(
    "rolmenor",
    {
        idMenor:{
            type: DataTypes.INTEGER,
        },
        nombre:{
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
        tableName: 'rolmenor'
    }
);

sequelize.models.modelName;

module.exports = RolMenor;