(() => {
  function addNotebookImage(lesson) {
    const notebook = document.querySelector('.lesson-page .notebook');
    if (!notebook) return;

    const lessonNumber = Number(lesson?.number);
    const images = lessonNumber === 1
      ? [
          {
            sources: [
              'assets/lesson-one-notebook-1.jpg?v=20260720-lesson1',
              'https://raw.githubusercontent.com/Wally189/the-catholic-experiment/main/assets/lesson-one-notebook-1.jpg?raw=1'
            ],
            alt: 'Open notebook showing handwritten Lesson I notes and highlighted Latin words',
            caption: 'Notebook spread — first observations and repeated forms'
          },
          {
            sources: [
              'assets/lesson-one-notebook-2.jpg?v=20260720-lesson1',
              'https://raw.githubusercontent.com/Wally189/the-catholic-experiment/main/assets/lesson-one-notebook-2.jpg?raw=1'
            ],
            alt: 'Handwritten Lesson I vocabulary list dated 20 July 2026',
            caption: 'Vocabulary list — words gathered during the lesson'
          }
        ]
      : lesson?.notebookImage
        ? [{
            sources: [lesson.notebookImage],
            alt: lesson.notebookAlt || `Handwritten notes for Lesson ${lesson.roman || lesson.number}`,
            caption: lesson.notebookCaption || lesson.notebookAlt || `Handwritten notes for Lesson ${lesson.roman || lesson.number}`
          }]
        : [];

    if (!images.length) return;

    notebook.replaceChildren();
    notebook.className = 'placeholder notebook has-notebook-image';

    const gallery = document.createElement('div');
    gallery.className = 'notebook-evidence-list';

    images.forEach(item => {
      const figure = document.createElement('figure');
      figure.className = 'notebook-evidence-card';

      const frame = document.createElement('div');
      frame.className = 'notebook-image-frame';

      const image = document.createElement('img');
      image.alt = item.alt;
      image.loading = 'eager';
      image.decoding = 'async';

      let sourceIndex = 0;
      image.src = item.sources[sourceIndex];
      image.addEventListener('error', () => {
        sourceIndex += 1;
        if (sourceIndex < item.sources.length) image.src = item.sources[sourceIndex];
      });

      const caption = document.createElement('figcaption');
      caption.textContent = item.caption;

      frame.appendChild(image);
      figure.append(frame, caption);
      gallery.appendChild(figure);
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
  queueMicrotask(() => applyMedia());

  const style = document.createElement('style');
  style.textContent = `
    .notebook.has-notebook-image{
      display:block!important;
      min-height:0!important;
      height:auto!important;
      padding:10px!important;
      overflow:visible!important;
      transform:none!important;
      background:#f7f0e5!important;
      font-family:system-ui,sans-serif!important;
    }
    .notebook-evidence-list{
      display:grid!important;
      grid-template-columns:1fr!important;
      gap:14px!important;
      width:100%!important;
      height:auto!important;
      min-height:0!important;
    }
    .notebook-evidence-card{
      display:block!important;
      width:100%!important;
      height:auto!important;
      min-height:0!important;
      margin:0!important;
      padding:0!important;
      overflow:hidden!important;
      border-radius:14px!important;
      background:#fffaf2!important;
    }
    .notebook-image-frame{
      display:block!important;
      width:100%!important;
      height:auto!important;
      min-height:0!important;
      margin:0!important;
      padding:0!important;
      overflow:hidden!important;
      background:#eee5d8!important;
    }
    .notebook-image-frame img{
      display:block!important;
      width:100%!important;
      max-width:100%!important;
      height:auto!important;
      min-height:0!important;
      max-height:none!important;
      margin:0!important;
      padding:0!important;
      object-fit:contain!important;
      object-position:center!important;
      background:transparent!important;
    }
    .notebook-evidence-card figcaption{
      display:block!important;
      margin:0!important;
      padding:11px 13px!important;
      color:#655a52!important;
      background:#fffaf2!important;
      font:14px/1.45 system-ui,sans-serif!important;
    }
    .audio-placeholder.has-audio{display:block;height:auto;padding:12px}
    .audio-placeholder.has-audio audio{display:block;width:100%}
  `;
  document.head.appendChild(style);
})();
