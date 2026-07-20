(() => {
  const revealCard = [...document.querySelectorAll('.content-card')]
    .find(card => card.querySelector('.eyebrow')?.textContent.trim() === 'Today’s Latin');
  if (!revealCard) return;

  const heading = revealCard.querySelector('h3');
  const content = revealCard.querySelector('.placeholder');
  if (heading) heading.textContent = 'My journal for Lesson I';
  if (!content) return;

  content.innerHTML = `
    <p>For each lesson I am recording a short reflection in my journal. Take a look at what I noticed, what helped and what I still need to revisit.</p>
    <p>If you are following along, keeping your own journal is worthwhile: it helps you reflect on progress and identify weaknesses to return to.</p>
    <p class="journal-link"><a href="experiment.html#lesson-1">Open the Lesson I journal entry →</a></p>`;
})();
