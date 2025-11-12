import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';

import en from '../translations/en.js';
import tr from '../translations/tr.js';
import fr from '../translations/fr.js';
import de from '../translations/de.js';
import ja from '../translations/ja.js';
import ko from '../translations/ko.js';
import ru from '../translations/ru.js';
import es from '../translations/es.js';
import it from '../translations/it.js';
import pl from '../translations/pl.js';
import pt from '../translations/pt.js';
import ar from '../translations/ar.js';


export const supportedLanguages = ['en', 'tr', 'fr', 'de', 'ja', 'ko', 'ru', 'es', 'it', 'pl', 'pt', 'ar'] as const;
export type Language = typeof supportedLanguages[number];

type Translations = Record<string, string>;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = { en, tr, fr, de, ja, ko, ru, es, it, pl, pt, ar };

const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
        const browserLang = navigator.language.split('-')[0];
        if (supportedLanguages.includes(browserLang as Language)) {
            return browserLang as Language;
        }
    }
    return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language]);
  
  const setLanguage = (lang: Language) => {
    if (supportedLanguages.includes(lang)) {
        setLanguageState(lang);
    }
  };

  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    let translation = translations[language]?.[key] || translations['en']?.[key] || key;
    
    if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
            translation = translation.replace(`{${placeholder}}`, String(replacements[placeholder]));
        });
    }

    return translation;
  }, [language]);


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};