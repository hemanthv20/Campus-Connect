/**
 * User Registration Validation Utility
 * Validates user input and returns specific error messages in order of priority
 */

// Mock database of existing usernames for demonstration
const existingUsernames = new Set([
  'admin', 'user', 'test', 'demo', 'john_doe', 'jane_smith', 
  'student123', 'campus_user', 'developer', 'designer'
]);

/**
 * Validates user registration form data
 * @param {Object} formData - The registration form data
 * @param {string} formData.username - The username to validate
 * @param {string} formData.password - The password to validate
 * @returns {string|null} Error message if validation fails, null if valid
 */
export const validateRegistration = (formData) => {
  const { username, password } = formData;

  // Priority 1: Username Availability Check
  const usernameError = validateUsernameAvailability(username);
  if (usernameError) {
    return usernameError;
  }

  // Priority 2: Password Length Check
  const lengthError = validatePasswordLength(password);
  if (lengthError) {
    return lengthError;
  }

  // Priority 3: Password Complexity Check
  const complexityError = validatePasswordComplexity(password);
  if (complexityError) {
    return complexityError;
  }

  // All validations passed
  return null;
};

/**
 * Checks if username is available (mocked check)
 * @param {string} username - The username to check
 * @returns {string|null} Error message or null if available
 */
const validateUsernameAvailability = (username) => {
  if (!username || username.trim() === '') {
    return 'Username is required';
  }

  const trimmedUsername = username.trim().toLowerCase();
  
  if (existingUsernames.has(trimmedUsername)) {
    return `Username "${username}" is already taken. Please choose a different username.`;
  }

  return null;
};

/**
 * Validates password length requirement
 * @param {string} password - The password to validate
 * @returns {string|null} Error message or null if valid
 */
const validatePasswordLength = (password) => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  return null;
};

/**
 * Validates password complexity requirements
 * @param {string} password - The password to validate
 * @returns {string|null} Error message or null if valid
 */
const validatePasswordComplexity = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (!hasUppercase) {
    return 'Password must contain at least one uppercase letter';
  }

  if (!hasNumber) {
    return 'Password must contain at least one number';
  }

  if (!hasSpecialChar) {
    return 'Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)';
  }

  return null;
};

/**
 * Check username availability via API
 * @param {string} username - The username to check
 * @returns {Promise<boolean>} True if username is available
 */
export const checkUsernameAvailabilityAsync = async (username) => {
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
      return !existingUsernames.has(username.toLowerCase());
    }
  } catch (error) {
    console.error('Error checking username availability:', error);
    // Fallback to mock logic if API fails
    return !existingUsernames.has(username.toLowerCase());
  }
};

/**
 * Get all validation errors (for displaying multiple errors if needed)
 * @param {Object} formData - The registration form data
 * @returns {Array<string>} Array of all validation errors
 */
export const getAllValidationErrors = (formData) => {
  const errors = [];
  const { username, password } = formData;

  const usernameError = validateUsernameAvailability(username);
  if (usernameError) errors.push(usernameError);

  const lengthError = validatePasswordLength(password);
  if (lengthError) errors.push(lengthError);

  const complexityError = validatePasswordComplexity(password);
  if (complexityError) errors.push(complexityError);

  return errors;
};