(() => {
  const card = [...document.querySelectorAll('.side-card')].find(item => item.querySelector('h3')?.textContent.trim() === 'In the Church');
  if (!card) return;

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

  fetch('church-connections.json', {cache:'no-store'})
    .then(response => {
      if (!response.ok) throw new Error('Church connection could not be loaded.');
      return response.json();
    })
    .then(data => {
      const connection = (data.connections || []).find(item => Number(item.lesson) === 1);
      if (!connection) throw new Error('No Church connection is available for this lesson.');

      const explanation = (connection.explanation || []).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('');
      const forms = (connection.forms || []).map(form => `<tr><th scope="row"><em>${escapeHtml(form.latin)}</em></th><td>${escapeHtml(form.meaning)}</td></tr>`).join('');

      card.classList.add('church-connection-card');
      card.innerHTML = `
        <span class="church-eyebrow">In the Church</span>
        <h3>${escapeHtml(connection.title)}</h3>
        <p>${escapeHtml(connection.teaser)}</p>
        <details class="church-reveal">
          <summary><span>Open the Church connection</span><b class="church-plus">＋</b></summary>
          <div class="church-body">
            <blockquote><span>${escapeHtml(connection.latin)}</span><small>${escapeHtml(connection.english)}</small></blockquote>
            ${explanation}
            <div class="church-table-wrap">
              <table>
                <thead><tr><th>Form</th><th>What it is doing</th></tr></thead>
                <tbody>${forms}</tbody>
              </table>
            </div>
            <div class="church-exercise"><strong>Notice it yourself</strong><p>${escapeHtml(connection.exercise)}</p></div>
            <a class="church-source" href="${escapeHtml(connection.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(connection.sourceLabel)} →</a>
          </div>
        </details>`;
    })
    .catch(error => {
      card.innerHTML = `<h3>In the Church</h3><p>${escapeHtml(error.message)}</p>`;
    });

  const style = document.createElement('style');
  style.textContent = `
    .church-connection-card{border-top:7px solid var(--green);background:linear-gradient(145deg,#fbfff9,#fff)}
    .church-eyebrow{display:block;margin-bottom:7px;color:var(--green);font-size:10px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}
    .church-connection-card>h3{margin-bottom:7px}
    .church-reveal{margin-top:15px;border:1px solid #cdddcf;border-radius:14px;background:#f6fbf7;overflow:hidden}
    .church-reveal summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 15px;cursor:pointer;list-style:none;font-weight:900;color:var(--ink)}
    .church-reveal summary::-webkit-details-marker{display:none}
    .church-plus{font-size:20px;line-height:1;transition:transform .2s ease}
    .church-reveal[open] .church-plus{transform:rotate(45deg)}
    .church-body{padding:0 15px 17px;color:#524943;font-size:13px;line-height:1.6}
    .church-body blockquote{margin:4px 0 17px;padding:15px;border-left:5px solid var(--green);border-radius:0 12px 12px 0;background:#fff}
    .church-body blockquote span,.church-body blockquote small{display:block}
    .church-body blockquote span{font:700 18px/1.45 Georgia,serif;color:var(--ink)}
    .church-body blockquote small{margin-top:5px;color:#6d645e}
    .church-body p{margin:0 0 12px}
    .church-table-wrap{overflow:auto;margin:16px 0}
    .church-body table{width:100%;border-collapse:collapse;background:#fff}
    .church-body th,.church-body td{padding:10px;border:1px solid #d9e3da;text-align:left;vertical-align:top}
    .church-body thead th{background:#eaf4ec;color:#294f35}
    .church-body tbody th{color:var(--burgundy);font-size:15px}
    .church-exercise{margin:16px 0;padding:13px;border-radius:12px;background:#fff7dd;border-left:5px solid var(--gold)}
    .church-exercise strong{display:block;margin-bottom:4px;color:#7d5600}
    .church-exercise p{margin:0}
    .church-source{display:inline-block;color:var(--burgundy);font-weight:900;text-decoration-thickness:2px;text-underline-offset:3px}
  `;
  document.head.appendChild(style);
})();
