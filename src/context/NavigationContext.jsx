/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [path, setPath] = useState(window.location.pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = (to, onPageChange = null) => {
    if (to === path) {
      if (onPageChange) onPageChange();
      return;
    }
    
    setIsTransitioning(true);

    // Wait for transition-in overlay to cover screen (500ms)
    setTimeout(() => {
      window.history.pushState({}, '', to);
      setPath(to);
      // Instant scroll to top on navigation to give a true new-page load feel
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Dispatch popstate event to let scroll managers know the page updated
      window.dispatchEvent(new Event('popstate'));
      
      // Run the callback (e.g. scroll to anchor) after the path updates
      if (onPageChange) {
        setTimeout(onPageChange, 50);
      }

      // Keep transition visible a brief moment for rendering, then slide out
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 500);
  };

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <NavigationContext.Provider value={{ path, navigate, isTransitioning }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

