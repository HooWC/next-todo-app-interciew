import React, { useState } from 'react'
import TodoItem from "./TodoItem";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function TodoList(props) {

    // hooks function
    const { todos, editTodo, deleteTodo, toggleComplete } = props;

    // Logic: if there is no data in localStorage at the begin, then return
    if (!todos || todos.length === 0 || (!Array.isArray(todos))) {
        return (
            <div className="text-center">
                <p>No tasks to display</p>
            </div>
        )
    }

    // Set default first page 1
    const [currentPage, setCurrentPage] = useState(1);

    // Show how many task item number
    const itemsDisplay = 6;

    // Use Math.ceil to get total pages
    const totalPages = Math.ceil(todos.length / itemsDisplay);

    // get Task item index
    const getCurrentPage = () => {
        const start = (currentPage - 1) * itemsDisplay;
        const end = start + itemsDisplay;
        return todos.slice(start, end)
    }

    // page function
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <Droppable droppableId="todos">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {getCurrentPage().map((todo, index) => (
                            todo ? (
                                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                    {(provided) => (
                                        <div className="col" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

                                            <TodoItem
                                                todo={todo}
                                                toggleComplete={toggleComplete}
                                                deleteTodo={deleteTodo}
                                                editTodo={editTodo}
                                            />

                                        </div>
                                    )}
                                </Draggable>
                            ) : null
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {/* paging control */}
            {/* 分页控件 */}
            <nav className="mt-4">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Prev
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index + 1}
                            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
