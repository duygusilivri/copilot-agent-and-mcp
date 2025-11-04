// generated-by-copilot: Frontend sanitization utility to prevent XSS attacks
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} html - The HTML string to sanitize
 * @returns {string} - The sanitized HTML string
 */
export function sanitizeHtml(html) {
  if (typeof html !== 'string') {
    return '';
  }
  
  // Configure DOMPurify to be strict
  const config = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  };
  
  return DOMPurify.sanitize(html, config);
}

/**
 * Sanitize text content (removes all HTML)
 * @param {string} text - The text to sanitize
 * @returns {string} - The sanitized text
 */
export function sanitizeText(text) {
  if (typeof text !== 'string') {
    return '';
  }
  
  // Remove all HTML tags
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
}

/**
 * Validate username format on frontend
 * @param {string} username - The username to validate
 * @returns {boolean} - True if username is valid
 */
export function isValidUsername(username) {
  if (!username || typeof username !== 'string') {
    return false;
  }
  
  // Username should be alphanumeric with optional underscores/hyphens
  // Length between 3 and 30 characters
  const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
  return usernameRegex.test(username);
}
