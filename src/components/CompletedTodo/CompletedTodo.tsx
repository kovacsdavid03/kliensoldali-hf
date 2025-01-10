import React, { useState, useEffect } from 'react';
import './CompletedTodo.css';

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
 * CompletedTodo component that displays the list of completed TODO items.
 * @returns {JSX.Element} The rendered CompletedTodo component.
 */
const CompletedTodo: React.FC = () => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Load todos from local storage
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const todos = JSON.parse(storedTodos) as Todo[];
      setCompletedTodos(todos.filter((todo) => todo.isCompleted));
    }
  }, []);

  /**
   * Handles the viewing of a TODO item by displaying its details in an alert.
   * @param {Todo} todo - The TODO item to be viewed.
   */
  const handleViewTodo = (todo: Todo) => {
    alert(`TODO Details:\nName: ${todo.name}\nDescription: ${todo.description}\nDeadline: ${todo.deadline}`);
  };

  return (
    <div className="completed-todo-container">
      <div className="main-content">
        <h2>Completed Todos</h2>
        {completedTodos.length === 0 ? (
          <p>No completed TODO items found!</p>
        ) : (
          <div className="todo-list">
            {completedTodos.map((todo) => (
              <div
                key={todo.id}
                className="todo-item"
                onClick={() => handleViewTodo(todo)}
              >
                <p><strong>{todo.name}</strong></p>
                <p>{todo.description}</p>
                <p>Deadline: {todo.deadline}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedTodo;
