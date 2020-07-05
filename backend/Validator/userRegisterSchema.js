/**
 * @fileoverview Joi schema for user register
 */

const joi = require('joi');

const userRegisterSchema = joi.object().keys({
    firstName: joi.string().required().exist(),
    lastName: joi.string().required().exist(),
    email: joi.string().required().normalize().exist().email(),
    password: joi.string().required().exist().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)
})

module.exports = userRegisterSchema;