(() => {
  const STORAGE_PREFIX = 'latinExperiment.lessonChecklist.';
  const page = document.querySelector('.lesson-page');
  if (!page) return;

  function storageKey(lessonNumber) {
    return `${STORAGE_PREFIX}${lessonNumber}`;
  }

  function currentLessonNumber() {
    const number = Number(page.dataset.lessonNumber);
    return Number.isInteger(number) && number > 0 ? number : null;
  }

  function restoreChecklist() {
    const lessonNumber = currentLessonNumber();
    if (!lessonNumber) return;

    const checkboxes = [...page.querySelectorAll('.reader-checklist input[type="checkbox"]')];
    if (!checkboxes.length) return;

    try {
      const saved = JSON.parse(localStorage.getItem(storageKey(lessonNumber)) || '[]');
      checkboxes.forEach((checkbox, index) => {
        checkbox.checked = saved[index] === true;
      });
    } catch (_) {
      // The checklist remains usable when browser storage is unavailable.
    }
  }

  function saveChecklist() {
    const lessonNumber = currentLessonNumber();
    if (!lessonNumber) return;

    const state = [...page.querySelectorAll('.reader-checklist input[type="checkbox"]')]
      .map(checkbox => checkbox.checked);

    try {
      localStorage.setItem(storageKey(lessonNumber), JSON.stringify(state));
    } catch (_) {
      // Do not interrupt the reader when browser storage is unavailable.
    }
  }

  page.addEventListener('change', event => {
    if (event.target.matches('.reader-checklist input[type="checkbox"]')) saveChecklist();
  });

  window.addEventListener('latin-lesson-rendered', restoreChecklist);
  restoreChecklist();
})();
