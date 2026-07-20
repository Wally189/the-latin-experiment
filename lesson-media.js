(() => {
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
        slot.replaceChildren();
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

  function applyAudio(event) {
    const lesson = event?.detail?.lesson || window.LatinLessonTemplate?.currentLesson;
    if (lesson) addAudio(lesson);
  }

  window.addEventListener('latin-lesson-rendered', applyAudio);
  queueMicrotask(() => applyAudio());

  const style = document.createElement('style');
  style.textContent = `
    .audio-placeholder.has-audio{display:block;height:auto;padding:12px}
    .audio-placeholder.has-audio audio{display:block;width:100%}
  `;
  document.head.appendChild(style);
})();
