var express = require('express');
var Todo = require('./todo');
var app = module.exports = express.Router();

// GET /todos
app.get('/todos', function(req, res) {
    Todo.find({}, function(err, todos) {
        if (err) {
            return res.json({"success": false, "msg": "Error while retrieving Todos", "error": err})
        }

        res.status(200).send({"success": true, "result": todos});
    });
});

// POST /todos
app.post('/todos', function(req, res) {
    if(!req.body.text) {
        return res.status(400).send({"success": false, "msg": "You need to send the text of the todo!"});
    }

    var newTodo = new Todo({
        text: req.body.text
    });

    newTodo.save(function(err) {
        if(err) {
            console.log("Error: ", err);

            return res.json({"success": false, "msg": "Error while creating Todo", "error": err});
        }

        res.status(201).send({"success": true, "msg": "Successfully created new Todo"});
    });
});

// DELETE /todos/{id}
// Remove the specified item
app.delete("/todos/:todoId", function(req, res) {
    var itemId = req.params.todoId;
    if(!itemId || itemId === "") {
        return res.json({"success": false, "msg": "You need to specify the ID of the Todo"});
    }

    Todo.findByIdAndRemove(itemId, function(err, removed) {
        if(err) {
            return res.json({"success": false, "msg": "Error deleting Todo", "error": err});
        }

        res.status(200).json({"success": true, "msg": "Todo deleted!"});
    });
});