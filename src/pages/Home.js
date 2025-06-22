import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Palette, 
  Volume2, 
  Users, 
  Megaphone,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import './Home.css';

// Service cards configuration
const SERVICES = [
  {
    id: 1,
    icon: Calendar,
    color: '#f1b8ff',
    slug: 'strategic-planning',
    titleKey: 'services.planning.title',
    descriptionKey: 'services.planning.description',
    features: [
      'services.planning.feature1',
      'services.planning.feature2',
      'services.planning.feature3'
    ]
  },
  {
    id: 2,
    icon: Palette,
    color: '#b8d4ff',
    slug: 'event-design',
    titleKey: 'services.design.title',
    descriptionKey: 'services.design.description',
    features: [
      'services.design.feature1',
      'services.design.feature2',
      'services.design.feature3'
    ]
  },
  {
    id: 3,
    icon: Volume2,
    color: '#b8ffb8',
    slug: 'audio-visual',
    titleKey: 'services.audioVisual.title',
    descriptionKey: 'services.audioVisual.description',
    features: [
      'services.audioVisual.feature1',
      'services.audioVisual.feature2',
      'services.audioVisual.feature3'
    ]
  },
  {
    id: 4,
    icon: Users,
    color: '#ffb8b8',
    slug: 'event-management',
    titleKey: 'services.eventManagement.title',
    descriptionKey: 'services.eventManagement.description',
    features: [
      'services.eventManagement.feature1',
      'services.eventManagement.feature2',
      'services.eventManagement.feature3'
    ]
  },
  {
    id: 5,
    icon: Megaphone,
    color: '#ffe4b8',
    slug: 'marketing-strategies',
    titleKey: 'services.marketing.title',
    descriptionKey: 'services.marketing.description',
    features: [
      'services.marketing.feature1',
      'services.marketing.feature2',
      'services.marketing.feature3'
    ]
  }
];

// Service Card Component
const ServiceCard = ({ service, index, isActive, onHover, onMouseLeave }) => {
  const { t } = useTranslation();
  const Icon = service.icon;
  
  // Debug: Check if service has slug
  console.log('Service slug:', service.slug, 'Link path:', `/services/${service.slug}`);
  
  return (
    <div 
      className={`service-card ${isActive ? 'active' : ''}`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onMouseLeave}
      style={{ '--service-color': service.color }}
    >
      <div className="service-icon-wrapper">
        <Icon className="service-icon" />
      </div>
      <h3 className="service-title">{t(service.titleKey)}</h3>
      <p className="service-description">{t(service.descriptionKey)}</p>
      
      <div className={`service-features ${isActive ? 'show' : ''}`}>
        {service.features.map((feature, idx) => (
          <div key={idx} className="feature-item">
            <CheckCircle className="feature-icon" />
            <span>{t(feature)}</span>
          </div>
        ))}
      </div>
      
      <Link to={`/services/${service.slug}`} className="service-link">
        <span>{t('services.learnMore')}</span>
        <ArrowRight className="link-arrow" />
      </Link>
    </div>
  );
};

// Stats Section Component
const StatsSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const stats = [
    { value: 15, suffix: '+', labelKey: 'stats.events' },
    { value: 8, suffix: '+', labelKey: 'stats.clients' },
    { value: 6, suffix: '', labelKey: 'stats.years' },
    { value: 99, suffix: '%', labelKey: 'stats.satisfaction' }
  ];
  
  return (
    <div ref={statsRef} className="stats-section">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-item ${isVisible ? 'animate' : ''}`}>
          <div className="stat-value">
            <CountUp end={stat.value} suffix={stat.suffix} isVisible={isVisible} />
          </div>
          <div className="stat-label">{t(stat.labelKey)}</div>
        </div>
      ))}
    </div>
  );
};

// Animated Counter Component
const CountUp = ({ end, suffix, isVisible }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const increment = end / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [end, isVisible]);
  
  return <>{count}{suffix}</>;
};

// Main Home Component
const Home = () => {
  const { t, i18n } = useTranslation();
  const [activeService, setActiveService] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const isRTL = i18n.language === 'ar';
  
  // Auto-rotate services with pause on hover
  useEffect(() => {
    if (isHovering) return; // Don't rotate when hovering
    
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % SERVICES.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovering]);
  
  const handleServiceHover = (index) => {
    setActiveService(index);
    setIsHovering(true);
  };
  
  const handleServiceLeave = () => {
    setIsHovering(false);
  };
  
  return (
    <div className={`home-page ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('services.label')}</span>
            <h2 className="section-title">{t('services.title')}</h2>
            <p className="section-subtitle">{t('services.subtitle')}</p>
          </div>
          
          <div className="services-grid">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isActive={activeService === index}
                onHover={handleServiceHover}
                onMouseLeave={handleServiceLeave}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="achievements-section">
        <div className="container">
          <StatsSection />
        </div>
      </section>
      
      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <span className="section-label">{t('aboutHomepage.label')}</span>
              <h2 className="section-title">{t('aboutHomepage.title')}</h2>
              <p className="about-description">{t('aboutHomepage.description')}</p>
              <p className="about-commitment">{t('aboutHomepage.commitment')}</p>
              
              <div className="about-features">
                <div className="feature">
                  <CheckCircle className="check-icon" />
                  <span>{t('aboutHomepage.feature1')}</span>
                </div>
                <div className="feature">
                  <CheckCircle className="check-icon" />
                  <span>{t('aboutHomepage.feature2')}</span>
                </div>
                <div className="feature">
                  <CheckCircle className="check-icon" />
                  <span>{t('aboutHomepage.feature3')}</span>
                </div>
              </div>
              
              <Link to="/contact" className="cta-button">
                <span>{t('aboutHomepage.cta')}</span>
                <ArrowRight className="button-arrow" />
              </Link>
            </div>
            
            <div className="about-visual">
              <div className="visual-card">
                <img 
                  src="/assets/7.png" 
                  alt={t('aboutHomepage.imageAlt')}
                  className="about-image"
                />
                <div className="visual-overlay">
                  <div className="overlay-content">
                    <span className="overlay-number">6+</span>
                    <span className="overlay-text">{t('aboutHomepage.yearsExperience')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;