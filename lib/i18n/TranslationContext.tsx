'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';

type Locale = 'en' | 'es' | 'fr';
type Translations = Record<string, any>;

interface TranslationContextType {
  t: (key: string) => string;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translations: Record<Locale, Translations>;
}

const translations = {
  en,
  es,
  fr
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize locale only once
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    const browserLocale = navigator.language.split('-')[0] as Locale;
    
    let initialLocale: Locale = 'en';
    
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'es' || savedLocale === 'fr')) {
      initialLocale = savedLocale;
    } else if (browserLocale === 'es') {
      initialLocale = 'es';
    } else if (browserLocale === 'fr') {
      initialLocale = 'fr';
    }
    
    setLocale(initialLocale);
    setIsInitialized(true);
    document.documentElement.lang = initialLocale;
  }, []);

  // Update html lang when locale changes
  useEffect(() => {
    if (isInitialized) {
      document.documentElement.lang = locale;
    }
  }, [locale, isInitialized]);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let current: Record<string, unknown> = translations[locale];
    
    for (const k of keys) {
      if (current[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      current = current[k] as Record<string, unknown>;
    }
    
    return current as unknown as string;
  }, [locale]);

  const changeLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
  }, []);

  const contextValue = useMemo(() => ({
    t,
    locale,
    setLocale: changeLocale,
    translations
  }), [t, locale, changeLocale]);

  // Don't render children until locale is properly initialized
  if (!isInitialized) {
    return null;
  }

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  return context;
}; 