const fs = require('fs');
const path = require('path');

const SITE = 'https://pgcbeius.ro';
const RADACINA = path.join(__dirname, '..');
const SABLOANE = path.join(__dirname, 'sabloane');

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

const COLECTII = [
  {
    fisierDate: 'parohii.json',
    dosar: 'parohii',
    parametru: 'parohie',
    titluLista: 'Parohiile protopopiatului',
    titluOg: 'Parohiile Protopopiatului Greco-Catolic Beiuș',
    firimitura: 'Parohii',
    descriere: 'Harta și lista parohiilor greco-catolice ale Protopopiatului Beiuș.',
    intro: 'Comunitățile greco-catolice ale Protopopiatului Beiuș. Alegeți o parohie de pe hartă sau din listă.',
    etichetaHarta: 'Harta parohiilor',
    textLink: 'Pagina parohiei',
    numar: (n) => (n === 1 ? '1 parohie' : `${n} parohii`),
    ordine: (a, b) => a.localitate.localeCompare(b.localitate, 'ro'),
    titluInLista: (p) => p.localitate,
    detaliu: (p) => (p.hram ? `Hram: ${p.hram}` : ''),
    eticheta: (p) => p.localitate,
    campuri: [
      ['Hram', 'hram'],
      ['Sărbătoarea hramului', 'sarbatoareHram'],
      ['Preot paroh', 'preot'],
      ['Adresă', 'adresa'],
    ],
    locImagine: 'Fotografie: exteriorul bisericii',
    etichetaHartaMica: (p) => `Hartă cu locația bisericii din ${p.localitate}`,
  },
  {
    fisierDate: 'institutii.json',
    dosar: 'institutii',
    parametru: 'institutie',
    titluLista: 'Instituțiile protopopiatului',
    titluOg: 'Instituțiile Protopopiatului Greco-Catolic Beiuș',
    firimitura: 'Instituții',
    descriere: 'Instituțiile Protopopiatului Greco-Catolic Beiuș: ce fac, unde se află și când sunt deschise.',
    intro: 'Locurile în care protopopiatul lucrează cu copiii, tinerii și comunitatea, pe lângă biserici. Alegeți o instituție de pe hartă sau din listă.',
    etichetaHarta: 'Harta instituțiilor',
    textLink: 'Pagina instituției',
    numar: (n) => (n === 1 ? '1 instituție' : `${n} instituții`),
    ordine: (a, b) => a.nume.localeCompare(b.nume, 'ro'),
    titluInLista: (p) => p.nume,
    detaliu: (p) => p.tip || '',
    eticheta: (p) => p.nume,
    campuri: [
      ['Ce este', 'tip'],
      ['Ocrotitor', 'ocrotitor'],
      ['Coordonator', 'coordonator'],
      ['Asistent spiritual', 'asistentSpiritual'],
      ['Adresă', 'adresa'],
    ],
    locImagine: 'Fotografie: clădirea',
    etichetaHartaMica: (p) => `Hartă cu locația: ${p.nume}, ${p.localitate}`,
  },
];

const verifica = (p, i, c) => {
  const lipsa = ['slug', 'nume', 'localitate', 'coordonate'].filter((camp) => !p[camp]);
  if (lipsa.length) throw new Error(`${c.fisierDate}, elementul #${i + 1} nu are: ${lipsa.join(', ')}`);
  if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`Slug invalid: "${p.slug}" (doar litere mici, cifre și cratime)`);
  if (!Array.isArray(p.coordonate) || p.coordonate.length !== 2) throw new Error(`Coordonate invalide la "${p.slug}"`);
};

const incarca = (c) => {
  const fisier = path.join(RADACINA, 'data', c.fisierDate);
  if (!fs.existsSync(fisier)) return [];
  const elemente = JSON.parse(fs.readFileSync(fisier, 'utf8'));
  elemente.forEach((p, i) => verifica(p, i, c));
  elemente.forEach((p) => {
    if (p.imagine && !fs.existsSync(path.join(RADACINA, p.imagine))) {
      console.warn(`  atenție: imaginea "${p.imagine}" de la "${p.slug}" nu există; se afișează locul gol.`);
      p.imagine = '';
    }
  });
  const sluguri = elemente.map((p) => p.slug);
  const duplicate = sluguri.filter((s, i) => sluguri.indexOf(s) !== i);
  if (duplicate.length) throw new Error(`Slug-uri duplicate în ${c.fisierDate}: ${duplicate.join(', ')}`);
  return elemente.sort(c.ordine);
};

const partiCompune = (radacina) => ({
  nav: completeaza(citeste('_nav.html'), { radacina }),
  subsol: completeaza(citeste('_subsol.html'), { radacina, an: String(new Date().getFullYear()) }),
});
const comune = partiCompune('../');

const pentruHarta = (p, c) => ({
  slug: p.slug,
  nume: p.nume,
  detaliu: c.detaliu(p),
  eticheta: c.eticheta(p),
  coordonate: p.coordonate,
});

const randFisa = (eticheta, valoare) =>
  valoare ? `\n          <dt>${eticheta}</dt>\n          <dd>${esc(valoare)}</dd>` : '';

const fisa = (p, c) => {
  const program = p.programPrincipal
    ? '\n          <dt>Program</dt>\n          <dd><a href="../index.html#program">Programul slujbelor</a></dd>'
    : p.program && p.program.length
    ? `\n          <dt>Program</dt>\n          <dd>\n            <ul class="fisa__program">${p.program
        .map((s) => `\n              <li><span>${esc(s.zi)}, ${esc(s.ora)}</span> ${esc(s.slujba)}</li>`)
        .join('')}\n            </ul>\n          </dd>`
    : '';
  return c.campuri.map(([eticheta, camp]) => randFisa(eticheta, p[camp])).join('') + program + '\n        ';
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

const paginaElement = (p, c) =>
  completeaza(citeste('element.html'), {
    ...comune,
    titlu: esc(`${p.nume} | Protopopiatul Greco-Catolic Beiuș`),
    descriere: esc(p.rezumat || `${p.nume}, ${p.localitate}.`),
    url: `${SITE}/${c.dosar}/${p.slug}.html`,
    ogImagine: p.imagine ? `  <meta property="og:image" content="${SITE}/${esc(p.imagine)}">` : '',
    titluLista: esc(c.titluLista),
    nume: esc(p.nume),
    localitate: esc(p.localitate),
    slug: p.slug,
    parametru: c.parametru,
    textLink: esc(c.textLink),
    notaTest: p.test
      ? '        <p class="nota-test">Pagină cu date de test. Informațiile reale vor fi adăugate în curând.</p>'
      : '',
    imagine: p.imagine
      ? `<img src="../${esc(p.imagine)}" alt="${esc(p.nume)} din ${esc(p.localitate)}"${p.imagineFocus ? ` style="object-position: ${esc(p.imagineFocus)}"` : ''}>`
      : `<span>${esc(c.locImagine)}</span>`,
    fisa: fisa(p, c),
    sectiuni: sectiuni(p),
    galerie: galerie(p),
    adresaText: esc(p.adresa || p.localitate),
    etichetaHartaMica: esc(c.etichetaHartaMica(p)),
    date: jsonInPagina([pentruHarta(p, c)]),
  });

const paginaLista = (elemente, c) =>
  completeaza(citeste('colectie.html'), {
    ...comune,
    url: `${SITE}/${c.dosar}/`,
    titluLista: esc(c.titluLista),
    titluOg: esc(c.titluOg),
    firimitura: esc(c.firimitura),
    descriere: esc(c.descriere),
    intro: esc(c.intro),
    etichetaHarta: esc(c.etichetaHarta),
    parametru: c.parametru,
    textLink: esc(c.textLink),
    numar: c.numar(elemente.length),
    lista: elemente
      .map((p) => {
        const detaliu = c.detaliu(p) || p.nume;
        return `            <li><a href="${p.slug}.html" data-slug="${p.slug}"><span class="lista__loc">${esc(c.titluInLista(p))}</span><span class="lista__hram">${esc(detaliu)}</span></a></li>`;
      })
      .join('\n'),
    date: jsonInPagina(elemente.map((p) => pentruHarta(p, c))),
  });

let total = 0;
COLECTII.forEach((c) => {
  const elemente = incarca(c);
  const iesire = path.join(RADACINA, c.dosar);
  fs.mkdirSync(iesire, { recursive: true });

  const sluguri = elemente.map((p) => p.slug);
  fs.readdirSync(iesire)
    .filter((f) => f.endsWith('.html') && f !== 'index.html')
    .filter((f) => !sluguri.includes(f.replace(/\.html$/, '')))
    .forEach((f) => {
      fs.unlinkSync(path.join(iesire, f));
      console.log(`  șters:   ${c.dosar}/${f}`);
    });

  elemente.forEach((p) => {
    fs.writeFileSync(path.join(iesire, `${p.slug}.html`), paginaElement(p, c));
    console.log(`  generat: ${c.dosar}/${p.slug}.html`);
  });
  fs.writeFileSync(path.join(iesire, 'index.html'), paginaLista(elemente, c));
  console.log(`  generat: ${c.dosar}/index.html`);
  total += elemente.length;
});

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

console.log(`Gata: ${total} pagini de parohii și instituții și ${PAGINI.length} pagini simple.`);
