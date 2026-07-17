(() => {
  const courseView = document.querySelector('[data-v="course"]');
  if (!courseView) return;

  const catalogue = courseView.querySelector('.catalog');
  const detail = courseView.querySelector('.detail');
  const listElement = courseView.querySelector('#list');
  const titleElement = courseView.querySelector('#ct');

  if (!catalogue || !detail || !listElement) return;

  detail.setAttribute('tabindex', '-1');

  const catalogueToggle = document.createElement('button');
  catalogueToggle.type = 'button';
  catalogueToggle.className = 'lesson-catalogue-toggle';
  catalogueToggle.setAttribute('aria-expanded', 'true');
  catalogueToggle.setAttribute('aria-controls', 'list');
  catalogueToggle.innerHTML = '<span>Lessons</span><span class="catalogue-state">Hide lessons</span>';
  courseView.insertBefore(catalogueToggle, catalogue);

  const catalogueState = catalogueToggle.querySelector('.catalogue-state');

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
    catalogueToggle.setAttribute('aria-expanded', String(!collapsed));
    catalogueState.textContent = collapsed ? 'Show lessons' : 'Hide lessons';

    if (collapsed && moveToLesson && isMobile()) {
      requestAnimationFrame(() => {
        detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
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

  catalogueToggle.addEventListener('click', () => {
    const collapsed = courseView.classList.contains('mobile-catalogue-collapsed');
    setCatalogueCollapsed(!collapsed);
  });

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
