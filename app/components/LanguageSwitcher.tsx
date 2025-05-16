'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/TranslationContext';

type Locale = 'en' | 'es';

interface LanguageSwitcherProps {
  className?: string;
}

interface LanguageOption {
  locale: Locale;
  label: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { locale: 'en', label: 'EN' },
  { locale: 'es', label: 'ES' },
];

const getLanguageName = (locale: Locale): string => {
  switch (locale) {
    case 'en': return 'English';
    case 'es': return 'Spanish';
    default: return locale;
  }
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { locale, setLocale } = useTranslation();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {LANGUAGE_OPTIONS.map((option) => (
        <button
          key={option.locale}
          onClick={() => setLocale(option.locale)}
          className={`px-2 py-1 rounded-md text-sm ${
            locale === option.locale
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground'
          }`}
          aria-label={`Switch to ${getLanguageName(option.locale)}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;