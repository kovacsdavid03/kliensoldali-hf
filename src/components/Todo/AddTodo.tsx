import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import './AddTodo.css';

interface Todo {
  id: string;
  name: string;
  description: string;
  deadline: string;
  isCompleted: boolean;
}
/**
 * AddTodo component that allows users to add a new TODO item.
 * The user can input the name, description, and deadline of the TODO item.
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const AddTodo: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddTodo = () => {
    if (!name || !description || !deadline) {
      setError('All fields are required.');
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(), // Generate a unique ID based on the timestamp
      name,
      description,
      deadline,
      isCompleted: false,
    };

    // Retrieve existing todos from localStorage
    const storedTodos = localStorage.getItem('todos');
    const todos = storedTodos ? JSON.parse(storedTodos) : [];

    // Add the new todo to the list and save back to localStorage
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));

    // Navigate back to the home screen
    navigate('/home');
  };

  return (
    <div className="add-todo-container">
      <h2>Add a New Todo</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter todo name"
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter todo description"
        ></textarea>
      </div>
      <div className="form-group">
        <label>Deadline:</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <Button variant="contained" color="primary" onClick={handleAddTodo}>
        Add Todo
      </Button>
      <Button variant="contained" color="secondary" onClick={() => navigate('/home')}>
        Cancel
      </Button>
    </div>
  );
};

export default AddTodo;
