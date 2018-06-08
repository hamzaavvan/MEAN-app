var TodoServices = require('../services/todo.service');

_this = this;

exports.getTodos = async (req, res, next) => {
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var todos = await TodoServices.getTodos({}, page, limit);

        return res.status(200).json({status: 200, data: todos, message: "Successfully Todos Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createTodo = async (req, res, next) => {
    var todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
    }

    try {
        var createdTodo = await TodoServices.createTodo(todo);

        return res.status(201).json({status: 201, data: createdTodo, message: "Successfully created todo"});
    } catch (e) {
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"});
    }
}

exports.updateTodo = async (req, res, next) => {
    if (!req.body._id) {
        res.status(400).json({status: 400, message: "Id must be present"});
    }

    var id = req.body._id;
    console.log(req.body);

    var todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    };

    try {
        var updatedTodo = await TodoServices.updateTodo(todo);

        return req.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Tod"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeTodo = async (req, res, next) => {
    var id = req.params.id;

    try {
        var deleted = await TodoServices.removeTodo(id);

        return res.status(200).json({status: 200, message: "Successfully Todo Removed"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}