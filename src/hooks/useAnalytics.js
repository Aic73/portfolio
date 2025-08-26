import { useEffect } from 'react';

const useAnalytics = () => {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    // Only initialize in production with a valid ID
    if (import.meta.env.PROD && measurementId && measurementId !== 'YOUR_MEASUREMENT_ID') {
      // Use dynamic import to avoid issues
      import('react-ga4').then(({ default: ReactGA }) => {
        // Check if initialize function exists
        if (ReactGA && typeof ReactGA.initialize === 'function') {
          ReactGA.initialize(measurementId);
          ReactGA.send({ 
            hitType: "pageview", 
            page: window.location.pathname + window.location.search 
          });
        }
      }).catch(error => {
        console.error('Failed to load react-ga4:', error);
      });
    } else if (import.meta.env.DEV) {
      console.log('Google Analytics would initialize with ID:', measurementId);
    }
  }, []);
};

// Function to track custom events
export const trackEvent = (category, action, label, value) => {
  if (import.meta.env.PROD) {
    import('react-ga4').then(({ default: ReactGA }) => {
      if (ReactGA && typeof ReactGA.event === 'function') {
        ReactGA.event({
          category: category,
          action: action,
          label: label,
          value: value
        });
      }
    }).catch(error => {
      console.error('Failed to track event:', error);
    });
  } else if (import.meta.env.DEV) {
    console.log('Event tracked:', { category, action, label, value });
  }
};

export default useAnalytics;