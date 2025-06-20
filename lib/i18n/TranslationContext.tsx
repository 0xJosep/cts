'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';

type Locale = 'en' | 'es' | 'fr';
type Translations = typeof en;

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

  useEffect(() => {
    // Get saved locale from localStorage or use browser language
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    const browserLocale = navigator.language.split('-')[0] as Locale;
    
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'es' || savedLocale === 'fr')) {
      setLocale(savedLocale);
    } else if (browserLocale === 'es') {
      setLocale('es');
    } else if (browserLocale === 'fr') {
      setLocale('fr');
    }
    
    // Update html lang attribute
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (key: string): string => {
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
  };

  const changeLocale = (newLocale: Locale) => {
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
  };

  return (
    <TranslationContext.Provider value={{ 
      t, 
      locale, 
      setLocale: changeLocale,
      translations
    }}>
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