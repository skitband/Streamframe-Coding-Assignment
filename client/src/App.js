import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import ActiveTask from './components/ActiveTask';
import CompletedTask from './components/CompletedTask';

import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import Alert from './components/Alert';

function App() {

  const [tasks, setTasks] = useState([]);
  const [alert, setAlert] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [taskName, setTaskName] = useState('');
  const [newAction, setNewAction] = useState('');
  const [countPending, setCountPending] = useState(0);
  const [countComplete, setcountComplete] = useState(0);

  useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('http://localhost:8080/api/task');
        const data = await response.json();
        const countInprogress = Object.values(data).filter((t) => t.status === "in progress").length;
        const countComplete = Object.values(data).filter((t) => t.status === "complete").length;
        setCountPending(countInprogress);
        setcountComplete(countComplete);
        setTasks(data);
      }
      fetchData()
  }, [tasks])

  const onSubmitFormModal = async (id, name) => {

    var url = '';
    var bodyRequest = {};
    var method = ''

    switch(newAction) {
      case 1: // create new parent task
        url = "http://localhost:8080/api/task";
        bodyRequest = { name: name, status: "in progress" };
        method = "POST"
        break;
      case 2: // create new subtask from parent task id
        url = "http://localhost:8080/api/subtask";
        bodyRequest = { title: name, status: "in progress", taskId: taskId };
        method = "POST"
        break;
      case 3: // edit parent task name
        url = `http://localhost:8080/api/task/${id}`;
        bodyRequest = { name: name };
        method = "PUT"
        break;
      case 4: // edit subtask task name
        url = `http://localhost:8080/api/subtask/${id}`;
        bodyRequest = { title: name };
        method = "PUT"
        break;
      default:
        // code block
    }
    
    await fetch(url, {
      method: method,
      body: JSON.stringify(bodyRequest),
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

  const getTaskDetails = (id, task, action) => {
    setTaskId(id)
    setTaskName(task)
    setNewAction(action)
  }
  
  return (
    <div className="App">
        <div className="px-4 py-5 my-5">
          <h1 className="display-5 fw-bold text-center">Streamframe Coding Assignment</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead m-4 text-center">At Streamline, your role as ‘Software Engineer’ will mainly focus on developing our internal project management tool: Streamframe, as well as other internal tools and projects from time to time.</p>
              <main className="container">
                <div className="col-10 d-flex gap-3 justify-content-end m-2">
                  <AddTask onSubmitFormModal={onSubmitFormModal} taskId={taskId} taskName={taskName} getTaskDetails={getTaskDetails} />
                  <ActiveTask countPending={countPending}/>
                  <CompletedTask countComplete={countComplete}/>
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
