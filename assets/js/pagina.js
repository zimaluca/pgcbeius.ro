(() => {
  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero');
  const comutator = document.querySelector('.nav__comutator');
  const meniu = document.getElementById('meniu');

  if (hero) {
    const actualizeazaNav = () => {
      nav.classList.toggle('nav--solid', window.scrollY > hero.offsetHeight - nav.offsetHeight);
    };
    actualizeazaNav();
    window.addEventListener('scroll', actualizeazaNav, { passive: true });
    window.addEventListener('resize', actualizeazaNav);
  } else {
    nav.classList.add('nav--solid');
  }

  const seteazaMeniu = (deschis) => {
    nav.classList.toggle('nav--deschis', deschis);
    comutator.setAttribute('aria-expanded', String(deschis));
    comutator.setAttribute('aria-label', deschis ? 'Închide meniul' : 'Deschide meniul');
  };

  comutator.addEventListener('click', () => {
    seteazaMeniu(!nav.classList.contains('nav--deschis'));
  });
  meniu.addEventListener('click', (e) => {
    if (e.target.closest('a')) seteazaMeniu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') seteazaMeniu(false);
  });

  document.querySelectorAll('[data-an]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
