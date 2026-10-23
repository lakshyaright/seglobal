import { DetectedTech, HtmlMetadata } from '../types.ts';

export function analyzeHtml(html: string): HtmlMetadata {
  const lineCount = html.split('\n').length;
  const charCount = html.length;

  let title = 'Untitled Gemini App';
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch && titleMatch[1].trim()) {
    title = titleMatch[1].trim();
  }

  const scriptsCount = (html.match(/<script\b/gi) || []).length;
  const stylesCount = (html.match(/<style\b|<link\s+[^>]*rel=["']stylesheet["']/gi) || []).length;
  const hasCanvas = /<canvas\b/i.test(html) || /getContext\(["']2d["']\)|WebGL/i.test(html);
  const hasAudio = /AudioContext|webkitAudioContext/i.test(html);

  const detectedTech: DetectedTech[] = [];

  if (/cdn\.tailwindcss\.com|tailwindcss/i.test(html)) {
    detectedTech.push({
      name: 'Tailwind CSS',
      category: 'css',
      description: 'Utility-first modern CSS framework loaded via CDN.',
    });
  }

  if (/react\.production\.min\.js|react-dom|import\s+React/i.test(html)) {
    detectedTech.push({
      name: 'React',
      category: 'js',
      description: 'Component-based UI library runtime.',
    });
  }

  if (/three(\.min)?\.js|from ['"]three['"]/i.test(html)) {
    detectedTech.push({
      name: 'Three.js',
      category: 'js',
      description: '3D WebGL computer graphics library.',
    });
  }

  if (/lucide|lucide-react/i.test(html)) {
    detectedTech.push({
      name: 'Lucide Icons',
      category: 'other',
      description: 'Clean, consistent vector iconography.',
    });
  }

  if (/font-awesome|fontawesome|fa-/i.test(html)) {
    detectedTech.push({
      name: 'Font Awesome',
      category: 'font',
      description: 'Scalable vector icon suite.',
    });
  }

  if (/chart\.js|highcharts|d3(\.min)?\.js/i.test(html)) {
    detectedTech.push({
      name: 'Data Visualization Engine',
      category: 'js',
      description: 'Interactive graphical charting libraries.',
    });
  }

  if (hasCanvas) {
    detectedTech.push({
      name: 'HTML5 2D / WebGL Canvas',
      category: 'api',
      description: 'Direct raster graphic rendering surface for interactive visuals & simulation.',
    });
  }

  if (hasAudio) {
    detectedTech.push({
      name: 'Web Audio API',
      category: 'api',
      description: 'Browser audio synthesizer & waveform analysis context.',
    });
  }

  if (/google-maps|maps\.googleapis/i.test(html)) {
    detectedTech.push({
      name: 'Google Maps Platform',
      category: 'api',
      description: 'Cartographic tile and place API script.',
    });
  }

  return {
    title,
    charCount,
    lineCount,
    detectedTech,
    scriptsCount,
    stylesCount,
    hasCanvas,
    hasAudio,
  };
}

/**
 * Injects a lightweight console forwarder script into the HTML so messages from
 * console.log, console.warn, console.error are posted to the host app.
 */
export function injectConsoleBridge(rawHtml: string): string {
  const bridgeScript = `
<script>
(function() {
  function formatArg(arg) {
    try {
      if (typeof arg === 'object' && arg !== null) {
        return JSON.stringify(arg);
      }
      return String(arg);
    } catch (e) {
      return String(arg);
    }
  }

  function sendLog(type, args) {
    var text = Array.prototype.slice.call(args).map(formatArg).join(' ');
    window.parent.postMessage({
      type: 'GEMINI_RUNNER_CONSOLE',
      level: type,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }, '*');
  }

  var origLog = console.log;
  var origInfo = console.info;
  var origWarn = console.warn;
  var origError = console.error;

  console.log = function() {
    sendLog('log', arguments);
    if (origLog) origLog.apply(console, arguments);
  };
  console.info = function() {
    sendLog('info', arguments);
    if (origInfo) origInfo.apply(console, arguments);
  };
  console.warn = function() {
    sendLog('warn', arguments);
    if (origWarn) origWarn.apply(console, arguments);
  };
  console.error = function() {
    sendLog('error', arguments);
    if (origError) origError.apply(console, arguments);
  };

  window.addEventListener('error', function(e) {
    sendLog('error', ['Unhandled Script Error: ' + e.message + ' at ' + (e.filename || 'inline') + ':' + e.lineno]);
  });
})();
</script>
`;

  if (/<head\b[^>]*>/i.test(rawHtml)) {
    return rawHtml.replace(/<head\b[^>]*>/i, (match) => `${match}\n${bridgeScript}`);
  }
  return `${bridgeScript}\n${rawHtml}`;
}
