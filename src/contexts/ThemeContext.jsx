import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      console.log('Loaded saved theme:', savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      console.log('Using system preference:', prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    // Update theme in localStorage and DOM
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    console.log('Setting theme to:', isDark ? 'dark' : 'light');
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      console.log('Added dark class to html element');
      console.log('HTML classes:', document.documentElement.classList);
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class from html element');
      console.log('HTML classes:', document.documentElement.classList);
    }
  }, [isDark]);

  const toggleTheme = () => {
    console.log('Toggling theme from:', isDark ? 'dark' : 'light', 'to:', !isDark ? 'dark' : 'light');
    setIsDark(!isDark);
  };

  const value = {
    isDark,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};