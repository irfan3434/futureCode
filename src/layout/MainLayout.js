import React from "react";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useHeader } from '../contexts/HeaderContext';
import SkipNavigation from '../components/SkipNavigation/SkipNavigation'; // ADD THIS
import { useLocation } from 'react-router-dom';




const MainLayout = ({ children }) => {
  const { headerHeight } = useHeader(); // NOW THIS WILL WORK!
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <>
      <SkipNavigation /> {/* ADD THIS for accessibility */}
      <Header />
      <main 
        className="main-content"
        id="main-content" // ADD THIS for skip navigation
        style={{ 
          paddingTop: isHomePage ? '0' : `${headerHeight}px` 
        }}

        tabIndex="-1" // ADD THIS for focus management
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;