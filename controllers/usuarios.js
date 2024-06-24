const { sequelize } = require("../config/connection");
const  {sign} =  require("jsonwebtoken");
require('dotenv').config();
const {Usuario,encriptar,comparar} = require("../models/usuario");
const {handleHttpError} = require("../utils/handleError");
const nodemailer = require('nodemailer')
const crypto = require('crypto');

const signUp = async (req,res) =>{
    try {
        const {body} = req;            
        const count = await Usuario.count({ where:{email: body.email }})    
        if (count > 0){
            return handleHttpError(res, 403 ,"Email ya existente");
        }
        body.rol = "I"        
        const passEncriptada = await encriptar(body.pass)        
        body.pass = passEncriptada        
        console.log(body)
        const data = await Usuario.create(body); 
        const token = sign({id: data.id}, process.env.SECRET, {
            expiresIn: 86400 // 24 HORAS
        })
        res.json({token,rol:data.rol});
    } catch (e) {
        handleHttpError(res,500,e);
    }
}

const signIn = async (req,res) =>{
    try {
        const {body} = req; 
        console.log(body)
        const usuario = await Usuario.findOne({ where:{email: body.email }})   
        if (!usuario){
            return handleHttpError(res,400,"email no existente");
        } 
        const correctPass = await comparar(body.pass,usuario.pass)
        if (!correctPass){
            return handleHttpError(res,401,"pass erronea");
        }
        const token = sign({id: usuario.id}, process.env.SECRET, {
            expiresIn: 86400 // 24 HORAS
        })
        res.json({token,rol:usuario.rol});
    } catch (e) {
        handleHttpError(res,500,e);
    }
    
}

const changePass = async (req, res) => {
    try{
        console.log(req.userID)
        const id = req.userID
        const {body} = req        
        const usuario = await Usuario.findByPk(id)
        const correctPass = await comparar(body.oldpass,usuario.pass)
        if (!correctPass){
            return handleHttpError(res,401,"pass anterior erronea");
        }
        const passEncriptada = await encriptar(body.pass)        
        body.pass = passEncriptada
        const data = await Usuario.update({pass:body.pass},{where:{id:id}})        
        res.json({data});
    } catch (e) {
        handleHttpError(res,500,e);
    }
    
}

const changeUser = async (req, res) => {
    try{
        console.log(req.userID)        
        const id = req.userID        
        const {body} = req
        console.log(body)
        const count = await Usuario.count({ where:{email: body.email }})    
        if (count > 0){
            const usuario = await Usuario.findByPk(id)
            if (usuario.email !== body.email)
                return handleHttpError(res, 403 ,"Email ya existente");
        }   
        console.log(count)    
        const data = await Usuario.update({nombre:body.nombre,email:body.email},{where:{id:id}})   
        console.log(data)  
        res.json({data});
    } catch (e) {
        handleHttpError(res,500,e);
    }
    
}

const getAllUser = async (req, res) => {
    try{
        const data = await Usuario.findAll({attributes:['id','nombre','email','rol'], order:[['id', 'ASC']] })
        res.json({"usuarios":data});
    } catch (e) {
        handleHttpError(res,500,e);
    }
    
}

const getUser = async (req, res) => {
    try{
        console.log(req.userID)
        const id = req.userID
        const data = await Usuario.findByPk(id,{attributes:['id','nombre','email','rol'] })
        res.json({"usuario":data});
    } catch (e) {
        handleHttpError(res,500,e);
    }
    
}

const updateRolUsers = async (req, res) => {
    try{            
        const {body} = req
        console.log(body)        
        const usuarios = body.usuarios        
        usuarios.forEach(async element => {            
            await Usuario.update({rol:element.rol},{where:{id:element.id}})   
        });        
        res.json({"message":"Usuarios actualizados"});
    } catch (e) {
        handleHttpError(res,500,e);
    }
    
}

const createOrUpdateUsers = async (req, res) => {
    try{            
        const {body} = req   
        console.log(body)       
        const usuarios = body.usuarios        
        usuarios.forEach(async element => {
            const usuario = await Usuario.findOne({ where:{email: element.email }})   
            if(usuario){
                await Usuario.update({rol:element.rol},{where:{id:usuario.id}})   
            } else {                   
                const passEncriptada = await encriptar(element.DNI)        
                element.pass = passEncriptada          
                await Usuario.create(element)   
            }
        });        
        res.json({"message":"Usuarios creados"});
    } catch (e) {
        handleHttpError(res,500,e);
    }
    
}

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_MAIL,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

const recoverPass = async (req, res) => {
    try{            
        const {body} = req 
        console.log(body)       
        const email = body.email  
        const usuario = await Usuario.findOne({ where:{email}})   
        if (!usuario){
            return handleHttpError(res,400,"email no existente");
        }  
        const pass = crypto.randomBytes(10).toString('base64').slice(0, 10);  
        const passEncriptada = await encriptar(pass)        
        await Usuario.update({pass:passEncriptada},{where:{email}}) 
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: email, 
            subject: 'Cambio contraseña', 
            html:`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Nueva Contraseña</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        color: #333;
                        background-color: #f4f4f4;
                    }
                    .container {
                        background-color: #fff;
                        border-radius: 8px;
                        padding: 20px;
                        max-width: 600px;
                        margin: 20px auto;
                    }
                    h1 {
                        color: #c2185b;
                    }
                    p {
                        line-height: 1.5;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Nueva Contraseña</h1>
                    <p>Hola,</p>
                    <p>Tu nueva contraseña es: <strong>${pass}</strong></p>
                    <p>Te recomendamos cambiar esta contraseña temporal lo antes posible por motivos de seguridad. Puedes cambiar tu contraseña en la sección de perfil de tu cuenta una vez que inicies sesión.</p>
                    <p>Si no has solicitado una nueva contraseña, por favor ignora este correo o ponte en contacto con su profesor.</p>
                    <p>Saludos,<br>El equipo de Grupo de Innovación Educativa GIGAMAPS</p>                    
                </div>
            </body>
            </html>
            `
        };
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return handleHttpError(res,500,error); 
        }
            res.json({ message: 'Correo enviado', info });
        });      
        
    } catch (e) {
        handleHttpError(res,500,e);
    }
    
}

module.exports = {signUp,getAllUser,signIn,getUser,changePass,changeUser,updateRolUsers,createOrUpdateUsers,recoverPass}