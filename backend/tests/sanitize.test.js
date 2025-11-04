// generated-by-copilot: Unit tests for sanitization utilities
const { sanitizeInput, isValidUsername, isValidPassword } = require('../utils/sanitize');

describe('Sanitization Utility Tests', () => {
  describe('sanitizeInput', () => {
    it('should escape HTML tags', () => {
      const input = '<script>alert("xss")</script>';
      const result = sanitizeInput(input);
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('</script>');
      expect(result).toContain('&lt;');
      expect(result).toContain('&gt;');
    });

    it('should escape special characters', () => {
      const input = '<img src=x onerror=alert(1)>';
      const result = sanitizeInput(input);
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });

    it('should trim whitespace', () => {
      const input = '  test  ';
      const result = sanitizeInput(input);
      expect(result).toBe('test');
    });

    it('should handle non-string input', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput(123)).toBe('');
      expect(sanitizeInput({})).toBe('');
    });

    it('should preserve alphanumeric characters', () => {
      const input = 'validUser123';
      const result = sanitizeInput(input);
      expect(result).toBe('validUser123');
    });
  });

  describe('isValidUsername', () => {
    it('should accept valid usernames', () => {
      expect(isValidUsername('user123')).toBe(true);
      expect(isValidUsername('valid-user')).toBe(true);
      expect(isValidUsername('valid_user')).toBe(true);
      expect(isValidUsername('ValidUser123')).toBe(true);
    });

    it('should reject usernames with special characters', () => {
      expect(isValidUsername('user@test')).toBe(false);
      expect(isValidUsername('user<script>')).toBe(false);
      expect(isValidUsername('user test')).toBe(false);
      expect(isValidUsername('user!test')).toBe(false);
    });

    it('should reject too short usernames', () => {
      expect(isValidUsername('ab')).toBe(false);
      expect(isValidUsername('a')).toBe(false);
      expect(isValidUsername('')).toBe(false);
    });

    it('should reject too long usernames', () => {
      expect(isValidUsername('a'.repeat(31))).toBe(false);
      expect(isValidUsername('a'.repeat(50))).toBe(false);
    });

    it('should accept usernames at boundary lengths', () => {
      expect(isValidUsername('abc')).toBe(true); // min length
      expect(isValidUsername('a'.repeat(30))).toBe(true); // max length
    });

    it('should reject non-string input', () => {
      expect(isValidUsername(null)).toBe(false);
      expect(isValidUsername(undefined)).toBe(false);
      expect(isValidUsername(123)).toBe(false);
      expect(isValidUsername({})).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('should accept valid passwords', () => {
      expect(isValidPassword('pass')).toBe(true);
      expect(isValidPassword('password123')).toBe(true);
      expect(isValidPassword('P@ssw0rd!')).toBe(true);
    });

    it('should reject too short passwords', () => {
      expect(isValidPassword('abc')).toBe(false);
      expect(isValidPassword('ab')).toBe(false);
      expect(isValidPassword('')).toBe(false);
    });

    it('should reject too long passwords', () => {
      expect(isValidPassword('a'.repeat(101))).toBe(false);
      expect(isValidPassword('a'.repeat(200))).toBe(false);
    });

    it('should accept passwords at boundary lengths', () => {
      expect(isValidPassword('pass')).toBe(true); // min length
      expect(isValidPassword('a'.repeat(100))).toBe(true); // max length
    });

    it('should reject non-string input', () => {
      expect(isValidPassword(null)).toBe(false);
      expect(isValidPassword(undefined)).toBe(false);
      expect(isValidPassword(123)).toBe(false);
      expect(isValidPassword({})).toBe(false);
    });
  });
});
