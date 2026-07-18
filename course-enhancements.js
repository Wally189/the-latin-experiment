(() => {
  const returnTarget = 'course.html' + location.search + location.hash;
  const encodedReturn = encodeURIComponent(returnTarget);

  const navLinks = document.querySelectorAll('.nav-links a');
  const destinations = ['index.html#home','course.html','index.html#schedule','index.html#materials','index.html#certificates','index.html#contact'];
  navLinks.forEach((link,index) => {
    link.href = destinations[index] || '#';
    if (index === 1) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });

  document.querySelectorAll('.book-card a,.side-card.gold a').forEach(link => link.href = 'index.html#materials');

  const lede = document.querySelector('.lede');
  if (lede) lede.textContent = 'The experiment begins here: Father William Most’s course, a notebook, a microphone and a determination to discover whether the Church’s language can become something genuinely usable.';

  const bookFact = document.querySelector('.hero-facts .fact span');
  if (bookFact) bookFact.innerHTML = 'Father William Most<br><a class="book-title-link" href="index.html#materials"><em>Latin by the Natural Method</em></a>';

  const dayNote = document.querySelector('.day-note');
  if (dayNote) dayNote.innerHTML = 'Day 1.<br><br>Excited. A little daunted.<br><br>— A.W.G.';

  const curiosity = document.querySelector('.curiosity');
  if (curiosity) curiosity.innerHTML = `
    <div class="begin-block">
      <span class="curiosity-label">Curiosity hook</span>
      <h2>Lets begin...</h2>
      <p class="reveal">The first step is to read through Lesson 1 in Father Mosts Latin by the natural method textbook.</p>
    </div>`;

  const sections = [...document.querySelectorAll('.section')];
  const audioSection = sections.find(section => section.querySelector('h2')?.textContent.trim() === 'Hear the experiment');
  if (audioSection) {
    audioSection.innerHTML = `
      <div class="section-head"><div><h2>First reading</h2><p>Listen before working through the lesson.</p></div></div>
      <div class="reading-grid">
        <article class="audio-card reading-card"><span class="sequence-number">1A</span><h3>“We Are Discovered”</h3><span class="tag">first reading · before study</span><p>Hear the first attempt without polishing away hesitation or error.</p><div class="audio-placeholder"><button class="play" disabled aria-label="Recording not yet added">▶</button><span>First reading to be added</span><span class="audio-line"></span></div></article>
        <article class="audio-card reading-card"><span class="sequence-number">1B</span><h3>“Columbus and Lamb Stew”</h3><span class="tag">first reading · before study</span><p>Hear the second text separately so that each can be compared after study.</p><div class="audio-placeholder"><button class="play" disabled aria-label="Recording not yet added">▶</button><span>First reading to be added</span><span class="audio-line"></span></div></article>
      </div>
      <div class="section-head study-heading"><div><h2>Between the readings</h2><p>Work through the textbook before returning to the audio.</p></div></div>
      <div class="study-sequence">
        <article class="study-step"><span class="step-number">1</span><div><h3>Write out the vocabulary</h3><p>Write each word in Latin and English. Keep the two languages together so that the vocabulary can be checked and recalled.</p></div></article>
        <article class="study-step"><span class="step-number">2</span><div><h3>Copy both texts by hand</h3><p>Write out “We Are Discovered” and “Columbus and Lamb Stew” to become accustomed to forming and seeing Latin words.</p></div></article>
        <article class="study-step"><span class="step-number">3</span><div><h3>Now let’s think — in plain English</h3><p>English usually shows who did what by keeping words in a familiar order. Latin can also show a word’s job through its ending.</p><div class="grammar-visual" role="img" aria-label="Marcus is the subject, vidit is the action and agnum is the object"><span><b>Marcus</b><small>Who did it?</small></span><i>→</i><span><b>vidit</b><small>What happened?</small></span><i>→</i><span class="object-word"><b>agnum</b><small>What received the action?</small></span></div><p class="visual-note">In this lesson, the <strong>-um</strong> ending helps show that <em>agnum</em> is receiving the action. The ending carries information that English often leaves to word order.</p></div></article>
        <article class="study-step"><span class="step-number">4</span><div><h3>Try Father Most’s exercise</h3><p>Highlight the Latin words that look like English words or clearly connect to an English relative. Make your choices before opening the answer.</p><details class="exercise-reveal"><summary>Open the exercise answer <span>＋</span></summary><div class="exercise-answer"><p><strong>Words to notice:</strong></p><div class="word-pairs"><span><b>Columbus</b> — Columbus</span><span><b>Isabellam</b> — Isabella</span><span><b>rotundus</b> — rotund</span><span><b>planus</b> — plane/plain</span><span><b>Indiam</b> — India</span><span><b>Americam</b> — America</span><span><b>nauta</b> — nautical</span><span><b>navem</b> — naval/navy</span><span><b>Regina</b> — regal</span><span><b>pecuniam</b> — pecuniary</span></div></div></details></div></article>
      </div>
      <div class="section-head second-heading"><div><h2>Second reading</h2><p>Return to each text after vocabulary, handwriting, explanation and exercise.</p></div></div>
      <div class="reading-grid">
        <article class="audio-card reading-card after-card"><span class="sequence-number">2A</span><h3>“We Are Discovered”</h3><span class="tag after-tag">second reading · after study</span><p>Listen again and compare pace, phrasing, recognition and confidence.</p><div class="audio-placeholder"><button class="play" disabled aria-label="Recording not yet added">▶</button><span>Second reading to be added</span><span class="audio-line"></span></div></article>
        <article class="audio-card reading-card after-card"><span class="sequence-number">2B</span><h3>“Columbus and Lamb Stew”</h3><span class="tag after-tag">second reading · after study</span><p>Listen again separately and notice what changed after working through the lesson.</p><div class="audio-placeholder"><button class="play" disabled aria-label="Recording not yet added">▶</button><span>Second reading to be added</span><span class="audio-line"></span></div></article>
      </div>
      <article class="reader-turn"><span class="reader-label">Your part in the experiment</span><h2>Your turn</h2><p>Check each stage as you complete it. Nothing is uploaded or shared.</p><div class="reader-checklist">
        <label class="reader-check"><input type="checkbox"><span><strong>Read Lesson 1 in Father Most’s textbook</strong><small>Begin with the original lesson.</small></span></label>
        <label class="reader-check"><input type="checkbox"><span><strong>Hear the first reading of “We Are Discovered”</strong></span></label>
        <label class="reader-check"><input type="checkbox"><span><strong>Hear the first reading of “Columbus and Lamb Stew”</strong></span></label>
        <label class="reader-check"><input type="checkbox"><span><strong>Write the vocabulary in Latin and English</strong></span></label>
        <label class="reader-check"><input type="checkbox"><span><strong>Write out both Latin texts by hand</strong></span></label>
        <label class="reader-check"><input type="checkbox"><span><strong>Work through the plain-English explanation and visual</strong></span></label>
        <label class="reader-check"><input type="checkbox"><span><strong>Complete the similar-to-English exercise before revealing the answer</strong></span></label>
        <label class="reader-check"><input type="checkbox"><span><strong>Hear the second reading of both texts</strong><small>Compare it with the first readings.</small></span></label>
      </div></article>`;
  }

  const pathSection = [...document.querySelectorAll('.section')].find(section => section.querySelector('h2')?.textContent.trim() === 'Your path through this lesson');
  if (pathSection) {
    const intro = pathSection.querySelector('.section-head p');
    if (intro) intro.textContent = 'Select each stage to open the guidance.';
    const details = [
      'Audio accompanies the experience as part of the experiment, but it does not replace Father Most’s original lesson.',
      'Notice the endings, repeated forms and word order that stand out on the first pass. Uncertainty is useful evidence, not something to hide.',
      'Use a clear English explanation and a simple visual to understand what the Latin form is doing without reproducing the textbook.',
      'Turn recognition into use through speaking, handwriting, vocabulary work and the textbook exercise.',
      'Close the book, recall the vocabulary and compare the first and second readings to see what has changed.'
    ];
    pathSection.querySelectorAll('.path-card').forEach((card,index) => {
      const detail = card.querySelector('.path-detail');
      if (detail) detail.textContent = details[index];
      const inside = card.querySelector('.inside');
      if (inside && !inside.querySelector('.open-cue')) inside.insertAdjacentHTML('beforeend','<span class="open-cue"><span class="cue-open">Open guidance ＋</span><span class="cue-close">Close guidance −</span></span>');
    });
  }

  document.querySelectorAll('.quick-action strong').forEach(label => {
    if (label.textContent.trim() === 'My notes') label.textContent = 'Private notes';
  });
  document.querySelectorAll('.quick-action span span').forEach(label => {
    if (label.textContent.trim() === 'Alan’s reading') label.textContent = 'Lesson recording';
    if (label.textContent.trim() === 'Private browser notes') label.textContent = 'Notes stored in this browser';
  });

  const whyCard = [...document.querySelectorAll('.side-card')].find(card => card.querySelector('h3')?.textContent.trim() === 'Why Latin?');
  if (whyCard) {
    const link = whyCard.querySelector('a');
    if (link) link.href = 'why-latin.html?return=' + encodedReturn;
  }

  const experimentCard = [...document.querySelectorAll('.side-card')].find(card => card.querySelector('h3')?.textContent.trim() === 'My experiment');
  if (experimentCard) {
    const link = experimentCard.querySelector('a');
    if (link) {
      link.href = 'experiment.html?return=' + encodedReturn;
      link.textContent = 'Open the journal →';
    }
  }

  document.querySelectorAll('.lesson-link small').forEach(label => {
    if (label.textContent.trim() === 'Awaiting Alan’s progress') label.textContent = 'Awaiting publication';
  });
  const toast = document.querySelector('#lockToast');
  if (toast) toast.textContent = 'That lesson will open when it has been completed and published.';

  const revealCard = [...document.querySelectorAll('.content-card')].find(card => card.querySelector('.eyebrow')?.textContent.trim() === 'Today’s Latin');
  if (revealCard) {
    const placeholder = revealCard.querySelector('.placeholder');
    if (placeholder) placeholder.innerHTML = '<strong>Loading the journal entry…</strong>';
    fetch('journal-data.json',{cache:'no-store'})
      .then(response => { if (!response.ok) throw new Error('Journal data could not be loaded.'); return response.json(); })
      .then(data => {
        const entry = (data.entries || []).find(item => Number(item.lesson) === 1);
        if (!entry || !placeholder) return;
        placeholder.innerHTML = '<p>' + escapeHtml(entry.todayLatin) + '</p><p class="journal-link"><a href="experiment.html#' + escapeHtml(entry.slug) + '">Read the Lesson ' + escapeHtml(entry.roman) + ' journal entry →</a></p>';
      })
      .catch(() => { if (placeholder) placeholder.innerHTML = '<strong>Journal entry unavailable.</strong>'; });
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>\"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[character]));
  }

  const style = document.createElement('style');
  style.textContent = `
    .book-title-link{color:var(--burgundy);font-weight:900;text-decoration-thickness:2px;text-underline-offset:3px}
    .curiosity{display:block}.begin-block{max-width:780px}.begin-block h2{font-size:clamp(36px,5vw,66px);margin:8px 0 14px}.begin-block .reveal{font-size:18px;line-height:1.7;color:#403936}
    .reading-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.reading-card{position:relative;padding-top:23px}.sequence-number{position:absolute;right:15px;top:14px;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--burgundy);color:#fff;font-weight:900}.after-card{border-color:#cad8f5;background:#f8faff}.after-card .sequence-number{background:var(--blue)}.after-tag{background:#eaf0ff!important;color:#244b9b!important}
    .study-heading,.second-heading{margin-top:32px}.study-sequence{display:grid;gap:14px}.study-step{display:grid;grid-template-columns:48px minmax(0,1fr);gap:15px;padding:20px;border:1px solid #e5ddd6;border-radius:18px;background:#fff}.step-number{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:var(--gold);color:var(--ink);font-weight:900;font-size:18px}.study-step h3{margin:2px 0 7px;font-size:21px}.study-step p{margin:0;color:#5d554f;line-height:1.6}
    .grammar-visual{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:10px;align-items:center;margin:18px 0;padding:18px;border-radius:16px;background:#f6f0e9}.grammar-visual>span{padding:13px;text-align:center;border:1px solid #ddd2c8;border-radius:12px;background:#fff}.grammar-visual b,.grammar-visual small{display:block}.grammar-visual b{font:700 21px Georgia,serif}.grammar-visual small{margin-top:5px;color:#6c625d}.grammar-visual i{font-style:normal;font-size:22px}.grammar-visual .object-word{border:2px solid var(--burgundy);box-shadow:0 0 0 4px rgba(142,21,48,.08)}.visual-note{padding:12px 14px;border-left:5px solid var(--burgundy);background:#fff7f7}
    .exercise-reveal{margin-top:15px;border:1px solid #d9c58e;border-radius:14px;background:#fff9e8;overflow:hidden}.exercise-reveal summary{display:flex;justify-content:space-between;gap:12px;padding:15px 17px;font-weight:900;cursor:pointer;list-style:none}.exercise-reveal summary::-webkit-details-marker{display:none}.exercise-reveal[open] summary span{transform:rotate(45deg)}.exercise-answer{padding:0 17px 17px}.word-pairs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.word-pairs span{padding:9px 11px;border-radius:10px;background:#fff;border:1px solid #e8dcc1}
    .reader-turn{margin-top:28px;padding:22px;border:2px solid var(--gold);border-radius:20px;background:linear-gradient(145deg,#fff7dc,#fffdf8);box-shadow:0 10px 25px rgba(111,69,0,.11)}.reader-turn h2{margin:5px 0}.reader-label{color:#8b5b00;font-size:10px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}.reader-checklist{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:14px}.reader-check{display:flex;align-items:flex-start;gap:10px;padding:12px;border:1px solid #e6d29c;border-radius:12px;background:rgba(255,255,255,.86);cursor:pointer}.reader-check input{flex:0 0 19px;width:19px;height:19px;margin:2px 0 0;accent-color:var(--burgundy)}.reader-check strong,.reader-check small{display:block}.reader-check small{margin-top:3px;color:#6b625b;line-height:1.4}
    .path-card{position:relative}.open-cue{display:flex;justify-content:center;margin-top:15px;padding:9px;border-radius:9px;background:#f2ece7;color:var(--ink);font-size:11px;font-weight:900;letter-spacing:.03em}.cue-close{display:none}.path-card[aria-expanded="true"] .cue-open{display:none}.path-card[aria-expanded="true"] .cue-close{display:inline}.path-card:focus-visible{outline:4px solid rgba(36,75,155,.35);outline-offset:3px}.journal-link{margin-top:14px!important}.journal-link a{color:var(--burgundy);font-weight:900}
    @media(max-width:760px){.reading-grid,.reader-checklist,.word-pairs{grid-template-columns:1fr}.grammar-visual{grid-template-columns:1fr}.grammar-visual i{transform:rotate(90deg)}.study-step{grid-template-columns:40px minmax(0,1fr)}.step-number{width:36px;height:36px}}
  `;
  document.head.appendChild(style);
})();
