import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Target, 
  Eye, 
  Lightbulb, 
  Award, 
  Briefcase,
  Heart,
  Users,
  ChevronRight,
  Quote,
  Building,
  Calendar,
  Globe,
  Sparkles
} from 'lucide-react';
import './AboutUs.css';

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeValue, setActiveValue] = useState(0);

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('about-visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.about-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Auto-rotate core values
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue(prev => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const coreValues = [
    {
      icon: Lightbulb,
      titleKey: 'about.values.innovation.title',
      descriptionKey: 'about.values.innovation.description',
      color: '#f1b8ff',
      gradient: 'linear-gradient(135deg, #f1b8ff 0%, #e8a7ff 100%)'
    },
    {
      icon: Award,
      titleKey: 'about.values.quality.title',
      descriptionKey: 'about.values.quality.description',
      color: '#b8d4ff',
      gradient: 'linear-gradient(135deg, #b8d4ff 0%, #8bb8ff 100%)'
    },
    {
      icon: Briefcase,
      titleKey: 'about.values.professionalism.title',
      descriptionKey: 'about.values.professionalism.description',
      color: '#b8ffb8',
      gradient: 'linear-gradient(135deg, #b8ffb8 0%, #8bff8b 100%)'
    },
    {
      icon: Heart,
      titleKey: 'about.values.dedication.title',
      descriptionKey: 'about.values.dedication.description',
      color: '#ffb8b8',
      gradient: 'linear-gradient(135deg, #ffb8b8 0%, #ff8b8b 100%)'
    },
    {
      icon: Users,
      titleKey: 'about.values.collaboration.title',
      descriptionKey: 'about.values.collaboration.description',
      color: '#ffe4b8',
      gradient: 'linear-gradient(135deg, #ffe4b8 0%, #ffd08b 100%)'
    }
  ];

  const stats = [
    { number: '15+', labelKey: 'about.stats.events', icon: Calendar },
    { number: '8+', labelKey: 'about.stats.clients', icon: Building },
    { number: '6+', labelKey: 'about.stats.years', icon: Globe },
    { number: '99%', labelKey: 'about.stats.satisfaction', icon: Award }
  ];

  return (
    <div className={`about-page-container ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-background">
          <div className="about-hero-pattern" />
          <div className="about-hero-gradient" />
        </div>
        <div className="about-hero-content about-animate">
          <h1 className="about-hero-title">{t('about.heroTitle')}</h1>
          <p className="about-hero-subtitle">{t('about.heroSubtitle')}</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-story-section">
        <div className="about-container">
          <div className="about-story-grid">
            <div className="about-story-content about-animate">
              <div className="about-section-header">
                <span className="about-section-label">{t('about.story.label')}</span>
                <h2 className="about-section-title">{t('about.story.title')}</h2>
              </div>
              <div className="about-story-text">
                <p className="about-story-paragraph">
                  {t('about.story.paragraph1')}
                </p>
                <p className="about-story-paragraph">
                  {t('about.story.paragraph2')}
                </p>
              </div>
              <div className="about-story-quote">
                <Quote className="about-quote-icon" />
                <p className="about-quote-text">{t('about.story.quote')}</p>
              </div>
            </div>
            <div className="about-story-visual about-animate">
              <div className="about-story-image-wrapper">
                <div className="about-story-image-bg" />
                <div className="about-story-stats">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="about-stat-card">
                        <Icon className="about-stat-icon" />
                        <h3 className="about-stat-number">{stat.number}</h3>
                        <p className="about-stat-label">{t(stat.labelKey)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values Section */}
      <section className="about-mvv-section">
        <div className="about-container">
          <div className="about-section-header about-animate">
            <span className="about-section-label">{t('about.mvv.label')}</span>
            <h2 className="about-section-title">{t('about.mvv.title')}</h2>
          </div>
          
          <div className="about-mvv-grid">
            {/* Vision Card */}
            <div className="about-mvv-card about-vision-card about-animate">
              <div className="about-mvv-icon-wrapper">
                <Eye className="about-mvv-icon" />
              </div>
              <h3 className="about-mvv-card-title">{t('about.vision.title')}</h3>
              <p className="about-mvv-card-text">{t('about.vision.description')}</p>
              <div className="about-mvv-card-decoration" />
            </div>

            {/* Mission Card */}
            <div className="about-mvv-card about-mission-card about-animate">
              <div className="about-mvv-icon-wrapper">
                <Target className="about-mvv-icon" />
              </div>
              <h3 className="about-mvv-card-title">{t('about.mission.title')}</h3>
              <p className="about-mvv-card-text">{t('about.mission.description')}</p>
              <div className="about-mvv-card-decoration" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values-section">
        <div className="about-container">
          <div className="about-section-header about-animate">
            <span className="about-section-label">{t('about.values.label')}</span>
            <h2 className="about-section-title">{t('about.values.title')}</h2>
          </div>

          <div className="about-values-showcase">
            {/* Values Carousel */}
            <div className="about-values-carousel about-animate">
              <div className="about-values-display">
                {coreValues.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={index}
                      className={`about-value-showcase ${activeValue === index ? 'active' : ''}`}
                      style={{ '--value-gradient': value.gradient }}
                    >
                      <div className="about-value-showcase-icon">
                        <Icon size={60} />
                      </div>
                      <h3>{t(value.titleKey)}</h3>
                      <p>{t(value.descriptionKey)}</p>
                    </div>
                  );
                })}
              </div>
              
              {/* Value Indicators */}
              <div className="about-value-indicators">
                {coreValues.map((value, index) => (
                  <button
                    key={index}
                    className={`about-value-indicator ${activeValue === index ? 'active' : ''}`}
                    onClick={() => setActiveValue(index)}
                    style={{ '--indicator-color': value.color }}
                    aria-label={t(value.titleKey)}
                  />
                ))}
              </div>
            </div>

            {/* Values Grid */}
            <div className="about-values-grid about-animate">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="about-value-card"
                    style={{ '--value-color': value.color }}
                    onMouseEnter={() => setActiveValue(index)}
                  >
                    <div className="about-value-icon-wrapper">
                      <Icon className="about-value-icon" />
                    </div>
                    <h4 className="about-value-title">{t(value.titleKey)}</h4>
                    <p className="about-value-description">{t(value.descriptionKey)}</p>
                    <div className="about-value-number">0{index + 1}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team-section">
        <div className="about-container">
          <div className="about-section-header about-animate">
            <span className="about-section-label">{t('about.team.label')}</span>
            <h2 className="about-section-title">{t('about.team.title')}</h2>
            <p className="about-section-subtitle">{t('about.team.subtitle')}</p>
          </div>

          <div className="about-team-grid">
            {/* CEO Card */}
            <div className="about-team-card about-team-ceo about-animate">
              <div className="about-team-image-wrapper">
              </div>
              <div className="about-team-content">
                <h3 className="about-team-name">{t('about.team.ceo.name')}</h3>
                <p className="about-team-role">{t('about.team.ceo.role')}</p>
                <p className="about-team-bio">{t('about.team.ceo.bio')}</p>
                <div className="about-team-experience">
                  <Sparkles className="about-experience-icon" />
                  <span>{t('about.team.ceo.experience')}</span>
                </div>
              </div>
            </div>

            {/* Operations Director Card */}
            
          </div>

          {/* Team CTA */}

        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-container">
          <div className="about-cta-content about-animate">
            <h2 className="about-cta-title">{t('about.cta.title')}</h2>
            <p className="about-cta-text">{t('about.cta.text')}</p>
            <div className="about-cta-buttons">
              <a href="/services" className="about-cta-primary">
                <span>{t('about.cta.primaryButton')}</span>
                <ChevronRight className="about-button-icon" />
              </a>
              <a href="/contact" className="about-cta-secondary">
                <span>{t('about.cta.secondaryButton')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;