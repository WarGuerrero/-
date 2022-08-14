module.exports = app => {
    const tasks = require("../controllers/task.controller.js");

    var router = require("express").Router();

    //Create a new task
    router.post("/", tasks.create);

    //Retrieve all tasks
    router.get("/", tasks.findAll);

    //Update a task with id
    router.put("/:id", tasks.update);

    //Delete a task with id
    router.delete("/:id", tasks.delete);

    router.get("/:id", tasks.getById);

    app.use("/api/tasks", router);
};