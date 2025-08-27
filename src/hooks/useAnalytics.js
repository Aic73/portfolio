const useAnalytics = () => {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    
    // Only initialize in production with a valid ID and not on localhost
    if (import.meta.env.PROD && !isLocalhost && measurementId && measurementId !== 'YOUR_MEASUREMENT_ID') {
      // Check if script already exists
      if (document.querySelector('script[src*="googletagmanager.com"]')) {
        return;
      }
      
      // Check if we can resolve the domain first
      const testImage = new Image();
      testImage.onload = function() {
        // Domain is accessible, load the script
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
      };
      
      testImage.onerror = function() {
        console.error('Google Analytics domain not accessible');
      };
      
      // Try to load a tiny image from the domain to test accessibility
      testImage.src = 'https://www.googletagmanager.com/favicon.ico?' + Date.now();
    } else if (import.meta.env.DEV || isLocalhost) {
      console.log('Google Analytics would initialize with ID:', measurementId, '(but skipped on localhost)');
    }
  }, []);
};
