(() => {
  const page = document.querySelector('.lesson-page');
  const desktopList = document.getElementById('desktopLessons');
  const mobileList = document.getElementById('mobileList');
  const toast = document.getElementById('lockToast');
  if (!page || !desktopList || !mobileList) return;

  const sharedStages = [
    {latin:'Audi et lege', english:'Listen and read', summary:'Hear the Latin. Follow the text. Let the rhythm settle.', detail:'Use Father Most’s original lesson first. Audio accompanies the experiment but does not replace the source.', colour:'#8e1530'},
    {latin:'Observa', english:'Notice', summary:'Spot patterns, endings, repeated forms and word order.', detail:'Record what stands out on the first pass. Uncertainty is useful evidence, not something to hide.', colour:'#244b9b'},
    {latin:'Intellege', english:'Understand', summary:'Build a clear explanation in everyday English.', detail:'Use an independent explanation and original examples without reproducing the textbook.', colour:'#c78b13'},
    {latin:'Exerce', english:'Practise', summary:'Say it aloud. Write it down. Use it.', detail:'Turn recognition into use through speech, handwriting, vocabulary work and the original textbook exercise.', colour:'#71307b'},
    {latin:'Recordare', english:'Recall', summary:'Close the book. Test memory. Rebuild the idea.', detail:'Compare the first and second readings and record what changed, what did not and what needs another pass.', colour:'#2e7051'}
  ];

  let lessons = [];

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[character]));

  function showLock() {
    if (!toast) return;
    toast.textContent = 'That lesson will open when its template or completed material is available.';
    toast.classList.add('show');
    clearTimeout(showLock.timer);
    showLock.timer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function lessonByNumber(number) {
    return lessons.find(lesson => Number(lesson.number) === Number(number));
  }

  function availableLesson(number) {
    const lesson = lessonByNumber(number);
    return lesson && lesson.available ? lesson : null;
  }

  function nextInitialLesson() {
    const requested = Number(new URLSearchParams(location.search).get('lesson'));
    if (availableLesson(requested)) return requested;

    const progress = window.LatinExperimentProgress;
    const next = progress && typeof progress.nextIncomplete === 'function' ? progress.nextIncomplete() : 1;
    if (availableLesson(next)) return next;

    const firstIncomplete = lessons.find(lesson => lesson.available && !(progress?.isComplete?.(lesson.number)));
    if (firstIncomplete) return firstIncomplete.number;

    const published = lessons.filter(lesson => lesson.available);
    return published.length ? published[published.length - 1].number : 1;
  }

  function updateAddress(number) {
    const url = new URL(location.href);
    url.searchParams.set('lesson', String(number));
    history.replaceState({lesson:number}, '', url.pathname + url.search + url.hash);
  }

  function buildList(target) {
    target.innerHTML = '';
    for (let number = 1; number <= 81; number += 1) {
      const lesson = availableLesson(number);
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.lessonNumber = String(number);
      button.className = `lesson-link${lesson ? '' : ' locked'}`;
      button.innerHTML = `<span class="icon">${lesson ? escapeHtml(lesson.roman) : '·'}</span><span><strong>Lesson ${number}</strong><small>${lesson ? escapeHtml(lesson.title) : 'Awaiting publication'}</small></span>`;

      if (lesson) {
        button.addEventListener('click', event => {
          if (event.target.closest('.lesson-progress-check')) return;
          renderLesson(number, true);
          if (target === mobileList) {
            mobileList.classList.remove('open');
            const toggle = document.getElementById('mobileToggle');
            if (toggle) {
              toggle.textContent = 'Show lessons';
              toggle.setAttribute('aria-expanded', 'false');
            }
          }
        });
      } else {
        button.setAttribute('aria-disabled', 'true');
        button.addEventListener('click', showLock);
      }
      target.appendChild(button);
    }
  }

  function readingsHtml(lesson, phase) {
    const after = phase === 'after';
    return (lesson.readings || []).map((reading, index) => `
      <article class="audio-card reading-card ${after ? 'after-card' : ''}">
        <span class="sequence-number">${after ? 2 : 1}${String.fromCharCode(65 + index)}</span>
        <h3>${escapeHtml(reading.title)}</h3>
        <span class="tag ${after ? 'after-tag' : ''}">${after ? 'second reading · after study' : 'first reading · before study'}</span>
        <p>${after ? 'Return after study and compare pace, recognition, phrasing and confidence.' : 'Make an honest first attempt before polishing, explaining or correcting it.'}</p>
        <div class="audio-placeholder"><button class="play" disabled aria-label="Recording not yet added">▶</button><span>${after ? 'Second' : 'First'} reading to be added</span><span class="audio-line"></span></div>
      </article>`).join('');
  }

  function renderStudySteps(lesson) {
    return (lesson.studySteps || []).map((step, index) => `
      <article class="study-step"><span class="step-number">${index + 1}</span><div><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.text)}</p></div></article>`).join('');
  }

  function renderChecklist(lesson) {
    return (lesson.checklist || []).map(item => `
      <label class="reader-check"><input type="checkbox"><span><strong>${escapeHtml(item)}</strong></span></label>`).join('');
  }

  function renderStages() {
    return sharedStages.map((stage, index) => `
      <button class="path-card" style="--stage:${stage.colour}" aria-expanded="false">
        <div class="colour"></div><div class="inside"><span class="path-number">${index + 1}</span><h3>${escapeHtml(stage.latin)}</h3><span class="eng">${escapeHtml(stage.english)}</span><p>${escapeHtml(stage.summary)}</p><div class="path-detail">${escapeHtml(stage.detail)}</div><span class="open-cue"><span class="cue-open">Open guidance ＋</span><span class="cue-close">Close guidance −</span></span></div>
      </button>`).join('');
  }

  function renderLesson(number, updateUrl = false) {
    const lesson = availableLesson(number);
    if (!lesson) {
      showLock();
      return;
    }

    window.LatinLessonTemplate.currentLesson = lesson;
    page.dataset.lessonNumber = String(lesson.number);

    document.querySelectorAll('.lesson-link').forEach(row => {
      row.classList.toggle('active', Number(row.dataset.lessonNumber) === lesson.number);
    });

    page.innerHTML = `
      <div class="breadcrumbs">Course <span>›</span> First year <span>›</span> Lesson ${escapeHtml(lesson.roman)}</div>
      <div class="lesson-grid">
        <div class="main-column">
          <div class="lesson-template-status"><strong>${escapeHtml(lesson.status)}</strong><span>This page is available for testing and makes no claim that Alan has completed the lesson.</span></div>
          <section class="hero">
            <div>
              <p class="kicker">First year · learning module</p>
              <h1>Lesson ${escapeHtml(lesson.roman)}</h1>
              <p class="subtitle">${escapeHtml(lesson.title)}.</p>
              <p class="lede">${escapeHtml(lesson.lede)}</p>
              <div class="hero-facts">
                <div class="fact"><strong>Based on</strong><span>Father William Most<br><a class="book-title-link" href="index.html#materials"><em>Latin by the Natural Method</em></a></span></div>
                <div class="fact"><strong>Estimated time</strong><span>${escapeHtml(lesson.estimatedTime)}</span></div>
                <div class="fact"><strong>Aim</strong><span>${escapeHtml(lesson.aim)}</span></div>
              </div>
            </div>
            <div class="hero-visual" aria-label="Lesson artwork placeholder"><div class="latin">LATINA ✠</div><div class="day-note">${escapeHtml(lesson.dayNote)}</div></div>
          </section>

          <section class="section curiosity" id="lesson-begin"><div class="begin-block"><span class="curiosity-label">Curiosity hook</span><h2>${escapeHtml(lesson.curiosityTitle)}</h2><p class="reveal">${escapeHtml(lesson.curiosityText)}</p><div class="sample-latin">${escapeHtml(lesson.curiositySample)}</div></div></section>

          <section class="section" id="lesson-readings">
            <div class="section-head"><div><h2>First reading</h2><p>Listen or record before working through the lesson.</p></div></div>
            <div class="reading-grid">${readingsHtml(lesson, 'before')}</div>
            <div class="section-head study-heading"><div><h2>Between the readings</h2><p>Work through the original textbook before returning to the audio.</p></div></div>
            <div class="study-sequence">${renderStudySteps(lesson)}</div>
            <div class="section-head second-heading"><div><h2>Second reading</h2><p>Return after vocabulary, handwriting, explanation and practice.</p></div></div>
            <div class="reading-grid">${readingsHtml(lesson, 'after')}</div>
            <article class="reader-turn"><span class="reader-label">Your part in the experiment</span><h2>Your turn</h2><p>Check each stage as you complete it. Nothing is uploaded or shared.</p><div class="reader-checklist">${renderChecklist(lesson)}</div></article>
          </section>

          <section class="section" id="lesson-path"><div class="section-head"><div><h2>Your path through this lesson</h2><p>The same five stages are used for every published lesson.</p></div></div><div class="path-grid">${renderStages()}</div></section>

          <section class="section lower-grid" id="lesson-reflection">
            <article class="content-card"><span class="eyebrow">Today’s Latin</span><h3>What Lesson ${escapeHtml(lesson.roman)} reveals</h3><div class="lesson-reflection"><p>${escapeHtml(lesson.todayLatin)}</p><p class="journal-link"><a href="experiment.html#${escapeHtml(lesson.journalSlug)}">Open the Lesson ${escapeHtml(lesson.roman)} journal entry →</a></p></div></article>
            <article class="content-card"><span class="eyebrow">My notebook</span><h3>The evidence of learning</h3><div class="placeholder notebook hand"><strong>No notebook image added yet.</strong><br><br>${escapeHtml(lesson.notebookCaption)}</div></article>
          </section>

          <section class="section"><div class="section-head"><div><h2>Quick actions</h2><p>Return to the relevant part of the lesson.</p></div></div><div class="quick-actions">
            <button class="quick-action" data-scroll-target="lesson-readings" style="--c:#8e1530"><i>◉</i><span><strong>Listen again</strong><span>Lesson recordings</span></span></button>
            <button class="quick-action" data-scroll-target="lesson-readings" style="--c:#244b9b"><i>✎</i><span><strong>Copy it out</strong><span>Handwriting practice</span></span></button>
            <button class="quick-action" data-scroll-target="lesson-path" style="--c:#c78b13"><i>☵</i><span><strong>Say it aloud</strong><span>Speech practice</span></span></button>
            <button class="quick-action" data-scroll-target="lesson-reflection" style="--c:#71307b"><i>✓</i><span><strong>Mini-quiz</strong><span>Quiz page to follow</span></span></button>
            <button class="quick-action" data-scroll-target="lesson-reflection" style="--c:#2e7051"><i>▤</i><span><strong>Private notes</strong><span>Notes stay in this browser</span></span></button>
          </div></section>

          <footer class="lesson-footer"><blockquote>“Latin is not a museum piece. Learn it, hear it, use it—and discover why it still belongs to the whole Church.”</blockquote><button class="complete-button" id="completeButton" type="button">Mark Lesson ${escapeHtml(lesson.roman)} complete</button></footer>
        </div>

        <aside class="side-column">
          <article class="side-card blue"><h3>Why Latin?</h3><p>Explore why Latin still matters as a shared inheritance of worship, prayer and scholarship.</p><a href="why-latin.html?return=${encodeURIComponent('course.html?lesson=' + lesson.number)}">Explore the question →</a></article>
          <article class="side-card gold"><h3>Have the book?</h3><p>This website accompanies Father Most. Use the book as the primary text.</p><a href="index.html#materials">Find your copy →</a></article>
          <article class="side-card purple"><h3>My experiment</h3><p>Follow the real notes, hesitant recordings, errors, corrections and small victories.</p><a href="experiment.html#${escapeHtml(lesson.journalSlug)}">Open the journal →</a></article>
          <article class="side-card" data-church-connection><h3>In the Church</h3><p>${escapeHtml(lesson.churchPlaceholder)}</p></article>
          <article class="side-card manifesto"><h3>One language.<br>Many centuries.<br>One Church.</h3><p>What happens when Catholics begin recognising this language as something they can actually use?</p></article>
        </aside>
      </div>`;

    page.querySelectorAll('.path-card').forEach(card => card.addEventListener('click', () => {
      card.setAttribute('aria-expanded', String(card.getAttribute('aria-expanded') !== 'true'));
    }));
    page.querySelectorAll('[data-scroll-target]').forEach(button => button.addEventListener('click', () => {
      document.getElementById(button.dataset.scrollTarget)?.scrollIntoView({behavior:'smooth', block:'start'});
    }));

    if (updateUrl) updateAddress(lesson.number);
    document.title = `The Latin Experiment — Lesson ${lesson.roman}`;
    window.dispatchEvent(new CustomEvent('latin-lesson-rendered', {detail:{lesson}}));
  }

  function initialise(data) {
    lessons = Array.isArray(data.lessons) ? data.lessons : [];
    buildList(desktopList);
    buildList(mobileList);
    const availableCount = lessons.filter(lesson => lesson.available).length;
    document.querySelectorAll('.rail-meta').forEach(element => {
      element.textContent = `${availableCount} of 81 lesson templates available`;
    });
    renderLesson(nextInitialLesson(), true);
  }

  window.LatinLessonTemplate = {
    currentLesson: null,
    getLesson: lessonByNumber,
    render: number => renderLesson(number, true)
  };

  fetch('lessons-data.json', {cache:'no-store'})
    .then(response => {
      if (!response.ok) throw new Error('Lesson data could not be loaded.');
      return response.json();
    })
    .then(initialise)
    .catch(error => {
      page.innerHTML = `<main class="lesson-template-error"><strong>The lesson template could not be loaded.</strong><br>${escapeHtml(error.message)}</main>`;
    });

  const style = document.createElement('style');
  style.textContent = `
    .lesson-template-status{display:flex;flex-wrap:wrap;gap:8px 14px;margin:0 0 18px;padding:13px 16px;border:1px solid #d8c78f;border-radius:14px;background:#fff8df;color:#5d4b1f;line-height:1.45}.lesson-template-status strong{color:#7d5700}.lesson-template-status span{color:#6f6250}
    .begin-block{width:100%}.begin-block .sample-latin{margin-top:18px;padding:18px;border-radius:14px;background:#fff;color:var(--ink);font:700 19px/1.55 Georgia,serif}
    .book-title-link{color:var(--burgundy);font-weight:900;text-decoration-thickness:2px;text-underline-offset:3px}
    .reading-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.reading-card{position:relative;padding-top:23px}.sequence-number{position:absolute;right:15px;top:14px;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--burgundy);color:#fff;font-weight:900}.after-card{border-color:#cad8f5;background:#f8faff}.after-card .sequence-number{background:var(--blue)}.after-tag{background:#eaf0ff!important;color:#244b9b!important}
    .study-heading,.second-heading{margin-top:32px}.study-sequence{display:grid;gap:14px}.study-step{display:grid;grid-template-columns:48px minmax(0,1fr);gap:15px;padding:20px;border:1px solid #e5ddd6;border-radius:18px;background:#fff}.step-number{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:var(--gold);color:var(--ink);font-weight:900;font-size:18px}.study-step h3{margin:2px 0 7px;font-size:21px}.study-step p{margin:0;color:#5d554f;line-height:1.6}
    .reader-turn{margin-top:28px;padding:22px;border:2px solid var(--gold);border-radius:20px;background:linear-gradient(145deg,#fff7dc,#fffdf8);box-shadow:0 10px 25px rgba(111,69,0,.11)}.reader-turn h2{margin:5px 0}.reader-label{color:#8b5b00;font-size:10px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}.reader-checklist{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:14px}.reader-check{display:flex;align-items:flex-start;gap:10px;padding:12px;border:1px solid #e6d29c;border-radius:12px;background:rgba(255,255,255,.86);cursor:pointer}.reader-check input{flex:0 0 19px;width:19px;height:19px;margin:2px 0 0;accent-color:var(--burgundy)}.reader-check strong{display:block}
    .path-card{position:relative}.open-cue{display:flex;justify-content:center;margin-top:15px;padding:9px;border-radius:9px;background:#f2ece7;color:var(--ink);font-size:11px;font-weight:900}.cue-close{display:none}.path-card[aria-expanded="true"] .cue-open{display:none}.path-card[aria-expanded="true"] .cue-close{display:inline}
    .lesson-reflection{padding:16px;border-left:5px solid var(--burgundy);border-radius:0 14px 14px 0;background:#fbf6ef;color:#514945;line-height:1.65}.lesson-reflection p{margin:0}.lesson-reflection p+p{margin-top:12px}.journal-link a{color:var(--burgundy);font-weight:900}
    .lesson-template-error{padding:40px;color:#7a2222}
    @media(max-width:760px){.reading-grid,.reader-checklist{grid-template-columns:1fr}.study-step{grid-template-columns:40px minmax(0,1fr)}.step-number{width:36px;height:36px}}
  `;
  document.head.appendChild(style);
})();
