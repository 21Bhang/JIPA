// Ensure window.fetch is safely writable for browser extensions/interceptors
if (typeof window !== 'undefined') {
  try {
    let currentFetch = window.fetch;
    const defineFetchSafe = (target: any) => {
      try {
        Object.defineProperty(target, 'fetch', {
          configurable: true,
          enumerable: true,
          get() {
            return currentFetch;
          },
          set(fn) {
            currentFetch = fn;
          },
        });
      } catch {
        // Safe ignore
      }
    };
    defineFetchSafe(window);
    if (window.constructor?.prototype) {
      defineFetchSafe(window.constructor.prototype);
    }
  } catch {
    // Safe ignore
  }
}

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
