// Page projets.html : tous les projets, en cartes horizontales.
// Même anatomie que les cartes de l'accueil (classes .pc-*), visuel à gauche.
// Chaque carte ouvre la page du projet (projet.html?p=slug).

const projectList = document.getElementById('projectList');

projectList.innerHTML = projects.map((p, i) => `
  <li class="reveal" style="--d:${(i % 2) * 0.06}s">
    <a class="pcard" href="${projectUrl(p)}">
      <span class="pc-media">${cardMedia(p)}<span class="pc-index" aria-hidden="true">${pad(i + 1)}</span></span>
      <span class="pcard-info">
        ${cardMeta(p)}
        <span class="pc-title">${p.card.headline}</span>
        <span class="pcard-short">${p.short}</span>
        ${cardFooter(p)}
      </span>
    </a>
  </li>
`).join('');
