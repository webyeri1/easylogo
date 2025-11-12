
import React from 'react';
import Header from './components/Header';
import LogoGenerator from './components/LogoGenerator';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-900 text-white selection:bg-orange-500 selection:text-white">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <LogoGenerator />
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>{t('footerText')}</p>
      </footer>
    </div>
  );
}

export default App;