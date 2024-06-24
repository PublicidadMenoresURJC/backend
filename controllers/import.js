const { sequelize } = require("../config/connection");
require('dotenv').config();
const fs = require('fs');
const Publicacion = require("../models/publicaciones");
const {handleHttpError} = require("../utils/handleError");
const path = require('path');
const unzipper = require('unzipper');
const multer = require('multer');
const mime = require('mime-types');


const importPubl = async (req, res) => {
    try { 
        if (process.env.IMPORT_ACTIVE === 'false') return handleHttpError(res,403,'No disponible');
        const url = process.env.URL;        
        const {body} = req;              
        const publ = body
        publ.forEach(async element => { 
            let parts = element.urlFile.split("/");
            let fileName = parts[parts.length - 1].replace(/%[0-9A-F]{2}/gi, '').replace(/[^a-zA-Z0-9.]/g, '');;    
            element.nameFile = fileName
            element.urlFile =  url + '/uploads/' + fileName
            let partsN = fileName.split(".");
            let extension = partsN[partsN.length - 1];
            element.typeFile = 'image/' + extension            
            await Publicacion.create(element, {include:["palabrasclave" , "roleshombre" ,"rolesmujer", "relacionesgenero" ,  {association: "menores" , include:"roles"}]} );
        }); 
        res.send({body})
    } catch (e) {
        handleHttpError(res,500,e);
    }
}
const pathFile = './public/uploads'
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, pathFile)
    },
    filename: (req,file,cb)=>{            
        let ext = mime.extension(file.mimetype);
        if (!ext) {
            ext = 'zip'; 
          }
        const name = `${Date.now()}.${ext}`;
        cb(null, name);       
    }
});

const uploadImage = multer({storage});
const importImages = async (req,res) =>{
  if (process.env.IMPORT_ACTIVE === 'false') return handleHttpError(res,403,'No disponible');  
  if (!req.file) {
        return handleHttpError(res,403,'No se ha subido ningún archivo');
  }

  const zipFilePath = req.file.path;       

  fs.createReadStream(zipFilePath)
    .pipe(unzipper.Parse())
    .on('entry', function (entry) {
    const fileName = entry.path;
    const fileType = entry.type; 
    const folderName = fileName.split('/')[0]; 

    if (folderName === 'Pregunta' && fileType === 'File') {
      const encodedFileName = cleanFileName(path.basename(fileName)); 
      const fullPath = path.join(pathFile, encodedFileName);
      entry.pipe(fs.createWriteStream(fullPath));
    } else {
      entry.autodrain();
    }
  })
    .on('close', () => {
      fs.unlink(zipFilePath, (err) => {
        if (err) {
          console.error('Error al eliminar el archivo ZIP:', err);
          return res.status(500).send('Error al eliminar el archivo ZIP');
        }
        res.send();
      });
    })
    .on('error', (error) => {
      res.status(500).send('Error al descomprimir el archivo ZIP');
    });
}
const cleanFileName = (fileName) => {  
  let decodedFileName = decodeURIComponent(fileName);
  decodedFileName = decodedFileName.replace(/[^a-zA-Z0-9.]/g, '')
  return decodedFileName;
};


module.exports = { importPubl , importImages , uploadImage};