/**
 * @fileoverview Express router for todo
 */
const router = require('express').Router();
const todoAddController = require('../Controllers/todo/createTodoController');
// const todoDeleteController = require('../Controllers/todo/deleteController');
// const todoUpdateController = require('../Controllers/todo/changeTodoStatusController');
// const todoGetController = require('../Controllers/todo/getTodoContoller');

router.post('/new', todoAddController.createTodo);
// router.get('/todo/:id', todoGetController);
// router.delete('/todo/delete/:id', todoDeleteController);
// router.put('/todo/:id', todoUpdateController);

module.exports = router;