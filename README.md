# pgcbeius.ro

Site de prezentare pentru Protopopiatul Greco-Catolic Beiuș: Biserica „Sfinții Trei Ierarhi”, Palatul Episcopal, Oratoriul „Colț de Rai” și parohiile greco-catolice ale protopopiatului.

Autor: Luca Zima

## Tehnologii
HTML, CSS și JavaScript simplu, fără framework-uri. Three.js pentru crucea 3D din hero, Leaflet + OpenStreetMap pentru harta parohiilor, Formspree pentru formularul de contact.

## Structură
```
index.html                       pagina principală
palatul-episcopal.html           Palatul Episcopal Greco-Catolic
parohii/                         harta mare + paginile parohiilor (generate)
institutii/                      harta + paginile instituțiilor, ex. Oratoriul „Colț de Rai” (generate)
despre.html                      despre site, simbolistica culorilor
politica-de-confidentialitate.html
404.html

assets/css/      stiluri (variabile.css = culori, fonturi, spațieri)
assets/js/       scripturi
assets/img/      imagini
assets/video/    video-ul din hero
assets/fonts/    fonturi găzduite local
assets/models/   modelul 3D al crucii (.glb)
data/            program.json, parohii.json, institutii.json — datele care se actualizează
scripts/         generatorul paginilor de parohii și instituții (Node)
docs/            planul de design și notițe
```

## Actualizare conținut
- Programul slujbelor: `data/program.json` (pagina îl citește singură, nu trebuie rulat nimic)
- Parohiile și instituțiile: se modifică `data/parohii.json` sau `data/institutii.json`, apoi se regenerează paginile:

```
node scripts/genereaza.js
```

Scriptul creează din șabloanele din `scripts/sabloane/`:
- `parohii/index.html` (harta + lista) și câte o pagină `parohii/<slug>.html` pentru fiecare parohie;
- `institutii/index.html` și câte o pagină `institutii/<slug>.html` pentru fiecare instituție;
- `despre.html`, `politica-de-confidentialitate.html` și `404.html`, al căror conținut stă în `scripts/pagini/`.

Aceste pagini nu se editează de mână: se modifică datele, șabloanele sau `scripts/pagini/` și se rulează din nou scriptul. Navbar-ul și footer-ul lor vin din `scripts/sabloane/_nav.html` și `_subsol.html`.

Parohiile și instituțiile folosesc aceleași șabloane: `scripts/sabloane/colectie.html` (harta + lista) și `element.html` (pagina unui loc). Textele care diferă (titluri, etichetele din fișă, parametrul din adresă) stau în lista `COLECTII` din `scripts/genereaza.js`. Pentru o colecție nouă se adaugă un element în `COLECTII` și un fișier în `data/`.

`404.html` folosește căi absolute (`/assets/...`), ca să funcționeze la orice adresă greșită. Merge corect pe domeniul propriu (pgcbeius.ro) sau pe serverul local.

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
| `imagineFocus` | nu | `70% 50%`: ce parte a pozei rămâne vizibilă în arcadă (orizontal, vertical); implicit centrul |
| `program` | nu | `[{ "zi": "Duminică", "ora": "10:00", "slujba": "Sfânta Liturghie" }]` |
| `programPrincipal` | nu | `true` pune în fișă un link spre programul de pe pagina principală (pentru Beiuș) |
| `sectiuni` | nu | `[{ "titlu": "Istoric", "paragrafe": ["..."] }]` |
| `galerie` | nu | de obicei nu e nevoie: galeria se face singură din folder (vezi mai jos) |
| `test` | nu | `true` afișează nota „date de test” |

### Câmpurile unei instituții (`data/institutii.json`)
La fel ca la parohii (`slug`, `nume`, `localitate`, `coordonate` obligatorii; `adresa`, `rezumat`, `imagine`, `program`, `sectiuni`, `galerie`, `test` opționale), dar în loc de hram și preot fișa are:

| Câmp | Apare în fișă ca | Exemplu |
|---|---|---|
| `tip` | Ce este | `Centru pentru copii și tineri al Parohiei Greco-Catolice Beiuș` |
| `ocrotitor` | Ocrotitor | `Sfântul Filip Neri (26 mai)` |
| `coordonator` | Coordonator | `prof. Carmen Zima` |
| `asistentSpiritual` | Asistent spiritual | `pr. Zorel Zima, paroh și protopop de Beiuș` |

`tip` apare și în listă și în fereastra de pe hartă. Pe harta mare, o instituție se deschide cu `institutii/?institutie=<slug>`.

### Galeria foto
La finalul fiecărei pagini de parohie sau instituție apare o galerie, dacă există poze în folderul ei:

```
assets/img/galerii/<slug>/     ex. assets/img/galerii/beius/
```

1. Pune pozele în folder (`.jpg`, `.png`, `.webp`). Ideal cel mult 1600 px pe latura mare.
2. Ordinea e dată de numele fișierelor, deci pune un număr în față: `01-iconostasul.jpg`, `02-altarul.jpg`.
3. Descrierea pozei se face din nume: `03-pictura-bolții.jpg` devine „Pictura bolții”. Cratimele devin spații, numărul din față dispare.
4. Rulează `node scripts/genereaza.js`.

La click, poza se deschide pe tot ecranul. Te poți mișca între poze cu săgețile de pe ecran, cu săgețile de la tastatură sau glisând pe telefon; Esc sau × închide galeria.

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
