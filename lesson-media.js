(() => {
  function addNotebookImage(lesson) {
    const notebook = document.querySelector('.lesson-page .notebook');
    if (!notebook || !lesson?.notebookImage) return;

    notebook.innerHTML = '';
    notebook.classList.add('has-notebook-image');

    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const caption = document.createElement('figcaption');

    image.src = lesson.notebookImage;
    image.alt = lesson.notebookAlt || `Handwritten notes for Lesson ${lesson.roman || lesson.number}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    caption.textContent = lesson.notebookCaption || image.alt;

    figure.append(image, caption);
    notebook.appendChild(figure);
  }

  function addAudio(lesson) {
    const grids = document.querySelectorAll('#lesson-readings .reading-grid');
    const beforeCards = grids[0]?.querySelectorAll('.reading-card') || [];
    const afterCards = grids[1]?.querySelectorAll('.reading-card') || [];

    (lesson?.readings || []).forEach((reading, index) => {
      [
        {card: beforeCards[index], source: reading.beforeAudio, label: `First reading of ${reading.title}`},
        {card: afterCards[index], source: reading.afterAudio, label: `Second reading of ${reading.title}`}
      ].forEach(item => {
        if (!item.card || !item.source) return;
        const slot = item.card.querySelector('.audio-placeholder');
        if (!slot) return;
        slot.innerHTML = '';
        slot.classList.add('has-audio');
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.preload = 'metadata';
        audio.src = item.source;
        audio.setAttribute('aria-label', item.label);
        slot.appendChild(audio);
      });
    });
  }

  function applyMedia(event) {
    const lesson = event?.detail?.lesson || window.LatinLessonTemplate?.currentLesson;
    if (!lesson) return;
    addNotebookImage(lesson);
    addAudio(lesson);
  }

  window.addEventListener('latin-lesson-rendered', applyMedia);

  const style = document.createElement('style');
  style.textContent = `
    .notebook.has-notebook-image{padding:0;background:#f7f0e5}.notebook.has-notebook-image figure{margin:0}.notebook.has-notebook-image img{display:block;width:100%;height:auto;max-height:720px;object-fit:contain;border-radius:14px 14px 0 0;background:#eee5d8}.notebook.has-notebook-image figcaption{padding:12px 14px;color:#655a52;font:13px/1.5 system-ui,sans-serif}
    .audio-placeholder.has-audio{display:block;height:auto;padding:12px}.audio-placeholder.has-audio audio{display:block;width:100%}
  `;
  document.head.appendChild(style);
})();
