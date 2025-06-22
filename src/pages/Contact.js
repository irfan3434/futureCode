import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Building,
  User,
  AtSign,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: false });
    
    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormStatus({ submitting: false, submitted: true, error: false });
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
        setFormStatus({ submitting: false, submitted: false, error: false });
      }, 3000);
    } catch (error) {
      setFormStatus({ submitting: false, submitted: false, error: true });
    }
  };

  return (
    <div className={`contact-page-container ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="contact-hero-section">
        <div className="contact-hero-background">
          <div className="contact-hero-overlay" />
        </div>
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">{t('contactdetail.heroTitle')}</h1>
          <p className="contact-hero-subtitle">
            {t('contactdetail.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main-section">
        <div className="contact-content-wrapper">
          <div className="contact-grid-container">
            
            {/* Contact Information */}
            <div className="contact-info-column">
              <div className="contact-info-card">
                <h2 className="contact-info-title">
                  {t('contactdetail.contactInfo')}
                </h2>
                <p className="contact-info-description">
                  {t('contactdetail.infoDescription')}
                </p>

                {/* Phone */}
                <div className="contact-info-item">
                  <div className="contact-info-icon-wrapper">
                    <Phone className="contact-info-icon" />
                  </div>
                  <div className="contact-info-details">
                    <h3 className="contact-info-label">{t('contactdetail.phone')}</h3>
                    <a href="tel:+966501234567" className="contact-info-link">
                      +966 50 123 4567
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-info-item">
                  <div className="contact-info-icon-wrapper">
                    <Mail className="contact-info-icon" />
                  </div>
                  <div className="contact-info-details">
                    <h3 className="contact-info-label">{t('contactdetail.email')}</h3>
                    <a href="mailto:info@futurecode.sa" className="contact-info-link">
                      info@futurecode.sa
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="contact-info-item">
                  <div className="contact-info-icon-wrapper">
                    <MapPin className="contact-info-icon" />
                  </div>
                  <div className="contact-info-details">
                    <h3 className="contact-info-label">{t('contactdetail.address')}</h3>
                    <p className="contact-info-text">
                      {t('contactdetail.realaddress')}
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="contact-info-item">
                  <div className="contact-info-icon-wrapper">
                    <Clock className="contact-info-icon" />
                  </div>
                  <div className="contact-info-details">
                    <h3 className="contact-info-label">{t('contactdetail.businessHours')}</h3>
                    <p className="contact-info-text">
                      {t('contactdetail.workDays')}<br />
                      {t('contactdetail.workTime')}<br />
                    </p>
                  </div>
                </div>

                {/* Social Links (Optional) */}
            
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-column">
              <div className="contact-form-card">
                <h2 className="contact-form-title">
                  {t('contactdetail.sendMessage')}
                </h2>
                <p className="contact-form-description">
                  {t('contactdetail.formDescription')}
                </p>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-grid">
                    {/* Name Field */}
                    <div className="contact-form-group">
                      <label htmlFor="contact-name" className="contact-form-label">
                        <User className="contact-form-label-icon" />
                        {t('contactdetail.form.name')} *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="contact-form-input"
                        required
                        placeholder={t('contactdetail.form.namePlaceholder')}
                      />
                    </div>

                    {/* Email Field */}
                    <div className="contact-form-group">
                      <label htmlFor="contact-email" className="contact-form-label">
                        <AtSign className="contact-form-label-icon" />
                        {t('contactdetail.form.email')} *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="contact-form-input"
                        required
                        placeholder={t('contactdetail.form.emailPlaceholder')}
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="contact-form-group">
                      <label htmlFor="contact-phone" className="contact-form-label">
                        <Phone className="contact-form-label-icon" />
                        {t('contactdetail.form.phone')}
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="contact-form-input"
                        placeholder={t('contactdetail.form.phonePlaceholder')}
                      />
                    </div>

                    {/* Company Field */}
                    <div className="contact-form-group">
                      <label htmlFor="contact-company" className="contact-form-label">
                        <Building className="contact-form-label-icon" />
                        {t('contactdetail.form.company')}
                      </label>
                      <input
                        type="text"
                        id="contact-company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="contact-form-input"
                        placeholder={t('contactdetail.form.companyPlaceholder')}
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="contact-form-group contact-form-group-full">
                    <label htmlFor="contact-subject" className="contact-form-label">
                      <FileText className="contact-form-label-icon" />
                      {t('contactdetail.form.subject')} *
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="contact-form-input"
                      required
                      placeholder={t('contactdetail.form.subjectPlaceholder')}
                    />
                  </div>

                  {/* Message Field */}
                  <div className="contact-form-group contact-form-group-full">
                    <label htmlFor="contact-message" className="contact-form-label">
                      <MessageSquare className="contact-form-label-icon" />
                      {t('contactdetail.form.message')} *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="contact-form-textarea"
                      rows="6"
                      required
                      placeholder={t('contactdetail.form.messagePlaceholder')}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="contact-form-actions">
                    <button 
                      type="submit" 
                      className="contact-submit-button"
                      disabled={formStatus.submitting}
                    >
                      {formStatus.submitting ? (
                        <>
                          <span className="contact-button-spinner" />
                          {t('contactdetail.form.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="contact-button-icon" />
                          {t('contactdetail.form.send')}
                        </>
                      )}
                    </button>
                  </div>

                  {/* Form Status Messages */}
                  {formStatus.submitted && (
                    <div className="contact-form-alert contact-form-alert-success">
                      <CheckCircle className="contact-alert-icon" />
                      <p>{t('contactdetail.form.success')}</p>
                    </div>
                  )}

                  {formStatus.error && (
                    <div className="contact-form-alert contact-form-alert-error">
                      <AlertCircle className="contact-alert-icon" />
                      <p>{t('contactdetail.form.error')}</p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="contact-map-section">
            <div className="contact-map-container">
              <iframe
                className="contact-map-iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d439.93766960997107!2d46.61902495708234!3d24.773851796379365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee3ba5a4cfc4d%3A0x9f5828118338cd54!2z2YXYr9mGINin2YTZhdiz2KrZgtio2YQg2YTZhNin2LPYqti02KfYsdin2Kog2KfZhNmH2YbYr9iz2YrYqQ!5e0!3m2!1sen!2ssa!4v1750159108125!5m2!1sen!2ssa"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FutureCode Location"
              />
              <div className="contact-map-overlay">
                <div className="contact-map-info">
                  <h3>{t('contactdetail.visitUs')}</h3>
                  <p>{t('contactdetail.realaddress')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;