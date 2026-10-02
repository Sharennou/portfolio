// Éléments communs à toutes les pages : menu, réseaux, apparitions, curseur.

// ============================= NAV : MENU BURGER =============================
// Bloque le défilement de la page derrière le menu ouvert.
// Vivait dans le bloc de la vue plein écran des projets, supprimé avec elle :
// le menu s'en sert aussi, sa place est donc ici.
let lenis = null;   // défilement fluide, initialisé plus bas
const mobileLayout = () => window.matchMedia(mobileLayoutQuery).matches;
let lockedMobileY = null;
const lockScroll = (on) => {
  // Sur iOS, overflow:hidden seul n'empêche pas toujours la page de bouger.
  // La position est conservée avant de fixer le body, puis rendue à la fermeture.
  if (on && mobileLayout()) {
    lockedMobileY = window.scrollY;
    document.body.style.setProperty('--locked-scroll-y', `${-lockedMobileY}px`);
  }
  document.documentElement.classList.toggle('is-locked', on);
  // sans ça, la page continue de glisser derrière le menu ouvert
  if (lenis) on ? lenis.stop() : lenis.start();
  if (!on && lockedMobileY !== null) {
    document.body.style.removeProperty('--locked-scroll-y');
    window.scrollTo({ top: lockedMobileY, behavior: 'instant' });
    lockedMobileY = null;
  }
};

const navLogo = document.getElementById('navLogo');
// UN SEUL objet : capsule fermée, panneau ouvert. Il n'y a ni pastille séparée ni
// bouton de fermeture distinct — le même bouton ouvre et referme.
const menu = document.getElementById('siteMenu');          // .menu-shell
const burger = document.getElementById('burger');          // « Menu », dans son en-tête
const menuNav = document.getElementById('menuNav');        // les liens + les réseaux
const menuLinks = Array.from(menu.querySelectorAll('.menu-link'));
let menuOpen = false;
let menuTl = null;

// La capsule GRANDIT : largeur, hauteur et arrondi passent de la capsule au
// panneau. Une version où une pastille et un panneau se croisaient en fondu a été
// signalée par l'utilisateur — « ça change de menu » — puis une autre qui animait
// un clip-path, où le panneau ne changeait jamais de taille. Ne revenir ni à l'une
// ni à l'autre : c'est bien le même élément qui change de dimensions.
//
// Rien à déplacer : la capsule est centrée sur l'écran et ne bouge pas, elle
// s'élargit autour de son axe. Rien ne bouge non plus à l'intérieur — l'en-tête
// est centré et garde son écart, le menu est hors du flux et centré lui aussi.
const PANEL_DUR = 0.12;     // ouverture quasi immédiate
const CLOSE_DUR = 0.08;     // fermeture quasi immédiate
const PILL_RADIUS = 100;    // l'arrondi de la capsule fermée, en px
const PANEL_RADIUS = 26;    // celui du panneau ouvert
const HEAD_H = 56;          // hauteur de l'en-tête, la même que la capsule fermée

// Relâcher les valeurs en dur rend la capsule à sa taille CSS — qui est la taille
// FERMÉE. À n'appeler qu'à la fermeture, donc. L'appeler à la fin de l'ouverture
// faisait retomber le panneau d'un coup à la taille de la capsule, sans que la
// souris ait bougé : la taille ouverte, elle, n'existe que dans les valeurs
// animées, parce que `.menu-nav` est hors du flux et ne compte pas dans la
// hauteur naturelle. Tant que le menu est ouvert, les valeurs restent posées.
const releaseShell = () => {
  if (motionOK) gsap.set(menu, { clearProps: 'width,height,borderRadius' });
  else ['width', 'height', 'border-radius'].forEach(prop => menu.style.removeProperty(prop));
};

function setBurgerState(open) {
  burger.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
}

function openMenu() {
  if (menuOpen) return;
  menuOpen = true;
  setBurgerState(true);
  lockScroll(true);
  // `is-showing` rend le menu atteignable au clavier, `is-open` bascule les
  // couleurs. Deux classes et non une : à la fermeture, les couleurs doivent
  // repartir tout de suite alors que le contenu reste visible jusqu'au bout.
  menu.classList.add('is-open', 'is-showing');
  // WebKit peut conserver visibility:hidden après l'ouverture d'un <details>.
  // Poser la valeur sur le nav lui-même force sa mise à jour, y compris sans GSAP.
  menuNav.style.visibility = 'visible';
  // Surtout PAS de focus forcé sur le premier lien : l'anneau de focus s'affichait
  // en gros bleu autour d'« Accueil » à chaque ouverture, et on croyait l'entrée
  // sélectionnée. Inutile en plus : le bouton « Menu » étant dans la capsule, une
  // tabulation depuis lui entre naturellement dans le menu.
  if (!motionOK) {
    menu.style.width = `${menuNav.offsetWidth}px`;
    menu.style.height = `${HEAD_H + menuNav.offsetHeight}px`;
    menu.style.borderRadius = `${PANEL_RADIUS}px`;
    return;
  }

  if (menuTl) menuTl.kill();
  releaseShell();
  // mesuré alors que la capsule est encore fermée : le menu étant hors du flux,
  // sa taille ne dépend pas de celle de la capsule
  const from = menu.getBoundingClientRect();
  const to = { width: menuNav.offsetWidth, height: HEAD_H + menuNav.offsetHeight };

  menuTl = gsap.timeline()
    .fromTo(menu,
      { width: from.width, height: from.height, borderRadius: PILL_RADIUS },
      {
        width: to.width, height: to.height, borderRadius: PANEL_RADIUS,
        duration: PANEL_DUR, ease: 'power2.out'
      });
}

// Les dimensions du panneau ouvert sont figées en pixels : elles ne suivraient pas
// un redimensionnement de la fenêtre. On referme plutôt que d'afficher un panneau
// à la mauvaise taille.
let menuViewportWidth = window.innerWidth;
window.addEventListener('resize', () => {
  const widthChanged = window.innerWidth !== menuViewportWidth;
  menuViewportWidth = window.innerWidth;
  if (!menuOpen) return;
  // La barre du navigateur mobile change la hauteur au défilement : le menu
  // reste ouvert, avec son contenu défilable, tant que la largeur ne change pas.
  if (mobileLayout() && !widthChanged) {
    if (menuTl) menuTl.kill();
    menu.style.width = `${menuNav.offsetWidth}px`;
    menu.style.height = `${HEAD_H + menuNav.offsetHeight}px`;
    menu.style.borderRadius = `${PANEL_RADIUS}px`;
    return;
  }
  closeMenu({ restoreFocus: false });
});

function closeMenu({ restoreFocus = true } = {}) {
  if (!menuOpen) return;
  menuOpen = false;
  setBurgerState(false);
  lockScroll(false);
  if (restoreFocus) burger.focus({ preventScroll: true });

  // `is-open` ne part qu'À LA FIN, pas au début : la retirer tout de suite
  // rendait au panneau les couleurs de la capsule — donc du BLANC au-dessus des
  // sections claires — et on voyait un panneau blanc rétrécir. Il reste sombre
  // jusqu'au bout et disparaît, c'est la demande de l'utilisateur.
  const done = () => {
    menu.classList.remove('is-open', 'is-showing');
    menuNav.style.visibility = 'hidden';
  };
  if (!motionOK) { done(); releaseShell(); return; }

  if (menuTl) menuTl.kill();
  // On repart de la taille COURANTE : refermer au milieu d'une ouverture
  // continue depuis où on en est au lieu de sauter.
  const from = menu.getBoundingClientRect();
  releaseShell();
  const to = menu.getBoundingClientRect();   // la capsule, à sa taille naturelle

  menuTl = gsap.timeline({ onComplete: () => { done(); releaseShell(); } })
    .fromTo(menu,
      { width: from.width, height: from.height, borderRadius: PANEL_RADIUS },
      {
        width: to.width, height: to.height, borderRadius: PILL_RADIUS,
        duration: CLOSE_DUR, ease: 'power2.out'
      });
}

burger.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));

// À la souris, l'ouverture reste un clic volontaire. Une fois le panneau ouvert,
// le quitter suffit à le refermer ; sur tactile, seul le clic garde ce rôle.
if (isFinePointer) {
  menu.addEventListener('mouseleave', () => {
    if (menuOpen) closeMenu({ restoreFocus: false });
  });
}

// Ces écouteurs passent avant celui des ancres (sur document) : le scroll est déverrouillé
// avant que la page ne défile vers la section.
menu.addEventListener('click', (e) => {
  const link = e.target.closest('.menu-link');
  if (!link) return;
  closeMenu({ restoreFocus: false });
  // le focus suit la navigation, sinon il resterait sur un lien masqué
  const href = link.getAttribute('href');
  const target = href.startsWith('#') ? document.querySelector(href) : null;
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
});
// Il n'y a plus de voile à cliquer : c'est le document qui referme, dès qu'on
// clique ailleurs que dans la capsule.
document.addEventListener('click', (e) => {
  if (menuOpen && !e.target.closest('.menu-shell')) closeMenu({ restoreFocus: false });
});
navLogo.addEventListener('click', () => closeMenu({ restoreFocus: false }));

document.addEventListener('keydown', (e) => {
  if (!menuOpen) return;
  if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
  if (e.key !== 'Tab') return;
  // tout ce qui est cliquable dans la capsule ouverte : bouton, lien CV, liens,
  // réseaux. Le logo est masqué pendant ce temps, l'y envoyer n'aurait pas de sens.
  const focusables = [...menu.querySelectorAll('a, button')];
  const i = focusables.indexOf(document.activeElement);
  const next = i === -1 ? 0 : (i + (e.shiftKey ? -1 : 1) + focusables.length) % focusables.length;
  e.preventDefault();
  focusables[next].focus();
});

// L'effet magnétique de l'ancienne pastille a été retiré en la fusionnant avec le
// panneau. Deux raisons : il visait un élément qui n'existe plus, et son
// `overwrite: true` aurait tué l'animation d'agrandissement dès le premier
// mouvement de souris — les deux écrivaient sur le même élément. À réintroduire
// seulement sur un élément qui n'est pas animé par ailleurs.

// ============================= DÉFILEMENT FLUIDE =============================
// Inertie sur toute la page (Lenis). Branchement obligatoire sur GSAP : c'est le
// ticker de GSAP qui fait avancer Lenis, et chaque frame prévient ScrollTrigger —
// sinon les animations au scroll se décalent du contenu.
// Coupé en prefers-reduced-motion, puisque conditionné à motionOK.
if (motionOK && typeof Lenis === 'function') {
  lenis = new Lenis({ duration: 1.05, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// Défilement des ancres en JS : le scroll-behavior CSS perturbe les recalculs de ScrollTrigger,
// et la section épinglée doit être visée via son pin-spacer (elle est en position fixed pendant le pin)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const href = link.getAttribute('href');
  // href="#" seul : cible vide, et querySelector('#') lèverait une erreur
  if (href === '#') { e.preventDefault(); return; }
  const target = document.querySelector(href);
  // Section absente de cette page : le lien vit sur l'accueil, on y va pour de vrai.
  if (!target) {
    if (link.dataset.home !== undefined) { e.preventDefault(); location.href = 'index.html' + href; }
    return;
  }
  e.preventDefault();
  const spacer = target.parentElement.classList.contains('pin-spacer') ? target.parentElement : null;
  const offset = mobileLayout() ? parseFloat(getComputedStyle(target).scrollMarginTop) || 0 : 0;
  const top = Math.max(0, (spacer || target).getBoundingClientRect().top + window.scrollY - offset);
  // Lenis gère lui-même le glissement ; le scroll natif lutterait contre lui
  if (lenis) lenis.scrollTo(top);
  else window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
});

// active link on scroll — uniquement les liens internes à la page en cours.
// Les liens vers l'autre page portent leur propre aria-current (voir plus bas) et
// ne doivent pas être remis à zéro à chaque section traversée.
const sections = document.querySelectorAll('main section[id]');
const inPageLinks = menuLinks.filter(a => a.getAttribute('href').startsWith('#'));
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const href = '#' + entry.target.getAttribute('id');
      inPageLinks.forEach(a => {
        const active = a.getAttribute('href') === href;
        a.classList.toggle('is-active', active);
        if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => navObserver.observe(s));

// ============================= RÉSEAUX =============================
// Les deux rendus (liens du panneau de menu, pastilles du pied de page) lisent le même
// tableau `socials` défini dans core.js : une url renseignée les met tous les deux à jour.
// Les icônes rondes du haut de page ont été retirées à la demande de l'utilisateur.
const linkAttrs = (url) =>
  url ? ` href="${url}" target="_blank" rel="noopener noreferrer"`
      : ' href="#" aria-disabled="true" title="Lien à renseigner dans js/core.js"';

// Liens texte en bas du panneau de menu
const menuSocial = document.getElementById('menuSocial');
if (menuSocial) {
  menuSocial.innerHTML = socials
    .map(({ label, url }) => `<li><a${linkAttrs(url)} class="${url ? '' : 'is-todo'}">${label}</a></li>`)
    .join('');
}

// Pastilles du pied de page. Si aucune url n'est renseignée, on ne met pas de faux
// liens dans le pied de page : « Haut de page » prend la place.
const footFilled = socials.filter(s => s.url);
const footEl = document.getElementById('footLinks');
if (footEl) {
  // « Haut de page » vise la première section de LA page courante, pas une ancre de l'accueil
  const first = document.querySelector('main section[id]');
  const top = { label: 'Haut de page ↑', url: '#' + (first ? first.id : 'contact') };
  footEl.innerHTML = (footFilled.length ? footFilled : [top])
    .map(({ label, url }) => {
      const ext = url.startsWith('#') ? '' : ' target="_blank" rel="noopener noreferrer"';
      return `<li><a href="${url}"${ext}>${label}</a></li>`;
    })
    .join('');
}

// ============================= BARRE : CLAIR OU SOMBRE =============================
// Le logo et les boutons doivent rester lisibles sur toutes les sections. Un
// mix-blend-mode serait plus élégant mais ne peut pas marcher : .site-header est
// en position fixed, donc un contexte d'empilement isolé, et le logo ne
// fusionnerait qu'avec la barre transparente. On lit donc data-tone de la
// section qui passe sous la barre.
const header = document.querySelector('.site-header');
const tonedSections = Array.from(document.querySelectorAll('section[data-tone]'));

if (header && tonedSections.length) {
  const updateTone = () => {
    // juste sous le bas de la barre, là où logo et boutons se détachent
    const y = header.getBoundingClientRect().bottom - 8;
    const under = tonedSections.find(sec => {
      const r = sec.getBoundingClientRect();
      return r.top <= y && r.bottom > y;
    });
    header.classList.toggle('on-light', !!under && under.dataset.tone === 'light');
  };

  let queued = false;
  const scheduleTone = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; updateTone(); });
  };
  window.addEventListener('scroll', scheduleTone, { passive: true });
  window.addEventListener('resize', scheduleTone);
  updateTone();
}

// ============================= MENU : PAGE COURANTE =============================
// Le menu est identique sur les deux pages : on marque ici celle qu'on est en train de lire.
// Les liens de section s'en chargent tout seuls via navObserver.
const here = location.pathname.split('/').pop() || 'index.html';
// la page d'un projet fait partie de la rubrique Projets
const currentRubric = here === 'projet.html' ? 'projets.html' : here;
document.querySelectorAll('[data-page]').forEach(a => {
  if (a.dataset.page === currentRubric) a.setAttribute('aria-current', 'page');
});

// ============================= REVEAL ON SCROLL =============================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: mobileLayout() ? 0.01 : 0.15 });
const observeReveals = () =>
  document.querySelectorAll('.reveal:not(.in-view)').forEach(el => revealObserver.observe(el));

// Les scripts de page (home.js, gallery.js, project.js) sont chargés APRÈS ce fichier
// et construisent une partie du contenu. Ramasser les .reveal tout de suite ratait
// ces éléments : ils restaient à opacité 0, invisibles (texte d'À propos, liste des
// projets). On attend donc la fin de l'exécution de tous les scripts.
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', observeReveals);
else observeReveals();

// Les webfonts changent les largeurs et hauteurs : on recalcule tout après leur chargement
if (motionOK && document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
