import { useState, useEffect } from 'react';

const AddTask = (props) => {

    const {onSubmitNewTask, onSubmitNewSubTask, taskId, taskName, getTaskDetails} = props;

    const [newTaskName, setNewTaskName] = useState(taskName);

    useEffect(() => {
        setNewTaskName(taskName)
    }, [taskName])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        let taskId = e.target.taskId.value
        if(taskId.trim().length !== 0){
            onSubmitNewSubTask(taskName);
        }else{
            onSubmitNewTask(taskName);
        }
        setNewTaskName('');
        taskId = null;
        document.getElementById("closeModal").click()
    };

    const handleOnChangeTaskName = (e) => {
        setNewTaskName(e.target.value);
    }

    const handleResetTaskId = () => {
        getTaskDetails(null, null)
        setNewTaskName('')
    }

    return (
        <>
        <button type="button" className="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#createNewTaskModal" onClick={() => { handleResetTaskId() }}>
            + Create New Task
        </button>
        <div className="modal fade" id="createNewTaskModal" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add New Task</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModal" onClick={() => { handleResetTaskId() }}></button>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="col-form-label">Task Name:</label>
                            <input type="hidden" id="taskId" className="form-control" name="taskId" value={taskId == null ? '' : taskId} />
                            <input type="text" className="form-control" name="task_name" required onChange={handleOnChangeTaskName} value={newTaskName} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-sm btn-primary" onSubmit={handleOnSubmit}>Submit</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </>

    );
}

export default AddTask;