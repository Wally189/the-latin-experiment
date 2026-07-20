(() => {
  const timeline = document.getElementById('journalEntries');
  const heading = document.querySelector('.journal-head');
  if (!timeline || !heading) return;

  const controls = document.createElement('div');
  controls.className = 'journal-order';
  controls.setAttribute('aria-label', 'Journal entry order');
  controls.innerHTML = `
    <span>Browse the journal</span>
    <button type="button" data-order="newest" class="active">Newest first</button>
    <button type="button" data-order="oldest">Read from the beginning</button>`;
  heading.insertAdjacentElement('afterend', controls);

  function reorder(direction) {
    const entries = [...timeline.querySelectorAll('.entry')];
    entries.sort((a, b) => {
      const aLesson = Number(a.id.replace(/\D/g, '')) || 0;
      const bLesson = Number(b.id.replace(/\D/g, '')) || 0;
      return direction === 'oldest' ? aLesson - bLesson : bLesson - aLesson;
    });
    entries.forEach(entry => timeline.appendChild(entry));
    controls.querySelectorAll('button').forEach(button => {
      const active = button.dataset.order === direction;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  controls.addEventListener('click', event => {
    const button = event.target.closest('button[data-order]');
    if (button) reorder(button.dataset.order);
  });

  const observer = new MutationObserver(() => {
    if (timeline.querySelector('.entry')) {
      reorder('newest');
      observer.disconnect();
    }
  });
  observer.observe(timeline, { childList: true });
})();
