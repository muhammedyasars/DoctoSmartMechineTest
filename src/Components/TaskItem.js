import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-item">
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <small>Status: {task.status || 'Pending'}</small>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)} className="btn btn-secondary">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
