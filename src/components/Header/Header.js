import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Calendar, Palette, Volume2, Users, Megaphone, ChevronDown } from 'lucide-react';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import useScrollDirection from '../../hooks/useScrollDirection';
import useMediaQuery from '../../hooks/useMediaQuery';
import './Header.css';


// Services configuration matching ServiceDetailPage
const SERVICES_CONFIG = [
  {
    id: 1,
    icon: Calendar,
    color: '#f1b8ff',
    slug: 'strategic-planning',
    titleKey: 'serviceDetail.planning.title',
    shortTitleKey: 'services.planning.title' // For dropdown menu
  },
  {
    id: 2,
    icon: Palette,
    color: '#b8d4ff',
    slug: 'event-design',
    titleKey: 'serviceDetail.design.title',
    shortTitleKey: 'services.design.title'
  },
  {
    id: 3,
    icon: Volume2,
    color: '#b8ffb8',
    slug: 'audio-visual',
    titleKey: 'serviceDetail.audioVisual.title',
    shortTitleKey: 'services.audioVisual.title'
  },
  {
    id: 4,
    icon: Users,
    color: '#ffb8b8',
    slug: 'event-management',
    titleKey: 'serviceDetail.eventManagement.title',
    shortTitleKey: 'services.eventManagement.title'
  },
  {
    id: 5,
    icon: Megaphone,
    color: '#ffe4b8',
    slug: 'marketing-strategies',
    titleKey: 'serviceDetail.marketing.title',
    shortTitleKey: 'services.marketing.title'
  }
];


// Navigation configuration
const NAV_ITEMS = [
  { path: '/', key: 'header.home' },
  { path: '#', key: 'header.services', hasDropdown: true },
  { path: '/AboutUs', key: 'header.aboutUs' },
  { path: '/contact', key: 'header.contact' },
];


// Enhanced NavItem component with dropdown support
const NavItem = memo(({ item, isActive, onClick, isMobile }) => {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const isRTL = i18n.language === 'ar';

  // Handle mouse enter with delay
  const handleMouseEnter = useCallback(() => {
    if (!isMobile && item.hasDropdown) {
      clearTimeout(timeoutRef.current);
      setIsDropdownOpen(true);
    }
  }, [isMobile, item.hasDropdown]);

  // Handle mouse leave with delay
  const handleMouseLeave = useCallback(() => {
    if (!isMobile && item.hasDropdown) {
      timeoutRef.current = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 200);
    }
  }, [isMobile, item.hasDropdown]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // For mobile, toggle dropdown on click
  const handleClick = useCallback((e) => {
    if (isMobile && item.hasDropdown) {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    } else if (!item.hasDropdown) {
      onClick();
    }
  }, [isMobile, item.hasDropdown, isDropdownOpen, onClick]);

  // Handle service link click
  const handleServiceClick = useCallback(() => {
    setIsDropdownOpen(false);
    onClick();
  }, [onClick]);

  // Mobile services submenu
  if (isMobile && item.hasDropdown) {
    return (
      <li className="mobile-nav-item has-submenu">
        <button
          className="mobile-nav-link submenu-toggle"
          onClick={handleClick}
          aria-expanded={isDropdownOpen}
        >
          <span>{t(item.key)}</span>
          <ChevronDown className={`submenu-arrow ${isDropdownOpen ? 'open' : ''}`} size={20} />
        </button>
        
        {isDropdownOpen && (
          <ul className="mobile-submenu">
            {SERVICES_CONFIG.map((service) => {
              const Icon = service.icon;
              return (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="mobile-submenu-link"
                    onClick={handleServiceClick}
                    style={{ '--service-color': service.color }}
                  >
                    <Icon size={18} className="submenu-icon" />
                    <span>{t(service.shortTitleKey)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  }

  // Desktop navigation with dropdown
  return (
    <li 
      className={`nav-item ${item.hasDropdown ? 'has-dropdown' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={item.path}
        className={`nav-link ${isActive ? 'active' : ''} ${isDropdownOpen ? 'dropdown-open' : ''}`}
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
        aria-expanded={item.hasDropdown ? isDropdownOpen : undefined}
        aria-haspopup={item.hasDropdown ? 'menu' : undefined}
      >
        <span className="nav-link-text">{t(item.key)}</span>
        {item.hasDropdown && (
          <ChevronDown 
            className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} 
            size={16} 
          />
        )}
        <span className="nav-link-indicator" aria-hidden="true" />
      </Link>

      {/* Services Dropdown */}
      {item.hasDropdown && (
        <div 
          ref={dropdownRef}
          className={`services-dropdown ${isDropdownOpen ? 'open' : ''} ${isRTL ? 'rtl' : 'ltr'}`}
          role="menu"
          aria-label={t('header.servicesMenu')}
        >
          <div className="dropdown-content">
            {SERVICES_CONFIG.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  to={`/services/${service.slug}`}
                  className="dropdown-item"
                  onClick={handleServiceClick}
                  role="menuitem"
                  style={{ '--service-color': service.color }}
                >
                  <div className="dropdown-item-icon">
                    <Icon size={20} />
                  </div>
                  <span className="dropdown-item-text">
                    {t(service.shortTitleKey)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </li>
  );
});

NavItem.displayName = 'NavItem';

// Hero slideshow configuration
const HERO_SLIDES = [
  {
    id: 1,
    image: '/assets/5.webp',
    alt: 'FutureCode',
    titleKey: `hero.slide1Title`,
    subtitleKey: 'hero.slide1Subtitle'
  },
  {
    id: 2,
    image: '/assets/6.webp',
    alt: 'Integrated Event Solutions',
    titleKey: 'hero.slide2Title',
    subtitleKey: 'hero.slide2Subtitle'
  },
  {
    id: 3,
    image: '/assets/4.webp',
    alt: 'Creative design',
    titleKey: 'hero.slide3Title',
    subtitleKey: 'hero.slide3Subtitle'
  }
];

// Hero Section Component with Slideshow
const HeroSection = memo(({ isHomePage }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [animationKey, setAnimationKey] = useState(0); 
  
  
  // Preload images
  useEffect(() => {
    if (!isHomePage) return;
    
    const imagePromises = HERO_SLIDES.map((slide) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = slide.image;
      });
    });
    
    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(console.error);
  }, [isHomePage]);

  const performSlideTransition = useCallback((newSlideIndex) => {
  setIsTransitioning(true);
  setTextVisible(false);

  // Wait for text to fade out (300ms-500ms)
  setTimeout(() => {
    setCurrentSlide(newSlideIndex);
  }, 500);

  // Wait slightly longer before fading text back in smoothly
  setTimeout(() => {
    setTextVisible(true);
    setIsTransitioning(false);
    setAnimationKey(prev => prev + 1);
  }, 700);
}, []);

  
  // Auto-advance slides
   useEffect(() => {
  if (!isHomePage || !imagesLoaded) return;

  const slideInterval = setInterval(() => {
    const nextSlide = (currentSlide + 1) % HERO_SLIDES.length;
    performSlideTransition(nextSlide);
  }, 7000); // adjusted to 7s for smoother pacing (modify as desired)

  return () => clearInterval(slideInterval);
}, [currentSlide, imagesLoaded, isHomePage, performSlideTransition]);
  
  const handleNextSlide = useCallback(() => {
    const nextSlide = (currentSlide + 1) % HERO_SLIDES.length;
    performSlideTransition(nextSlide);
  }, [currentSlide, performSlideTransition]);
  
  const handlePrevSlide = useCallback(() => {
    const prevSlide = (currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    performSlideTransition(prevSlide);
  }, [currentSlide, performSlideTransition]);
  
  const goToSlide = useCallback((index) => {
    if (index !== currentSlide) {
      performSlideTransition(index);
    }
  }, [currentSlide, performSlideTransition]);
  
  // Don't render if not on homepage
  if (!isHomePage) return null;
  
  return (
    <section className="hero-section">
      {/* Slideshow Background */}
      <div className="hero-slideshow">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
            role="img"
            aria-label={slide.alt}
          >
            {/* Ken Burns effect layer */}
            <div className="hero-slide-inner" />
          </div>
        ))}
        
        {/* Overlay Gradient */}
        <div className="hero-overlay" />
        
        {/* Slide Navigation */}
        <button
          className="hero-nav-button prev"
          onClick={handlePrevSlide}
          aria-label={t('hero.previousSlide', 'Previous slide')}
        >
          <ChevronDown className="nav-icon" style={{ transform: 'rotate(90deg)' }} />
        </button>
        <button
          className="hero-nav-button next"
          onClick={handleNextSlide}
          aria-label={t('hero.nextSlide', 'Next slide')}
        >
          <ChevronDown className="nav-icon" style={{ transform: 'rotate(-90deg)' }} />
        </button>
        
        {/* Slide Indicators */}
        <div className="hero-indicators">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={t('hero.goToSlide', 'Go to slide {{number}}', { number: index + 1 })}
            />
          ))}
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-text-wrapper">
          <h1 
            key={`title-${animationKey}`}
            className={`hero-title ${textVisible ? 'slide-up-fade-in' : 'slide-up-fade-out'}`}
          >
            {t(HERO_SLIDES[currentSlide].titleKey)}
          </h1>
          <p 
            key={`subtitle-${animationKey}`}
            className={`hero-subtitle ${textVisible ? 'slide-up-fade-in delayed' : 'slide-up-fade-out'}`}
          >
            {t(HERO_SLIDES[currentSlide].subtitleKey)}
          </p>
        </div>
        <div className="hero-cta">
          <Link to="/AboutUs" className="hero-button primary">
            {t('hero.viewProjects', 'About Us')}
          </Link>
          <Link to="/contact" className="hero-button secondary">
            {t('hero.getInTouch', 'Get In Touch')}
          </Link>
        </div>
      </div>
      
    </section> 
  );
});

HeroSection.displayName = 'HeroSection';

// Main Header Component
const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const scrollDirection = useScrollDirection();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);
  const mobileMenuRef = useRef(null);
  const headerRef = useRef(null);
  
  const isRTL = i18n.language === 'ar';
  const isHomePage = location.pathname === '/';

  // Handle scroll state with transparency logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
      
      // Make header solid after scrolling past hero section (if on homepage)
      if (isHomePage) {
        const heroHeight = window.innerHeight * 0.8; // 80vh
        setIsHeaderTransparent(scrollPosition < heroHeight - 100);
      } else {
        setIsHeaderTransparent(false);
      }
    };
    
    handleScroll(); // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Update transparency when route changes
  useEffect(() => {
    setIsHeaderTransparent(isHomePage && window.scrollY < 100);
  }, [location.pathname, isHomePage]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('.mobile-menu-toggle')
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Handle navigation click
  const handleNavClick = useCallback(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  // Check if route is active
  const isActiveRoute = useCallback((path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Header classes with transparency state
  const headerClasses = `
    futureCode-header
    ${isScrolled ? 'scrolled' : ''}
    ${scrollDirection === 'down' && isScrolled && !isHomePage ? 'hidden' : ''}
    ${isHeaderTransparent ? 'transparent' : 'solid'}
    ${isRTL ? 'rtl' : 'ltr'}
  `.trim();

  return (
    <>
      <header ref={headerRef} className={headerClasses}>
        <div className="header-container">
          <nav className="header-nav" role="navigation" aria-label={t('header.mainNavigation')}>
            {/* Logo/Brand */}
            <Link to="/" className="brand-logo" aria-label={t('header.home')}>
              <span className="brand-text">FutureCode</span>
            </Link>

            {/* Desktop Navigation */}
            {!isTablet && (
              <ul className="nav-links desktop-nav">
                {NAV_ITEMS.map((item) => (
                  <NavItem
                    key={item.path}
                    item={item}
                    isActive={isActiveRoute(item.path)}
                    onClick={handleNavClick}
                    isMobile={false}
                  />
                ))}
              </ul>
            )}

            {/* Actions Container */}
            <div className="header-actions">
              <LanguageToggle />
              
              {/* Mobile Menu Toggle */}
              {isTablet && (
                <button
                  className="mobile-menu-toggle"
                  onClick={toggleMobileMenu}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-navigation"
                  aria-label={isMobileMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
                >
                  <span className="menu-icon-wrapper">
                    {isMobileMenuOpen ? (
                      <X size={24} className="menu-icon close" />
                    ) : (
                      <Menu size={24} className="menu-icon open" />
                    )}
                  </span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section - Only on Homepage */}
      <HeroSection isHomePage={isHomePage} />

      {/* Mobile Navigation Drawer */}
      {isTablet && (
        <>
          {/* Backdrop */}
          <div 
            className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Mobile Menu */}
          <nav
            ref={mobileMenuRef}
            id="mobile-navigation"
            className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''} ${isRTL ? 'rtl' : 'ltr'}`}
            aria-label={t('header.mobileNavigation')}
          >
            <ul className="mobile-nav-links">
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  isActive={isActiveRoute(item.path)}
                  onClick={handleNavClick}
                  isMobile={true}
                />
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

export default memo(Header);