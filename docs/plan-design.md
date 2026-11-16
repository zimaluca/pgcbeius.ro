# Plan de design — pagina principală (v1, 15 nov 2026)

Status: propunere, de confirmat de Luca.

## 1. Tokeni
Definiți în `assets/css/variabile.css`.

**Culori**

| Nume | Hex | Rol |
|---|---|---|
| crem | #FAF6EE | fundal principal |
| crem-cald | #F1E8D8 | secțiuni alternante |
| auriu | #B8913A | doar ornamente, linii, iconițe |
| auriu-text | #7E5F1C | text cu aspect auriu |
| vișiniu | #7A1E2C | butoane, o singură bandă plină pe pagină |
| text | #2B2320 | text |

**Tipografie**
- Titluri și verset: **Cormorant Garamond**. Amintește de tipografia cărților liturgice vechi.
- Text: **Alegreya Sans** (propunere; alternativa este Inter). E un sans umanist, cu rădăcini caligrafice, care se potrivește cu un serif de carte veche.
- Scară: 14 · 18 · 24 · 36 · 48 · 60 px. Textul are 18px, pentru că mulți enoriași citesc de pe telefon.
- Fonturile se găzduiesc local, în `assets/fonts`. E mai rapid și nu trimite IP-urile vizitatorilor la Google (GDPR). Înainte de alegerea finală se verifică diacriticele ș și ț.

**Layout**
- Conținut de maximum 72rem lățime, rânduri de text de maximum 65 de caractere.
- **Aliniere:** hero-ul e centrat, pe axa crucii, ca axa unui iconostas. Toate celelalte secțiuni sunt aliniate la stânga.
- **Ritm:** secțiunile alternează crem și crem-cald. Vișiniul plin apare o singură dată.

**Principii**
1. Un singur moment îndrăzneț: hero-ul (video + cruce 3D + verset). Restul paginii e liniștit.
2. Arcada (vârf în arc, ca ferestrele bisericii și ramele icoanelor) e singura formă decorativă. Se folosește doar la imaginile locurilor sfinte.
3. Auriul e lumină, nu vopsea: doar linii subțiri și ornamente mici.
4. Informația utilă vine imediat după hero (programul slujbelor), cu cuvinte simple.
5. Mișcare doar în hero (o singură secvență de intrare) și ca răspuns la acțiuni (acordeon, meniu).

## 2. Wireframe desktop

### Hero — 100svh
```
┌────────────────────────────────────────────────────────────────────────┐
│ [logo] Parohia Greco-Catolică   Program Repere Taine Parohii   [Scrie-ne]│ ← navbar transparent
│        Beiuș                                                           │
│                                                                        │
│                               ✝                                        │ ← cruce 3D aurie
│                                                                        │
│              „Lumina luminează în întuneric                            │ ← Cormorant, 60px
│               și întunericul nu a cuprins-o.”                          │
│                           Ioan 1, 5                                    │ ← mic, auriu
│                                                                        │
│   [ VIDEO pe fundal + strat închis 55% ]                               │
└────────────────────────────────────────────────────────────────────────┘
```
Versetul e un placeholder: se potrivește cu ideea de lumină peste video, dar alegerea finală e a ta.

### Programul slujbelor — crem
```
  Programul slujbelor
  ──────────────────────────────────────────────────────────── (linie aurie)
  Duminică și sărbători              În timpul săptămânii
  08:00   Utrenia                    Luni–Vineri
  10:00   Sfânta Liturghie           18:00   Vecernia
  ──────────────────────────────────────────────────────────────
  Paroh: pr. …
  Vicar: pr. …

  ┌ Program special de Crăciun ─────────────────────────────┐   ← apare doar când există
  └─────────────────────────────────────────────────────────┘
```

### Cele 3 repere — crem-cald, triptic
```
                 ╭───────────╮
   ╭───────╮     │           │     ╭───────╮
   │       │     │  Biserica │     │       │
   │Palatul│     │  (foto)   │     │Orato- │
   │ (foto)│     │           │     │ riul  │
   │       │     │           │     │ (foto)│
   └───────┘     └───────────┘     └───────┘
   Palatul       Biserica           Oratoriul
   Episcopal     „Sfinții Trei      „Colț de Rai”
   o frază       Ierarhi”           o frază
   Află mai mult două fraze         Află mai mult
                 Află mai mult
```
Panoul din mijloc e mai mare și mai înalt; toate fotografiile au vârf în arc.

### Sfintele Taine — crem
```
  Sfintele Taine               │  Botezul                              +
  Ce acte sunt necesare și     │  ───────────────────────────────────────
  pe cine contactați.          │  Cununia                              +
                               │  ───────────────────────────────────────
                               │  Spovedania și Împărtășania           +
                               │  ───────────────────────────────────────
                               │  Sfântul Maslu                        +
                               │  ───────────────────────────────────────
                               │  Înmormântarea                        +
```
Acordeon; fiecare deschide actele necesare și persoana de contact.

### Teaser hartă — pe toată lățimea
```
┌────────────────────────────────────────────────────────────────────────┐
│  (hartă Leaflet a zonei Beiușului, pini aurii, fără zoom la scroll)     │
│  ┌──────────────────────────┐                                          │
│  │ Parohiile din zona       │                                          │
│  │ Beiușului                │                                          │
│  │ O frază despre comunități│                                          │
│  │ [ Deschide harta ]       │                                          │
│  └──────────────────────────┘                                          │
└────────────────────────────────────────────────────────────────────────┘
```

### Donații — singura bandă vișinie (conținut de stabilit)
```
████████████████████████████████████████████████████████████████████████
█  Sprijiniți parohia                                                  █
█  O frază scurtă.        IBAN  RO.. .... .... ....   [ Copiază IBAN ] █
████████████████████████████████████████████████████████████████████████
```

### Contact — crem
```
  Contact
  Adresă                         │  Nume      [                      ]
  Str. …, Beiuș                  │  Email     [                      ]
                                 │  Mesaj     [                      ]
  Telefon                        │            [                      ]
  …                              │  [ ] Sunt de acord cu Politica de
                                 │      confidențialitate
  ┌────────────────────┐         │  [ Trimite mesajul ]
  │     hartă mică     │         │
  └────────────────────┘         │
```

### Footer — crem-cald, linie aurie sus
```
  ──────────────────────────────────────────────────────────────────────
  [logo] Parohia Greco-Catolică Beiuș    Pagini          Legal
                                         Program         Politica de
                                         Repere          confidențialitate
                                         Parohii         Despre site
  © 2026 Parohia Greco-Catolică Beiuș                    ● ● ●  ← culorile;
                                                                   la hover,
                                                                   semnificația
```

## 3. Mobil
- Navbar: logo + meniu hamburger. Butonul „Scrie-ne” intră în meniu.
- Hero: crucea mai mică; video de 720p sau doar imaginea poster.
- Program: cele două coloane se așază una sub alta.
- Triptic: întâi biserica, pe toată lățimea, apoi Palatul și Oratoriul unul lângă altul.
- Taine, contact, footer: o singură coloană.

## 4. Verificare față de stilurile generice

Ce am schimbat față de varianta implicită și de ce:

- **Playfair Display → Cormorant Garamond.** Playfair e prima alegere a oricărui generator (a ales-o și Gemini). Cormorant e mai fin și mai aproape de cărțile liturgice.
- **Inter → Alegreya Sans (de confirmat).** Inter e cel mai comun font implicit de pe web.
- **3 carduri identice → triptic cu arcade.** Cardurile identice sunt „kit-ul SaaS”. Tripticul vine din tradiția icoanelor și pune biserica principală în centru.
- **Fără etichete cu MAJUSCULE** deasupra titlurilor, fără „01 / 02 / 03”, fără „→” la linkuri, fără puncte de mijloc între informații.
- **Fără fade-in pe fiecare secțiune.** Animație doar la intrarea în hero și la acțiunile utilizatorului.
- **Fără „număr mare + etichetă mică”** în secțiunea cu harta.

Ce rămâne aproape de stilul implicit, intenționat: fundalul crem + titluri serif. Le-a ales Luca, iar alegerea are un motiv real (culorile liturgice bizantine). Personalitatea vine din hero, din arcade și din triptic.
