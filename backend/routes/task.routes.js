module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Task
    router.post("/task", tasks.createTask);

    // Create a new Task
    router.post("/subtask", tasks.createSubtask);
  
    // // Retrieve all Task
    router.get("/task", tasks.findAll);

    // // Update SubTask status with id
    router.put("/task/:id", tasks.updateTask);

    // // Find and Count all Done SubTask with id
    router.get("/subtask/:id", tasks.findAndCountAllSubtask);

    // // Update SubTask status with id
    router.put("/subtask/:id", tasks.updateSubtask);
  
    app.use('/api', router);
  };