(() => {
  const STORAGE_KEY = 'latinExperiment.completedLessons.v1';
  const LEGACY_SET_KEY = 'p';
  const LEGACY_LESSON_ONE_KEY = 'latin-experiment-lesson-1-complete';
  const MAX_LESSON = 81;

  function normalise(values) {
    return [...new Set((Array.isArray(values) ? values : [])
      .map(Number)
      .filter(number => Number.isInteger(number) && number >= 1 && number <= MAX_LESSON))]
      .sort((a, b) => a - b);
  }

  function readStored() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return normalise(parsed);
    } catch (error) {
      return [];
    }
  }

  function migrateLegacy(current) {
    const migrated = [...current];
    try {
      const legacySet = JSON.parse(localStorage.getItem(LEGACY_SET_KEY) || '[]');
      if (Array.isArray(legacySet)) {
        legacySet.forEach(value => {
          const match = /^l(\d+)$/i.exec(String(value));
          if (match) migrated.push(Number(match[1]));
        });
      }
      if (localStorage.getItem(LEGACY_LESSON_ONE_KEY) === 'yes') migrated.push(1);
    } catch (error) {
      // A damaged legacy value should not stop the current progress record working.
    }
    return normalise(migrated);
  }

  function write(values, announce = true) {
    const completed = normalise(values);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
      localStorage.setItem(LEGACY_LESSON_ONE_KEY, completed.includes(1) ? 'yes' : 'no');
    } catch (error) {
      // The interface can still update for this page even when storage is unavailable.
    }
    if (announce) {
      window.dispatchEvent(new CustomEvent('latin-progress-changed', {
        detail: {completed, count: completed.length}
      }));
    }
    return completed;
  }

  let initial = migrateLegacy(readStored());
  write(initial, false);

  window.LatinExperimentProgress = {
    key: STORAGE_KEY,
    getCompleted() {
      return readStored();
    },
    count() {
      return readStored().length;
    },
    isComplete(lesson) {
      return readStored().includes(Number(lesson));
    },
    setComplete(lesson, complete = true) {
      const number = Number(lesson);
      if (!Number.isInteger(number) || number < 1 || number > MAX_LESSON) return readStored();
      const completed = readStored();
      const next = complete
        ? [...completed, number]
        : completed.filter(item => item !== number);
      return write(next);
    },
    toggle(lesson) {
      const number = Number(lesson);
      return this.setComplete(number, !this.isComplete(number));
    }
  };

  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY || event.key === LEGACY_LESSON_ONE_KEY || event.key === LEGACY_SET_KEY) {
      const completed = migrateLegacy(readStored());
      window.dispatchEvent(new CustomEvent('latin-progress-changed', {
        detail: {completed, count: completed.length}
      }));
    }
  });
})();
