
import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface GeneratedImageProps {
  src: string;
  alt: string;
  prompt: string;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );

const GeneratedImage: React.FC<GeneratedImageProps> = ({ src, alt, prompt }) => {
    const { t } = useLanguage();
    const downloadFilename = prompt.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 50) + '.png';

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg bg-gray-800 border border-gray-700 shadow-lg transition-all duration-300 hover:shadow-orange-500/30 hover:scale-105">
      <img src={src} alt={alt} className="w-full h-full object-contain" />
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a
          href={src}
          download={downloadFilename}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500"
        >
          <DownloadIcon />
          {t('downloadButton')}
        </a>
      </div>
    </div>
  );
};

export default GeneratedImage;