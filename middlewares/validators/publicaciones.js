const { check, validationResult, query } = require("express-validator");


const validatorGetAllItems = [
    query("s").exists(),
    query("a").exists(),
    query("t").exists(),
    query("nm").exists(),
    query("o").exists(),
    query("tp").exists(),
    query("m").exists(),
    query("po").exists(),
    query("p").exists(),
    query("g").exists(),
    query("anoh").optional().isInt({min:1901,max:2099}).toInt(),
    query("anod").optional().isInt({min:1901,max:2099}).toInt(),
    query("prh").optional().isInt({min:0,max:2147483647}).toInt(),
    query("prd").optional().isInt({min:0,max:2147483647}).toInt(),
    query("rolh").optional(),
    query("rolm").optional(),
    query("rolmr").optional(),
    query("rg").optional(),
    query("pc").optional(),
    (req,res,next) =>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(403)
            res.send({error: error.array()})
        }
    }


];

const validatorCreateItems = [
    check("anunciante").exists().notEmpty(),
    check("tematica").exists().notEmpty(),
    check("nombreMedio").exists().notEmpty(),
    check("objetivo").exists().notEmpty(),
    check("tipo").exists().notEmpty(),
    check("medios").exists().notEmpty(),
    check("publicoObjetivo").exists().notEmpty(),
    check("sinopsis").exists(),
    check("ano").exists().isInt({min:1901,max:2099}),    
    check("presupuesto").exists().isInt({min:0,max:2147483647}),
    check("roleshombre").exists().isArray({min:1}),
    check("roleshombre.*.nombre").exists().notEmpty(),
    check("rolesmujer").exists().isArray({min:1}),
    check("rolesmujer.*.nombre").exists().notEmpty(),
    check("relacionesgenero").exists().isArray({min:1}),
    check("relacionesgenero.*.nombre").exists().notEmpty(),
    check("palabrasclave").exists().isArray({min:1}),
    check("palabrasclave.*.nombre").exists().notEmpty(),
    check("menores").exists().isArray({min:1}),
    check("menores.*.protagonismo").exists().notEmpty(),
    check("menores.*.genero").exists().notEmpty(),
    check("menores.*.roles").exists().isArray({min:1}),
    check("menores.*.roles.*.nombre").exists().notEmpty(),
    (req,res,next) =>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(403)
            res.send({error: error.array()})
        }
    }


];
const validatorUpdateItems = [
    check("id").exists().isInt().notEmpty(),
    check("anunciante").exists().notEmpty(),
    check("tematica").exists().notEmpty(),
    check("nombreMedio").exists().notEmpty(),
    check("objetivo").exists().notEmpty(),
    check("tipo").exists().notEmpty(),
    check("medios").exists().notEmpty(),
    check("publicoObjetivo").exists().notEmpty(),
    check("sinopsis").exists(),
    check("ano").exists().isInt({min:1901,max:2099}),    
    check("presupuesto").exists().isInt({min:0,max:2147483647}),
    check("roleshombre").exists().isArray({min:1}),
    check("roleshombre.*.nombre").exists().notEmpty(),
    check("rolesmujer").exists().isArray({min:1}),
    check("rolesmujer.*.nombre").exists().notEmpty(),
    check("relacionesgenero").exists().isArray({min:1}),
    check("relacionesgenero.*.nombre").exists().notEmpty(),
    check("palabrasclave").exists().isArray({min:1}),
    check("palabrasclave.*.nombre").exists().notEmpty(),
    check("menores").exists().isArray({min:1}),
    check("menores.*.protagonismo").exists().notEmpty(),
    check("menores.*.genero").exists().notEmpty(),
    check("menores.*.roles").exists().isArray({min:1}),
    check("menores.*.roles.*.nombre").exists().notEmpty(),
    check("createdAt").exists().notEmpty(),
    (req,res,next) =>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(403)
            res.send({error: error.array()})
        }
    }


];

module.exports = {validatorGetAllItems,validatorCreateItems,validatorUpdateItems}