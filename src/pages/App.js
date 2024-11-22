import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import useTodos from "../hooks/useTodos";
import AddTodo from "../components/AddTodo";
import Filters from "../components/Filters";
import TodoList from "../components/TodoList";
import TaskCalendar from "../components/TaskCalendar";

export default function App() {

    const {
        todos,
        filter,
        setFilter,
        search,
        setSearch,
        sort,
        setSort,
        addTodo,
        editTodo,
        deleteTodo,
        toggleComplete,
        handleDragEnd,
        exportToCSV,
        exportToExcel,
        categoryFilter,
        setCategoryFilter,
    } = useTodos();

    return (
        <div className="container mt-5 p-4">

            <div className="button-container">
                <button className="btn btn-primary" onClick={exportToCSV}>Export to CSV</button>

                <button className="btn btn-success" onClick={exportToExcel}>Export to Excel</button>
            </div>

            <h1 className="text-center mb-4 fw-bold"
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
                }}>Task Diary</h1>

            <AddTodo addTodo={addTodo} />

            <Filters
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
            />

            <DragDropContext onDragEnd={handleDragEnd}>
                <TodoList
                    todos={todos}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                />
            </DragDropContext>

            <TaskCalendar tasks={todos} />

        </div>
    );
}
