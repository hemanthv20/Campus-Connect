import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Check admin status when user ID changes
  useEffect(() => {
    if (currentUserId) {
      checkAdminStatus(currentUserId);
    } else {
      setIsAdmin(false);
      setAdminLoading(false);
    }
  }, [currentUserId]);

  const checkAdminStatus = async (userId) => {
    try {
      setAdminLoading(true);
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ADMIN_CHECK_STATUS}/${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.isAdmin || false);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setAdminLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!isAdmin || !currentUserId) {
      throw new Error('Admin privileges required');
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.ADMIN_DELETE_USER}/${userId}?adminUserId=${currentUserId}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  const deletePost = async (postId) => {
    if (!isAdmin || !currentUserId) {
      throw new Error('Admin privileges required');
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.ADMIN_DELETE_POST}/${postId}?adminUserId=${currentUserId}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };

  const getAllUsers = async () => {
    if (!isAdmin || !currentUserId) {
      throw new Error('Admin privileges required');
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.ADMIN_GET_USERS}?adminUserId=${currentUserId}`
      );

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get users');
      }
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  };

  const getPlatformStats = async () => {
    if (!isAdmin || !currentUserId) {
      throw new Error('Admin privileges required');
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.ADMIN_GET_STATS}?adminUserId=${currentUserId}`
      );

      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get statistics');
      }
    } catch (error) {
      console.error('Error getting statistics:', error);
      throw error;
    }
  };

  const value = {
    isAdmin,
    adminLoading,
    currentUserId,
    setCurrentUserId,
    checkAdminStatus,
    deleteUser,
    deletePost,
    getAllUsers,
    getPlatformStats
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};