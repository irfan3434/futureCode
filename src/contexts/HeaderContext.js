import React, { createContext, useContext, useState, useCallback } from 'react';

// Create Header Context
const HeaderContext = createContext(undefined);

// Header Provider Component
export const HeaderProvider = ({ children }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(64); // 4rem default
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const showHeader = useCallback(() => {
    setIsHeaderVisible(true);
  }, []);

  const hideHeader = useCallback(() => {
    setIsHeaderVisible(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const value = {
    isHeaderVisible,
    headerHeight,
    isMobileMenuOpen,
    showHeader,
    hideHeader,
    toggleMobileMenu,
    closeMobileMenu,
    setHeaderHeight,
  };

  return (
    <HeaderContext.Provider value={value}>
      {children}
    </HeaderContext.Provider>
  );
};

// Custom Hook to use Header Context
export const useHeader = () => {
  const context = useContext(HeaderContext);
  
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  
  return context;
};

// HOC for components that need header offset
export const withHeaderOffset = (Component) => {
  return function WithHeaderOffsetComponent(props) {
    const { headerHeight, isHeaderVisible } = useHeader();
    
    const offset = isHeaderVisible ? headerHeight : 0;
    
    return <Component {...props} headerOffset={offset} />;
  };
};