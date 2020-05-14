/**
 * @fileoverview Controller for getting the todos
 */

const todoModel = require('../../Models/todoModel'),
    userModel = require('../../Models/userModel'),
    JWTCertifier = require('../../Helpers/JWTCertifier');

/**
 * @exports getAllTodos
 */
exports.getAllTodos = async (req, res) => {
    var userPayload = await JWTCertifier.getTokenPayload(req);
    if(userPayload) {
        userModel.find({ email: userPayload.email }, (err, user) => {
            if(err) {
                res.status(400).json(err);
            } else {
                todoModel.find({
                    createdBy:  user[0].userId
                  }, (error, data)=>{
                      if(error) {
                          res.status(400).json(err);
                      } else if(!data.length) {
                          res.status(204).json("No todo found.");
                      } else {
                          res.status(200).json(data);
                      }
                  })
            }
        })
    }
}
