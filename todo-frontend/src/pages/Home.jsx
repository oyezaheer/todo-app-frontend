import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../context/DataContext';
import { deleteTask, updateTask } from '../api/api';

const Home = () => {
  const { tasks, setTasks } = useContext(DataContext);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, [setTasks]);

  const calculateRemainingTime = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const timeDiff = due - now;
    return timeDiff;
  };

  const sortedTasks = tasks
    .sort((a, b) => {
      if (a.category === 'completed' && b.category !== 'completed') return 1;
      if (a.category !== 'completed' && b.category === 'completed') return -1;
      const remainingTimeA = calculateRemainingTime(a.dueDate);
      const remainingTimeB = calculateRemainingTime(b.dueDate);
      return remainingTimeA - remainingTimeB;
    });

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStatusChange = async (task) => {
    const updatedTask = { ...task, category: task.category === 'completed' ? 'active' : 'completed' };
    const response = await updateTask(task.id, updatedTask);
    setTasks(tasks.map(t => (t.id === task.id ? response : t)));
  };

  return (
    <div className="gradient-background container">
      <h1>Todo List</h1>
      <ul className="task-list">
        {sortedTasks.map(task => (
          <li key={task.id} className="task-item">
            <Link to={`/task/${task.id}`} className="task-link">{task.title}</Link>
            <div className="task-details">
              <p className={`task-status ${task.category === 'completed' ? 'completed' : 'pending'}`}>
                {task.category === 'completed' ? 'Completed' : 'Pending'}
                {task.category === 'completed' && <i className="fas fa-check-circle completed-icon"></i>}
              </p>
              <p className="task-due">Due: {task.dueDate}</p>
            </div>
            <div className="task-buttons">
              <Link to={`/edit/${task.id}`} className="edit-button">Edit</Link>
              <button onClick={() => handleDelete(task.id)} className="delete-button">Delete</button>
              <input
                type="checkbox"
                checked={task.category === 'completed'}
                onChange={() => handleStatusChange(task)}
                className="status-checkbox"
              />

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
