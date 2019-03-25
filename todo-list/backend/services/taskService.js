const db = require("../helpers/dbHelper");
const Todo = db.Todo;

async function findTasks(req, res) {
  try {
    const todos = await Todo.find({});
    return res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    res.status(404).send([]);
  }
}

async function createTask(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
    });
}

function updateTask(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.name = req.body.todo_name;
            todo.summary = req.body.todo_summary;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
}

async function getTask(req, res) {
    let id = req.params.id;
    try {
        const todo = await Todo.findById(id);
        return res.status(200).json(todo);   
    }   
    catch (err) {
        console.log(err);
        res.status(404).send([]); 
    }
};


async function deleteTask(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            
            todo.remove().then(todo => {
                res.json('Todo deleted!');
            })
            .catch(err => {
                res.status(400).send("Delete not possible");
            });
    });
}

module.exports = {
    findTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask
  };