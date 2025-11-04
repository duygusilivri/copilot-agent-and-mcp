const express = require('express');
const jwt = require('jsonwebtoken');
// generated-by-copilot: Import validation utilities for XSS prevention
const { isValidUsername, isValidPassword } = require('../utils/sanitize');

function createAuthRouter({ usersFile, readJSON, writeJSON, SECRET_KEY }) {
  const router = express.Router();

  router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
    
    // generated-by-copilot: Validate inputs to prevent XSS - validation ensures safe characters
    if (!isValidUsername(username)) {
      return res.status(400).json({ message: 'Invalid username format. Use 3-30 alphanumeric characters, underscores, or hyphens.' });
    }
    
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'Invalid password. Must be 4-100 characters.' });
    }
    
    const users = readJSON(usersFile);
    if (users.find(u => u.username === username)) {
      return res.status(409).json({ message: 'User already exists' });
    }
    users.push({ username, password, favorites: [] });
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
    
    const users = readJSON(usersFile);
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  });

  return router;
}

module.exports = createAuthRouter;
