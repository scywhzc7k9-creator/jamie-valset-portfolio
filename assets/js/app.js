(() => {
  const panels = [...document.querySelectorAll('[data-panel]')];
  const tabButtons = [...document.querySelectorAll('.tab-button')];
  const tabLinks = [...document.querySelectorAll('.tab-link')];
  const langButtons = [...document.querySelectorAll('.lang-button')];
  const nav = document.querySelector('.primary-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const cvLink = document.querySelector('.cv-link');
  let currentLang = localStorage.getItem('portfolio-language') || 'es';

  function activateTab(id, updateHash = true) {
    if (!panels.some(panel => panel.id === id)) id = 'inicio';
    panels.forEach(panel => {
      const active = panel.id === id;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
    tabButtons.forEach(button => button.classList.toggle('is-active', button.dataset.tab === id));
    if (updateHash) history.replaceState(null, '', `#${id}`);
    nav?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'es';
    document.documentElement.lang = currentLang;
    localStorage.setItem('portfolio-language', currentLang);
    document.body.classList.add('is-switching');
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
      el.textContent = el.dataset[currentLang];
    });
    langButtons.forEach(button => button.classList.toggle('is-active', button.dataset.lang === currentLang));
    if (cvLink) {
      cvLink.href = currentLang === 'es' ? 'assets/docs/Jamie-Valset-CV-ES.pdf' : 'assets/docs/Jamie-Valset-CV-EN.pdf';
    }
    document.title = currentLang === 'es'
      ? 'Jamie Bjørn Valset Nuñez | Portafolio profesional'
      : 'Jamie Bjørn Valset Nuñez | Professional portfolio';
    setTimeout(() => document.body.classList.remove('is-switching'), 130);
  }

  tabButtons.forEach(button => button.addEventListener('click', () => activateTab(button.dataset.tab)));
  tabLinks.forEach(button => button.addEventListener('click', () => activateTab(button.dataset.tab)));
  langButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  menuToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  document.getElementById('year').textContent = new Date().getFullYear();
  setLanguage(currentLang);
  activateTab(location.hash.replace('#', '') || 'inicio', false);
})();
