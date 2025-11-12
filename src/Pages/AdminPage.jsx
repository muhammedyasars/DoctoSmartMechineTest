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
    <div className="centered-container">
      <div className="centered-card">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm">{user?.name} (Admin)</span>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>

        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${activeTab === 'users' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`flex-1 py-2 ${activeTab === 'tasks' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('tasks')}
          >
            All Tasks
          </button>
        </div>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : activeTab === 'users' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Role</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="py-2">{u.name}</td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2">{u.role}</td>
                    <td className="py-2">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="btn btn-danger"
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
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                  <small className="text-gray-500">
                    User: {task.userName} ({task.userEmail}) | Status: {task.status} | Priority: {task.priority}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;