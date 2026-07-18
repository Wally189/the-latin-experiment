(() => {
  const course = document.querySelector('[data-v="course"]');
  const detail = course?.querySelector('.detail');
  const list = course?.querySelector('#list');
  const stat = course?.querySelector('#stat');
  if (!course || !detail || !list) return;

  detail.innerHTML = `
    <div class="l1-page">
      <section class="l1-hero">
        <div>
          <p class="l1-kicker">First volume · learning module</p>
          <h1 class="l1-title" id="ct">Lectio I</h1>
          <p class="l1-subtitle">The very first steps.</p>
          <p class="l1-lede" id="cd">The experiment begins here: one ordinary Catholic, Father William Most’s course, a notebook, a microphone and a determination to discover whether the Church’s language can become something genuinely usable.</p>
          <div class="l1-facts">
            <div class="l1-fact"><strong>Based on</strong><span>Father William Most<br><em>Latin by the Natural Method</em></span></div>
            <div class="l1-fact"><strong>Estimated time</strong><span>30–45 minutes<br>plus handwriting and speech</span></div>
            <div class="l1-fact"><strong>Aim</strong><span>Meet the first Latin patterns and begin thinking beyond translation</span></div>
          </div>
        </div>
        <div class="l1-visual" aria-label="Lesson artwork placeholder">
          <div class="l1-visual-word">LATINA ✠</div>
          <div class="l1-day-note">Day 1.<br><br>Excited. A little daunted. My genuine note will replace this after I complete the lesson.<br><br>— A.W.G.</div>
        </div>
      </section>

      <section class="l1-section l1-curiosity">
        <div>
          <span class="l1-curiosity-label">Curiosity hook</span>
          <h2>How can a few tiny endings tell us who is doing what?</h2>
          <p class="l1-reveal">English leans heavily on word order. Latin can carry part of the same information inside the words themselves.</p>
        </div>
        <div class="l1-curiosity-copy">
          <div class="l1-latin-sample">Ecclesia orat.<br>Populus respondet.<br>Verba manent.</div>
          <div class="l1-reveal">The words are simple, but the system underneath them is not. <strong>This is our first glimpse of how Latin organises meaning.</strong><br><br><small>Original supplementary examples; Father Most’s lesson remains in the book.</small></div>
        </div>
      </section>

      <section class="l1-section">
        <div class="l1-heading"><div><h2>Hear the experiment</h2><p>The audio positions are ready for Alan’s real before-and-after recordings.</p></div></div>
        <div class="l1-audio-grid">
          <article class="l1-card">
            <h3>My first reading</h3><span class="l1-tag">unedited · before study</span>
            <p>An honest starting point, not an authoritative pronunciation guide.</p>
            <div class="l1-audio-placeholder"><button class="l1-play" disabled aria-label="Audio not yet recorded">▶</button><span>Recording to be added</span><span class="l1-wave"></span></div>
            <strong>What I noticed</strong><ul><li>Real observations will appear after recording.</li><li>Mistakes remain part of the experiment.</li></ul>
          </article>
          <article class="l1-card">
            <h3>After studying</h3><span class="l1-tag blue">after practice</span>
            <p>Recorded after reading, handwriting, repeated speech and comprehension work.</p>
            <div class="l1-audio-placeholder"><button class="l1-play" disabled aria-label="Audio not yet recorded">▶</button><span>Second recording to be added</span><span class="l1-wave"></span></div>
            <strong>What changed</strong><ul><li>Compare pace, confidence and phrasing.</li><li>Record what still needs work.</li></ul>
          </article>
          <article class="l1-card">
            <h3>Your turn</h3><p>Open Father Most’s book. Attempt the lesson aloud before hearing Alan’s second recording.</p>
            <div class="l1-reader-actions"><button>🎙 Read aloud</button><button>✎ Write it by hand</button><button>◉ Record yourself privately</button></div>
          </article>
        </div>
      </section>

      <section class="l1-section">
        <div class="l1-heading"><div><h2>Your path through this lesson</h2><p>Five repeatable stages for every published lesson.</p></div></div>
        <div class="l1-path">
          <button class="l1-stage" style="--stage:#8e1730" aria-expanded="false"><div class="l1-stage-bar"></div><div class="l1-stage-body"><span class="l1-stage-number">1</span><h3>Audi et lege</h3><span class="l1-stage-name">Listen and read</span><p>Hear the Latin. Follow the text. Let the rhythm settle.</p><div class="l1-stage-detail">Use Father Most’s original lesson first. Alan’s audio accompanies the experience but does not replace the source.</div></div></button>
          <button class="l1-stage" style="--stage:#244b9b" aria-expanded="false"><div class="l1-stage-bar"></div><div class="l1-stage-body"><span class="l1-stage-number">2</span><h3>Observa</h3><span class="l1-stage-name">Notice</span><p>Spot patterns, endings, repeated forms and word order.</p><div class="l1-stage-detail">The site will highlight what Alan genuinely noticed, including initial misunderstandings.</div></div></button>
          <button class="l1-stage" style="--stage:#c78b13" aria-expanded="false"><div class="l1-stage-bar"></div><div class="l1-stage-body"><span class="l1-stage-number">3</span><h3>Intellege</h3><span class="l1-stage-name">Understand</span><p>A concise explanation in ordinary English.</p><div class="l1-stage-detail">Independent explanation and original examples clarify the lesson without reproducing the textbook.</div></div></button>
          <button class="l1-stage" style="--stage:#6b2d70" aria-expanded="false"><div class="l1-stage-bar"></div><div class="l1-stage-body"><span class="l1-stage-number">4</span><h3>Exerce</h3><span class="l1-stage-name">Practise</span><p>Say it aloud. Write it down. Use it.</p><div class="l1-stage-detail">Speaking, handwriting, sentence building and short comprehension prompts turn recognition into active knowledge.</div></div></button>
          <button class="l1-stage" style="--stage:#2f6b50" aria-expanded="false"><div class="l1-stage-bar"></div><div class="l1-stage-body"><span class="l1-stage-number">5</span><h3>Recordare</h3><span class="l1-stage-name">Recall</span><p>Close the book. Test memory. Rebuild the idea.</p><div class="l1-stage-detail">A short retrieval check helps the lesson survive beyond the moment it was read.</div></div></button>
        </div>
      </section>

      <section class="l1-section l1-lower">
        <article class="l1-card"><span class="l1-eyebrow">Today’s Latin</span><h3>What Lesson I reveals</h3><div class="l1-placeholder"><strong>Publication boundary:</strong> after Alan completes the lesson, this area will contain his own summary, short attributed references where justified, original supplementary examples and the patterns he found. It will not reproduce Father Most’s lesson wholesale.</div></article>
        <article class="l1-card"><span class="l1-eyebrow">My notebook</span><h3>The evidence of learning</h3><div class="l1-placeholder l1-notebook">A photograph of the real handwritten page will appear here.<br><br>Mistakes will not be polished away.<br>Corrections and the moment something “clicked” are part of the story.</div></article>
      </section>

      <section class="l1-section">
        <div class="l1-heading"><div><h2>Quick actions</h2><p>Five-minute boosters</p></div></div>
        <div class="l1-quick">
          <button style="--action:#8e1730"><span class="l1-quick-icon">◉</span><span><strong>Listen again</strong><small>Alan’s reading</small></span></button>
          <button style="--action:#244b9b"><span class="l1-quick-icon">✎</span><span><strong>Copy it out</strong><small>Handwriting practice</small></span></button>
          <button style="--action:#c78b13"><span class="l1-quick-icon">☵</span><span><strong>Say it aloud</strong><small>Speech practice</small></span></button>
          <button style="--action:#6b2d70"><span class="l1-quick-icon">✓</span><span><strong>Mini-quiz</strong><small>Recall check</small></span></button>
          <button style="--action:#2f6b50"><span class="l1-quick-icon">▤</span><span><strong>My notes</strong><small>Private browser notes</small></span></button>
        </div>
      </section>

      <section class="l1-context">
        <article class="l1-card blue"><h3>Why Latin?</h3><p>Not as an escape into the past, but as a shared inheritance connecting worship, prayer, scholarship and Catholics across countries and centuries.</p></article>
        <article class="l1-card gold"><h3>Have the book?</h3><p>This website accompanies Father Most. Purchase or borrow the book and use it as the primary text.</p></article>
        <article class="l1-card purple"><h3>My experiment</h3><p>Follow the real notes, hesitant recordings, errors, corrections and small victories as they happen.</p></article>
        <article class="l1-card dark"><h3>One language. Many centuries. One Church.</h3><p>What happens when ordinary Catholics begin recognising this language as something they can actually use?</p></article>
      </section>

      <footer class="l1-footer">
        <blockquote>Latin is not a museum piece. Learn it, hear it, use it—and discover why it still belongs to the whole Church.</blockquote>
        <button type="button" class="l1-complete">Mark Lesson I complete</button>
      </footer>
    </div>`;

  const toast = document.createElement('div');
  toast.className = 'lesson-lock-toast';
  toast.textContent = 'That lesson will open when Alan completes and publishes it.';
  document.body.appendChild(toast);

  const isLessonOne = (card) => card?.querySelector('b')?.textContent.trim() === 'Lectio I';
  const showLock = () => {
    toast.classList.add('show');
    clearTimeout(showLock.timer);
    showLock.timer = setTimeout(() => toast.classList.remove('show'), 2300);
  };

  function enforcePublicationState() {
    const cards = [...list.querySelectorAll('.lesson')];
    cards.forEach((card) => {
      const locked = !isLessonOne(card);
      card.classList.toggle('lesson-author-locked', locked);
      card.setAttribute('aria-disabled', String(locked));
      if (locked) {
        const blurb = card.querySelector('small');
        if (blurb && blurb.textContent !== 'Awaiting Alan’s progress.') blurb.textContent = 'Awaiting Alan’s progress.';
        if (typeof filter !== 'undefined' && filter === 'active') card.hidden = true;
      }
    });
    if (stat) {
      const complete = typeof P !== 'undefined' && P.has('l1');
      stat.textContent = `1 of 81 lessons published · ${complete ? 1 : 0} completed`;
    }
    syncCompleteButton();
  }

  list.addEventListener('click', (event) => {
    const card = event.target.closest('.lesson');
    if (!card || isLessonOne(card)) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    showLock();
  }, true);

  new MutationObserver(enforcePublicationState).observe(list, { childList:true, subtree:true });
  document.querySelectorAll('[data-f]').forEach((button) => button.addEventListener('click', () => requestAnimationFrame(enforcePublicationState)));

  detail.addEventListener('click', (event) => {
    const stage = event.target.closest('.l1-stage');
    if (stage) stage.setAttribute('aria-expanded', String(stage.getAttribute('aria-expanded') !== 'true'));

    const completeButton = event.target.closest('.l1-complete');
    if (completeButton && typeof P !== 'undefined') {
      P.has('l1') ? P.delete('l1') : P.add('l1');
      localStorage.p = JSON.stringify([...P]);
      if (typeof render === 'function') render();
      if (typeof badges === 'function') badges();
      syncCompleteButton();
    }
  });

  function syncCompleteButton() {
    const button = detail.querySelector('.l1-complete');
    if (!button || typeof P === 'undefined') return;
    const done = P.has('l1');
    button.classList.toggle('done', done);
    button.textContent = done ? 'Lesson I completed ✓' : 'Mark Lesson I complete';
  }

  enforcePublicationState();
})();
