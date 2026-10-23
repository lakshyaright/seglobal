import React, { useState, useEffect } from 'react';
import { useStoreAds } from '../context/AdContext.tsx';
import { StoreAd } from '../types/ad.ts';
import { Sparkles, ChevronRight, ChevronLeft, ExternalLink, Zap } from 'lucide-react';

interface StoreAdBannerProps {
  position?: 'top-strip' | 'middle-catalog';
}

export const StoreAdBanner: React.FC<StoreAdBannerProps> = ({ position = 'top-strip' }) => {
  const { ads, trackAdClick } = useStoreAds();
  const [currentIndex, setCurrentIndex] = useState(0);

  const relevantAds = ads.filter((a) => a.isActive && (position === 'top-strip' ? a.position === 'top-strip' : a.position === 'middle-catalog'));

  useEffect(() => {
    if (relevantAds.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % relevantAds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [relevantAds.length]);

  if (relevantAds.length === 0) return null;

  const currentAd = relevantAds[currentIndex] || relevantAds[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? relevantAds.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % relevantAds.length);
  };

  const handleAdClick = () => {
    trackAdClick(currentAd.id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mb-6 w-full select-none">
      <div
        className={`bg-gradient-to-r ${currentAd.bgGradient} rounded-2xl md:rounded-3xl p-5 md:p-6 text-white shadow-xl relative overflow-hidden group transition-all duration-500`}
      >
        {/* Subtle Decorative Background Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            {currentAd.image && (
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                {currentAd.image}
              </div>
            )}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur border border-white/30 text-white flex items-center gap-1 shadow-sm">
                  <Zap className="w-3 h-3 fill-current text-amber-300" />
                  <span>{currentAd.badge}</span>
                </span>
                <span className="text-[10px] text-white/60 font-mono">Sponsored Campaign</span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white leading-tight">
                {currentAd.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
                {currentAd.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end shrink-0 pt-2 md:pt-0">
            {/* Multiple Ads Pagination Indicator */}
            {relevantAds.length > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Previous ad"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[10px] text-white/70 font-mono px-1">
                  {currentIndex + 1}/{relevantAds.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Next ad"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Call to Action Button */}
            <a
              href={currentAd.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleAdClick}
              className="py-2.5 px-5 rounded-xl bg-white hover:bg-white/90 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-transform active:scale-95 shadow-lg shrink-0 cursor-pointer"
            >
              <span>{currentAd.ctaText}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-900" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
