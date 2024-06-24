const express = require('express');
const router = express.Router();
const { signUp , getAllUser , signIn, getUser,changePass,changeUser,updateRolUsers,createOrUpdateUsers,recoverPass} = require('../controllers/usuarios');
const {verifyToken,isProfesor} = require("../middlewares/auth/authJWT");
const { validatorSignUp,validatorSignIn,validatorChangePass,validatorChangeUser,validatorUpdateRol,validatorCreateUsers } = require("../middlewares/validators/usuarios");

router.post('/signup',validatorSignUp,signUp);
router.post('/signin',validatorSignIn,signIn);
router.put('/changepass',[verifyToken,validatorChangePass],changePass);
router.put('/changeuser',[verifyToken,validatorChangeUser],changeUser);
router.put('/recoverpass',recoverPass);
router.get('/users',[verifyToken,isProfesor],getAllUser);
router.put('/users',[verifyToken,isProfesor,validatorUpdateRol],updateRolUsers);
router.post('/users',[verifyToken,isProfesor,validatorCreateUsers],createOrUpdateUsers);
router.get('/user',verifyToken,getUser);


module.exports = router;