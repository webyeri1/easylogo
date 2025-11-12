
import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';
import { EasyLogoIcon } from './icons/EasyLogoIcon';

const Header: React.FC = () => {
  const { t } = useLanguage();
  return (
    <header className="bg-gray-900/70 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <EasyLogoIcon className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold tracking-tight text-white">{t('headerTitle')}</h1>
            </div>
            <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;