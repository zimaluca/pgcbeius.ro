(() => {
  const sursa = document.getElementById('date-parohii');
  if (!window.L || !sursa) return;

  const parohii = JSON.parse(sursa.textContent);
  const parametru = sursa.dataset.parametru || 'parohie';
  const textLink = sursa.dataset.link || 'Pagina parohiei';

  const esc = (text) =>
    String(text).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const stil = { radius: 7, color: '#7A1E2C', weight: 2, fillColor: '#B8913A', fillOpacity: 1 };
  const stilActiv = { ...stil, radius: 11, weight: 3 };

  const straturi = () =>
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

  const elMare = document.getElementById('harta-parohii');
  if (elMare) {
    const harta = L.map(elMare, { scrollWheelZoom: false });
    straturi().addTo(harta);

    const pini = new Map();
    const elemente = document.querySelectorAll('.lista-parohii [data-slug]');
    let deschisa = null;

    const evidentiaza = (slug) => {
      pini.forEach((pin, s) => pin.setStyle(s === slug ? stilActiv : stil));
      elemente.forEach((el) => el.classList.toggle('activ', el.dataset.slug === slug));
    };

    parohii.forEach((p) => {
      const pin = L.circleMarker(p.coordonate, stil).addTo(harta);
      pin.bindPopup(
        `<strong>${esc(p.nume)}</strong>` +
        (p.detaliu ? `<br>${esc(p.detaliu)}` : '') +
        `<br><a href="${esc(p.slug)}.html">${esc(textLink)}</a>`
      );
      pin.on('popupopen', () => { deschisa = p.slug; evidentiaza(p.slug); });
      pin.on('popupclose', () => { deschisa = null; evidentiaza(null); });
      pini.set(p.slug, pin);
    });

    if (parohii.length) {
      harta.fitBounds(L.latLngBounds(parohii.map((p) => p.coordonate)), { padding: [48, 48], maxZoom: 12 });
    }

    elemente.forEach((el) => {
      const intra = () => evidentiaza(el.dataset.slug);
      const iese = () => evidentiaza(deschisa);
      el.addEventListener('mouseenter', intra);
      el.addEventListener('focus', intra);
      el.addEventListener('mouseleave', iese);
      el.addEventListener('blur', iese);
    });

    const ceruta = new URLSearchParams(window.location.search).get(parametru);
    const pin = ceruta && pini.get(ceruta);
    if (pin) {
      harta.setView(pin.getLatLng(), 13);
      pin.openPopup();
      elMare.scrollIntoView({ block: 'center' });
    }
  }

  const elMic = document.getElementById('harta-parohie');
  if (elMic) {
    const p = parohii.find((x) => x.slug === elMic.dataset.slug);
    if (p) {
      const harta = L.map(elMic, { scrollWheelZoom: false }).setView(p.coordonate, 13);
      straturi().addTo(harta);
      L.circleMarker(p.coordonate, stilActiv).addTo(harta).bindTooltip(p.eticheta);
    }
  }
})();
