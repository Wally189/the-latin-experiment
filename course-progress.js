(() => {
  const progress = window.LatinExperimentProgress;
  if (!progress) return;

  function lessonNumber(row) {
    const label = row.querySelector('strong')?.textContent || '';
    const match = /Lesson\s+(\d+)/i.exec(label);
    return match ? Number(match[1]) : null;
  }

  function addLessonChecks() {
    document.querySelectorAll('.lesson-link').forEach(row => {
      const number = lessonNumber(row);
      if (!number) return;
      row.dataset.lessonNumber = String(number);
      if (row.classList.contains('locked')) return;
      if (row.querySelector('.lesson-progress-check')) return;

      const check = document.createElement('span');
      check.className = 'lesson-progress-check';
      check.setAttribute('role', 'checkbox');
      check.setAttribute('tabindex', '0');
      check.setAttribute('aria-label', `Mark Lesson ${number} complete`);
      check.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        progress.toggle(number);
      });
      check.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.stopPropagation();
          progress.toggle(number);
        }
      });
      row.appendChild(check);
    });
  }

  function replaceCompleteButton() {
    const original = document.getElementById('completeButton');
    if (!original || original.dataset.sharedProgress === 'true') return;
    const clean = original.cloneNode(true);
    clean.dataset.sharedProgress = 'true';
    original.replaceWith(clean);
    clean.addEventListener('click', () => progress.toggle(1));
  }

  function sync() {
    addLessonChecks();
    replaceCompleteButton();
    const completed = progress.getCompleted();
    const count = completed.length;
    const percentage = Math.round((count / 81) * 100);

    document.querySelectorAll('.lesson-link[data-lesson-number]').forEach(row => {
      const number = Number(row.dataset.lessonNumber);
      const done = completed.includes(number);
      row.classList.toggle('reader-complete', done);
      const check = row.querySelector('.lesson-progress-check');
      if (check) {
        check.classList.toggle('checked', done);
        check.setAttribute('aria-checked', String(done));
        check.setAttribute('aria-label', done ? `Mark Lesson ${number} incomplete` : `Mark Lesson ${number} complete`);
        check.textContent = done ? '✓' : '';
      }
    });

    const completeButton = document.getElementById('completeButton');
    if (completeButton) {
      const done = completed.includes(1);
      completeButton.classList.toggle('done', done);
      completeButton.textContent = done ? 'Lesson I completed ✓' : 'Mark Lesson I complete';
      completeButton.setAttribute('aria-pressed', String(done));
    }

    const chip = document.querySelector('.progress-chip');
    if (chip) {
      chip.textContent = count
        ? `My progress · ${count} of 81 complete`
        : 'My progress · 0 of 81';
    }

    document.querySelectorAll('.course-rail .progress-track span').forEach(track => {
      track.style.width = `${Math.max(percentage, count ? 1.25 : 0)}%`;
    });
  }

  const style = document.createElement('style');
  style.textContent = `
    .lesson-link:not(.locked){grid-template-columns:34px minmax(0,1fr) 30px}
    .lesson-progress-check{display:grid;place-items:center;align-self:center;width:27px;height:27px;border:2px solid #bdb4ad;border-radius:50%;background:#fff;color:#fff;font-size:16px;font-weight:900;transition:.18s ease;box-shadow:0 2px 5px rgba(29,8,6,.06)}
    .lesson-progress-check:hover,.lesson-progress-check:focus-visible{border-color:var(--green);outline:3px solid rgba(46,112,81,.18);outline-offset:2px}
    .lesson-progress-check.checked{border-color:var(--green);background:var(--green);color:#fff}
    .lesson-link.reader-complete{border-color:#bad6c6;background:#f1faf4}
    .lesson-link.reader-complete.active{border-color:#9fc8af;background:linear-gradient(135deg,#f1faf4,#fff8e7)}
    .lesson-link.reader-complete .icon{background:var(--green)}
    .lesson-link.reader-complete small:after{content:" · completed";color:var(--green);font-weight:800}
    .complete-button.done{background:var(--green)!important;color:#fff!important}
    @media(max-width:1050px){.lesson-link:not(.locked){grid-template-columns:58px minmax(0,1fr) 36px}.lesson-progress-check{width:32px;height:32px}}
  `;
  document.head.appendChild(style);

  sync();
  window.addEventListener('latin-progress-changed', sync);
})();
