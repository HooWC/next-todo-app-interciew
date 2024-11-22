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
    } = useTodos();

    return (
        <div className="container mt-5 p-4">

            <h1 className="text-center mb-4 fw-bold" style={{ color: "'#343a40" }}>Task Diary</h1>

            <AddTodo addTodo={addTodo} />

            <Filters
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
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
