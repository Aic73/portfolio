// src/utils/webVitals.js (simplified)
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

export function trackWebVitals() {
  // Only track in production
  if (import.meta.env.PROD) {
    try {
      onCLS(console.log);
      onINP(console.log);
      onFCP(console.log);
      onLCP(console.log);
      onTTFB(console.log);
    } catch (err) {
      console.error('[Web Vitals]', err);
    }
  }
}