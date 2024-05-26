import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTask } from '../api/api';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const task = await getTask(id);
      setTask(task);
    };
    fetchTask();
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="task-details-container">
      <h1>{task.title}</h1>
      <div className="task-info">
        <p className="task-description">{task.description}</p>
        <p className="task-category">Category: {task.category}</p>
        <p className="task-due">Due: {task.dueDate}</p>
      </div>
      <Link to={`/edit/${task.id}`} className="edit-link">Edit Task</Link>
    </div>
  );
};

export default TaskDetails;
