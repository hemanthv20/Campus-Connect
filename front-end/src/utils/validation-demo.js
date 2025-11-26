/**
 * Demo script to test the registration validation
 * Run this in the browser console or as a Node.js script
 */

import { validateUserRegistration, quickUsernameCheck } from './validation.js';

// Test scenarios demonstrating priority-based validation
const testScenarios = [
  {
    name: "Valid Registration",
    data: { username: "newuser123", password: "MyPassword123!" },
    expected: null
  },
  {
    name: "Username Taken (Priority 1)",
    data: { username: "admin", password: "MyPassword123!" },
    expected: 'Username "admin" is already taken. Please choose a different username.'
  },
  {
    name: "Invalid Username Format (Priority 1)",
    data: { username: "ab", password: "MyPassword123!" },
    expected: "Username must be 3-20 characters and contain only letters, numbers, and underscores."
  },
  {
    name: "Password Too Short (Priority 2)",
    data: { username: "validuser", password: "Pass1!" },
    expected: "Password must be at least 8 characters long."
  },
  {
    name: "Password Missing Uppercase (Priority 3)",
    data: { username: "validuser", password: "password123!" },
    expected: "Password must contain at least one uppercase letter (A-Z)."
  },
  {
    name: "Password Missing Number (Priority 3)",
    data: { username: "validuser", password: "Password!" },
    expected: "Password must contain at least one number (0-9)."
  },
  {
    name: "Password Missing Special Character (Priority 3)",
    data: { username: "validuser", password: "Password123" },
    expected: "Password must contain at least one special character (!@#$%^&*()_+-=[]{};\\'\":|,.<>/?)."
  },
  {
    name: "Multiple Errors - Shows Most Critical First",
    data: { username: "admin", password: "weak" },
    expected: 'Username "admin" is already taken. Please choose a different username.'
  }
];

/**
 * Run all test scenarios
 */
export async function runValidationTests() {
  console.log("🧪 Running Registration Validation Tests\n");
  
  for (const scenario of testScenarios) {
    console.log(`📋 Test: ${scenario.name}`);
    console.log(`   Input: username="${scenario.data.username}", password="${scenario.data.password}"`);
    
    try {
      const result = await validateUserRegistration(scenario.data);
      
      if (result === scenario.expected) {
        console.log(`   ✅ PASS: "${result}"`);
      } else {
        console.log(`   ❌ FAIL: Expected "${scenario.expected}", got "${result}"`);
      }
    } catch (error) {
      console.log(`   💥 ERROR: ${error.message}`);
    }
    
    console.log("");
  }
}

/**
 * Test username availability checking
 */
export async function testUsernameAvailability() {
  console.log("🔍 Testing Username Availability\n");
  
  const usernames = ["admin", "newuser123", "test", "available_user"];
  
  for (const username of usernames) {
    console.log(`Checking: "${username}"`);
    
    try {
      const result = await quickUsernameCheck(username);
      console.log(`   ${result.isValid ? '✅' : '❌'} ${result.message}`);
    } catch (error) {
      console.log(`   💥 ERROR: ${error.message}`);
    }
    
    console.log("");
  }
}

/**
 * Interactive validation function for manual testing
 */
export async function validateInput(username, password) {
  console.log(`\n🔍 Validating: username="${username}", password="${password}"`);
  
  try {
    const result = await validateUserRegistration({ username, password });
    
    if (result) {
      console.log(`❌ Validation Failed: ${result}`);
      return false;
    } else {
      console.log(`✅ Validation Passed: Registration data is valid!`);
      return true;
    }
  } catch (error) {
    console.log(`💥 Validation Error: ${error.message}`);
    return false;
  }
}

// Example usage:
// runValidationTests();
// testUsernameAvailability();
// validateInput("myusername", "MyPassword123!");

console.log(`
🚀 Registration Validation Demo Loaded!

Available functions:
- runValidationTests() - Run all test scenarios
- testUsernameAvailability() - Test username checking
- validateInput(username, password) - Test specific input

Example usage:
  await runValidationTests();
  await validateInput("myuser", "MyPass123!");
`);