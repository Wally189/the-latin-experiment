(() => {
  function addNotebookImage(lesson) {
    const notebook = document.querySelector('.lesson-page .notebook');
    if (!notebook) return;

    const lessonNumber = Number(lesson?.number);
    const images = lessonNumber === 1
      ? [
          {
            src: 'assets/lesson-one-notebook-spread-v3.jpg?v=20260720-resolved',
            alt: 'Open notebook showing handwritten Lesson I notes and highlighted Latin words',
            caption: 'Notebook spread — first observations and repeated forms'
          },
          {
            src: 'assets/lesson-one-vocabulary-v3.jpg?v=20260720-resolved',
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

    notebook.replaceChildren();
    notebook.className = 'placeholder notebook has-notebook-image';

    const gallery = document.createElement('div');
    gallery.className = 'notebook-evidence-list';

    images.forEach(item => {
      const figure = document.createElement('figure');
      figure.className = 'notebook-evidence-card';

      const image = document.createElement('img');
      image.src = item.src;
      image.alt = item.alt;
      image.loading = 'eager';
      image.decoding = 'async';

      const caption = document.createElement('figcaption');
      caption.textContent = item.caption;

      figure.append(image, caption);
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
    .notebook-evidence-card img{
      display:block!important;
      width:100%!important;
      max-width:100%!important;
      height:auto!important;
      min-height:0!important;
      max-height:none!important;
      margin:0!important;
      padding:0!important;
      aspect-ratio:auto!important;
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
