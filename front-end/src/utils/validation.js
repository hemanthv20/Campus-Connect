// Form validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const validateUsername = (username) => {
  // 3-20 characters, alphanumeric and underscores only
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;
  
  if (strength <= 2) return { level: 'weak', color: '#ff4444' };
  if (strength <= 4) return { level: 'medium', color: '#ffaa00' };
  return { level: 'strong', color: '#00C851' };
};

export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = rules[field];
    
    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = `${fieldRules.label || field} is required`;
    } else if (fieldRules.email && !validateEmail(value)) {
      errors[field] = 'Please enter a valid email address';
    } else if (fieldRules.password && !validatePassword(value)) {
      errors[field] = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    } else if (fieldRules.username && !validateUsername(value)) {
      errors[field] = 'Username must be 3-20 characters (letters, numbers, underscores only)';
    } else if (fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = `${fieldRules.label || field} must be at least ${fieldRules.minLength} characters`;
    } else if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[field] = `${fieldRules.label || field} must be less than ${fieldRules.maxLength} characters`;
    }
  });
  
  return errors;
};

// Mock database of existing usernames (in real app, this would be an API call)
const existingUsernames = [
  'admin', 'user', 'test', 'demo', 'guest', 'root', 'administrator',
  'john_doe', 'jane_smith', 'mike_wilson', 'sarah_jones', 'alex_brown',
  'student123', 'developer', 'campus_connect', 'social_media'
];

/**
 * Check username availability via API
 * @param {string} username - The username to check
 * @returns {Promise<boolean>} - Promise that resolves to true if username is available
 */
export const checkUsernameAvailability = async (username) => {
  try {
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';
    const response = await fetch(`${API_BASE_URL}/api/auth/check-username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.available;
    } else {
      // Fallback to mock logic if API fails
      return !existingUsernames.some(existing => 
        existing.toLowerCase() === username.toLowerCase()
      );
    }
  } catch (error) {
    console.error('Error checking username availability:', error);
    // Fallback to mock logic if API fails
    return !existingUsernames.some(existing => 
      existing.toLowerCase() === username.toLowerCase()
    );
  }
};

/**
 * Priority-based user registration validation
 * Returns the most critical error first according to specified priority order
 * @param {Object} formData - The registration form data
 * @param {string} formData.username - Username to validate
 * @param {string} formData.password - Password to validate
 * @returns {Promise<string|null>} - Error message or null if valid
 */
export const validateUserRegistration = async (formData) => {
  const { username, password } = formData;
  
  // PRIORITY 1: Username Availability Check
  if (!username || username.trim() === '') {
    return 'Username is required.';
  }
  
  if (!validateUsername(username)) {
    return 'Username must be 3-20 characters and contain only letters, numbers, and underscores.';
  }
  
  // Check username availability (highest priority)
  try {
    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) {
      return `Username "${username}" is already taken. Please choose a different username.`;
    }
  } catch (error) {
    return 'Unable to check username availability. Please try again.';
  }
  
  // PRIORITY 2: Password Length Check
  if (!password || password.trim() === '') {
    return 'Password is required.';
  }
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  
  // PRIORITY 3: Password Complexity Checks
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter (A-Z).';
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one number (0-9).';
  }
  
  if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
    return 'Password must contain at least one special character (!@#$%^&*()_+-=[]{};\'":|,.<>/?).';
  }
  
  // All validations passed
  return null;
};

/**
 * Quick username check without full form validation
 * @param {string} username - Username to check
 * @returns {Promise<Object>} - Object with isValid and message properties
 */
export const quickUsernameCheck = async (username) => {
  if (!username || username.trim() === '') {
    return { isValid: false, message: 'Username is required.' };
  }
  
  if (!validateUsername(username)) {
    return { 
      isValid: false, 
      message: 'Username must be 3-20 characters (letters, numbers, underscores only).' 
    };
  }
  
  try {
    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) {
      return { 
        isValid: false, 
        message: `Username "${username}" is already taken.` 
      };
    }
    
    return { isValid: true, message: 'Username is available!' };
  } catch (error) {
    return { 
      isValid: false, 
      message: 'Unable to check username availability.' 
    };
  }
};
