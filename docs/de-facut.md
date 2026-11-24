# De făcut înainte de publicare

## Conținut provizoriu de înlocuit
- [ ] Programul slujbelor: orele din `data/program.json` sunt exemple. Se înlocuiesc cu programul real și se pune `"test": false`.
- [ ] Numele protopopului și al parohului (tot în `data/program.json`, la `cler`).
- [ ] Adresa, telefonul și emailul de contact.
- [ ] Textele dintre `[paranteze]` din `index.html`.
- [ ] Cele 3 imagini din „Locuri din Beiuș” sunt generate cu AI (Higgsfield) și NU arată clădirile reale. Se înlocuiesc cu fotografii reale, iar eticheta „Imagine provizorie” se șterge.
- [ ] Versetul din hero (acum: Ioan 1, 5).
- [ ] Coordonatele bisericii în `assets/js/harta.js` (acum: centrul Beiușului).
- [ ] Parohiile din `data/parohii.json`: cele două parohii de test se șterg, datele Beiușului se completează, se adaugă lista reală, apoi `node scripts/genereaza.js`.
- [ ] Politica de confidențialitate (`scripts/pagini/politica-de-confidentialitate.html`): se completează câmpurile dintre `[paranteze]` (denumire, adresă, email, perioada de păstrare, data), se verifică și se aprobă de protopopiat, apoi se scoate nota „Ciornă” și se regenerează.

## Tehnic
- [ ] Formularul de contact: în `action` se pune ID-ul formularului din Formspree (acum `XXXX`).
- [x] Fonturile găzduite local în `assets/fonts` (Cormorant Garamond și Alegreya Sans, licență SIL Open Font License).
- [ ] Opțional: Leaflet și Three.js se încarcă încă de pe CDN-uri externe (unpkg, jsdelivr); se pot copia și ele local.
- [ ] Video-ul din hero: când e gata filmarea, în `<div class="hero__fundal">` se pune:

```html
<video autoplay muted loop playsinline poster="assets/img/hero-poster.jpg">
  <source src="assets/video/hero.mp4" type="video/mp4">
</video>
```

- [ ] Se șterge paragraful `hero__nota` („Aici va rula video-ul...”).
