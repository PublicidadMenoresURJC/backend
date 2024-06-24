const { sequelize } = require("../config/connection");

const Publicacion = require("../models/publicaciones");
const {handleHttpError} = require("../utils/handleError");
const { Op } = require("sequelize");

const getAllPubl = async (req, res) => {
    try {
        let s = req.query.s; 
        const queryparams = req.query;          

        if ((!queryparams.prh)) queryparams.prh = 2147483647;           
        if (!queryparams.prd) queryparams.prd = 0;
        if ((queryparams.prh == 0) && (queryparams.prd == 0))
            queryparams.prh = 2147483647;

        if (!queryparams.anoh) queryparams.anoh = 2099;        
        if (!queryparams.anod) queryparams.anod = 1901;
        if ((queryparams.anoh == 1901) && (queryparams.anod == 1901)){
            queryparams.anod = 1901;
            queryparams.anoh = 2099;
        }           

        let queryRolesHombre = queryArray(queryparams.rolh,"roleshombre");        

        let queryRolesMujer = queryArray(queryparams.rolm,"rolesmujer");

        let queryRolesMenor =  queryArray(queryparams.rolmr,"menores->roles");
        
        let queryPalabrasClave = queryArray(queryparams.pc,"palabrasclave");

        let queryRelaciones = queryArray(queryparams.rg,"relacionesgenero");        

        const data = await Publicacion.findAll(
            {include:["palabrasclave" , "roleshombre" ,"rolesmujer", "relacionesgenero", {association: "menores" , include:"roles"}],             
             where:{
                [Op.or]:[
                    {anunciante:{[Op.substring]:s}},
                    {tipo:{[Op.substring]:s}},
                    {tematica:{[Op.substring]:s}},
                    {medios:{[Op.substring]:s}},                    
                    {nombreMedio:{[Op.substring]:s}},
                    {objetivo:{[Op.substring]:s}},
                    {publicoObjetivo:{[Op.substring]:s}},                    
                    {sinopsis:{[Op.substring]:s}},
                    sequelize.literal("`palabrasclave`.`nombre` LIKE '%"+s+"%'"),   
                    sequelize.literal("`roleshombre`.`nombre` LIKE '%"+s+"%'"),    
                    sequelize.literal("`rolesmujer`.`nombre` LIKE '%"+s+"%'"),       
                    sequelize.literal("`relacionesgenero`.`nombre` LIKE '%"+s+"%'"),          
                    sequelize.literal("`menores->roles`.`nombre` LIKE '%"+s+"%'"),      
                ],
                [Op.and]:[
                    {anunciante:{[Op.substring]:queryparams.a}},
                    {tipo:{[Op.substring]:queryparams.tp}},
                    {tematica:{[Op.substring]:queryparams.t}},
                    {medios:{[Op.substring]:queryparams.m}}, 
                    {nombreMedio:{[Op.substring]:queryparams.nm}},
                    {objetivo:{[Op.substring]:queryparams.o}},
                    {publicoObjetivo:{[Op.substring]:queryparams.po}},
                    {ano:{[Op.between]: [queryparams.anod, queryparams.anoh]}},
                    {presupuesto:{[Op.between]: [queryparams.prd, queryparams.prh]}},
                    sequelize.literal("`menores`.`protagonismo` LIKE '%"+queryparams.p+"%'"),  
                    sequelize.literal("`menores`.`genero` LIKE '%"+queryparams.g+"%'"),  
                    sequelize.literal(queryRolesHombre),
                    sequelize.literal(queryRolesMujer),  
                    sequelize.literal(queryRolesMenor),
                    sequelize.literal(queryPalabrasClave),
                    sequelize.literal(queryRelaciones)      
                ]
             },       
             order:[['id', 'ASC']]     
            }      
        );    
        
        res.json({"publicaciones":data});
    } catch(e){        
        handleHttpError(res,500,e);
    }    
}


const getPubl = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Publicacion.findByPk(id,
                    {include:["palabrasclave" , "roleshombre" ,"rolesmujer", "relacionesgenero" ,  {association: "menores" , include:"roles"}],
                     order:[['id', 'ASC']]}      
                    );
        if (!data){
            return handleHttpError(res, 400 ,"No existe usuario");
        }         
        res.json({"publicacion":data});
    } catch (e) {
        handleHttpError(res,500,e);
    }    
}

const createPubl = async (req, res) => {
    try {
        const {body} = req;
        console.log(body);    
        const data = await Publicacion.create(body, {include:["palabrasclave" , "roleshombre" ,"rolesmujer", "relacionesgenero" ,  {association: "menores" , include:"roles"}]} );    
        res.send({"publicacion":data});
    } catch (e) {
        handleHttpError(res,500,e);
    }
}


const updatePubl = async (req, res) => {
    try {
        const {body} = req;
        console.log(body);   
        const count = await Publicacion.count({ where:{id: body.id }})        
        if (count != 1){
            return handleHttpError(res, 403 ,"Publicacion no encontrada");
        }        
        const dataDEL = await Publicacion.destroy({ where:{id: body.id }} );
        const dataCREA = await Publicacion.create(body, {include:["palabrasclave" , "roleshombre" ,"rolesmujer", "relacionesgenero" ,  {association: "menores" , include:"roles"}]} );
        res.send({"publicacion": dataCREA}); 
    } catch (e) {
        handleHttpError(res,500,e);
    }
}

const deletePubl = async (req, res) => {
    try {
        console.log(req.id)
        const { id } = req.params;       
        const data = await Publicacion.destroy({ where:{id: id }} );    
        res.send({Deleted: data});
    } catch (e) {
        handleHttpError(res,500,e);
    }
}  

const queryArray = function (valor, tipo){
    let query = ""
    if (Array.isArray(valor)){     
        let le = 0       
        valor.forEach(element => {
            let or = ""  
            if (valor[le+1]){
                or = "OR "                    
            }
            query = query + "`"+tipo+"`.`nombre` LIKE '%"+element+"%' " + or
            le++
        });
    } else  if (valor){
        query = query + "`"+tipo+"`.`nombre` LIKE '%"+valor+"%' "
    } 
    return query
}

module.exports = { getPubl, createPubl, updatePubl, deletePubl , getAllPubl };