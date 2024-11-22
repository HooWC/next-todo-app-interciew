import React, { useState, useEffect } from 'react';

export default function EditTodo(props) {

    // TodoItem & hooks function
    const { todo, onSave, onCancel } = props;

    const [title, setTitle] = useState(todo.task);
    const [category, setCategory] = useState(todo.category);
    const [dueDate, setDueDate] = useState(null);
    const [startDate, setStartDate] = useState(null);

    const maxDate = new Date().toISOString().split('T')[0];

    // Set default data
    useEffect(() => {
        if (todo.dueDate instanceof Date && !isNaN(todo.dueDate)) {
            setDueDate(todo.dueDate.toISOString().split("T")[0]);
        }

        if (todo.startDate instanceof Date && !isNaN(todo.startDate)) {
            setStartDate(todo.startDate.toISOString().split("T")[0]);
        }

        setTitle(todo.task);
        setCategory(todo.category);
    }, [task])

    // Update
    const handleSubmit = (e) => {
        e.preventDefault();

        // Logic: The start date cannot be greater than the due date
        if (startDate > dueDate) {
            alert("Start date cannot be later than due date!");
            return;
        }

        // send to -> TodoItem handleSave -> hooks function -> editTodo
        onSave({
            ...todo,
            task: title,
            dueDate: dueDate ? new Date(dueDate) : null,
            startDate: startDate ? new Date(startDate) : null,
            category,
        })
    }


    return (
        <div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">

                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">Edit Task</h5>

                            {/* Cross icon */}
                            <button type="button" className="btn-close" onClick={onCancel} />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">

                                {/* Task Name */}
                                <div className="mb-4">

                                    <label>Task Name</label>

                                    <input className="form-control" type="text" placeholder="Task Name" value={title} onChange={(e) => setTitle(e.target.value)} required />

                                </div>

                                {/* Category */}
                                <div className="mb-4">

                                    <label>Category</label>

                                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="">Select Category</option>
                                        <option value="Work">Work</option>
                                        <option value="Bug Fixing">Bug Fixing</option>
                                        <option value="Urgent">Urgent</option>
                                        <option value="Study">Study</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Meetings">Meetings</option>
                                        <option value="Research">Research</option>
                                        <option value="Design">Design</option>
                                        <option value="Code Review">Code Review</option>
                                        <option value="Testing">Testing</option>
                                        <option value="Documentation Writing">Documentation Writing</option>
                                        <option value="API Development">API Development</option>
                                    </select>

                                </div>

                                {/* Start Date */}
                                <div className="mb-4">

                                    <label>Start Date</label>

                                    <input className="form-control" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} min={maxDate} required />

                                </div>

                                {/* Due Date */}
                                <div className="mb-4">

                                    <label>Due Date</label>

                                    <input className="form-control" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} min={maxDate} required />

                                </div>

                            </div>

                            <div className="modal-footer">

                                {/* Cancel Button */}
                                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>

                                {/* Save Button */}
                                <button type="submit" className="btn btn-primary">Save</button>

                            </div>

                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}
