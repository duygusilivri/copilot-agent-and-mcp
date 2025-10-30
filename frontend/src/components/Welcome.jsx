import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/App.module.css';

/* generated-by-copilot: Modern welcome page with gradient buttons and enhanced design */
const Welcome = () => (
  <div className={styles.welcome} style={{ textAlign: 'center', marginTop: '4rem' }}>
    <h1 style={{
      fontSize: '3.5rem',
      fontWeight: 800,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1rem',
      textShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
    }}>Welcome to Book Favorites!</h1>
    <p style={{
      fontSize: '1.3rem',
      color: '#fff',
      fontWeight: 500,
      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
      marginBottom: '1rem',
    }}>Sign up or log in to start saving your favorite books.</p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
      <Link to="/register" style={{ textDecoration: 'none' }}>
        <button style={{
          background: 'rgba(255, 255, 255, 0.95)',
          color: '#667eea',
          border: 'none',
          borderRadius: '12px',
          padding: '1rem 2.5rem',
          fontSize: '1.15rem',
          fontWeight: 700,
          letterSpacing: '0.5px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={e => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.2)';
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
        }}
        >Create Account</button>
      </Link>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <button style={{
          background: 'rgba(255, 255, 255, 0.15)',
          color: '#fff',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          borderRadius: '12px',
          padding: '1rem 2.5rem',
          fontSize: '1.15rem',
          fontWeight: 700,
          letterSpacing: '0.5px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
        }}
        onMouseOver={e => { 
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'; 
          e.currentTarget.style.color = '#667eea';
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.2)';
        }}
        onMouseOut={e => { 
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; 
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
        }}
        >Login</button>
      </Link>
    </div>
  </div>
);

export default Welcome;
