/**
 * @fileoverview Mongoose model for todo
 */
var mongoose = require('mongoose');
var userModel = require('./userModel');

var todoSchema = new mongoose.Schema({
    todoId: {
        type: String,
        required: true
    },
    todoTitle: {
        type: String,
        required: true
    },
    createdBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    }],
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'deleted'],
        default: 'pending'
    },
    createdOn: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('todo', todoSchema);