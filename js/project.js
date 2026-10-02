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
function projectMedia(p) {
  if (p.video) {
    if (p.video.youtube) {
      return `<div class="pd-media reveal">
        <iframe class="pd-video" src="https://www.youtube-nocookie.com/embed/${p.video.youtube}" title="${p.video.alt}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>`;
    }
    const auto = reducedMotion ? 'controls' : 'autoplay loop muted playsinline';
    return `<div class="pd-media reveal">
      <video class="pd-video" src="${p.video.src}" ${auto} preload="metadata" aria-label="${p.video.alt}"></video>
    </div>`;
  }
  if (p.shots) {
    return `<div class="pd-shots reveal">${p.shots.map(shot =>
      `<img src="${shot.src}" alt="${shot.alt}" loading="lazy">`).join('')}</div>`;
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

// Fichier absent ou codec illisible (un .mov d'export, typiquement) : on remet le
// motif graphique à la place plutôt que de laisser un rectangle noir. Même esprit
// que le repli des logos sur leur monogramme.
const projectVideo = projectPage.querySelector('.pd-video');
if (projectVideo && projectVideo.tagName === 'VIDEO') {
  projectVideo.addEventListener('error', () => {
    projectVideo.parentElement.innerHTML = artMarkup(projects[projectIndex]);
  });
}
