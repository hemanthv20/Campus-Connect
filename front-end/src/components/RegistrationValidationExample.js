import React, { useState } from 'react';
import { validateUserRegistration, quickUsernameCheck } from '../utils/validation';

/**
 * Example Registration Form Component demonstrating priority-based validation
 */
function RegistrationValidationExample() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  // Real-time username checking (debounced)
  const handleUsernameBlur = async () => {
    if (formData.username.length >= 3) {
      try {
        const result = await quickUsernameCheck(formData.username);
        setUsernameStatus(result);
      } catch (err) {
        setUsernameStatus({ 
          isValid: false, 
          message: 'Error checking username availability' 
        });
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Run priority-based validation
      const validationError = await validateUserRegistration(formData);
      
      if (validationError) {
        // Display the most critical error
        setError(validationError);
        setIsSubmitting(false);
        return;
      }
      
      // If validation passes, proceed with registration
      console.log('Form is valid! Proceeding with registration...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Registration successful!');
      
      // Reset form
      setFormData({ username: '', password: '' });
      setUsernameStatus(null);
      
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
      <h2>User Registration</h2>
      
      {/* Error Display */}
      {error && (
        <div style={{
          background: '#fee',
          color: '#c33',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #fcc'
        }}>
          <strong>⚠️ {error}</strong>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Username *
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            onBlur={handleUsernameBlur}
            placeholder="Enter username"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            disabled={isSubmitting}
          />
          
          {/* Username Status */}
          {usernameStatus && (
            <div style={{
              marginTop: '0.5rem',
              padding: '0.5rem',
              borderRadius: '4px',
              fontSize: '0.9rem',
              background: usernameStatus.isValid ? '#efe' : '#fee',
              color: usernameStatus.isValid ? '#060' : '#c33',
              border: `1px solid ${usernameStatus.isValid ? '#cfc' : '#fcc'}`
            }}>
              {usernameStatus.isValid ? '✅' : '❌'} {usernameStatus.message}
            </div>
          )}
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            disabled={isSubmitting}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: '0.75rem',
            background: isSubmitting ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      {/* Validation Requirements */}
      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <h4>Requirements:</h4>
        <ul>
          <li>Username: 3-20 characters (letters, numbers, underscores)</li>
          <li>Password: At least 8 characters</li>
          <li>Password: At least one uppercase letter</li>
          <li>Password: At least one number</li>
          <li>Password: At least one special character</li>
        </ul>
      </div>
    </div>
  );
}

export default RegistrationValidationExample;