const {verify} = require('jsonwebtoken')
const {handleHttpError} = require("../../utils/handleError");
require('dotenv').config();
const {Usuario} = require("../../models/usuario");

const verifyToken = async (req,res,next) =>{
    try {
        const token = req.headers["access-token"];
        console.log(token)
        if (!token) return handleHttpError(res, 403 ,"No token");
        const decoded = verify(token,process.env.SECRET)
        console.log(decoded)
        const usuario = await Usuario.findByPk(decoded.id,{attributes:['id','nombre','email','rol']})
        if(!usuario) return handleHttpError(res, 404 ,"No user found (token error)");
        req.userID = decoded.id
        req.userRol = usuario.dataValues.rol    
        next()    
    } catch (e) {
        handleHttpError(res, 500 ,e);
    }
    
}

const isAlumnoProfesor = async (req,res,next) => {    
    console.log(req.userRol )
    
    if(req.userRol === 'A' || req.userRol === 'P'  ) 
        next()    
    else    
        return handleHttpError(res, 403 ,"Not authorized user");
    
}

const isProfesor = async (req,res,next) => {
    if(req.userRol !== 'P' ) 
        return handleHttpError(res, 403 ,"Not authorized user");
    next()
}

module.exports = {verifyToken,isAlumnoProfesor,isProfesor}