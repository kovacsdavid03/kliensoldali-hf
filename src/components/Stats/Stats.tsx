import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts';
import './Stats.css';

interface Todo {
  id: string;
  name: string;
  description: string;
  deadline: string;
  isCompleted: boolean;
}
/**
 * Stats component that displays statistics about TODO items using a pie chart.
 * The pie chart shows the number of completed and active TODO items.
 * The chart is from the @mui/x-charts(Material Design) library.
 * @returns {JSX.Element} The rendered Stats component.
 */
const Stats: React.FC = () => {
  const [completedTodos, setCompletedTodos] = useState(0);
  const [activeTodos, setActiveTodos] = useState(0);

  useEffect(() => {
    // Fetch todos from local storage
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const todos: Todo[] = JSON.parse(storedTodos);
      const completed = todos.filter((todo) => todo.isCompleted).length;
      const active = todos.length - completed;
      setCompletedTodos(completed);
      setActiveTodos(active);
    }
  }, []);

  const data = [
    { id: 'completed', value: completedTodos, label: 'Completed Todos' },
    { id: 'active', value: activeTodos, label: 'Active Todos' },
  ];

  return (
    <div className="stats-container">
      <div className="main-content">
        <h2>Stats</h2>
        <div className="chart-container">
          <PieChart
            series={[
              {
                type: 'pie',
                data: data,
                innerRadius: 300,
                outerRadius: 400,
                arcLabel: (datum) => `${datum.label}: ${datum.value}`,
              },
            ]}

          />
        </div>
        <div className="stats-summary">
          <p>Total Todos: {completedTodos + activeTodos}</p>
          <p>Completed: {completedTodos}</p>
          <p>Active: {activeTodos}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
