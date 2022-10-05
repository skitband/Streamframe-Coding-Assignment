import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import ActiveTask from './components/ActiveTask';
import CompletedTask from './components/CompletedTask';
import DoneTask from './components/DoneTask';

import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import Alert from './components/Alert';

function App() {

  const [tasks, setTasks] = useState([]);
  const [alert, setAlert] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [taskName, setTaskName] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('http://localhost:8080/api/task');
        const data = await response.json();
        setTasks(data);
      }
      fetchData()
  }, [tasks])

  const onSubmitNewTask = async (task_name) => {
    
    await fetch('http://localhost:8080/api/task', {
      method: "POST",
      body: JSON.stringify({
        name: task_name,
        status: "in progress"
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status == 200) {
          setAlert(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const onSubmitNewSubTask = async (task_title) => {
    
    await fetch('http://localhost:8080/api/subtask', {
      method: "POST",
      body: JSON.stringify({
        title: task_title,
        status: "in progress",
        taskId: taskId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status == 200) {
          setAlert(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const getTaskDetails = (id, task) => {
    setTaskId(id)
    setTaskName(task)
    console.log(id, task)
  }
  
  return (
    <div className="App">
        <div className="px-4 py-5 my-5">
          <h1 className="display-5 fw-bold text-center">Streamframe Coding Assignment</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead m-4 text-center">At Streamline, your role as ‘Software Engineer’ will mainly focus on developing our internal project management tool: Streamframe, as well as other internal tools and projects from time to time.</p>
              <main className="container">
                <div className="col-10 d-flex gap-3 justify-content-end m-2">
                  <AddTask onSubmitNewTask={onSubmitNewTask} onSubmitNewSubTask={onSubmitNewSubTask} taskId={taskId} taskName={taskName} getTaskDetails={getTaskDetails} />
                  <ActiveTask />
                  <CompletedTask />
                  <DoneTask />
                </div>
                { alert ? <Alert/> : null}
                {tasks.map((task, index) => {
                    return <TaskList key={index} id={task.id} task={task.name} tasktatus={task.status} subtasks={task.subtasks} getTaskDetails={getTaskDetails}/>
                })}
              </main>
          </div>
        </div>
    </div>
  );
}

export default App;
