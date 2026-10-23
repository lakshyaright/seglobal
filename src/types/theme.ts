export type StoreTemplateId = 'warm-boutique' | 'midnight-cyber' | 'nordic-studio' | 'candy-kawaii';

export type CardLayoutMode = 'grid-standard' | 'grid-compact' | 'list-showcase';

export interface StoreDesignSettings {
  templateId: StoreTemplateId;
  cardLayout: CardLayoutMode;
  announcementText: string;
  showAnnouncement: boolean;
  heroHeadline: string;
  heroSubheadline: string;
  heroBadge: string;
  allowVisitorThemeToggle: boolean;
}

export interface StoreTemplateConfig {
  id: StoreTemplateId;
  name: string;
  tagline: string;
  description: string;
  previewBg: string;
  previewAccent: string;
  classes: {
    pageBg: string;
    textColor: string;
    mutedText: string;
    cardBg: string;
    cardBorder: string;
    headerBg: string;
    announcementBg: string;
    announcementText: string;
    badgeBg: string;
    badgeText: string;
    accentPillActive: string;
    accentPillInactive: string;
    priceColor: string;
    ratingBg: string;
    ratingText: string;
    searchBg: string;
    searchBorder: string;
    footerBg: string;
    footerBorder: string;
    cardRadius: string;
  };
}
