(() => {
  const formular = document.querySelector('.formular');
  if (!formular) return;

  const buton = formular.querySelector('button[type="submit"]');
  const stare = formular.querySelector('.formular__stare');
  const capcana = formular.querySelector('[name="_gotcha"]');
  const campuri = [...formular.querySelectorAll('input[required], textarea[required]')];
  const textButon = buton.textContent;

  const mesajPentru = (camp) => {
    const v = camp.validity;
    if (camp.type === 'checkbox' && v.valueMissing) return 'Bifați acordul ca să putem primi mesajul.';
    if (v.valueMissing) {
      if (camp.name === 'nume') return 'Scrieți-vă numele.';
      if (camp.name === 'email') return 'Scrieți adresa de email la care vă putem răspunde.';
      if (camp.name === 'mesaj') return 'Scrieți mesajul.';
      return 'Completați acest câmp.';
    }
    if (v.typeMismatch && camp.type === 'email') return 'Adresa de email nu este completă (exemplu: nume@exemplu.ro).';
    return '';
  };

  const arataEroare = (camp, text) => {
    const eroare = document.getElementById(`eroare-${camp.name}`);
    camp.setAttribute('aria-invalid', text ? 'true' : 'false');
    if (!eroare) return;
    eroare.textContent = text;
    eroare.hidden = !text;
  };

  const verifica = (camp) => {
    const text = mesajPentru(camp);
    arataEroare(camp, text);
    return !text;
  };

  const SUCCES = 'Mesajul a fost trimis. Vă mulțumim, vă răspundem cât mai curând.';

  const arataStare = (text, eroare = false) => {
    stare.textContent = text;
    stare.hidden = false;
    stare.classList.toggle('formular__stare--eroare', eroare);
  };

  const seTrimite = (activ) => {
    buton.disabled = activ;
    buton.textContent = activ ? 'Se trimite…' : textButon;
  };

  campuri.forEach((camp) => {
    const eveniment = camp.type === 'checkbox' ? 'change' : 'blur';
    camp.addEventListener(eveniment, () => verifica(camp));
    camp.addEventListener('input', () => {
      if (camp.getAttribute('aria-invalid') === 'true') verifica(camp);
    });
  });

  const MESAJE_FORMSPREE = {
    TYPE_EMAIL: 'Adresa de email nu este validă.',
    REQUIRED_FIELD_MISSING: 'Completați acest câmp.',
    REQUIRED_FIELD_EMPTY: 'Completați acest câmp.',
  };

  formular.addEventListener('submit', async (e) => {
    e.preventDefault();
    stare.hidden = true;

    const invalide = campuri.filter((camp) => !verifica(camp));
    if (invalide.length) {
      invalide[0].focus();
      return;
    }

    if (capcana && capcana.value) {
      formular.reset();
      arataStare(SUCCES);
      return;
    }

    if (/\/f\/XXXX$/.test(formular.action)) {
      arataStare('Formularul nu este încă activ. Vă rugăm să ne contactați telefonic.', true);
      return;
    }

    seTrimite(true);
    try {
      const raspuns = await fetch(formular.action, {
        method: 'POST',
        body: new FormData(formular),
        headers: { Accept: 'application/json' },
      });

      if (raspuns.ok) {
        formular.reset();
        campuri.forEach((camp) => arataEroare(camp, ''));
        arataStare(SUCCES);
        return;
      }

      const date = await raspuns.json().catch(() => ({}));
      const erori = Array.isArray(date.errors) ? date.errors : [];
      let peCamp = false;
      erori.forEach((err) => {
        const camp = campuri.find((c) => c.name === err.field);
        if (camp) {
          arataEroare(camp, MESAJE_FORMSPREE[err.code] || 'Verificați acest câmp.');
          peCamp = true;
        }
      });
      arataStare(
        peCamp
          ? 'Mesajul nu a fost trimis. Verificați câmpurile marcate.'
          : 'Mesajul nu a putut fi trimis. Încercați din nou peste câteva minute.',
        true
      );
    } catch {
      arataStare('Mesajul nu a putut fi trimis. Verificați conexiunea la internet și încercați din nou.', true);
    } finally {
      seTrimite(false);
    }
  });
})();
