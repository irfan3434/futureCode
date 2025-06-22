import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  CheckCircle, 
  Award,
  ChevronRight,
  Phone,
  Mail
} from 'lucide-react';
import './ServiceDetailPage.css';

// Import service icons
import { Calendar, Palette, Volume2, Users, Megaphone } from 'lucide-react';

// Service data configuration
const SERVICES_DATA = {
  'strategic-planning': {
    id: 1,
    icon: Calendar,
    color: '#f1b8ff',
    bgGradient: 'linear-gradient(135deg, #f1b8ff 0%, #e8a7ff 100%)',
    slug: 'strategic-planning',
    titleKey: 'serviceDetail.planning.title',
    subtitleKey: 'serviceDetail.planning.subtitle',
    descriptionKey: 'serviceDetail.planning.description',
    backgroundImage: '/assets/10.webp',
    features: [
      'serviceDetail.planning.features.feature1',
      'serviceDetail.planning.features.feature2',
      'serviceDetail.planning.features.feature3',
      'serviceDetail.planning.features.feature4',
      'serviceDetail.planning.features.feature5',
      'serviceDetail.planning.features.feature6'
    ],
    process: [
      'serviceDetail.planning.process.step1',
      'serviceDetail.planning.process.step2',
      'serviceDetail.planning.process.step3',
      'serviceDetail.planning.process.step4'
    ],
    benefits: [
      'serviceDetail.planning.benefits.benefit1',
      'serviceDetail.planning.benefits.benefit2',
      'serviceDetail.planning.benefits.benefit3',
      'serviceDetail.planning.benefits.benefit4'
    ]
  },
  'event-design': {
    id: 2,
    icon: Palette,
    color: '#b8d4ff',
    bgGradient: 'linear-gradient(135deg, #b8d4ff 0%, #8bb8ff 100%)',
    slug: 'event-design',
    titleKey: 'serviceDetail.design.title',
    subtitleKey: 'serviceDetail.design.subtitle',
    descriptionKey: 'serviceDetail.design.description',
    backgroundImage: '/assets/11.webp',
    features: [
      'serviceDetail.design.features.feature1',
      'serviceDetail.design.features.feature2',
      'serviceDetail.design.features.feature3',
      'serviceDetail.design.features.feature4',
      'serviceDetail.design.features.feature5',
      'serviceDetail.design.features.feature6'
    ],
    process: [
      'serviceDetail.design.process.step1',
      'serviceDetail.design.process.step2',
      'serviceDetail.design.process.step3',
      'serviceDetail.design.process.step4'
    ],
    benefits: [
      'serviceDetail.design.benefits.benefit1',
      'serviceDetail.design.benefits.benefit2',
      'serviceDetail.design.benefits.benefit3',
      'serviceDetail.design.benefits.benefit4'
    ]
  },
  'audio-visual': {
    id: 3,
    icon: Volume2,
    color: '#b8ffb8',
    bgGradient: 'linear-gradient(135deg, #b8ffb8 0%, #8bff8b 100%)',
    slug: 'audio-visual',
    titleKey: 'serviceDetail.audioVisual.title',
    subtitleKey: 'serviceDetail.audioVisual.subtitle',
    descriptionKey: 'serviceDetail.audioVisual.description',
    backgroundImage: '/assets/12.webp',
    features: [
      'serviceDetail.audioVisual.features.feature1',
      'serviceDetail.audioVisual.features.feature2',
      'serviceDetail.audioVisual.features.feature3',
      'serviceDetail.audioVisual.features.feature4',
      'serviceDetail.audioVisual.features.feature5',
      'serviceDetail.audioVisual.features.feature6'
    ],
    process: [
      'serviceDetail.audioVisual.process.step1',
      'serviceDetail.audioVisual.process.step2',
      'serviceDetail.audioVisual.process.step3',
      'serviceDetail.audioVisual.process.step4'
    ],
    benefits: [
      'serviceDetail.audioVisual.benefits.benefit1',
      'serviceDetail.audioVisual.benefits.benefit2',
      'serviceDetail.audioVisual.benefits.benefit3',
      'serviceDetail.audioVisual.benefits.benefit4'
    ]
  },
  'event-management': {
    id: 4,
    icon: Users,
    color: '#ffb8b8',
    bgGradient: 'linear-gradient(135deg, #ffb8b8 0%, #ff8b8b 100%)',
    slug: 'event-management',
    titleKey: 'serviceDetail.eventManagement.title',
    subtitleKey: 'serviceDetail.eventManagement.subtitle',
    descriptionKey: 'serviceDetail.eventManagement.description',
    backgroundImage: '/assets/14.webp',
    features: [
      'serviceDetail.eventManagement.features.feature1',
      'serviceDetail.eventManagement.features.feature2',
      'serviceDetail.eventManagement.features.feature3',
      'serviceDetail.eventManagement.features.feature4',
      'serviceDetail.eventManagement.features.feature5',
      'serviceDetail.eventManagement.features.feature6'
    ],
    process: [
      'serviceDetail.eventManagement.process.step1',
      'serviceDetail.eventManagement.process.step2',
      'serviceDetail.eventManagement.process.step3',
      'serviceDetail.eventManagement.process.step4'
    ],
    benefits: [
      'serviceDetail.eventManagement.benefits.benefit1',
      'serviceDetail.eventManagement.benefits.benefit2',
      'serviceDetail.eventManagement.benefits.benefit3',
      'serviceDetail.eventManagement.benefits.benefit4'
    ]
  },
  'marketing-strategies': {
    id: 5,
    icon: Megaphone,
    color: '#ffe4b8',
    bgGradient: 'linear-gradient(135deg, #ffe4b8 0%, #ffd08b 100%)',
    slug: 'marketing-strategies',
    titleKey: 'serviceDetail.marketing.title',
    subtitleKey: 'serviceDetail.marketing.subtitle',
    descriptionKey: 'serviceDetail.marketing.description',
    backgroundImage: '/assets/13.webp',
    features: [
      'serviceDetail.marketing.features.feature1',
      'serviceDetail.marketing.features.feature2',
      'serviceDetail.marketing.features.feature3',
      'serviceDetail.marketing.features.feature4',
      'serviceDetail.marketing.features.feature5',
      'serviceDetail.marketing.features.feature6'
    ],
    process: [
      'serviceDetail.marketing.process.step1',
      'serviceDetail.marketing.process.step2',
      'serviceDetail.marketing.process.step3',
      'serviceDetail.marketing.process.step4'
    ],
    benefits: [
      'serviceDetail.marketing.benefits.benefit1',
      'serviceDetail.marketing.benefits.benefit2',
      'serviceDetail.marketing.benefits.benefit3',
      'serviceDetail.marketing.benefits.benefit4'
    ]
  }
};

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  // Get service data based on slug
  const service = SERVICES_DATA[serviceSlug];
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug]);
  
  // If service not found, redirect to homepage
  if (!service) {
    return <Navigate to="/" replace />; 
  }
  
  const Icon = service.icon;
  
  return (
    <div className={`service-detail-page ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section 
        className="service-hero"
        style={{ '--service-gradient': service.bgGradient,
                 '--service-bg-image': `url(${service.backgroundImage})` 
         }}
      >
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft className="back-icon" />
            <span className='backtoHome'>{t('serviceDetail.backToHome')}</span>
          </Link>
          
          <div className="hero-content">
            <div className="hero-icon-wrapper">
              <Icon className="hero-icon" />
            </div>
            <h1 className="service-hero-title">{t(service.titleKey)}</h1>
            <p className="service-hero-subtitle">{t(service.subtitleKey)}</p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="service-content">
        <div className="container">
          <div className="content-grid">
            {/* Left Column - Main Content */}
            <div className="main-content">
              {/* Description */}
              <div className="content-section">
                <h2 className="detail-section-title">{t('serviceDetail.overview')}</h2>
                <p className="detail-section-description">{t(service.descriptionKey)}</p>
              </div>
              
              {/* Features */}
              <div className="content-section">
                <h2 className="detail-section-title">{t('serviceDetail.keyFeatures')}</h2>
                <div className="detail-features-grid">
                  {service.features.map((feature, index) => (
                    <div key={index} className="detail-feature-card">
                      <CheckCircle className="detail-feature-check" />
                      <p>{t(feature)}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Process */}
              <div className="content-section">
                <h2 className="detail-section-title">{t('serviceDetail.ourProcess')}</h2>
                <div className="process-timeline">
                  {service.process.map((step, index) => (
                    <div key={index} className="process-step">
                      <div className="step-number">{index + 1}</div>
                      <div className="step-content">
                        <h3>{t(`serviceDetail.processStep${index + 1}`)}</h3>
                        <p>{t(step)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="sidebar">
              {/* Benefits Card */}
              <div className="sidebar-card benefits-card">
                <h3 className="card-title">
                  <Award className="card-icon" />
                  {t('serviceDetail.benefits')}
                </h3>
                <ul className="benefits-list">
                  {service.benefits.map((benefit, index) => (
                    <li key={index}>
                      <ChevronRight className="list-icon" />
                      <span>{t(benefit)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA Card */}
              <div className="sidebar-card cta-card">
                <h3 className="card-title">{t('serviceDetail.getStarted')}</h3>
                <p className="card-description">{t('serviceDetail.ctaDescription')}</p>
                <Link to="/contact" className="detail-cta-button">
                  <span>{t('serviceDetail.contactUs')}</span>
                  <ArrowLeft className="detail-button-icon" />
                </Link>
                
                <div className="quick-contact">
                  <a href="tel:+966501234567" className="contact-item">
                    <Phone className="contact-icon" />
                    <span>+966 50 123 4567</span>
                  </a>
                  <a href="mailto:info@futurecode.sa" className="contact-item">
                    <Mail className="contact-icon" />
                    <span>info@futurecode.sa</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Services */}
      <section className="related-services">
        <div className="container">
          <h2 className="detail-section-title">{t('serviceDetail.relatedServices')}</h2>
          <div className="detail-services-grid">
            {Object.values(SERVICES_DATA)
              .filter(s => s.id !== service.id)
              .slice(0, 3)
              .map((relatedService) => {
                const RelatedIcon = relatedService.icon;
                return (
                  <Link 
                    key={relatedService.id}
                    to={`/services/${relatedService.slug}`}
                    className="related-service-card"
                    style={{ '--card-color': relatedService.color }}
                  >
                    <div className="detail-card-icon-wrapper">
                      <RelatedIcon className="detail-card-icon" />
                    </div>
                    <h3>{t(relatedService.titleKey)}</h3>
                    <ChevronRight className="detail-arrow-icon" />
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;