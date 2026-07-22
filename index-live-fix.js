(() => {
  const courseNav = document.querySelector('[data-n="course"]');
  if (courseNav) courseNav.setAttribute('href', 'course.html');

  const heroButton = document.querySelector('[data-v="home"] .btn');
  if (heroButton) heroButton.setAttribute('href', 'course.html');

  const homeCards = document.querySelector('[data-v="home"] .cards');
  if (homeCards) {
    homeCards.classList.add('home-links');
    homeCards.innerHTML = `
      <a class="card" href="course.html"><h2>Course</h2><p>Follow the published lessons and the experiment as it develops.</p></a>
      <a class="card" style="--c:#1c3f8f" href="#schedule"><h2>Schedule</h2><p>Set a start date and build a realistic goal.</p></a>
      <a class="card" style="--c:#d6a43a" href="#materials"><h2>Materials</h2><p>Find Father Most’s book and the supporting materials.</p></a>
      <a class="card" style="--c:#6b2d70" href="#certificates"><h2>Certificates</h2><p>See learning milestones and indicative ability stages.</p></a>
      <a class="card" style="--c:#2f6b50" href="#contact"><h2>Contact</h2><p>Send a question, correction or thoughtful piece of feedback.</p></a>`;
  }

  const materials = document.querySelector('[data-v="materials"]');
  if (materials) {
    materials.innerHTML = `
      <h1>Materials</h1>
      <p class="muted">The experiment accompanies Father William Most’s <em>Latin by the Natural Method</em>. Use the original book as the primary text; this site records and supports the learning journey rather than reproducing it.</p>
      <div class="cards">
        <div class="card"><h2>Browse Volume I</h2><p>Read the first-year edition in the Internet Archive book reader or use one of the formats provided there.</p><p><a class="btn" href="https://archive.org/details/Latin_method_Most_1stYear" target="_blank" rel="noopener">Browse the archived edition →</a></p></div>
        <div class="card" style="--c:#1c3f8f"><h2>Buy the book</h2><p>Mediatrix Press publishes a modern paperback edition of Volume I. Stock and delivery terms are controlled by the publisher.</p><p><a class="btn" href="https://mediatrixpress.com/product/latin-by-the-natural-method-vol-1/" target="_blank" rel="noopener">Visit the publisher →</a></p></div>
        <div class="card" style="--c:#d6a43a"><h2>Find a library copy</h2><p>Open Library records the original and modern editions and links to library catalogues.</p><p><a class="btn" href="https://openlibrary.org/books/OL27507569M/Latin_by_the_Natural_Method" target="_blank" rel="noopener">Check library listings →</a></p></div>
        <a class="card material-link" style="--c:#6b2d70" href="vocabulary.html?return=index.html%23materials"><h2>Vocabulary notebook</h2><p>Words, forms and memory cues created during the experiment.</p><span>Open vocabulary →</span></a>
        <a class="card material-link" style="--c:#b3261e" href="pronunciation.html?return=index.html%23materials"><h2>Pronunciation</h2><p>Ecclesiastical Latin sound guidance and the experiment’s before-and-after recordings.</p><span>Open pronunciation →</span></a>
        <a class="card material-link" style="--c:#2f6b50" href="experiment.html?return=index.html%23materials"><h2>Learning journal</h2><p>Questions, handwritten evidence, corrections and reflections from each completed lesson.</p><span>Open the journal →</span></a>
        <a class="card material-link" style="--c:#244b9b" href="terminology.html?return=index.html%23materials"><h2>Complete terminology guide</h2><p>Plain-English explanations of grammar terms used in the schedule and lessons, with no prior knowledge assumed.</p><span>Open terminology guide →</span></a>
      </div>`;
  }

  const style = document.createElement('style');
  style.textContent = '.home-links a.card,.material-link{color:inherit;text-decoration:none}.home-links a.card:hover,.material-link:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(25,8,6,.08)}.material-link span{display:inline-block;margin-top:10px;color:var(--burgundy);font-weight:900}';
  document.head.appendChild(style);
})();