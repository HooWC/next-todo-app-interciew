import { useState, useEffect } from "react";

export default function useTodos() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("date-asc");

    // Load tasks from localStorage
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("tasks")) || [];
        const parsedTodos = savedTodos.map(todo => ({
            ...todo,
            startDate: todo.startDate ? new Date(todo.startDate) : null,
            dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
        }));
        setTodos(parsedTodos);
    }, []);

    // Save tasks to localStorage
    useEffect(() => {
        if (todos.length === 0) return;
        const todosToSave = todos.map(todo => ({
            ...todo,
            startDate: todo.startDate ? todo.startDate.toISOString() : null,
            dueDate: todo.dueDate ? todo.dueDate.toISOString() : null,
        }));
        localStorage.setItem("tasks", JSON.stringify(todosToSave));
    }, [todos]);

    // Add todo
    const addTodo = (newTodo) => {
        setTodos([...todos, { ...newTodo, id: Date.now(), completed: false }]);
    };

    // Edit todo
    const editTodo = (updatedTodo) => {
        setTodos(
            todos.map((todo) =>
                todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
            )
        );
    };

    // Delete todo
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // Toggle completion 
    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Filters
    const filteredTodos = todos
        // Completed Logic
        .filter((todo) => {
            if (filter === "completed") return todo.completed;
            if (filter === "incomplete") return !todo.completed;
            return true;
        })
        // Search Logic
        .filter((todo) => {
            return todo.task && typeof todo.task === "string" && todo.task.toLowerCase().includes(search.toLowerCase());
        })
        // Date Login
        .sort((a, b) => {
            if (sort === "startDate-asc") return a.startDate - b.startDate;
            if (sort === "startDate-desc") return b.startDate - a.startDate;
            return 0;
        });

    // If localStorage no data, give a empty []
    const safeFilteredTodos = filteredTodos.length > 0 ? filteredTodos : [];

    // Drag and Drop
    const handleDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination || destination.index === source.index) return;

        const reorderedTodos = Array.from(todos);
        const [removed] = reorderedTodos.splice(source.index, 1);
        reorderedTodos.splice(destination.index, 0, removed);

        setTodos(reorderedTodos);
    };

    return {
        todos: safeFilteredTodos,
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
    };
}
