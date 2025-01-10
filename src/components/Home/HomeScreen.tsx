import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton/index';
import DeleteIcon from '@mui/icons-material/Delete';
import './HomeScreen.css';

interface Todo {
  id: string;
  name: string;
  description: string;
  deadline: string;
  isCompleted: boolean;
}

const HomeScreen: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();
  /*Load todos from local storage*/
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleViewTodo = (todo: Todo) => {
    alert(`TODO Details:\nName: ${todo.name}\nDescription: ${todo.description}\nDeadline: ${todo.deadline}`);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos)); /*Save updated list to local storage*/
  };
  /**
  *Renders the list of all TODO items.
  * If there are no TODO items, displays a message prompting the user to add some.
  * Otherwise, displays the list of TODO items with their details.
  */
  return (
    <div className="home-container">
      <div className="main-content">
        
        <h2>All Todos</h2>
        {todos.length === 0 ? (
          /**
           * Displays a message when there are no TODO items.
           */
          <p>No TODO items found. Start by adding some!</p>
        ) : (
          /**
           * Displays the list of TODO items.
           */
          <div className="todo-list">
            {todos.map((todo) => (
              /**
               * Renders a single TODO item.
               * @param {Object} todo - The TODO item object.
               * @param {string} todo.id - The unique identifier of the TODO item.
               * @param {string} todo.name - The name of the TODO item.
               * @param {string} todo.description - The description of the TODO item.
               * @param {string} todo.deadline - The deadline of the TODO item.
               * @param {boolean} todo.isCompleted - The completion status of the TODO item.
               */
              <div
                key={todo.id}
                className={`todo-item ${todo.isCompleted ? 'completed' : 'active'}`}
              >
                <div className="todo-content" onClick={() => handleViewTodo(todo)}>
                  <h3>{todo.name}</h3>
                  <p>{todo.description}</p>
                  <p>Deadline: {todo.deadline}</p>
                  <p>Status: {todo.isCompleted ? 'Completed' : 'Active'}</p>
                </div>
                <IconButton
                  color="error"
                  aria-label="delete"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
