(() => {
  const courseView = document.querySelector('[data-v="course"]');
  if (!courseView) return;

  const catalogue = courseView.querySelector('.catalog');
  const detail = courseView.querySelector('.detail');
  const listElement = courseView.querySelector('#list');
  const titleElement = courseView.querySelector('#ct');

  if (!catalogue || !detail || !listElement) return;

  detail.setAttribute('tabindex', '-1');

  const catalogueControls = document.createElement('div');
  catalogueControls.className = 'lesson-catalogue-controls';
  catalogueControls.setAttribute('aria-label', 'Lesson catalogue controls');
  catalogueControls.innerHTML = `
    <button type="button" class="lesson-catalogue-label" aria-expanded="true" aria-controls="list">
      Lessons
    </button>
    <button type="button" class="lesson-catalogue-action" aria-expanded="true" aria-controls="list">
      Hide lessons
    </button>
  `;
  courseView.insertBefore(catalogueControls, catalogue);

  const catalogueLabelButton = catalogueControls.querySelector('.lesson-catalogue-label');
  const catalogueActionButton = catalogueControls.querySelector('.lesson-catalogue-action');

  const actions = document.createElement('div');
  actions.className = 'lesson-focus-actions';
  actions.setAttribute('aria-label', 'Lesson controls');
  actions.innerHTML = `
    <button type="button" class="btn btn-secondary lesson-back-button">
      ← Back to course list
    </button>
    <button type="button" class="btn lesson-open-button">
      Open lesson
    </button>
    <button type="button" class="btn btn-complete lesson-complete-button">
      Mark complete & return
    </button>
  `;
  detail.prepend(actions);

  const openButton = actions.querySelector('.lesson-open-button');
  const backButton = actions.querySelector('.lesson-back-button');
  const completeButton = actions.querySelector('.lesson-complete-button');

  let catalogueScrollPosition = 0;

  function isMobile() {
    return window.matchMedia('(max-width: 800px)').matches;
  }

  function setCatalogueCollapsed(collapsed, moveToLesson = false) {
    courseView.classList.toggle('mobile-catalogue-collapsed', collapsed);
    catalogueLabelButton.setAttribute('aria-expanded', String(!collapsed));
    catalogueActionButton.setAttribute('aria-expanded', String(!collapsed));
    catalogueActionButton.textContent = collapsed ? 'Show lessons' : 'Hide lessons';

    if (collapsed && moveToLesson && isMobile()) {
      requestAnimationFrame(() => {
        detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  function toggleCatalogue() {
    const collapsed = courseView.classList.contains('mobile-catalogue-collapsed');
    setCatalogueCollapsed(!collapsed);
  }

  function updateControlLabels() {
    const current = typeof selected !== 'undefined' ? selected : null;
    const isExam = Boolean(current && current.e);
    openButton.textContent = isExam ? 'Open examination' : 'Open lesson';

    const isComplete = Boolean(
      current &&
      typeof P !== 'undefined' &&
      P.has(current.id)
    );

    completeButton.textContent = isComplete
      ? 'Completed — return to list'
      : 'Mark complete & return';
  }

  function openLesson() {
    catalogueScrollPosition = listElement.scrollTop;
    courseView.classList.add('lesson-focus');
    courseView.setAttribute('data-focus-mode', 'true');
    detail.scrollTop = 0;
    detail.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeLesson() {
    courseView.classList.remove('lesson-focus');
    courseView.removeAttribute('data-focus-mode');

    if (isMobile()) {
      setCatalogueCollapsed(false);
    }

    requestAnimationFrame(() => {
      listElement.scrollTop = catalogueScrollPosition;
      const selectedCard = listElement.querySelector('.lesson.sel');
      selectedCard?.focus({ preventScroll: true });
    });
  }

  function completeAndReturn() {
    const current = typeof selected !== 'undefined' ? selected : null;
    if (current && typeof P !== 'undefined') {
      P.add(current.id);
      localStorage.p = JSON.stringify([...P]);
      if (typeof render === 'function') render();
      if (typeof badges === 'function') badges();
    }
    updateControlLabels();
    closeLesson();
  }

  catalogueLabelButton.addEventListener('click', toggleCatalogue);
  catalogueActionButton.addEventListener('click', toggleCatalogue);
  openButton.addEventListener('click', openLesson);
  backButton.addEventListener('click', closeLesson);
  completeButton.addEventListener('click', completeAndReturn);

  listElement.addEventListener('click', (event) => {
    if (event.target.closest('.tick')) {
      requestAnimationFrame(updateControlLabels);
      return;
    }

    if (event.target.closest('.lesson')) {
      requestAnimationFrame(() => {
        detail.scrollTop = 0;
        updateControlLabels();

        if (isMobile()) {
          setCatalogueCollapsed(true, true);
        }
      });
    }
  });

  if (titleElement) {
    const titleObserver = new MutationObserver(updateControlLabels);
    titleObserver.observe(titleElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  window.addEventListener('resize', () => {
    if (!isMobile()) {
      setCatalogueCollapsed(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && courseView.classList.contains('lesson-focus')) {
      closeLesson();
    }
  });

  updateControlLabels();
})();
