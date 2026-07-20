(() => {
  const lessonOneImages = [
    {
      sources: [
        'assets/lesson-one-notebook-1.jpg?v=20260720-notebook-rebuild',
        'assets/lesson-one-notebook-spread-v3.jpg?v=20260720-notebook-rebuild'
      ],
      alt: 'Open notebook showing handwritten Lesson I notes and highlighted Latin words',
      caption: 'Notebook spread — first observations and repeated forms'
    },
    {
      sources: [
        'assets/lesson-one-notebook-2.jpg?v=20260720-notebook-rebuild',
        'assets/lesson-one-vocabulary-v3.jpg?v=20260720-notebook-rebuild'
      ],
      alt: 'Handwritten Lesson I vocabulary list dated 20 July 2026',
      caption: 'Vocabulary list — words gathered during the lesson'
    }
  ];

  function makeImage(item) {
    const block = document.createElement('div');
    block.className = 'lesson-notebook-photo';

    const image = document.createElement('img');
    image.alt = item.alt;
    image.loading = 'eager';
    image.decoding = 'async';

    let sourceIndex = 0;
    const trySource = () => {
      image.src = item.sources[sourceIndex];
    };
    image.addEventListener('error', () => {
      sourceIndex += 1;
      if (sourceIndex < item.sources.length) {
        trySource();
        return;
      }
      block.classList.add('image-failed');
      image.remove();
      const error = document.createElement('p');
      error.className = 'lesson-notebook-error';
      error.textContent = 'This notebook photograph could not be loaded.';
      block.prepend(error);
    });
    trySource();

    const caption = document.createElement('p');
    caption.className = 'lesson-notebook-caption';
    caption.textContent = item.caption;

    block.append(image, caption);
    return block;
  }

  function rebuildNotebook(lesson) {
    if (Number(lesson?.number) !== 1) return;

    const reflection = document.getElementById('lesson-reflection');
    if (!reflection) return;

    const cards = reflection.querySelectorAll(':scope > .content-card');
    const notebookCard = cards[1];
    if (!notebookCard) return;

    notebookCard.className = 'content-card lesson-notebook-card';
    notebookCard.replaceChildren();

    const eyebrow = document.createElement('span');
    eyebrow.className = 'eyebrow';
    eyebrow.textContent = 'My notebook';

    const heading = document.createElement('h3');
    heading.textContent = 'The evidence of learning';

    const gallery = document.createElement('div');
    gallery.className = 'lesson-notebook-gallery';
    lessonOneImages.forEach(item => gallery.appendChild(makeImage(item)));

    notebookCard.append(eyebrow, heading, gallery);
  }

  function applyNotebook(event) {
    const lesson = event?.detail?.lesson || window.LatinLessonTemplate?.currentLesson;
    if (lesson) rebuildNotebook(lesson);
  }

  window.addEventListener('latin-lesson-rendered', applyNotebook);
  queueMicrotask(() => applyNotebook());

  const style = document.createElement('style');
  style.textContent = `
    .lesson-notebook-card{min-width:0!important}
    .lesson-notebook-gallery{display:grid!important;grid-template-columns:1fr!important;gap:16px!important;margin-top:16px!important;width:100%!important}
    .lesson-notebook-photo{display:block!important;width:100%!important;margin:0!important;padding:0!important;overflow:hidden!important;border:1px solid #ded5cd!important;border-radius:16px!important;background:#fffaf2!important}
    .lesson-notebook-photo img{display:block!important;width:100%!important;max-width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;object-fit:contain!important;object-position:center!important;background:transparent!important;transform:none!important;clip-path:none!important;aspect-ratio:auto!important}
    .lesson-notebook-caption{margin:0!important;padding:12px 14px!important;color:#655a52!important;background:#fffaf2!important;font:14px/1.45 system-ui,sans-serif!important}
    .lesson-notebook-error{margin:0!important;padding:18px!important;color:#7a2222!important;background:#fff3f1!important;font:600 14px/1.5 system-ui,sans-serif!important}
    @media(min-width:900px){.lesson-notebook-gallery{grid-template-columns:1fr 1fr!important;align-items:start!important}}
  `;
  document.head.appendChild(style);
})();
