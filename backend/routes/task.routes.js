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
    router.put("/task/status/:id", tasks.updateTask);

    // // Find and Count all Done SubTask with id
    router.get("/subtask/:id", tasks.findAndCountAllSubtask);

    // // Update SubTask status with id
    router.put("/subtask/status/:id", tasks.updateSubtaskStatus);
  
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/api', router);
  };