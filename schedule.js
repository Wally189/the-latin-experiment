(() => {
  const dateInput = document.getElementById('date');
  const sessionsSelect = document.getElementById('sessions');
  const goal = document.getElementById('goal');
  const blocksTarget = document.getElementById('miles');
  const scheduleStatus = document.getElementById('scheduleStatus');
  const scheduleMethod = document.querySelector('.schedule-method');
  if (!dateInput || !sessionsSelect || !goal || !blocksTarget) return;

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const formatDate = date => date.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  const addDays = (date, days) => { const result = new Date(date); result.setDate(result.getDate() + days); return result; };
  const terminologyReturn = encodeURIComponent('index.html#schedule');

  let course = null;
  let terminologyAliases = [];
  let terminologyPattern = null;

  function prepareTerminology(terms) {
    const aliases = [];
    (terms || []).forEach(term => {
      (term.aliases || []).forEach(alias => aliases.push({alias, id:term.id}));
      aliases.push({alias:term.term, id:term.id});
    });
    const unique = new Map();
    aliases.forEach(item => {
      const key = item.alias.toLowerCase();
      if (!unique.has(key)) unique.set(key,item);
    });
    terminologyAliases = [...unique.values()].sort((a,b) => b.alias.length - a.alias.length);
    if (terminologyAliases.length) terminologyPattern = new RegExp('(^|[^A-Za-z])(' + terminologyAliases.map(item => escapeRegExp(item.alias)).join('|') + ')(?=$|[^A-Za-z])','gi');
  }

  function linkTerms(value) {
    const safe = escapeHtml(value);
    if (!terminologyPattern) return safe;
    return safe.replace(terminologyPattern,(whole,prefix,matched) => {
      const item = terminologyAliases.find(candidate => candidate.alias.toLowerCase() === matched.toLowerCase());
      if (!item) return whole;
      const href = `terminology.html?term=${encodeURIComponent(item.id)}&return=${terminologyReturn}#${encodeURIComponent(item.id)}`;
      return `${prefix}<a class="term-link" href="${href}" title="Explain ${escapeHtml(matched)} in plain English">${matched}</a>`;
    });
  }

  function plannedDate(start, completedLessons, daysEachWeek) {
    if (completedLessons <= 1) return start;
    return addDays(start, Math.ceil(((completedLessons - 1) * 7) / daysEachWeek));
  }

  function renderPlan() {
    if (!course) return;
    const start = new Date((dateInput.value || new Date().toISOString().slice(0,10)) + 'T12:00');
    const daysEachWeek = Number(sessionsSelect.value);
    const weeks = Math.ceil(course.totalLessons / daysEachWeek);
    const finish = plannedDate(start, course.totalLessons, daysEachWeek);
    const totalMinutesLow = course.totalLessons * 30;
    const totalMinutesHigh = course.totalLessons * 45;

    goal.innerHTML = `<span class="goal-label">Suggested target</span><h2>${formatDate(finish)}</h2><p><strong>About ${weeks} weeks</strong> at ${daysEachWeek} study ${daysEachWeek === 1 ? 'day' : 'days'} each week.</p><small>${course.totalLessons} textbook lessons · roughly ${Math.round(totalMinutesLow/60)}–${Math.round(totalMinutesHigh/60)} focused hours in total.</small>`;

    blocksTarget.innerHTML = course.blocks.map((block,index) => {
      const targetDate = plannedDate(start, block.to, daysEachWeek);
      const outcomes = block.outcomes.map(outcome => `<li>${linkTerms(outcome)}</li>`).join('');
      return `<details class="schedule-block" style="--block:${escapeHtml(block.colour)}"><summary><span class="block-number">${index + 1}</span><span class="block-summary-copy"><small>Lessons ${block.from}–${block.to}</small><strong>${linkTerms(block.title)}</strong><em>Suggested point: ${formatDate(targetDate)}</em></span><span class="block-toggle"><span class="open-word">Open</span><span class="close-word">Close</span> block <b>＋</b></span></summary><div class="block-body"><section><h3>How the course develops here</h3><p>${linkTerms(block.method)}</p></section><section><h3>After this block, you should be able to</h3><ul>${outcomes}</ul></section><p class="block-caution">These are practical learning aims, not an accredited level or a promise that every learner will progress at the same speed.</p></div></details>`;
    }).join('');
    blocksTarget.querySelectorAll('.schedule-block').forEach(block => { block.open = false; });
    if (scheduleStatus) scheduleStatus.textContent = `${daysEachWeek} study ${daysEachWeek === 1 ? 'day' : 'days'} each week · ${course.sessionMinutes} minutes each day`;
  }

  dateInput.value = new Date().toISOString().slice(0,10);
  dateInput.addEventListener('change',renderPlan);
  sessionsSelect.addEventListener('change',renderPlan);

  Promise.all([
    fetch('schedule-blocks.json',{cache:'no-store'}).then(response => { if (!response.ok) throw new Error('The course schedule could not be loaded.'); return response.json(); }),
    fetch('terminology-data.json',{cache:'no-store'}).then(response => { if (!response.ok) throw new Error('The terminology guide could not be loaded.'); return response.json(); })
  ]).then(([scheduleData,terminologyData]) => { course = scheduleData; prepareTerminology(terminologyData.terms || []); renderPlan(); }).catch(error => { blocksTarget.innerHTML = `<div class="schedule-error"><strong>Schedule unavailable.</strong><br>${escapeHtml(error.message)}</div>`; });

  if (scheduleMethod && !scheduleMethod.querySelector('.terminology-guide-link')) scheduleMethod.insertAdjacentHTML('beforeend',`<p class="terminology-note"><strong>New to grammar terminology?</strong> Highlighted words open a plain-English explanation. You can also <a class="terminology-guide-link" href="terminology.html?return=${terminologyReturn}">browse the complete terminology guide →</a></p>`);

  const style = document.createElement('style');
  style.textContent = `
    .schedule-lede{max-width:850px;font-size:17px;line-height:1.7}.daily-target{display:grid;grid-template-columns:auto minmax(0,1fr);gap:16px;align-items:center;margin:20px 0 26px;padding:18px 20px;border:1px solid #e4d3a6;border-radius:17px;background:linear-gradient(135deg,#fff7d9,#fffdf5)}
    .daily-target .clock{display:flex;align-items:center;justify-content:center;width:64px;height:64px;padding:0;border-radius:50%;background:var(--gold);color:var(--ink);font:bold 18px/1 Georgia,serif;text-align:center;font-variant-numeric:tabular-nums}.daily-target h2{margin:0 0 4px;font-size:23px}.daily-target p{margin:0;color:#655744;line-height:1.55}
    .schedule-plan{align-items:start}.schedule-builder{position:sticky;top:20px}.schedule-builder .field-help{display:block;margin:-8px 0 14px;color:#d9cbc4;font-size:12px;line-height:1.45}.schedule-method{margin-bottom:18px;padding:18px;border-left:6px solid var(--blue);border-radius:0 15px 15px 0;background:#f3f6ff;color:#4f5667;line-height:1.65}.schedule-method strong{color:var(--ink)}.terminology-note{margin:13px 0 0;padding-top:13px;border-top:1px solid #d6def1}.terminology-guide-link{color:var(--burgundy);font-weight:900;text-decoration-thickness:2px;text-underline-offset:3px}
    #goal{margin-top:9px}#goal .goal-label{display:block;font-size:10px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}#goal h2{margin:8px 0;font-size:27px}#goal p{margin:0 0 7px;line-height:1.45}#goal small{display:block;line-height:1.45}.schedule-status{display:inline-block;margin:0 0 12px;padding:7px 11px;border-radius:999px;background:#efe7df;color:#5d5049;font-size:12px;font-weight:800}.block-list{display:grid;gap:12px}.schedule-block{overflow:hidden;border:1px solid #ddd5cf;border-left:8px solid var(--block);border-radius:17px;background:#fff;box-shadow:0 5px 16px rgba(25,8,6,.04)}
    .schedule-block summary{display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:13px;align-items:center;padding:17px;cursor:pointer;list-style:none}.schedule-block summary::-webkit-details-marker{display:none}.block-number{display:flex;align-items:center;justify-content:center;width:40px;height:40px;padding:0;border-radius:50%;background:var(--block);color:#fff;font:bold 16px/1 Georgia,serif;text-align:center;font-variant-numeric:tabular-nums}.block-summary-copy small,.block-summary-copy strong,.block-summary-copy em{display:block}.block-summary-copy small{color:var(--block);font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}.block-summary-copy strong{margin:3px 0;font:700 19px Georgia,serif}.block-summary-copy em{color:#746963;font-size:12px;font-style:normal}
    .block-toggle{padding:8px 10px;border-radius:9px;background:#f3eee9;color:#4c403a;font-size:11px;font-weight:900;white-space:nowrap}.block-toggle b{display:inline-block;margin-left:3px;font-size:16px;transition:transform .2s ease}.close-word{display:none}.schedule-block[open] .open-word{display:none}.schedule-block[open] .close-word{display:inline}.schedule-block[open] .block-toggle b{transform:rotate(45deg)}.block-body{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 20px 20px;border-top:1px solid #eee6e1;background:#fffdfb}.block-body section{padding-top:18px}.block-body h3{margin:0 0 9px;font-size:18px}.block-body p,.block-body li{color:#5e5550;line-height:1.6}.block-body ul{margin:0;padding-left:20px}.block-body li+li{margin-top:7px}.block-caution{grid-column:1/-1;margin:0!important;padding:12px 14px;border-radius:11px;background:#f7f3ef;font-size:12px!important}.term-link{color:var(--burgundy);font-weight:800;text-decoration:underline;text-decoration-style:dotted;text-decoration-thickness:2px;text-underline-offset:3px}.schedule-error{padding:20px;border:1px solid #d8b4b4;border-radius:14px;background:#fff5f5;color:#7a2222}@media(max-width:900px){.schedule-builder{position:static}.block-body{grid-template-columns:1fr}}@media(max-width:620px){.daily-target{grid-template-columns:1fr}.schedule-block summary{grid-template-columns:40px minmax(0,1fr)}.block-toggle{grid-column:1/-1;text-align:center}}
  `;
  document.head.appendChild(style);
})();

import('./certificates.js').catch(() => {});