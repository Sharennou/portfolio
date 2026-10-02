// OUTIL DE DÉVELOPPEMENT — ne fait pas partie du site, aucune page ne le charge.
// Faux DOM minimal pour exécuter les scripts hors navigateur et attraper les
// erreurs de chargement (variable manquante, élément introuvable).
//
//   JSC=/System/Cryptexes/OS/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc
//   $JSC tests/domstub.js js/core.js js/site.js js/home.js -e "openMenu(); closeMenu();"
//
// Pour projet.html, voir la note sur `location.search` plus bas : les deux
// branches (projet trouvé / introuvable) se testent séparément.
//
// Supprimable sans risque.
// Faux DOM minimal : sans GSAP, motionOK sera faux et on parcourt le chemin de
// repli. Ça ne teste pas les animations, mais ça attrape les ReferenceError
// au chargement et les éléments introuvables.
var listeners = [];
function El(id) {
  return {
    id: id || '', hidden: false, textContent: '', innerHTML: '', dataset: {},
    style: { transform: '', setProperty(k, v){ this[k] = v; }, removeProperty(k){ delete this[k]; } },
    children: [], offsetLeft: 0, offsetWidth: 100, offsetHeight: 56, offsetTop: 0,
    classList: { add(){}, remove(){}, toggle(){}, contains(){ return false; } },
    addEventListener(t){ listeners.push(t); }, removeEventListener(){},
    setAttribute(){}, removeAttribute(){}, getAttribute(){ return '#x'; },
    querySelector(){ return El(); }, querySelectorAll(){ return [El(), El(), El()]; },
    closest(){ return null; }, focus(){}, matches(){ return false; },
    insertAdjacentHTML(){}, insertBefore(){}, appendChild(){}, scrollIntoView(){}, getBoundingClientRect(){ return {top:0,left:0,width:0,height:0}; }
  };
}
var document = {
  documentElement: El('html'), body: El('body'), fonts: null,
  getElementById(id){ return El(id); },
  querySelector(){ return El(); }, querySelectorAll(){ return [El(), El(), El()]; },
  addEventListener(t){ listeners.push(t); }, createElement(){ return El(); }
};
var window = {
  matchMedia(){ return { matches: false, addEventListener(){} }; },
  addEventListener(){}, scrollTo(){}, scrollY: 0, innerWidth: 1440, innerHeight: 900
};
// `search` est lu par project.js pour choisir le projet à afficher. Vide, c'est la
// branche « projet introuvable » qui est testée ; pour tester l'autre, glisser un
// `-e` AVANT le script, les arguments étant traités dans l'ordre :
//   $JSC tests/domstub.js -e "location.search='?p=voeux-2026'" js/core.js js/site.js js/project.js
var location = { hash: '', pathname: '/index.html', href: '', search: '' };

// Minimal : project.js n'en utilise que `.get()`. Une fonction suffit — appelée
// avec `new`, c'est l'objet renvoyé qui gagne.
function URLSearchParams(qs) {
  var pairs = String(qs || '').replace(/^\?/, '').split('&').filter(function (s) { return s; })
    .map(function (kv) {
      var i = kv.indexOf('=');
      return i === -1 ? [kv, ''] : [kv.slice(0, i), kv.slice(i + 1)];
    });
  return {
    get: function (key) {
      for (var i = 0; i < pairs.length; i++) {
        if (decodeURIComponent(pairs[i][0]) === key) return decodeURIComponent(pairs[i][1]);
      }
      return null;
    }
  };
}
var requestAnimationFrame = function(f){ };
function IntersectionObserver(cb, opts) { return { observe(){}, unobserve(){}, disconnect(){} }; }
