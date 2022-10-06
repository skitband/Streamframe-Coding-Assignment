const ActiveTask = ({countPending}) => {
    return (
        <button type="button" className="btn btn-sm btn-secondary">
            In Progress Task: <span className="badge text-bg-secondary">{countPending}</span>
        </button>
    );
}

export default ActiveTask;