(() => {
  const coloane = document.getElementById('program-coloane');
  if (!coloane) return;

  const cler = document.getElementById('program-cler');
  const special = document.getElementById('program-special');
  const nota = document.getElementById('program-nota');

  const el = (tag, clasa, text) => {
    const e = document.createElement(tag);
    if (clasa) e.className = clasa;
    if (text != null) e.textContent = text;
    return e;
  };

  const doiDigiti = (n) => String(n).padStart(2, '0');
  const acum = new Date();
  const azi = `${acum.getFullYear()}-${doiDigiti(acum.getMonth() + 1)}-${doiDigiti(acum.getDate())}`;

  const dataLunga = new Intl.DateTimeFormat('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' });
  const formateazaData = (text) => {
    const [an, luna, zi] = text.split('-').map(Number);
    const rezultat = dataLunga.format(new Date(an, luna - 1, zi));
    return rezultat.charAt(0).toUpperCase() + rezultat.slice(1);
  };

  const listaSlujbe = (slujbe) => {
    const ul = el('ul', 'program__lista');
    slujbe.forEach((s) => {
      const li = el('li');
      li.append(el('time', null, s.ora), el('span', null, s.slujba));
      ul.append(li);
    });
    return ul;
  };

  const coloana = (c) => {
    const div = el('div');
    div.append(el('h3', null, c.titlu));
    c.grupuri.forEach((g) => {
      if (g.zile) div.append(el('p', 'program__zi', g.zile));
      div.append(listaSlujbe(g.slujbe));
    });
    return div;
  };

  const programSpecial = (s) => {
    const caseta = el('aside', 'program-special');
    caseta.append(el('h3', null, s.titlu));
    const ul = el('ul', 'program-special__lista');
    s.slujbe.forEach((x) => {
      const li = el('li');
      li.append(
        el('span', 'program-special__data', formateazaData(x.data)),
        el('time', null, x.ora),
        el('span', null, x.slujba)
      );
      ul.append(li);
    });
    caseta.append(ul);
    return caseta;
  };

  fetch('data/program.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
    .then((date) => {
      coloane.replaceChildren(...date.coloane.map(coloana));
      cler.replaceChildren(
        ...(date.cler || []).map((p) => {
          const par = el('p');
          par.append(el('span', 'cler__rol', p.rol), document.createTextNode(p.nume));
          return par;
        })
      );
      nota.hidden = !date.test;
      const active = (date.special || []).filter((s) => s.afisareDeLa <= azi && azi <= s.afisarePanaLa);
      special.replaceChildren(...active.map(programSpecial));
    })
    .catch(() => {
      coloane.replaceChildren(
        el('p', 'program__stare', 'Programul nu a putut fi încărcat. Vă rugăm să ne contactați telefonic.')
      );
    });
})();
