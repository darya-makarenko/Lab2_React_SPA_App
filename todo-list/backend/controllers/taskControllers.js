const taskService = require("../services/taskService");

async function findTasks(req,res) {
  taskService.findTasks(req, res);
}

async function createTask(req,res) {
    taskService.createTask(req,res);
}

async function updateTask(req, res) {
    taskService.updateTask(req, res);
}

async function getTask(req, res) {
    taskService.getTask(req, res);
}

async function deleteTask(req, res) {
    taskService.deleteTask(req, res);
}

module.exports = {
    findTasks, 
    createTask,
    updateTask,
    getTask,
    deleteTask
};