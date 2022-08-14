const { tasks } = require("../models");
const db = require("../models");
const Task = db.tasks;

//Create and Save a new Task
exports.create = async (req, res) => {
    //Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Necesitas un nombre" });
        return;
    }

    if (!req.body.description) {
        res.status(400).send({ message: "Necesitas una descripción" });
        return;
    }

    const body = req.body

    //Create a Task
    const newTask = await Task.create({
        title: body.title,
        description: body.description
    })

    console.log("Nuev tarea", newTask)

    res.json({
        data: newTask,
        message: "Tarea creada"
    });
};

//Retrieve all Task from the database.
exports.findAll = async (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    const tasks = await Task.find()

    res.json({
        data: tasks,
    });
};

//Update a Task by the id in the request
exports.update = async (req, res) => {

     //Validate request
     if (!req.body.title) {
        res.status(400).send({ message: "Necesitas un titulo" });
        return;
    }

    if (!req.body.description) {
        res.status(400).send({ message: "Necesitas una descripción" });
        return;
    }

    const id = req.params.id;

    const body = req.body;

    const tasksUpdate = await Task.findByIdAndUpdate(
        { _id: id },
        {
           title: body.title,
           description: body.description, 
        }
    );

    res.json({
        data: tasksUpdate,
        message: "Tarea actualizada"
    });
};

//Delete a Task with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    const taskDelete = await Task.findByIdAndDelete(id)

    res.json ({
        message: "Tarea eliminada"
    })
};

exports.getById = async (req, res) => {
    const id = req.params.id;

    const taskById = await Task.findById(id)

    res.json ({
        data : taskById, 
        message: "Tarea obtenida"
    })
};