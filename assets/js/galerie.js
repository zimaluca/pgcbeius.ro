(() => {
  const linkuri = [...document.querySelectorAll('[data-galerie]')];
  if (!linkuri.length) return;

  const icon = (d) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;

  const dialog = document.createElement('dialog');
  dialog.className = 'vizualizator';
  dialog.setAttribute('aria-label', 'Galerie foto');
  dialog.innerHTML = `
    <figure class="vizualizator__figura">
      <img class="vizualizator__imagine" alt="">
      <figcaption class="vizualizator__descriere"></figcaption>
    </figure>
    <p class="vizualizator__numar" aria-live="polite"></p>
    <button class="vizualizator__buton vizualizator__inchide" type="button" aria-label="Închide galeria">${icon('M6 6l12 12M18 6L6 18')}</button>
    <button class="vizualizator__buton vizualizator__inapoi" type="button" aria-label="Fotografia anterioară">${icon('M15 5l-6 7 6 7')}</button>
    <button class="vizualizator__buton vizualizator__inainte" type="button" aria-label="Fotografia următoare">${icon('M9 5l6 7-6 7')}</button>
  `;
  document.body.append(dialog);

  const imagine = dialog.querySelector('.vizualizator__imagine');
  const descriere = dialog.querySelector('.vizualizator__descriere');
  const numar = dialog.querySelector('.vizualizator__numar');
  const inapoi = dialog.querySelector('.vizualizator__inapoi');
  const inainte = dialog.querySelector('.vizualizator__inainte');
  const total = linkuri.length;
  imagine.draggable = false;
  let curent = 0;

  inapoi.hidden = inainte.hidden = total < 2;

  const arata = (index) => {
    curent = (index + total) % total;
    const link = linkuri[curent];
    const text = link.querySelector('img').alt;
    imagine.src = link.href;
    imagine.alt = text;
    descriere.textContent = text;
    descriere.hidden = !text;
    numar.textContent = `${curent + 1} / ${total}`;
  };

  const deschide = (index) => {
    arata(index);
    document.documentElement.classList.add('fara-scroll');
    dialog.showModal();
  };

  linkuri.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      deschide(index);
    });
  });

  dialog.querySelector('.vizualizator__inchide').addEventListener('click', () => dialog.close());
  inapoi.addEventListener('click', () => arata(curent - 1));
  inainte.addEventListener('click', () => arata(curent + 1));

  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('fara-scroll');
  });

  let glisat = false;

  dialog.addEventListener('click', (e) => {
    if (glisat) {
      glisat = false;
      return;
    }
    if (e.target === dialog || e.target.classList.contains('vizualizator__figura')) dialog.close();
  });

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') arata(curent - 1);
    if (e.key === 'ArrowRight') arata(curent + 1);
  });

  let rotita = 0;
  let ultimaSchimbare = 0;
  dialog.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (total < 2) return;
    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    const acum = performance.now();
    if (acum - ultimaSchimbare < 350) return;
    rotita += delta;
    if (Math.abs(rotita) >= 40) {
      arata(curent + (rotita > 0 ? 1 : -1));
      rotita = 0;
      ultimaSchimbare = acum;
    }
  }, { passive: false });

  let startX = null;
  dialog.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    glisat = false;
  });
  dialog.addEventListener('pointerup', (e) => {
    if (startX === null || total < 2) return;
    const diferenta = e.clientX - startX;
    startX = null;
    if (Math.abs(diferenta) > 50) {
      glisat = true;
      arata(curent + (diferenta < 0 ? 1 : -1));
    }
  });
})();
