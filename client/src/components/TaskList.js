import React, { useEffect, useState } from 'react';

const TaskList = (props) => {

    const {id, task, tasktatus, subtasks, getTaskDetails} = props;

    const [dependencies, setDependencies] = useState({});
    const [isChecked, isSetChecked] = useState(false);
    const [countDoneDep, setCountDoneDep] = useState();
    const [newTaskStatus, setNewTaskStatus] = useState(tasktatus);

    useEffect(() => {
        setNewTaskStatus(tasktatus)
    }, [tasktatus])

    const handleGetTaskId = (id, task, action) => {
        console.log(id)
        getTaskDetails(id, task, action);
    }

    const getDependcyTask = async (id) => {
        const response = await fetch(`http://localhost:8080/api/subtask/${id}`);
        const data = await response.json();
        setDependencies(data.rows);
        handleDoneDep(data.rows);
        if(data.count != 0){
            handleSubtaskStatus(data.rows);
        }
    }

    const onHandleCheck = async (e) => {
        isSetChecked(e.target.checked);
        let sid = e.target.value;
        let status = e.target.checked ? "done" : "in progress";

        await fetch(`http://localhost:8080/api/subtask/${sid}`, {
          method: "PUT",
          body: JSON.stringify({
            status: status,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            getDependcyTask(id);
            handleDoneDep(data);
        })
        .catch((error) => console.log(error));
        
    };

    const updateMainTask = async (status) => {

        await fetch(`http://localhost:8080/api/task/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            status: status,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => console.log(error));
    };

    const handleDoneDep = (data) => {
        
        const d = Object.values(data).filter((element) => {
           return element.status === "done";
        });
        setCountDoneDep(d.length);
    }

    const handleSubtaskStatus = (data) => {

        const isAllDone = Object.values(data).every(dep => dep.status === "done");
        const isDone = Object.values(data).filter((dep) => dep.status === "done").length;
        const isAllPending = Object.values(data).every(dep => dep.status === "in progress");
        let status = ''

        if(isAllPending) {
            status = "in progress"
        }
        if(isDone >= 1) {
            status = "done"
        }
        if(isAllDone) {
            status = "complete"
        }
        updateMainTask(status);
    }

    const handleDropDownStatus = (e) => {
        let selectedStatus = e.target.getAttribute('data-status-value');
        setNewTaskStatus(selectedStatus);
        updateMainTask(selectedStatus);
    }

    const isStrikeThrough = (item) => {
        return item == 'done' ? "text-decoration-line-through" : "";
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="col-8 m-2">
                <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                        <div className="fw-bold mb-1">
                            <a data-bs-toggle="collapse" href={`#collapseSubtaskContainer${id}`} role="button" className="btn btn-sm btn-outline-secondary text-dark position-relative" onClick={() => getDependcyTask(id)}>
                            { task } 
                            {subtasks.length > 0 &&
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {subtasks.length}
                                <span className="visually-hidden">number of subtasks</span>
                                </span>
                            }
                            </a>
                            <a href="#" data-bs-toggle="modal" data-bs-target="#createNewTaskModal" className="mx-3 text-decoration-none" onClick={() => { handleGetTaskId(id, task, 3)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="black" className="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                        <div className="btn-group">
                            <button className="btn btn-outline-primary btn-sm dropdown-toggle d-flex justify-content-between align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{width: "100px"}}>
                                { newTaskStatus }
                            </button>
                            <ul className="dropdown-menu">
                                {newTaskStatus == 'in progress' &&
                                    <>
                                    <li><a className="dropdown-item" href="#" data-status-value="done" onClick={handleDropDownStatus}>Done</a></li>
                                    <li><a className="dropdown-item" href="#" data-status-value="complete" onClick={handleDropDownStatus}>Complete</a></li>
                                    </>
                                }
                                {newTaskStatus == 'done' &&
                                    <>
                                    <li><a className="dropdown-item" href="#" data-status-value="in progress" onClick={handleDropDownStatus}>In progress</a></li>
                                    <li><a className="dropdown-item" href="#" data-status-value="complete" onClick={handleDropDownStatus}>Complete</a></li>
                                    </>
                                }
                                {newTaskStatus == 'complete' &&
                                    <>
                                    <li><a className="dropdown-item" href="#" data-status-value="in progress" onClick={handleDropDownStatus}>In progress</a></li>
                                    <li><a className="dropdown-item" href="#" data-status-value="done" onClick={handleDropDownStatus}>Done</a></li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-footer bg-white border-0 p-1 d-flex justify-content-center">
                    <div className="collapse col-12 px-3" id={`collapseSubtaskContainer${id}`}>
                        <ul className="border-bottom border-1 mx-5" style={{ listStyle: "none"}}>
                        { subtasks ? subtasks.map((subtask, index) => {
                            return <li key={index} className="list-group-item d-flex justify-content-between align-items-center py-1" style={{ marginLeft: "-30px", borderBottom: "1px dotted #e9ecef"}}>
                                <div>
                                    <input className="form-check-input me-1" type="checkbox" value={subtask.id} onChange={onHandleCheck} checked={ subtask.status == 'in progress' ? false : true } /> 
                                    <span className={isStrikeThrough(subtask.status)}>{ subtask.title }</span>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#createNewTaskModal" className="mx-3 text-decoration-none" onClick={() => { handleGetTaskId(subtask.id, subtask.title, 4)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="black" className="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                        </svg>
                                    </a>
                                </div>
                              <span className="badge bg-primary rounded-pill">{ subtask.status }</span>
                            </li>
                          
                        }) : <span>No Subtask</span>}
                        </ul>
                        <div className="d-flex justify-content-between">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#createNewTaskModal" className="text-secondary" onClick={() => { handleGetTaskId(id, null, 2)}}>
                                + add subtask
                            </a>
                            <div>
                                <span className="mx-1 badge text-bg-secondary rounded-pill bg-secondary">total: { dependencies.length }</span>
                                <span className="badge text-bg-secondary rounded-pill bg-success"># done: { countDoneDep }</span>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default TaskList;