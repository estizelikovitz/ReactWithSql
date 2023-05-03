import React from 'react';

export default function UpdatePerson({ firstName, lastName, age, onTextChange, onSaveClick,onCancelClick }) {
    return <div className="row jumbotron">
        <div className="col-md-3">
            <input value={firstName} onChange={onTextChange} name='firstName' type="text" className="form-control" />
        </div>
        <div className="col-md-3">
            <input value={lastName} onChange={onTextChange} name='lastName' type="text" className="form-control" />
        </div>
        <div className="col-md-3">
            <input value={age} onChange={onTextChange} name='age' type="text" className="form-control" />
        </div>
        <div className="col-md-3">
            <button onClick={onSaveClick} className='btn btn-primary btn-block'>Save</button>
        </div>
        <div className="col-md-3">
            <button onClick={onCancelClick} className='btn btn-danger btn-block'>Cancel</button>
        </div>
    </div>
}