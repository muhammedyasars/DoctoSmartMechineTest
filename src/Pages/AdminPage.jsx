import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';
import API from '../api/axiosConfig';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [isAuthenticated, user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fix the API endpoints to match the backend
      const [usersRes, tasksRes] = await Promise.all([
        API.get('/auth/admin/users'),
        API.get('/tasks/admin/all-tasks'),
      ]);
      setUsers(usersRes.data.users || []);
      setTasks(tasksRes.data.tasks || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    // Since there's no delete user endpoint, we'll just show an alert
    alert('User deletion is not implemented in this version');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>{user?.name} (Admin)</span>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          All Tasks
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : activeTab === 'users' ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="btn btn-danger btn-small"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-content">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <small>User: {task.userName} ({task.userEmail}) | Status: {task.status} | Priority: {task.priority}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;