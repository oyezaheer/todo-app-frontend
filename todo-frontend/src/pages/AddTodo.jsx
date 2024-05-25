// src/pages/AddTodo.jsx

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../api/api';
import DataContext from '../context/DataContext';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('active');
  const [dueDate, setDueDate] = useState('');
  const { tasks, setTasks } = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = await createTask({ title, description, category, dueDate });
    setTasks([...tasks, newTask]);
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Add New Todo</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <label htmlFor="title" className="label">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
          className="input-field"
        />
        <label htmlFor="description" className="label">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
          className="input-field"
        ></textarea>
        <label htmlFor="category" className="label">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select-field"
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <label htmlFor="dueDate" className="label">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="btn">Add Task</button>
      </form>
    </div>
  );
};

export default AddTodo;
