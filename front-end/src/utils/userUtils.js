/**
 * Utility functions for handling user data
 */

/**
 * Normalizes user object to handle both old (user_id) and new (userId) formats
 * @param {Object} user - User object from localStorage or API
 * @returns {Object|null} - Normalized user object with userId field, or null if invalid
 */
export const normalizeUser = (user) => {
  if (!user) {
    return null;
  }
  
  // Handle both userId (new) and user_id (old) formats
  const userId = user.userId || user.user_id;
  if (!userId) {
    return null;
  }
  
  // Return normalized user object with userId consistently
  return { ...user, userId: userId };
};

/**
 * Gets the current logged-in user from localStorage with normalization
 * @returns {Object|null} - Normalized user object or null if not found/invalid
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      return null;
    }
    
    const user = JSON.parse(userStr);
    return normalizeUser(user);
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

/**
 * Clears user session data
 */
export const clearUserSession = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
};