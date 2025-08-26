import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import PageLoader from './components/PageLoader';
import useAnalytics from './hooks/useAnalytics';
import useDocumentHead from './hooks/useDocumentHead';

// Lazy load components
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// Loading component for Suspense fallback
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Main app content
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useTheme();

  useDocumentHead({
    title: "Naeem Khan - Full Stack Developer",
    description: "Passionate full-stack developer crafting digital experiences that blend innovation with functionality.",
    keywords: "web developer, full stack, react, javascript, portfolio"
  });

  useAnalytics();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 overflow-x-hidden ${
      isDark 
        ? 'bg-secondary text-white' 
        : 'bg-secondary-light text-secondary'
    }`}>
      <PageLoader isLoading={isLoading} />
      
      {!isLoading && (
        <>
          <Header />
          <main className="w-full overflow-x-hidden">
            <Suspense fallback={<SectionLoader />}>
              <Hero />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <About />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </main>
        </>
      )}
    </div>
  );
};

// Main App wrapper
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;