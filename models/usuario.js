const { sequelize } = require("../config/connection");
const { DataTypes } = require("sequelize");
const { genSalt, compare,hash} = require("bcryptjs"); 

const Usuario = sequelize.define(
    "usuarios",
    {
        email:{
            type: DataTypes.STRING,
        },
        rol:{
            type: DataTypes.ENUM(["I", "A", "P"]),
        },   
        nombre:{
            type: DataTypes.STRING,
        }, 
        pass:{
            type: DataTypes.STRING,
        }, 
    },
    {
        timestamps: false,
        tableName: 'usuarios'
    }
);
const encriptar = async (pass) =>{
    const salt = await genSalt(10);
    console.log(pass)
    return await hash(pass,salt);
}

const comparar = async (pass,passRecibida) =>{
    console.log(pass,passRecibida)
    return await compare(pass,passRecibida);
}

sequelize.models.modelName;

module.exports = {Usuario,encriptar,comparar};