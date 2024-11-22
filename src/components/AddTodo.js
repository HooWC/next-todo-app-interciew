import React, { useState } from "react";

export default function AddTodo(props) {

    const { addTodo } = props;

    const [task, setTask] = useState("");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);

    // get current(Today) date , example : 2024/11/21
    const currentDate = new Date().toISOString().split("T")[0];

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log("Task: " + task);
        // console.log("Category: " + category);

        // Check if the user has filled in all
        if (!task || !category || !startDate || !dueDate) {
            alert("Please fill in all required fields!");
            return;
        }

        // Logic: The start date cannot be greater than the due date
        if (startDate > dueDate) {
            alert("Start date cannot be later than due date!");
            return;
        }

        // create new Task Model
        const newTask = {
            task,
            category,
            startDate,
            dueDate,
        }

        // hooks function
        addTodo(newTask);

        setTask("");
        setCategory("");
        setStartDate(null);
        setDueDate(null);
    }

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="row">

                {/* Task Name Input */}
                <div className="col-md-3 col-6 mb-2">
                    <label htmlFor="task" className="form-label text-secondary fw-bold">Task Name:</label>

                    <input id="task" type="text" className="form-control" placeholder="Enter Task" value={task} onChange={(e) => setTask(e.target.value)} />
                </div>

                {/* Select Category */}
                <div className="col-md-3 col-6 mb-2">
                    <label htmlFor="category" className="form-label text-secondary fw-bold">Category:</label>
                    <select id="category" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
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
                        <option value="Project Planning">Project Planning</option>
                        <option value="System Maintenance">System Maintenance</option>
                        <option value="Recruitment">Recruitment</option>
                        <option value="Event Planning">Event Planning</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Business Strategy">Business Strategy</option>
                    </select>
                </div>

                {/* Start Date */}
                <div className="col-md-3 col-6 mb-2">
                    <label htmlFor="startDate" className="form-label text-secondary fw-bold">Start Date:</label>

                    <input id="startDate" type="date" className="form-control" value={startDate ? startDate.toISOString().split("T")[0] : ""} onChange={(e) => setStartDate(new Date(e.target.value))} min={currentDate} />
                </div>

                {/* Due Date */}
                <div className="col-md-3 col-6 mb-2">
                    <label htmlFor="dueDate" className="form-label text-secondary fw-bold">Due Date:</label>

                    <input id="dueDate" type="date" className="form-control" value={dueDate ? dueDate.toISOString().split("T")[0] : ""} onChange={(e) => setDueDate(new Date(e.target.value))} min={currentDate} />
                </div>

            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100 fw-bold">Add New Task</button>

        </form>
    )
}