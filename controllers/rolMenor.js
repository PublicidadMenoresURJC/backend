const { sequelize } = require("../config/connection");

const RolMenor = require("../models/rolMenor");
const {handleHttpError} = require("../utils/handleError");

const getDistinctRolMenor = async (req,res) =>{
    try {
        console.log('pc')
        const data = await RolMenor.findAll(
            {attributes: ['nombre'],
            group: ['nombre']}
        );
        res.json({"rolesMenor":data});
    } catch (e) {
        handleHttpError(res,500,e);
    }
}

module.exports = {getDistinctRolMenor}