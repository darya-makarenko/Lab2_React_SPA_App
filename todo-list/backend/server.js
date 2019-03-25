const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const taskControllers = require("./controllers/taskControllers");
const path = require("path");
const multer = require("multer");

const PORT = 4000;

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  };
app.use(cors(corsOptions));
app.use(bodyParser.json());


const storage = multer.diskStorage({
    destination: "../public/pics/",
    filename: function(req, file, cb){
       cb(null, file.originalname);
    }
 });
 
 const upload = multer({
    storage: storage
 });

const todoRoutes = express.Router();
app.use('/todos', todoRoutes);

todoRoutes.get("/", taskControllers.findTasks);
todoRoutes.get("/:id", taskControllers.getTask);
todoRoutes.post("/add", taskControllers.createTask);
todoRoutes.post("/update/:id", taskControllers.updateTask);
todoRoutes.delete("/delete/:id", taskControllers.deleteTask);
todoRoutes.post("/upload", upload.single("uploadedfile"), (req, res) => {
    return res.status(200).send({});
 });

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});