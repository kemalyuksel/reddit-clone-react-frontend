import React from 'react';
import '../styles/notFoundPage.css'; // Yeni CSS dosyasını ekleyin
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-subtitle">
        Sorry, the page you're looking for could not be found. You can return to the{' '}
        <Link to="/" className="not-found-link">
          homepage
        </Link>{' '}
        for a Reddit-like experience.
      </p>
      <img
        src="https://cdn.worldvectorlogo.com/logos/reddit-logo-new.svg"
        alt="Reddit Logo"
        className="reddit-logo"
        style={{width:'100%'}}
      />
    </div>
  );
};

export default NotFoundPage;
