const fs = require('fs');
const path = require('path');

const SITE = 'https://pgcbeius.ro';
const RADACINA = path.join(__dirname, '..');
const SABLOANE = path.join(__dirname, 'sabloane');
const IESIRE = path.join(RADACINA, 'parohii');

const citeste = (fisier) => fs.readFileSync(path.join(SABLOANE, fisier), 'utf8');

const esc = (text = '') =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const completeaza = (sablon, valori) =>
  sablon.replace(/\{\{(\w+)\}\}/g, (_, cheie) => {
    if (!(cheie in valori)) throw new Error(`Lipsește valoarea pentru {{${cheie}}}`);
    return valori[cheie];
  });

const jsonInPagina = (date) => JSON.stringify(date).replace(/</g, '\\u003c');

const verifica = (p, i) => {
  const lipsa = ['slug', 'nume', 'localitate', 'coordonate'].filter((c) => !p[c]);
  if (lipsa.length) throw new Error(`Parohia #${i + 1} nu are: ${lipsa.join(', ')}`);
  if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`Slug invalid: "${p.slug}" (doar litere mici, cifre și cratime)`);
  if (!Array.isArray(p.coordonate) || p.coordonate.length !== 2) throw new Error(`Coordonate invalide la "${p.slug}"`);
};

const parohii = JSON.parse(fs.readFileSync(path.join(RADACINA, 'data', 'parohii.json'), 'utf8'));
parohii.forEach(verifica);
parohii.forEach((p) => {
  if (p.imagine && !fs.existsSync(path.join(RADACINA, p.imagine))) {
    console.warn(`  atenție: imaginea "${p.imagine}" a parohiei "${p.slug}" nu există; se afișează locul gol.`);
    p.imagine = '';
  }
});
const sluguri = parohii.map((p) => p.slug);
const duplicate = sluguri.filter((s, i) => sluguri.indexOf(s) !== i);
if (duplicate.length) throw new Error(`Slug-uri duplicate: ${duplicate.join(', ')}`);
parohii.sort((a, b) => a.localitate.localeCompare(b.localitate, 'ro'));

const partiCompune = (radacina) => ({
  nav: completeaza(citeste('_nav.html'), { radacina }),
  subsol: completeaza(citeste('_subsol.html'), { radacina, an: String(new Date().getFullYear()) }),
});
const comune = partiCompune('../');

const pentruHarta = (p) => ({
  slug: p.slug,
  nume: p.nume,
  localitate: p.localitate,
  hram: p.hram || '',
  coordonate: p.coordonate,
});

const randFisa = (eticheta, valoare) =>
  valoare ? `\n          <dt>${eticheta}</dt>\n          <dd>${esc(valoare)}</dd>` : '';

const fisa = (p) => {
  const program = p.programPrincipal
    ? '\n          <dt>Program</dt>\n          <dd><a href="../index.html#program">Programul slujbelor</a></dd>'
    : p.program && p.program.length
    ? `\n          <dt>Program</dt>\n          <dd>\n            <ul class="fisa__program">${p.program
        .map((s) => `\n              <li><span>${esc(s.zi)}, ${esc(s.ora)}</span> ${esc(s.slujba)}</li>`)
        .join('')}\n            </ul>\n          </dd>`
    : '';
  return [
    randFisa('Hram', p.hram),
    randFisa('Sărbătoarea hramului', p.sarbatoareHram),
    randFisa('Preot paroh', p.preot),
    randFisa('Adresă', p.adresa),
    program,
  ].join('') + '\n        ';
};

const sectiuni = (p) => {
  if (!p.sectiuni || !p.sectiuni.length) return '';
  const continut = p.sectiuni
    .map((s) => `        <section class="parohie__sectiune">\n          <h2>${esc(s.titlu)}</h2>\n${s.paragrafe
      .map((t) => `          <p>${esc(t)}</p>`)
      .join('\n')}\n        </section>`)
    .join('\n');
  return `      <div class="parohie__continut">\n${continut}\n      </div>\n`;
};

const EXTENSII_IMAGINI = /\.(jpe?g|png|webp|avif)$/i;

const descriereDinFisier = (fisier) => {
  const text = path.parse(fisier).name.replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ').trim();
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
};

const imaginiGalerie = (cheie, explicite = []) => {
  const folderRelativ = `assets/img/galerii/${cheie}`;
  const folder = path.join(RADACINA, folderRelativ);
  const lista = explicite.map((img) => ({ src: img.src, alt: img.alt || descriereDinFisier(img.src) }));
  if (fs.existsSync(folder)) {
    fs.readdirSync(folder)
      .filter((f) => EXTENSII_IMAGINI.test(f))
      .sort((a, b) => a.localeCompare(b, 'ro', { numeric: true }))
      .forEach((f) => {
        const src = `${folderRelativ}/${f}`;
        if (!lista.some((img) => img.src === src)) lista.push({ src, alt: descriereDinFisier(f) });
      });
  }
  return lista;
};

const galerieHtml = (imagini, radacina) => {
  if (!imagini.length) return '';
  const elemente = imagini
    .map((img) => {
      const src = radacina + encodeURI(img.src);
      return `          <li><a href="${esc(src)}" data-galerie><img src="${esc(src)}" alt="${esc(img.alt)}" loading="lazy"></a></li>`;
    })
    .join('\n');
  return `      <section class="galerie-foto" aria-labelledby="titlu-galerie">\n        <h2 id="titlu-galerie">Galerie foto</h2>\n        <ul class="galerie">\n${elemente}\n        </ul>\n      </section>\n`;
};

const galerie = (p) => galerieHtml(imaginiGalerie(p.slug, p.galerie || []), '../');

const paginaParohie = (p) =>
  completeaza(citeste('parohie.html'), {
    ...comune,
    titlu: esc(`${p.nume} | Protopopiatul Greco-Catolic Beiuș`),
    descriere: esc(p.rezumat || `${p.nume}, ${p.localitate}.`),
    url: `${SITE}/parohii/${p.slug}.html`,
    ogImagine: p.imagine ? `  <meta property="og:image" content="${SITE}/${esc(p.imagine)}">` : '',
    nume: esc(p.nume),
    localitate: esc(p.localitate),
    slug: p.slug,
    notaTest: p.test
      ? '        <p class="nota-test">Pagină cu date de test. Informațiile reale vor fi adăugate în curând.</p>'
      : '',
    imagine: p.imagine
      ? `<img src="../${esc(p.imagine)}" alt="${esc(p.nume)} din ${esc(p.localitate)}" width="1050" height="1400">`
      : '<span>Fotografie: exteriorul bisericii</span>',
    fisa: fisa(p),
    sectiuni: sectiuni(p),
    galerie: galerie(p),
    adresaText: esc(p.adresa || p.localitate),
    date: jsonInPagina([pentruHarta(p)]),
  });

const paginaLista = () =>
  completeaza(citeste('parohii.html'), {
    ...comune,
    url: `${SITE}/parohii/`,
    numar: parohii.length === 1 ? '1 parohie' : `${parohii.length} parohii`,
    lista: parohii
      .map((p) => `            <li><a href="${p.slug}.html" data-slug="${p.slug}"><span class="lista__loc">${esc(p.localitate)}</span><span class="lista__hram">${esc(p.hram ? `Hram: ${p.hram}` : p.nume)}</span></a></li>`)
      .join('\n'),
    date: jsonInPagina(parohii.map(pentruHarta)),
  });

fs.mkdirSync(IESIRE, { recursive: true });

const vechi = fs.readdirSync(IESIRE).filter((f) => f.endsWith('.html') && f !== 'index.html');
vechi
  .filter((f) => !sluguri.includes(f.replace(/\.html$/, '')))
  .forEach((f) => {
    fs.unlinkSync(path.join(IESIRE, f));
    console.log(`  șters:   parohii/${f}`);
  });

parohii.forEach((p) => {
  fs.writeFileSync(path.join(IESIRE, `${p.slug}.html`), paginaParohie(p));
  console.log(`  generat: parohii/${p.slug}.html`);
});
fs.writeFileSync(path.join(IESIRE, 'index.html'), paginaLista());
console.log('  generat: parohii/index.html');

const PAGINI = [
  {
    fisier: 'despre.html',
    titlu: 'Despre site',
    descriere: 'Despre site-ul Protopopiatului Greco-Catolic Beiuș și semnificația culorilor folosite.',
    radacina: '',
  },
  {
    fisier: 'politica-de-confidentialitate.html',
    titlu: 'Politica de confidențialitate',
    descriere: 'Cum prelucrează Protopopiatul Greco-Catolic Beiuș datele personale trimise prin site.',
    radacina: '',
  },
  {
    fisier: '404.html',
    titlu: 'Pagina nu a fost găsită',
    descriere: 'Pagina căutată nu există.',
    radacina: '/',
    neindexata: true,
  },
];

PAGINI.forEach((pg) => {
  const continut = fs.readFileSync(path.join(__dirname, 'pagini', pg.fisier), 'utf8').trimEnd();
  const html = completeaza(citeste('pagina.html'), {
    ...partiCompune(pg.radacina),
    radacina: pg.radacina,
    titlu: esc(`${pg.titlu} | Protopopiatul Greco-Catolic Beiuș`),
    descriere: esc(pg.descriere),
    robots: pg.neindexata ? '  <meta name="robots" content="noindex">' : '',
    continut,
  });
  fs.writeFileSync(path.join(RADACINA, pg.fisier), html);
  console.log(`  generat: ${pg.fisier}`);
});

console.log(`Gata: ${parohii.length} parohii și ${PAGINI.length} pagini.`);
