/**
 * @fileoverview Express router for auth
 */
const router = require('express').Router(),
    registerController = require('../Controllers/auth/userRegisterController'),
    loginController = require('../Controllers/auth/userLoginController'),
    logoutController = require('../Controllers/auth/userlogoutController'),
    validationMiddleware = require('../Validator/middleware'),
    registerUserSchema = require('../Validator/userRegisterSchema'),
    loginUserSchema = require('../Validator/userLoginSchema'),
    JWTCertifier = require('../Helpers/JWTCertifier');

router.post('/register', validationMiddleware(registerUserSchema), registerController.userRegister);
router.post('/login', validationMiddleware(loginUserSchema), loginController.userLogin);
router.post('/logout', JWTCertifier.verifyJWT, logoutController.logout);

module.exports = router;