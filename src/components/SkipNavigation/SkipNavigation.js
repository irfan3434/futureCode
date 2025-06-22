import React from 'react';
import { useTranslation } from 'react-i18next';
import './SkipNavigation.css';

const SkipNavigation = () => {
  const { t } = useTranslation();

  const skipToContent = (e) => {
    e.preventDefault();
    const main = document.getElementById('main-content');
    if (main) {
      main.focus();
      main.scrollIntoView();
    }
  };

  return (
    <a
      href="#main-content"
      className="skip-navigation"
      onClick={skipToContent}
    >
      {t('accessibility.skipToContent', 'Skip to main content')}
    </a>
  );
};

export default SkipNavigation;