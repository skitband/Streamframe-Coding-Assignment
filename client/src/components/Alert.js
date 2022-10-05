import React from 'react'

export default function Alert() {

    return (
        <div className="d-flex justify-content-center">
            <div className="col-8 alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> New task is created ...
            </div>
        </div>
    )
}
