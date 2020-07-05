/**
 * @fileoverview Joi schema for createtodo 
 */

const joi = require('joi');

const createTodoSchema = joi.object().keys({
    todoTitle: joi.string().exist().required()
})

module.exports = createTodoSchema;