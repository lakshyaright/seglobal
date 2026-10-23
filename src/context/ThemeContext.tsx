import React, { createContext, useContext, useState, useEffect } from 'react';
import { StoreDesignSettings, StoreTemplateId, StoreTemplateConfig } from '../types/theme.ts';
import { DEFAULT_DESIGN_SETTINGS, STORE_TEMPLATES } from '../data/storeTemplates.ts';

const THEME_STORAGE_KEY = 'se_store_design_settings';
const VISITOR_PREF_KEY = 'se_visitor_theme_pref';

interface ThemeContextType {
  designSettings: StoreDesignSettings;
  updateDesignSettings: (updates: Partial<StoreDesignSettings>) => void;
  resetDesignSettings: () => void;
  effectiveTemplate: StoreTemplateConfig;
  visitorTemplateId: StoreTemplateId | null;
  setVisitorTemplateId: (id: StoreTemplateId | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [designSettings, setDesignSettings] = useState<StoreDesignSettings>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_DESIGN_SETTINGS,
          ...parsed,
        };
      }
    } catch (e) {
      console.error('Error loading theme settings:', e);
    }
    return DEFAULT_DESIGN_SETTINGS;
  });

  const [visitorTemplateId, setVisitorTemplateIdState] = useState<StoreTemplateId | null>(() => {
    try {
      const stored = localStorage.getItem(VISITOR_PREF_KEY);
      if (stored && STORE_TEMPLATES[stored]) {
        return stored as StoreTemplateId;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const updateDesignSettings = (updates: Partial<StoreDesignSettings>) => {
    setDesignSettings((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const resetDesignSettings = () => {
    setDesignSettings(DEFAULT_DESIGN_SETTINGS);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(DEFAULT_DESIGN_SETTINGS));
      localStorage.removeItem(VISITOR_PREF_KEY);
    } catch (e) {
      console.error(e);
    }
    setVisitorTemplateIdState(null);
  };

  const setVisitorTemplateId = (id: StoreTemplateId | null) => {
    setVisitorTemplateIdState(id);
    try {
      if (id) {
        localStorage.setItem(VISITOR_PREF_KEY, id);
      } else {
        localStorage.removeItem(VISITOR_PREF_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Listen to cross-tab updates
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setDesignSettings(parsed);
        } catch (err) {
          console.error(err);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Determine effective template: visitor preference takes priority if allowed, otherwise admin choice
  const activeTemplateId =
    designSettings.allowVisitorThemeToggle && visitorTemplateId
      ? visitorTemplateId
      : designSettings.templateId;

  const effectiveTemplate = STORE_TEMPLATES[activeTemplateId] || STORE_TEMPLATES['warm-boutique'];

  return (
    <ThemeContext.Provider
      value={{
        designSettings,
        updateDesignSettings,
        resetDesignSettings,
        effectiveTemplate,
        visitorTemplateId,
        setVisitorTemplateId,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useStoreTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useStoreTheme must be used within a ThemeProvider');
  }
  return context;
};
