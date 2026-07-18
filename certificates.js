(() => {
  const section = document.querySelector('[data-v="certificates"]');
  if (!section) return;

  const milestones = [
    {
      code: 'Pre-A1',
      lessons: 1,
      roman: 'I',
      colour: 'var(--burgundy)',
      title: 'The first complete experiment',
      description: 'Complete one full cycle: first reading, vocabulary, handwriting, study, second reading and reflection.'
    },
    {
      code: 'Early A1',
      lessons: 5,
      roman: 'V',
      colour: 'var(--gold)',
      title: 'Recognition begins to settle',
      description: 'Recognise recurring vocabulary, familiar endings and the first basic sentence patterns across several readings.'
    },
    {
      code: 'A1',
      lessons: 10,
      roman: 'X',
      colour: 'var(--blue)',
      title: 'A working foundation',
      description: 'Follow the broad movement of short adapted Latin readings and identify common forms without translating every word first.'
    },
    {
      code: 'A1+',
      lessons: 20,
      roman: 'XX',
      colour: 'var(--purple)',
      title: 'Beyond isolated sentences',
      description: 'Read more connected passages and recognise a growing range of noun, adjective and verb forms with support.'
    },
    {
      code: 'A2',
      lessons: 40,
      roman: 'XL',
      colour: 'var(--burgundy)',
      title: 'Connected reading',
      description: 'Work through increasingly complex prose involving time, voice, pronouns and connected clauses.'
    },
    {
      code: 'A2+ / B1 pathway',
      lessons: 81,
      roman: 'LXXXI',
      colour: 'var(--green)',
      title: 'Volume I completed',
      description: 'Complete Father Most’s first-year course with experience of the principal cases, tenses, voices and moods introduced in Volume I.'
    }
  ];

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));

  function completedCount() {
    if (window.LatinExperimentProgress) return window.LatinExperimentProgress.count();
    try {
      const parsed = JSON.parse(localStorage.getItem('latinExperiment.completedLessons.v1') || '[]');
      return Array.isArray(parsed) ? new Set(parsed.map(Number).filter(Number.isInteger)).size : 0;
    } catch (error) {
      return 0;
    }
  }

  function render(completedLessons) {
    const currentMilestone = [...milestones].reverse().find(item => completedLessons >= item.lessons);
    const nextMilestone = milestones.find(item => completedLessons < item.lessons);
    const percentage = Math.min(100, Math.round((completedLessons / 81) * 100));

    section.innerHTML = `
      <h1>Certificates</h1>
      <p class="muted certificate-intro">A visual record of your progress through Father William Most’s first-year course, from the first completed lesson to the end of Volume I.</p>

      <div class="certificate-note">
        <strong>Indicative comparison, not an accredited qualification.</strong>
        <p>CEFR levels describe a broad mix of listening, speaking, reading and writing in living languages. These labels are used only as a familiar way to show increasing reading difficulty and independence within this Latin course.</p>
      </div>

      <section class="progress-panel" aria-label="Course progress">
        <div>
          <span class="progress-label">Recorded progress on this device</span>
          <h2>${completedLessons} of 81 lessons</h2>
          <p>${currentMilestone ? `Current indicative stage: <strong>${escapeHtml(currentMilestone.code)}</strong>.` : 'Complete Lesson I to reach the first indicative stage.'} ${nextMilestone ? `The next milestone is ${escapeHtml(nextMilestone.code)} at Lesson ${nextMilestone.lessons}.` : 'Volume I is complete.'}</p>
        </div>
        <div class="progress-ring" style="--progress:${percentage * 3.6}deg"><span>${percentage}%</span></div>
        <div class="progress-track"><span style="width:${percentage}%"></span></div>
      </section>

      <div class="certificate-grid">
        ${milestones.map(milestone => {
          const unlocked = completedLessons >= milestone.lessons;
          const remaining = Math.max(0, milestone.lessons - completedLessons);
          return `
            <article class="certificate-card ${unlocked ? 'unlocked' : 'locked'}" style="--certificate:${milestone.colour}">
              <div class="certificate-top">
                <span class="certificate-medal">${escapeHtml(milestone.roman)}</span>
                <span class="certificate-status">${unlocked ? 'Reached' : 'Locked'}</span>
              </div>
              <span class="certificate-level">${escapeHtml(milestone.code)}</span>
              <h2>${escapeHtml(milestone.title)}</h2>
              <p>${escapeHtml(milestone.description)}</p>
              <div class="certificate-threshold"><strong>Lesson ${milestone.lessons}</strong><span>${unlocked ? 'Milestone reached' : `${remaining} ${remaining === 1 ? 'lesson' : 'lessons'} to go`}</span></div>
            </article>`;
        }).join('')}
      </div>

      <div class="certificate-footer-note"><strong>What completion means here:</strong> these stages follow the lessons you mark complete in this browser. They do not claim that Father Most assigned CEFR levels to his book, or that selecting a check automatically proves mastery.</div>`;
  }

  const style = document.createElement('style');
  style.textContent = `
    .certificate-intro{max-width:850px;font-size:17px;line-height:1.65}
    .certificate-note{margin:20px 0;padding:18px 20px;border-left:6px solid var(--gold);border-radius:0 15px 15px 0;background:#fff7dd;color:#5d5038;line-height:1.6}.certificate-note strong{color:var(--ink)}.certificate-note p{margin:6px 0 0}
    .progress-panel{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:20px;align-items:center;margin:24px 0;padding:24px;border-radius:20px;color:#fff;background:linear-gradient(135deg,var(--ink),#4d1118)}.progress-panel h2{margin:5px 0 7px;font-size:31px}.progress-panel p{margin:0;color:#e4d8d2;line-height:1.55}.progress-label{color:var(--gold);font-size:10px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}.progress-ring{display:grid;place-items:center;width:92px;height:92px;border-radius:50%;background:conic-gradient(var(--gold) var(--progress),rgba(255,255,255,.15) 0);position:relative}.progress-ring:after{content:"";position:absolute;width:70px;height:70px;border-radius:50%;background:#32100f}.progress-ring span{position:relative;z-index:1;font:bold 19px Georgia,serif}.progress-track{grid-column:1/-1;overflow:hidden;height:9px;border-radius:999px;background:rgba(255,255,255,.14)}.progress-track span{display:block;height:100%;border-radius:inherit;background:var(--gold)}
    .certificate-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}.certificate-card{position:relative;overflow:hidden;min-height:310px;padding:22px;border:1px solid #e1d7d0;border-top:8px solid var(--certificate);border-radius:19px;background:#fff;box-shadow:0 6px 18px rgba(25,8,6,.05)}.certificate-card.locked{opacity:.58;filter:saturate(.65)}.certificate-card.unlocked{box-shadow:0 10px 27px rgba(25,8,6,.10)}.certificate-top{display:flex;align-items:center;justify-content:space-between;gap:12px}.certificate-medal{display:grid;place-items:center;width:66px;height:66px;border-radius:50%;background:var(--certificate);color:#fff;font:bold 18px Georgia,serif}.certificate-status{padding:7px 10px;border-radius:999px;background:#f1ebe6;color:#5e514b;font-size:10px;font-weight:900;text-transform:uppercase}.certificate-card.unlocked .certificate-status{background:#e5f3e9;color:#21583a}.certificate-level{display:block;margin-top:18px;color:var(--certificate);font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.certificate-card h2{margin:6px 0 9px;font-size:25px}.certificate-card p{margin:0;color:var(--muted);line-height:1.6}.certificate-threshold{position:absolute;left:22px;right:22px;bottom:20px;display:flex;justify-content:space-between;gap:10px;padding-top:14px;border-top:1px solid #e8dfda}.certificate-threshold strong{color:var(--ink)}.certificate-threshold span{color:var(--muted);font-size:12px;text-align:right}.certificate-footer-note{margin-top:20px;padding:17px;border-radius:14px;background:#f6f1ed;color:#625750;line-height:1.6}
    @media(max-width:1000px){.certificate-grid{grid-template-columns:1fr 1fr}}
    @media(max-width:650px){.progress-panel{grid-template-columns:1fr}.progress-ring{justify-self:start}.certificate-grid{grid-template-columns:1fr}.certificate-card{min-height:290px}}
    @media print{.nav,.certificate-note,.progress-panel,.certificate-footer-note{display:none!important}.app{display:block;border:0}.certificate-grid{grid-template-columns:1fr 1fr}.certificate-card.locked{display:none}.certificate-card{break-inside:avoid}}
  `;
  document.head.appendChild(style);

  const sync = () => render(completedCount());
  sync();
  window.addEventListener('latin-progress-changed', sync);
  window.addEventListener('storage', event => {
    if (event.key === 'latinExperiment.completedLessons.v1') sync();
  });
})();
