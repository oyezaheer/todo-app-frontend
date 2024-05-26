// EditTodo.jsx

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, updateTask } from '../api/api';
import DataContext from '../context/DataContext';
// import './index.css'; // Import your CSS file

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(DataContext);
  const [task, setTask] = useState({ title: '', description: '', category: 'active', dueDate: '' });

  useEffect(() => {
    const fetchTask = async () => {
      const task = await getTask(id);
      setTask(task);
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = await updateTask(id, task);
    setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
    navigate('/');
  };

  return (
    <div className="edit-form">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="form-label">Category:</label>
          <select
            id="category"
            name="category"
            value={task.category}
            onChange={handleChange}
            className="form-select"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTodo;
