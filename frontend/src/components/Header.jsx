import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

/* generated-by-copilot: Modern header with gradient and enhanced styling */
const Header = () => {
  const username = useAppSelector(state => state.user.username);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header style={{
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      minHeight: '4rem',
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2.5rem',
      boxSizing: 'border-box',
      backdropFilter: 'blur(10px)',
    }}>
      <span style={{ 
        fontWeight: 800, 
        fontSize: '1.5rem', 
        letterSpacing: '0.5px',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>📚 Book Favorites</span>
      {username && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <nav style={{ display: 'flex', gap: '0.5rem' }}>
            <a
              id="books-link"
              href="/books"
              onClick={e => { e.preventDefault(); navigate('/books'); }}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                padding: '0.6rem 1.2rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                background: window.location.pathname === '/books' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                fontSize: '0.95rem',
                letterSpacing: '0.3px',
              }}
            >
              Books
            </a>
            <a
              id="favorites-link"
              href="/favorites"
              onClick={e => { e.preventDefault(); navigate('/favorites'); }}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                padding: '0.6rem 1.2rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                background: window.location.pathname === '/favorites' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                fontSize: '0.95rem',
                letterSpacing: '0.3px',
              }}
            >
              Favorites
            </a>
          </nav>
          <span style={{ 
            color: '#fff', 
            fontWeight: 600, 
            whiteSpace: 'nowrap', 
            display: 'inline-block',
            fontSize: '0.95rem',
            letterSpacing: '0.3px',
          }}>Hi, {username}</span>
          <button id="logout" onClick={handleLogout} style={{ 
            padding: '0.6rem 1.5rem', 
            fontSize: '0.95rem', 
            background: 'rgba(255,255,255,0.95)', 
            color: '#667eea', 
            border: 'none', 
            borderRadius: '10px', 
            cursor: 'pointer',
            fontWeight: 700,
            letterSpacing: '0.3px',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
