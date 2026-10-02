// Page projet.html : une seule page gabarit pour tous les projets.
// Le projet affiché est choisi par l'adresse, ?p=slug, et lu dans `projects` (core.js).

const projectPage = document.getElementById('projectPage');
const wantedSlug = new URLSearchParams(location.search).get('p');
const projectIndex = projects.findIndex(p => p.slug === wantedSlug);

// Le visuel du haut : une vidéo, plusieurs images, ou le motif graphique par
// défaut. Une seule des trois selon ce que porte le projet.
// La vidéo est muette, en boucle et sans commande : c'est une animation de logo
// de quelques secondes, pas un film. Sous `prefers-reduced-motion` on ne la lance
// pas tout seul et on rend les commandes, pour que rien ne bouge sans qu'on le
// demande — même règle que partout ailleurs sur le site.
function youtubeConsentMarkup(p) {
  return `<div class="video-consent">
    <p>Vidéo YouTube désactivée.</p>
    <button type="button" class="btn btn-outline" data-cookie-open>Choisir les cookies</button>
    <a class="video-consent-link" href="https://www.youtube.com/watch?v=${p.video.youtube}" target="_blank" rel="noopener noreferrer">Voir sur YouTube ↗</a>
  </div>`;
}

function projectMedia(p) {
  if (p.video) {
    if (p.video.youtube) {
      return `<div class="pd-media pd-media--youtube reveal">
        ${youtubeConsentMarkup(p)}
      </div>`;
    }
    const auto = reducedMotion ? 'controls' : 'autoplay loop muted playsinline';
    return `<div class="pd-media reveal">
      <video class="pd-video" src="${p.video.src}" ${auto} preload="metadata" aria-label="${p.video.alt}"></video>
    </div>`;
  }
  if (p.shots) {
    return `<div class="pd-shots reveal">${p.shots.map((shot, index) => `
      <figure class="pd-shot">
        <a class="pd-shot-open" href="${shot.src}" target="_blank" rel="noopener noreferrer" data-shot-index="${index}" aria-haspopup="dialog" aria-label="Agrandir : ${shot.alt}">
          <img src="${shot.src}" alt="${shot.alt}" loading="lazy">
          <span class="pd-shot-hint" aria-hidden="true">Agrandir ↗</span>
        </a>
        <figcaption>${shot.caption || shot.alt}</figcaption>
      </figure>`).join('')}</div>`;
  }
  return `<div class="pd-media reveal">${cardMedia(p)}</div>`;
}

if (projectIndex === -1) {
  document.title = 'Projet introuvable — Youen Le Buan';
  projectPage.innerHTML = `
    <div class="pd-head">
      <h1 class="pd-title">Ce projet est introuvable.</h1>
      <p class="pd-disc">Le lien est peut-être ancien. Tous les projets sont sur la page Projets.</p>
    </div>
    <a class="pd-next" href="projets.html"><span><small>Retour</small><strong>Tous les projets</strong></span><span aria-hidden="true">→</span></a>`;
} else {
  const p = projects[projectIndex];
  const next = projects[(projectIndex + 1) % projects.length];
  document.title = `${p.card.name} — Youen Le Buan`;

  projectPage.innerHTML = `
    <header class="pd-head">
      <p class="pd-kicker section-kicker">Projet ${pad(projectIndex + 1)}</p>
      ${cardMeta(p)}
      <h1 class="pd-title">${p.card.headline}</h1>
      <p class="pd-disc">${p.card.discipline}</p>
    </header>

    ${projectMedia(p)}

    <div class="pd-body">
      <div class="pd-text reveal">
        <h2>Le contexte</h2>
        <p>${p.desc}</p>

        <h2>La démarche</h2>
        <ol class="pd-steps">
          ${p.steps.map(([etape, texte]) => `<li><strong>${etape}</strong>${texte}</li>`).join('')}
        </ol>

        ${p.challenge ? `<h2>Le défi</h2>\n        <p>${p.challenge}</p>` : ''}
      </div>

      <aside class="pd-facts reveal" style="--d:0.08s" aria-label="En bref">
        <dl>
          ${p.brief.map(([libelle, valeur]) => `<dt>${libelle}</dt><dd>${valeur}</dd>`).join('')}
        </dl>
        <p class="pd-label">Outils</p>
        <ul class="pd-tools">${p.tools.map(t => `<li>${t}</li>`).join('')}</ul>
      </aside>
    </div>
    
    <a class="pd-next" href="${projectUrl(next)}">
      <span><small>Projet suivant</small><strong>${next.card.name}</strong></span>
      <span aria-hidden="true">→</span>
    </a>`;
}

// Le lecteur n'existe qu'après accord ; retirer l'accord le remplace aussitôt
// par le choix local, sans requête YouTube ni miniature distante au préalable.
if (projectIndex !== -1 && projects[projectIndex].video && projects[projectIndex].video.youtube) {
  const youtubeMedia = projectPage.querySelector('.pd-media--youtube');
  const p = projects[projectIndex];
  if (youtubeMedia) {
    const updateYouTube = () => {
      if (cookieConsent.allowsYouTube()) {
        if (youtubeMedia.querySelector('iframe')) return;
        youtubeMedia.innerHTML = `<iframe class="pd-video" src="https://www.youtube-nocookie.com/embed/${p.video.youtube}" title="${p.video.alt}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      } else {
        youtubeMedia.innerHTML = youtubeConsentMarkup(p);
        const button = youtubeMedia.querySelector('[data-cookie-open]');
        if (button) button.addEventListener('click', () => cookieConsent.open(button));
      }
    };
    updateYouTube();
    document.addEventListener('cookie-choice-change', updateYouTube);
  }
}

// ============================= AFFICHES : VUE AGRANDIE =============================
// Le dialogue natif gère Échap et le focus. Sans cette API, le lien ouvre
// simplement l'image originale. Le zoom conserve un vrai défilement tactile.
const imageViewer = document.getElementById('imageViewer');
if (projectIndex !== -1 && projects[projectIndex].shots && imageViewer
    && typeof imageViewer.showModal === 'function') {
  const viewerImage = document.getElementById('imageViewerImage');
  const viewerCaption = document.getElementById('imageViewerCaption');
  const viewerStage = imageViewer.querySelector('.image-viewer-stage');
  const zoomButton = document.getElementById('imageViewerZoom');
  const closeButton = document.getElementById('imageViewerClose');
  let imageTrigger = null;

  const resetZoom = () => {
    imageViewer.classList.remove('is-zoomed');
    viewerImage.style.removeProperty('width');
    zoomButton.textContent = 'Zoom +';
    zoomButton.setAttribute('aria-pressed', 'false');
    viewerStage.scrollTop = 0;
    viewerStage.scrollLeft = 0;
  };
  projectPage.querySelectorAll('[data-shot-index]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      if (menuOpen) closeMenu({ restoreFocus: false });
      const shot = projects[projectIndex].shots[Number(link.dataset.shotIndex)];
      imageTrigger = link;
      resetZoom();
      viewerImage.src = shot.src;
      viewerImage.alt = shot.alt;
      viewerCaption.textContent = shot.caption || shot.alt;
      imageViewer.setAttribute('aria-label', `Vue agrandie : ${shot.alt}`);
      imageViewer.showModal();
      lockScroll(true);
      closeButton.focus({ preventScroll: true });
    });
  });
  zoomButton.addEventListener('click', () => {
    if (imageViewer.classList.contains('is-zoomed')) { resetZoom(); return; }
    const width = viewerImage.getBoundingClientRect().width;
    if (!width) return;
    imageViewer.classList.add('is-zoomed');
    viewerImage.style.width = `${width * 2}px`;
    zoomButton.textContent = 'Zoom −';
    zoomButton.setAttribute('aria-pressed', 'true');
  });
  closeButton.addEventListener('click', () => imageViewer.close());
  imageViewer.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [zoomButton, closeButton];
    const current = controls.indexOf(document.activeElement);
    const next = current === -1 ? 0 : (current + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
    event.preventDefault();
    controls[next].focus();
  });
  imageViewer.addEventListener('click', event => {
    if (event.target !== imageViewer) return;
    const box = imageViewer.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right
        || event.clientY < box.top || event.clientY > box.bottom) imageViewer.close();
  });
  imageViewer.addEventListener('close', () => {
    lockScroll(false);
    resetZoom();
    if (imageTrigger) imageTrigger.focus({ preventScroll: true });
    imageTrigger = null;
  });
}

// Fichier absent ou codec illisible (un .mov d'export, typiquement) : on remet le
// motif graphique à la place plutôt que de laisser un rectangle noir. Même esprit
// que le repli des logos sur leur monogramme.
const projectVideo = projectPage.querySelector('.pd-video');
if (projectVideo && projectVideo.tagName === 'VIDEO') {
  projectVideo.addEventListener('error', () => {
    projectVideo.parentElement.innerHTML = artMarkup(projects[projectIndex]);
  });
}
