/**
 * @fileoverview Express router for auth
 */
const router = require('express').Router(),
    registerController = require('../Controllers/auth/userRegisterController'),
    loginController = require('../Controllers/auth/userLoginController'),
    logoutController = require('../Controllers/auth/userlogoutController'),
    JWTCertifier = require('../Helpers/JWTCertifier');

router.post('/register', registerController.userRegister);
router.post('/login', loginController.userLogin);
router.post('/logout', JWTCertifier.verifyJWT, logoutController.logout);

module.exports = router;