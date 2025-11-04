const express = require('express');
// generated-by-copilot: Import sanitization utilities for XSS prevention
const { sanitizeInput } = require('../utils/sanitize');

function createFavoritesRouter({ usersFile, booksFile, readJSON, writeJSON, authenticateToken }) {
  const router = express.Router();

  router.get('/', authenticateToken, (req, res) => {
    const users = readJSON(usersFile);
    const user = users.find(u => u.username === req.user.username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const books = readJSON(booksFile);
    const favorites = books.filter(b => user.favorites.indexOf(b.id) !== -1);
    res.json(favorites);
  });

  router.post('/', authenticateToken, (req, res) => {
    const { bookId } = req.body;
    if (!bookId) return res.status(400).json({ message: 'Book ID required' });
    
    // generated-by-copilot: Sanitize bookId to prevent XSS
    const sanitizedBookId = sanitizeInput(String(bookId));
    
    // generated-by-copilot: Validate bookId format (should be numeric string)
    if (!/^[0-9]+$/.test(sanitizedBookId)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }
    
    const users = readJSON(usersFile);
    const user = users.find(u => u.username === req.user.username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // generated-by-copilot: Verify book exists before adding to favorites
    const books = readJSON(booksFile);
    const bookExists = books.some(b => b.id === sanitizedBookId);
    if (!bookExists) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    if (user.favorites.indexOf(sanitizedBookId) == -1) {
      user.favorites.push(sanitizedBookId);
      writeJSON(usersFile, users);
    }
    res.status(200).json({ message: 'Book added to favorites' });
  });

  return router;
}

module.exports = createFavoritesRouter;
