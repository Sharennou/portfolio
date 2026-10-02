// Données et capacités du site, chargé en premier sur toutes les pages.
// Les `const` de premier niveau d'un script classique sont partagés entre les fichiers.

// ============================= DATA =============================
// LES TROIS PROJETS DU PORTFOLIO. `featured: true` = il apparaît aussi dans
// l'éventail de l'accueil — ils le sont tous les trois, et l'éventail est une
// grille de 3 colonnes : en ajouter un quatrième demande de revoir `.fan-deck`.
//
// Champs d'une entrée :
//   slug      l'adresse de sa page, `projet.html?p=slug`
//   art/mark  motif graphique et glyphe qui remplacent une image absente
//   card      ce qu'affichent les cartes : `name`, `kind`, `date` (ANNÉE seule,
//             affichée « Stage · 2026 », VIDE si inconnue — jamais inventée),
//             `headline` (l'accroche), `discipline`, `img`, `logo`
//   short     une phrase, sur la carte de projets.html uniquement
//   video     facultatif — le visuel du haut de la page projet est une vidéo.
//             MP4 H.264 OBLIGATOIRE : un .mov d'export (codec Animation, ProRes…)
//             n'est lu par aucun navigateur. Fichier absent = repli sur le motif.
//   shots     facultatif — plusieurs images côte à côte au lieu d'un seul visuel
//   desc      « Le contexte » sur la page du projet
//   brief     « En bref » : paires [libellé, valeur]
//   steps     « La démarche » : paires [étape, description]
//   challenge « Le défi » — facultatif, la section disparaît s'il est absent
//   takeaway  « Ce que j'en retiens », l'encadré de fin
//   tools     les logiciels, en pastilles
//
// Les deux projets d'exemple fictifs ont été retirés en même temps que ces trois
// vrais projets sont arrivés. Ne jamais réintroduire de contenu inventé ici.
const projects = [
  {
    slug: 'maison-cadiou',
    art: 'art-motion',
    featured: true,
    // carte de l'accueil et de la liste (« nom · catégorie / accroche / discipline »)
    card: {
      name: 'Maison Cadiou', kind: 'Stage', date: '2026',
      headline: "Donner vie à la marque Kostum",
      discipline: 'Animation de logo',
      img: 'img/kostum logo.webp', logo: ''
    },
    mark: 'MC',
    short: "Stage de deuxième année : animer le nouveau logo de Kostum, la marque premium de Maison Cadiou.",
    desc: "Pendant mon stage de deuxième année, Maison Cadiou m'a confié l'animation de son nouveau logo. Le brief était de refléter les valeurs de sa marque premium, Kostum : simplicité et efficacité.",
    brief: [
      ['Contexte', "Stage de BUT MMI 2ᵉ année — avril à juin, 11 semaines"],
      ['Client', 'Maison Cadiou, portails et clôtures'],
      ['Mon rôle', 'Idée, storyboard et animation']
    ],
    steps: [
      ['Recherche', 'Croquis, puis storyboard pour poser les mouvements et le rythme.'],
      ['Préparation', "Le logo m'a été fourni, mais je l'ai recopié à la main pour mieux l'intégrer à l'animation."],
      ['Itérations', "Avant la version finale, j'ai réalisé deux autres animations. Je les ai écartées, car elles ne correspondaient pas à l'image de la marque."],
      ['Version finale', "Celle qui colle le mieux aux valeurs de Kostum."]
    ],
    takeaway: "Un brief comme « simple et efficace » est plus exigeant qu'il n'y paraît. Il m'a appris à itérer, à écarter des pistes et à rester fidèle à l'identité d'une marque.",
    // Le logo animé, en haut de la page du projet. Le fichier doit être un MP4
    // H.264 : le .mov d'export (codec QuickTime Animation) n'est lisible par
    // AUCUN navigateur. Tant qu'il est absent, la page retombe sur le motif
    // graphique — voir le repli dans project.js.
    video: { youtube: 'CAAvo8Kf-Qk', alt: "Le logo Kostum animé" },
    tools: ['After Effects']
  },
  {
    slug: 'paris-34-secondes',
    art: 'art-video',
    featured: true,
    card: {
      name: 'Paris en 34 secondes', kind: 'Projet personnel', date: '',
      headline: 'Vlog de vacances à Paris',
      discipline: 'Montage vertical',
      img: 'img/projet paris.webp', logo: ''
    },
    mark: '34',
    short: "Un montage court et nerveux tiré de plans filmés au téléphone pendant des vacances à Paris.",
    desc: "Pendant des vacances à Paris, j'ai filmé de nombreux plans à la verticale avec mon téléphone. J'en ai tiré un montage court et dynamique, dans les codes des vidéos de voyage qu'on voit sur TikTok.",
    brief: [
      ['Contexte', 'Projet personnel'],
      ['Format', 'Vertical, 34 secondes'],
      ['Diffusion', 'Instagram et TikTok']
    ],
    steps: [
      ['Le tri', 'Plus de 400 vidéos à visionner pour ne garder que les meilleurs plans.'],
      ['La musique', "En parcourant mon feed Deezer, « Back Home » de Yeat m'a tout de suite paru évidente. Son rythme, ni trop rapide ni trop lent, donne l'impression de voyager avec la vidéo."],
      ['Le montage', 'Les clips sont calés sur les beats, dans un ordre choisi pour garder le rythme.'],
      ['Les transitions', 'Flashs, découpes en masques et détourages pour enchaîner les plans.'],
      ["L'étalonnage", "Préserver l'ambiance parisienne tout en gardant une touche de jaune qui donne sa signature à l'image."],
      ['La publication', 'Mise en ligne sur Instagram et TikTok.']
    ],
    takeaway: "Un montage se joue autant dans ce qu'on retire que dans ce qu'on garde. Passer de 400 clips à 34 secondes oblige à faire des choix.",
    tools: ['DaVinci Resolve']
  },
  {
    slug: 'affiches-rappeurs',
    art: 'art-poster',
    featured: true,
    card: {
      name: 'Affiches de rappeurs', kind: 'Projet personnel', date: '',
      headline: "La musique mise en image",
      discipline: 'Graphisme et composition',
      img: 'img/projets/affiche-jeune-morty.jpg', logo: ''
    },
    // Les deux affiches, côte à côte en haut de la page du projet. En ajouter
    // une troisième ne demande qu'une ligne : la grille s'ajuste toute seule.
    shots: [
      { src: 'img/projets/affiche-8ruki.webp', alt: "Affiche réalisée pour le rappeur 8ruki" },
      { src: 'img/projets/affiche-jeune-morty.jpg', alt: "Affiche réalisée pour le rappeur Jeune Morty" }
    ],
    mark: '♪',
    short: "Traduire en affiches l'univers des rappeurs que j'écoute, avec une identité visuelle propre à chacun.",
    desc: "La musique est l'une de mes passions. J'ai voulu traduire en affiches l'univers des rappeurs que j'écoute, avec une identité visuelle propre à chacun.",
    brief: [
      ['Contexte', 'Projet personnel'],
      ['Série', '2 affiches à ce jour — Jeune Morty, 8ruki'],
      ['Format', 'Horizontal, pensé pour Instagram']
    ],
    steps: [
      ['Les inspirations', "Recherche de références sur Pinterest pour trouver l'ambiance de chaque affiche."],
      ["L'univers", "Palette de couleurs et typographies inspirées directement des albums de chaque artiste, pour rester fidèle à leur identité."],
      ['La construction', "Visuels de base retravaillés, puis ajout de calques, de textures, de grain, de masques et de modes de fusion, de la composition jusqu'aux finitions."]
    ],
    challenge: "Trouver le juste milieu. Trop d'effets alourdissent l'affiche, pas assez la laissent plate. Tout le travail a consisté à harmoniser les éléments sans en faire trop.",
    takeaway: "Doser les effets pour qu'ils servent l'image plutôt que de la surcharger.",
    tools: ['Affinity Designer']
  }
];

// Les téléphones larges en paysage gardent la mise en page tactile. La seconde
// condition ne concerne pas les écrans PC, même lorsque leur fenêtre est étroite.
const mobileLayoutQuery = '(max-width: 859px), (max-width: 999px) and (hover: none) and (pointer: coarse)';
const desktopLayoutQuery = '(min-width: 860px) and (hover: hover), (min-width: 860px) and (pointer: fine), (min-width: 1000px)';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
// Si le CDN est bloqué ou en reduced-motion, le site retombe sur la version native sans animation
const motionOK = !reducedMotion
  && typeof gsap !== 'undefined'
  && typeof ScrollTrigger !== 'undefined';
if (motionOK) gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, '0');

// ============================= PROJETS : FABRIQUE DE MARKUP =============================
// Adresse de la page d'un projet : une seule page gabarit, remplie selon ?p=slug
const projectUrl = (p) => `projet.html?p=${encodeURIComponent(p.slug)}`;
// Visuel de couverture et vignette : l'image si elle existe, sinon motif et glyphe
const cardMedia = (p) => p.card.img ? `<img src="${p.card.img}" alt="" loading="lazy">` : artMarkup(p);
// Catégorie suivie de l'année : « Stage · 2024 ». Sans date renseignée, la catégorie seule.
const cardKind = (p) => p.card.date ? `${p.card.kind} · ${p.card.date}` : p.card.kind;
const cardLogo = (p) => p.card.logo ? `<img src="${p.card.logo}" alt="">` : p.mark;
// Même identité de projet sur l'accueil, la galerie et la fiche.
const cardMeta = (p) => `<span class="pc-top"><span class="pc-name">${p.card.name}</span><span class="pc-kind">${cardKind(p)}</span></span>`;
// La discipline et la flèche forment le pied commun des cartes cliquables.
const cardFooter = (p) => `<span class="pc-footer"><span class="pc-disc">${p.card.discipline}</span><span class="pc-arrow" aria-hidden="true">↗</span></span>`;
const artMarkup = (p) => `<span class="pj-art ${p.art}"><span class="pj-art-layer"></span><span class="pj-mark">${p.mark}</span><span class="pj-glow"></span></span>`;

// Lettres découpées pour l'animation, texte intact pour les lecteurs d'écran
const splitTitle = (text) => `<span class="sr-only">${text}</span><span aria-hidden="true">${
  text.split(' ').map(w => `<span class="wd">${Array.from(w).map(c => `<span class="ch">${c}</span>`).join('')}</span>`).join(' ')
}</span>`;

// ============================= RÉSEAUX =============================
// À REMPLIR : collez vos deux adresses ici, c'est le SEUL endroit à modifier.
// Elles alimentent à la fois les icônes à côté du burger et les pastilles du pied de page.
// Tant qu'une url est vide, l'icône s'affiche en pointillés et ne mène nulle part.
const socials = [
  { label: 'YouTube', url: 'https://www.youtube.com/@sharennou1716' },
  { label: 'TikTok',  url: 'https://www.tiktok.com/@youen.lbn' }
];

// Gardé bien qu'inutilisé : les icônes rondes de la barre, seules à s'en servir,
// ont été retirées à la demande de l'utilisateur. Le panneau de menu et le pied de
// page affichent les réseaux en texte. À rebrancher si un rendu en icônes revient.
const socialIcons = {
  YouTube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="4"/><path d="M10.5 9.3v5.4l4.7-2.7z" fill="currentColor" stroke="none"/></svg>',
  TikTok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v11.6a4.1 4.1 0 1 1-4.1-4.1"/><path d="M14 6.1a5.3 5.3 0 0 0 5.1 3.7"/></svg>'
};

// ============================= À PROPOS =============================
// Une entrée = une ligne « image + texte », alternée gauche/droite au scroll.
// `img` : chemin d'une photo. Laissé VIDE, un motif graphique prend sa place —
// déposez vos photos dans img/apropos/ et renseignez le chemin ici, rien d'autre.
const about = [
  {
    img: 'img/apropos/bretagne.svg',
    alt: 'Carte de France cadrée sur la Bretagne : ses quatre départements ressortent d’un gris plus soutenu, le reste du pays continue au-delà du cadre.',
    map: true,
    // Le CADRAGE de la carte, recopié tel quel du `viewBox` de bretagne.svg.
    // ⚠ Les deux doivent rester identiques : le SVG s'en sert pour cadrer ses
    // contours, home.js pour placer les repères et les libellés par-dessus.
    // En changer un seul les décale tous.
    // C'est un ZOOM : la carte est celle de la France entière, mais cadrée sur
    // la Bretagne, et le reste du pays continue au-delà du bord droit de
    // l'écran. Deux contraintes de l'utilisateur, toutes deux à tenir :
    //   • la Bretagne (x 48,8–710,3 ; y 172,1–564,4) tient ENTIÈREMENT dans le
    //     cadre — c'est la France autour d'elle qui dépasse, jamais elle ;
    //   • elle occupe ~72 % de la largeur : assez pour rester le sujet, assez
    //     peu pour qu'on voie la Normandie et les Pays de la Loire arriver.
    view: [40, 117, 920, 556],
    // Les repères posés SUR la carte. Le fichier SVG ne contient que les
    // contours : point, épingle, flèches et libellés sont construits par
    // home.js par-dessus, pour que les libellés soient du vrai texte, dans la
    // police et les couleurs du site (dans un <img>, un texte SVG ne peut pas
    // atteindre la police chargée par la page — il retombait sur de l'Arial).
    //
    // Coordonnées dans le repère des contours — celui de la projection plus bas,
    // indépendant du cadrage `view`, qui ne fait que décider ce qu'on en voit :
    //   `at`   le point désigné ;
    //   `text` le haut du libellé, qui est centré sur cette abscisse ;
    //   `bend` le galbe de la flèche — le signe choisit le côté du ventre ;
    //   `gap`  le vide laissé devant le repère, pour que la pointe ne le touche pas
    //          (une épingle se montre par sa base, elle en demande moins qu'un point).
    // La courbe ET sa pointe sont CALCULÉES à partir de ces quatre valeurs :
    // il n'y a aucun tracé à écrire à la main (voir `mapArrow` dans home.js).
    //
    // Pour désigner une autre commune bretonne, la projection de la carte est
    //   X = 319.0 + (longitude + 3.4556) × 160.4
    //   Y = 212.3 − (latitude − 48.7345) × 241.8
    // vérifiée sur Brest, Quimper, Vannes, Saint-Brieuc, Locronan et Rennes.
    // Les coordonnées d'une commune : https://geo.api.gouv.fr/communes?nom=…&fields=centre
    marks: [
      // Lannion (lon −3.4556, lat 48.7345)
      { kind: 'dot', at: [319.0, 212.3], text: [404, 336], bend: -0.20, gap: 30,
        label: 'j’étudie ici 🎒', sub: '(à Lannion)' }
      // Un seul repère, c'est voulu : un second (« je viens d'ici », en épingle
      // orange) a été proposé puis REFUSÉ par l'utilisateur. Ne pas le remettre
      // sans qu'on le redemande. La forme `pin` reste dans home.js, prête à
      // servir : `{ kind: 'pin', at: [X, Y], text: [X, Y + 110], bend: 0.18, gap: 16 }`.
    ],
    // La photo posée de travers à DROITE de la carte (demande de l'utilisateur ;
    // elle était à gauche avant, ne pas l'y remettre).
    // ⚠ C'est un PORTRAIT (886×1572) : la largeur de `.ab-postcard` a été
    // resserrée pour ça. En y mettant une photo paysage, la revoir.
    // Préparée avant d'entrer ici, comme tout visuel : le PNG d'origine
    // (`img/photo pour carte.png`) pesait 2,2 Mo, le WebP en fait 107 Ko.
    // Fichier introuvable : la photo est simplement retirée (voir home.js),
    // plutôt que d'afficher une image cassée.
    photo: {
      src: 'img/apropos/photo-carte.webp',
      alt: 'Moi à Paris, sur des marches qui dominent les toits de la ville, au crépuscule.',
      // Légende volontairement VIDE (demande de l'utilisateur) : le tirage
      // n'affiche alors aucun <figcaption>, et son cadre redevient régulier.
      caption: ''
    },
    art: 'art-video', mark: '22',
    caption: '',
    title: "D'où je viens",
    paragraphs: [
      "Je m’appelle <strong>Youen Le Buan</strong> et j’ai <strong>20 ans</strong>. Depuis tout petit, je passe du temps sur un ordinateur : au début pour jouer aux jeux vidéo, aujourd’hui pour créer.",
      "J’aime travailler sur beaucoup de choses différentes. C’est pour ça que j’ai choisi d’étudier en <strong>BUT MMI à l’IUT de Lannion</strong>."
    ],
    facts: []
  }
];

// ============================= OUTILS =============================
// La frise de tuiles en haut d'À propos. Une entrée = une tuile carrée arrondie,
// dont le nom s'affiche au survol (et en permanence sur écran tactile).
// `mono` : deux caractères, affichés tant qu'aucune icône n'est déposée.
// `logo` : chemin d'une vraie icône, à mettre dans `img/outils/`. Renseigné, il
// remplace le monogramme — c'est le même repli que les logos d'employeurs.
// `bg`/`fg` : couleurs de la tuile, choisies pour que le monogramme tienne 4,5:1
// dessus. En ajoutant un outil, refaire ce calcul plutôt que de piocher au hasard.
const tools = [
  // Rien que le logo : la tuile n'a AUCUN fond, aucun filet (demande de
  // l'utilisateur). Les fichiers qui sont des icônes d'app portent déjà le leur,
  // les autres sont des marques nues — dans les deux cas on ne pose rien autour.
  // Tous sont affichés dans un cadre carré de même taille (voir `.tool-tile`).
  // `mono` ne sert qu'au repli si un fichier venait à manquer.
  { name: 'Affinity',        mono: 'Af', logo: 'img/outils/affinity.webp' },
  { name: 'Figma',           mono: 'Fi', logo: 'img/outils/figma.svg' },
  { name: 'After Effects',   mono: 'Ae', logo: 'img/outils/after-effects.svg' },
  { name: 'Photoshop',       mono: 'Ps', logo: 'img/outils/photoshop.svg' },
  { name: 'Premiere Pro',    mono: 'Pr', logo: 'img/outils/premiere-pro.svg' },
  { name: 'DaVinci Resolve', mono: 'Dv', logo: 'img/outils/davinci-resolve.webp' },
  { name: 'Blender',         mono: 'Bl', logo: 'img/outils/blender.svg' },
  { name: 'VS Code',         mono: 'Vs', logo: 'img/outils/vs-code.svg' },
  { name: 'Claude',          mono: 'Cl', logo: 'img/outils/claude.webp' },
  { name: 'HTML',            mono: 'Ht', logo: 'img/outils/html.webp' },
  { name: 'CSS',             mono: 'Cs', logo: 'img/outils/css.webp' }
];

// ============================= PASSIONS =============================
// Les 8 visuels qui traversent la section #passions. **C'est le TEXTE qui reste
// figé à l'écran, pas eux** : ils sont posés dans la page, défilent à sa vitesse
// et passent devant le texte. Les positions de gauche sont légèrement repoussées
// vers le centre pour retarder le moment où elles le recouvrent.
// L'inverse a été codé puis corrigé par l'utilisateur : ne pas y revenir.
//
// Position et taille sont posées en variables CSS inline (--x, --y, --w, --ar,
// --tilt) plutôt qu'en styles directs : c'est ce qui permet au CSS de les
// ignorer sous 860px, où les visuels repassent en grille au-dessus du texte.
// --x : en % de la largeur de l'écran ; une valeur négative fait déborder le
// visuel du bord, comme dans la référence donnée par l'utilisateur.
// --y : en % de la HAUTEUR TOTALE de la section, soit trois écrans. Les valeurs
// sont donc étalées de 3 % à 85 % pour qu'il y en ait toujours un qui passe.
//
// Les emplacements sont écrits à la main et non tirés au sort : un vrai hasard
// redistribuerait tout à chaque chargement. La course est volontairement plus
// basse que la photo « Moments partagés » pour que les deux respirent.
//
// `img` vide : le motif `art` et le glyphe `mark` prennent la place, comme
// partout ailleurs. Photos et captures à déposer dans `img/passions/`.
const passionShots = [
  { img: 'img/passions/passion-1.webp', alt: 'Promenade avec des amis',                    label: 'Moments partagés', art: 'art-mobility', mark: '01', x: '16%', y: '27%', w: '240px', ar: '562/1000',  tilt: '-4deg' },
  { img: 'img/passions/passion-2.webp', alt: 'Rappeur sur scène sous une lumière verte',   label: 'Musique live',     art: 'art-poster',   mark: '02', x: '74%', y: '10%', w: '260px', ar: '462/1000',  tilt: '4deg'  },
  { img: 'img/passions/passion-3.webp', alt: 'Course de cross-country en compétition',     label: 'Course à pied',    art: 'art-ml',       mark: '03', x: '30%', y: '43%', w: '250px', ar: '666/1000',  tilt: '-6deg' },
  { img: 'img/passions/passion-4.webp', alt: 'Fête en plein air au coucher du soleil',     label: 'Découvertes',      art: 'art-video',    mark: '04', x: '66%', y: '34%', w: '270px', ar: '3/4',       tilt: '2deg'  },
  { img: 'img/passions/passion-5.webp', alt: 'Vue de Paris et de la tour Eiffel au soir',  label: 'Paris',            art: 'art-motion',   mark: '05', x: '45%', y: '48%', w: '230px', ar: '562/1000',  tilt: '5deg'  },
  { img: 'img/passions/passion-6.webp', alt: 'Voitures sportives lors d’un rassemblement', label: 'Automobile',       art: 'art-web',      mark: '06', x: '80%', y: '59%', w: '245px', ar: '3/4',       tilt: '-5deg' },
  { img: 'img/passions/passion-7.webp', alt: 'Photo de groupe d’une équipe de football',   label: 'Football',         art: 'art-poster',   mark: '07', x: '18%', y: '72%', w: '340px', ar: '250/131',   tilt: '3deg'  },
  { img: 'img/passions/passion-8.webp', alt: 'Promenade nocturne dans une rue de Paris',   label: 'Virées nocturnes', art: 'art-mobility', mark: '08', x: '64%', y: '84%', w: '250px', ar: '3/4',       tilt: '-4deg' }
];


// une photo si elle existe, sinon le motif graphique du projet correspondant
const shotMarkup = (a) => a.img
  ? `<img src="${a.img}" alt="${a.alt}" loading="lazy">`
  : `<span class="pj-art ${a.art}"><span class="pj-art-layer"></span><span class="pj-mark">${a.mark}</span></span>`;

// ============================= EXPÉRIENCES =============================
// `logo` : chemin d'une image. Laissé VIDE, le monogramme `mono` prend sa place.
const jobs = [
  {
    logo: 'img/Mcdonalds.webp', mono: 'MCD',
    role: 'Équipier polyvalent', org: "McDonald's", city: '',
    when: '2026 · 1 mois',
    text: "Poste en cuisine sur des services à flux tendu. J'y ai appris à tenir une position précise dans une équipe qui ne s'arrête jamais, et à garder la qualité même dans le rush.",
    tags: ['Travail en équipe', 'Rythme soutenu', 'Gestion du stress']
  },
  {
    logo: 'img/maison cadiou.webp', mono: 'MC',
    role: 'Stagiaire communication', org: 'Maison Cadiou', city: 'Locronan (29)',
    when: '2026 · 11 semaines',
    text: "Gestion des contenus de la marque : création de visuels, tournage et montage de vidéos, publication et suivi sur les réseaux sociaux. Mon stage le plus long et le plus complet côté production.",
    tags: ['Création de visuels', 'Montage vidéo', 'Réseaux sociaux', 'Adobe']
  },
  {
    logo: 'img/startpeople.png', mono: 'INT',
    role: "Missions d'intérim", org: 'Usine, ménage, mise en rayon', city: 'Bretagne',
    when: '2025 · missions courtes',
    text: "Plusieurs missions courtes enchaînées pendant l'été. Chaque poste demandait d'être opérationnel en quelques heures — une bonne école de l'adaptation.",
    tags: ['Adaptabilité', 'Autonomie', 'Polyvalence']
  },
  {
    logo: 'img/isitix.webp', mono: 'IX',
    role: 'Stagiaire machine learning', org: 'Isitix', city: 'Lannion (22)',
    when: '2024 · 2 mois',
    text: "Participation au développement d'un vêtement connecté piloté à la voix : traitement du signal, tests de reconnaissance et itérations avec l'équipe technique jusqu'au prototype.",
    tags: ['Machine learning', 'Python', 'Traitement du signal', 'Prototypage']
  },
  {
    logo: 'img/ecocompteur.webp', mono: 'EC',
    role: 'Stagiaire', org: 'Éco-compteur', city: 'Lannion (22)',
    when: '2023 · 1 mois',
    text: "Conception d'un système de comptage et d'analyse des flux de mobilité urbaine, pensé pour aider les collectivités à comprendre les déplacements sur leur territoire.",
    tags: ['Capteurs de comptage', 'Traitement de données', 'Mobilité urbaine']
  },
  {
    logo: 'img/cirisi.webp', mono: 'CIR',
    role: 'Stagiaire technique', org: 'CIRISI / CSS Kerambrun', city: 'Lannion (22)',
    when: '2023 · 2 mois',
    text: "Maintenance informatique et réseaux au quotidien, puis installation et raccordement de systèmes électriques. Ma première vraie immersion dans un service technique.",
    tags: ['Maintenance IT', 'Réseaux', 'Électricité']
  }
];

// un vrai logo s'il existe, sinon les initiales
const jobLogo = (j) => j.logo
  ? `<img src="${j.logo}" alt="" loading="lazy">`
  : `<span aria-hidden="true">${j.mono}</span>`;
