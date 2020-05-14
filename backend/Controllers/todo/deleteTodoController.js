const todoModel = require('../../Models/todoModel');

exports.deleteTodo = (req, res) => {
    if(!req.params.todoId) {
        res.status(422).json("TodoId is required. Please send all the required fields");
    } else {
        todoModel.find({todoId: req.params.todoId}, (err, todo)=> {
            if(err) {
                res.status(400).json(err);
            } else if(!todo.length) {
                res.status(400).json("Todo not found");
            } else{
                todoModel.findOneAndRemove({todoId: req.params.todoId}, (error, todo)=>{
                    if(error) {
                        res.status(400).json(error);
                    } else {
                        res.status(200).json(`${req.params.todoId} is successfully deleted`);
                    }
                })
            }
        })
        
    }
}