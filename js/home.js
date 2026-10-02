// Accueil — index.html uniquement.

// ============================= PICTOGRAMMES DU HERO =============================
// Les positions CSS servent de repli si JavaScript est coupé. En fonctionnement
// normal, on disperse les pictogrammes sans grille ni symétrie visible, tout en
// gardant le contenu principal dégagé. Le tirage est déterministe : la composition
// paraît aléatoire, mais reste la même à chaque visite.
const hero = document.getElementById('accueil');
const heroFloaters = Array.from(document.querySelectorAll('.hero-floater'));
const compactHiddenFloaters = new Set(['hf-layers', 'hf-terminal', 'hf-cube', 'hf-timeline']);

const scatterHeroFloaters = () => {
  if (!hero || !heroFloaters.length || typeof hero.getBoundingClientRect !== 'function') return;

  const heroBox = hero.getBoundingClientRect();
  const width = hero.clientWidth || heroBox.width;
  const height = hero.clientHeight || heroBox.height;
  if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1) return;

  const compact = width <= 600;
  const active = heroFloaters.filter(floater => !compact || !Array.from(compactHiddenFloaters).some(name => floater.classList.contains(name)));
  const safeGap = compact ? 8 : 20;
  // Une marge proportionnelle ramène la composition vers le milieu au lieu de
  // laisser certains pictogrammes collés aux bords de l'écran.
  const edge = Math.max(compact ? 12 : 22, width * (compact ? 0.04 : 0.08));
  let randomState = compact ? 0x51f15e : 0x79b3ad;
  const random = () => {
    randomState += 0x6D2B79F5;
    let value = randomState;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
  // Sur mobile, le texte occupe presque toute la largeur : les pictogrammes
  // très pâles peuvent passer derrière lui, mais jamais derrière le portrait ou
  // le bouton. Sur grand écran, toute la colonne de contenu reste dégagée.
  const protectedSelectors = compact
    ? ['.hero-avatar', '.hero-actions']
    : ['.hero-avatar', '.hero-title', '.hero-tagline', '.hero-actions'];
  const protectedBoxes = protectedSelectors
    .map(selector => hero.querySelector(selector))
    .filter(Boolean)
    .map(node => {
      const box = node.getBoundingClientRect();
      const padding = compact ? 10 : 20;
      return {
        left: box.left - heroBox.left - padding,
        right: box.right - heroBox.left + padding,
        top: box.top - heroBox.top - padding,
        bottom: box.bottom - heroBox.top + padding
      };
    });

  const placed = [];
  const overlaps = (a, b, gap = 0) => !(
    a.right + gap <= b.left || a.left >= b.right + gap ||
    a.bottom + gap <= b.top || a.top >= b.bottom + gap
  );

  active.forEach(floater => {
    const size = floater.offsetWidth || (compact ? 44 : 62);
    const minY = Math.max(compact ? 72 : 82, height * 0.12);
    const maxX = Math.max(edge, width - size - edge);
    const maxY = Math.max(minY, height - size - Math.max(edge, height * 0.1));
    let position = null;
    let fallback = null;
    let fallbackScore = -1;

    // On tire des coordonnées continues plutôt que des « cases ». Le premier
    // emplacement qui respecte le contenu et les autres icônes est conservé.
    for (let attempt = 0; attempt < 320; attempt += 1) {
      const left = edge + random() * (maxX - edge);
      const top = minY + random() * (maxY - minY);
      const candidate = { left, top, right: left + size, bottom: top + size, size };
      if (protectedBoxes.some(box => overlaps(candidate, box))) continue;

      const distances = placed.map(other => {
        const dx = left + size / 2 - (other.left + other.size / 2);
        const dy = top + size / 2 - (other.top + other.size / 2);
        return Math.hypot(dx, dy) - (size + other.size) / 2;
      });
      const closest = distances.length ? Math.min(...distances) : Infinity;

      if (closest >= safeGap) {
        position = candidate;
        break;
      }
      if (closest > fallbackScore) {
        fallback = candidate;
        fallbackScore = closest;
      }
    }

    position ||= fallback;
    if (!position) return;
    floater.style.left = `${position.left}px`;
    floater.style.right = 'auto';
    floater.style.top = `${position.top}px`;
    placed.push(position);
  });
};

// Le premier placement arrive avant le prochain rendu. Un redimensionnement
// relance calmement le calcul afin de préserver les zones sûres du nouveau format.
if (typeof requestAnimationFrame === 'function') requestAnimationFrame(scatterHeroFloaters);
else scatterHeroFloaters();

let heroScatterTimer;
window.addEventListener('resize', () => {
  clearTimeout(heroScatterTimer);
  heroScatterTimer = setTimeout(scatterHeroFloaters, 140);
});

// Le dernier vers du titre se construit puis s'efface comme une ligne tapée en
// direct. Le texte complet reste présent pour les lecteurs d'écran dans le HTML.
// En réduction d'animations (ou sans temporisateur, dans le test DOM), une seule
// formule stable est affichée.
const heroTyped = document.getElementById('heroTyped');
const heroPhrases = ['des sites.', 'des images.', 'des visuels.'];

if (heroTyped) {
  heroTyped.textContent = heroPhrases[0];
  if (motionOK && typeof setTimeout === 'function') {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeNext = () => {
      const phrase = heroPhrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      heroTyped.textContent = phrase.slice(0, charIndex);

      let delay = deleting ? 42 : 78;
      if (!deleting && charIndex === phrase.length) {
        deleting = true;
        delay = 1450;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % heroPhrases.length;
        delay = 320;
      }
      setTimeout(typeNext, delay);
    };

    heroTyped.textContent = '';
    setTimeout(typeNext, 650);
  }
}

// ============================= FORMATION MMI : CARROUSEL =============================
// Une seule ligne : les domaines abordés en BUT MMI. C'est la formation qui est
// présentée ici, pas les compétences personnelles (elles sont dans about[0].skills).
const mmiDomains = [
  'Développement web', 'Design UX/UI', 'Motion design', 'Vidéo', 'Graphisme',
  'Communication digitale', '3D', 'Photographie', 'Son', 'Gestion de projet',
  'Réseaux sociaux', 'Marketing digital'
];
const spark = '<svg class="mq-sep" viewBox="0 0 24 24"><path d="M12 0c.7 6.3 5 10.6 12 12-7 1.4-11.3 5.7-12 12-.7-6.3-5-10.6-12-12C7 10.6 11.3 6.3 12 0Z"/></svg>';
const mqLine = document.getElementById('mqLine');

// la liste est écrite deux fois : la boucle à -50 % est ainsi invisible
mqLine.innerHTML = `<div class="marquee-track">${
  mmiDomains.map(d => `<span class="mq-item">${d}</span>${spark}`).join('').repeat(2)
}</div>`;
document.getElementById('skillsList').innerHTML = mmiDomains.map(d => `<li>${d}</li>`).join('');

// Au repos la bande défile à vitesse constante. Quand on fait défiler la page, elle
// accélère selon la vitesse du scroll (jusqu'à x6), puis revient doucement à son rythme.
// GSAP reprend la main sur l'animation CSS, qui reste le repli sans GSAP.
if (motionOK) {
  const mqTrack = mqLine.querySelector('.marquee-track');
  mqTrack.style.animation = 'none';
  const mqLoop = gsap.to(mqTrack, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
  const MQ_SLOW = 0.25;              // vitesse au survol : un quart, jamais l'arrêt
  const mqSpeed = { value: 1 };      // accélération due au scroll
  const mqHover = { value: 1 };      // ralentissement dû au survol
  // Les deux facteurs se multiplient au lieu de se remplacer : sans ça, une
  // accélération au scroll effacerait le ralentissement du survol, et inversement.
  const applySpeed = () => mqLoop.timeScale(mqSpeed.value * mqHover.value);

  ScrollTrigger.create({
    trigger: '#competences',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate(self) {
      const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 300);
      if (boost <= mqSpeed.value) return;      // on ne freine jamais une accélération en cours
      mqSpeed.value = boost;
      applySpeed();
      gsap.to(mqSpeed, { value: 1, duration: 1.4, ease: 'power2.out', overwrite: true, onUpdate: applySpeed });
    }
  });

  // Ralentissement au survol, et non plus arrêt net : demande de l'utilisateur.
  // On passe par un tween pour que le changement de vitesse s'étale au lieu de
  // se voir d'un coup, comme le reste des réactions de la bande.
  const mqGlide = (value) => gsap.to(mqHover, {
    value, duration: 0.5, ease: 'power2.out', overwrite: true, onUpdate: applySpeed
  });
  mqLine.addEventListener('mouseenter', () => mqGlide(MQ_SLOW));
  mqLine.addEventListener('mouseleave', () => mqGlide(1));
}

// ============================= PROJETS PHARES : ÉVENTAIL =============================
const fanDeck = document.getElementById('fanDeck');
// chaque carte ouvre la page de son projet (projet.html?p=slug)
const featured = projects.filter(p => p.featured);

// Le projet le plus important est le PREMIER du tableau — c'est l'ordre de la
// page projets.html — mais dans l'éventail il va au MILIEU : c'est la carte qui
// passe au-dessus de la pile au départ, et celle que l'œil prend en premier.
// Les suivants se rangent autour, dans l'ordre du tableau.
// Demande de l'utilisateur : Maison Cadiou au centre, Paris à sa gauche,
// Affiches à sa droite. Ne pas « corriger » ça en remettant l'ordre du tableau.
const fanOrder = featured.slice(1);
if (featured.length) fanOrder.splice(Math.floor(fanOrder.length / 2), 0, featured[0]);

// `is-lead` marque le projet mis en avant. Une classe plutôt qu'un `nth-child` :
// le CSS n'a pas à savoir que la carte phare est la deuxième sur trois.
fanDeck.innerHTML = fanOrder.map(p => `
  <article class="fan-card${p === featured[0] ? ' is-lead' : ''}">
    <a class="fan-link" href="${projectUrl(p)}">
      <span class="pc-media">${cardMedia(p)}<span class="pc-index" aria-hidden="true">${pad(projects.indexOf(p) + 1)}</span></span>
      <span class="fan-info">
        ${cardMeta(p)}
        <span class="pc-title">${p.card.headline}</span>
        ${cardFooter(p)}
      </span>
    </a>
  </article>`).join('');

const fanCards = Array.from(fanDeck.children);

if (motionOK && fanCards.length) {
  const mmFan = gsap.matchMedia();

  // Au-dessus de 860 px : les cartes partent **empilées au centre** de la piste et
  // s'écartent en éventail vers leurs places, avec rotation et échelle, pendant que
  // la section traverse l'écran. Elles ne viennent jamais de l'extérieur du cadre.
  // AUCUN épinglage : la page ne s'arrête jamais. Une version épinglée (cartes
  // empilées qui s'écartaient) a été retirée à la demande de l'utilisateur, qui la
  // trouvait trop bloquante. Ne pas la réintroduire — pour rendre l'animation plus
  // visible, augmenter les amplitudes ci-dessous, jamais rajouter `pin: true`.
  mmFan.add(desktopLayoutQuery, () => {
    const mid = (fanCards.length - 1) / 2;
    // offsetLeft ignore les transforms : la mesure ne se contamine pas elle-même
    const deckCenter = () => fanDeck.offsetWidth / 2;
    const cardCenter = (c) => c.offsetLeft + c.offsetWidth / 2;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.fan',
        // Repère contre-intuitif : plus le pourcentage est petit, plus c'est tard.
        // 55 % = le haut de la section a atteint le milieu de l'écran, donc la
        // section occupe déjà la moitié basse avant que les cartes ne bougent.
        start: 'top 55%',
        end: 'top 10%',     // l'écartement se termine quand la section arrive en haut
        scrub: 0.8,
        invalidateOnRefresh: true
      }
    });

    fanCards.forEach((card, i) => {
      const dir = i - mid;              // -1 (gauche), 0 (centre), +1 (droite)
      const away = Math.abs(dir);
      // la carte du milieu passe au-dessus de la pile
      gsap.set(card, { zIndex: fanCards.length - away });
      tl.fromTo(card,
        {
          x: () => deckCenter() - cardCenter(card),  // toutes empilées au centre
          y: 30 + away * 24,
          rotate: dir * 8,
          scale: 0.88
        },
        { x: 0, y: 0, rotate: 0, scale: 1, ease: 'power2.out', duration: 1 },
        0);
    });

    return () => gsap.set(fanCards, { clearProps: 'all' });
  });

  // En dessous : les cartes montent simplement quand elles entrent
  mmFan.add(mobileLayoutQuery, () => {
    fanCards.forEach(card => gsap.from(card, {
      y: 24, autoAlpha: 0, duration: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 94%', once: true }
    }));
    return () => gsap.set(fanCards, { clearProps: 'all' });
  });
}

// ============================= À PROPOS : FRISE D'OUTILS =============================
// Le titre est coupé en deux et la frise s'installe au milieu — la ligne du haut
// est calée à gauche, celle du bas à droite, comme dans la référence donnée par
// l'utilisateur. Chaque logo est un bouton : son nom apparaît au clic,
// au toucher ou avec Entrée / Espace. Un seul nom reste ouvert à la fois.
const toolBelt = document.getElementById('toolBelt');

if (toolBelt) {
  toolBelt.innerHTML = `
    <p class="tools-line tools-line-a reveal">Mes outils &amp;</p>
    <ul class="tools-row">
      ${tools.map((t, i) => `
        <li class="tool reveal" style="--d:${(0.04 * i).toFixed(2)}s">
          <button type="button" class="tool-tile" data-mono="${t.mono}" aria-label="${t.name}" aria-expanded="false" aria-controls="toolName${i}">${
            t.logo ? `<img src="${t.logo}" alt="" loading="lazy">` : `<span class="tool-mono">${t.mono}</span>`
          }</button>
          <span class="tool-name" id="toolName${i}">${t.name}</span>
        </li>`).join('')}
    </ul>
    <p class="tools-line tools-line-b reveal" style="--d:0.1s">vos idées.</p>`;

  toolBelt.querySelectorAll('.tool-tile').forEach(button => {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      toolBelt.querySelectorAll('.tool-tile').forEach(other => {
        const active = other === button && open;
        other.setAttribute('aria-expanded', String(active));
        other.closest('.tool').classList.toggle('is-active', active);
      });
    });
  });
}

// L'agrandissement des tuiles au survol est ENTIÈREMENT en CSS (voir .tool:hover
// dans style.css). Une version pilotée en JavaScript a été tentée pour la rendre
// continue : elle posait un `transform` inline sur chaque tuile dès le chargement,
// ce qui écrasait les règles CSS, et plus aucune application ne grossissait.
// Ne pas la réintroduire sans pouvoir la tester dans un vrai navigateur.

// ============================= À PROPOS : IMAGES LATÉRALES =============================
// La carte de Bretagne est un SVG de contours NUS : tout ce qui la légende est
// posé par-dessus depuis le tableau `about` de core.js — les flèches et les
// repères dans un calque SVG qui partage sa viewBox, les libellés en HTML, donc
// en vrai texte, dans la police et les couleurs du site.

// Une flèche = une courbe quadratique du libellé vers le repère, plus une pointe
// calculée sur la tangente d'arrivée. Rien n'est tracé à la main : déplacer un
// libellé dans core.js suffit à redessiner la courbe ET sa pointe.
function mapArrow(from, to, bend, gap) {
  const dx = to[0] - from[0], dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  // la queue démarre au-dessus du libellé, la pointe s'arrête avant le repère
  const sx = from[0] + ux * 18, sy = from[1] + uy * 18;
  const ex = to[0] - ux * gap,  ey = to[1] - uy * gap;
  // le point de contrôle est poussé sur la perpendiculaire : c'est lui, le galbe
  const cx = (sx + ex) / 2 - uy * bend * len;
  const cy = (sy + ey) / 2 + ux * bend * len;
  const a = Math.atan2(ey - cy, ex - cx) + Math.PI;  // tangente d'arrivée, retournée
  const h = 17, spread = 0.45;                       // longueur et écart des barbes
  const barb = (t) => `${(ex + h * Math.cos(a + t)).toFixed(1)},${(ey + h * Math.sin(a + t)).toFixed(1)}`;
  return `<path d="M${sx.toFixed(1)},${sy.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}"/>`
       + `<path d="M${barb(-spread)} L${ex.toFixed(1)},${ey.toFixed(1)} L${barb(spread)}"/>`;
}

// Deux formes de repère, dessinées autour de leur point : le disque bleu se
// centre dessus, l'épingle le désigne par sa pointe (elle est donc entièrement
// au-dessus de lui, ombre comprise). Les couleurs viennent du CSS.
const mapMarks = {
  dot: ([x, y]) => `<circle class="mk-halo" cx="${x}" cy="${y}" r="26"/>`
                 + `<circle class="mk-dot" cx="${x}" cy="${y}" r="12"/>`,
  pin: ([x, y]) => `<g class="mk-pin" transform="translate(${x},${y})">`
                 + `<ellipse class="mk-shadow" cx="0" cy="1.5" rx="9" ry="3.2"/>`
                 + `<path class="mk-body" d="M0,0 C-4.5,-7 -12,-13.5 -12,-20 A12,12 0 1 1 12,-20 C12,-13.5 4.5,-7 0,0 Z"/>`
                 + `<circle class="mk-eye" cx="0" cy="-20" r="4.6"/></g>`
};

// Le calque des repères reprend le cadrage `view` de la carte, donc ses
// coordonnées : (319, 212) tombe sur Lannion des deux côtés. Les libellés, eux,
// sont en HTML — leur position passe donc en % de la même boîte, calculés ici.
// Le cadrage n'est écrit qu'une fois, dans core.js : rien ne le répète.
function mapScene(a) {
  const marks = a.marks || [];
  const [vx, vy, vw, vh] = a.view;
  const pct = (p) => `--nx:${((p[0] - vx) / vw * 100).toFixed(2)}%; --ny:${((p[1] - vy) / vh * 100).toFixed(2)}%`;
  // `--map-ar` porte le rapport du cadrage jusqu'au CSS : sans ça, il faudrait
  // recopier 847/430 dans la feuille de style, et un recadrage en oublierait un.
  return `
    <div class="ab-map-scene" style="--map-ar:${vw} / ${vh}">
    <img class="ab-map-media" src="${a.img}" alt="${a.alt}" width="${vw}" height="${vh}" loading="lazy">
    <svg class="ab-map-marks" viewBox="${vx} ${vy} ${vw} ${vh}" aria-hidden="true" focusable="false">
      <g class="mk-arrows">${marks.map(m => mapArrow(m.text, m.at, m.bend, m.gap)).join('')}</g>
      ${marks.map(m => (mapMarks[m.kind] || mapMarks.dot)(m.at)).join('')}
    </svg>
    ${marks.map(m => `
    <p class="ab-map-note" style="${pct(m.text)}">
      <span class="ab-map-name">${m.label}</span>
      <span class="ab-map-sub">${m.sub}</span>
    </p>`).join('')}
    ${a.photo ? `<figure class="ab-postcard">
      <img src="${a.photo.src}" alt="${a.photo.alt}" loading="lazy">
      ${a.photo.caption ? `<figcaption>${a.photo.caption}</figcaption>` : ''}
    </figure>` : ''}
    </div>`;
}

const aboutRows = document.getElementById('aboutRows');

aboutRows.innerHTML = about.map((a, i) => `
  <article class="ab-row${a.map ? ' ab-row--map' : ''}">
    ${a.map ? mapScene(a) : `
    <figure class="ab-shot">
      <span class="ab-frame">${shotMarkup(a)}</span>
      ${a.caption ? `<figcaption>${a.caption}</figcaption>` : ''}
    </figure>`}
    <div class="ab-text reveal" style="--d:0.06s">
      <h3 class="ab-title">${a.title}</h3>
      <div class="ab-copy">${(a.paragraphs || [a.text]).map(text => `<p>${text}</p>`).join('')}</div>
      ${a.facts.length ? `<ul class="ab-facts">${a.facts.map(f => `<li>${f}</li>`).join('')}</ul>` : ''}
      ${(a.skills || []).map(g => `
        <p class="ab-skills-label">${g.label}</p>
        <ul class="ab-skills">${g.items.map(s => `<li>${s}</li>`).join('')}</ul>`).join('')}
    </div>
  </article>
`).join('');

// La photo posée sur la carte attend une vraie photo perso. Tant que le fichier
// n'est pas déposé, on RETIRE le tirage au lieu d'afficher une image cassée.
// C'est plus radical que le monogramme des logos, et c'est voulu : un cadre
// photo vide ne veut rien dire, alors qu'une tuile de logo garde ses initiales.
document.querySelectorAll('.ab-postcard img').forEach(img => {
  const card = img.parentElement;
  if (!card) return;
  const drop = () => card.remove();
  if (img.complete) { if (!img.naturalWidth) drop(); }
  else img.addEventListener('error', drop);
});

// L'image entre par le côté où elle se trouve : à droite pour les lignes paires,
// à gauche pour les impaires. Le texte, lui, reste géré par .reveal — une seule
// mécanique par élément, jamais les deux sur la même opacité.
if (motionOK) {
  // matchMedia adapte l'amplitude et retire les anciens transforms à la rotation.
  const aboutMotion = gsap.matchMedia();
  aboutMotion.add(desktopLayoutQuery, () => {
    gsap.utils.toArray('.ab-row').forEach((row, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      // La carte reste dans le fond ; ses repères s'y fondent, et la photo entre
      // par la droite. Aucun de ces éléments n'est `.reveal` : une seule mécanique
      // par élément, et sans GSAP ils sont simplement là, en place, dès le
      // chargement — la photo comprise, que le CSS pose déjà à sa place finale.
      if (row.classList.contains('ab-row--map')) {
        // ⚠ Uniquement l'opacité, jamais un `y` : les libellés sont centrés sur
        // leur ancre par un `translateX(-50%)` en CSS, et GSAP écrirait son propre
        // `transform` par-dessus — ils sauteraient d'une demi-largeur vers la droite.
        const marks = row.querySelectorAll('.ab-map-marks, .ab-map-note');
        if (marks.length) gsap.fromTo(marks,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.7, ease: 'power2.out', stagger: 0.12,
            scrollTrigger: { trigger: row, start: 'top 78%', once: true } });
        // La photo, elle, ENTRE PAR LA DROITE, et son avancée est pilotée par le
        // défilement (`scrub`) : on la fait venir à la molette, et elle repart si
        // on remonte. Demande de l'utilisateur ; elle montait de 54px avant.
        // La droite n'est pas un côté au hasard : c'est celui par lequel la carte
        // continue déjà hors de l'écran, donc le geste va dans le même sens.
        //
        // `xPercent` se lit sur la largeur de la photo. Elle occupe de 65,5 % à
        // 81 % de l'écran : il faut donc la pousser de 34,5 points d'écran pour
        // la sortir entièrement, soit ~2,2 fois sa largeur — 240 laisse de la
        // marge. Ce qui dépasse est coupé par `overflow-x: hidden` sur <body>.
        //
        // ⚠ `rotate` doit finir sur l'inclinaison du CSS (`.ab-postcard`, +4°) :
        // GSAP écrit son propre transform et l'écraserait autrement. Les deux
        // valeurs vont ensemble, en changer une sans l'autre fait sauter la photo.
        // ⚠ `ease: 'none'` : sous scrub, une courbe se lirait comme un à-coup,
        // puisque c'est le scroll qui donne déjà le rythme.
        const photo = row.querySelector('.ab-postcard');
        if (photo) gsap.fromTo(photo,
          { xPercent: 240, rotate: 12 },
          {
            xPercent: 0, rotate: 4, ease: 'none',
            scrollTrigger: { trigger: row, start: 'top 85%', end: 'top 15%', scrub: 0.6 }
          });
        return;
      }
      gsap.fromTo(row.querySelector('.ab-shot'),
        { xPercent: 45 * dir, rotate: 6 * dir, autoAlpha: 0 },
        {
          xPercent: 0, rotate: dir * 1.5, autoAlpha: 1, ease: 'none',
          scrollTrigger: { trigger: row, start: 'top 88%', end: 'top 38%', scrub: 0.6 }
        });
    });
  });
  aboutMotion.add(mobileLayoutQuery, () => {
    gsap.utils.toArray('.ab-row--map').forEach(row => {
      const photo = row.querySelector('.ab-postcard');
      if (!photo) return;
      // Le tirage reste au-dessus de la carte : son entrée suit la scène,
      // avec une course plus courte que sur PC et la même inclinaison finale.
      gsap.fromTo(photo,
        { xPercent: 150, rotate: 12 },
        {
          xPercent: 0, rotate: 4, ease: 'none',
          scrollTrigger: {
            trigger: row.querySelector('.ab-map-scene'),
            start: 'top 85%', end: 'top 35%', scrub: 0.3
          }
        });
    });
  });
}

// ============================= PASSIONS : VISUELS QUI DÉFILENT =============================
// C'est le TEXTE qui reste figé à l'écran (voir `.pas-text` dans le CSS) ; ces
// visuels-là sont posés dans la page et passent devant lui au défilement.
// Position et taille passent par des variables CSS inline plutôt que par des styles
// directs : c'est ce qui laisse le CSS les ignorer sous 860px, où les visuels
// repassent en bande au-dessus du texte au lieu de le recouvrir.
// Pas de `.reveal` ici : sa transition écraserait l'inclinaison CSS de chaque
// visuel. GSAP, lui, compose avec le transform déjà en place.
const pasStage = document.getElementById('pasStage');

if (pasStage) {
  pasStage.innerHTML = passionShots.map(s => `
    <figure class="pas-shot ${s.img ? '' : s.art}"
            style="--x:${s.x}; --y:${s.y}; --w:${s.w}; --ar:${s.ar}; --tilt:${s.tilt}">
      ${s.img
        ? `<img src="${s.img}" alt="${s.alt}" loading="lazy">`
        : `<span class="pj-art-layer"></span><span class="pas-mark" aria-hidden="true">${s.mark}</span>`}
    </figure>`).join('');

  // Un déclencheur par visuel, et non un seul sur la section : elle fait trois
  // écrans de haut, donc un déclencheur unique allumerait d'un coup des visuels
  // encore à deux écrans plus bas. Chacun apparaît quand il entre vraiment.
  if (motionOK) {
    gsap.utils.toArray('.pas-shot').forEach((shot) => {
      gsap.fromTo(shot,
        { autoAlpha: 0, scale: 0.92 },
        {
          autoAlpha: 1, scale: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: shot, start: 'top 92%', once: true }
        });
    });
  }
}

// ============================= EXPÉRIENCES : LISTE =============================
const jobList = document.getElementById('jobList');

jobList.innerHTML = jobs.map((j, i) => `
  <li>
    <details class="job">
      <summary class="job-summary">
        <span class="job-index" aria-hidden="true">${pad(i + 1)}</span>
        <span class="job-logo" data-mono="${j.mono}">${jobLogo(j)}</span>
        <span class="job-summary-copy"><span class="job-role">${j.role}</span><span class="job-org">${j.org}${j.city ? ` · ${j.city}` : ''}</span></span>
        <span class="job-when"><span class="job-year">${j.when.split(' · ')[0]}</span><span class="job-duration">${j.when.split(' · ').slice(1).join(' · ')}</span></span>
        <span class="entry-toggle" aria-hidden="true">+</span>
      </summary>
      <div class="job-detail">
        <p class="job-text">${j.text}</p>
        <ul class="job-tags">${j.tags.map(t => `<li>${t}</li>`).join('')}</ul>
      </div>
    </details>
  </li>
`).join('');

// Les résumés restent natifs et utilisables sans GSAP. Avec GSAP, l'ouverture
// suit le sens de lecture et une seule ligne par groupe reste développée.
if (motionOK) {
  document.querySelectorAll('.job, .edu-item').forEach(entry => {
    const summary = entry.querySelector('summary');
    const detail = entry.querySelector('.job-detail, .edu-detail');
    summary.addEventListener('click', event => {
      event.preventDefault();
      const wasOpen = entry.open;
      const group = entry.classList.contains('job') ? '.job' : '.edu-item';
      document.querySelectorAll(`${group}[open]`).forEach(other => {
        if (other === entry) return;
        const otherDetail = other.querySelector('.job-detail, .edu-detail');
        gsap.killTweensOf(otherDetail);
        gsap.to(otherDetail, {
          height: 0, opacity: 0, duration: 0.25, ease: 'power2.inOut',
          onComplete: () => {
            other.open = false;
            gsap.set(otherDetail, { clearProps: 'all' });
          }
        });
      });

      gsap.killTweensOf(detail);
      if (wasOpen) {
        gsap.to(detail, {
          height: 0, opacity: 0, duration: 0.25, ease: 'power2.inOut',
          onComplete: () => {
            entry.open = false;
            gsap.set(detail, { clearProps: 'all' });
            ScrollTrigger.refresh();
          }
        });
      } else {
        entry.open = true;
        gsap.fromTo(detail,
          { height: 0, opacity: 0 },
          {
            height: 'auto', opacity: 1, duration: 0.38, ease: 'power2.out',
            onComplete: () => {
              gsap.set(detail, { clearProps: 'all' });
              ScrollTrigger.refresh();
            }
          });
      }
    });
  });
}

// Vignettes façon icône d'application (expériences, formation ET frise d'outils) :
// le logo est toujours affiché EN ENTIER, centré, avec une marge autour — jamais
// rogné. Les logos très larges (Isitix 3,25:1, CIRISI 2,4:1) n'auraient plus qu'un
// mince filet visible avec la marge normale : `is-wide` leur en retire sur les
// côtés. Sans effet sur les tuiles d'outils, dont les logos sont déjà carrés — la
// classe reste posée sans dégât si jamais l'un d'eux ne l'était plus.
// On mesure l'image plutôt que de maintenir un réglage à la main dans les données.
// Si le fichier manque (renommage…), on retombe sur le monogramme au lieu d'une
// tuile vide — `data-mono` est posé sur `.tool-tile` pour cette raison.
document.querySelectorAll('.job-logo img, .edu-logo img, .tool-tile img').forEach(img => {
  const tile = img.parentElement;
  if (!tile) return;
  const fitToTile = () => {
    const ratio = img.naturalWidth / img.naturalHeight;
    if (ratio && (ratio < 0.8 || ratio > 1.25)) tile.classList.add('is-wide');
  };
  const useMonogram = () => { tile.textContent = tile.dataset.mono || ''; };
  if (img.complete) {
    img.naturalWidth ? fitToTile() : useMonogram();
  } else {
    img.addEventListener('load', fitToTile);
    img.addEventListener('error', useMonogram);
  }
});

// ============================= GSAP : TITRES ET EXPÉRIENCES =============================
if (motionOK) {
  // Les transitions CSS de survol lutteraient contre GSAP pendant le tween :
  // on les coupe, puis clearProps les rend au moment du onComplete.
  const enter = (targets, vars) => {
    gsap.set(targets, { transition: 'none' });
    return gsap.from(targets, Object.assign({
      onComplete: () => gsap.set(targets, { clearProps: 'all' })
    }, vars));
  };

  gsap.utils.toArray('[data-gsap="head"]').forEach(el => {
    enter(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      y: 38, autoAlpha: 0, duration: 0.85, ease: 'power3.out'
    });
  });

  // Les lignes sont déjà toutes lisibles au chargement ; seule une légère entrée
  // latérale souligne le changement de rythme après le collage des passions.
  gsap.utils.toArray('.job, .edu-item').forEach((entry, i) => {
    enter(entry, {
      scrollTrigger: { trigger: entry, start: 'top 92%' },
      x: i % 2 ? 22 : -22, autoAlpha: 0, duration: 0.55, ease: 'power2.out'
    });
  });

  // Les webfonts changent les largeurs et hauteurs : on recalcule après leur chargement
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
}
