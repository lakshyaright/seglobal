import { SampleProject } from './types.ts';

export const SAMPLE_PROJECTS: SampleProject[] = [
  {
    id: 'dashboard',
    title: 'Executive Financial & Metrics Dashboard',
    filename: 'gemini-finance-dashboard.html',
    category: 'SaaS & Analytics',
    description: 'High-density operational telemetry with real-time SVG charting, transaction data grid, and cash-flow breakdown.',
    tags: ['Tailwind CSS', 'SVG Charts', 'Tabular Data', 'Responsive'],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apex Metrics | Operational Overview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .mono { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-6 md:p-8">
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Header -->
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white">Apex Capital Infrastructure</h1>
        <p class="text-xs text-slate-400 mt-1">
          <span>Enterprise Ledger</span>
          <span class="mx-2">·</span>
          <span>Fiscal Period Q4</span>
          <span class="mx-2">·</span>
          <span>Currency: USD ($)</span>
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button id="refreshBtn" class="px-3.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700 rounded-md hover:bg-slate-800 transition-colors">
          Refresh Metrics
        </button>
        <button class="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-md hover:bg-emerald-300 transition-colors">
          Download Statement
        </button>
      </div>
    </header>

    <!-- Top Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-4 bg-slate-900/70 border border-slate-800 rounded-lg">
        <div class="text-xs text-slate-400">Total Net Inflow</div>
        <div class="text-2xl font-bold text-white mono mt-1" id="inflowVal">$2,418,920.00</div>
        <div class="text-xs text-emerald-400 mono mt-2">↑ 14.8% vs last month</div>
      </div>
      <div class="p-4 bg-slate-900/70 border border-slate-800 rounded-lg">
        <div class="text-xs text-slate-400">Committed ARR</div>
        <div class="text-2xl font-bold text-white mono mt-1" id="arrVal">$14,890,200.00</div>
        <div class="text-xs text-emerald-400 mono mt-2">↑ 8.2% annual pace</div>
      </div>
      <div class="p-4 bg-slate-900/70 border border-slate-800 rounded-lg">
        <div class="text-xs text-slate-400">Operating Margin</div>
        <div class="text-2xl font-bold text-white mono mt-1" id="marginVal">42.6%</div>
        <div class="text-xs text-slate-400 mono mt-2">Target benchmark 40.0%</div>
      </div>
      <div class="p-4 bg-slate-900/70 border border-slate-800 rounded-lg">
        <div class="text-xs text-slate-400">Active Node Workspaces</div>
        <div class="text-2xl font-bold text-white mono mt-1" id="nodesVal">1,482</div>
        <div class="text-xs text-emerald-400 mono mt-2">99.98% SLA Availability</div>
      </div>
    </div>

    <!-- Chart & Distribution Split -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 p-5 bg-slate-900/70 border border-slate-800 rounded-lg space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-semibold text-white">Rolling Liquidity Vector (14-Day Trajectory)</h2>
            <p class="text-xs text-slate-400">Aggregated daily treasury balances</p>
          </div>
          <span class="text-xs text-slate-400 mono" id="avgBalance">Mean: $1.72M/day</span>
        </div>
        
        <!-- Interactive SVG Chart -->
        <div class="h-52 w-full pt-4">
          <svg viewBox="0 0 700 200" class="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#10B981" stop-opacity="0.25"/>
                <stop offset="100%" stop-color="#10B981" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <line x1="0" y1="40" x2="700" y2="40" stroke="#334155" stroke-dasharray="3 3" stroke-width="1"/>
            <line x1="0" y1="100" x2="700" y2="100" stroke="#334155" stroke-dasharray="3 3" stroke-width="1"/>
            <line x1="0" y1="160" x2="700" y2="160" stroke="#334155" stroke-dasharray="3 3" stroke-width="1"/>
            
            <path id="chartArea" d="M 0,160 L 50,140 L 100,150 L 150,110 L 200,120 L 250,90 L 300,105 L 350,70 L 400,85 L 450,55 L 500,60 L 550,35 L 600,45 L 650,20 L 700,30 L 700,200 L 0,200 Z" fill="url(#chartGrad)"/>
            <path id="chartLine" d="M 0,160 L 50,140 L 100,150 L 150,110 L 200,120 L 250,90 L 300,105 L 350,70 L 400,85 L 450,55 L 500,60 L 550,35 L 600,45 L 650,20 L 700,30" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <div class="p-5 bg-slate-900/70 border border-slate-800 rounded-lg space-y-4">
        <h2 class="text-base font-semibold text-white">Cost Distribution</h2>
        <p class="text-xs text-slate-400">Quarterly operational disbursements</p>

        <div class="space-y-3 pt-2">
          <div>
            <div class="flex justify-between text-xs text-slate-300 mono mb-1">
              <span>Compute & Storage</span>
              <span>48.5%</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-2">
              <div class="bg-emerald-500 h-2 rounded-full" style="width: 48.5%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs text-slate-300 mono mb-1">
              <span>Compliance & Audit</span>
              <span>24.0%</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full" style="width: 24%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs text-slate-300 mono mb-1">
              <span>Bandwidth & CDN</span>
              <span>18.2%</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-2">
              <div class="bg-amber-500 h-2 rounded-full" style="width: 18.2%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs text-slate-300 mono mb-1">
              <span>Reserve Buffer</span>
              <span>9.3%</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-2">
              <div class="bg-purple-500 h-2 rounded-full" style="width: 9.3%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Transactions Table -->
    <div class="p-5 bg-slate-900/70 border border-slate-800 rounded-lg space-y-3">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-base font-semibold text-white">Recent Authorized Settlements</h2>
          <p class="text-xs text-slate-400">Verified through automated clearinghouse</p>
        </div>
        <span class="text-xs text-slate-500 mono">Live Sync Nominal</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="text-slate-400 border-b border-slate-800 pb-2">
              <th class="py-2.5 font-medium">Reference ID</th>
              <th class="py-2.5 font-medium">Entity / Client</th>
              <th class="py-2.5 font-medium">Channel</th>
              <th class="py-2.5 font-medium">Settlement Date</th>
              <th class="py-2.5 font-medium text-right">Volume (USD)</th>
              <th class="py-2.5 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody id="txBody" class="divide-y divide-slate-800/60 mono text-slate-300">
            <tr>
              <td class="py-3 text-slate-400">TX-89210-A</td>
              <td class="font-sans font-medium text-white">Starlight Bio Labs</td>
              <td>Direct Wire</td>
              <td>2026-10-22 18:40</td>
              <td class="text-right text-emerald-400">+$142,500.00</td>
              <td class="text-right"><span class="text-emerald-400">Cleared</span></td>
            </tr>
            <tr>
              <td class="py-3 text-slate-400">TX-89209-C</td>
              <td class="font-sans font-medium text-white">Vanguard Cloud Corp</td>
              <td>Automated ACH</td>
              <td>2026-10-22 17:15</td>
              <td class="text-right text-emerald-400">+$88,240.00</td>
              <td class="text-right"><span class="text-emerald-400">Cleared</span></td>
            </tr>
            <tr>
              <td class="py-3 text-slate-400">TX-89208-D</td>
              <td class="font-sans font-medium text-white">Equinox Silicon Systems</td>
              <td>Escrow Inbound</td>
              <td>2026-10-22 14:02</td>
              <td class="text-right text-emerald-400">+$310,000.00</td>
              <td class="text-right"><span class="text-emerald-400">Cleared</span></td>
            </tr>
            <tr>
              <td class="py-3 text-slate-400">TX-89207-F</td>
              <td class="font-sans font-medium text-white">Global Transit Logistics</td>
              <td>SEPA Express</td>
              <td>2026-10-22 11:29</td>
              <td class="text-right text-slate-200">+$49,300.00</td>
              <td class="text-right"><span class="text-emerald-400">Cleared</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
    console.log("Apex Capital Dashboard initialized successfully.");
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        const randomFactor = 1 + (Math.random() * 0.1 - 0.05);
        const inflow = 2418920 * randomFactor;
        document.getElementById('inflowVal').textContent = '$' + inflow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        console.info("Refreshed liquidity vector. New factor: " + randomFactor.toFixed(4));
      });
    }
  </script>
</body>
</html>`
  },
  {
    id: 'orbital-physics',
    title: 'Orbital Mechanics & Gravitational Physics Lab',
    filename: 'gemini-orbital-physics.html',
    category: 'Science & Simulations',
    description: 'N-body gravitational vector simulator using HTML5 2D Canvas with velocity vectors, mass scaling, and trail renderer.',
    tags: ['HTML5 Canvas', 'Physics Math', 'Interactive Controls', 'Animation Loop'],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Orbital Physics Lab | N-Body Simulation</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: system-ui, sans-serif; }
    canvas { touch-action: none; }
  </style>
</head>
<body class="bg-neutral-950 text-neutral-100 min-h-screen flex flex-col p-4 md:p-6 select-none">
  <header class="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
    <div>
      <h1 class="text-xl font-bold tracking-tight text-white">Orbital Vector & Gravitational Dynamics</h1>
      <p class="text-xs text-neutral-400">Click anywhere on the vacuum plane to spawn an orbiting body</p>
    </div>
    <div class="flex items-center gap-2">
      <button id="resetSim" class="px-3 py-1.5 text-xs bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 rounded text-neutral-200">
        Reset Orbitals
      </button>
      <button id="clearTrails" class="px-3 py-1.5 text-xs bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 rounded text-neutral-200">
        Clear Trails
      </button>
    </div>
  </header>

  <div class="flex-1 flex flex-col md:flex-row gap-4">
    <!-- Canvas Area -->
    <div class="flex-1 relative rounded-lg border border-neutral-800 overflow-hidden bg-black flex items-center justify-center">
      <canvas id="simCanvas" class="w-full h-full block cursor-crosshair"></canvas>
      <div class="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur px-3 py-1.5 rounded text-xs font-mono text-neutral-400 border border-neutral-800 pointer-events-none">
        Bodies: <span id="bodyCount" class="text-white">3</span> | G-Const: <span class="text-amber-400">0.8</span>
      </div>
    </div>

    <!-- Parameter Controls -->
    <div class="w-full md:w-72 bg-neutral-900/60 border border-neutral-800 rounded-lg p-4 space-y-5">
      <div>
        <label class="text-xs font-semibold text-neutral-300 block mb-1">Time Step (Delta t)</label>
        <input type="range" id="timeSpeed" min="0.1" max="2.5" step="0.1" value="1.0" class="w-full accent-blue-500">
        <div class="flex justify-between text-xs text-neutral-500 font-mono mt-1">
          <span>0.1x (Slow)</span>
          <span id="speedDisplay" class="text-neutral-300">1.0x</span>
          <span>2.5x (Fast)</span>
        </div>
      </div>

      <div>
        <label class="text-xs font-semibold text-neutral-300 block mb-1">Spawn Mass Scale</label>
        <input type="range" id="massScale" min="5" max="80" step="5" value="20" class="w-full accent-emerald-500">
        <div class="flex justify-between text-xs text-neutral-500 font-mono mt-1">
          <span>5 M☉</span>
          <span id="massDisplay" class="text-neutral-300">20 M☉</span>
          <span>80 M☉</span>
        </div>
      </div>

      <div class="pt-2 border-t border-neutral-800 space-y-2 text-xs text-neutral-400">
        <p class="font-medium text-neutral-200">Keyboard Shortcuts</p>
        <p>• <kbd class="px-1 bg-neutral-800 rounded font-mono text-neutral-300">Space</kbd>: Pause / Resume</p>
        <p>• <kbd class="px-1 bg-neutral-800 rounded font-mono text-neutral-300">Click & Drag</kbd>: Launch with velocity</p>
      </div>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('simCanvas');
    const ctx = canvas.getContext('2d');
    const bodyCountEl = document.getElementById('bodyCount');
    const timeSpeedInput = document.getElementById('timeSpeed');
    const speedDisplay = document.getElementById('speedDisplay');
    const massScaleInput = document.getElementById('massScale');
    const massDisplay = document.getElementById('massDisplay');

    let width, height;
    function resize() {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    const G = 0.8;
    let timeStep = 1.0;
    let isPaused = false;
    let spawnMass = 20;

    timeSpeedInput.addEventListener('input', (e) => {
      timeStep = parseFloat(e.target.value);
      speedDisplay.textContent = timeStep.toFixed(1) + 'x';
    });

    massScaleInput.addEventListener('input', (e) => {
      spawnMass = parseFloat(e.target.value);
      massDisplay.textContent = spawnMass + ' M☉';
    });

    let bodies = [];

    function initPlanets() {
      bodies = [
        { x: width / 2, y: height / 2, vx: 0, vy: 0, mass: 450, radius: 14, color: '#f59e0b', trail: [] },
        { x: width / 2, y: height / 2 - 130, vx: 1.6, vy: 0, mass: 12, radius: 5, color: '#38bdf8', trail: [] },
        { x: width / 2, y: height / 2 + 210, vx: -1.3, vy: 0, mass: 22, radius: 7, color: '#a78bfa', trail: [] },
      ];
      bodyCountEl.textContent = bodies.length;
    }
    initPlanets();

    document.getElementById('resetSim').addEventListener('click', initPlanets);
    document.getElementById('clearTrails').addEventListener('click', () => {
      bodies.forEach(b => b.trail = []);
    });

    let dragStart = null;
    canvas.addEventListener('mousedown', (e) => {
      const rect = canvas.getBoundingClientRect();
      dragStart = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    });

    canvas.addEventListener('mouseup', (e) => {
      if (!dragStart) return;
      const rect = canvas.getBoundingClientRect();
      const current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const vx = (dragStart.x - current.x) * 0.04;
      const vy = (dragStart.y - current.y) * 0.04;

      const colors = ['#34d399', '#f43f5e', '#ec4899', '#e879f9', '#60a5fa'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      bodies.push({
        x: dragStart.x,
        y: dragStart.y,
        vx: vx,
        vy: vy,
        mass: spawnMass,
        radius: Math.max(4, Math.sqrt(spawnMass) * 1.5),
        color: color,
        trail: []
      });
      bodyCountEl.textContent = bodies.length;
      dragStart = null;
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        isPaused = !isPaused;
        console.log("Simulation pause toggled:", isPaused);
      }
    });

    function loop() {
      requestAnimationFrame(loop);
      if (!isPaused) {
        // Gravitational physics
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const b1 = bodies[i];
            const b2 = bodies[j];
            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = (b1.radius + b2.radius);
            if (dist > minDist) {
              const force = (G * b1.mass * b2.mass) / (dist * dist);
              const ax = (force * (dx / dist)) * timeStep;
              const ay = (force * (dy / dist)) * timeStep;

              b1.vx += ax / b1.mass;
              b1.vy += ay / b1.mass;
              b2.vx -= ax / b2.mass;
              b2.vy -= ay / b2.mass;
            }
          }
        }

        // Position updates
        for (let b of bodies) {
          b.x += b.vx * timeStep;
          b.y += b.vy * timeStep;
          b.trail.push({ x: b.x, y: b.y });
          if (b.trail.length > 80) b.trail.shift();
        }
      }

      // Render
      ctx.fillStyle = 'rgba(10, 10, 10, 0.35)';
      ctx.fillRect(0, 0, width, height);

      // Render trails
      for (let b of bodies) {
        if (b.trail.length > 1) {
          ctx.beginPath();
          ctx.strokeStyle = b.color;
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = 0.4;
          for (let i = 0; i < b.trail.length; i++) {
            const pt = b.trail[i];
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }
      }

      // Render bodies
      for (let b of bodies) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    loop();
    console.log("Orbital simulation initialized with 3 initial celestial bodies.");
  </script>
</body>
</html>`
  },
  {
    id: 'audio-sequencer',
    title: 'Web Audio Modular Drum & Synth Sequencer',
    filename: 'gemini-audio-synth.html',
    category: 'Audio & Creative Tools',
    description: 'Real-time 8-step beat sequencer and polyphonic tone generator utilizing standard browser Web Audio API with waveform visualizer.',
    tags: ['Web Audio API', 'Canvas Visualizer', 'Step Sequencer', 'Real-time Audio'],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pulse Synth | 8-Step Audio Engine</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: system-ui, sans-serif; }
    .grid-step.active { background-color: #38bdf8; box-shadow: 0 0 10px #0284c7; }
    .grid-step.current { border-color: #f59e0b; }
  </style>
</head>
<body class="bg-zinc-950 text-zinc-100 min-h-screen p-6 flex flex-col justify-between">
  <div class="max-w-4xl mx-auto w-full space-y-6">
    <header class="flex items-center justify-between pb-4 border-b border-zinc-800">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-white">Pulse 808 Modular Step Synthesizer</h1>
        <p class="text-xs text-zinc-400">Low-latency browser sound synthesizer with live oscilloscope</p>
      </div>
      <div class="flex items-center gap-3">
        <button id="playBtn" class="px-5 py-2 text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors flex items-center gap-1.5">
          <span>Start Playback</span>
        </button>
      </div>
    </header>

    <!-- Visualizer Canvas -->
    <div class="h-28 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      <canvas id="scopeCanvas" class="w-full h-full block"></canvas>
    </div>

    <!-- Controls Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
        <label class="text-xs font-semibold text-zinc-300 block mb-1">Tempo (BPM)</label>
        <input type="range" id="bpmSlider" min="60" max="180" value="120" class="w-full accent-amber-500">
        <div class="flex justify-between text-xs text-zinc-500 font-mono mt-1">
          <span>60</span>
          <span id="bpmVal" class="text-zinc-200">120 BPM</span>
          <span>180</span>
        </div>
      </div>

      <div class="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
        <label class="text-xs font-semibold text-zinc-300 block mb-1">Waveform Mode</label>
        <select id="waveSelect" class="w-full bg-zinc-800 border border-zinc-700 text-xs rounded p-2 text-zinc-200">
          <option value="sine">Sine (Pure Tone)</option>
          <option value="triangle" selected>Triangle (Warm)</option>
          <option value="square">Square (Chiptune)</option>
          <option value="sawtooth">Sawtooth (Aggressive)</option>
        </select>
      </div>

      <div class="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
        <label class="text-xs font-semibold text-zinc-300 block mb-1">Master Volume</label>
        <input type="range" id="volSlider" min="0" max="1" step="0.05" value="0.5" class="w-full accent-emerald-500">
        <div class="flex justify-between text-xs text-zinc-500 font-mono mt-1">
          <span>0%</span>
          <span id="volVal" class="text-zinc-200">50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>

    <!-- 8 Step Grid Matrix -->
    <div class="p-5 bg-zinc-900 border border-zinc-800 rounded-lg space-y-4">
      <h2 class="text-sm font-semibold text-zinc-200">Step Pattern Matrix (8 Beats)</h2>
      <div class="grid grid-cols-8 gap-2" id="stepMatrix">
        <!-- Javascript populates 8 pads per row for 4 voices -->
      </div>
    </div>
  </div>

  <footer class="text-center text-xs text-zinc-600 py-4">
    Built for Gemini Code Live Execution Sandbox · Web Audio API Standard
  </footer>

  <script>
    let audioCtx = null;
    let isPlaying = false;
    let currentStep = 0;
    let bpm = 120;
    let timerId = null;

    const notes = [523.25, 440.00, 329.63, 261.63]; // C5, A4, E4, C4
    const rows = 4;
    const cols = 8;
    const pattern = Array(rows).fill(null).map(() => Array(cols).fill(false));

    // Preset initial rhythm
    pattern[0][0] = true; pattern[0][4] = true;
    pattern[1][2] = true; pattern[1][6] = true;
    pattern[2][0] = true; pattern[2][2] = true; pattern[2][4] = true; pattern[2][6] = true;
    pattern[3][7] = true;

    const matrixEl = document.getElementById('stepMatrix');
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const btn = document.createElement('button');
        btn.className = 'h-12 rounded border border-zinc-700 bg-zinc-800 grid-step transition-all';
        btn.dataset.row = r;
        btn.dataset.col = c;
        if (pattern[r][c]) btn.classList.add('active');
        btn.addEventListener('click', () => {
          pattern[r][c] = !pattern[r][c];
          btn.classList.toggle('active', pattern[r][c]);
        });
        matrixEl.appendChild(btn);
      }
    }

    const playBtn = document.getElementById('playBtn');
    const bpmSlider = document.getElementById('bpmSlider');
    const bpmVal = document.getElementById('bpmVal');
    const waveSelect = document.getElementById('waveSelect');
    const volSlider = document.getElementById('volSlider');
    const volVal = document.getElementById('volVal');

    bpmSlider.addEventListener('input', (e) => {
      bpm = parseInt(e.target.value);
      bpmVal.textContent = bpm + ' BPM';
      if (isPlaying) {
        clearInterval(timerId);
        startLoop();
      }
    });

    volSlider.addEventListener('input', (e) => {
      volVal.textContent = Math.round(e.target.value * 100) + '%';
    });

    function getAudioContext() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    function playNote(freq, type) {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const masterVol = parseFloat(volSlider.value);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.3 * masterVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    }

    function step() {
      const allButtons = matrixEl.querySelectorAll('button');
      allButtons.forEach(b => {
        if (parseInt(b.dataset.col) === currentStep) {
          b.classList.add('current');
        } else {
          b.classList.remove('current');
        }
      });

      for (let r = 0; r < rows; r++) {
        if (pattern[r][currentStep]) {
          playNote(notes[r], waveSelect.value);
        }
      }

      currentStep = (currentStep + 1) % cols;
    }

    function startLoop() {
      const intervalMs = (60 / bpm / 2) * 1000;
      timerId = setInterval(step, intervalMs);
    }

    playBtn.addEventListener('click', () => {
      getAudioContext();
      isPlaying = !isPlaying;
      if (isPlaying) {
        playBtn.textContent = 'Pause Playback';
        playBtn.classList.replace('bg-amber-400', 'bg-rose-500');
        playBtn.classList.replace('hover:bg-amber-300', 'hover:bg-rose-400');
        startLoop();
        console.log("Audio playback started at BPM:", bpm);
      } else {
        playBtn.textContent = 'Start Playback';
        playBtn.classList.replace('bg-rose-500', 'bg-amber-400');
        playBtn.classList.replace('hover:bg-rose-400', 'hover:bg-amber-300');
        clearInterval(timerId);
        console.log("Audio playback stopped.");
      }
    });

    // Simple Scope Canvas Visualizer
    const scopeCanvas = document.getElementById('scopeCanvas');
    const sCtx = scopeCanvas.getContext('2d');
    function drawScope() {
      requestAnimationFrame(drawScope);
      scopeCanvas.width = scopeCanvas.clientWidth;
      scopeCanvas.height = scopeCanvas.clientHeight;
      sCtx.fillStyle = '#18181b';
      sCtx.fillRect(0, 0, scopeCanvas.width, scopeCanvas.height);

      sCtx.beginPath();
      sCtx.lineWidth = 2;
      sCtx.strokeStyle = isPlaying ? '#38bdf8' : '#3f3f46';
      const mid = scopeCanvas.height / 2;
      const w = scopeCanvas.width;

      for (let x = 0; x < w; x++) {
        const angle = (x / w) * Math.PI * 8 + (isPlaying ? Date.now() * 0.01 : 0);
        const y = mid + (isPlaying ? Math.sin(angle) * 20 : 0);
        if (x === 0) sCtx.moveTo(x, y);
        else sCtx.lineTo(x, y);
      }
      sCtx.stroke();
    }
    drawScope();
  </script>
</body>
</html>`
  },
  {
    id: 'kanban-board',
    title: 'Product Sprint & Engineering Kanban',
    filename: 'gemini-kanban-studio.html',
    category: 'Productivity & Workspace',
    description: 'Clean project planning board with drag-and-drop task lifecycle, category badges, real-time counter metrics, and rapid task creation.',
    tags: ['HTML Drag and Drop', 'Tailwind CSS', 'State Management', 'Sprint Tracker'],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sprintflow | Agile Kanban</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: system-ui, sans-serif; }
    .dragging { opacity: 0.4; }
  </style>
</head>
<body class="bg-slate-100 text-slate-800 min-h-screen p-6">
  <div class="max-w-6xl mx-auto space-y-6">
    <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
      <div>
        <h1 class="text-xl font-bold text-slate-900">Sprint 42 · Core Engine Release</h1>
        <p class="text-xs text-slate-500 mt-0.5">Oct 20 - Nov 3 · 8 of 14 tasks resolved</p>
      </div>
      <div class="flex items-center gap-2">
        <button id="addTaskBtn" class="px-4 py-2 bg-slate-900 text-white rounded-md text-xs font-semibold hover:bg-slate-800 transition-colors">
          + Add New Task
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Backlog -->
      <div class="bg-slate-200/60 p-4 rounded-lg flex flex-col min-h-[450px]">
        <div class="flex justify-between items-center mb-3">
          <span class="text-xs font-bold text-slate-700 uppercase tracking-wider">To Do</span>
          <span class="text-xs font-mono text-slate-500 bg-white px-2 py-0.5 rounded shadow-sm" id="todoCount">2</span>
        </div>
        <div class="space-y-3 flex-1 kanban-col" id="col-todo" ondragover="event.preventDefault()" ondrop="drop(event, 'col-todo')">
          <div draggable="true" ondragstart="drag(event)" id="card-1" class="p-3 bg-white rounded-md shadow-sm border border-slate-200 cursor-grab">
            <span class="text-xs font-semibold text-indigo-600">Frontend</span>
            <h3 class="text-sm font-semibold text-slate-900 mt-1">Optimize WebGL buffer allocation</h3>
            <p class="text-xs text-slate-500 mt-1">Audit memory leaks in particle emitter</p>
          </div>
          <div draggable="true" ondragstart="drag(event)" id="card-2" class="p-3 bg-white rounded-md shadow-sm border border-slate-200 cursor-grab">
            <span class="text-xs font-semibold text-emerald-600">Security</span>
            <h3 class="text-sm font-semibold text-slate-900 mt-1">Verify CORS policy headers</h3>
            <p class="text-xs text-slate-500 mt-1">Ensure sandboxed iframes prevent privilege elevation</p>
          </div>
        </div>
      </div>

      <!-- In Progress -->
      <div class="bg-slate-200/60 p-4 rounded-lg flex flex-col min-h-[450px]">
        <div class="flex justify-between items-center mb-3">
          <span class="text-xs font-bold text-slate-700 uppercase tracking-wider">In Progress</span>
          <span class="text-xs font-mono text-slate-500 bg-white px-2 py-0.5 rounded shadow-sm" id="progressCount">1</span>
        </div>
        <div class="space-y-3 flex-1 kanban-col" id="col-progress" ondragover="event.preventDefault()" ondrop="drop(event, 'col-progress')">
          <div draggable="true" ondragstart="drag(event)" id="card-3" class="p-3 bg-white rounded-md shadow-sm border border-slate-200 cursor-grab">
            <span class="text-xs font-semibold text-amber-600">API</span>
            <h3 class="text-sm font-semibold text-slate-900 mt-1">Refactor Gemini API response streaming</h3>
            <p class="text-xs text-slate-500 mt-1">Support server-sent events with chunks decoding</p>
          </div>
        </div>
      </div>

      <!-- Done -->
      <div class="bg-slate-200/60 p-4 rounded-lg flex flex-col min-h-[450px]">
        <div class="flex justify-between items-center mb-3">
          <span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Done</span>
          <span class="text-xs font-mono text-slate-500 bg-white px-2 py-0.5 rounded shadow-sm" id="doneCount">1</span>
        </div>
        <div class="space-y-3 flex-1 kanban-col" id="col-done" ondragover="event.preventDefault()" ondrop="drop(event, 'col-done')">
          <div draggable="true" ondragstart="drag(event)" id="card-4" class="p-3 bg-white rounded-md shadow-sm border border-slate-200 cursor-grab">
            <span class="text-xs font-semibold text-blue-600">Design</span>
            <h3 class="text-sm font-semibold text-slate-900 mt-1">Establish 60-30-10 palette tokens</h3>
            <p class="text-xs text-slate-500 mt-1">Standardize dark slate and emerald accents</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    let draggedId = null;
    function drag(ev) {
      draggedId = ev.target.id;
      ev.target.classList.add('dragging');
      ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev, colId) {
      ev.preventDefault();
      const card = document.getElementById(draggedId);
      if (card) {
        card.classList.remove('dragging');
        const targetCol = document.getElementById(colId);
        targetCol.appendChild(card);
        updateCounts();
        console.log("Moved card", draggedId, "to", colId);
      }
    }

    function updateCounts() {
      document.getElementById('todoCount').textContent = document.getElementById('col-todo').children.length;
      document.getElementById('progressCount').textContent = document.getElementById('col-progress').children.length;
      document.getElementById('doneCount').textContent = document.getElementById('col-done').children.length;
    }

    document.getElementById('addTaskBtn').addEventListener('click', () => {
      const title = prompt("Enter task title:", "Ship release v2.4");
      if (title) {
        const id = 'card-' + Date.now();
        const card = document.createElement('div');
        card.draggable = true;
        card.id = id;
        card.ondragstart = drag;
        card.className = "p-3 bg-white rounded-md shadow-sm border border-slate-200 cursor-grab";
        card.innerHTML = '<span class="text-xs font-semibold text-indigo-600">Task</span><h3 class="text-sm font-semibold text-slate-900 mt-1">' + title + '</h3><p class="text-xs text-slate-500 mt-1">Created just now</p>';
        document.getElementById('col-todo').appendChild(card);
        updateCounts();
        console.log("Created task:", title);
      }
    });
  </script>
</body>
</html>`
  }
];
