const CompletedTask = ({countComplete}) => {
    return (
        <button type="button" className="btn btn-sm btn-success">
            Completed Task: <span className="badge text-bg-success">{countComplete}</span>
        </button>
    );
}

export default CompletedTask;