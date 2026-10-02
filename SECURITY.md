# Sécurité — Portfolio

Site statique sans backend, sans formulaire serveur, sans base de données. Surface d'attaque minimale, mais quelques règles à respecter.

## Règles

- Ne jamais committer de secrets, clés API, ou informations personnelles sensibles (autres que le contact public déjà présent sur le site).
- Tout contenu inséré dynamiquement en JS (ex. `innerHTML` pour la modale projet) doit provenir de données statiques/contrôlées par le développeur — jamais d'entrée utilisateur non échappée injectée dans le DOM.
- Liens externes (`target="_blank"`) doivent inclure `rel="noopener noreferrer"` pour éviter le tabnabbing.
- Ressources externes chargées uniquement via HTTPS. Tout script de CDN doit porter un `integrity` (SRI sha384) + `crossorigin="anonymous"` : c'est déjà le cas pour GSAP, ScrollTrigger et Lenis. **Lenis vient de jsDelivr et non de cdnjs** (il n'y est pas publié) : son empreinte a été calculée localement à partir du fichier téléchargé, puis vérifiée contre celle du fichier réellement servi. En changeant de version, recalculer le hash (`openssl dgst -sha384 -binary fichier.js | openssl base64 -A`) — ne jamais retirer l'attribut pour « débloquer » un chargement.
- Le contact se fait par un simple lien `mailto:`. Si un formulaire est ajouté à l'avenir, valider et échapper toute entrée côté serveur, pas seulement côté client.
- Pas de tracking/analytics tiers sans consentement explicite si le site vise un public européen (RGPD).
