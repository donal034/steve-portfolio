// Portfolio — NGAHAN Donal Steve — Version Améliorée
const { useState, useEffect, useRef, useCallback } = React;

/* ── DESIGN TOKENS ─────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #060a10;
    --bg2:       #0a1120;
    --bg3:       #0e1929;
    --bg4:       #111f30;
    --border:    rgba(0,240,200,0.10);
    --border2:   rgba(0,240,200,0.28);
    --border3:   rgba(0,240,200,0.50);
    --cyan:      #00f0c8;
    --cyan2:     #00d4b0;
    --cyan-dim:  rgba(0,240,200,0.10);
    --cyan-mid:  rgba(0,240,200,0.20);
    --cyan-glow: rgba(0,240,200,0.30);
    --cyan-glow2:rgba(0,240,200,0.55);
    --amber:     #f59e0b;
    --red:       #ef4444;
    --green:     #22c55e;
    --text:      #dde6f0;
    --text-dim:  #6b84a0;
    --text-mid:  #a8bdd4;
    --white:     #f0f8ff;
    --panel:     rgba(10,17,32,0.90);
    --panel2:    rgba(14,25,41,0.80);
    --font-mono: 'Space Mono', monospace;
    --font-head: 'Syne', sans-serif;
    --font-body: 'Outfit', sans-serif;
    --r:  10px;
    --r2: 16px;
    --r3: 24px;
    --nav-h: 62px;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.65;
    overflow-x: hidden;
  }

  #root, main { background: var(--bg); min-height: 100vh; }

  ::selection { background: var(--cyan-mid); color: var(--white); }

  a:focus-visible, button:focus-visible {
    outline: 2px solid var(--cyan);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--border3); }

  /* ─── CANVAS BG ────────────────────────────── */
  .canvas-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
  }

  /* ─── SCANLINES ─────────────────────────────── */
  .scanlines {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
  }

  /* ─── NOISE OVERLAY ─────────────────────────── */
  .noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* ─── GLOW ORBS ─────────────────────────────── */
  .orb1 {
    position: fixed; width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,240,200,0.06) 0%, transparent 70%);
    top: -200px; left: -100px;
    pointer-events: none; z-index: 0;
    animation: floatOrb1 18s ease-in-out infinite;
  }
  .orb2 {
    position: fixed; width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,180,255,0.05) 0%, transparent 70%);
    bottom: -100px; right: -100px;
    pointer-events: none; z-index: 0;
    animation: floatOrb2 22s ease-in-out infinite;
  }
  @keyframes floatOrb1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(60px,40px) scale(1.1); } }
  @keyframes floatOrb2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px,-30px) scale(1.05); } }

  /* ─── NAVBAR ────────────────────────────────── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: var(--nav-h);
    display: flex; align-items: center;
    padding: 0 clamp(16px, 5vw, 52px);
    justify-content: space-between;
    transition: background 0.3s, border-color 0.3s;
  }
  .nav.scrolled {
    background: rgba(6,10,16,0.92);
    backdrop-filter: blur(24px) saturate(180%);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--cyan);
    letter-spacing: 0.08em;
    text-decoration: none;
    display: flex; align-items: center; gap: 6px;
  }
  .nav-logo-bracket { color: var(--text-dim); }
  .nav-logo-cursor {
    display: inline-block; width: 8px; height: 14px;
    background: var(--cyan); opacity: 0.8;
    animation: blink 1.1s step-end infinite;
    vertical-align: middle; margin-left: 2px;
  }
  @keyframes blink { 0%,100%{opacity:0.8} 50%{opacity:0} }

  .nav-links { display: flex; align-items: center; gap: 6px; }
  .nav-link {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-mid);
    text-decoration: none;
    padding: 6px 12px;
    border-radius: var(--r);
    transition: color 0.2s, background 0.2s;
    position: relative;
  }
  .nav-link:hover { color: var(--cyan); background: var(--cyan-dim); }
  .nav-link.active { color: var(--cyan); }
  .nav-link.active::after {
    content: ''; position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);
    width: 4px; height: 4px; border-radius: 50%; background: var(--cyan);
  }

  /* Burger */
  .nav-burger {
    display: none;
    flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer;
    padding: 8px; border-radius: var(--r);
    transition: background 0.2s;
  }
  .nav-burger:hover { background: var(--cyan-dim); }
  .nav-burger span {
    display: block; width: 22px; height: 2px;
    background: var(--text-mid);
    transition: transform 0.3s, opacity 0.3s;
  }
  .nav-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-burger.open span:nth-child(2) { opacity: 0; }
  .nav-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mobile-menu {
    display: none;
    position: fixed; top: var(--nav-h); left: 0; right: 0; z-index: 199;
    background: rgba(6,10,16,0.97);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--border);
    padding: 20px clamp(16px, 5vw, 52px) 28px;
    flex-direction: column; gap: 4px;
    transform: translateY(-10px); opacity: 0;
    transition: transform 0.3s, opacity 0.3s;
  }
  .mobile-menu.open { display: flex; transform: translateY(0); opacity: 1; }
  .mobile-menu a {
    font-family: var(--font-mono); font-size: 13px;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--text-mid); text-decoration: none;
    padding: 12px 16px; border-radius: var(--r);
    border: 1px solid transparent;
    transition: all 0.2s;
  }
  .mobile-menu a:hover { color: var(--cyan); border-color: var(--border); background: var(--cyan-dim); }

  @media (max-width: 700px) {
    .nav-links { display: none; }
    .nav-burger { display: flex; }
  }

  /* ─── SECTIONS ──────────────────────────────── */
  section { position: relative; z-index: 1; }
  .container { max-width: 1120px; margin: 0 auto; padding: 0 clamp(16px, 5vw, 52px); }

  /* ─── HERO ──────────────────────────────────── */
  .hero-wrap {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 64px;
    align-items: center;
    padding-top: var(--nav-h);
  }
  @media (max-width: 960px) {
    .hero-wrap { grid-template-columns: 1fr; padding-top: calc(var(--nav-h) + 32px); min-height: auto; padding-bottom: 64px; }
    .hero-visual { display: block; max-width: 280px; margin: 0 auto; }
  }

  .hero-kicker {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cyan);
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 24px;
  }
  .hero-kicker-line { width: 36px; height: 1px; background: var(--cyan); }

  .hero-name {
    font-family: var(--font-head);
    font-size: clamp(44px, 7.5vw, 88px);
    font-weight: 800;
    line-height: 0.95;
    color: var(--white);
    letter-spacing: -0.03em;
  }
  .hero-name .dim { color: var(--text-dim); }
  .hero-name .accent { 
    color: transparent;
    -webkit-text-stroke: 2px var(--cyan);
    text-shadow: 0 0 40px var(--cyan-glow);
  }

  .hero-sub {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-mid);
    margin-top: 20px;
    line-height: 1.8;
    letter-spacing: 0.02em;
  }
  .hero-sub .hl { color: var(--cyan); }

  .hero-blurb {
    margin-top: 24px;
    font-size: 16px;
    font-weight: 300;
    color: var(--text);
    max-width: 520px;
    line-height: 1.75;
  }

  .hero-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }

  .hero-ctas { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }

  /* ─── TERMINAL WINDOW ───────────────────────── */
  .terminal {
    background: var(--bg2);
    border: 1px solid var(--border2);
    border-radius: var(--r3);
    overflow: hidden;
    box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,240,200,0.06), inset 0 1px 0 rgba(255,255,255,0.04);
  }
  .terminal-bar {
    background: var(--bg3);
    border-bottom: 1px solid var(--border);
    padding: 12px 16px;
    display: flex; align-items: center; gap: 8px;
  }
  .terminal-dot { width: 11px; height: 11px; border-radius: 50%; }
  .terminal-dot.red   { background: #ff5f57; }
  .terminal-dot.amber { background: #ffbd2e; }
  .terminal-dot.green { background: #28c841; }
  .terminal-title {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--text-dim); letter-spacing: 0.06em;
    margin-left: 6px;
  }
  .terminal-body {
    padding: 20px;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.9;
    min-height: 220px;
  }
  .t-prompt { color: var(--cyan); }
  .t-cmd    { color: var(--white); }
  .t-output { color: var(--text-mid); padding-left: 16px; }
  .t-val    { color: var(--cyan); }
  .t-dim    { color: var(--text-dim); }
  .t-green  { color: #22c55e; }
  .t-amber  { color: #f59e0b; }
  .t-cursor {
    display: inline-block; width: 8px; height: 13px;
    background: var(--cyan);
    animation: blink 1.1s step-end infinite;
    vertical-align: middle;
  }

  /* ─── PHOTO FRAME ───────────────────────────── */
  .photo-frame {
    position: relative;
    width: 300px; height: 360px;
    margin: 0 auto;
  }
  .photo-frame::before {
    content: '';
    position: absolute; inset: -2px;
    border-radius: 22px;
    background: linear-gradient(135deg, var(--cyan), rgba(0,180,255,0.4), transparent 60%);
    z-index: 0;
  }
  .photo-frame::after {
    content: '';
    position: absolute; inset: 8px;
    border-radius: 18px;
    background: transparent;
    border: 1px dashed var(--border2);
    z-index: 3; pointer-events: none;
  }
  .photo-frame img {
    position: relative; z-index: 1;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center top;
    border-radius: 20px;
    display: block;
  }
  .photo-badge {
    position: absolute;
    bottom: -16px; right: -16px;
    background: var(--bg2);
    border: 1px solid var(--border2);
    border-radius: var(--r2);
    padding: 10px 16px;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--cyan);
    z-index: 4;
    line-height: 1.7;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
  .photo-badge-dot { color: #22c55e; }
  .photo-corner {
    position: absolute;
    width: 20px; height: 20px;
    border-color: var(--cyan);
    border-style: solid;
    z-index: 5;
  }
  .photo-corner.tl { top: -4px; left: -4px; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
  .photo-corner.tr { top: -4px; right: -4px; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
  .photo-corner.bl { bottom: -4px; left: -4px; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
  .photo-corner.br { bottom: -4px; right: -4px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

  @media (max-width: 960px) {
    .photo-frame { width: 260px; height: 312px; }
  }

  /* ─── STATUS DOT ────────────────────────────── */
  .status-dot {
    display: inline-flex; align-items: center; gap: 7px;
    font-family: var(--font-mono); font-size: 10px;
    color: var(--text-mid);
  }
  .status-dot::before {
    content: ''; display: block;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 10px #22c55e;
    animation: pulse 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes pulse {
    0%,100% { opacity: 1; box-shadow: 0 0 10px #22c55e; }
    50% { opacity: 0.4; box-shadow: 0 0 4px #22c55e; }
  }

  /* ─── BUTTONS ───────────────────────────────── */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--cyan); color: #060a10;
    font-family: var(--font-mono); font-size: 11px;
    font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 12px 26px; border-radius: var(--r2);
    text-decoration: none; transition: all 0.25s;
    border: none; cursor: pointer; position: relative; overflow: hidden;
    white-space: nowrap;
  }
  .btn-primary::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
    opacity: 0; transition: opacity 0.25s;
  }
  .btn-primary:hover { background: #00ffd5; transform: translateY(-2px); box-shadow: 0 12px 32px var(--cyan-glow2); }
  .btn-primary:hover::before { opacity: 1; }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--text-mid);
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 11px 24px; border-radius: var(--r2);
    text-decoration: none; transition: all 0.2s;
    border: 1px solid var(--border2); cursor: pointer;
    white-space: nowrap;
  }
  .btn-ghost:hover { border-color: var(--cyan); color: var(--cyan); background: var(--cyan-dim); transform: translateY(-1px); }

  /* ─── BADGE ─────────────────────────────────── */
  .badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--cyan-dim);
    border: 1px solid var(--border2);
    color: var(--cyan);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.07em;
    padding: 4px 11px;
    border-radius: 999px;
    white-space: nowrap;
    transition: border-color 0.2s, background 0.2s;
  }
  .badge:hover { border-color: var(--border3); background: var(--cyan-mid); }

  .tag {
    display: inline-flex; align-items: center;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    color: var(--text-mid);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.05em;
    padding: 3px 10px;
    border-radius: 999px;
    white-space: nowrap;
    transition: border-color 0.2s, color 0.2s;
  }
  .tag:hover { border-color: var(--border2); color: var(--cyan); }

  /* ─── SECTION HEADER ────────────────────────── */
  .section-kicker {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cyan);
    display: inline-flex; align-items: center; gap: 12px;
    margin-bottom: 14px;
  }
  .section-kicker::before { content: '//'; color: var(--text-dim); font-size: 11px; }
  .section-title {
    font-size: clamp(30px, 4.5vw, 48px);
    font-weight: 800;
    color: var(--white);
    line-height: 1.08;
    letter-spacing: -0.025em;
  }
  .section-sub {
    margin-top: 14px;
    color: var(--text-mid);
    max-width: 660px;
    font-size: 15px;
    line-height: 1.75;
    font-weight: 300;
  }
  .section-header { margin-bottom: 56px; }

  /* ─── CARD ──────────────────────────────────── */
  .card {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: var(--r3);
    padding: 26px;
    transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
    position: relative; overflow: hidden;
    backdrop-filter: blur(8px);
  }
  .card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--cyan) 50%, transparent 100%);
    opacity: 0; transition: opacity 0.3s;
  }
  .card:hover { border-color: var(--border2); transform: translateY(-3px); box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px var(--border2); }
  .card:hover::before { opacity: 0.6; }

  /* ─── SKILLS ────────────────────────────────── */
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 18px; }

  .skill-card-title {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--cyan);
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px;
  }
  .skill-card-title::before {
    content: ''; display: block;
    width: 20px; height: 1px; background: var(--cyan); flex-shrink: 0;
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 7px; }

  /* ─── PROJECTS GRID ─────────────────────────── */
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 22px; }

  .project-card { display: flex; flex-direction: column; height: 100%; }

  .project-num {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-dim);
  }
  .project-type {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--cyan);
    letter-spacing: 0.06em;
  }
  .project-title {
    font-size: 17px;
    font-weight: 700;
    color: var(--white);
    line-height: 1.3;
    margin: 10px 0;
  }
  .project-summary {
    font-size: 13.5px;
    font-weight: 300;
    color: var(--text-mid);
    line-height: 1.7;
    flex: 1;
    margin-bottom: 16px;
  }
  .project-highlights { list-style: none; margin-bottom: 16px; }
  .project-highlights li {
    font-family: var(--font-mono);
    font-size: 11.5px;
    color: var(--text);
    padding: 4px 0;
    display: flex; align-items: flex-start; gap: 8px;
    line-height: 1.5;
  }
  .project-highlights li::before {
    content: '→'; color: var(--cyan); flex-shrink: 0; margin-top: 1px;
  }
  .project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
  .project-links { display: flex; gap: 8px; margin-top: auto; flex-wrap: wrap; }
  .btn-disabled {
    display: inline-flex; align-items: center;
    background: rgba(255,255,255,0.02);
    color: var(--text-dim);
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 0.06em;
    padding: 8px 14px; border-radius: var(--r);
    border: 1px dashed var(--border);
    cursor: default; text-decoration: none; white-space: nowrap;
  }

  /* ─── TIMELINE ──────────────────────────────── */
  .timeline { position: relative; }
  .timeline-line {
    position: absolute; left: 14px; top: 6px; bottom: 6px;
    width: 1px;
    background: linear-gradient(to bottom, var(--cyan), transparent 90%);
  }
  .timeline-item {
    position: relative; padding-left: 46px;
    margin-bottom: 44px;
  }
  .timeline-dot {
    position: absolute; left: 7px; top: 5px;
    width: 15px; height: 15px;
    border-radius: 50%;
    background: var(--bg);
    border: 2px solid var(--cyan);
    box-shadow: 0 0 12px var(--cyan-glow), 0 0 0 4px rgba(0,240,200,0.06);
    transition: box-shadow 0.3s;
  }
  .timeline-item:hover .timeline-dot {
    box-shadow: 0 0 18px var(--cyan-glow2), 0 0 0 6px rgba(0,240,200,0.1);
  }
  .timeline-org {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--cyan);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .timeline-role { font-size: 17px; font-weight: 700; color: var(--white); margin-bottom: 3px; }
  .timeline-period {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-dim);
    margin-bottom: 12px;
  }
  .timeline-bullets { list-style: none; }
  .timeline-bullets li {
    font-size: 13.5px; font-weight: 300;
    color: var(--text-mid);
    padding: 3px 0; padding-left: 16px;
    position: relative; line-height: 1.65;
  }
  .timeline-bullets li::before { content: '–'; color: var(--cyan); position: absolute; left: 0; }

  /* ─── CERTIF ────────────────────────────────── */
  .certif-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-top: 28px; }
  .certif-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: var(--r2);
    padding: 16px 20px;
    transition: border-color 0.2s, transform 0.2s;
    position: relative; overflow: hidden;
  }
  .certif-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 2px; background: var(--cyan); opacity: 0.5;
  }
  .certif-card:hover { border-color: var(--border2); transform: translateX(4px); }
  .certif-name { font-size: 13px; font-weight: 600; color: var(--white); margin-bottom: 5px; }
  .certif-status {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--cyan); letter-spacing: 0.07em;
    display: flex; align-items: center; gap: 6px;
  }
  .certif-status::before {
    content: ''; display: block; width: 5px; height: 5px;
    border-radius: 50%; background: var(--amber);
    box-shadow: 0 0 6px var(--amber);
    animation: pulse 2s ease-in-out infinite;
  }

  /* ─── CONTACT ───────────────────────────────── */
  .two-col-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
  @media (max-width: 880px) { .two-col-layout { grid-template-columns: 1fr; gap: 40px; } }

  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
  @media (max-width: 700px) { .contact-grid { grid-template-columns: 1fr; } }

  .contact-row {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
  }
  .contact-row:last-child { border-bottom: none; }
  .contact-label {
    font-family: var(--font-mono);
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-dim);
    min-width: 88px;
    margin-top: 2px;
    flex-shrink: 0;
  }
  .contact-val { font-size: 13.5px; font-weight: 300; color: var(--text); }
  .contact-val a { color: var(--cyan); text-decoration: none; transition: opacity 0.2s; }
  .contact-val a:hover { opacity: 0.75; }

  .pitch-box {
    background: linear-gradient(135deg, rgba(0,240,200,0.05) 0%, rgba(0,180,255,0.03) 50%, transparent);
    border: 1px solid var(--border2);
    border-radius: var(--r3);
    padding: 32px;
    height: 100%;
    display: flex; flex-direction: column; justify-content: center;
    position: relative; overflow: hidden;
  }
  .pitch-box::before {
    content: ''; position: absolute; inset: 0; z-index: 0;
    background: radial-gradient(ellipse at top left, rgba(0,240,200,0.08), transparent 60%);
  }
  .pitch-box > * { position: relative; z-index: 1; }
  .pitch-quote {
    font-size: clamp(16px, 2.2vw, 20px);
    font-weight: 600;
    color: var(--white);
    line-height: 1.5;
    letter-spacing: -0.01em;
  }
  .pitch-quote .hl { color: var(--cyan); }

  /* ─── DIVIDER ───────────────────────────────── */
  .divider { border: none; border-top: 1px solid var(--border); margin: 0; }

  /* ─── FOOTER ────────────────────────────────── */
  footer {
    border-top: 1px solid var(--border);
    padding: 36px clamp(16px, 5vw, 52px);
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
    font-family: var(--font-mono); font-size: 11px; color: var(--text-dim);
    position: relative; z-index: 1;
  }
  footer a { color: var(--text-dim); text-decoration: none; transition: color 0.2s; }
  footer a:hover { color: var(--cyan); }

  /* ─── REVEAL ────────────────────────────────── */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
  .reveal.visible { opacity: 1; transform: none; }

  /* ─── SECTION SPACING ───────────────────────── */
  .py-section { padding: 112px 0; }

  /* ─── STATS ROW ─────────────────────────────── */
  .stats-row {
    display: flex; gap: 0;
    border: 1px solid var(--border);
    border-radius: var(--r2);
    overflow: hidden;
    margin-top: 40px;
  }
  .stat-item {
    flex: 1; padding: 20px 24px;
    border-right: 1px solid var(--border);
    transition: background 0.2s;
  }
  .stat-item:last-child { border-right: none; }
  .stat-item:hover { background: var(--cyan-dim); }
  .stat-num {
    font-family: var(--font-head); font-size: 28px; font-weight: 800;
    color: var(--cyan); line-height: 1;
    margin-bottom: 4px;
  }
  .stat-label { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-dim); }
  @media (max-width: 600px) { .stats-row { flex-direction: column; } .stat-item { border-right: none; border-bottom: 1px solid var(--border); } .stat-item:last-child { border-bottom: none; } }

  /* ─── FILTER BAR ────────────────────────────── */
  .filter-bar { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 40px; }
  .filter-btn {
    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em;
    padding: 7px 16px; border-radius: 999px; cursor: pointer;
    border: 1px solid; transition: all 0.2s;
    white-space: nowrap;
  }

  /* ─── SCROLL PROGRESS ───────────────────────── */
  .scroll-progress {
    position: fixed; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--cyan), #00bfff);
    transform-origin: left;
    z-index: 300;
    transition: transform 0.05s linear;
  }
`;

/* ── DATA ───────────────────────────────────────────────── */
const data = {
  identity: {
    fullname: "NGAHAN Donal Steve",
    nickname: "Steve",
    title: "Technicien Informatique · Candidat Ingénieur Cybersécurité",
    location: "Paris, Île-de-France, France",
    email: "donalngahan466@gmail.com",
    phone: "+33 7 45 30 86 53",
    links: {
      linkedin: "https://www.linkedin.com/in/donal-ngahan/",
      github: "https://github.com/donal034",
      cv: "./DONAL-STEVE-NGAHAN-CV.pdf",
    },
    blurb: "Actuellement en CDI comme Technicien Informatique, je recherche un CDI en ingénierie cybersécurité. Profil orienté sécurité opérationnelle, infrastructures, durcissement, supervision et automatisation des contrôles.",
    photo: "./pp.png",
  },
  skills: [
    { group: "Cybersécurité & Défense", items: ["Pentest & OSINT", "SIEM Wazuh / Splunk / Centreon", "SOAR", "Palo Alto / FortiGate / Stormshield", "Forensique (FTK Imager, Volatility, Autopsy)", "Analyse de malware & threat hunting"] },
    { group: "Sécurité & Gouvernance", items: ["ISO 27001 (audits, Annexes A)", "NIS2 / PSSI", "Compliance as Code (OPA, Rego)", "PKI / IAM / MFA", "Bastion d'accès (Guacamole, Jumpserver)", "Gestion des risques & KPI"] },
    { group: "Infra & Virtualisation", items: ["Windows Server (AD, DNS, DHCP, GPO, WSUS)", "VMware vSphere / ESXi / Hyper-V", "Docker / Kubernetes", "Ansible / Terraform", "GitLab CI/CD", "PRA / PCA / Load balancing"] },
    { group: "Réseau & Périmètre", items: ["VLAN / Routage inter-VLAN", "SD-WAN / MPLS", "VPN IPsec / SSL", "Cisco / Juniper / Meraki", "Wireshark / ELK Stack", "Grafana & Prometheus"] },
    { group: "Programmation & Automatisation", items: ["Python", "PowerShell", "Bash", "GNS3 / Cisco Packet Tracer", "Scripts de collecte & analyse de logs", "Automatisation des processus sécurité"] },
    { group: "Cloud & M365", items: ["AWS (préparation Associate)", "Microsoft 365 Security", "Sécurité SaaS", "Terraform Cloud"] },
  ],
  projects: [
    { id: "cac", num: "01", title: "Compliance as Code — Mémoire & PoC", year: "2025", type: "Mémoire / DevSecOps", summary: "Modèle réutilisable de Compliance as Code pour environnements hybrides (on-prem / cloud). Intégration des contrôles ISO 27001 directement dans la chaîne CI/CD.", highlights: ["Politiques OPA/Rego alignées ISO 27001 Annexes A", "Pipeline GitLab CI avec gates de conformité automatisés", "Cartographie des exigences → contrôles vérifiables", "Rapport de conformité généré automatiquement"], tags: ["Compliance", "OPA/Rego", "Terraform", "GitLab CI", "ISO 27001"], links: { repo: "#", demo: "#" } },
    { id: "bastion", num: "02", title: "Bastion d'accès Sécurisé", year: "2024–2025", type: "Infra / Sécurité", summary: "Déploiement d'un bastion Apache Guacamole pour accès RDP/SSH/HTTP(S) sécurisé avec journalisation intégrale des sessions et contrôle granulaire des durées d'accès.", highlights: ["Apache Guacamole avec reverse proxy HTTPS", "Journalisation des sessions d'administration", "Intégration Active Directory (groupes / rôles)", "Segmentation réseau et politiques d'accès"], tags: ["Bastion", "Guacamole", "RDP/SSH", "Traçabilité"], links: { repo: "#", demo: "#" } },
    { id: "soc", num: "03", title: "SOC — Wazuh & Security Onion", year: "2025", type: "Blue Team / SOC", summary: "Mise en place d'un SOC académique complet : pipeline de collecte de logs, règles de détection personnalisées et playbooks de réponse aux incidents.", highlights: ["Pipeline de logs multi-sources (agents Wazuh)", "Règles de détection sur-mesure (alertes critiques)", "Playbooks de réponse aux incidents documentés", "Tableaux de bord Kibana / Security Onion"], tags: ["Wazuh", "Security Onion", "SIEM", "Blue Team"], links: { repo: "#", demo: "#" } },
    { id: "stanley", num: "04", title: "Cyber Range Stanley — IA attaque/défense", year: "2025", type: "Red/Blue Team", summary: "Conception d'un cyber range avec agents IA pour orchestrer des scénarios d'attaque et de défense. KPIs mesurés, rapport de synthèse produit à l'issue de chaque session.", highlights: ["Orchestration IA des scénarios Red/Blue Team", "Automatisation de la détection & réponse", "KPIs : MTTD, MTTR, taux de détection", "Rapport de synthèse post-exercice"], tags: ["IA", "Red Team", "Blue Team", "Simulation"], links: { repo: "#", demo: "#" } },
    { id: "pentest", num: "05", title: "Pentest CTF — DVWA / OWASP / Root-Me / HTB", year: "2024–2025", type: "Offensif", summary: "Exploitation contrôlée de plateformes CTF et d'environnements vulnérables. Reporting professionnel avec preuves, analyse des vulnérabilités et recommandations de remédiations.", highlights: ["DVWA, OWASP Juice Shop, Root-Me, TryHackMe, HackTheBox", "OWASP Top 10 : SQLi, XSS, IDOR, SSRF…", "Reporting et remédiations documentés", "OSINT & reconnaissance"], tags: ["Pentest", "CTF", "OWASP", "OSINT"], links: { repo: "#", demo: "#" } },
    { id: "forensic", num: "06", title: "Forensique & Analyse de Malware", year: "2024–2025", type: "Forensique", summary: "Analyse forensique de systèmes compromis : timeline d'événements, extraction d'IOCs et identification d'artefacts malveillants avec les outils standards de l'industrie.", highlights: ["Analyse mémoire avec Volatility", "Investigation disque avec Autopsy", "Décodage et analyse avec CyberChef", "Timeline des événements, extraction d'IOCs"], tags: ["Volatility", "Autopsy", "CyberChef", "IOC", "Forensique"], links: { repo: "#", demo: "#" } },
  ],
  experience: [
    { org: "DOMPRO", role: "Technicien Informatique (CDI)", period: "03/2026 – Aujourd'hui · Paris, France", bullets: ["Administration et support des environnements Windows, postes utilisateurs et services d'infrastructure", "Traitement des incidents, demandes et escalades avec une logique qualité de service", "Contribution au durcissement des accès, au suivi des vulnérabilités et à la sécurité opérationnelle", "Supervision de l'infrastructure et participation aux contrôles techniques de sécurité", "Gestion des environnements AD, DNS, DHCP, GPO, VMware et outillage IT", "Rédaction de procédures, support utilisateurs et amélioration continue de l'exploitation"] },
    { org: "B.E.C LA ROUTIÈRE", role: "Technicien Réseaux & Sécurité (Stage)", period: "05/2023 – 07/2023 · Yaoundé, Cameroun", bullets: ["Installation des serveurs, déploiement des services ADDS, DNS, DHCP", "Gestion des utilisateurs, groupes et droits d'accès", "Configuration des GPO et des pare-feu Windows"] },
    { org: "INFO-SERVICE", role: "Ingénieur Réseaux Informatiques", period: "01/2021 – 01/2022 · Yaoundé, Cameroun", bullets: ["Surveillance continue du trafic réseau, analyse avec Wireshark", "Développement de scripts Python/Bash pour la collecte et l'analyse de logs", "Gestion des vulnérabilités et traitement des incidents de sécurité", "Supervision de l'infrastructure avec Nagios et SolarWinds"] },
  ],
  education: [
    { school: "HETIC", degree: "Master Cybersécurité", period: "2024 – 2025 · Paris, France" },
    { school: "École IT", degree: "Architecture Réseaux, Systèmes & Cybersécurité", period: "2022 – 2024 · Orléans, France" },
    { school: "IAI", degree: "Licence Administration Systèmes & Réseaux", period: "2017 – 2020 · Yaoundé, Cameroun" },
  ],
  certifications: [
    { name: "AWS Solutions Architect", status: "En préparation" },
    { name: "Microsoft 365", status: "En préparation" },
    { name: "Anglais professionnel", status: "En progression" },
  ],
};

/* ── HOOKS ──────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? el.scrollTop / total : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return progress;
}

function useActiveSection() {
  const [active, setActive] = useState('accueil');
  useEffect(() => {
    const ids = ['accueil', 'competences', 'projets', 'parcours', 'contact'];
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return scrolled;
}

/* ── TYPEWRITER ─────────────────────────────────────────── */
function Typewriter({ lines, speed = 38 }) {
  const [display, setDisplay] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    if (charIdx < line.text.length) {
      const t = setTimeout(() => {
        setDisplay(prev => {
          const next = [...prev];
          if (!next[lineIdx]) next[lineIdx] = { ...line, text: '' };
          next[lineIdx] = { ...next[lineIdx], text: next[lineIdx].text + line.text[charIdx] };
          return next;
        });
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }, 220);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, lines, speed]);

  return (
    <>
      {display.map((l, i) => (
        <div key={i}>
          {l.prompt && <span className="t-prompt">{l.prompt}&nbsp;</span>}
          <span className={l.cls || 't-cmd'}>{l.text}</span>
        </div>
      ))}
      {lineIdx < lines.length && <span className="t-cursor" />}
    </>
  );
}

/* ── COMPONENTS ─────────────────────────────────────────── */
function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
  );
}

function Navbar() {
  const active = useActiveSection();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#competences', label: 'Compétences', id: 'competences' },
    { href: '#projets', label: 'Projets', id: 'projets' },
    { href: '#parcours', label: 'Parcours', id: 'parcours' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#accueil" className="nav-logo">
          <span className="nav-logo-bracket">[</span>
          steve.ngahan
          <span className="nav-logo-bracket">]</span>
          <span className="nav-logo-cursor" />
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.id} href={l.href} className={`nav-link${active === l.id ? ' active' : ''}`}>
              {l.label}
            </a>
          ))}
        </div>
        <button
          className={`nav-burger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {links.map(l => (
          <a key={l.id} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
      </div>
    </>
  );
}

const termLines = [
  { prompt: '❯', text: 'whoami', cls: 't-cmd' },
  { text: 'NGAHAN Donal Steve', cls: 't-val' },
  { prompt: '❯', text: 'cat role.txt', cls: 't-cmd' },
  { text: 'Technicien Informatique → Ingénieur Cybersécurité', cls: 't-output' },
  { prompt: '❯', text: 'status --check', cls: 't-cmd' },
  { text: '● CDI actif', cls: 't-green' },
  { text: '○ Ouvert aux opportunités CDI cybersécurité', cls: 't-amber' },
  { prompt: '❯', text: 'skills --top 3', cls: 't-cmd' },
  { text: '1. SIEM / SOC / Blue Team', cls: 't-output' },
  { text: '2. ISO 27001 / Compliance as Code', cls: 't-output' },
  { text: '3. Infra sécurisée / Bastion / AD', cls: 't-output' },
];

function Hero() {
  return (
    <section id="accueil">
      <div className="container">
        <div className="hero-wrap">
          <div>
            <div className="hero-kicker">
              <div className="hero-kicker-line" />
              <span className="status-dot">En poste · Ouvert aux opportunités CDI cybersécurité</span>
            </div>
            <h1 className="hero-name">
              Donal<br /><span className="dim">Steve</span><br /><span className="accent">Ngahan</span>
            </h1>
            <p className="hero-sub">
              <span className="hl">// </span>{data.identity.title}<br />
              <span className="hl">// </span>{data.identity.location}
            </p>
            <p className="hero-blurb">{data.identity.blurb}</p>
            <div className="hero-badges">
              <span className="badge">CDI actuel · Technicien Informatique</span>
              <span className="badge">Cible · Ingénieur Cybersécurité</span>
              <span className="badge">SIEM / SOC</span>
              <span className="badge">ISO 27001</span>
              <span className="badge">Compliance as Code</span>
            </div>
            <div className="hero-ctas">
              <a href={`mailto:${data.identity.email}`} className="btn-primary" aria-label="Envoyer un e-mail à Steve">
                ✉ Me contacter
              </a>
              <a href={data.identity.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                LinkedIn ↗
              </a>
              <a href={data.identity.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                GitHub ↗
              </a>
              <a href={data.identity.links.cv} className="btn-ghost">
                CV ↓
              </a>
            </div>

            <div className="stats-row" style={{ maxWidth: 520 }}>
              {[
                { num: '5+', label: 'Ans d\'expérience' },
                { num: '6', label: 'Projets cyber' },
                { num: 'M2', label: 'Master HETIC' },
              ].map(s => (
                <div className="stat-item" key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="photo-frame">
              <img src={data.identity.photo} alt="NGAHAN Donal Steve" />
              <div className="photo-badge">
                <span className="photo-badge-dot">●</span> Master Cybersécurité<br />
                HETIC · Paris · 2025
              </div>
              <div className="photo-corner tl" />
              <div className="photo-corner tr" />
              <div className="photo-corner bl" />
              <div className="photo-corner br" />
            </div>

            <div className="terminal" style={{ marginTop: 28 }}>
              <div className="terminal-bar">
                <span className="terminal-dot red" />
                <span className="terminal-dot amber" />
                <span className="terminal-dot green" />
                <span className="terminal-title">steve@portfolio ~ zsh</span>
              </div>
              <div className="terminal-body">
                <Typewriter lines={termLines} speed={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  useReveal();
  return (
    <section id="competences" className="py-section">
      <hr className="divider" />
      <div className="container" style={{ paddingTop: '96px' }}>
        <div className="section-header reveal">
          <div className="section-kicker">Compétences</div>
          <h2 className="section-title">Ce que je maîtrise</h2>
          <p className="section-sub">Compétences construites entre administration système, sécurité opérationnelle, supervision, réseau, gouvernance et automatisation. Positionnement actuel : évoluer vers un CDI d'ingénieur cybersécurité.</p>
        </div>
        <div className="skills-grid">
          {data.skills.map((g, i) => (
            <div className="card reveal" key={g.group} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="skill-card-title">{g.group}</div>
              <div className="skill-tags">
                {g.items.map(it => <span className="tag" key={it}>{it}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState(null);
  const allTags = [...new Set(data.projects.flatMap(p => p.tags))];
  const filtered = filter ? data.projects.filter(p => p.tags.includes(filter)) : data.projects;

  return (
    <section id="projets" className="py-section">
      <hr className="divider" />
      <div className="container" style={{ paddingTop: '96px' }}>
        <div className="section-header reveal">
          <div className="section-kicker">Projets</div>
          <h2 className="section-title">Travaux & Réalisations</h2>
          <p className="section-sub">Projets menés en entreprise, en académique et en autodidacte. Les réalisations montrent mon niveau technique actuel et ma capacité à évoluer vers un poste d'ingénieur cybersécurité.</p>
        </div>

        <div className="filter-bar reveal">
          <button
            className="filter-btn"
            onClick={() => setFilter(null)}
            style={{
              background: filter === null ? 'var(--cyan)' : 'transparent',
              color: filter === null ? 'var(--bg)' : 'var(--text-mid)',
              borderColor: filter === null ? 'var(--cyan)' : 'var(--border)',
            }}
          >Tous</button>
          {allTags.map(t => (
            <button
              key={t}
              className="filter-btn"
              onClick={() => setFilter(filter === t ? null : t)}
              style={{
                background: filter === t ? 'var(--cyan)' : 'transparent',
                color: filter === t ? 'var(--bg)' : 'var(--text-mid)',
                borderColor: filter === t ? 'var(--cyan)' : 'var(--border)',
              }}
            >{t}</button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((p, i) => (
            <div className="card project-card reveal" key={p.id} style={{ transitionDelay: `${i * 55}ms` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span className="project-num">{p.num}</span>
                  <span style={{ color: 'var(--border2)' }}>·</span>
                  <span className="project-type">{p.type}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-dim)' }}>{p.year}</span>
              </div>
              <div className="project-title">{p.title}</div>
              <div className="project-summary">{p.summary}</div>
              <ul className="project-highlights">
                {p.highlights.map(h => <li key={h}>{h}</li>)}
              </ul>
              <div className="project-tags">
                {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
              <div className="project-links">
                {p.links.demo !== "#"
                  ? <a href={p.links.demo} className="btn-ghost" style={{ fontSize: '10px', padding: '7px 14px' }}>Aperçu</a>
                  : <span className="btn-disabled">Démo sur demande</span>}
                {p.links.repo !== "#"
                  ? <a href={p.links.repo} className="btn-ghost" style={{ fontSize: '10px', padding: '7px 14px' }}>Code</a>
                  : <span className="btn-disabled">Code sur demande</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="parcours" className="py-section">
      <hr className="divider" />
      <div className="container" style={{ paddingTop: '96px' }}>
        <div className="section-header reveal">
          <div className="section-kicker">Parcours</div>
          <h2 className="section-title">Expériences & Formation</h2>
        </div>

        <div className="two-col-layout">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '32px' }}>
              &gt; Expériences professionnelles
            </div>
            <div className="timeline reveal">
              <div className="timeline-line" />
              {data.experience.map((e, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-dot" />
                  <div className="timeline-org">{e.org}</div>
                  <div className="timeline-role">{e.role}</div>
                  <div className="timeline-period">{e.period}</div>
                  <ul className="timeline-bullets">
                    {e.bullets.map(b => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '32px' }}>
              &gt; Formation
            </div>
            <div className="timeline reveal">
              <div className="timeline-line" />
              {data.education.map((ed, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-dot" />
                  <div className="timeline-org">{ed.school}</div>
                  <div className="timeline-role">{ed.degree}</div>
                  <div className="timeline-period">{ed.period}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '52px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '8px' }}>
                &gt; Certifications en cours
              </div>
              <div className="certif-grid reveal">
                {data.certifications.map(c => (
                  <div className="certif-card" key={c.name}>
                    <div className="certif-name">{c.name}</div>
                    <div className="certif-status">{c.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-section">
      <hr className="divider" />
      <div className="container" style={{ paddingTop: '96px' }}>
        <div className="section-header reveal">
          <div className="section-kicker">Contact</div>
          <h2 className="section-title">Travaillons ensemble</h2>
          <p className="section-sub">Je suis actuellement en CDI comme Technicien Informatique et j'étudie des opportunités de CDI en ingénierie cybersécurité, sécurité opérationnelle, Blue Team, GRC technique ou ingénierie sécurité.</p>
        </div>

        <div className="contact-grid">
          <div className="card reveal">
            <div className="contact-row">
              <span className="contact-label">E-mail</span>
              <span className="contact-val"><a href={`mailto:${data.identity.email}`}>{data.identity.email}</a></span>
            </div>
            <div className="contact-row">
              <span className="contact-label">Téléphone</span>
              <span className="contact-val"><a href={`tel:${data.identity.phone}`}>{data.identity.phone}</a></span>
            </div>
            <div className="contact-row">
              <span className="contact-label">Localisation</span>
              <span className="contact-val">{data.identity.location}</span>
            </div>
            <div className="contact-row">
              <span className="contact-label">Disponibilité</span>
              <span className="contact-val"><span className="status-dot">En poste · Ouvert aux opportunités CDI</span></span>
            </div>
            <div className="contact-row">
              <span className="contact-label">Langues</span>
              <span className="contact-val">Français (natif) · Anglais (B1, en progression)</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
              <a href={data.identity.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '10px', padding: '10px 20px' }}>LinkedIn ↗</a>
              <a href={data.identity.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '10px', padding: '10px 20px' }}>GitHub ↗</a>
              <a href={data.identity.links.cv} className="btn-ghost" style={{ fontSize: '10px', padding: '10px 20px' }}>Télécharger CV ↓</a>
            </div>
          </div>

          <div className="pitch-box reveal">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyan)', marginBottom: '18px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              // vision
            </div>
            <div className="pitch-quote">
              « Rendre l'<span className="hl">IA défensive</span> au moins aussi performante que l'<span className="hl">IA offensive</span> — et ancrer la sécurité dans l'industrialisation : politiques codifiées, contrôles automatisés, traçabilité bout-en-bout. »
            </div>
            <div style={{ marginTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span className="badge">Compliance as Code</span>
              <span className="badge">DevSecOps</span>
              <span className="badge">Blue Team</span>
              <span className="badge">IA Défensive</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <span>© {new Date().getFullYear()} Steve Ngahan — Portfolio cybersécurité.</span>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <a href={data.identity.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={data.identity.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="#accueil">↑ Haut</a>
      </div>
    </footer>
  );
}

/* ── APP ───────────────────────────────────────────────── */
function PortfolioSteve() {
  useReveal();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <ScrollProgress />
      <div className="orb1" />
      <div className="orb2" />
      <div className="scanlines" />
      <div className="noise" />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PortfolioSteve />);
