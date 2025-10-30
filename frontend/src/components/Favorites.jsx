import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchFavorites } from '../store/favoritesSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/BookList.module.css';

/* generated-by-copilot: Modern favorites page with card grid layout */
const Favorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);
  const status = useAppSelector(state => state.favorites.status);
  const token = useAppSelector(state => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    dispatch(fetchFavorites(token));
  }, [dispatch, token, navigate]);

  if (status === 'loading') return <div style={{ textAlign: 'center', marginTop: '5rem', fontSize: '1.2rem', color: '#fff' }}>Loading...</div>;
  if (status === 'failed') return <div style={{ textAlign: 'center', marginTop: '5rem', fontSize: '1.2rem', color: '#fff' }}>Failed to load favorites.</div>;

  return (
    <div>
      <h2 style={{ color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>My Favorite Books</h2>
      {favorites.length === 0 ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '3rem',
          borderRadius: '16px',
          maxWidth: '500px',
          margin: '2rem auto',
          boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
          textAlign: 'center',
          color: '#718096',
          border: '1px solid rgba(255,255,255,0.18)',
        }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>No favorite books yet.</p>
          <p style={{ fontSize: '1rem' }}>
            Go to the <a 
              href="/books" 
              onClick={e => { e.preventDefault(); navigate('/books'); }}
              style={{
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: 600,
                borderBottom: '2px solid #667eea',
              }}
            >book list</a> to add some!
          </p>
        </div>
      ) : (
        <div className={styles.bookGrid}>
          {favorites.map(book => (
            <div className={styles.bookCard} key={book.id}>
              <div className={styles.bookTitle}>{book.title}</div>
              <div className={styles.bookAuthor}>by {book.author}</div>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: 'auto',
                color: '#e25555',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#e25555" stroke="#e25555" strokeWidth="1.5">
                  <path d="M12 21s-6.2-5.2-8.4-7.4C1.2 11.2 1.2 8.1 3.1 6.2c1.9-1.9 5-1.9 6.9 0l2 2 2-2c1.9-1.9 5-1.9 6.9 0 1.9 1.9 1.9 5 0 6.9C18.2 15.8 12 21 12 21z"/>
                </svg>
                Favorite
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
