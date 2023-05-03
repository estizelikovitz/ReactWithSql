import React from 'react';


function PersonRow({ person, onDeleteClick, onUpdateClick }) {
    const { firstName, lastName, age } = person;
    return (
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button onClick={onDeleteClick} className='btn btn-danger btn-block'>Delete</button>
                <button onClick={onUpdateClick} className='btn btn-warning btn-block'>Update</button>

            </td>
        </tr>
    )
}


export default PersonRow;