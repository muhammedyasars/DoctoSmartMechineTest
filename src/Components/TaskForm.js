import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
        required
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field"
        rows="3"
      />
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
