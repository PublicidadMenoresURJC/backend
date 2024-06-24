const express = require('express');
const {verifyToken,isAlumnoProfesor,isProfesor} = require("../middlewares/auth/authJWT");
const { validatorGetAllItems,validatorCreateItems,validatorUpdateItems } = require("../middlewares/validators/publicaciones");
const { getPubl, createPubl ,updatePubl, deletePubl ,getAllPubl} = require('../controllers/publicacion');
const { getDistinctPalabrasClave } = require('../controllers/palabraClave');
const { getDistinctRolMenor } = require('../controllers/rolMenor');
const { upload , postFilePublicacion ,deleteFilePublicacion } = require('../controllers/file');
const { importPubl, importImages, uploadImage } = require('../controllers/import');
const router = express.Router();

router.get('/publicaciones',validatorGetAllItems, getAllPubl);
router.get('/publicaciones/:id', getPubl);
router.post('/publicaciones',[verifyToken,isAlumnoProfesor,validatorCreateItems], createPubl);
router.put('/publicaciones',[verifyToken,isAlumnoProfesor,validatorUpdateItems], updatePubl);
router.delete('/publicaciones/:id',[verifyToken,isAlumnoProfesor], deletePubl)
router.get('/palabrasclave', getDistinctPalabrasClave);
router.get('/rolesmenor', getDistinctRolMenor);
router.post('/files',[verifyToken,isAlumnoProfesor,upload.single('file')],postFilePublicacion);
router.delete('/files',[verifyToken,isAlumnoProfesor],deleteFilePublicacion);

router.post('/import',[verifyToken,isProfesor], importPubl);
router.post('/importimage',[verifyToken,isProfesor,uploadImage.single('zipfile')], importImages);


module.exports = router;