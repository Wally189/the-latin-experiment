(() => {
  const views = ['home', 'course', 'schedule', 'materials', 'certificates', 'contact'];
  const titles = {
    home: 'Home',
    course: 'Course',
    schedule: 'Schedule',
    materials: 'Materials',
    certificates: 'Certificates',
    contact: 'Contact'
  };

  function showCurrentView() {
    let current = window.location.hash.replace(/^#/, '') || 'home';
    if (!views.includes(current)) current = 'home';

    document.querySelectorAll('[data-v]').forEach((view) => {
      const active = view.dataset.v === current;
      view.hidden = !active;
      view.setAttribute('aria-hidden', String(!active));
    });

    document.querySelectorAll('[data-n]').forEach((link) => {
      const active = link.dataset.n === current;
      link.classList.toggle('on', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    document.title = `${titles[current]} · The Latin Experiment`;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  document.addEventListener('DOMContentLoaded', showCurrentView);
  window.addEventListener('hashchange', showCurrentView);
  showCurrentView();
})();
