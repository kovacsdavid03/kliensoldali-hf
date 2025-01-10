import React, { useState, useEffect } from 'react';
import './ActiveTodo.css';
import { Button, CircularProgress } from "@mui/material";
/**
 * Interface representing a TODO item.
 * @property {string} id - The unique identifier of the TODO item.
 * @property {string} name - The name of the TODO item.
 * @property {string} description - The description of the TODO item.
 * @property {string} deadline - The deadline of the TODO item.
 * @property {boolean} isCompleted - The completion status of the TODO item.
 */
interface Todo {
  id: string;
  name: string;
  description: string;
  deadline: string;
  isCompleted: boolean;
}

/**
 * ActiveTodo component that displays the list of active (not completed) TODO items.
 * @returns {JSX.Element} The rendered ActiveTodo component.
 */
const ActiveTodo: React.FC = () => {
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Load todos from local storage
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const todos = JSON.parse(storedTodos) as Todo[];
      setActiveTodos(todos.filter((todo) => !todo.isCompleted));
    }
  }, []);

  /**
   * Marks a TODO item as completed.
   * @param {string} id - The unique identifier of the TODO item to be marked as completed.
   */
  const markAsCompleted = (id: string) => {
    const updatedTodos = activeTodos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    );
    const completedTodo = activeTodos.find((todo) => todo.id === id);
    setActiveTodos(updatedTodos.filter((todo) => !todo.isCompleted));

    // Save to localStorage
    if (completedTodo) {
      const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
      const newTodos = storedTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      );
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  };

  const editTodo = (id: string) => {
    const todoToEdit = activeTodos.find((todo) => todo.id === id);
    if (todoToEdit) {
      const newName = prompt('Enter new name:', todoToEdit.name);
      const newDescription = prompt('Enter new description:', todoToEdit.description);
      const newDeadline = prompt('Enter new deadline (YYYY-MM-DD):', todoToEdit.deadline);

      if (newName && newDescription && newDeadline) {
        const updatedTodos = activeTodos.map((todo) =>
          todo.id === id
            ? { ...todo, name: newName, description: newDescription, deadline: newDeadline }
            : todo
        );
        setActiveTodos(updatedTodos);

        // Save to localStorage
        const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
        const newTodos = storedTodos.map((todo) =>
          todo.id === id
            ? { ...todo, name: newName, description: newDescription, deadline: newDeadline }
            : todo
        );
        localStorage.setItem('todos', JSON.stringify(newTodos));
      }
    }
  };

  return (
    <div className="active-todo-container">
      <div className="main-content">
        <h2>Active Todos</h2>
        {activeTodos.length === 0 ? (
          <p>No active TODO items found!</p>
        ) : (
          <div className="todo-list">
            {activeTodos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <p><strong>{todo.name}</strong></p>
                <p>{todo.description}</p>
                <p>Deadline: {todo.deadline}</p>
                <div className="todo-actions">
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={() => markAsCompleted(todo.id)}>Mark as Completed</Button>
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={() => editTodo(todo.id)}>Edit</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveTodo;
