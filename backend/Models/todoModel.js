/**
 * @fileoverview Mongoose model for todo
 */
const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    todoId: {
        type: String,
        required: true
    },
    todoTitle: {
        type: String,
        required: true
    },
    createdBy:{
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    createdOn: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('todo', todoSchema);