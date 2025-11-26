import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import './css/AdminDashboard.css';

const AdminDashboard = () => {
  const { isAdmin, adminLoading, getAllUsers, deleteUser, getPlatformStats } = useAdmin();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState({});

  useEffect(() => {
    if (isAdmin && !adminLoading) {
      loadDashboardData();
    }
  }, [isAdmin, adminLoading]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [usersData, statsData] = await Promise.all([
        getAllUsers(),
        getPlatformStats()
      ]);
      
      setUsers(usersData);
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleteLoading(prev => ({ ...prev, [userId]: true }));
      await deleteUser(userId);
      
      // Remove user from local state
      setUsers(prev => prev.filter(user => user.userId !== userId));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalUsers: (prev.totalUsers || 0) - 1
      }));
      
      alert('User deleted successfully');
    } catch (err) {
      alert(err.message || 'Failed to delete user');
    } finally {
      setDeleteLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  if (adminLoading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Checking admin privileges...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-dashboard">
        <div className="access-denied">
          <h2>🚫 Access Denied</h2>
          <p>You don't have admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>🛡️ Admin Dashboard</h1>
        <p>Platform management and statistics</p>
      </div>

      {error && (
        <div className="error-message">
          <span>⚠️ {error}</span>
          <button onClick={loadDashboardData}>Retry</button>
        </div>
      )}

      {/* Platform Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalUsers || 0}</h3>
            <p>Total Users</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{stats.totalPosts || 0}</h3>
            <p>Total Posts</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔗</div>
          <div className="stat-content">
            <h3>{stats.totalFollows || 0}</h3>
            <p>Total Follows</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-content">
            <h3>{stats.totalMessages || 0}</h3>
            <p>Total Messages</p>
          </div>
        </div>
      </div>

      {/* Users Management */}
      <div className="users-section">
        <div className="section-header">
          <h2>👥 User Management</h2>
          <button onClick={loadDashboardData} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>College</th>
                <th>Admin</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td className="username">
                    <div className="user-info">
                      {user.profilePicture && (
                        <img 
                          src={user.profilePicture} 
                          alt={user.username}
                          className="user-avatar"
                        />
                      )}
                      <span>{user.username}</span>
                    </div>
                  </td>
                  <td>{`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A'}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td>{user.college || 'N/A'}</td>
                  <td>
                    <span className={`admin-badge ${user.admin ? 'admin' : 'user'}`}>
                      {user.admin ? '🛡️ Admin' : '👤 User'}
                    </span>
                  </td>
                  <td>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    {!user.admin && (
                      <button
                        onClick={() => handleDeleteUser(user.userId, user.username)}
                        disabled={deleteLoading[user.userId]}
                        className="delete-btn"
                      >
                        {deleteLoading[user.userId] ? (
                          <span className="btn-spinner"></span>
                        ) : (
                          '🗑️ Delete'
                        )}
                      </button>
                    )}
                    {user.admin && (
                      <span className="protected-user">🔒 Protected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;