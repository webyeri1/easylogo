
import React, { useState } from 'react';
import { generateLogo } from '../services/geminiService';
import GeneratedImage from './GeneratedImage';
import LoadingSpinner from './LoadingSpinner';
import { SparklesIcon } from './icons/SparklesIcon';
import { useLanguage } from '../hooks/useLanguage';

const LogoGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateLogo(prompt);
      setGeneratedImages(images);
    } catch (err) {
      setError(t('errorMessage'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const examplePrompts = [
    t('example1'),
    t('example2'),
    t('example3'),
    t('example4')
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-400 mb-4">
          {t('heroTitle')}
        </h2>
        <p className="text-lg text-gray-400">
          {t('heroSubtitle')}
        </p>
      </div>

      <div className="w-full max-w-2xl bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-2xl shadow-orange-900/20">
        <form onSubmit={handleGenerate}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t('promptPlaceholder')}
              className="flex-grow bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-all duration-300"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? t('generatingButton') : t('generateButton')}
              {!isLoading && <SparklesIcon />}
            </button>
          </div>
        </form>
         <div className="mt-4 text-sm text-gray-400">
          <span className="font-semibold">{t('tryExample')}</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {examplePrompts.map((p, i) => (
              <button 
                key={i}
                onClick={() => setPrompt(p)}
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded-md text-xs transition-colors"
                disabled={isLoading}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-full mt-12">
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-center">
            <LoadingSpinner />
            <p className="mt-4 text-gray-400">{t('loadingMessage')}</p>
          </div>
        )}
        {error && <p className="text-center text-red-400">{error}</p>}
        {!isLoading && generatedImages.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-center mb-8">{t('resultsTitle')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {generatedImages.map((imgSrc, index) => (
                <GeneratedImage key={index} src={imgSrc} alt={t('altLogoText', { number: index + 1 })} prompt={prompt} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LogoGenerator;