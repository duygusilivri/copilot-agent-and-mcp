const express = require('express');
const jwt = require('jsonwebtoken');
// generated-by-copilot: Import sanitization utilities for XSS prevention
const { sanitizeInput, isValidUsername, isValidPassword } = require('../utils/sanitize');

function createAuthRouter({ usersFile, readJSON, writeJSON, SECRET_KEY }) {
  const router = express.Router();

  router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
    
    // generated-by-copilot: Validate and sanitize inputs to prevent XSS
    if (!isValidUsername(username)) {
      return res.status(400).json({ message: 'Invalid username format. Use 3-30 alphanumeric characters, underscores, or hyphens.' });
    }
    
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'Invalid password. Must be 4-100 characters.' });
    }
    
    // generated-by-copilot: Sanitize username before storage
    const sanitizedUsername = sanitizeInput(username);
    
    const users = readJSON(usersFile);
    if (users.find(u => u.username === sanitizedUsername)) {
      return res.status(409).json({ message: 'User already exists' });
    }
    users.push({ username: sanitizedUsername, password, favorites: [] });
    writeJSON(usersFile, users);
    res.status(201).json({ message: 'User registered' });
  });

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // generated-by-copilot: Validate inputs to prevent XSS
    if (!username || !password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    if (!isValidUsername(username)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // generated-by-copilot: Sanitize username for lookup
    const sanitizedUsername = sanitizeInput(username);
    
    const users = readJSON(usersFile);
    const user = users.find(u => u.username === sanitizedUsername && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ username: sanitizedUsername }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  });

  return router;
}

module.exports = createAuthRouter;
