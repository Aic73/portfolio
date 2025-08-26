import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const NotFound = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isDark ? 'bg-secondary text-white' : 'bg-secondary-light text-secondary'
    }`}>
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className={`inline-block px-6 py-3 rounded-full font-semibold transition-all ${
            isDark
              ? 'bg-primary hover:bg-orange-600 text-white'
              : 'bg-primary hover:bg-orange-600 text-white'
          }`}
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;