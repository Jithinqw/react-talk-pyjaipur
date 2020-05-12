const userModel = require('../../Models/userModel'),
    generateId = require('../../Helpers/generateId'),
    passwordValidator = require('../../Helpers/passwordValidations'),
    validator = require('cerberus-validator');

/**
 * @exports userRegister
 * @desc Users register contoller for new users.
 */
exports.userRegister = (req, res) => {
    if (!req.body.firstName || !req.body.lastName|| !req.body.email || !req.body.password) {
        res.status(422).json('Invalid number of parameters passed. Please send all the required paramters.');
    } else if (
        validator.isEmailValid(req.body.email) &&
        passwordValidator.isPasswordValid(req.body.password) === false
    ) {
        res.status(422).json('Invalid email or password');
    } else {
        userModel.find({ email: req.body.email }, (err, users) => {
            if (err) {
                res.status(400).json(err);
            } else {
                if (!users.length) {
                    userModel.create(
                        {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            userId: generateId(8),
                            email: req.body.email,
                            profilePic: "4",
                            password: passwordValidator.generatePasswordHash(
                                req.body.password
                            ),
                        },
                        (error, newUser) => {
                            if (error) {
                                res.status(400).json(error)
                            } else {
                                res.status(201).json(
                                    'User successfully created.'
                                );
                            }
                        }
                    )
                } else {
                    res.status(400).json(
                        'User already exist. Please try again later.'
                    );
                }
            }
        })
    }
}