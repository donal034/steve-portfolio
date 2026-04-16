// Portfolio — NGAHAN Donal Steve — GitHub Pages (no build)
const { useState, useEffect, useRef } = React;

/* ── DESIGN TOKENS ─────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #080c14;
    --bg2:      #0d1421;
    --bg3:      #111827;
    --border:   rgba(0,240,200,0.12);
    --border2:  rgba(0,240,200,0.25);
    --cyan:     #00f0c8;
    --cyan-dim: rgba(0,240,200,0.15);
    --cyan-glow:rgba(0,240,200,0.35);
    --text:     #e2e8f0;
    --text-dim: #8ea0b8;
    --text-mid: #c7d2e0;
    --white:    #f8fafc;
    --panel:    rgba(13,20,33,0.92);
    --font-mono: 'Space Mono', monospace;
    --font-head: 'Syne', sans-serif;
    --r: 12px;
    --r2: 20px;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-head);
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }
  #root, main { background: var(--bg); min-height: 100vh; }

  a:focus-visible, button:focus-visible {
    outline: 2px solid var(--cyan);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
    }
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

  /* GRID OVERLAY */
  .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%);
  }

  /* NAVBAR */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    backdrop-filter: blur(20px);
    background: rgba(8,12,20,0.85);
    border-bottom: 1px solid var(--border);
    height: 58px;
    display: flex; align-items: center;
    padding: 0 clamp(16px, 5vw, 48px);
    justify-content: space-between;
  }
  .nav-logo {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--cyan);
    letter-spacing: 0.05em;
    text-decoration: none;
  }
  .nav-logo span { color: var(--text-dim); }
  .nav-links { display: flex; gap: 28px; }
  .nav-links a {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-mid);
    text-decoration: none;
    transition: color 0.2s;
    position: relative;
  }
  .nav-links a:hover { color: var(--cyan); }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
    height: 1px; background: var(--cyan); transform: scaleX(0);
    transform-origin: left; transition: transform 0.2s;
  }
  .nav-links a:hover::after { transform: scaleX(1); }

  @media (max-width: 600px) {
    .nav {
      height: auto;
      min-height: 58px;
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;
      padding-top: 12px;
      padding-bottom: 12px;
    }
    .nav-links {
      display: flex;
      width: 100%;
      overflow-x: auto;
      gap: 18px;
      padding-bottom: 4px;
      scrollbar-width: none;
    }
    .nav-links::-webkit-scrollbar { display: none; }
  }

  /* SECTIONS */
  section { position: relative; z-index: 1; }
  .container { max-width: 1100px; margin: 0 auto; padding: 0 clamp(16px, 5vw, 48px); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 48px;
    align-items: center;
    padding-top: 58px;
  }
  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr; padding-top: 96px; min-height: auto; }
    .hero-photo { display: block; max-width: 260px; margin: 16px auto 0; }
    .photo-frame { width: 260px; height: 300px; }
    .photo-badge { right: -8px; bottom: -10px; }
  }

  .hero-kicker {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--cyan);
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 20px;
  }
  .hero-kicker::before {
    content: ''; display: block;
    width: 32px; height: 1px; background: var(--cyan);
  }

  .hero-name {
    font-family: var(--font-head);
    font-size: clamp(42px, 7vw, 80px);
    font-weight: 800;
    line-height: 1.0;
    color: var(--white);
    letter-spacing: -0.02em;
  }
  .hero-name .accent { color: var(--cyan); }

  .hero-title {
    font-family: var(--font-mono);
    font-size: clamp(12px, 1.5vw, 15px);
    color: var(--text-mid);
    margin-top: 16px;
    line-height: 1.7;
  }

  .hero-blurb {
    margin-top: 24px;
    font-size: 17px;
    color: var(--text);
    max-width: 540px;
    line-height: 1.7;
    font-weight: 400;
  }

  .hero-badges {
    display: flex; flex-wrap: wrap; gap: 10px;
    margin-top: 28px;
  }

  .hero-ctas {
    display: flex; flex-wrap: wrap; gap: 12px;
    margin-top: 32px;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--cyan); color: #080c14;
    font-family: var(--font-mono); font-size: 12px;
    font-weight: 700; letter-spacing: 0.08em;
    padding: 12px 24px; border-radius: var(--r);
    text-decoration: none; transition: all 0.2s;
    border: none; cursor: pointer;
  }
  .btn-primary:hover { background: #00ffd5; transform: translateY(-1px); box-shadow: 0 8px 24px var(--cyan-glow); }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--text);
    font-family: var(--font-mono); font-size: 12px;
    letter-spacing: 0.08em;
    padding: 12px 24px; border-radius: var(--r);
    text-decoration: none; transition: all 0.2s;
    border: 1px solid var(--border2); cursor: pointer;
  }
  .btn-ghost:hover { border-color: var(--cyan); color: var(--cyan); }

  /* PHOTO */
  .hero-photo {
    position: relative;
  }
  .photo-frame {
    position: relative;
    width: 320px; height: 380px;
    margin: 0 auto;
  }
  .photo-frame::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 24px;
    background: linear-gradient(135deg, var(--cyan), transparent 60%);
    z-index: 0;
  }
  .photo-frame img {
    position: relative; z-index: 1;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center top;
    border-radius: 22px;
    display: block;
  }
  .photo-badge {
    position: absolute;
    bottom: -14px; right: -14px;
    background: var(--bg2);
    border: 1px solid var(--border2);
    border-radius: var(--r);
    padding: 10px 14px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--cyan);
    z-index: 2;
  }

  /* STATUS DOT */
  .status-dot {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--font-mono); font-size: 11px;
    color: var(--text-mid);
  }
  .status-dot::before {
    content: ''; display: block;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 8px #22c55e;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
  }

  /* BADGE */
  .badge {
    display: inline-flex; align-items: center;
    background: var(--cyan-dim);
    border: 1px solid var(--border2);
    color: var(--cyan);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.06em;
    padding: 4px 10px;
    border-radius: 999px;
    white-space: nowrap;
  }

  .tag {
    display: inline-flex; align-items: center;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    color: var(--text-mid);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.05em;
    padding: 3px 9px;
    border-radius: 999px;
    white-space: nowrap;
  }

  /* SECTION HEADER */
  .section-kicker {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--cyan);
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 12px;
  }
  .section-kicker::before {
    content: '//'; color: var(--text-dim); font-size: 12px;
  }
  .section-title {
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 800;
    color: var(--white);
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-shadow: 0 0 1px rgba(0,0,0,0.45);
  }
  .section-sub {
    margin-top: 12px;
    color: var(--text-mid);
    max-width: 680px;
    font-size: 15px;
    line-height: 1.7;
  }
  .section-header { margin-bottom: 48px; }

  /* CARD */
  .card {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: var(--r2);
    padding: 24px;
    transition: border-color 0.2s, transform 0.2s;
    position: relative; overflow: hidden;
    backdrop-filter: blur(6px);
  }
  .card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--cyan-glow), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .card:hover { border-color: var(--border2); transform: translateY(-2px); }
  .card:hover::before { opacity: 1; }

  /* SKILLS GRID */
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }

  .skill-card-title {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--cyan);
    margin-bottom: 14px;
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }

  /* PROJECTS GRID */
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }

  .project-card {
    display: flex; flex-direction: column;
    height: 100%;
  }
  .project-num {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-dim);
    margin-bottom: 8px;
  }
  .project-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--white);
    line-height: 1.3;
    margin-bottom: 10px;
  }
  .project-summary {
    font-size: 14px;
    color: var(--text-mid);
    line-height: 1.65;
    flex: 1;
    margin-bottom: 16px;
  }
  .project-highlights {
    list-style: none;
    margin-bottom: 16px;
  }
  .project-highlights li {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text);
    padding: 4px 0;
    display: flex; align-items: flex-start; gap: 8px;
  }
  .project-highlights li::before {
    content: '→'; color: var(--cyan); flex-shrink: 0; margin-top: 1px;
  }
  .project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
  .project-links { display: flex; gap: 10px; margin-top: auto; flex-wrap: wrap; }
  .btn-disabled {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.03);
    color: var(--text-dim);
    font-family: var(--font-mono); font-size: 11px;
    letter-spacing: 0.08em;
    padding: 8px 16px; border-radius: var(--r);
    border: 1px dashed var(--border2); cursor: default;
    text-decoration: none;
  }

  /* TIMELINE */
  .timeline { position: relative; }
  .timeline-line {
    position: absolute; left: 15px; top: 8px; bottom: 8px;
    width: 1px;
    background: linear-gradient(to bottom, var(--cyan), transparent);
  }
  .timeline-item {
    position: relative; padding-left: 44px;
    margin-bottom: 40px;
  }
  .timeline-dot {
    position: absolute; left: 8px; top: 6px;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: var(--bg);
    border: 2px solid var(--cyan);
    box-shadow: 0 0 8px var(--cyan-glow);
  }
  .timeline-org {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--cyan);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .timeline-role {
    font-size: 17px;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 4px;
  }
  .timeline-period {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-dim);
    margin-bottom: 12px;
  }
  .timeline-bullets { list-style: none; }
  .timeline-bullets li {
    font-size: 14px;
    color: var(--text-mid);
    padding: 3px 0;
    padding-left: 16px;
    position: relative;
    line-height: 1.6;
  }
  .timeline-bullets li::before {
    content: '–'; color: var(--cyan);
    position: absolute; left: 0;
  }

  /* CERTIF */
  .certif-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; margin-top: 32px; }
  .certif-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: var(--r);
    padding: 16px 20px;
    transition: border-color 0.2s;
  }
  .certif-card:hover { border-color: var(--border2); }
  .certif-name { font-size: 14px; font-weight: 600; color: var(--white); margin-bottom: 4px; }
  .certif-status {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--cyan); letter-spacing: 0.06em;
  }

  /* CONTACT */
  .two-col-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
  @media (max-width: 880px) { .two-col-layout { grid-template-columns: 1fr; gap: 40px; } }

  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 700px) { .contact-grid { grid-template-columns: 1fr; } }

  .contact-row {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
  }
  .contact-row:last-child { border-bottom: none; }
  .contact-label {
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-dim);
    min-width: 90px;
    margin-top: 2px;
  }
  .contact-val { font-size: 14px; color: var(--text); }
  .contact-val a { color: var(--cyan); text-decoration: none; }
  .contact-val a:hover { text-decoration: underline; }

  /* PITCH BOX */
  .pitch-box {
    background: linear-gradient(135deg, rgba(0,240,200,0.06), transparent);
    border: 1px solid var(--border2);
    border-radius: var(--r2);
    padding: 28px;
    height: 100%;
    display: flex; flex-direction: column; justify-content: center;
  }
  .pitch-quote {
    font-size: 22px;
    font-weight: 700;
    color: var(--white);
    line-height: 1.4;
    letter-spacing: -0.01em;
  }
  .pitch-quote .hl { color: var(--cyan); }

  /* FOOTER */
  footer {
    border-top: 1px solid var(--border);
    padding: 32px clamp(16px, 5vw, 48px);
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
    font-family: var(--font-mono); font-size: 11px; color: var(--text-dim);
    position: relative; z-index: 1;
  }
  footer a { color: var(--cyan); text-decoration: none; }

  /* REVEAL */
  .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s, transform 0.6s; }
  .reveal.visible { opacity: 1; transform: none; }

  /* DIVIDER */
  .divider { border: none; border-top: 1px solid var(--border); margin: 0; }

  /* SECTION SPACING */
  .py-section { padding: 96px 0; }
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
    {
      group: "Cybersécurité & Défense",
      items: ["Pentest & OSINT", "SIEM Wazuh / Splunk / Centreon", "SOAR", "Palo Alto / FortiGate / Stormshield", "Forensique (FTK Imager, Volatility, Autopsy)", "Analyse de malware & threat hunting"],
    },
    {
      group: "Sécurité & Gouvernance",
      items: ["ISO 27001 (audits, Annexes A)", "NIS2 / PSSI", "Compliance as Code (OPA, Rego)", "PKI / IAM / MFA", "Bastion d'accès (Guacamole, Jumpserver)", "Gestion des risques & KPI"],
    },
    {
      group: "Infra & Virtualisation",
      items: ["Windows Server (AD, DNS, DHCP, GPO, WSUS)", "VMware vSphere / ESXi / Hyper-V", "Docker / Kubernetes", "Ansible / Terraform", "GitLab CI/CD", "PRA / PCA / Load balancing"],
    },
    {
      group: "Réseau & Périmètre",
      items: ["VLAN / Routage inter-VLAN", "SD-WAN / MPLS", "VPN IPsec / SSL", "Cisco / Juniper / Meraki", "Wireshark / ELK Stack", "Grafana & Prometheus"],
    },
    {
      group: "Programmation & Automatisation",
      items: ["Python", "PowerShell", "Bash", "GNS3 / Cisco Packet Tracer", "Scripts de collecte & analyse de logs", "Automatisation des processus sécurité"],
    },
    {
      group: "Cloud & M365",
      items: ["AWS (préparation Associate)", "Microsoft 365 Security", "Sécurité SaaS", "Terraform Cloud"],
    },
  ],
  projects: [
    {
      id: "cac",
      num: "01",
      title: "Compliance as Code — Mémoire & PoC",
      year: "2025",
      type: "Mémoire / DevSecOps",
      summary: "Modèle réutilisable de Compliance as Code pour environnements hybrides (on-prem / cloud). Intégration des contrôles ISO 27001 directement dans la chaîne CI/CD.",
      highlights: [
        "Politiques OPA/Rego alignées ISO 27001 Annexes A",
        "Pipeline GitLab CI avec gates de conformité automatisés",
        "Cartographie des exigences → contrôles vérifiables",
        "Rapport de conformité généré automatiquement",
      ],
      tags: ["Compliance", "OPA/Rego", "Terraform", "GitLab CI", "ISO 27001"],
      links: { repo: "#", demo: "#" },
    },
    {
      id: "bastion",
      num: "02",
      title: "Bastion d'accès Sécurisé",
      year: "2024–2025",
      type: "Infra / Sécurité",
      summary: "Déploiement d'un bastion Apache Guacamole pour accès RDP/SSH/HTTP(S) sécurisé avec journalisation intégrale des sessions et contrôle granulaire des durées d'accès.",
      highlights: [
        "Apache Guacamole avec reverse proxy HTTPS",
        "Journalisation des sessions d'administration",
        "Intégration Active Directory (groupes / rôles)",
        "Segmentation réseau et politiques d'accès",
      ],
      tags: ["Bastion", "Guacamole", "RDP/SSH", "Traçabilité"],
      links: { repo: "#", demo: "#" },
    },
    {
      id: "soc",
      num: "03",
      title: "SOC — Wazuh & Security Onion",
      year: "2025",
      type: "Blue Team / SOC",
      summary: "Mise en place d'un SOC académique complet : pipeline de collecte de logs, règles de détection personnalisées et playbooks de réponse aux incidents.",
      highlights: [
        "Pipeline de logs multi-sources (agents Wazuh)",
        "Règles de détection sur-mesure (alertes critiques)",
        "Playbooks de réponse aux incidents documentés",
        "Tableaux de bord Kibana / Security Onion",
      ],
      tags: ["Wazuh", "Security Onion", "SIEM", "Blue Team"],
      links: { repo: "#", demo: "#" },
    },
    {
      id: "stanley",
      num: "04",
      title: "Cyber Range Stanley — IA attaque/défense",
      year: "2025",
      type: "Red/Blue Team",
      summary: "Conception d'un cyber range avec agents IA pour orchestrer des scénarios d'attaque et de défense. KPIs mesurés, rapport de synthèse produit à l'issue de chaque session.",
      highlights: [
        "Orchestration IA des scénarios Red/Blue Team",
        "Automatisation de la détection & réponse",
        "KPIs : MTTD, MTTR, taux de détection",
        "Rapport de synthèse post-exercice",
      ],
      tags: ["IA", "Red Team", "Blue Team", "Simulation"],
      links: { repo: "#", demo: "#" },
    },
    {
      id: "pentest",
      num: "05",
      title: "Pentest CTF — DVWA / OWASP / Root-Me / HTB",
      year: "2024–2025",
      type: "Offensif",
      summary: "Exploitation contrôlée de plateformes CTF et d'environnements vulnérables. Reporting professionnel avec preuves, analyse des vulnérabilités et recommandations de remédiations.",
      highlights: [
        "DVWA, OWASP Juice Shop, Root-Me, TryHackMe, HackTheBox",
        "OWASP Top 10 : SQLi, XSS, IDOR, SSRF…",
        "Reporting et remédiations documentés",
        "OSINT & reconnaissance",
      ],
      tags: ["Pentest", "CTF", "OWASP", "OSINT"],
      links: { repo: "#", demo: "#" },
    },
    {
      id: "forensic",
      num: "06",
      title: "Forensique & Analyse de Malware",
      year: "2024–2025",
      type: "Forensique",
      summary: "Analyse forensique de systèmes compromis : timeline d'événements, extraction d'IOCs et identification d'artefacts malveillants avec les outils standards de l'industrie.",
      highlights: [
        "Analyse mémoire avec Volatility",
        "Investigation disque avec Autopsy",
        "Décodage et analyse avec CyberChef",
        "Timeline des événements, extraction d'IOCs",
      ],
      tags: ["Volatility", "Autopsy", "CyberChef", "IOC", "Forensique"],
      links: { repo: "#", demo: "#" },
    },
  ],
  experience: [
    {
      org: "DOMPRO",
      role: "Technicien Informatique (CDI)",
      period: "03/2026 – Aujourd'hui · Paris, France",
      bullets: [
        "Administration et support des environnements Windows, postes utilisateurs et services d'infrastructure",
        "Traitement des incidents, demandes et escalades avec une logique qualité de service",
        "Contribution au durcissement des accès, au suivi des vulnérabilités et à la sécurité opérationnelle",
        "Supervision de l'infrastructure et participation aux contrôles techniques de sécurité",
        "Gestion des environnements AD, DNS, DHCP, GPO, VMware et outillage IT",
        "Rédaction de procédures, support utilisateurs et amélioration continue de l'exploitation",
      ],
    },
    {
      org: "B.E.C LA ROUTIÈRE",
      role: "Technicien Réseaux & Sécurité (Stage)",
      period: "05/2023 – 07/2023 · Yaoundé, Cameroun",
      bullets: [
        "Installation des serveurs, déploiement des services ADDS, DNS, DHCP",
        "Gestion des utilisateurs, groupes et droits d'accès",
        "Configuration des GPO et des pare-feu Windows",
      ],
    },
    {
      org: "INFO-SERVICE",
      role: "Ingénieur Réseaux Informatiques",
      period: "01/2021 – 01/2022 · Yaoundé, Cameroun",
      bullets: [
        "Surveillance continue du trafic réseau, analyse avec Wireshark",
        "Développement de scripts Python/Bash pour la collecte et l'analyse de logs",
        "Gestion des vulnérabilités et traitement des incidents de sécurité",
        "Supervision de l'infrastructure avec Nagios et SolarWinds",
      ],
    },
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
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── COMPONENTS ─────────────────────────────────────────── */
function Navbar() {
  return (
    <nav className="nav">
      <a href="#accueil" className="nav-logo">
        <span>// </span>steve.ngahan
      </a>
      <div className="nav-links">
        <a href="#competences">Compétences</a>
        <a href="#projets">Projets</a>
        <a href="#parcours">Parcours</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="accueil">
      <div className="container">
        <div className="hero">
          <div>
            <div className="hero-kicker">
              <span className="status-dot">En poste · Ouvert aux opportunités CDI en cybersécurité</span>
            </div>
            <h1 className="hero-name">
              Donal<br /><span className="accent">Steve</span><br />Ngahan
            </h1>
            <p className="hero-title">
              {data.identity.title}<br />
              {data.identity.location}
            </p>
            <p className="hero-blurb">{data.identity.blurb}</p>
            <div className="hero-badges">
              <span className="badge">CDI actuel · Technicien Informatique</span>
              <span className="badge">Cible · Ingénieur Cybersécurité</span>
              <span className="badge">SIEM / SOC</span>
              <span className="badge">Bastion d'accès</span>
              <span className="badge">ISO 27001</span>
              <span className="badge">Compliance as Code</span>
            </div>
            <div className="hero-ctas">
              <a href={`mailto:${data.identity.email}`} className="btn-primary" aria-label="Envoyer un e-mail à Steve">
                ✉ Me contacter
              </a>
              <a href={data.identity.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost" aria-label="Ouvrir le profil LinkedIn de Steve">
                LinkedIn ↗
              </a>
              <a href={data.identity.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" aria-label="Ouvrir le GitHub de Steve">
                GitHub ↗
              </a>
              <a href={data.identity.links.cv} className="btn-ghost" aria-label="Télécharger le CV de Steve">
                Télécharger mon CV ↓
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <div className="photo-frame">
              <img src={data.identity.photo} alt="NGAHAN Donal Steve" />
              <div className="photo-badge">
                🛡 Master Cybersécurité<br />HETIC · 2025
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
            <div className={`card reveal`} key={g.group} style={{ transitionDelay: `${i * 60}ms` }}>
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

        {/* Filter bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }} className="reveal">
          <button
            onClick={() => setFilter(null)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.06em',
              padding: '6px 14px', borderRadius: '999px', cursor: 'pointer',
              border: '1px solid', transition: 'all 0.2s',
              background: filter === null ? 'var(--cyan)' : 'transparent',
              color: filter === null ? 'var(--bg)' : 'var(--text-mid)',
              borderColor: filter === null ? 'var(--cyan)' : 'var(--border)',
            }}
          >Tous</button>
          {allTags.map(t => (
            <button
              key={t}
              onClick={() => setFilter(filter === t ? null : t)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.06em',
                padding: '6px 14px', borderRadius: '999px', cursor: 'pointer',
                border: '1px solid', transition: 'all 0.2s',
                background: filter === t ? 'var(--cyan)' : 'transparent',
                color: filter === t ? 'var(--bg)' : 'var(--text-mid)',
                borderColor: filter === t ? 'var(--cyan)' : 'var(--border)',
              }}
            >{t}</button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((p, i) => (
            <div className="card project-card reveal" key={p.id} style={{ transitionDelay: `${i * 60}ms` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div className="project-num">{p.num} · {p.type}</div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)' }}>{p.year}</span>
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
                {p.links.demo !== "#" ? (
                  <a href={p.links.demo} className="btn-ghost" style={{ fontSize: '11px', padding: '8px 16px' }}>Aperçu</a>
                ) : (
                  <span className="btn-disabled">Démo sur demande</span>
                )}
                {p.links.repo !== "#" ? (
                  <a href={p.links.repo} className="btn-ghost" style={{ fontSize: '11px', padding: '8px 16px' }}>Code</a>
                ) : (
                  <span className="btn-disabled">Code sur demande</span>
                )}
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

          {/* Experience */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '28px' }}>
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

          {/* Education + Certifs */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '28px' }}>
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

            <div style={{ marginTop: '48px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '16px' }}>
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
              <span className="contact-val"><span className="status-dot">En poste · Ouvert aux opportunités CDI en cybersécurité</span></span>
            </div>
            <div className="contact-row">
              <span className="contact-label">Langues</span>
              <span className="contact-val">Français (natif) · Anglais (B1, en progression)</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
              <a href={data.identity.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '11px', padding: '10px 20px' }}>LinkedIn ↗</a>
              <a href={data.identity.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '11px', padding: '10px 20px' }}>GitHub ↗</a>
              <a href={data.identity.links.cv} className="btn-ghost" style={{ fontSize: '11px', padding: '10px 20px' }}>Télécharger mon CV ↓</a>
            </div>
          </div>

          <div className="pitch-box reveal">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyan)', marginBottom: '16px', letterSpacing: '0.1em' }}>
              // vision
            </div>
            <div className="pitch-quote">
              « Rendre l'<span className="hl">IA défensive</span> au moins aussi performante que l'<span className="hl">IA offensive</span> — et ancrer la sécurité dans l'industrialisation : politiques codifiées, contrôles automatisés, traçabilité bout-en-bout. »
            </div>
            <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
      <div className="grid-bg" />
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
