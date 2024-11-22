import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { enUS } from 'date-fns/locale';

export default function TaskCalendar(props) {

    const { tasks } = props;

    // save the same date task data
    const [selectedTasks, setSelectedTasks] = useState([]);

    // set with array data
    const dateTasks = tasks.reduce((acc, task) => {
        const dueDate = new Date(task.dueDate);

        // If the date is invalid, skip this task
        if (isNaN(dueDate)) return acc;

        // If there is no such date in the accumulation object, it is initialized to an empty array
        const date = dueDate.toDateString();

        if (!acc[date]) acc[date] = [];

        acc[date].push(task);

        // Example code: to acc save data
        /* 
        {
            "Fri Nov 22 2024": [
                { id: 1, task: "Task 1", dueDate: "2024-11-22" },
                { id: 2, task: "Task 2", dueDate: "2024-11-22" }
            ],
            "Sat Nov 23 2024": [
                { id: 3, task: "Task 3", dueDate: "2024-11-23" }
            ]
        } 
        */

        return acc;
    }, {});

    // Tasks name shown in calendar
    const tileContent = ({ date }) => {
        const dateString = date.toDateString();
        const tasksForDate = dateTasks[dateString] || [];

        return tasksForDate.slice(0, 1).map((task, index) => (
            <span key={index}
                className={`d-inline-block text-center text-white rounded-3 px-2 py-1 mx-1 
                            ${task.category === 'Work' ? 'bg-primary' :
                        task.category === 'Bug Fixing' ? 'bg-warning' :
                            task.category === 'Urgent' ? 'bg-danger' :
                                task.category === 'Study' ? 'bg-info' :
                                    task.category === 'Personal' ? 'bg-success' :
                                        task.category === 'Meetings' ? 'bg-secondary' :
                                            task.category === 'Research' ? 'bg-dark' :
                                                task.category === 'Design' ? 'bg-light text-dark' :
                                                    task.category === 'Code Review' ? 'bg-muted' :
                                                        task.category === 'Testing' ? 'bg-orange' :
                                                            task.category === 'Documentation Writing' ? 'bg-teal' :
                                                                task.category === 'API Development' ? 'bg-purple' :
                                                                    'bg-danger'
                    }`}
                style={{
                    display: 'inline-block',
                    maxWidth: '20px',
                    maxHeight: '22px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '0.75rem',
                }}
                title={task.task}>
                {task.task}
            </span>
        ))
    }

    // Disable past dates
    const tileDisabled = ({ date }) => {
        const today = new Date();
        return date < today.setHours(0, 0, 0, 0);
    };

    const handleDateClick = (date) => {
        const dateString = date.toDateString();

        // Find the same date & save data
        setSelectedTasks(dateTasks[dateString] || []);
    }

    return (
        <div className="container mt-5 mb-3">

            <h1 className="text-center b-4 fw-bold mb-4"
                style={{
                    background: "linear-gradient(to right, red, #2980b9)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    fontFamily: "'Roboto', sans-serif",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    textShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
                    paddingBottom: "20px",
                    borderBottom: "5px solid #632339"
                }}>Task Calendar</h1>

            <div className="row d-flex align-items-stretch">

                {/* Calendar Box */}
                <div className="col-md-6 mb-2">
                    <div className="card shadow border-0 h-100">
                        <div className="card-body d-flex justify-content-center align-items-center">

                            <Calendar
                                onClickDay={handleDateClick}
                                tileContent={tileContent}
                                tileDisabled={tileDisabled}
                                locale={enUS}
                                className="w-100"
                            />

                        </div>
                    </div>
                </div>

                {/* Infomation Box */}
                <div className="col-md-6 mb-2">
                    <div className="card shadow border-0 h-100">
                        <div className="card-body" style={{ maxHeight: "400px", overflowY: 'auto' }}>

                            {/* Show Calendar Date */}
                            <h5 className="card-title text-primary text-center fw-bold">
                                {selectedTasks.length > 0 ? `Tasks on ${new Date(selectedTasks[0]?.dueDate).toLocaleDateString()}` : 'Select a date to view tasks'}
                            </h5>

                            {/* Show Task Infomation */}
                            {
                                selectedTasks.length > 0 ? (

                                    /* If there is data, display it */
                                    <ul className="list-group mt-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>

                                        {selectedTasks.map((task, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">

                                                {/* Display Task Info */}
                                                <div>
                                                    <span className="text-primary fw-bold">[{task.category}]</span>{" "}
                                                    <small className="fw-bold">{task.task}</small>
                                                </div>

                                                {/* Display Date */}
                                                <span className="badge bg-secondary text-white">
                                                    {new Date(task.dueDate).toLocaleDateString()} - {new Date(task.dueDate).toLocaleDateString()}
                                                </span>

                                            </li>
                                        ))}

                                    </ul>

                                ) : (

                                    /* If there is no data, it will not be displayed */
                                    <p className="text-muted text-center mt-4">
                                        No tasks available for the selected date.
                                    </p>

                                )
                            }

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
