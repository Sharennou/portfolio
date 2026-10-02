# Accessibilité — Portfolio

## Déjà en place

- `:focus-visible` avec un outline `--focus` visible sur tous les éléments interactifs — ne jamais supprimer sans remplacer par une alternative visible. Ce token existe parce qu'un accent unique ne suffit pas : `--blue` serait invisible autour d'un bouton déjà bleu. `--focus` (`#3B82F6`) est le seul bleu à tenir les 3:1 exigés pour un indicateur non textuel **des deux côtés** : 5,4:1 sur le fond noir, 3,7:1 sur les sections blanches. Son `outline-offset` le place en dehors de l'élément.
- **Ne jamais donner le focus à un élément que l'utilisateur n'a pas visé.** Le menu donnait le focus à son premier lien dès l'ouverture : l'anneau s'affichait en gros autour d'« Accueil » et on croyait l'entrée sélectionnée. Le bouton « Menu » étant dans la capsule, une tabulation depuis lui entre naturellement dans le menu — rien à forcer.
- `prefers-reduced-motion` respecté : animations et scroll fluide désactivés si l'utilisateur le demande.
- `aria-label` sur les boutons icônes (menu burger, flèches de galerie, fermeture de modale).
- Menu : le bouton porte `aria-expanded`, `aria-controls`, et un `aria-label` qui passe de « Ouvrir » à « Fermer ». La capsule contenant le menu est toujours dans la page, c'est `.menu-nav` qui porte `visibility: hidden` tant qu'il est fermé — ce qui le sort aussi de l'ordre de tabulation et des lecteurs d'écran. **Un simple masquage visuel ne suffirait pas** : le menu resterait tabulable derrière la capsule. Ouvert, il bloque le scroll et garde le focus entre le bouton, le lien CV, les liens et les réseaux ; `Échap` le ferme et rend le focus au bouton. Après un clic sur un lien, le focus va sur la section visée (`tabindex="-1"`, sans contour). La section courante a `aria-current` et une pastille : c'est un repère « vous êtes ici », pas une sélection. Les numéros 01–03 sont `aria-hidden` (l'`<ol>` numérote déjà). Le menu doit toujours lister les sections dans l'ordre exact de la page.
- Vue projet plein écran `#pjDetail` : `role="dialog"`, `aria-modal`, `aria-labelledby`. Le focus est piégé dedans, `Échap` ferme la vue et le focus revient sur la carte d'origine.
- Section projets épinglée : la piste est translatée, donc le navigateur ne peut pas y amener le focus clavier tout seul. Un gestionnaire `focusin` (limité à `:focus-visible`) fait défiler la page jusqu'à la carte focalisée. La section utilise `overflow: clip` pour que le focus ne la fasse pas défiler en interne.
- Les titres de cartes découpés en lettres gardent le texte complet dans un `.sr-only`, et la version découpée est `aria-hidden`.
- `lang="fr"` sur `<html>`.
- Réseaux : ils sont en texte, en bas du menu et dans le pied de page (les icônes rondes de la barre ont été retirées). Tant qu'une url n'est pas renseignée, le lien porte `aria-disabled="true"` et ne navigue pas. Le piège à focus du menu ouvert liste **tous** les `<a>` et `<button>` de la capsule, sinon le focus s'en échappe.
- Un lien de menu vers une section absente de la page courante porte `data-home` et redirige réellement vers l'accueil : il ne reste jamais sans effet.
- Pied de page : les pastilles de réseaux sont une vraie liste de liens, avec `rel="noopener noreferrer"` sur les liens externes. Le grand lien mail de `#contact` réagit au `:focus-visible` comme au survol (fond `--paper-dim`), pour que la cible soit visible au clavier.
- Après un clic sur un lien interne, le focus va sur la section visée (`tabindex="-1"`, sans contour), pour que la navigation clavier reprenne au bon endroit. Un seul `h1` par page : le titre de l'accueil, « Tous mes projets » sur `projets.html`, et le titre du projet sur `projet.html` (inséré par `project.js`, y compris pour un projet introuvable). Les titres de section sont des `h2`.
- Cartes de projets : toute la carte est un seul lien, la vignette-logo est `aria-hidden` (le nom est déjà lu juste après) et « Voir le projet → » aussi, pour ne pas le faire lire six fois.
- **Tout élément `.reveal` construit en JavaScript doit exister au `DOMContentLoaded`** : c'est là que `site.js` les observe. Un élément ajouté plus tard resterait à opacité 0, donc invisible pour tout le monde.

## À respecter pour toute nouvelle modif

- Garder un contraste suffisant (WCAG AA). Avec la palette blanc/violet, tous les couples utilisés sont à 6:1 ou plus : texte noir sur blanc 18:1, texte secondaire 7,1:1, blanc sur bouton violet 7,1:1, texte sur voile violet clair 16:1.
- **Ne jamais faire porter une information par la seule couleur** : la pastille de disponibilité, par exemple, est violette comme le reste des accents et doit rester accompagnée de son texte.
- Toute nouvelle icône ou bouton sans texte visible doit avoir un `aria-label` explicite en français.
- La modale projet doit rester navigable au clavier (piéger le focus dedans, `Échap` pour fermer, focus restauré sur l'élément déclencheur à la fermeture).
- Les images de projets dans `img/projets/` doivent avoir un `alt` descriptif, jamais vide sauf si purement décoratif.
- Hiérarchie de titres (`h1`–`h3`) cohérente entre les sections, ne pas sauter de niveau.
- Zones cliquables (boutons, liens) suffisamment grandes au tactile (min ~44×44px).

## Carrousel des domaines MMI

La bande défilante est `aria-hidden="true"` (contenu dupliqué pour la boucle = lecture parasite). La vraie liste existe en parallèle dans un `<ul class="sr-only">` rempli depuis le même tableau `mmiDomains`, précédé d'un titre `<h2 class="sr-only">` : la bande n'a pas de titre visible, et sans lui un lecteur d'écran lirait une liste de domaines sans savoir qu'il s'agit de la formation. Si le carrousel change, ne pas casser ce couple : le contenu visible et le contenu lu doivent venir de la même source.

## Cartes passions (À propos)

Les visuels (`.viz-run`, `.viz-lift`, `.viz-eq`) sont purement décoratifs et marqués `aria-hidden="true"` sur leur conteneur `.passion-visual`. L'information reste portée par le `h3` + `p` visibles juste en dessous — ne pas mettre de texte utile uniquement dans le SVG/les `<span>` du visuel.
