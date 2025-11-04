// generated-by-copilot: Tests for XSS prevention in authentication
const request = require('supertest');
const express = require('express');
const createApiRouter = require('../routes');
const path = require('path');

const app = express();
app.use(express.json());
app.use('/api', createApiRouter({
  usersFile: path.join(__dirname, '../data/test-users.json'),
  booksFile: path.join(__dirname, '../data/test-books.json'),
  readJSON: (file) => require('fs').existsSync(file) ? JSON.parse(require('fs').readFileSync(file, 'utf-8')) : [],
  writeJSON: (file, data) => require('fs').writeFileSync(file, JSON.stringify(data, null, 2)),
  authenticateToken: (req, res, next) => {
    // generated-by-copilot: Mock authentication by setting a test user
    req.user = { username: 'testuser' };
    next();
  },
  SECRET_KEY: 'test_secret',
}));

describe('XSS Prevention Tests', () => {
  describe('Registration XSS Prevention', () => {
    it('should reject username with script tags', async () => {
      const maliciousUser = {
        username: '<script>alert("xss")</script>',
        password: 'password123'
      };
      const res = await request(app).post('/api/register').send(maliciousUser);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('Invalid username format');
    });

    it('should reject username with HTML tags', async () => {
      const maliciousUser = {
        username: '<img src=x onerror=alert(1)>',
        password: 'password123'
      };
      const res = await request(app).post('/api/register').send(maliciousUser);
      expect(res.statusCode).toBe(400);
    });

    it('should reject username with special characters', async () => {
      const maliciousUser = {
        username: 'user<>test',
        password: 'password123'
      };
      const res = await request(app).post('/api/register').send(maliciousUser);
      expect(res.statusCode).toBe(400);
    });

    it('should reject username that is too short', async () => {
      const maliciousUser = {
        username: 'ab',
        password: 'password123'
      };
      const res = await request(app).post('/api/register').send(maliciousUser);
      expect(res.statusCode).toBe(400);
    });

    it('should reject username that is too long', async () => {
      const maliciousUser = {
        username: 'a'.repeat(31),
        password: 'password123'
      };
      const res = await request(app).post('/api/register').send(maliciousUser);
      expect(res.statusCode).toBe(400);
    });

    it('should accept valid username with alphanumeric and hyphens', async () => {
      const validUser = {
        username: 'valid-user_123',
        password: 'password123'
      };
      const res = await request(app).post('/api/register').send(validUser);
      expect([201, 409]).toContain(res.statusCode); // 201 if new, 409 if exists
    });

    it('should reject password that is too short', async () => {
      const user = {
        username: 'validuser',
        password: 'abc'
      };
      const res = await request(app).post('/api/register').send(user);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('Invalid password');
    });

    it('should reject password that is too long', async () => {
      const user = {
        username: 'validuser2',
        password: 'a'.repeat(101)
      };
      const res = await request(app).post('/api/register').send(user);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('Invalid password');
    });
  });

  describe('Login XSS Prevention', () => {
    it('should reject login with malicious username', async () => {
      const maliciousLogin = {
        username: '<script>alert("xss")</script>',
        password: 'password123'
      };
      const res = await request(app).post('/api/login').send(maliciousLogin);
      expect(res.statusCode).toBe(401);
    });

    it('should reject login with HTML in username', async () => {
      const maliciousLogin = {
        username: '<img src=x onerror=alert(1)>',
        password: 'password123'
      };
      const res = await request(app).post('/api/login').send(maliciousLogin);
      expect(res.statusCode).toBe(401);
    });
  });

  describe('Favorites XSS Prevention', () => {
    it('should reject non-numeric book ID', async () => {
      const maliciousBookId = {
        bookId: '<script>alert("xss")</script>'
      };
      const res = await request(app).post('/api/favorites').send(maliciousBookId);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('Invalid book ID format');
    });

    it('should reject book ID with HTML tags', async () => {
      const maliciousBookId = {
        bookId: '<img src=x>'
      };
      const res = await request(app).post('/api/favorites').send(maliciousBookId);
      expect(res.statusCode).toBe(400);
    });

    it('should reject book ID with special characters', async () => {
      const maliciousBookId = {
        bookId: '1; DROP TABLE users;'
      };
      const res = await request(app).post('/api/favorites').send(maliciousBookId);
      expect(res.statusCode).toBe(400);
    });

    it('should accept valid numeric book ID', async () => {
      const validBookId = {
        bookId: '1'
      };
      const res = await request(app).post('/api/favorites').send(validBookId);
      // Should succeed or return 404 if book doesn't exist
      expect([200, 404]).toContain(res.statusCode);
    });
  });
});
