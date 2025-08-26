import { useEffect } from 'react';

const useAnalytics = () => {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    
    // Only initialize in production with a valid ID and not on localhost
    if (import.meta.env.PROD && !isLocalhost && measurementId && measurementId !== 'YOUR_MEASUREMENT_ID') {
      // Use a different approach with gtag directly
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      
      script.onerror = () => {
        console.error('Failed to load Google Analytics script');
      };
      
      document.head.appendChild(script);
      
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', measurementId);
      
      console.log('Google Analytics initialized with ID:', measurementId);
    } else if (import.meta.env.DEV || isLocalhost) {
      console.log('Google Analytics would initialize with ID:', measurementId, '(but skipped on localhost)');
    }
  }, []);
};



// Function to track custom events
export const trackEvent = (category, action, label, value) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  } else if (import.meta.env.DEV) {
    console.log('Event tracked:', { category, action, label, value });
  }
};

export default useAnalytics;