const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

function setNav(open) {
  navToggle?.setAttribute('aria-expanded', String(open));
  siteNav?.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
}

navToggle?.addEventListener('click', () => setNav(navToggle.getAttribute('aria-expanded') !== 'true'));
siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setNav(false)));

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

document.querySelectorAll('.reveal-answer').forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    button.textContent = expanded ? 'Reveal guidance' : 'Hide guidance';
    if (answer) answer.hidden = expanded;
  });
});

document.querySelectorAll('[data-checklist]').forEach((checklist) => {
  const storageKey = checklist.dataset.checklist || 'tle-progress';
  const boxes = [...checklist.querySelectorAll('input[type="checkbox"]')];
  const bar = checklist.querySelector('[data-progress]');
  const copy = checklist.querySelector('[data-progress-copy]');
  const reset = checklist.querySelector('[data-reset-progress]');
  const download = checklist.querySelector('[data-download-progress]');

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    boxes.forEach((box, index) => { box.checked = Boolean(saved[index]); });
  } catch (_) {
    // The checklist still works even when storage is unavailable.
  }

  function updateProgress() {
    const state = boxes.map((box) => box.checked);
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch (_) {}
    const checked = state.filter(Boolean).length;
    const total = boxes.length;
    if (bar) bar.style.width = `${total ? (checked / total) * 100 : 0}%`;
    if (copy) copy.textContent = checked === total
      ? `${checked} of ${total} checked — complete for now.`
      : `${checked} of ${total} checked — saved on this device.`;
  }

  boxes.forEach((box) => box.addEventListener('change', updateProgress));
  reset?.addEventListener('click', () => {
    boxes.forEach((box) => { box.checked = false; });
    updateProgress();
  });
  download?.addEventListener('click', () => {
    const lines = boxes.map((box) => `${box.checked ? '✓' : '□'} ${box.closest('label')?.innerText.trim() || ''}`);
    const blob = new Blob([`The Latin Experiment — progress note\n\n${lines.join('\n')}\n`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${storageKey}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  });

  updateProgress();
});
