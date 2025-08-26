import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = ({ isLoading, onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [loadingDetails, setLoadingDetails] = useState('Initializing...');

  useEffect(() => {
    if (!isLoading) return;

    let totalResources = 0;
    let loadedResources = 0;
    const apiCalls = new Set();
    const resources = new Set();

    // Function to update progress
    const updateProgress = (resource = null) => {
      if (resource) {
        resources.add(resource);
        totalResources = resources.size + apiCalls.size;
      }
      
      loadedResources++;
      const newProgress = Math.min(100, Math.round((loadedResources / totalResources) * 100));
      setProgress(newProgress);

      // Update loading text based on progress
      if (newProgress < 30) {
        setLoadingDetails('Loading core resources...');
      } else if (newProgress < 60) {
        setLoadingDetails('Loading fonts and styles...');
      } else if (newProgress < 90) {
        setLoadingDetails('Fetching data from APIs...');
      } else {
        setLoadingDetails('Finalizing page...');
      }

      if (newProgress >= 100) {
        setTimeout(() => {
          onLoaded && onLoaded();
        }, 500);
      }
    };

    // Track fonts loading
    if (document.fonts) {
      document.fonts.ready.then(() => {
        updateProgress('fonts-ready');
      }).catch(() => {
        updateProgress('fonts-ready');
      });
    } else {
      updateProgress('fonts-skip');
    }

    // Track images
    Array.from(document.images).forEach(img => {
      if (img.complete) {
        updateProgress(`image-${img.src}`);
      } else {
        img.addEventListener('load', () => updateProgress(`image-${img.src}`));
        img.addEventListener('error', () => updateProgress(`image-${img.src}`));
      }
    });

    // Track API calls by overriding fetch
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const requestId = `api-${args[0]}`;
      apiCalls.add(requestId);
      totalResources = resources.size + apiCalls.size;
      
      return originalFetch.apply(this, args).then(response => {
        updateProgress(requestId);
        return response;
      }).catch(error => {
        updateProgress(requestId);
        throw error;
      });
    };

    // Track XMLHttpRequest calls
    const originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
      const xhr = new originalXHR();
      let requestUrl = '';
      
      const originalOpen = xhr.open;
      xhr.open = function(...args) {
        requestUrl = args[1];
        const requestId = `xhr-${requestUrl}`;
        apiCalls.add(requestId);
        totalResources = resources.size + apiCalls.size;
        return originalOpen.apply(this, args);
      };
      
      xhr.addEventListener('load', () => {
        updateProgress(`xhr-${requestUrl}`);
      });
      
      xhr.addEventListener('error', () => {
        updateProgress(`xhr-${requestUrl}`);
      });
      
      return xhr;
    };

    // Track CSS resources
    Array.from(document.querySelectorAll('link[rel="stylesheet"]')).forEach(link => {
      if (link.sheet) {
        updateProgress(`css-${link.href}`);
      } else {
        link.addEventListener('load', () => updateProgress(`css-${link.href}`));
        link.addEventListener('error', () => updateProgress(`css-${link.href}`));
      }
    });

    // Fallback - if no resources are detected, still complete after a timeout
    const fallbackTimeout = setTimeout(() => {
      if (progress < 100) {
        setProgress(100);
        setTimeout(() => {
          onLoaded && onLoaded();
        }, 500);
      }
    }, 5000);

    // Cleanup function
    return () => {
      clearTimeout(fallbackTimeout);
      window.fetch = originalFetch;
      window.XMLHttpRequest = originalXHR;
    };
  }, [isLoading, onLoaded]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-secondary dark:bg-white"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
              />
            </motion.div>
          </div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-white dark:text-secondary mb-4"
          >
            Naeem Khan
          </motion.h2>
          
          <div className="w-64 h-2 bg-gray-700 dark:bg-gray-300 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-primary"
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-gray-400 dark:text-gray-600 text-sm"
          >
            {loadingDetails} ({progress}%)
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;