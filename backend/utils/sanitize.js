// generated-by-copilot: Input sanitization utility to prevent XSS attacks
const validator = require('validator');

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - The input string to sanitize
 * @returns {string} - The sanitized string
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove any HTML tags and escape special characters
  let sanitized = validator.escape(input);
  
  // Additional cleanup: normalize whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
}

/**
 * Validate that username doesn't contain malicious patterns
 * @param {string} username - The username to validate
 * @returns {boolean} - True if username is valid
 */
function isValidUsername(username) {
  if (!username || typeof username !== 'string') {
    return false;
  }
  
  // Username should be alphanumeric with optional underscores/hyphens
  // Length between 3 and 30 characters
  const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
  return usernameRegex.test(username);
}

/**
 * Validate password strength
 * @param {string} password - The password to validate
 * @returns {boolean} - True if password is valid
 */
function isValidPassword(password) {
  if (!password || typeof password !== 'string') {
    return false;
  }
  
  // Password should be at least 4 characters (basic validation)
  return password.length >= 4 && password.length <= 100;
}

module.exports = {
  sanitizeInput,
  isValidUsername,
  isValidPassword
};
