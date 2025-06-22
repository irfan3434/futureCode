import React from 'react';
import './Footer.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  Send,
  ChevronRight,
  Clock,
  Globe
} from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const isRTL = i18n.language === 'ar';

  // Quick Links
  const quickLinks = [
    { path: '/', label: 'footer.links.home' },
    { path: '/about', label: 'footer.links.about' },
    { path: '/services', label: 'footer.links.services' },
    { path: '/projects', label: 'footer.links.projects' },
    { path: '/contact', label: 'footer.links.contact' },
  ];

  // Services Links
  const servicesLinks = [
    { path: '/services#exhibitions', label: 'footer.exhibitions' },
    { path: '/services#conferences', label: 'footer.conferences' },
    { path: '/services#events', label: 'footer.events' },
    { path: '/services#consulting', label: 'footer.consulting' },
    { path: '/services#marketing', label: 'footer.marketing' },
  ];

  // Social Media Links
  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com/yourcompany', label: 'Facebook' },
    { icon: Twitter, url: 'https://twitter.com/yourcompany', label: 'Twitter' },
    { icon: Instagram, url: 'https://instagram.com/yourcompany', label: 'Instagram' },
    { icon: Linkedin, url: 'https://linkedin.com/company/yourcompany', label: 'LinkedIn' },
    { icon: Youtube, url: 'https://youtube.com/yourcompany', label: 'YouTube' },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription');
  };

  return (
    <footer className={`footer ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info Section */}
            <div className="footer-section company-info">
              <h3 className="footer-logo">
                <span className="logo-text">{t('footer.companyName')}</span>
              </h3>
              <p className="company-description">
                {t('footer.companyDescription')}
              </p>
              
              {/* Contact Info */}
              <div className="contact-info">
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <a href="tel:+966501234567" className="contact-link">
                    +966 50 123 4567
                  </a>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <a href="mailto:info@futurecode.sa" className="contact-link">
                    info@futurecode.sa
                  </a>
                </div>
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <span className="contact-text">
                    {t('footer.address')}
                  </span>
                </div>
                <div className="contact-item">
                  <Clock className="contact-icon" />
                  <span className="contact-text">
                    {t('footer.workingHours')}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="footer-section">
              <h4 className="footer-title">{t('footer.quickLinks')}</h4>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.path} className="footer-link-item">
                    <ChevronRight className="link-icon" />
                    <Link to={link.path} className="footer-link">
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Section */}
            <div className="footer-section">
              <h4 className="footer-title">{t('footer.ourServices')}</h4>
              <ul className="footer-links">
                {servicesLinks.map((link) => (
                  <li key={link.path} className="footer-link-item">
                    <ChevronRight className="link-icon" />
                    <Link to={link.path} className="footer-link">
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="footer-section newsletter-section">
              <h4 className="footer-title">{t('footer.newslettertitle')}</h4>
              <p className="newsletter-description">
                {t('footer.description')}
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <div className="newsletter-input-wrapper">
                  <input
                    type="email"
                    placeholder={t('footer.placeholder')}
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="newsletter-button">
                    <Send className="send-icon" />
                  </button>
                </div>
              </form>

              {/* Social Media */}
              <div className="social-section">
                <h5 className="social-title">{t('footer.followUs')}</h5>
                <div className="social-links">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label={social.label}
                      >
                        <Icon className="social-icon" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} {t('footer.copyright')}</p>
            </div>
            
            <div className="footer-bottom-links">
              <Link to="/privacy" className="bottom-link">
                {t('footer.privacy')}
              </Link>
              <span className="separator">•</span>
              <Link to="/terms" className="bottom-link">
                {t('footer.terms')}
              </Link>
              <span className="separator">•</span>
              <Link to="/sitemap" className="bottom-link">
                {t('footer.sitemap')}
              </Link>
            </div>

            {/* Language Switcher */}
            <div className="language-switcher-footer">
              <Globe className="globe-icon" />
              <button
                onClick={() => i18n.changeLanguage(isRTL ? 'en' : 'ar')}
                className="language-button"
              >
                {isRTL ? 'English' : 'العربية'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;