/**
 * Test cases for registration validation
 * Run these in your browser console or testing framework
 */

import { validateRegistration, getAllValidationErrors } from './registrationValidation';

// Test cases demonstrating the validation priority
const testCases = [
  {
    name: 'Valid registration',
    data: { username: 'newuser123', password: 'SecurePass1!' },
    expected: null
  },
  {
    name: 'Username taken (Priority 1)',
    data: { username: 'admin', password: 'SecurePass1!' },
    expected: 'Username "admin" is already taken. Please choose a different username.'
  },
  {
    name: 'Username taken + short password (Priority 1 wins)',
    data: { username: 'user', password: 'short' },
    expected: 'Username "user" is already taken. Please choose a different username.'
  },
  {
    name: 'Short password (Priority 2)',
    data: { username: 'availableuser', password: 'short' },
    expected: 'Password must be at least 8 characters long'
  },
  {
    name: 'No uppercase letter (Priority 3)',
    data: { username: 'availableuser', password: 'lowercase123!' },
    expected: 'Password must contain at least one uppercase letter'
  },
  {
    name: 'No number (Priority 3)',
    data: { username: 'availableuser', password: 'UpperCase!' },
    expected: 'Password must contain at least one number'
  },
  {
    name: 'No special character (Priority 3)',
    data: { username: 'availableuser', password: 'UpperCase123' },
    expected: 'Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)'
  },
  {
    name: 'Empty username',
    data: { username: '', password: 'SecurePass1!' },
    expected: 'Username is required'
  },
  {
    name: 'Empty password',
    data: { username: 'availableuser', password: '' },
    expected: 'Password is required'
  }
];

// Function to run all tests
export const runValidationTests = () => {
  console.log('Running Registration Validation Tests...\n');
  
  let passed = 0;
  let failed = 0;

  testCases.forEach((testCase, index) => {
    const result = validateRegistration(testCase.data);
    const success = result === testCase.expected;
    
    console.log(`Test ${index + 1}: ${testCase.name}`);
    console.log(`Input: ${JSON.stringify(testCase.data)}`);
    console.log(`Expected: ${testCase.expected}`);
    console.log(`Got: ${result}`);
    console.log(`Status: ${success ? '✅ PASS' : '❌ FAIL'}`);
    console.log('---');
    
    if (success) {
      passed++;
    } else {
      failed++;
    }
  });

  console.log(`\nTest Results: ${passed} passed, ${failed} failed`);
  return { passed, failed };
};

// Example usage in browser console:
// import { runValidationTests } from './registrationValidation.test.js';
// runValidationTests();