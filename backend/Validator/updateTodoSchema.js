/**
 * @fileoverview Joi Schema for update todo schema
 */

const joi = require('joi');

const updateTodoSchema = joi.object().keys({
    todoId: joi.string().required().exist(),
    status: joi.string().required().exist()
})

module.exports = updateTodoSchema;