const db = require("../models");
const Task = db.tasks;
const Subtask = db.subtasks;

exports.createTask = (req, res) => {

  const task = {
    name: req.body.name,
    status: req.body.status
  };

  Task.create(task)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating data."
      });
    });
};

exports.createSubtask = (req, res) => {

  const subtask = {
    title: req.body.title,
    status: req.body.status,
    taskId: req.body.taskId
  };

  Subtask.create(subtask)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating data."
      });
    });
};

exports.findAll = (req, res) => {

    Task.findAll({
      include: ["subtasks"],
    }).then((data) => {
      res.send(data);
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all and count subtask with id
exports.findAndCountAllSubtask = (req, res) => {

  const condition = {
    taskId: req.params.id,
  };
  
  Subtask.findAndCountAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });

};

// Update a subtask status by the id in the request
exports.updateSubtaskStatus = (req, res) => {

  const id = req.params.id;

  Subtask.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status: 200,
          message: "Subtask was updated successfully."
        });
      } else {
        res.send({
          message: "Cannot update Subtask"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating subtask " + err
      });
    });
};

// Update a task status by the id in the request
exports.updateTask = (req, res) => {

  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status: 200,
          message: "Task was updated successfully."
        });
      } else {
        res.send({
          message: "Cannot update Task"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating task " + err
      });
    });
};