import { useEffect } from 'react';

const useAnalytics = () => {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    // Check if we're in production and have a valid ID
    if (import.meta.env.PROD && measurementId && measurementId !== 'YOUR_MEASUREMENT_ID') {
      // Dynamically import to avoid issues with React version conflicts
      import('react-ga4').then((ReactGA) => {
        ReactGA.initialize(measurementId);
        ReactGA.send({ 
          hitType: "pageview", 
          page: window.location.pathname + window.location.search 
        });
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
    import('react-ga4').then((ReactGA) => {
      ReactGA.event({
        category: category,
        action: action,
        label: label,
        value: value
      });
    }).catch(error => {
      console.error('Failed to track event:', error);
    });
  } else if (import.meta.env.DEV) {
    console.log('Event tracked:', { category, action, label, value });
  }
};

export default useAnalytics;