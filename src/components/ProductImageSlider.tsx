import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageSliderProps {
  images: string[];
  title: string;
  className?: string;
  showThumbnails?: boolean;
  size?: 'compact' | 'standard' | 'large';
  onClickMain?: () => void;
}

export const ProductImageSlider: React.FC<ProductImageSliderProps> = ({
  images,
  title,
  className = '',
  showThumbnails = false,
  size = 'standard',
  onClickMain,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback if images array is empty
  const safeImages = images && images.length > 0 ? images : ['📦'];
  const hasMultiple = safeImages.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const currentImage = safeImages[currentIndex] || safeImages[0];
  const isUrl = currentImage && (currentImage.startsWith('http://') || currentImage.startsWith('https://') || currentImage.startsWith('data:'));

  const heightClasses =
    size === 'compact'
      ? 'h-36 sm:h-40'
      : size === 'large'
      ? 'h-72 sm:h-80'
      : 'h-48 sm:h-52';

  const emojiTextSize =
    size === 'compact'
      ? 'text-5xl'
      : size === 'large'
      ? 'text-8xl'
      : 'text-6xl';

  return (
    <div className={`flex flex-col select-none ${className}`}>
      {/* Main Image Viewport with Slide Controls */}
      <div
        onClick={onClickMain}
        className={`w-full ${heightClasses} bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden relative group/slider transition-all cursor-pointer`}
      >
        {/* Current Image / Emoji */}
        {isUrl ? (
          <img
            src={currentImage}
            alt={`${title} - view ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover/slider:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ) : (
          <div className={`${emojiTextSize} select-none transition-transform duration-300 group-hover/slider:scale-110`}>
            {currentImage}
          </div>
        )}

        {/* Previous Arrow Button */}
        {hasMultiple && (
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white shadow-md flex items-center justify-center opacity-0 group-hover/slider:opacity-100 hover:scale-110 transition-all z-10 cursor-pointer"
            title="Previous photo"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Next Arrow Button */}
        {hasMultiple && (
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white shadow-md flex items-center justify-center opacity-0 group-hover/slider:opacity-100 hover:scale-110 transition-all z-10 cursor-pointer"
            title="Next photo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Pagination Dots */}
        {hasMultiple && (
          <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5 z-10 pointer-events-auto">
            {safeImages.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => handleDotClick(idx, e)}
                className={`transition-all rounded-full ${
                  currentIndex === idx
                    ? 'w-4 h-1.5 bg-white shadow-sm'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
                title={`Photo ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Slide Counter Badge */}
        {hasMultiple && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur text-white text-[10px] font-mono font-medium shadow-sm z-10">
            {currentIndex + 1} / {safeImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Bar (for Quick View Modal or Detailed views) */}
      {showThumbnails && hasMultiple && (
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {safeImages.map((img, idx) => {
            const thumbUrl = img && (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:'));
            return (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-14 h-14 rounded-xl border flex items-center justify-center overflow-hidden shrink-0 transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'border-blue-500 ring-2 ring-blue-500/30 scale-105'
                    : 'border-black/10 dark:border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                {thumbUrl ? (
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl select-none">{img}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
