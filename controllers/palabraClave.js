const { sequelize } = require("../config/connection");

const PalabraClave = require("../models/palabraClave");
const {handleHttpError} = require("../utils/handleError");
const { Op } = require("sequelize");

const getDistinctPalabrasClave = async (req,res) =>{
    try {
        console.log('pc')
        const data = await PalabraClave.findAll(
            {attributes: ['nombre'],
            group: ['nombre']}
        );
        res.json({"palabrasClave":data});
    } catch (e) {
        handleHttpError(res,500,e);
    }
}

module.exports = {getDistinctPalabrasClave}