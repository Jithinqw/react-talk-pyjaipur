/**
 * @fileoverview Joi schema for user login
 */

const joi = require('joi');

const userLoginSchema = joi.object().keys({
    email: joi.string().normalize().required().exist().email(),
    password: joi.string().required().exist().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)
})

module.exports = userLoginSchema;