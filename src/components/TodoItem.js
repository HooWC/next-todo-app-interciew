import React, { useState } from 'react'
import EditTodo from "./EditTodo";
import { isValid } from 'date-fns';

export default function TodoItem(props) {

    // hooks function
    const { todo, toggleComplete, deleteTodo, editTodo } = props;

    // Whether Edit Modal is displayed
    const [isEditing, setIsEditing] = useState(false);

    // get task start date
    const startDate = todo.startDate ? new Date(todo.startDate) : null;
    // get task due date
    const dueDate = todo.dueDate ? new Date(todo.dueDate) : null
    // Logic: Auto confirm is the time correct
    const isValidDate = (date) => date && !isNaN(date.getTime());

    // !completed function & update completed function
    const handleCheck = () => {
        toggleComplete(todo.id)
    }

    // Show edit modal
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Don't show edit modal
    const handleCancel = () => {
        setIsEditing(false);
    };

    // Edit Task Info
    const handleSave = (updatedTodo) => {
        editTodo(updatedTodo);

        // Turn off edit modal
        setIsEditing(false);
    };

    // Display Task Infomation
    const renderTodoDetails = () => {
        return (
            <div className="d-flex align-items-center">
                <div className="form-check">

                    {/* Checkbox */}
                    <input type="checkbox" checked={todo.completed} onChange={handleCheck} className="form-check-input me-2 shadow-lg rounded-3" style={{
                        border: '3px solid black'
                    }} />

                    <label className="form-check-label fw-bold" style={{ fontSize: '0.9rem' }}>

                        {/* Display Category Data */}
                        <small className={`fw-bold ${todo.completed ? 'text-warning' : 'text-primary'}`}>[{todo.category}]</small>
                        <br />

                        {/* Display Task Name Data */}
                        <div className="taskName">
                            {todo.task}
                        </div>
                        <br />

                        {/* Display Start + Due Date Data */}
                        <small>
                            {isValidDate(startDate) ? startDate.toLocaleDateString() : "Invalid Date"} - {isValidDate(dueDate) ? dueDate.toLocaleDateString() : "Invalid Date"}
                        </small>

                    </label>
                </div>
            </div>
        );
    };

    return (
        <div className={`card shadow-sm h-100 ${todo.completed ? 'bg-success text-white' : 'bg-light'}`}>

            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">

                    {/* Display Task Infomation */}
                    <div>
                        {isEditing ? (
                            <div>

                                {renderTodoDetails()}

                                {/* DIsplay Edit Modal */}
                                <EditTodo todo={todo} onSave={handleSave} onCancel={handleCancel} />

                            </div>
                        ) : (
                            renderTodoDetails()
                        )}
                    </div>

                    {/* Delete & Edit Button */}
                    <div>
                        {/* If Edit Modal appears, the button will not be displayed */}
                        {!isEditing && (
                            <>
                                <button onClick={() => deleteTodo(todo.id)}
                                    className="btn btn-danger btn-sm d-flex align-items-center justify-content-center ms-2 mb-2 fw-bold"
                                    title="Delete Task"
                                    style={{ padding: '0.5rem 1rem', width: '120px' }}
                                >
                                    <i className="bi bi-trash"></i>
                                    <span className="ms-2">Delete</span>
                                </button>
                                <button onClick={handleEdit}
                                    className="btn btn-primary btn-sm d-flex align-items-center justify-content-center ms-2 fw-bold"
                                    title="Edit Task"
                                    style={{ padding: '0.5rem 1rem', width: '120px' }}
                                >
                                    <i className="bi bi-pencil"></i>
                                    <span className="ms-2">Edit</span>
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>

        </div>
    )
}
