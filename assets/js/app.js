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
    document.querySelectorAll('[data-es-svg][data-en-svg]').forEach(el => {
      el.textContent = el.dataset[currentLang + 'Svg'];
    });
    const selectedCompetency = document.querySelector('.competency-card.is-selected');
    if (selectedCompetency) updateCompetencyFocus(selectedCompetency);
    langButtons.forEach(button => button.classList.toggle('is-active', button.dataset.lang === currentLang));
    if (cvLink) {
      cvLink.href = currentLang === 'es' ? 'assets/docs/Jamie-Valset-CV-ES.pdf' : 'assets/docs/Jamie-Valset-CV-EN.pdf';
    }
    document.title = currentLang === 'es'
      ? 'Jamie Bjørn Valset Nuñez | Portafolio profesional'
      : 'Jamie Bjørn Valset Nuñez | Professional portfolio';
    setTimeout(() => document.body.classList.remove('is-switching'), 130);
  }


  const dashboard = document.querySelector('[data-dashboard]');
  const competencyCards = [...document.querySelectorAll('.competency-card')];
  const dashboardFilters = [...document.querySelectorAll('.dashboard-filter')];
  const dashboardViewToggle = document.querySelector('[data-view-toggle]');

  function updateCompetencyFocus(card) {
    if (!card) return;
    competencyCards.forEach(item => item.classList.toggle('is-selected', item === card));
    const title = document.querySelector('[data-focus-title]');
    const description = document.querySelector('[data-focus-description]');
    const application = document.querySelector('[data-focus-application]');
    const score = document.querySelector('[data-focus-score]');
    if (title) title.textContent = card.dataset[`title${currentLang === 'en' ? 'En' : 'Es'}`];
    if (description) description.textContent = card.dataset[`description${currentLang === 'en' ? 'En' : 'Es'}`];
    if (application) application.textContent = card.dataset[`application${currentLang === 'en' ? 'En' : 'Es'}`];
    if (score) score.textContent = card.dataset.score;
  }

  competencyCards.forEach(card => card.addEventListener('click', () => updateCompetencyFocus(card)));
  dashboardFilters.forEach(filter => filter.addEventListener('click', () => {
    const category = filter.dataset.filter;
    dashboardFilters.forEach(item => item.classList.toggle('is-active', item === filter));
    competencyCards.forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
    const firstVisible = competencyCards.find(card => !card.hidden);
    if (firstVisible) updateCompetencyFocus(firstVisible);
  }));
  dashboardViewToggle?.addEventListener('click', () => {
    const detailed = dashboard?.classList.toggle('is-detailed') || false;
    dashboardViewToggle.setAttribute('aria-pressed', String(detailed));
    dashboardViewToggle.textContent = currentLang === 'es'
      ? (detailed ? 'Vista resumida' : 'Vista detallada')
      : (detailed ? 'Summary view' : 'Detailed view');
  });

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

/* CV Design Portfolio lightbox */
(() => {
  const lightbox = document.querySelector('[data-cv-lightbox]');
  if (!lightbox) return;
  const image = lightbox.querySelector('[data-cv-lightbox-image]');
  const title = lightbox.querySelector('[data-cv-lightbox-title]');
  const pdfLink = lightbox.querySelector('.cv-lightbox-pdf');
  const options = [...lightbox.querySelectorAll('[data-cv-version]')];
  const closeButtons = [...lightbox.querySelectorAll('[data-cv-close]')];
  let activeCase = null;
  let activeKind = 'visual';
  let lastFocus = null;

  function renderVersion(kind) {
    if (!activeCase) return;
    activeKind = kind === 'ats' ? 'ats' : 'visual';
    const prefix = activeKind === 'ats' ? 'ats' : 'visual';
    image.src = activeCase.dataset[`${prefix}Image`];
    image.alt = `${activeCase.dataset.caseName} ${activeKind.toUpperCase()} CV preview`;
    pdfLink.href = activeCase.dataset[`${prefix}Pdf`];
    options.forEach(btn => btn.classList.toggle('is-active', btn.dataset.cvVersion === activeKind));
  }

  function openPreview(trigger) {
    activeCase = trigger.closest('.cv-accordion');
    if (!activeCase) return;
    lastFocus = trigger;
    title.textContent = activeCase.dataset.caseName;
    renderVersion(trigger.dataset.kind || 'visual');
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden','false');
    document.body.classList.add('cv-lightbox-open');
    requestAnimationFrame(() => lightbox.querySelector('.cv-lightbox-close')?.focus());
  }

  function closePreview() {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden','true');
    document.body.classList.remove('cv-lightbox-open');
    image.src = '';
    lastFocus?.focus();
  }

  document.querySelectorAll('.cv-preview-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => openPreview(trigger));
  });
  options.forEach(option => option.addEventListener('click', () => renderVersion(option.dataset.cvVersion)));
  closeButtons.forEach(btn => btn.addEventListener('click', closePreview));
  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closePreview();
  });
})();


/* Project portfolio: let visitors choose what to open first. */
(() => {
  const categories = [...document.querySelectorAll('.portfolio-category-list > .portfolio-category')];
  categories.forEach(category => {
    category.removeAttribute('open');
    category.addEventListener('toggle', () => {
      if (!category.open) return;
      categories.forEach(other => {
        if (other !== category) other.open = false;
      });
    });
  });
})();
