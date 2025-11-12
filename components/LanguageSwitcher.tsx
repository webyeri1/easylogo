
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { supportedLanguages, Language } from '../contexts/LanguageContext';
import { GlobeIcon } from './icons/GlobeIcon';

const languageNames: Record<Language, string> = {
  en: 'English',
  tr: 'Türkçe',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  ko: '한국어',
  ru: 'Русский',
  es: 'Español',
  it: 'Italiano',
  pl: 'Polski',
  pt: 'Português',
  ar: 'العربية',
};

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <GlobeIcon />
        <span className="uppercase text-sm font-medium">{language}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20">
          <ul className="py-1">
            {supportedLanguages.map((lang) => (
              <li key={lang}>
                <button
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full text-start px-4 py-2 text-sm ${
                    language === lang
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {languageNames[lang]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;