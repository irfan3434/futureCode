import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import MainLayout from './layout/MainLayout';
import { HeaderProvider } from './contexts/HeaderContext';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import ServiceDetailPage from './components/ServiceDetail/ServiceDetailPage';

function App() {
  return (
    <Router>
      <HeaderProvider>
        <MainLayout>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/AboutUs" element = { <AboutUs />} />
               <Route path="/contact" element = { <Contact />} />
               <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
            </Routes>
        </MainLayout>
      </HeaderProvider>
     
    </Router>
  );
}

export default App;
 