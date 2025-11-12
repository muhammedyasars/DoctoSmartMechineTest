import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-item">
      <div className="task-content">
        <h3 className="font-medium">{task.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{task.description}</p>
        <small className="text-gray-500">Status: {task.status || 'Pending'}</small>
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