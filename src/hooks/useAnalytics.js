// Update your useAnalytics hook with this implementation
const useAnalytics = () => {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    
    // Only initialize in production with a valid ID and not on localhost
    if (import.meta.env.PROD && !isLocalhost && measurementId && measurementId !== 'G-Z6JLYLTRS4') {
      // Check if script already exists
      if (document.querySelector('script[src*="googletagmanager.com"]')) {
        return;
      }
      
      // First, check if we can access the Google Analytics domain
      const testConnection = () => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = 'https://www.googletagmanager.com/favicon.ico?cache=' + Date.now();
          
          // Timeout after 2 seconds
          setTimeout(() => resolve(false), 2000);
        });
      };
      
      testConnection().then((isAccessible) => {
        if (!isAccessible) {
          console.warn('Google Analytics domain not accessible. Skipping initialization.');
          return;
        }
        
        // Load the script
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
      });
    } else if (import.meta.env.DEV || isLocalhost) {
      console.log('Google Analytics would initialize with ID:', measurementId, '(but skipped on localhost)');
    }
  }, []);
};