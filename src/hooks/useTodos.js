import { useState, useEffect } from "react";
import { parse } from "json2csv";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from 'uuid';

export default function useTodos() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("date-asc");
    const [categoryFilter, setCategoryFilter] = useState("all");  // New state for category filter

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
        setTodos([...todos, { ...newTodo, id: uuidv4(), completed: false }]);
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
        // Category Filter Logic
        .filter((todo) => {
            if (categoryFilter === "all") return true;
            return todo.category === categoryFilter;
        })
        // Search Logic
        .filter((todo) => {
            return todo.task && typeof todo.task === "string" && todo.task.toLowerCase().includes(search.toLowerCase());
        })
        // Date Sorting
        .sort((a, b) => {
            if (sort === "startDate-asc") return a.startDate - b.startDate;
            if (sort === "startDate-desc") return b.startDate - a.startDate;
            return 0;
        });

    // If localStorage has no data, provide an empty array
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

    // Export to CSV
    const exportToCSV = () => {
        if (todos.length === 0) {
            alert('No data available to export');
            return;
        }

        try {
            const csv = parse(todos.map(todo => ({
                id: todo.id,
                task: todo.task,
                completed: todo.completed,
                startDate: todo.startDate ? todo.startDate.toLocaleDateString('en-GB') : '',
                dueDate: todo.dueDate ? todo.dueDate.toLocaleDateString('en-GB') : '',
            })));
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'todos.csv';
            link.click();
        } catch (err) {
            console.error('Failed to export CSV', err);
        }
    };

    // Export to Excel
    const exportToExcel = () => {
        if (todos.length === 0) {
            alert('No data available to export');
            return;
        }

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(todos.map(todo => ({
            id: todo.id,
            task: todo.task,
            completed: todo.completed,
            startDate: todo.startDate ? todo.startDate.toLocaleDateString('en-GB') : '',
            dueDate: todo.dueDate ? todo.dueDate.toLocaleDateString('en-GB') : '',
        })));
        XLSX.utils.book_append_sheet(wb, ws, 'Todos');
        XLSX.writeFile(wb, 'todos.xlsx');
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
        exportToCSV,
        exportToExcel,
        categoryFilter,
        setCategoryFilter
    };
}
