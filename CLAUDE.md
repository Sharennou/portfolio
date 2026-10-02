# Portfolio — Youen Le Buan

Portfolio en français (cinq pages) pour un étudiant en BUT MMI (IUT de Lannion) : code, vidéo, motion design, communication.

## Stack

Vanilla HTML/CSS/JS, aucun framework, aucun build step, aucune dépendance npm. Pas de `package.json`. Le CSS et le JS étaient inline tant qu'il n'y avait qu'une page ; **depuis le passage à plusieurs pages ils vivent dans `cs/` et `js/`**, sinon les pages divergeraient.

Deux dépendances externes, toutes deux avec hash SRI et `crossorigin` :
- **GSAP 3.12.5 + ScrollTrigger** via cdnjs (les fichiers GSAP doivent rester sur la même version).
- **Lenis 1.3.26** (défilement fluide, MIT) via jsDelivr — **il n'est pas publié sur cdnjs**, d'où l'exception au « tout cdnjs ». Empreinte recalculée à la main : `openssl dgst -sha384 -binary lenis.min.js | openssl base64 -A`. Le site doit rester fonctionnel si le CDN est bloqué — voir la section Animations de [DESIGN.md](DESIGN.md).

## Structure

Cinq pages qui partagent la même feuille de style et le même socle de script :

- `index.html` — **accueil** : `#accueil` (clair, colonne centrée avec photo ronde) → `#competences` → `#phares` (3 projets en éventail) → `#apropos` (frise d'outils, ligne image + texte) → `#passions` (texte figé, visuels qui défilent par-dessus) → `#experience` (liste `jobs` + formation) → `#contact`
- `projets.html` — **tous les projets** : `#projets` (titre `h1`, phrase d'intro, cartes horizontales) → `#contact`. Chaque carte ouvre la page du projet. L'ancienne galerie horizontale épinglée et sa vue plein écran `#pjDetail` ont été supprimées à la demande de l'utilisateur : ne pas les réintroduire. GSAP Flip n'est plus chargé.
- `projet.html` — **page d'un projet**, une seule page gabarit pour tous : le projet est choisi par l'adresse `projet.html?p=slug` et rendu par `js/project.js` (titre, visuel, description, encadré « En bref », lien « Projet suivant »). Slug inconnu : message « Ce projet est introuvable » et retour à la liste. **Ne pas créer un fichier HTML par projet** : ajouter une entrée dans `projects` suffit.
- `rgpd.html` — confidentialité : données, choix YouTube, prestataires actuels (GitHub Pages, polices et CDN), conservation et droits. Mettre à jour l'hébergement lors d'une migration.
- `cgu.html` — conditions de consultation, éditeur, hébergement, créations et droits des tiers ; aucun service de vente.
- `cs/style.css` — tout le CSS, partagé par les cinq pages
- `js/core.js` — données (`projects`, `socials`) et capacités (`motionOK`), chargé en premier
- `js/site.js` — menu, réseaux, apparitions, ancres et choix de cookies : commun aux cinq pages
- `js/home.js` — accueil uniquement (carrousel des domaines MMI, éventail, À propos, GSAP expérience)
- `js/gallery.js` — `projets.html` uniquement
- `js/project.js` — `projet.html` uniquement
- `cv/CV-Youen-Le-Buan.pdf` — le CV, ouvert par le lien « Télécharger le CV » de la pastille du menu et par celui du panneau ouvert (lecteur PDF du navigateur, qui permet le téléchargement). **Le bouton « Voir mon CV » de l'accueil a été retiré à la demande de l'utilisateur** : ne pas le remettre, le lien de la barre le remplace. **Le fichier n'existe pas encore** : le lien mène à une erreur 404 tant qu'il n'est pas déposé. Garder exactement ce nom, ou changer le `href` dans **les trois pages**.
- `img/outils/` — les onze logos de la frise d'outils ; `img/projets/` — visuels des projets, **déjà redimensionnés pour le web** ; `fonts/`, `icons/` réservés, encore vides

**Les visuels doivent être préparés avant d'entrer dans `img/projets/`.** Les affiches livrées faisaient 2481 × 3508 px pour 13 et 6 Mo (du A4 à 300 dpi) : ramenées à 1400 px de haut et 320–385 Ko avec `sips -s format jpeg -s formatOptions 62 -Z 1400`. Ne jamais référencer un fichier d'export brut depuis les données.

**Optimisation du 2 octobre 2026.** Les images utilisées sont converties en WebP quand le gain est significatif, en conservant la transparence. Le portrait et la couverture Paris sont limités à 2000 px sur leur côté le plus long ; les affiches gardent leurs dimensions. Les exports inutilisés et les images originales sont conservés hors du projet, dans `../portfolio-originaux-2026-10-02/`. Ne pas les remettre dans `img/` pour publier le site. `python3 scripts/export-site.py` crée `../portfolio-site.zip` avec uniquement les pages et leurs ressources, sans `.git`, fichiers macOS ou documentation. L'historique Git contient encore les anciens exports : il ne fait pas partie du site à héberger.

⚠ **La vidéo doit être un MP4 H.264.** Un `.mov` sorti d'After Effects (codec QuickTime Animation, ProRes…) n'est lu par **aucun navigateur**, et ne peut pas être converti avec les outils du Mac (`avconvert` refuse ces codecs). L'export doit se faire depuis After Effects ou Adobe Media Encoder en H.264.

Les `const` de premier niveau d'un script classique sont partagés entre fichiers : `core.js` doit donc être chargé avant les autres, et **deux fichiers ne doivent jamais déclarer le même nom** (sinon la page entière casse).

**Le contact est identique sur les trois pages du portfolio. Le pied de page et la bannière de cookies sont identiques sur les cinq pages**, avec les liens RGPD/CGU et le bouton Cookies : en modifiant l'un, modifier les autres.

**Les apparitions `.reveal` sont ramassées au `DOMContentLoaded`**, donc après tous les scripts de page. Avant ce correctif, `site.js` les cherchait dès son chargement : tout ce que `home.js` et `gallery.js` construisent ensuite restait à opacité 0 — la liste des projets et le texte d'À propos étaient invisibles. Tout élément `.reveal` généré en JS doit l'être **pendant le chargement**, pas plus tard (sinon il faut rappeler `observeReveals()`).

### Historique des refus

- Une première tentative de « deuxième page » et une de « côtés qui glissent » ont été refusées quand le site était en une page. Le découpage actuel en deux pages, lui, a été **demandé explicitement** — mais toute nouvelle idée de contenu caché/remplacé reste à confirmer avant de coder.
- Une tentative d'effet « Liquid Glass » (barre de verre flottante `#sideSwitch` + ScrollToPlugin) a été annulée : ne pas la réintroduire.

### Navigation

La barre du haut tient en deux éléments : le logo à gauche et, au **milieu de l'écran**, la capsule `.menu-shell` — bouton « Menu » + lien « Télécharger le CV ». Reprise de la barre de Midu, à la demande de l'utilisateur. **Les icônes de réseaux qui occupaient la droite ont été retirées** (demande explicite) : ne pas les remettre, les réseaux vivent dans le panneau de menu et le pied de page.

Le menu (`#siteMenu`, sur toutes les tailles d'écran) est **identique sur les trois pages** et volontairement court : **trois entrées seulement — 01 Accueil, 02 Projets, 03 Contact**, chacune avec sa vignette, et les réseaux en bas du panneau. L'utilisateur a demandé ce dégraissage après coup ; ne pas y rajouter les sections intermédiaires (Compétences, À propos, Expérience), on les atteint en faisant défiler l'accueil.

**La capsule et le panneau sont un seul élément** (`.menu-shell`) : fermé c'est la capsule, ouvert c'est le panneau, et il grandit sans jamais être remplacé. Le même bouton `#burger` ouvre et referme ; un clic ailleurs dans la page aussi. **À la souris, il s'ouvre aussi au survol du bouton « Menu » et se referme dès qu'on quitte le panneau** (demande de l'utilisateur) — avec deux délais et une fermeture à la molette, sans quoi il s'ouvrirait tout seul et bloquerait le défilement ; voir le bloc `isFinePointer` de `site.js`. Voir la section Animations de [DESIGN.md](DESIGN.md).

Un lien de menu vers une section qui n'existe pas sur la page courante porte `data-home` : le gestionnaire de clic l'envoie alors vers `index.html#…` au lieu de ne rien faire. Un lien vers une page porte `data-page="…"`, qui lui donne son `aria-current` quand on y est.

Les ancres sont gérées en JS (pas de `scroll-behavior: smooth` en CSS, qui perturbe ScrollTrigger).

**Chaque `<section>` doit porter `data-tone="light"` ou `"dark"`** : c'est ce qui permet au logo et aux boutons de la barre fixe de rester lisibles au-dessus d'elle. Depuis le passage au noir, **toutes les sections sont `dark` sauf `#apropos` et `#experience`**, les deux sections claires. Une section claire doit porter **en plus** la classe `tone-light`, qui redéfinit les tokens de couleur pour tout ce qu'elle contient — l'attribut sert à la barre, la classe au contenu, les deux sont nécessaires. En oubliant l'attribut, la barre garde le ton de la section précédente et le logo peut devenir invisible. Voir « Palette » et « Lisibilité de la barre » dans [DESIGN.md](DESIGN.md).

### Données

Contenu construit en JS depuis des tableaux (source unique de vérité), tous dans `core.js` sauf mention : les projets (`projects`), les lignes d'À propos (`about`), les **outils** (`tools`), les **passions** (`passions`), les expériences (`jobs`), les domaines MMI du carrousel (`mmiDomains`, dans `home.js`), les qualités personnelles (`about[0].skills`), les réseaux (`socials`).

**Images manquantes.** Trois tableaux prévoient une image avec un repli automatique, pour que la page ne paraisse jamais cassée tant que les fichiers n'existent pas :

| Tableau | Champ | Repli |
|---|---|---|
| `about` | `img` | motif graphique `art-*` (sauf `map: true`, voir plus bas) |
| `about[].photo` | `src` | le tirage photo est **retiré** (un cadre vide ne dit rien) |
| `jobs` | `logo` | monogramme `mono` (initiales), aussi utilisé si le fichier est introuvable |
| `projects[].card` | `img`, `logo` | motif `art-*`, glyphe `mark` |
| `tools` | `logo` | monogramme `mono` (la tuile n'a pas de fond) |
| `passionShots` | `img` | motif `art-*`, glyphe `mark` |
| `projects[].video` | fichier absent ou codec illisible | motif `art-*` (repli posé par `project.js`) |
| `socials` | `url` | icône en pointillés, lien inactif |

Photos d'À propos à déposer dans `img/apropos/`, logos d'employeurs dans `img/logos/`. **Les onze logos de la frise `tools` sont déjà en place**, dans `img/outils/`. **Aucun fond derrière un logo, et une seule taille pour les onze** : trois réglages ont déjà été refusés avant le bon — lire la section Animations de [DESIGN.md](DESIGN.md) avant d'y toucher.

**Images d'À propos** : chaque entrée de `about` a un champ `img`. Vide, un motif graphique `art-*` prend la place de la photo, pour que la page ne paraisse jamais cassée. La photo de l'accueil est la seule vraie image du tableau.

**La carte de Bretagne** (`about[0]`, `map: true`) **est le fond de tout le bloc « D'où je viens »** : au-dessus de 1000px elle fait **exactement une largeur d'écran**, la photo se pose **à cheval sur la frontière Bretagne / reste de la France**, sans légende, et **le texte en bas à gauche**, par-dessus elle. Demandes explicites de l'utilisateur, référence à l'appui : **ne pas rentrer la carte dans la colonne avec le texte en dessous.** En dessous de 1000px, carte puis texte, empilés.

⚠ **C'est une carte de FRANCE cadrée sur la Bretagne, pas une carte de Bretagne.** Le reste du pays continue au-delà du bord droit de l'écran : c'est ce débordement qui fait comprendre qu'on est zoomé, et c'est la demande. Deux contraintes qui vont ensemble : **la Bretagne tient entièrement à l'écran** (une version qui rognait l'Ille-et-Vilaine a été refusée) et **c'est la France autour d'elle qui sort du cadre**. Ses quatre départements sont d'un gris plus soutenu que le reste ; rien d'autre ne la désigne.

`img/apropos/bretagne.svg` ne contient **que les contours** (16 départements, 170 Ko ; la recette pour le refaire est en commentaire en tête du fichier). Le point, l'épingle, les flèches et les libellés sont posés par-dessus par `home.js` depuis le tableau `marks` de l'entrée — les libellés en HTML (donc dans la police du site, sélectionnables, lisibles par un lecteur d'écran), les flèches dans un calque SVG. **Ne pas regraver de texte dans le fichier SVG** : en `<img>`, il ne peut pas atteindre la police chargée par la page et retombe sur de l'Arial. Les flèches sont **calculées**, pas tracées : quatre valeurs par repère suffisent.

Le cadrage vit dans `about[0].view` et doit être **recopié à l'identique dans le `viewBox` du SVG** : c'est le seul doublon, et le désynchroniser décale tous les repères. Le cadrage n'est pas l'échelle — les contours gardent leurs coordonnées, donc **la projection reste valable quoi qu'on cadre**. Pour placer une commune, elle est écrite en tête du tableau `marks` : s'en servir plutôt que de viser à l'œil.

**Un seul repère, c'est voulu** : un second (« je viens d'ici », épingle orange) a été proposé puis **refusé** — ne pas le remettre. **La photo posée sur la carte est provisoire** (visuel du projet Paris) : l'utilisateur doit déposer une photo perso dans `img/apropos/`. Fichier introuvable = le tirage est retiré, pas d'image cassée. Voir la section Animations de [DESIGN.md](DESIGN.md).

**Les projets : trois, tous réels.** Maison Cadiou (animation de logo), Paris en 34 secondes (montage vertical), Affiches de rappeurs (graphisme). Les deux projets d'exemple fictifs qui remplissaient la page ont été **supprimés** en même temps — ne jamais réintroduire de contenu inventé dans `projects`, et **ne jamais inventer une date** : `card.date` reste vide si l'année est inconnue.

Les trois sont `featured`, et l'éventail de l'accueil est une grille de trois colonnes : **en ajouter un quatrième demande de revoir `.fan-deck`**. Le schéma complet d'une entrée est commenté en tête du tableau dans `core.js` — `brief`, `steps`, `challenge` (facultatif) et `takeaway` alimentent les sections de la page projet.

## Éditer le fichier par script

Les fichiers restent gros et sans build : il est tentant de supprimer un bloc avec une regex. **Ne jamais délimiter un bloc JS par un `}` ou un `});` « le premier trouvé »** : ces motifs apparaissent partout, et la coupe déborde silencieusement sur le bloc suivant. Ça a déjà effacé deux fois du code encore utile, dont tout le bloc `GSAP : SCROLL` (les animations avaient disparu du site alors que le fichier passait toutes les validations de syntaxe).

À la place : découper sur les en-têtes `// ============================= NOM =============================`, qui bornent chaque bloc de façon fiable, ou remplacer une chaîne exacte complète. **Après toute suppression, comparer le JS au fichier d'avant (`difflib`) et vérifier que seul le bloc visé a disparu** — un parse OK ne prouve rien, du code supprimé reste du code valide.

Attention aussi aux **dépendances entre blocs** : en supprimant la vue plein écran des projets, `lockScroll` est parti avec, alors que le menu burger l'appelait. Résultat, le menu ne se fermait plus, et rien ne le signalait avant l'ouverture dans un navigateur.

## Cache du navigateur

Les liens vers `cs/style.css` et `js/*.js` portent un numéro de version (actuellement `?v=20261002q`) dans **les cinq pages**. **Après chaque modification d'un fichier CSS ou JS, changer ce numéro partout** (même valeur dans `index.html`, `projets.html`, `projet.html`, `rgpd.html` et `cgu.html`). Sans ça, le navigateur peut garder l'ancien fichier en mémoire alors que le HTML est à jour : la page mélange ancien et nouveau code, et l'utilisateur voit un rendu cassé qui n'existe pas dans les fichiers — c'est arrivé avec les cartes des projets phares, dont le texte était recouvert.

## Vérifier avant de livrer

Un contrôle de syntaxe ne suffit pas, et il n'y a pas de navigateur utilisable ici. `tests/domstub.js` (outil de dev, non chargé par le site) fournit un faux DOM permettant d'**exécuter réellement** les scripts d'une page :

```sh
JSC=/System/Cryptexes/OS/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc
$JSC tests/domstub.js js/core.js js/site.js js/home.js    -e "openMenu(); closeMenu();"
$JSC tests/domstub.js js/core.js js/site.js js/gallery.js -e "openMenu(); closeMenu();"
# projet.html : sans slug, c'est la branche « projet introuvable » qui est testée
$JSC tests/domstub.js js/core.js js/site.js js/project.js -e "openMenu(); closeMenu();"
# l'autre branche demande un slug, posé AVANT le script (les arguments sont traités dans l'ordre)
$JSC tests/domstub.js -e "location.search='?p=affiches-rappeurs'" js/core.js js/site.js js/project.js -e "openMenu(); closeMenu();"
```

**Tester les deux branches de `projet.js`**, pas seulement la première : la page est restée absente longtemps et son script n'avait donc jamais été exécuté. Le faux DOM a dû être complété (`location.search`, `URLSearchParams`) pour y arriver.

GSAP étant absent, `motionOK` est faux : c'est le chemin de repli qui est testé, mais toute variable manquante ou tout élément introuvable au chargement remonte immédiatement. **À lancer après chaque modification du JS.**

## Conventions

- Polices : Unbounded (titres, `--font-display`) + Inter (texte, `--font-body`), chargées via Google Fonts.
- Tokens CSS définis dans `:root` (couleurs, `--edge`, `--maxw`) — toujours réutiliser les variables existantes plutôt que des valeurs en dur.
- Classe `.reveal` + `in-view` pour les animations d'apparition au scroll ; respecte `prefers-reduced-motion`.
- Le site est en français (`lang="fr"`) — garder tout le contenu utilisateur en français.
- **`#contact` doit rester très simple** : un sur-titre, un seul bouton (le grand lien `mailto:` dans son cadre en pointillés) et la ligne de disponibilité. Pas de numéro de téléphone (retiré à la demande de l'utilisateur), pas de formulaire, pas de grille de cartes — une seule action possible, compréhensible d'un coup d'œil.
- Le pied de page prolonge `#contact` et s'organise en trois zones : mention à gauche, pastilles au centre, école à droite.
- **Les réseaux sont pilotés par le seul tableau `socials` de `core.js`** : il alimente les liens texte en bas du panneau de menu (`#menuSocial`) et les pastilles du pied de page. Une url vide donne un lien inerte (`.is-todo`) qui ne mène nulle part ; le pied de page, lui, retombe sur « Haut de page ↑ » plutôt que d'afficher un faux lien. Instagram et TikTok attendent leurs adresses.
- **Une info = un seul endroit.** Coordonnées (email/localisation/permis) : uniquement dans `#contact`. **Logiciels et langages : uniquement dans la frise `tools`** en haut d'À propos. **Qualités et langue : uniquement en pastilles sous « D'où je viens »** (`about[0].skills`). Les deux ne se mélangent pas : une tuile de la frise doit avoir une icône ou un monogramme, ce qu'une qualité comme « Autonomie » n'a pas. **Le carrousel `#competences` présente la formation MMI, pas Youen** — ne pas y remettre ses compétences à lui. Ne pas les recopier ailleurs — avant nettoyage, ces infos étaient dupliquées jusqu'à 3 fois sur la page, ce qui alourdissait inutilement le texte.
- Éviter les gros blocs de texte (paragraphes de prose) : préférer une phrase courte + un élément visuel/scannable (carte, chiffre, tag) à un paragraphe qu'on lit en diagonale.

## Pour aller plus loin

Voir [SECURITY.md](SECURITY.md), [ACCESSIBILITY.md](ACCESSIBILITY.md) et [DESIGN.md](DESIGN.md) pour les conventions spécifiques.
