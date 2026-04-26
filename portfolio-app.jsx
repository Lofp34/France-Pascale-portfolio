/* global React */
const { useState, useEffect, useRef } = React;

// ============== Data ==============
const MOBILIER = [
  { id: "paravent", name: "Paravent Soleil d'Automne", desc: "Paille de seigle · Motif soleil rayonnant · 3 panneaux", img: "images/paravent-soleil.jpg", num: "№ 01", year: "2025", dim: "180 × 165 cm" },
  { id: "eventail-caramel", name: "Table basse Éventail en folie", desc: "Caramel fumé · Bois & paille", img: "images/table-eventail-caramel.jpg", num: "№ 02", year: "2024", dim: "Ø 90 × 42 cm" },
  { id: "eclat", name: "Table basse Éclat graphique", desc: "Composition géométrique · Anthracite", img: "images/table-eclat-graphique.jpg", num: "№ 03", year: "2024", dim: "110 × 65 cm" },
  { id: "orbite", name: "Guéridon l'Orbite Saphir", desc: "Paille teintée bleu nuit · Pied tripode", img: "images/gueridon-orbite-saphir.jpg", num: "№ 04", year: "2024", dim: "Ø 45 × 55 cm" },
  { id: "hypnose", name: "Guéridon l'Hypnose", desc: "Motif concentrique · Vue du plateau", img: "images/gueridon-hypnose-top.jpg", num: "№ 05", year: "2024", dim: "Ø 45 × 55 cm" },
  { id: "gigognes", name: "Tables gigognes", desc: "Marqueterie de paille · Ensemble de tables", img: "images/table-gigognes.png", num: "№ 06", year: "2024", dim: "Sur mesure" },
];

const PANNEAUX = [
  { id: "hab1", name: "Habillage de meuble", desc: "Panneau de niche · Motif éclat", img: "images/habillage-meuble.jpg", num: "№ 06", dim: "Sur mesure" },
  { id: "mobilier", name: "Panneau mural d'exception", desc: "Marqueterie paille de seigle · Grand format", img: "images/mobilier-1.jpg", num: "№ 07", dim: "Sur mesure" },
  { id: "eclipse", name: "Soleil Tête de Lit", desc: "Tête de lit · Motif soleil rayonnant", img: "images/soleil-tete-de-lit.jpg", num: "№ 08", dim: "Sur mesure" },
  { id: "hero1", name: "Composition contemporaine", desc: "Motif rayonnant · Paille dorée", img: "images/hero-1.jpg", num: "№ 09", dim: "Sur mesure" },
  { id: "hero2", name: "Étude de lumière", desc: "Panneau mural · Paille naturelle", img: "images/hero-2.jpg", num: "№ 10", dim: "Sur mesure" },
];

const DECO = [
  { id: "flot", name: "Miroir Flot de Paille XL", desc: "Paille dorée · Cadre rayonnant", img: "images/miroir-flot.jpg", num: "№ 11", dim: "Ø 65 cm" },
  { id: "rond-xl", name: "Miroir Rondeur de Paille XL", desc: "Paille blonde · Cadre soyeux", img: "images/miroir-rond-xl.jpg", num: "№ 12", dim: "Ø 70 cm" },
  { id: "onde", name: "Miroir Onde de Paille", desc: "Paille teintée · Motif ondulé", img: "images/miroir-onde.jpg", num: "№ 13", dim: "Ø 45 cm" },
  { id: "envolee", name: "Miroir Envolée de Paille", desc: "Paille naturelle · Silhouette organique", img: "images/miroir-envolee.jpg", num: "№ 14", dim: "40 × 60 cm" },
  { id: "eventail-miroir", name: "Miroir Éventail de Paille Bleue", desc: "Collection éventail · Paille bleue", img: "images/miroir-eventail-de-paille-bleu.jpg", num: "№ 15", dim: "Format sur mesure" },
  { id: "rondeur", name: "Miroir Rondeur de Paille", desc: "Paille dorée · Finition or 24 carats", img: "images/miroir-rondeur-dore.jpg", num: "№ 16", dim: "Ø 45 cm" },
  { id: "art-deco", name: "Miroir Art Déco", desc: "Paille dorée · Inspiration années 30", img: "images/miroir-art-deco.jpg", num: "№ 17", dim: "60 × 45 cm" },
  { id: "horloge", name: "Horloge Éclat Solaire", desc: "Paille de seigle · Motif solaire", img: "images/horloge-solaire.jpg", num: "№ 18", dim: "Ø 50 cm" },
  { id: "deco1", name: "Horloge Nature Radieuse", desc: "Paille naturelle · Rayonnement vivant", img: "images/deco-1.jpg", num: "№ 19", dim: "Ø 50 cm" },
];

const PALETTE = [
  { name: "Naturelle", code: "PSN · 01", tex: "tex-naturelle" },
  { name: "Canari", code: "CAN · 02", tex: "tex-canari" },
  { name: "Jaune or", code: "JO · 03", tex: "tex-jaune-or" },
  { name: "Miel originel", code: "N°8 · 04", tex: "tex-miel" },
  { name: "Vieil or", code: "VO · 05", tex: "tex-vieil-or" },
  { name: "Mordoré", code: "MO · 06", tex: "tex-mordore" },
  { name: "Noisette", code: "NOI · 07", tex: "tex-noisette" },
  { name: "Pin", code: "PIN · 08", tex: "tex-pin" },
  { name: "Marron", code: "MAR · 09", tex: "tex-marron" },
  { name: "Seigle vert", code: "VERT68 · 10", tex: "tex-vert" },
  { name: "Bleu cobalt", code: "BV2 · 11", tex: "tex-cobalt" },
  { name: "Bleu abyssal", code: "BO7 · 12", tex: "tex-abyssal" },
  { name: "Grise", code: "GRI · 13", tex: "tex-grise" },
  { name: "Anthracite", code: "ANT · 14", tex: "tex-anthracite" },
  { name: "Noire", code: "NOIR · 15", tex: "tex-noire" },
];

// ============== Reveal hook ==============
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ============== Nav ==============
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={"nav " + (scrolled ? "scrolled" : "")}>
      <a href="#top" className="nav-brand">France<em>–</em>Pascale</a>
      <div className="nav-links">
        <a href="#manifesto">Manifeste</a>
        <a href="#mobilier">Mobilier</a>
        <a href="#panneaux">Panneaux muraux</a>
        <a href="#objets">Objets d'art</a>
        <a href="#process">Collaboration</a>
        <a href="#palette">Finitions</a>
      </div>
      <a href="#contact" className="nav-cta">Contact</a>
    </nav>
  );
}

// ============== Cover ==============
function Cover() {
  return (
    <section className="cover" id="top">
      <div className="cover-grid-overlay" />
      <div className="cover-text">
        <div className="cover-marker mono">Atelier France–Pascale · Mauguio–Montpellier</div>
        <h1 className="cover-title">
          La lumière,<br />
          brin après <em>brin</em>.
        </h1>
        <p className="cover-sub">
          Portfolio à l'attention des architectes et décorateurs d'intérieur.
          Mobilier d'art, panneaux muraux sur mesure et objets d'exception
          en marqueterie de paille de seigle.
        </p>
        <dl className="cover-meta">
          <dt>Matière</dt><dd>Paille de seigle · Bourgogne</dd>
          <dt>Atelier</dt><dd>Mauguio, France</dd>
          <dt>Édition</dt><dd>Printemps 2026</dd>
          <dt>Pièces</dt><dd>Uniques et sur mesure</dd>
        </dl>
      </div>
      <div className="cover-visual">
        <div className="cover-visual-main">
          <img src="images/paravent-verso.png" alt="Paravent Soleil d'Automne" />
        </div>
        <div className="cover-visual-sub">
          <img src="images/tableau-1.jpg" alt="Tableau de marqueterie de paille" />
        </div>
        <div className="cover-visual-caption mono">Paravent Soleil d'Automne · 2024</div>
      </div>
    </section>
  );
}

// ============== Showcase (images phares) ==============
function Showcase({ onOpen }) {
  const hero = [
    { img: "images/collection-soleil.jpg", name: "Collection Soleil", tag: "Ensemble de pièces · Atelier 2025", size: "big" },
    { img: "images/mondrian.jpg", name: "Mondrian", tag: "Marqueterie de paille · composition", size: "tall" },
    { img: "images/meli-melo-de-soleil.jpg", name: "Méli-mélo de Soleil", tag: "Collection Soleil · paille de seigle", size: "square" },
    { img: "images/gueridon-sur-mesure.jpeg", name: "Guéridon sur Mesure", tag: "Paille de seigle · création unique", size: "wide" },
    { img: "images/porte-manteaux.jpeg", name: "Porte-manteaux", tag: "Paille de seigle · objet d'art", size: "square" },
    { img: "images/soleil-d-or-noir.jpg", name: "Soleil d'Or Noir", tag: "Contraste or & noir · marqueterie", size: "wide" },
  ];
  return (
    <section className="showcase">
      <div className="container">
        <div className="showcase-head reveal">
          <div className="section-label mono"><span className="num">◆</span> Images phares</div>
          <h2 className="showcase-title">
            Un art<br />de <em>décoration d'exception.</em>
          </h2>
          <p className="showcase-lead">
            Six regards sur la matière, le dessin, le geste. La paille de seigle,
            traitée comme un pigment vivant — jamais figée, toujours captant la lumière.
          </p>
        </div>
        <div className="showcase-grid">
          {hero.map((h, i) => (
            <div key={i} className={"showcase-item reveal sc-" + h.size} onClick={() => onOpen({img: h.img, name: h.name})}>
              <div className="showcase-frame"><img src={h.img} alt={h.name} /></div>
              <div className="showcase-caption">
                <span className="serif"><em>{h.name}</em></span>
                <span className="mono mute">{h.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== Manifesto ==============
function Manifesto() {
  return (
    <section className="manifesto container" id="manifesto">
      <div className="section-label mono reveal">
        <span className="num">I.</span> Manifeste
      </div>
      <div className="manifesto-grid">
        <h2 className="manifesto-lead reveal">
          Je ne travaille pas la paille.<br />
          Je travaille <em>la lumière</em> qu'elle capte,
          qu'elle retient, qu'elle rend.
        </h2>
        <div className="manifesto-body reveal">
          <p>
            La marqueterie de paille est un art ancien, presque oublié, ressuscité dans
            les ateliers d'exception du XX<sup>e</sup> siècle. J'y suis venue par la lumière :
            ce reflet soyeux, vivant, que seule la paille de seigle sait offrir.
          </p>
          <p>
            Autodidacte puis perfectionnée dans l'atelier de Lison de Caunes,
            je travaille aujourd'hui à Mauguio, près de Montpellier. Chaque brin
            est fendu, aplani, posé à la main, un par un. Aucune machine. Aucune teinte
            synthétique qui trahirait la matière.
          </p>
          <p>
            Pour les architectes d'intérieur et les décorateurs, je conçois des pièces
            qui dialoguent avec l'architecture — têtes de lit, panneaux muraux,
            habillages de portes, mobilier — où chaque projet devient une partition
            unique de lumière et de texture.
          </p>
          <div className="manifesto-signature">
            <span className="signature-name">France–Pascale</span>
            <span className="mono mute">Marqueteuse de paille</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============== Collab (Sur-mesure) ==============
function Collab() {
  return (
    <section className="collab">
      <div className="container collab-grid">
        <div className="collab-visual reveal">
          <img src="images/atelier-portrait.jpg" alt="L'atelier" />
        </div>
        <div className="reveal">
          <div className="collab-kicker mono">Pour les professionnels de la décoration</div>
          <h2 className="collab-title">
            Travailler <em>avec vous</em>,
            pas simplement <em>pour vous</em>.
          </h2>
          <p className="collab-text">
            Mon atelier collabore avec les architectes d'intérieur, décorateurs
            et maîtres d'ouvrage pour donner vie à des projets résidentiels,
            hôteliers et commerciaux. La marqueterie de paille y devient
            un matériau d'architecture : vivant, lumineux, profondément tactile.
          </p>
          <p className="collab-text">
            Du premier échantillon à la pose, je suis chaque étape — pour que
            la pièce livrée entre parfaitement dans votre vision.
          </p>
          <div className="collab-chips">
            <span className="chip">Têtes de lit</span>
            <span className="chip">Panneaux muraux</span>
            <span className="chip">Habillage de portes</span>
            <span className="chip">Mobilier sur mesure</span>
            <span className="chip">Miroirs d'exception</span>
            <span className="chip">Fonds de niche</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============== Gallery ==============
function Gallery({ id, num, title, titleEm, titleEnd, intro, items, layout, onOpen }) {
  const layoutClass = layout === "grid" ? "gal-grid" : layout === "masonry" ? "gal-masonry" : "gal-editorial";
  const editorialSpans = ["gi-1","gi-2","gi-3","gi-4","gi-5","gi-6","gi-7"];
  const masonrySpans = ["m1","m2","m3","m4","m5","m6","m7","m8"];

  return (
    <section className="gallery container" id={id}>
      <div className="gallery-head reveal">
        <div>
          <div className="section-label mono">
            <span className="num">{num}</span> {title}
          </div>
          <h2 className="section-title">
            {titleEm && <em>{titleEm}</em>} {titleEnd}
          </h2>
        </div>
        <p className="gallery-head-right">{intro}</p>
      </div>

      <div className={layoutClass}>
        {items.map((it, i) => {
          let spanClass = "";
          if (layout === "editorial") spanClass = editorialSpans[i % editorialSpans.length];
          else if (layout === "masonry") spanClass = masonrySpans[i % masonrySpans.length];
          return (
            <div
              key={it.id}
              className={"gal-item reveal " + spanClass}
              onClick={() => onOpen(it)}
            >
              <div className="gal-frame">
                <img src={it.img} alt={it.name} loading="lazy" />
              </div>
              <div className="gal-caption">
                <div>
                  <div className="gal-name">{it.name}</div>
                  <div className="gal-desc">{it.desc}</div>
                </div>
                <div className="gal-num">{it.num}{it.dim ? " · " + it.dim : ""}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ============== Spotlight ==============
function Spotlight({ onOpen }) {
  const piece = MOBILIER[0];
  return (
    <section className="spotlight">
      <div className="container spotlight-inner">
        <div className="spotlight-visual reveal" onClick={() => onOpen(piece)}>
          <img src={piece.img} alt={piece.name} />
        </div>
        <div className="reveal">
          <div className="section-label mono">
            <span className="num">★</span> Pièce Phare
          </div>
          <h2 className="spotlight-name">Paravent<br /><em>Soleil d'Automne</em></h2>
          <p className="spotlight-sub">Composition rayonnante en paille de seigle. Pièce unique 2025.</p>
          <dl className="spotlight-specs">
            <dt>Matière</dt><dd>Paille de seigle teintée · Structure médium · Charnières en laiton</dd>
            <dt>Dimensions</dt><dd>180 × 165 cm · 3 panneaux articulés</dd>
            <dt>Motif</dt><dd>Recto : soleil rayonnant en dégradés de rouille, caramel et chocolat. Verso : chevrons en éventail, jeu de volume</dd>
            <dt>Réalisation</dt><dd>Environ 200 heures · Atelier Mauguio</dd>
            <dt>Exposé</dt><dd>Salon Ob'Art Paris 2025 (Espace des Blancs-Manteaux, Marais) · Galerie Les Artisans de la Barthelasse, Avignon</dd>
            <dt>Actuellement</dt><dd>Showroom Les Halles et Design, Châteaurenard</dd>
            <dt>Disponibilité</dt><dd>Pièce unique · Déclinable sur commande</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}

// ============== Process ==============
function Process() {
  const steps = [
    { label: "I. Rencontre", title: "Écouter le projet", text: "Échange avec l'architecte ou le décorateur. Étude du lieu, des volumes, de la lumière naturelle, des matériaux environnants. Définition du rôle de la pièce dans votre composition." },
    { label: "II. Étude", title: "Dessiner, prélever", text: "Croquis, propositions de motifs, palette de teintes accordée à votre projet. Envoi d'échantillons physiques de paille teintée pour validation tactile et visuelle." },
    { label: "III. Atelier", title: "Fendre brin à brin", text: "Fabrication à la main dans mon atelier de Mauguio. Chaque brin de paille de seigle est fendu, aplani au plioir, puis posé sur support bois. Aucune machine. Photos d'avancement partagées." },
    { label: "IV. Livraison", title: "Installer, fixer", text: "Conditionnement sur mesure. Livraison en France et à l'international. Coordination avec votre équipe pour l'installation — pose collée, vissée ou suspendue selon le support." },
  ];
  return (
    <section className="process" id="process">
      <div className="container">
        <div className="section-label mono reveal">
          <span className="num">V.</span> Collaboration
        </div>
        <h2 className="section-title reveal">
          Quatre étapes, un <em>langage commun</em>.
        </h2>
        <p className="reveal" style={{maxWidth: 640, color: 'var(--ink-dim)', fontSize: 16, lineHeight: 1.7}}>
          La marqueterie de paille demande du temps : compter six à dix semaines
          pour un panneau mural de taille moyenne, davantage pour une pièce complexe.
          Voici comment nous avançons ensemble.
        </p>
        <div className="process-grid">
          {steps.map((s, i) => (
            <div key={i} className="process-step reveal">
              <span className="process-num">{String(i+1).padStart(2, "0")}</span>
              <div className="process-label">{s.label}</div>
              <h3 className="process-title">{s.title}</h3>
              <p className="process-text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== Palette ==============
function Palette() {
  return (
    <section className="palette container" id="palette">
      <div className="section-label mono reveal">
        <span className="num">VI.</span> Finitions & matière
      </div>
      <div className="palette-intro">
        <h2 className="section-title reveal">
          Une palette <em>vivante</em>,<br />
          accordée à votre projet.
        </h2>
        <p className="palette-intro-right reveal">
          La paille de seigle se teinte aux colorants naturels. Voici douze teintes
          de référence — toutes déclinables, mariables entre elles, ajustables au
          plus près de votre palette. Des échantillons physiques sont envoyés sur
          demande avant validation.
        </p>
      </div>
      <div className="palette-grid">
        {PALETTE.map((p, i) => (
          <div key={i} className="swatch reveal">
            <div className={"swatch-tex " + p.tex} />
            <div className="swatch-label">
              <span className="name">{p.name}</span>
              <span>{p.code}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============== References ==============
function References() {
  const refs = [
    { year: "2025", title: "Salon Ob'Art Paris", place: "Espace des Blancs-Manteaux, Marais · Exposition automne 2025" },
    { year: "2024–26", title: "Galerie Les Artisans de la Barthelasse", place: "Avignon · Exposition permanente" },
    { year: "2025–26", title: "Showroom Les Halles et Design", place: "Châteaurenard · Paravent Soleil d'Automne" },
    { year: "Depuis 2023", title: "Atelier France–Pascale", place: "Mauguio (Montpellier) · Création & sur mesure" },
  ];
  return (
    <section className="references container">
      <div className="section-label mono reveal">
        <span className="num">VII.</span> Expositions & galeries
      </div>
      <h2 className="section-title reveal">
        Pièces exposées,<br />
        <em>pièces collectionnées</em>.
      </h2>
      <div className="ref-grid">
        {refs.map((r, i) => (
          <div key={i} className="ref-card reveal">
            <div className="ref-year">{r.year}</div>
            <div className="ref-title">{r.title}</div>
            <div className="ref-place">{r.place}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============== Contact ==============
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container contact-grid">
        <div className="reveal">
          <div className="section-label mono">
            <span className="num">VIII.</span> Écrivons un projet
          </div>
          <h2 className="contact-title">
            Parlons de votre<br /><em>prochain projet.</em>
          </h2>
          <p className="contact-body">
            Chaque collaboration commence par un échange. Envoyez-moi quelques
            mots sur votre projet — la pièce, le lieu, l'ambiance recherchée —
            je reviens vers vous sous 48 heures avec une première réflexion
            et un échantillon de matière.
          </p>
          <a href="https://france-pascale.com/pages/contact" className="contact-cta" target="_blank" rel="noopener">
            Commencer un échange →
          </a>
        </div>
        <div className="contact-info reveal">
          <div className="contact-line">
            <div className="label">Atelier</div>
            <div className="value">Mauguio · Montpellier, France</div>
          </div>
          <div className="contact-line">
            <div className="label">Site</div>
            <div className="value">france–pascale.com</div>
          </div>
          <div className="contact-line">
            <div className="label">Disponibilité</div>
            <div className="value">Sur rendez-vous, en atelier ou à distance</div>
          </div>
          <div className="contact-line">
            <div className="label">Pour les professionnels</div>
            <div className="value">Tarifs, délais et échantillons sur demande</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============== Lightbox ==============
function Lightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!item) return null;
  return (
    <div className="lightbox open" onClick={onClose}>
      <div className="lightbox-close mono">Fermer · ESC</div>
      <img src={item.img} alt={item.name} />
      <div className="lightbox-caption">{item.name}</div>
    </div>
  );
}

// ============== App ==============
function App() {
  useReveal();
  const [lb, setLb] = useState(null);

  const [t, setT] = useTweaks(window.TWEAK_DEFAULTS);

  return (
    <>
      <Nav />
      <Cover />
      <Showcase onOpen={setLb} />
      <Manifesto />
      <Collab />
      <Spotlight onOpen={setLb} />
      <Gallery
        id="mobilier"
        num="II."
        title="Mobilier"
        titleEm="Des objets"
        titleEnd="qui sculptent la lumière."
        intro="Tables basses et guéridons. Pièces uniques ou déclinables. Marqueterie intégrale ou en panneaux rapportés — je m'adapte à la logique constructive de vos projets."
        items={MOBILIER.slice(1)}
        layout={t.mobilierLayout}
        onOpen={setLb}
      />
      <Gallery
        id="panneaux"
        num="III."
        title="Panneaux muraux & têtes de lit"
        titleEm="La paille"
        titleEnd="comme architecture."
        intro="Surfaces murales habillées en marqueterie, têtes de lit à envergure, fonds de niche, habillages de portes de dressing ou de cuisine. Formats et courbures sur mesure."
        items={PANNEAUX}
        layout={t.panneauxLayout}
        onOpen={setLb}
      />
      <Gallery
        id="objets"
        num="IV."
        title="Objets d'art & miroirs"
        titleEm="Des détails"
        titleEnd="qui tiennent la scène."
        intro="Miroirs, horloges, boîtes précieuses, plateaux de réception. Pièces de ponctuation pour composer une ambiance, ou cadeaux d'exception pour vos clients."
        items={DECO}
        layout={t.objetsLayout}
        onOpen={setLb}
      />
      <Process />
      <Palette />
      <References />
      <Contact />
      <footer>
        <span>© 2026 · Atelier France–Pascale</span>
        <span>Portfolio · Édition printemps 2026</span>
        <span>Mauguio · France</span>
      </footer>
      <Lightbox item={lb} onClose={() => setLb(null)} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Galerie Mobilier" />
        <TweakRadio label="Mise en page" value={t.mobilierLayout}
          options={["editorial", "grid", "masonry"]}
          onChange={(v) => setT("mobilierLayout", v)} />
        <TweakSection label="Galerie Panneaux muraux" />
        <TweakRadio label="Mise en page" value={t.panneauxLayout}
          options={["editorial", "grid", "masonry"]}
          onChange={(v) => setT("panneauxLayout", v)} />
        <TweakSection label="Galerie Objets d'art" />
        <TweakRadio label="Mise en page" value={t.objetsLayout}
          options={["editorial", "grid", "masonry"]}
          onChange={(v) => setT("objetsLayout", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
