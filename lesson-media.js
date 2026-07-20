(() => {
  function addNotebookImage(lesson) {
    const notebook = document.querySelector('.lesson-page .notebook');
    if (!notebook) return;

    const lessonNumber = Number(lesson?.number);
    const images = lessonNumber === 1
      ? [
          {
            src: 'assets/lesson-one-notebook-1.jpg?v=20260720-final',
            fallback: 'assets/lesson-one-notebook-spread-v3.jpg?v=20260720-final',
            alt: 'Open notebook showing handwritten Lesson I notes and highlighted Latin words',
            caption: 'Notebook spread — first observations and repeated forms',
            crop: true
          },
          {
            src: 'assets/lesson-one-notebook-2.jpg?v=20260720-final',
            fallback: 'assets/lesson-one-vocabulary-v3.jpg?v=20260720-final',
            alt: 'Handwritten Lesson I vocabulary list dated 20 July 2026',
            caption: 'Vocabulary list — words gathered during the lesson'
          }
        ]
      : lesson?.notebookImage
        ? [{
            src: lesson.notebookImage,
            alt: lesson.notebookAlt || `Handwritten notes for Lesson ${lesson.roman || lesson.number}`,
            caption: lesson.notebookCaption || lesson.notebookAlt || `Handwritten notes for Lesson ${lesson.roman || lesson.number}`
          }]
        : [];

    if (!images.length) return;

    notebook.innerHTML = '';
    notebook.classList.add('has-notebook-image');

    const gallery = document.createElement('div');
    gallery.className = 'notebook-gallery';

    images.forEach(item => {
      const card = document.createElement('div');
      card.className = 'notebook-photo-card';
      const image = document.createElement('img');
      const caption = document.createElement('div');
      caption.className = 'notebook-photo-caption';

      image.src = item.src;
      image.alt = item.alt;
      image.loading = 'eager';
      image.decoding = 'async';
      if (item.crop) image.classList.add('crop-ashtray');
      if (item.fallback) {
        image.addEventListener('error', () => {
          if (image.src.includes(item.fallback)) return;
          image.src = item.fallback;
        });
      }
      caption.textContent = item.caption;

      card.append(image, caption);
      gallery.appendChild(card);
    });

    notebook.appendChild(gallery);
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
    .notebook.has-notebook-image{display:block!important;padding:10px!important;background:#f7f0e5!important;min-height:0!important;height:auto!important;transform:none!important;font-family:system-ui,sans-serif!important}
    .notebook-gallery{display:flex!important;flex-direction:column!important;gap:12px!important;width:100%!important;height:auto!important;min-height:0!important}
    .notebook-photo-card{display:block!important;width:100%!important;height:auto!important;min-height:0!important;margin:0!important;padding:0!important;overflow:hidden!important;border-radius:14px!important;background:#fffaf2!important}
    .notebook-photo-card img{display:block!important;width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;margin:0!important;padding:0!important;object-fit:contain!important;background:transparent!important}
    .notebook-photo-card img.crop-ashtray{width:112%!important;max-width:none!important;clip-path:inset(0 11% 0 0)!important}
    .notebook-photo-caption{display:block!important;margin:0!important;padding:10px 12px!important;color:#655a52!important;background:#fffaf2!important;font:13px/1.45 system-ui,sans-serif!important}
    .audio-placeholder.has-audio{display:block;height:auto;padding:12px}.audio-placeholder.has-audio audio{display:block;width:100%}
  `;
  document.head.appendChild(style);
})();