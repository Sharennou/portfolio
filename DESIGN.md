# Design — Portfolio

## Responsive du 2 octobre 2026

- Le rendu PC est conservé à partir de 860px. Les nouvelles règles s'appliquent sous 860px et aux écrans tactiles sans survol jusqu'à 999px, pour les téléphones en paysage. Les conditions CSS et GSAP partagent ces mêmes limites.
- Les marges tiennent compte des encoches avec `viewport-fit=cover` et les safe areas. Le titre animé tient même à 320px ; le portrait et les espacements sont réduits sur téléphone. En paysage, texte et portrait passent côte à côte.
- La capsule du menu reste centrée et conserve le CV. Les actions mesurent au moins 44px de haut. Le panneau défile dans la hauteur disponible ; le défilement de la page est bloqué et sa position est restaurée à la fermeture. Le menu fonctionne aussi sans GSAP et en réduction de mouvement.
- Les noms des onze outils sont toujours visibles dans une grille, sans effet de dock. Sur téléphone, la photo de Bretagne fait 80 à 120px de large et flotte à droite du récit ; le texte retrouve toute sa largeur sous elle. GSAP la fait entrer par la droite au défilement, avec une course réduite, puis la repose à 4°. Le placement et l'animation PC sont conservés ; sans GSAP ou en réduction de mouvement, la photo reste visible. Le collage des passions utilise deux colonnes (trois en paysage), avec les proportions des photos conservées.
- Les expériences et la formation présentent logo, intitulé, période et bouton d'ouverture en une colonne. Les détails utilisent toute la largeur disponible. Les pages projet, les affiches et le contact sont adaptés à la lecture et au tactile.
- Les changements de hauteur dus aux barres du navigateur ne ferment pas le menu. Une rotation qui change la largeur le ferme ; GSAP retire et recrée les animations réservées au PC lors du passage d'un format à l'autre.

## Harmonisation du 22 septembre 2026

La direction actuelle est créative et éditoriale. Ces règles décrivent la présentation validée des blocs retravaillés et remplacent les anciennes descriptions de ces composants plus bas.

- Titres de section et de formation : même échelle Unbounded 800, petit surtitre et mot d'accent. `--accent-text` prend le bleu clair sur noir et le bleu profond sur blanc ; `--title-size`, `--heading-space` et `--section-space` règlent leur rythme commun.
- Cartes de projets : cadre arrondi de 24 px, visuel intérieur de 16 px avec numéro du projet, métadonnées sur deux lignes, accroche Unbounded 700, discipline et flèche en pied. `cardMeta()` et `cardFooter()` dans `core.js` évitent les écarts entre l'accueil et la galerie ; l'en-tête de fiche réutilise les métadonnées. Les catégories restent lisibles en entier. L'éventail garde trois cartes égales, Maison Cadiou au centre et l'ombre bleue décalée du cadre Compétences.
- Expériences : six lignes éditoriales réparties sur deux colonnes, avec numéro, logo, rôle, organisme et période visibles. Le texte et les étiquettes s'ouvrent dans un `details` natif ; GSAP anime la hauteur et ne laisse qu'une expérience ouverte à la fois. Sous 860 px, les lignes passent en une colonne.
- Formation : deux lignes repliables suivant le même rythme, avec école, diplôme, période et statut visibles. L'ouverture est indépendante des expériences ; sans GSAP ou en réduction de mouvement, les `details` restent utilisables nativement.
- Les rayons et pastilles sont partagés avec la fiche projet. Palette, largeur de contenu, navigation, section des passions et animations existantes sont conservées.
- L'accueil traite le portrait comme une sérigraphie éditoriale : la photo détourée reste naturelle, s'ancre au bas de la section et une seconde silhouette monochrome bleue légèrement décalée crée un relief graphique directement lié au corps. Au bas du portrait, une copie de la photo est floutée et fondue dans le fond ; la silhouette bleue disparaît avant cette zone pour ne pas teinter la transition. Il n'y a ni bulle, ni orbite, ni texte autour du visage. Le dernier vers du titre écrit et efface « des sites », « des images » et « du mouvement » ; le texte complet reste disponible pour les lecteurs d'écran et l'animation se fige en réduction de mouvement.
- À propos, Expériences et Formation partagent l'en-tête `.creative-head` : ligne supérieure, signe `+`, petit cartouche, grand titre et, quand nécessaire, note latérale. Compétences reste volontairement réduit au seul carrousel sur une ligne, sans cadre.
- Passions reste un collage libre sur fond sombre : titre fixe, images sans légende et proportions réelles, puis grille asymétrique sur mobile. Les images passent devant le texte comme à l'origine, mais leurs positions de gauche sont décalées vers le centre. La course reste éloignée de la photo « Moments partagés ».
- La palette reste volontairement limitée au noir bleuté, au blanc et au bleu. Le bleu clair porte les accents sur fond sombre ; le bleu profond les accents sur fond clair.

## Palette (tokens `:root`)

**Noir bleuté en couleur principale, bleu en couleur d'action, et le bleu reste réservé à une seule action à la fois** (demande de l'utilisateur). Le bouton « Voir mon CV » de l'accueil, qui portait ce rôle, a été retiré à la demande de l'utilisateur : `--blue` plein ne sert plus que sur des éléments ponctuels (vignette de glyphe `.pc-logo`, barre « Projet suivant »). Toute la navigation (logo, pastille « Menu », bouton « Projets ») est **grise neutre**, volontairement sans nuance bleue.

Le site était entièrement blanc jusqu'au 19 septembre 2026 ; l'utilisateur a demandé le passage au noir avec un léger fondu bleu, le bleu à la place du violet, et **À propos en blanc**.

**Les noms de tokens ont gardé leur sens, seules leurs valeurs ont basculé.** `--paper` reste « la surface de la page » (désormais noire) et `--ink` « ce qu'on écrit dessus » (désormais clair). Idem pour `--ash-dark` et `--line-dark`, qui désignent le texte secondaire et les filets **sur la surface de la page**, quelle que soit sa couleur. C'est ce qui permet à une section de repasser en clair sans réécrire une seule règle : voir `.tone-light` plus bas.

| Token | Valeur | Usage |
|---|---|---|
| `--paper` | `#070B14` | **le fond de page**, noir légèrement bleuté |
| `--paper-dim` | `#101827` | surface d'un cran au-dessus : cartes, encadrés, panneau de menu |
| `--ink` | `#EDF2FF` | le texte |
| `--ink-2` / `--ink-3` | `#0C1424` / `#142033` | fond des visuels de substitution / survol d'une carte |
| `--white` / `--black` | `#F9FBFF` / `#080D18` | **couleurs littérales**, insensibles au ton de la section : texte sur bouton bleu, tuiles de logos, texte sur pastille bleu clair |
| `--pin` | `#F4562A` | la **troisième littérale** : l'épingle « je viens d'ici » de la carte d'À propos, qui doit se distinguer du point bleu quel que soit le ton |
| `--blue` | `#2A62F0` | aplats d'action, **en fond uniquement**, avec `--white` dessus (4,9:1) |
| `--blue-deep` | `#1B48C0` | son état survolé |
| `--blue-light` | `#B9D2FF` | accent, sélection, trames des visuels (10,7:1 sur le noir) |
| `--ash` / `--ash-dark` | `#9AACC9` | texte secondaire — même valeur des deux côtés depuis que la page est sombre |
| `--muted` | `#A9B7CE` | **gris neutre, sans bleu** : logo, pastille, réseaux, bouton « Projets » |
| `--muted-deep` | `#D6DFEE` | survol/actif des éléments gris |
| `--muted-line` / `--muted-tint` | rgba | contour et fond de survol gris neutres |
| `--line` / `--line-dark` | rgba | filets sur fond sombre / sur la surface de la page |
| `--focus` | `#3B82F6` | contour de focus : le seul bleu à tenir 3:1 **des deux côtés** (5,4:1 sur le noir, 3,7:1 sur la section blanche) |

Toujours utiliser ces variables — ne jamais coder une couleur en dur qui existe déjà comme token. Les trois exceptions assumées sont `--white`, `--black` et `--pin`, justement faits pour les cas où le contexte ne doit pas décider.

**Ne pas étendre le bleu à d'autres boutons ou icônes sans qu'on le demande.** L'utilisateur avait explicitement retiré la couleur d'accent du bouton « Projets », du logo, de la pastille et des réseaux pour qu'elle ne reste que sur le CV : `--muted`/`--muted-line`/`--muted-tint` existent pour ça.

### Sections claires

Une section repasse en clair en portant `class="… tone-light"` **et** `data-tone="light"` — les deux, car ils ne servent pas à la même chose : la classe redéfinit les tokens pour tout ce qu'elle contient, l'attribut prévient la barre fixe (voir « Lisibilité de la barre »). Oublier la classe donne du texte clair sur blanc ; oublier l'attribut rend le logo invisible.

**Aujourd'hui `#apropos` et `#experience` sont clairs**, à la demande de l'utilisateur. Aucune règle de section n'a eu à être réécrite pour ça : `.tone-light` redéfinit `--paper`, `--ink`, `--ash*`, `--muted*` et `--line*`, et tout le reste suit. C'est ce qui a permis d'éclaircir `#experience` en changeant deux attributs dans le HTML, sans toucher au CSS de la section.

     Un seul ajustement a été nécessaire : les tuiles de logos (`.job-logo`, `.edu-logo`) restent blanches (voir plus bas), et sur une section devenue blanche elle aussi, elles n'existaient plus. **C'est le réflexe à avoir en éclaircissant une section : chercher ce qui est blanc en dur.**

     Elles portent donc un **filet à peine visible et une ombre très douce** (demande de l'utilisateur) qui les décolle de la page au lieu de les cerner d'un trait. Et le logo y est **toujours affiché en entier, avec une marge autour** : `object-fit: cover` coupait au ras du cadre les logos à peu près carrés, ce qui les faisait paraître mal posés. La classe `is-wide`, posée par `home.js` d'après le ratio mesuré de l'image, ne sert plus qu'à retirer de la marge latérale aux logos très allongés (Isitix 3,25:1, CIRISI 2,4:1), qui n'auraient sinon qu'un mince filet visible.

`.tone-light` porte aussi le **traitement visuel** du bloc clair, pas seulement ses couleurs : des **coins arrondis en haut et en bas** (`clamp(22px, 3vw, 48px)`), demandés par l'utilisateur, qui donnent l'impression d'un panneau posé sur le noir plutôt qu'encastré dedans. Le noir visible dans les angles est celui de `<body>`, qui peint derrière toutes les sections — les sections voisines n'ont rien à faire. **Pas d'`overflow: hidden`** sur ce bloc : il rognerait le décalage GSAP des photos d'À propos, et rien à l'intérieur ne peint jusqu'aux angles.

Deux choses ne suivent **pas** le ton de la section, volontairement : les tuiles de logos (`.job-logo`, `.edu-logo`) restent blanches, parce que les logos de marque sont pensés pour un fond clair ; et les visuels de substitution (`--ink-2`, motifs `art-*`) restent sombres.

Le curseur personnalisé — une pastille bleu clair qui suivait la souris — **a été retiré à la demande de l'utilisateur** : le pointeur du système suffit. Ne pas le réintroduire.

## Typographie

- `--font-display`: Unbounded (500/700/800/900) — titres, éléments forts
- `--font-body`: Inter (400/500/600/700/800) — texte courant

## Layout

- `--edge`: `clamp(1.25rem, 4vw, 3rem)` — marge latérale interne, utilisée dans `.section-inner`. **Réduite avec la carte** : calée sur la fenêtre (5vw), elle mangeait 72px de chaque côté d'une carte large de 860px.
- `--maxw`: `1150px` — largeur max de la **colonne de contenu**. Les sections, elles, vont **bord à bord**. Réglé plusieurs fois avec l'utilisateur (1400 → 1120 → 1020 → 920 → 860 → 1075 → 1150). C'est un réglage qu'il ajuste au jugé : **ne jamais le changer sans qu'il le demande**, et lui proposer des valeurs chiffrées plutôt que de deviner.

## Ton visuel

**Tout le site est sur fond noir** (`--paper`, un noir légèrement bleuté), sur les deux pages — demande explicite de l'utilisateur, qui a remplacé le tout-blanc précédent. **Trois exceptions** :

- **`#apropos` et `#experience` sont en blanc**, via `.tone-light` (voir « Sections claires »). Ce sont les deux respirations claires de la page, demandées telles quelles. Elles ne se touchent pas : `#passions` les sépare en noir, ce qui fait exister leurs coins arrondis.
- **Le bloc de fin de page** (`#contact` + pied de page) est noir lui aussi, avec un **fondu bleu** qui monte du bas. Le halo est ancré sur le bord **bas** de `.contact` et repris sur le bord **haut** de `.site-footer` : les deux se rejoignent et ne font qu'une seule lueur, centrée sur la couture. Il était en aplat bleu foncé jusqu'au 19 septembre 2026, changé à la demande de l'utilisateur.
- **Le panneau du menu** est une surface d'un cran au-dessus du fond (`--paper-dim`), pour se détacher de la page qu'il recouvre.

**Le « léger fondu bleu »** demandé tient en deux halos très diffus, jamais un dégradé franc, posés en `radial-gradient` **dans la propriété `background` de la section**, par-dessus `var(--paper)` : celui de l'accueil (`.hero-noise`, deux taches) et celui, à cheval, du bloc de fin de page.

⚠ **Un halo doit s'éteindre avant le bord de sa section.** Les sections sont en `overflow: hidden` : tout ce qui dépasse est tranché net, et on voit une ligne horizontale franche entre deux sections censées être du même noir. C'est arrivé entre l'accueil et la bande des compétences, signalé par l'utilisateur. `.hero-noise` porte donc un `mask-image` qui le fait mourir en douceur vers le bas, et sa tache basse a été remontée de 82 % à 64 % pour qu'elle ait la place de s'éteindre. Même précaution pour tout halo ajouté près du bas d'une section.

**Partout ailleurs le noir est plat, et c'est explicite** : `#phares` (les projets phares) et la liste de `projets.html` ont chacun reçu un halo puis se le sont fait retirer à la demande de l'utilisateur. Ne pas les leur remettre. La bande des compétences et les expériences n'en ont jamais eu. C'est cette sobriété qui fait exister les deux fondus restants.

Chaque section porte `data-tone`, ce qui fait basculer la barre du haut quand elle passe dessous : tout est `dark` sauf `#apropos`. Au-dessus des sections sombres, logo et pastille sont clairs sur fond translucide ; au-dessus d'À propos, `.on-light` les repasse en gris foncé sur blanc. Dans le bloc de contact, le grand lien mail a retrouvé son **cadre en pointillés sur fond transparent** : l'aplat blanc qui le remplissait avait été fait pour le fond bleu foncé, il aurait fait une dalle blanche sur le noir.

Ailleurs, **les sections ne sont séparées que par du vide** : pas de filet, pas de nuance alternée (choix explicite « juste de l'espace »).

Les **actions** sont bleues : `.btn-primary`, la barre « Projet suivant » `.pd-next`, la vignette de glyphe `.pc-logo`, les pastilles d'état et le mot surligné `.hl-solid` du titre d'accueil. Ce sont des boutons, pas des fonds de page.

**Attention au bleu plein sur le noir** : `--blue` (#2A62F0) n'atteint que 4,4:1 sur `--paper`, donc il ne sert **qu'en fond** (avec `--white` dessus), jamais en texte. Tout accent bleu qui doit se lire sur le noir prend `--blue-light` — c'est pourquoi `.hl-soft`, `.hero-tagline b` et `.mq-sep` y sont passés.

Comme les cartes sont posées sur le noir, elles ont besoin d'une surface **et** d'un filet pour exister : `.fan-link` et `.pcard` sont en `--paper-dim` avec une bordure `--line-dark`, et passent à `--ink-3` au survol. Sans ça, elles disparaissent dans la page — c'est le premier piège en touchant à cette palette.

Les motifs de projets (`art-*`) restent des visuels sombres, désormais bleus : ce sont des images de couverture de substitution, pas des fonds de page.

**L'éventail de l'accueil ne suit pas l'ordre du tableau.** Le projet le plus important est le premier de `projects` — c'est l'ordre de `projets.html` — mais dans l'éventail il est placé au **milieu** : c'est la carte qui passe au-dessus de la pile au départ, et celle que l'œil prend en premier. Les autres se rangent autour, dans l'ordre du tableau. Demande de l'utilisateur : Maison Cadiou au centre, Paris à sa gauche, Affiches à sa droite. Ne pas « corriger » ça en remettant l'ordre du tableau.

**Cette carte est aussi mise en avant visuellement**, mais **à taille égale avec les deux autres** (demande de l'utilisateur, en deux temps : d'abord « mets en avant Maison Cadiou », puis « les trois projets doivent faire la même taille »). `home.js` lui pose la classe `is-lead` — une classe et non un `nth-child`, pour que le CSS n'ait pas à savoir qu'elle est la deuxième sur trois. Elle porte un **lavis bleu** et un filet de la même teinte ; **rien d'autre ne la distingue** — ni largeur, ni taille de texte. Une première version l'élargissait (`flex: 1.3`) et agrandissait son titre : **retiré, ne pas y revenir sans qu'on le redemande.**

⚠ **Sa mise en avant ne passe PAS par un `transform`.** GSAP anime l'échelle des cartes à l'entrée de l'éventail et écraserait toute mise à l'échelle posée en CSS — c'est le même piège que pour la frise d'outils. Seule la couleur change.

## Page projet

**Le visuel du haut de la page projet a trois formes**, dans cet ordre de priorité : une **vidéo** si le projet a un champ `video` (logo animé de Maison Cadiou), **plusieurs images côte à côte** s'il a un champ `shots` (les deux affiches), sinon le visuel de couverture ou le motif graphique. La grille des `shots` s'ajuste au nombre d'entrées — ajouter une affiche ne demande qu'une ligne de données.

La vidéo est **muette, en boucle, sans commande** : c'est une animation de logo de quelques secondes, pas un film. Sous `prefers-reduced-motion` elle ne démarre pas seule et les commandes apparaissent. Elle est en `object-fit: contain` : un logo rogné n'a plus de sens.

⚠ **Un `.mov` d'export ne marche pas.** Le fichier livré pour Kostum était en codec QuickTime Animation — illisible par tous les navigateurs, et même par QuickLook et `avconvert` sur le Mac. Le champ `video` doit pointer un **MP4 H.264**. Tant que le fichier est absent, `project.js` remet le motif graphique à la place plutôt que de laisser un rectangle noir : c'est le même esprit que le repli des logos sur leur monogramme, et il faut le garder.

**`card.headline` est le titre court du projet**, pas un résumé : il sert de gros titre sur les cartes et de `h1` sur la page du projet. Il tient en une poignée de mots (22 à 29 caractères pour les trois projets actuels). Les accroches longues fournies par l'utilisateur ont été jugées « trop compliquées » à cette place — le développé vit dans `short` (carte de `projets.html`) et dans `desc` (« Le contexte »). **Ne pas y remettre une phrase entière.**


Une seule page gabarit, `projet.html?p=slug`, remplie par `js/project.js` depuis `projects`. Elle se lit de haut en bas : en-tête (vignette, nom, catégorie, accroche en `h1`, discipline) → visuel → deux colonnes (le récit à gauche, l'encadré « En bref » + outils à droite) → l'encadré « Ce que j'en retiens » → le lien vers le projet suivant, qui boucle.

Le récit enchaîne **Le contexte**, **La démarche** et, seulement si le projet a un champ `challenge`, **Le défi** — la section disparaît d'elle-même sinon. « La démarche » est une liste d'étapes (`.pd-steps`) où chaque nom d'étape est en tête de ligne, tenue par un filet à gauche plutôt que par une puce.

**Le `h1` de la page est l'accroche du projet, posée par le script** : il ne doit y en avoir aucun autre dans `projet.html`, y compris dans l'état « projet introuvable ».

## Animations

**Défilement fluide (Lenis)** : toute la page glisse avec de l'inertie. C'est le ticker de GSAP qui fait avancer Lenis, et chaque frame appelle `ScrollTrigger.update()` — sans ce branchement, les animations au scroll se décalent du contenu. Trois points à ne pas casser : les ancres passent par `lenis.scrollTo()` (le scroll natif lutterait contre lui), `lockScroll()` appelle `lenis.stop()/start()` pour que la page ne glisse pas derrière le menu ouvert, et tout est coupé sous `prefers-reduced-motion` puisque conditionné à `motionOK`.

Trois mécanismes d'apparition distincts, à ne pas mélanger :

1. **`.reveal` + IntersectionObserver** — fondu-montée par défaut des blocs statiques. Le délai se règle avec la variable inline `--d`.
2. **GSAP + ScrollTrigger** — réservé aux moments forts. (Flip a été retiré avec la vue plein écran des projets.) Ces éléments ne portent **pas** `.reveal` (les deux se battraient sur l'opacité).
   - **Projets phares** (accueil, `.fan`) : cartes blanches **bordées d'un filet** (la section est blanche elle aussi), calquées sur une référence apportée par l'utilisateur — visuel 16/9 en haut, puis une ligne « vignette · nom · catégorie » (la catégorie se coupe en « … » si la place manque), un grand titre en gras et la discipline en gris. Tout vient du champ `card` de chaque projet dans `core.js` ; `img` et `logo` vides retombent sur le motif `art-*` et le glyphe `mark`.
     - **Aucun épinglage.** Une version épinglée (la page se figeait le temps de l'écartement) a été **retirée à la demande de l'utilisateur**, qui la trouvait trop bloquante : ne jamais remettre `pin: true` ici. Pour rendre l'animation plus visible, augmenter les amplitudes, pas l'épinglage.
     - Au-dessus de 860px, les trois cartes partent **empilées au centre** de la piste (mesure via `offsetLeft`, insensible aux transforms) et s'écartent vers leurs places avec rotation et échelle, en `scrub` sur le scroll normal. Déclenchement volontairement tardif : `start: 'top 55%'` (le haut de la section atteint le milieu de l'écran) → `end: 'top 10%'`. **Repère contre-intuitif : plus le pourcentage est petit, plus c'est tard.**
     - L'état d'**arrivée** est la grille CSS normale : sans GSAP, les trois cartes sont simplement côte à côte, rien n'est caché. **Le texte des cartes n'est jamais masqué par l'animation.** En dessous de 860px, pas de scrub : une simple montée en cascade.
   - **À propos** se lit en trois temps, dans cet ordre :

     1. **La frise d'outils** (`tools`), reprise d'une référence donnée par l'utilisateur : le titre « Mes outils & / vos idées. » est coupé en deux, ligne du haut calée à gauche, ligne du bas à droite, et les tuiles carrées s'installent entre les deux. Le petit cartouche « Outils / logiciels » a été retiré. Au survol, **la tuile passe à ×1,4, ses deux voisines immédiates à ×1,2, toutes les autres ne bougent pas** — un agrandissement en dock, en 0,65 s.

     **Ces valeurs sont des variables CSS en haut de `.tools-row` : `--zoom`, `--zoom-near`, `--zoom-speed` et `--tw`.** L'utilisateur a demandé plusieurs fois de les revoir (×2 jugé « beaucoup trop », puis ×1,32 jugé trop discret) ; elles sont donc le seul endroit à toucher, et tout le reste — décalages, écartement — se recalcule à partir d'elles en CSS. **Ne jamais réécrire une échelle ou un décalage en dur dans les règles** : l'écart entre les tuiles cesserait d'être constant dès qu'on change une valeur.

     ⚠ **Tout est en CSS, et ça doit le rester.** Une version pilotée en JavaScript a été tentée pour rendre l'agrandissement continu d'une tuile à l'autre, au lieu des trois paliers actuels. Elle a cassé la fonctionnalité pendant plusieurs allers-retours : **dès que GSAP touche une tuile, il lui pose un `transform` en style inline**, et un style inline écrase toutes les règles de la feuille — plus aucune application ne grossissait, ni en JS ni en CSS. Ne pas la réintroduire sans pouvoir la tester dans un vrai navigateur.

     **Les zones de survol se touchent.** Un `gap` entre les tuiles est un trou mort : la souris qui s'y trouve ne survole plus rien et tout retombe à ×1. Au-dessus de 701px, l'écart passe donc en **marge interne** de chaque tuile (`padding-inline`, le `gap` du flex tombant à 0), si bien que la tuile la plus proche est toujours agrandie et que la bascule se fait au milieu de l'écart — demande de l'utilisateur, qui a choisi cette bascule nette plutôt qu'un fondu entre les deux (lequel aurait imposé du JavaScript). La largeur totale ne bouge pas : chaque tuile prend une moitié d'écart de chaque côté, et **les deux du bout n'en prennent que du côté intérieur**, ce qui empêche le zoom de se déclencher dans le vide au-delà de la frise. Leur centre de boîte ne coïncide alors plus avec celui de la tuile, d'où le recalage de leur étiquette d'un quart d'écart. La bande reste à la **hauteur exacte des tuiles**, sans marge verticale : choix de l'utilisateur.

     **Toute la frise s'écarte au passage** pour que l'espace entre les tuiles ne se referme jamais — exigence de l'utilisateur, et c'est ce qui distingue l'effet d'un simple zoom. Le calcul est fait en CSS à partir des deux échelles : une tuile agrandie déborde de `(zoom − 1) / 2` de sa largeur **de chaque côté**, donc sa voisine recule d'autant (`--push-near`) ; cette voisine grossit elle aussi de `(zoom-near − 1) / 2` par côté, donc tout ce qui suit recule de `(zoom − 1) / 2 + (zoom-near − 1)` (`--push-far`). D'où la variable `--tw`, qui porte la taille d'une tuile. **Ordre impératif des règles : `~` (toutes celles d'après) avant `+` (la voisine immédiate)**, qui a la même spécificité et doit gagner. Le côté gauche passe par `:has()` ; sans lui, seule la moitié droite s'écarte — dégradation assumée. Le tout est coupé sous 701px, où la frise tiendrait sur deux lignes et où un décalage horizontal n'aurait aucun sens. **Aucune condition sur le type de pointeur** : un `(hover: hover)` de trop et l'agrandissement disparaît partout où le navigateur ne se déclare pas comme attendu.

     Les tuiles grandissent vers le haut (`transform-origin: bottom center`), donc le bas de la frise reste une ligne droite et l'étiquette dessous ne bouge pas. La marge haute de `.tools-row` doit réserver `(--zoom − 1)` fois la largeur d'une tuile, puisque l'agrandissement part du bas ; elle est calibrée pour tenir même à `--zoom: 2`, sinon la tuile mord sur le titre.

     Au repos la frise fait 874px de large pour 1054px disponibles, 924px au survol du milieu. En remontant `--zoom` vers 2, on arrive à 998px : ça passe encore, mais ajouter un outil imposera de revérifier, ou de réduire `--tw`.

     Une étiquette apparaît sous la tuile survolée avec le nom de l'outil. L'étiquette est **toujours dans le DOM** — elle n'est masquée que visuellement — et repasse dans le flux, visible en permanence, sous `(hover: none)` : sans ça l'information disparaîtrait au doigt et pour les lecteurs d'écran. Les tuiles n'étant pas cliquables, il n'y a rien à mettre en `<button>`.

     **Les onze logos sont de vrais fichiers**, fournis par l'utilisateur et rangés dans `img/outils/` (Affinity, Figma, After Effects, Photoshop, Premiere Pro, DaVinci Resolve, Blender, VS Code, Claude, HTML, CSS — dans cet ordre).

     ⚠ **Aucun fond, aucun filet, aucune ombre : on ne voit QUE le logo.** Trois versions ont été refusées avant celle-ci, toutes pour la même raison — elles posaient quelque chose autour du logo, ou faisaient cohabiter deux tailles :
     - couleur de marque par outil + icônes déjà « pleine tuile » affichées bord à bord : les trois marques nues paraissaient deux fois plus petites — « je veux que tous les logos soient pareils niveau taille, et fond » ;
     - tout le monde réduit à 64 % sur un fond blanc — « mais en logo plein » ;
     - bord à bord pour tous, avec un fond sombre inventé pour les trois marques nues — « ne mets pas de fond, laisse juste le logo ».

     **Il n'y a donc plus qu'une seule règle pour les onze** : un cadre carré de même taille, `object-fit: contain`, fond transparent. `contain` et non `cover` : un logo plus large que haut serait rogné, et deux logos rognés différemment cesseraient de se lire à la même taille. **Ne pas réintroduire de cas particulier** — chaque fois qu'il y en a eu un, la frise a paru irrégulière.

     Les fichiers qui sont des icônes d'app (Affinity, les trois Adobe, DaVinci, Claude, badges HTML/CSS) portent leur propre fond : c'est le leur qu'on voit, pas celui de la tuile. Les trois autres (Figma, Blender, VS Code) sont des marques nues et le restent.

     **Une seule retouche d'asset** : le `viewBox` de `figma.svg` a été resserré sur le dessin (`0 0 32 32` → `7 3 18 26`), parce que la marque n'occupait que la moitié de son cadre et paraissait donc deux fois plus petite que ses voisines. **Le dessin n'est pas modifié, seul le cadrage l'est** — la valeur d'origine est notée en commentaire dans le fichier. C'est la bonne façon de régler une différence de taille ici : recadrer le fichier, pas ajouter un cas particulier dans le CSS.

     Même repli qu'ailleurs : `.tool-tile img` est ajouté à la boucle de mesure/repli partagée avec `.job-logo`/`.edu-logo` (voir plus haut) — un fichier renommé ou manquant retombe sur `mono` au lieu de laisser une tuile vide, via `data-mono` posé sur `.tool-tile`.
     2. **La ligne « D'où je viens »** (`about`) n'est plus une ligne « image + texte » mais une **carte légendée qui sert de fond à tout le bloc**, calquée sur une référence donnée par l'utilisateur : à partir de **1000px**, la carte occupe toute la largeur de l'écran, **la photo se pose à droite** (elle était à gauche, l'utilisateur l'a fait passer à droite — ne pas l'y remettre) et **le récit en bas à gauche, par-dessus elle**. En dessous de 1000px, la carte redevient une image suivie du texte : à cette largeur elle serait trop basse pour porter un titre et deux paragraphes. La mécanique d'alternance image/texte reste en place — elle sert dès qu'une entrée n'est pas `map: true`.

        ⚠ **Le texte en bas à gauche est une demande explicite**, référence à l'appui : ne pas « assagir » la carte en la rentrant dans la colonne de contenu avec le texte en dessous.

        ⚠ **Ce n'est pas une carte de Bretagne, c'est une carte de France cadrée sur la Bretagne.** C'est tout l'effet recherché : le reste du pays **continue au-delà du bord droit de l'écran**, ce qui fait comprendre qu'on est zoomé. Il a fallu trois essais pour l'entendre — une carte de Bretagne seule, même parfaitement cadrée, ne donne pas cet effet, parce qu'il n'y a rien qui dépasse.

        Deux contraintes, posées par l'utilisateur, qui vont ensemble :
        - **la Bretagne tient entièrement à l'écran** (une version qui rognait l'Ille-et-Vilaine a été refusée) ;
        - **c'est la France autour d'elle qui sort du cadre**, à droite, et aussi en haut (Cotentin) et en bas (Vendée).

        La Bretagne occupe **~72 % de la largeur** : assez pour rester le sujet, assez peu pour qu'on voie arriver la Normandie et les Pays de la Loire. **La carte fait exactement une largeur d'écran**, jamais plus : le débordement vient du cadrage du SVG, pas d'une largeur CSS supérieure à 100vw.

        ⚠ **La carte se fond en haut et en bas, elle ne s'y arrête pas.** Puisque c'est un zoom, elle est forcément coupée au nord (le Cotentin) et au sud (la Vendée) — et coupée net, ça donne un trait horizontal en plein milieu du blanc, que l'utilisateur a signalé comme « trop net ». Un `mask` en dégradé sur `.ab-map-media` la dissout donc dans le fond. Trois choses à savoir :
        - **les bornes (9 % et 86 %) sont calées sur la Bretagne**, qui occupe 10,7 % à 80,5 % de la hauteur du cadre : le fondu s'arrête avant elle des deux côtés. **En recadrant la carte, refaire ce calcul**, sinon le dégradé mangera le Finistère nord ou le Morbihan ;
        - **seule l'image porte le masque.** Repères, libellés et photo sont des éléments séparés et restent nets ;
        - **le bord droit ne se fond pas**, et ne doit pas l'être : il coïncide avec le bord de l'écran, donc rien ne s'y lit comme une coupe — c'est même là que se joue l'effet de zoom. Sans `mask` (navigateur très ancien), la carte s'affiche entière avec ses coupes franches : dégradation acceptable.

        **Deux gris, et c'est tout ce qui désigne la Bretagne** : `#D8E2F0` pour ses quatre départements, `#EBEFF7` pour le reste du pays, filets blancs partout. Les quatre sont dessinés **en dernier**, donc leurs filets passent au-dessus. Pas de liseré, pas de couleur d'accent : l'utilisateur a choisi le contraste de valeur.

        **La sortie de colonne** se fait avec `margin-left: calc(50% - 50vw)` : `50%` se lit sur la colonne de contenu, `50vw` sur la fenêtre, et la ligne se retrouve pilée au bord gauche de l'écran. C'est `overflow-x: hidden` sur `<body>` — déjà là pour les visuels de #passions — qui coupe ce qui dépasse à droite. **Le retirer ferait apparaître une barre de défilement horizontale sur tout le site.**

        **Les libellés et la photo sont dimensionnés en `vw`, pas en `%`** : ils doivent garder la même taille *relative à la carte*, qui fait une largeur d'écran (1,95vw pour un libellé, 19vw pour la photo). Leur plafond `clamp` casse ce rapport au-delà de ~1970px, et c'est assumé. Une première version les laissait sur des plafonds bas : ils rétrécissaient visiblement par rapport à la carte entre 1440 et 1920.

        **Le fichier SVG ne contient que les contours.** Point, épingle, flèches et libellés sont **posés par-dessus par `home.js`**, depuis le tableau `marks` de chaque entrée d'`about`. C'est voulu : un texte gravé dans un SVG chargé en `<img>` **ne peut pas atteindre la police de la page** (il retombait sur de l'Arial), il n'est ni sélectionnable ni lisible par un lecteur d'écran, et il ne connaît pas les tokens de couleur. Les libellés sont donc du **HTML** (`.ab-map-note`), les flèches et les repères un **calque SVG** (`.ab-map-marks`) qui reprend la `viewBox` de la carte.

        ⚠ **Les trois éléments partagent un seul repère de coordonnées**, le cadrage `view` de l'entrée (`[40, 117, 920, 556]`) : il est recopié dans le `viewBox` du fichier SVG, reposé par `home.js` sur le calque des repères, et transmis au CSS en variable `--map-ar` pour l'`aspect-ratio` de la scène. C'est ce qui fait que `object-fit: contain` ne laisse aucune marge et qu'un libellé placé en % de la scène tombe au bon endroit. **Seuls deux endroits l'écrivent — `core.js` et le `viewBox` du SVG — et ils doivent rester identiques.**

        **Le cadrage n'est pas l'échelle.** Les contours gardent leurs coordonnées d'origine quoi qu'on cadre : la projection reste donc valable, et **recadrer la carte ne déplace aucun repère**. Le cadrage actuel (rapport ~1,65) donne un bloc de ~870px de haut sur un écran de 1440, et dégage le coin bas-gauche — de l'Atlantique — où le texte vient se poser.

        **La recette du fichier est écrite en commentaire en tête du SVG** : source (`departements.geojson`, france-geojson, Licence Ouverte), projection, filtrage des contours hors cadre, simplification Douglas-Peucker à 0,30 unité (~0,5px à 1440) et retrait des îlots de moins d'une unité carrée. Résultat : **16 départements, 13 152 points, 170 Ko** — plus léger que la carte de Bretagne seule qu'il remplace, qui était sur-détaillée à 206 Ko. **Aucun script de fabrication n'est gardé dans le dépôt** : le projet n'a pas de build, et un générateur Python y introduirait une dépendance que personne ne relancerait. La recette suffit à le refaire.

        ⚠ **Le titre « D'où je viens » est un titre du site, pas un objet à part.** Il a porté un cadre bleu incliné, repris de l'image de référence, que l'utilisateur a trouvé **mal intégré** — à raison : rien d'autre sur le site ne titre comme ça. Le vocabulaire maison est **Unbounded 800 en encre pleine, sans fond ni rotation**, comme `.tools-line` juste au-dessus dans la même section et comme `.edu-heading`. Sa taille (4,2vw plafonnés à 3,6rem) passe **sous** celle de `.tools-line` (4,6rem) : c'est le deuxième temps de la section, pas son ouverture.

        **Le surlignage bleu `.hl` ne s'étend pas à un titre entier.** Sur ce site il ne sert qu'à **un mot dans une phrase**, et seulement dans le titre de l'accueil (`.hl-solid` sur « Youen », `.hl-soft` sur « expériences visuelles »). C'est ce qui lui garde sa force ; l'étendre à un bloc en fait un bouton.

        **Le texte se pose sur le quart bas-gauche**, qui est de l'Atlantique et de la côte de Cornouaille — très pâle (`#E1E7EF` sur blanc), donc le texte encre passe dessus sans peine (15:1). C'est le même parti que la référence ; **ne pas ajouter de voile blanc derrière le texte** pour « aider », ça salirait la carte.

        **Aucune flèche n'est tracée à la main.** `mapArrow()` déduit la courbe (une quadratique) et sa pointe (calculée sur la tangente d'arrivée) de quatre valeurs : le point désigné, l'ancre du libellé, le galbe `bend` et le vide `gap` laissé devant le repère. Déplacer un libellé dans `core.js` suffit à redessiner la flèche entière.

        **Pour désigner une commune, la projection de la carte est écrite en tête du tableau** — `X = 319,0 + (lon + 3,4556) × 160,4` et `Y = 212,3 − (lat − 48,7345) × 241,8`, vérifiée sur Brest, Quimper, Vannes, Saint-Brieuc, Locronan et Rennes (chaque point tombe bien à l'intérieur de son département). Ne pas placer un repère « à l'œil ».

        ⚠ **À l'entrée, repères et libellés ne prennent QUE de l'opacité**, jamais un `y` : les libellés sont centrés sur leur ancre par un `translateX(-50%)` en CSS, et GSAP écrirait son propre `transform` par-dessus — ils sauteraient d'une demi-largeur vers la droite. La photo, elle, n'a pas cette contrainte : elle monte et se redresse à −5°. Rien de tout ça n'est `.reveal` : une seule mécanique par opacité, et sans GSAP tout est simplement visible dès le chargement.

        **Un seul repère, c'est voulu.** Un second (« je viens d'ici », en épingle orange) a été proposé puis **refusé par l'utilisateur** : ne pas le remettre sans qu'on le redemande. La forme `pin` reste dans `home.js`, prête à servir.

        **La photo posée sur la carte est un PORTRAIT** (886×1572) : c'est ce qui fixe la largeur de `.ab-postcard` à 15,5vw plafonnés à 330px. À 19vw, largeur prévue pour un paysage, une image deux fois plus haute que large mangeait la moitié de la carte. **En y mettant une photo paysage, revoir cette largeur.** Elle est posée **à cheval sur la frontière entre la Bretagne et le reste de la France** (`right: 19%`, la Bretagne s'arrêtant à 72,9 % de la largeur du cadre), et **sans légende** : `caption` vide, et `home.js` n'émet alors aucun `<figcaption>` — d'où la marge égale sur les quatre côtés du cadre, sans quoi le bord bas ferait cadre vide. Les deux sont des demandes de l'utilisateur. Son inclinaison est de **+4°** — penchée vers l'extérieur, la carte étant à sa gauche ; l'angle est écrit **deux fois**, dans le CSS et dans le tween GSAP, qui écrirait sinon son propre transform par-dessus. **Les deux valeurs vont ensemble : en changer une sans l'autre fait sauter la photo au premier pixel de défilement.**

        **Elle entre par la DROITE, en `scrub`**, et c'est la seule animation « pilotée à la molette » du bloc : elle avance quand on descend, repart quand on remonte (demande de l'utilisateur ; elle montait simplement de 54px avant). La droite n'est pas un côté au hasard — c'est celui par lequel la carte continue déjà hors de l'écran, donc le geste va dans le même sens. Trois détails :
        - `xPercent: 240` se lit **sur la largeur de la photo**, pas sur l'écran. Elle occupe 65,5 % à 81 % de la largeur, il faut donc la pousser de 34,5 points d'écran pour la sortir entièrement, soit ~2,2 fois sa largeur ; 240 laisse de la marge. **En changeant sa largeur ou sa position, refaire ce calcul.** Ce qui dépasse est coupé par `overflow-x: hidden` sur `<body>` ;
        - `ease: 'none'`, comme partout sous scrub : une courbe se lirait comme un à-coup, le scroll donnant déjà le rythme ;
        - **les repères, eux, gardent leur fondu en une fois** (`once: true`). L'utilisateur a demandé que seule la photo change — ne pas passer le reste du bloc en scrub par souci de symétrie.

        Le fichier est passé par la préparation obligatoire : le PNG fourni pesait **2,1 Mo**, le JPEG servi en fait **166 Ko**. Si le fichier est introuvable, `home.js` **retire le tirage** au lieu d'afficher une image cassée — plus radical que le monogramme des logos, et c'est voulu : un cadre photo vide ne veut rien dire.
     **Les logiciels ne vont que dans `tools`, les qualités que dans `about[0].skills`.** La frise a besoin d'une icône ou d'un monogramme par entrée, ce qu'une qualité comme « Autonomie » ne peut pas avoir.

   - **Passions** (`#passions`) : une section sombre à part, juste après le blanc d'À propos, reprise d'une référence donnée par l'utilisateur. **Le texte reste figé à l'écran pendant que huit visuels (`passionShots`) défilent par-dessus lui et le recouvrent au passage.**

     ⚠ **L'inverse a été codé d'abord — visuels figés, texte qui défile — et corrigé par l'utilisateur.** C'est bien le texte qui est collé. Ne pas se laisser tromper par la formulation d'origine (« les images restent à la même place ») : elle voulait dire « posées dans la page », pas « fixes à l'écran ».

     C'est un `position: sticky` sur `.pas-text`, et rien d'autre — **pas de `pin`, pas de scroll détourné** : la page ne s'arrête jamais. Le texte fait `100svh` et se colle en haut ; les visuels vivent dans `.pas-stage`, en `position: absolute; inset: 0` sur toute la hauteur de la section, donc ils défilent avec la page. `z-index` 2 contre 1 : ils passent **devant** le texte, choix explicite de l'utilisateur.

     Quatre choses à ne pas casser :
     - **Aucun `overflow: hidden` sur `.passions` ni sur un de ses ancêtres** : ça tuerait le sticky. Sur `.pas-stage`, en revanche, c'est sans danger — c'est le frère du texte, pas son ancêtre — et c'est ce qui rogne les visuels qui débordent du bord.
     - **`min-height: 300svh` fait toute la durée de l'effet** : le texte reste figé pendant 300svh moins sa propre hauteur, soit deux écrans de défilement. C'est la durée choisie par l'utilisateur. En la baissant, l'effet disparaît.
     - **Ce même `min-height` doit retomber à 0 sous 860px**, sinon la page gagne trois écrans de vide sur téléphone.
     - Position, taille, ratio et inclinaison de chaque visuel passent par des **variables CSS inline** (`--x`, `--y`, `--w`, `--ar`, `--tilt`) et non par des styles directs. C'est ce qui permet au CSS de les ignorer sous 860px, où tout retombe à plat : les visuels en bande, puis le texte. `--y` est un pourcentage de la **hauteur totale de la section**, soit trois écrans, d'où des valeurs étalées de 3 % à 85 %.

     Chaque visuel a **son propre déclencheur** d'apparition. Un seul sur la section allumerait d'un coup des visuels encore à deux écrans plus bas. Et pas de `.reveal` sur eux : sa transition sur `transform` écraserait leur inclinaison, là où GSAP compose avec.

     Le texte est **d'une seule couleur** (`--ink`) : une version qui s'éclairait au fil du scroll a été proposée puis écartée par l'utilisateur. Les visuels défilent tous **à la vitesse de la page**, sans parallaxe — écarté aussi.
   - ~~**Projets** : galerie horizontale épinglée + vue plein écran Flip~~ — **supprimée** à la demande de l'utilisateur. Ne pas la réintroduire.
   - **`projets.html`** : cartes **horizontales** blanches bordées d'un filet, même anatomie que les projets phares (classes `.pc-*` partagées : `pc-media`, `pc-top`, `pc-logo`, `pc-name`, `pc-kind`, `pc-title`, `pc-disc`), avec en plus la phrase courte du projet et « Voir le projet → ». Visuel à gauche (42 %), passage en vertical sous 760px. Apparition simple par `.reveal`.
   - **`projet.html`** : fond clair ; en-tête (vignette · nom · catégorie, grand titre, discipline), grand visuel 16/8, puis la description à gauche et un encadré « En bref » à droite (contexte, domaine, outils), enfin la barre noire « Projet suivant » (une action, pas un fond de page). Les parties `.pc-*` sont réutilisées dans l'en-tête.
   - **Expériences et formation** : listes compactes en `details`, avec les repères essentiels dans le `summary` et le texte complet dans le panneau. GSAP anime l'ouverture et la fermeture, ainsi qu'une courte entrée latérale. Aucun épinglage. Les logos restent entiers (`object-fit: contain`) dans leurs tuiles ; `home.js` ajuste la marge des logos larges et remplace un fichier manquant par son monogramme.
     - Titres marqués `data-gsap="head"`.
   - **Menu** : `.site-header` est une barre fixe pleine largeur à deux éléments — le logo **calé sur le bord gauche** de l'écran (marge `--edge`) et la **capsule-panneau `.menu-shell`** en position absolue au milieu de l'**écran**, pas entre deux blocs, pour qu'elle ne se décale pas si ce qui l'entoure change de largeur. Le bloc de réseaux qui occupait la droite a été retiré à la demande de l'utilisateur. La barre est en `pointer-events: none`, seuls ses enfants captent les clics (`.nav-center` repasse à `none` pour ne pas couvrir la largeur de l'écran). Ses couleurs sont pilotées par les variables `--nav-*` que la classe `.on-light` bascule.

     ⚠ **La capsule et le panneau sont UN SEUL élément.** Fermé, `.menu-shell` est la capsule « Menu + Télécharger le CV » ; ouvert, c'est le panneau. Il **grandit**, il n'est jamais remplacé. Deux versions ont été refusées par l'utilisateur avant celle-ci, ne pas y revenir :
     - une pastille et un panneau **distincts** qui se croisaient en fondu — « ça change de menu » ;
     - un **`clip-path`** animé, où le panneau ne changeait jamais de taille — « ça apparaît au lieu de s'ouvrir ».

     Ce qui est animé : `width`, `height` et `border-radius` (100px → 26px), en **0,12s à l'ouverture et 0,08s à la fermeture**, sur PC comme sur téléphone. La courbe `power2.out` démarre immédiatement ; les couleurs et le glyphe suivent en 0,10s. L'utilisateur a demandé une animation quasi immédiate. **Rien d'autre ne bouge**, et c'est voulu :
     - La capsule est centrée sur l'écran et ne se déplace pas, elle s'élargit autour de son axe.
     - `.menu-head` est en `justify-content: center` et **non** `space-between` : les deux libellés gardent leur écart quand le cadre s'élargit, au lieu de filer vers les bords. Demande explicite.
     - `.menu-nav` est **hors du flux** (`position: absolute`, centré). C'est ce qui permet à l'en-tête seul de donner sa largeur à la capsule fermée (`width: max-content`), et au menu de faire sa largeur à lui sans la contraindre. La hauteur ouverte se calcule donc `56 + menuNav.offsetHeight`, jamais en mesurant la capsule.
     - `overflow: hidden` sur la capsule est ce qui rogne le menu tant qu'elle est petite.
     - ⚠ **Les valeurs animées ne sont relâchées qu'à la FERMETURE.** `clearProps` rend la capsule à sa taille CSS, qui est la taille **fermée** : `.menu-nav` étant hors du flux, la hauteur ouverte n'existe nulle part ailleurs que dans les valeurs animées. Les relâcher à la fin de l'ouverture faisait retomber le panneau d'un coup à la taille de la capsule, sans que la souris ait bougé — bug signalé par l'utilisateur. Comme les dimensions ouvertes sont donc figées en pixels, **un redimensionnement de la fenêtre referme le menu** plutôt que de le laisser à la mauvaise taille.
     - À la fermeture on repart de la taille **courante**, pour qu'une fermeture au milieu d'une ouverture continue au lieu de sauter.

     **Deux classes, pas une** : `is-open` porte les couleurs, `is-showing` rend le menu atteignable au clavier (`visibility`). Les deux sont retirées **à la fin** de la fermeture, jamais au début.

     ⚠ **Le panneau doit rester sombre jusqu'à sa disparition.** Retirer `is-open` dès le début de la fermeture lui rendait les couleurs de la capsule — donc du **blanc** au-dessus des sections claires — et on voyait un panneau blanc rétrécir : l'utilisateur l'a refusé. Pour la même raison, **la transition de couleur est portée par `.is-open` et non par `.menu-shell`** : elle n'existe qu'à l'ouverture, et disparaît avec la classe, si bien que le retour à l'apparence de capsule est instantané au lieu de se voir. Fermée, la capsule garde son apparence de barre (translucide, inversée sur les sections claires via `--nav-*`) ; ouverte, elle prend la surface sombre du panneau, le changement se faisant pendant l'agrandissement : choix de l'utilisateur.

     **Il n'y a plus de voile** derrière le menu ouvert (choix de l'utilisateur) : la page reste nette autour. Le logo ne s'efface donc plus que **sous 700px**, là où le panneau arrive jusqu'à son bord ; au-dessus il reste visible, le panneau faisant 520px au centre. Le faire disparaître partout était une régression héritée de l'époque où le menu couvrait tout l'écran. C'est l'**ombre portée**, nettement plus marquée, qui détache le panneau. Un clic ailleurs referme, via un écouteur sur `document` et non sur un voile qui n'existe plus.

     Le **libellé du CV se raccourcit en « CV »** sous 760px au lieu de disparaître : la capsule et le menu étant le même objet, le cacher le retirerait aussi du menu ouvert, et le CV n'aurait plus aucun accès depuis que le bouton de l'accueil a été retiré.

     **L'effet magnétique a été supprimé** en fusionnant les deux éléments : il visait la pastille disparue, et son `overwrite: true` aurait tué l'animation d'agrandissement dès le premier mouvement de souris, les deux écrivant sur le même élément. Ne le réintroduire que sur un élément qui n'est pas animé par ailleurs.

     **Ouverture au survol** (souris seulement, demande de l'utilisateur) : survoler le bouton « Menu » ouvre, quitter la capsule referme. Trois garde-fous, tous nécessaires — les retirer rend le menu pénible :
     - Un délai de 120 ms à l'aller, **aucun au retour** : sans le premier, le menu s'ouvre quand on ne fait que traverser le haut de la page. Un sursis de 180 ms existait au retour pour encaisser un écart de souris, mais l'utilisateur ne veut aucune latence entre le moment où il sort de la capsule et celui où le menu part. Si la fermeture devient trop chatouilleuse, c'est `CLOSE_DELAY` qu'on remonte.
     - On survole le **bouton** et non la capsule entière, sinon le menu s'ouvre sous le curseur de quelqu'un qui visait le lien CV juste à côté. On referme en quittant `.menu-shell`, qui contient tout le menu une fois ouvert.
     - Un coup de molette referme. La barre est fixe : laisser la souris en haut au milieu pendant qu'on lit ouvrirait le menu et verrouillerait le défilement sans rien avoir demandé. L'événement `wheel` arrive même quand le scroll est verrouillé.

3. **Carrousel des domaines MMI** — **une seule bande**, en capitales (max 3,4 rem, réduite une fois à la demande de l'utilisateur), qui liste ce qu'on apprend en BUT MMI (`mmiDomains`). La piste contient la liste deux fois et se translate de -50 % pour une boucle sans couture. Avec GSAP, `home.js` coupe l'animation CSS et pilote la boucle : vitesse constante au repos, **accélération selon la vitesse du scroll** (jusqu'à x6, via `getVelocity()`) puis retour doux en 1,4 s. Une accélération en cours n'est jamais freinée par une plus faible. Sans GSAP, `@keyframes marquee` prend le relais. **Au survol la bande ralentit au quart de sa vitesse, elle ne s'arrête pas** — demande de l'utilisateur, qui a remplacé la pause nette d'avant. Côté GSAP, le facteur de survol **multiplie** celui du scroll au lieu de le remplacer : sans ça, une accélération au scroll effacerait le ralentissement, et inversement. Côté repli CSS, c'est `animation-duration` qui passe de 40s à 160s, au prix d'un petit saut au moment du survol — inévitable en CSS, et visible seulement si le CDN est bloqué. Les deux lignes d'avant (compétences techniques + qualités, la seconde en contour) ont été remplacées à la demande de l'utilisateur.

Règles :
- **Aucun état initial caché en CSS** pour les éléments animés par GSAP. C'est GSAP qui pose l'état de départ, donc si le CDN est bloqué tout reste visible.
- GSAP écrit des transforms inline qui écrasent les `:hover` CSS. Pour tout élément qui a une transition de survol, couper `transition` avant le tween et faire `clearProps: 'all'` au `onComplete` (helper `enter()` dans le script).
- Une même propriété ne doit pas être animée par deux tweens concurrents. Par exemple, le reveal des lettres utilise `yPercent` et la vague au survol `y`, la parallaxe du glyphe `xPercent` et le suivi souris `x`.
- Créer les ScrollTriggers **dans l'ordre de la page**, sinon les positions calculées sont fausses. L'accueil n'a qu'une section épinglée, `.fan` (projets phares), et elle doit être déclarée avant les déclencheurs d'À propos et d'Expériences.
- Tout est désactivé sous `prefers-reduced-motion` (le carrousel devient scrollable à la main).

## Avant d'ajouter un composant

1. Réutiliser les tokens existants plutôt que d'en créer de nouveaux, sauf besoin clair.
2. Vérifier le contraste avec [ACCESSIBILITY.md](ACCESSIBILITY.md).
3. Garder les animations légères et respectueuses de `prefers-reduced-motion`.

## Bord à bord

Les sections touchent les bords de l'écran. Une carte arrondie posée sur un fond dégradé (`.shell`, gouttière `--gutter`) a été essayée puis **retirée à la demande de l'utilisateur** : ne pas la réintroduire. Seule la colonne de contenu reste plafonnée à `--maxw`.

## Accents : le bleu ne porte qu'une seule action

Depuis le retrait du bouton « Voir mon CV », l'accueil n'a plus d'aplat bleu : tout ce qui ressemble à un bouton ou à un contrôle de navigation — `.btn-outline` (« Projets »), le logo, la pastille « Menu », le lien CV — est en gris neutre (`--muted`/`--muted-line`), pas en bleu atténué. Le titre de l'accueil (`.hl-solid`/`.hl-soft`) et les autres accents déjà en place (menu, cartes de projet, contact) restent bleus : seuls les éléments listés plus haut ont été neutralisés, à la demande explicite de l'utilisateur.

`--blue-light` est l'accent **lisible sur le noir** : sélection de texte, trames des visuels, et tout accent bleu en texte (voir l'avertissement sur `--blue` plus haut).


**Survol des boutons : ni déplacement ni ombre, seulement une teinte un peu plus sombre** (demande explicite de l'utilisateur). La règle vaut pour tout ce qui ressemble à un bouton : `.btn`, réseaux et pastille « Menu », pastilles du pied de page, grand lien mail. Ne pas remettre de `translateY` ni de `box-shadow` au survol.

Le bleu s'assombrit au survol : `--blue` → `--blue-deep` (écart de luminance nettement perceptible — en dessous de ~1,12 un survol ne se voit plus).

| Bouton | Repos | Survol |
|---|---|---|
| Principal (accueil, « Voir tous les projets ») | `--blue` | `--blue-deep` |
| Contour | transparent | `--muted-tint` |
| Réseaux et pastille « Menu » | `--nav-btn` | `--nav-btn-hover` |
| Grand lien mail, « Projet suivant » | `--blue` | `--blue-deep` |
| Pastilles du pied de page, cartes | transparent / blanc | `--paper-dim` |

Seule la pastille « Menu » bouge encore : c'est son effet magnétique, voulu, pas un survol.
## Accueil

Colonne centrée : photo ronde, titre, accroche courte, boutons. Le **titre** porte les mots surlignés ; l'accroche en dessous est le petit paragraphe.

⚠ **« Le titre » est ambigu dans ce projet, demander lequel avant de le réécrire.** L'utilisateur appelle « phrase d'accroche » le titre de l'accueil, mais il appelle aussi « titres des projets » les `card.headline`. Une demande de simplification a déjà été appliquée au mauvais des deux. Le titre de l'accueil (« Bienvenue, moi c'est Youen / je transforme les idées en expériences visuelles ») **est validé, ne pas y toucher**.

Deux mots seulement sont mis en avant : `.hl-solid` en blanc sur bloc bleu plein, `.hl-soft` en `--blue-light` dans un cadre épais de la même teinte, tous deux en graisse 900. Les mots-clés du paragraphe passent en gras `--blue-light`. L'utilisateur trouvait un surlignage ardoise « pas assez choquant, on ne le voit pas » : **ne pas revenir à des teintes douces ici**.

**Le titre tient en exactement deux lignes** (`white-space: nowrap` au-dessus de 680px). Sa taille, `clamp(1.1rem, 2.8vw, 2rem)`, a été calculée en **mesurant la vraie largeur des glyphes** dans les fichiers d'Unbounded 800 et 900 : la ligne la plus longue fait 30,5 em, ce qui laisse 45 à 80px de marge dans la colonne selon l'écran. **En changeant le texte du titre, `--maxw` ou `--edge`, refaire la mesure** — deviner une taille a déjà échoué plusieurs fois.

L'ancien masque de découpe des lignes de titre (`overflow: hidden` + `riseUp`) a été remplacé par un simple `fadeUp` : il rognait le fond des mots surlignés. Toutes ces apparitions sont en CSS pur, sans GSAP.

Les boutons de l'accueil n'ont plus de règles à part : ils suivent `.btn-primary` (aplat bleu) et `.btn-outline` (contour gris neutre), identiques partout sur le site.

## Lisibilité de la barre

Le logo s'inversait autrefois tout seul avec `mix-blend-mode: difference`. **Ça ne peut pas marcher dans `.site-header`** : `position: fixed` crée toujours un contexte d'empilement, donc un groupe isolé pour la fusion. Le logo ne fusionnait plus qu'avec la barre, transparente, et restait blanc — invisible sur l'accueil, qui est clair. Le symptôme a été signalé par l'utilisateur.

À la place, chaque `<section>` porte `data-tone="light"` ou `"dark"`, et `site.js` pose `.on-light` sur la barre selon la section qui passe dessous (lecture au scroll, groupée par `requestAnimationFrame`). Les couleurs viennent de cinq variables :

| | `--nav-text` (logo) | `--nav-fg` (glyphe) | `--nav-icon` (inutilisé depuis le retrait des réseaux) | `--nav-btn` / `--nav-br` |
|---|---|---|---|---|
| section sombre (le cas courant) | `#EDF2FF` | blanc à 78 % | blanc à 88 % | blanc à 10 % / 26 % |
| section claire (#apropos) | `#0A101C` | `#4A5A75` | `#3A475C` | blanc plein / noir à 18 % |

**Ces six valeurs sont écrites en dur, pas en `var(--ink)`/`var(--paper)`** : ces deux tokens changent de sens d'une section à l'autre, alors que la barre doit choisir son camp **à l'inverse** de la section qui passe dessous. Les brancher sur les tokens rendrait le logo invisible exactement dans les cas où ce mécanisme existe.

**En ajoutant une section, lui mettre un `data-tone`** — sans lui, la barre garde le ton de la section précédente.

## Empilement

| z-index | élément |
|---|---|
| 961 | logo, pastille « Menu » |
| 960 | barre |
| 950 | voile + panneau du menu |
| 2 | contenu du héros |

Rester prudent avec `transform`, `filter` et `overflow` sur les ancêtres des sections : ils créent des contextes d'empilement et casseraient l'épinglage GSAP de l'éventail.
