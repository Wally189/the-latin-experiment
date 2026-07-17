(() => {
  const detail = document.querySelector('[data-v="course"] .detail');
  const page = detail?.querySelector('.l1-page');
  const lower = page?.querySelector('.l1-lower');
  if (!page || !lower || page.querySelector('#lesson-one-journal')) return;

  const journal = document.createElement('section');
  journal.className = 'l1-section l1-journal';
  journal.id = 'lesson-one-journal';
  journal.innerHTML = `
    <article class="l1-card l1-author-journal">
      <span class="l1-eyebrow">Learning journal</span>
      <h3>What happened when I tried it?</h3>
      <div class="l1-placeholder">
        After completing Lesson I, Alan’s honest account will appear here: what felt natural, what caused difficulty, what changed after practice, and what he will do next. Errors and uncertainty remain part of the experiment rather than being polished away.
      </div>
    </article>
    <article class="l1-card l1-reader-journal">
      <span class="l1-eyebrow">Your private journal</span>
      <h3>Record what you noticed</h3>
      <label for="l1-reader-notes">Notes for Lesson I</label>
      <textarea id="l1-reader-notes" placeholder="What surprised you? Where did you hesitate? What will you practise next?"></textarea>
      <div class="l1-journal-meta">
        <span>Stored only in this browser.</span>
        <strong id="l1-notes-status" aria-live="polite">Ready</strong>
      </div>
    </article>`;

  lower.insertAdjacentElement('afterend', journal);

  const notes = journal.querySelector('#l1-reader-notes');
  const status = journal.querySelector('#l1-notes-status');
  const storageKey = 'latinExperiment.lesson1.notes';

  try {
    notes.value = localStorage.getItem(storageKey) || '';
  } catch (_) {
    status.textContent = 'Browser storage unavailable';
  }

  let saveTimer;
  notes.addEventListener('input', () => {
    clearTimeout(saveTimer);
    status.textContent = 'Saving…';
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, notes.value);
        status.textContent = 'Saved in this browser';
      } catch (_) {
        status.textContent = 'Could not save';
      }
    }, 250);
  });

  const notesAction = page.querySelector('.l1-quick button:last-child');
  if (notesAction) {
    notesAction.style.cursor = 'pointer';
    notesAction.addEventListener('click', () => {
      journal.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => notes.focus({ preventScroll: true }), 450);
    });
  }
})();
