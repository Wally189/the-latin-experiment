(() => {
  function addNotebookImage(lesson) {
    const notebook = document.querySelector('.lesson-page .notebook');
    if (!notebook) return;

    const lessonNumber = Number(lesson?.number);
    const images = lessonNumber === 1
      ? [
          {
            src: 'assets/lesson-one-notebook-1.jpg',
            alt: 'Open notebook showing handwritten Lesson I notes and highlighted Latin words',
            caption: 'Notebook spread — first observations and repeated forms',
            crop: true
          },
          {
            src: 'assets/lesson-one-notebook-2.jpg',
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
      const figure = document.createElement('figure');
      const image = document.createElement('img');
      const caption = document.createElement('figcaption');

      image.src = item.src;
      image.alt = item.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      if (item.crop) image.classList.add('crop-ashtray');
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

  const style = document.createElement('style');
  style.textContent = `
    .notebook.has-notebook-image{padding:12px;background:#f7f0e5}
    .notebook-gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
    .notebook-gallery figure{margin:0;overflow:hidden;border-radius:14px;background:#eee5d8}
    .notebook-gallery img{display:block;width:100%;height:430px;object-fit:cover;background:#eee5d8}
    .notebook-gallery img.crop-ashtray{object-position:left bottom}
    .notebook-gallery figcaption{padding:10px 12px;color:#655a52;font:13px/1.45 system-ui,sans-serif;background:#fffaf2}
    .audio-placeholder.has-audio{display:block;height:auto;padding:12px}.audio-placeholder.has-audio audio{display:block;width:100%}
    @media(max-width:720px){.notebook-gallery{grid-template-columns:1fr}.notebook-gallery img{height:auto;max-height:620px;object-fit:contain}.notebook-gallery img.crop-ashtray{height:500px;object-fit:cover;object-position:left bottom}}
  `;
  document.head.appendChild(style);
})();