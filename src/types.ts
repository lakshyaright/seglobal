export type ViewportMode = 'desktop' | 'laptop' | 'tablet' | 'mobile' | 'responsive';

export interface ConsoleMessage {
  id: string;
  type: 'log' | 'info' | 'warn' | 'error';
  text: string;
  timestamp: string;
}

export interface DetectedTech {
  name: string;
  category: 'css' | 'js' | 'font' | 'api' | 'other';
  description: string;
}

export interface HtmlMetadata {
  title: string;
  charCount: number;
  lineCount: number;
  detectedTech: DetectedTech[];
  scriptsCount: number;
  stylesCount: number;
  hasCanvas: boolean;
  hasAudio: boolean;
}

export interface SampleProject {
  id: string;
  title: string;
  filename: string;
  category: string;
  description: string;
  tags: string[];
  html: string;
}
