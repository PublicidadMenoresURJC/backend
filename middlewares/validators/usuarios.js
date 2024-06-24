const { check, validationResult } = require("express-validator");
const {handleHttpError} = require("../../utils/handleError");


const validatorSignUp = [
    check("nombre").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("pass").exists().notEmpty(),    
    (req,res,next) =>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            handleHttpError(res,403,error)
        }
    }

];
const validatorSignIn = [    
    check("email").exists().notEmpty().isEmail(),
    check("pass").exists().notEmpty(),    
    (req,res,next) =>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            handleHttpError(res,403,error)
        }
    }
];

const validatorChangePass = [    
    check("pass").exists().notEmpty(),
    check("oldpass").exists().notEmpty(),    
    (req,res,next) =>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            handleHttpError(res,403,error)
        }
    }
];

const validatorChangeUser = [    
    check("nombre").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),    
    (req,res,next) =>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            handleHttpError(res,403,error)
        }
    }
];

const validatorUpdateRol = [
    check("usuarios").exists().isArray({min:1}),   
    check("usuarios.*.rol").exists().notEmpty(),
    check("usuarios.*.id").exists().isInt().notEmpty(),
    (req,res,next) =>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            handleHttpError(res,403,error)
        }
    }

];

const validatorCreateUsers = [
    check("usuarios").exists().isArray({min:1}),   
    check("usuarios.*.rol").exists().notEmpty(),
    check("usuarios.*.nombre").exists().notEmpty(),
    check("usuarios.*.email").exists().notEmpty().isEmail(),
    check("usuarios.*.DNI").exists().notEmpty(),
    (req,res,next) =>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            handleHttpError(res,403,error)
        }
    }

];

module.exports = {validatorSignUp,validatorSignIn,validatorChangePass,validatorChangeUser,validatorUpdateRol,validatorCreateUsers}