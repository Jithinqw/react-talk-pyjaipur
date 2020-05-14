/**
 * @fileoverview Express router for todo
 */
const router = require('express').Router(),
    JWTCertifier = require('../Helpers/JWTCertifier'),
    todoAddController = require('../Controllers/todo/createTodoController'),
    getAllTodoController = require('../Controllers/todo/getTodoController'),
    updateTodoController = require('../Controllers/todo/updateStatusController'),
    deleteTodoController = require('../Controllers/todo/deleteTodoController');

router.post('/create', JWTCertifier.verifyJWT, todoAddController.createTodo);
router.get('/all', JWTCertifier.verifyJWT, getAllTodoController.getAllTodos);
router.put('/update', JWTCertifier.verifyJWT, updateTodoController.updateTodoStatus);
router.delete('/delete/:todoId', JWTCertifier.verifyJWT, deleteTodoController.deleteTodo);

module.exports = router;