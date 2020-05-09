/**
 * @fileoverview Controller for creating todos
 */

var todoModel = require('../../Models/todoModel'),
    generateId = require('../../Helpers/generateId'),
    JWTCertifier = require('../../Helpers/JWTCertifier');

/**
 * @exports createTodo
 * @description Creates a new todo.
 */
exports.createTodo = (req, res)=>{
    if(!req.body.todoTitle){
        res.status(422).json('Invalid number of parameters');
    }else{
        userPayload = JWTCertifier.getTokenPayload(req);
        if(userPayload){
            todoModel.create({
                todoId: generateId.generateUserId(),
                todoTitle: req.body.todoTitle,
                status: 'pending'
            }, (err, todo)=>{
                if(err){
                    res.status(400).json(err);
                }else{
                    res.status(201).json('Todo created');
                }
            })
        }else{
            res.status(401).json('Invalid token provided. Please use a valid token.');
        }
    }
}