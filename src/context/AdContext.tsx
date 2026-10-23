import React, { createContext, useContext, useState, useEffect } from 'react';
import { StoreAd } from '../types/ad.ts';
import { DEFAULT_ADS } from '../data/defaultAds.ts';

const ADS_STORAGE_KEY = 'se_store_ads';

interface AdContextType {
  ads: StoreAd[];
  activeAds: StoreAd[];
  topStripAds: StoreAd[];
  middleAds: StoreAd[];
  addAd: (ad: Omit<StoreAd, 'id' | 'clicks' | 'createdAt'>) => void;
  updateAd: (id: string, updates: Partial<StoreAd>) => void;
  toggleAd: (id: string) => void;
  deleteAd: (id: string) => void;
  trackAdClick: (id: string) => void;
  resetAds: () => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export const AdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ads, setAds] = useState<StoreAd[]>(() => {
    try {
      const stored = localStorage.getItem(ADS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ADS;
  });

  const saveAds = (newAds: StoreAd[]) => {
    setAds(newAds);
    try {
      localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(newAds));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === ADS_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setAds(parsed);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addAd = (newAdData: Omit<StoreAd, 'id' | 'clicks' | 'createdAt'>) => {
    const newAd: StoreAd = {
      ...newAdData,
      id: 'ad-' + Date.now(),
      clicks: 0,
      createdAt: new Date().toISOString(),
    };
    saveAds([newAd, ...ads]);
  };

  const updateAd = (id: string, updates: Partial<StoreAd>) => {
    saveAds(ads.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  const toggleAd = (id: string) => {
    saveAds(ads.map((a) => (a.id === id ? { ...a, ...isActive(a.isActive) } : a)));
  };

  const isActive = (current: boolean) => ({ isActive: !current });

  const deleteAd = (id: string) => {
    saveAds(ads.filter((a) => a.id !== id));
  };

  const trackAdClick = (id: string) => {
    saveAds(ads.map((a) => (a.id === id ? { ...a, clicks: (a.clicks || 0) + 1 } : a)));
  };

  const resetAds = () => {
    saveAds([...DEFAULT_ADS]);
  };

  const activeAds = ads.filter((a) => a.isActive);
  const topStripAds = activeAds.filter((a) => a.position === 'top-strip');
  const middleAds = activeAds.filter((a) => a.position === 'middle-catalog');

  return (
    <AdContext.Provider
      value={{
        ads,
        activeAds,
        topStripAds,
        middleAds,
        addAd,
        updateAd,
        toggleAd,
        deleteAd,
        trackAdClick,
        resetAds,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};

export const useStoreAds = () => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useStoreAds must be used within an AdProvider');
  }
  return context;
};
