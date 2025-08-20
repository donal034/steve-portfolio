// Portfolio — Steve (Ngahan Donal Steve) — GitHub Pages (no build)
const { useMemo } = React;

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-white/5 backdrop-blur">
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, subtitle }) {
  return (
    <div className="mb-8">
      {kicker && (
        <div className="mb-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {kicker}
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">{subtitle}</p>
      )}
    </div>
  );
}

const data = {
  identity: {
    fullname: "NGAHAN Donal Steve",
    nickname: "Steve",
    title: "Apprenti Architecte Systèmes, Réseaux & Cybersécurité — Aspirant CISO",
    location: "Île-de-France, France",
    email: "donalngahan466@gmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/donal-ngahan/",
      github: "https://github.com/donal034",
      x: "#",
      phone: "+33 745308653",
      cv: "./CV_Steve_Ngahan_2024.pdf",
    },
    blurb:
      "Je sécurise, j’automatise et j’industrialise. Focus: Compliance as Code, bastion d’accès, audits ISO 27001, et IA appliquée à la défense."
  },
  skills: [
    {
      group: "Sécurité & Gouvernance",
      items: [
        "ISO 27001 (audits, Annexes A)",
        "NIS2 / PSSI",
        "Compliance as Code (OPA, Terraform Compliance)",
        "Gestion des identités & MFA",
        "Bastion d’accès (Guacamole, Jumpserver)",
        "SIEM & logs (concepts)",
      ],
    },
    {
      group: "Infra & Ops",
      items: [
        "Linux (Debian/Ubuntu)",
        "Windows Server (AD, RDP, GPO)",
        "VMware / Hyper‑V",
        "Ansible, Terraform",
        "GitLab CI/CD",
        "Docker",
      ],
    },
    {
      group: "Réseau & Sécurité Périmétrique",
      items: [
        "Palo Alto (PAN)",
        "Cisco Meraki",
        "Reverse proxy / VPN",
        "Supervision Grafana & Prometheus",
      ],
    },
    {
      group: "Cloud & M365",
      items: [
        "AWS (préparation certif)",
        "Microsoft 365",
        "Sécurité SaaS",        
      ],
    },
    {
      group: "Langages & Outils",
      items: ["Python", "Bash", "Nmap", "Wireshark", "GLPI", "Git"],
    },
  ],
  projects: [
    {
      id: "cac",
      title: "Compliance as Code — Mémoire & PoC",
      year: "2025",
      summary:
        "Modèle réutilisable de Compliance as Code pour environnements hybrides (on‑prem / cloud), intégration des contrôles dans la chaîne CI/CD.",
      highlights: [
        "OPA/Rego, Terraform Compliance",
        "Pipeline GitLab CI",
        "Cartographie des exigences ISO 27001",
      ],
      tags: ["Compliance", "DevSecOps", "IaC"],
      links: { demo: "#", repo: "#" },
    },
    {
      id: "bastion",
      title: "Bastion d’accès — Guacamole / Reverse proxy",
      year: "2025",
      summary:
        "Mise en place d’un bastion pour accès RDP/SSH/HTTP(S) avec suivi des connexions et contrôle des durées.",
      highlights: [
        "Apache Guacamole",
        "Reverse proxy",
        "Traçabilité & supervision",
      ],
      tags: ["Sécurité", "Réseau", "Bastion"],
      links: { demo: "#", repo: "#" },
    },
    {
      id: "stanley",
      title: "Cyber Range Stanley — IA attaque/défense",
      year: "2025",
      summary:
        "Conception d’un cyber range avec agents IA pour orchestrer scénarios d’attaque et de défense.",
      highlights: ["Automatisation", "Détection & réponse", "IA appliquée"],
      tags: ["IA", "Blue/Red Team", "Simulation"],
      links: { demo: "#", repo: "#" },
    },
    {
      id: "iso",
      title: "Grille d’audit ISO 27001 — Nexora (fictif)",
      year: "2025",
      summary:
        "Grille d’audit contextualisée (Annexe A, exigences 6.1.2, 7.4, 9.3…), personnes à interroger, preuves attendues, points de contrôle.",
      highlights: ["Annexe A", "Preuves & contrôles", "Rapports"],
      tags: ["Audit", "Gouvernance"],
      links: { demo: "#", repo: "#" },
    },
  ],
  experience: [
    {
      org: "Dompro",
      role: "Apprenti Architecte Systèmes, Réseaux & Cybersécurité",
      period: "2024 – aujourd’hui",
      bullets: [
        "Bastion d’accès (Guacamole), PSSI 2025 (base documentaire enrichie)",
        "Mise en place GLPI, supervision Grafana/Prometheus",
        "Contribution sécurité périmétrique (PAN, Meraki, MPLS)",
      ],
    },
    {
      org: "HETIC",
      role: "Mastère Cybersécurité — Projets académiques",
      period: "2024 – 2025",
      bullets: [
        "Cyber Range Stanley (IA) — orchestration attaque/défense",
        "Mémoire Compliance as Code — modèle réutilisable",
      ],
    },
  ],
  certifications: [
    { name: "AWS (Associate)", status: "En préparation" },
    { name: "Microsoft 365", status: "En préparation" },
    { name: "TOEFL", status: "Objectif 2025" },
  ],
};

function PortfolioSteve() {
  const year = new Date().getFullYear();

  const allTags = React.useMemo(() => {
    const set = new Set();
    data.projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-neutral-950 dark:to-neutral-900 text-gray-900 dark:text-gray-100">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur border-b border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30">
        <nav className="mx-auto max-w-6xl px-4 md:px-6 h-14 flex items-center justify-between">
          <a href="#accueil" className="font-semibold tracking-tight">
            <span className="text-sm text-gray-500 dark:text-gray-400">Portfolio</span>{" "}
            <span className="ml-1">Steve</span>
          </a>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#competences" className="hover:opacity-80">Compétences</a>
            <a href="#projets" className="hover:opacity-80">Projets</a>
            <a href="#parcours" className="hover:opacity-80">Parcours</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <a href={data.identity.links.cv} className="hidden sm:inline-flex items-center rounded-xl border px-3 py-1.5 text-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition">
              Télécharger CV
            </a>
            <a href={`mailto:${data.identity.email}`} className="inline-flex items-center rounded-xl bg-black text-white dark:bg-white dark:text-black px-3 py-1.5 text-sm font-medium hover:opacity-90 transition">
              Me contacter
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="accueil" className="relative">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">Cybersécurité · DevSecOps · Gouvernance</div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                {data.identity.fullname} <span className="opacity-70">({data.identity.nickname})</span>
              </h1>
              <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
                {data.identity.title}
              </p>
              <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
                {data.identity.blurb}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge>Île-de-France</Badge>
                <Badge>Ouvert aux opportunités</Badge>
                <Badge>FR / EN</Badge>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${data.identity.email}`} className="inline-flex items-center rounded-2xl bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90 transition">
                  Écrire un e‑mail
                </a>
                <a href={data.identity.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-2xl border px-4 py-2 text-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition">
                  LinkedIn
                </a>
                <a href={data.identity.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-2xl border px-4 py-2 text-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition">
                  GitHub
                </a>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-neutral-900 dark:to-neutral-800">
                {/* Placeholder portrait zone — replace with an actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl">🛡️</div>
                    <div className="mt-2 text-sm text-gray-500">Photo pro ici</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center mt-3 text-gray-500 dark:text-gray-400">Ajoute une photo 1:1 (600×600+), fond neutre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="competences" className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-14">
          <SectionTitle
            kicker="Compétences"
            title="Ce que je maîtrise"
            subtitle="Un mix opérationnel (bastion, réseau, supervision) et gouvernance (ISO 27001, PSSI), avec une forte culture d’automatisation."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {data.skills.map((group) => (
              <div key={group.group} className="rounded-2xl border p-5 border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-white/5">
                <h3 className="font-medium mb-3">{group.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((it) => (
                    <Badge key={it}>{it}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projets" className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-14">
          <SectionTitle
            kicker="Projets"
            title="Sélection de travaux"
            subtitle="Quelques projets concrets menés en entreprise et à l’école. Détails et dépôts disponibles sur demande."
          />

          {/* Tag cloud */}
          <div className="flex flex-wrap gap-2 mb-6">
            {allTags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.map((p) => (
              <article key={p.id} className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-white/5 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold group-hover:underline underline-offset-4 decoration-2">
                      {p.title}
                    </h3>
                    <span className="text-xs text-gray-500">{p.year}</span>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{p.summary}</p>
                  <ul className="mt-3 list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3 text-sm">
                    <a href={p.links.demo} className="inline-flex items-center rounded-xl border px-3 py-1.5 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition">Aperçu</a>
                    <a href={p.links.repo} className="inline-flex items-center rounded-xl border px-3 py-1.5 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition">Code</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="parcours" className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-14">
          <SectionTitle kicker="Parcours" title="Expériences & formation" />
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-6">
              {data.experience.map((e, idx) => (
                <div key={idx} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-black dark:bg-white" />
                  <h3 className="font-semibold">{e.org} — {e.role}</h3>
                  <div className="text-sm text-gray-500 mb-2">{e.period}</div>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifs */}
          <div className="mt-10">
            <h4 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {data.certifications.map((c) => (
                <Badge key={c.name}>{c.name} — {c.status}</Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-14">
          <SectionTitle
            kicker="Contact"
            title="Travaillons ensemble"
            subtitle="Un besoin de sécurisation, d’audit ou d’industrialisation de la sécurité ? Parlons‑en."
          />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-white/70 dark:bg-white/5">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p><span className="font-medium">E‑mail:</span> <a className="underline" href={`mailto:${data.identity.email}`}>{data.identity.email}</a></p>
                <p className="mt-2"><span className="font-medium">Localisation:</span> {data.identity.location}</p>
                <p className="mt-2"><span className="font-medium">Disponibilité:</span> Ouvert aux opportunités, alternance / missions.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={data.identity.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-xl border px-3 py-1.5 text-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition">LinkedIn</a>
                <a href={data.identity.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-xl border px-3 py-1.5 text-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition">GitHub</a>
                <a href={data.identity.links.cv} className="inline-flex items-center rounded-xl border px-3 py-1.5 text-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition">CV (PDF)</a>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-white/70 dark:bg-white/5">
              <h5 className="font-medium mb-2">Pitch</h5>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                « Rendre l’IA défensive au moins aussi performante que l’IA offensive » — et ancrer la sécurité dans l’industrialisation: politiques codifiées, contrôles automatisés, et traçabilité bout‑en‑bout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-8 text-sm text-gray-500 flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} {data.identity.nickname}. Tous droits réservés.</span>
          <div className="flex items-center gap-4">
            <a href="#accueil" className="hover:opacity-80">Haut de page ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PortfolioSteve />);
