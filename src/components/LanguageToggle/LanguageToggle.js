import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import './LanguageToggle.css';

const LANGUAGES = [
  { code: 'en', name: 'Eng', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' }
];

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === 'ar';

  // Update document attributes
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Add class for CSS hooks
    if (isRTL) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [currentLanguage, isRTL]);

  const toggleLanguage = useCallback(() => {
    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
    
    // Store preference
    localStorage.setItem('preferredLanguage', newLanguage);
  }, [currentLanguage, i18n]);

  // Keyboard accessibility
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleLanguage();
    }
  }, [toggleLanguage]);

 // const currentLang = LANGUAGES.find(lang => lang.code === currentLanguage);
  const nextLang = LANGUAGES.find(lang => lang.code !== currentLanguage);

  return (
    <button
      onClick={toggleLanguage}
      onKeyDown={handleKeyDown}
      className={`language-toggle ${isRTL ? 'rtl' : 'ltr'}`}
      aria-label={t('header.changeLanguage', { language: nextLang.name })}
      aria-live="polite"
      aria-atomic="true"
    >
      <Globe size={16} className="language-icon" aria-hidden="true" />
      <span className="language-text">
        {nextLang.name.toUpperCase()}
      </span>
      <span className="language-tooltip">
        {nextLang.name}
      </span>
    </button>
  );
};
 
export default memo(LanguageToggle);