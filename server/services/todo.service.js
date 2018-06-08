var ToDo = require('../models/todo.model');

_this = this;

exports.getTodos = async (query, page, limit) => {
    var options = {
        page,
        limit
    };

    try {
        let todos = await ToDo.paginate(query, options);

        return todos;
    } catch(e) {
        throw Error(e);
    }
}

exports.createTodo = async (todo) => {
    var newTodo = new ToDo({
        title: todo.title,
        description: todo.description,
        date: new Date(),
        status: todo.status
    });

    try {
        let savedTodo = await newTodo.save();

        return savedTodo;
    } catch(e) {
        throw Error('Error while Paginating Todos');
    }
}

exports.updateTodo = async (todo) => {
    var id = todo.id;

    try {
        var oldTodo = await ToDo.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Todo")        
    }

    if (!oldTodo) return false;

    console.log(oldTodo);

    oldTodo.title = todo.title;
    oldTodo.description = todo.description;
    oldTodo.status = todo.status;

    console.log(oldTodo);

    try {
        let savedTodo = await oldTodo.save();
        
        return savedTodo;
    } catch (e) {
        throw Error("And Error occured while updating the Todo");
    }
}

exports.deleteTodo = async (id) => {
    try {
        let deleted = await ToDo.remove({_id: id});

        if (deleted.result.n < 1) {
            throw Error("Todo Could not be deleted");
        }

        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Todo");
    }
}