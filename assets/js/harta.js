(() => {
  if (!window.L) return;

  const BEIUS = [46.6667, 22.35];

  const pin = {
    radius: 7,
    color: '#7A1E2C',
    weight: 2,
    fillColor: '#B8913A',
    fillOpacity: 1,
  };

  const straturi = () =>
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

  const elTeaser = document.getElementById('harta-teaser');
  if (elTeaser) {
    const harta = L.map(elTeaser, {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
    });
    const peMobil = window.matchMedia('(max-width: 640px)').matches;
    harta.setView(peMobil ? BEIUS : [46.66, 22.2], 11);
    straturi().addTo(harta);
    L.circleMarker(BEIUS, pin).addTo(harta).bindTooltip('Beiuș', { direction: 'top' });
  }

  const elContact = document.getElementById('harta-contact');
  if (elContact) {
    const harta = L.map(elContact, { scrollWheelZoom: false }).setView(BEIUS, 15);
    straturi().addTo(harta);
    L.circleMarker(BEIUS, pin).addTo(harta).bindTooltip('Protopopiatul Greco-Catolic Beiuș');
  }
})();
