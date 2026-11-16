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
- Programul slujbelor: `data/program.json` (pagina îl citește singură, nu trebuie rulat nimic)
- Parohiile: se modifică `data/parohii.json`, apoi se regenerează paginile:

```
node scripts/genereaza-parohii.js
```

Scriptul creează `parohii/index.html` (harta + lista) și câte o pagină `parohii/<slug>.html` pentru fiecare parohie, din șabloanele din `scripts/sabloane/`. Paginile din `parohii/` nu se editează de mână: se modifică datele sau șabloanele și se rulează din nou scriptul.

### Câmpurile unei parohii
| Câmp | Obligatoriu | Exemplu |
|---|---|---|
| `slug` | da | `beius` (doar litere mici, cifre, cratime) |
| `nume` | da | `Parohia Greco-Catolică Beiuș` |
| `localitate` | da | `Beiuș` |
| `coordonate` | da | `[46.6667, 22.35]` |
| `hram`, `sarbatoareHram`, `preot`, `adresa` | nu | |
| `rezumat` | nu | o frază, apare în căutări și pe Facebook |
| `imagine` | nu | `assets/img/parohii/beius.jpg` |
| `program` | nu | `[{ "zi": "Duminică", "ora": "10:00", "slujba": "Sfânta Liturghie" }]` |
| `sectiuni` | nu | `[{ "titlu": "Istoric", "paragrafe": ["..."] }]` |
| `galerie` | nu | `[{ "src": "assets/img/parohii/beius-1.jpg", "alt": "Altarul" }]` |
| `test` | nu | `true` afișează nota „date de test” |

### Programul slujbelor (`data/program.json`)
- `coloane`: coloanele programului obișnuit. Fiecare are un `titlu` și `grupuri`; un grup are `zile` (ex. `Luni – Vineri`, poate fi gol) și `slujbe` (`ora`, `slujba`).
- `cler`: lista de persoane (`rol`, `nume`).
- `test`: `true` afișează nota „Orele afișate sunt provizorii”.
- `special`: programe pentru sărbători. Apar automat deasupra programului obișnuit doar între `afisareDeLa` și `afisarePanaLa`:

```json
"special": [
  {
    "titlu": "Programul de Crăciun",
    "afisareDeLa": "2026-12-15",
    "afisarePanaLa": "2026-12-27",
    "slujbe": [
      { "data": "2026-12-24", "ora": "23:00", "slujba": "..." }
    ]
  }
]
```
