const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

const setNav = (open) => {
  navToggle?.setAttribute('aria-expanded', String(open));
  siteNav?.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
};

navToggle?.addEventListener('click', () => {
  setNav(navToggle.getAttribute('aria-expanded') !== 'true');
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setNav(false));
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
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

const checklist = document.querySelector('[data-checklist]');
if (checklist) {
  const boxes = [...checklist.querySelectorAll('input[type="checkbox"]')];
  const bar = checklist.querySelector('[data-progress]');
  const copy = checklist.querySelector('[data-progress-copy]');

  const updateProgress = () => {
    const checked = boxes.filter((box) => box.checked).length;
    const total = boxes.length;
    if (bar) bar.style.width = `${(checked / total) * 100}%`;
    if (copy) {
      copy.textContent = checked === total
        ? `${checked} of ${total} checked — lesson complete for now.`
        : `${checked} of ${total} checked — ${checked === 0 ? 'begin when ready.' : 'keep the uncertainty visible.'}`;
    }
  };

  boxes.forEach((box) => box.addEventListener('change', updateProgress));
  updateProgress();
}
