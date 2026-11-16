# pgcbeius.ro

Site de prezentare pentru Protopopiatul Greco-Catolic Beiuș: Biserica „Sfinții Trei Ierarhi”, Palatul Episcopal, Oratoriul „Colț de Rai” și parohiile greco-catolice ale protopopiatului.

Autor: Luca Zima

## Tehnologii
HTML, CSS și JavaScript simplu, fără framework-uri. Three.js pentru crucea 3D din hero, Leaflet + OpenStreetMap pentru harta parohiilor, Formspree pentru formularul de contact.

## Structură
```
index.html                       pagina principală
sfintii-trei-ierarhi.html        Biserica „Sfinții Trei Ierarhi”
palatul-episcopal.html           Palatul Episcopal Greco-Catolic
oratoriul-colt-de-rai.html       Oratoriul „Colț de Rai”
parohii/                         harta mare + paginile parohiilor (generate)
despre.html                      despre site, simbolistica culorilor
politica-de-confidentialitate.html
404.html

assets/css/      stiluri (variabile.css = culori, fonturi, spațieri)
assets/js/       scripturi
assets/img/      imagini
assets/video/    video-ul din hero
assets/fonts/    fonturi găzduite local
assets/models/   modelul 3D al crucii (.glb)
data/            program.json, parohii.json — datele care se actualizează
scripts/         generatorul paginilor de parohii (Node)
docs/            planul de design și notițe
```

## Actualizare conținut
- Programul slujbelor: `data/program.json`
- Parohiile: `data/parohii.json`, apoi rulează scriptul din `scripts/`
