/**
 * @fileoverview Controller for user login
 */
var userModel = require('../../Models/userModel'),
    passwordValidator = require('../../Helpers/passwordValidations'),
    JWTCertifier = require('../../Helpers/JWTCertifier'),
    validator = require('cerberus-validator');

/**
 * @exports userLogin
 * @desc Userlogin for existing users
 */
exports.userLogin = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(422).json('Invalid email or password')
    } else if (
        validator.isEmailValid(req.body.email) &&
        passwordValidator.isPasswordValid(req.body.password) !== true
    ) {
        res.status(422).json('Invalid email or password');
    } else {
        userModel.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                res.status(400).json(err);
            } else {
                if (!user) {
                    res.status(400).json('User does not exist');
                } else if (
                    passwordValidator.comparePassword(
                        req.body.password,
                        user.password
                    ) === false
                ) {
                    res.status(401).json('Passwords does not match');
                } else {
                    let token = JWTCertifier.generateJWT(
                        user.email,
                        user.userId
                    )
                    res.status(200).json({
                        token: token,
                        status: true,
                    })
                }
            }
        })
    }
}