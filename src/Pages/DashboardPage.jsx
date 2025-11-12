import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';
import TaskForm from '../Components/TaskForm';
import TaskItem from '../Components/TaskItem';
import API from '../api/axiosConfig';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [isAuthenticated, navigate]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await API.get('/tasks/my-tasks');
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await API.post('/tasks/create', taskData);
      // Refresh tasks after adding a new one
      fetchTasks();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="centered-container">
      <div className="centered-card">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">My Tasks</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm">{user?.name}</span>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>

        <TaskForm onSubmit={handleAddTask} />

        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty-message">No tasks yet. Create one!</p>
        ) : (
          <div className="tasks-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;