const  multer  = require('multer');
const mimeTypes = require('mime-types')
require('dotenv').config();
const fs = require('fs');
const {handleErrorNoFile} = require("../utils/handleError");

const url = process.env.URL;
const path = './public/uploads'

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, path)
    },
    filename: (req,file,cb)=>{            
        const name = Date.now() + "." + mimeTypes.extension(file.mimetype);
        cb(null,name)        
    }
});

const upload = multer({storage});
const postFilePublicacion = async (req, res) =>{
    
    const urlFile = url + '/uploads/' + req.file.filename
    const respuesta = {
        tipo: req.file.mimetype,       
        url: urlFile,
        size : req.file.size,
        filename : req.file.filename
    }
    res.send({file:respuesta});
}

const deleteFilePublicacion = async (req, res) =>{
    const queryparams = req.query;
    console.log(queryparams)
    if(!queryparams.filename){
        handleErrorNoFile(res,"File don't exist")   
        return     
    }
    const file = path +'/'+ queryparams.filename
    console.log(file)
    if(fs.existsSync(file)){ 
        fs.unlinkSync(file)
        res.send({msg:"File deleled"})
    } else {
        handleErrorNoFile(res,"File don't exist")
    }
    
}


module.exports = {upload,postFilePublicacion,deleteFilePublicacion};