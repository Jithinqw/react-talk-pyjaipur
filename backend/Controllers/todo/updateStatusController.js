/**
 * @fileoverview Controller for updating todo status
 */

const todoModel = require('../../Models/todoModel');

exports.updateTodoStatus = (req, res) => {
    if(!req.body.todoId || !req.body.status) {
        res.status(422).json('TodoId  and status is required. Please provide a todo Id');
    } else {
        todoModel.find({todoId: req.body.todoId}, (error, todo)=> {
            if(error) {
                res.status(400).json(error);
            } else if(!todo.length) {
                res.status(400).json("Todo not found");
            } else {
                todoModel.findOneAndUpdate({todoId: req.body.todoId}, {$set:{status:req.body.status}}, (err, update)=> {
                    if(err) {
                        res.status(400).json(err);
                    } else {
                        res.status(201).json("Todo status updated");
                    }
                })
            }
        })
    }
}