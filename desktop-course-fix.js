(() => {
  const style = document.createElement('style');
  style.textContent = `
    .mobile-list{display:none}
    @media (min-width:901px){
      .mobile-catalogue,.mobile-list{display:none!important}
      .path-grid{grid-template-columns:repeat(auto-fit,minmax(145px,1fr))}
      .audio-grid{grid-template-columns:minmax(0,1.25fr) minmax(240px,.75fr)}
      .audio-card{overflow:hidden}
      .hero-visual .latin{font-size:clamp(42px,4vw,68px);max-width:100%;overflow-wrap:anywhere;text-align:center}
    }
    @media (min-width:901px) and (max-width:1380px){
      .lesson-grid{grid-template-columns:1fr}
      .side-column{grid-template-columns:repeat(2,minmax(0,1fr))}
      .manifesto{grid-column:1/-1;min-height:220px}
      .hero{grid-template-columns:minmax(0,1fr) minmax(230px,.72fr)}
      h1{font-size:clamp(64px,7vw,88px)}
    }
    @media (min-width:901px) and (max-width:1120px){
      .hero{grid-template-columns:1fr}
      .hero-visual{min-height:260px}
      .side-column{grid-template-columns:1fr}
    }
  `;
  document.head.appendChild(style);

  const audioGrid = document.querySelector('.audio-grid');
  if (audioGrid) {
    audioGrid.innerHTML = `
      <article class="audio-card">
        <h3>One honest recording</h3>
        <span class="tag">learner recording · after the lesson</span>
        <p>Alan records the lesson once, after working through the text. It is evidence of learning, not an authoritative pronunciation guide.</p>
        <div class="audio-placeholder"><button class="play" disabled aria-label="Recording not yet available">▶</button><span>Recording to be added after study</span><span class="audio-line"></span></div>
        <strong>My interpretation</strong>
        <p>This will be Alan’s own brief account of what he understood. Corrections and thoughtful feedback are welcome.</p>
      </article>
      <article class="audio-card">
        <h3>Your study sequence</h3>
        <ol style="margin:12px 0 0;padding-left:1.25rem;color:#5f5651;font-size:13px;line-height:1.65">
          <li>Read the whole lesson once without stopping to perfect it.</li>
          <li>Write the key vocabulary with its English equivalent.</li>
          <li>Write out the story and exercises presented in the lesson.</li>
          <li>Reread the lesson aloud.</li>
          <li>Underline words that remain difficult or unclear and look them up in a dictionary.</li>
          <li>Record one final reading and note what you now understand.</li>
        </ol>
      </article>`;
  }

  const pathHeading = document.querySelector('#pathGrid')?.previousElementSibling;
  if (pathHeading) {
    const p = pathHeading.querySelector('p');
    if (p) p.textContent = 'Six guided actions: read, write, copy, reread, check and record.';
  }

  const pathGrid = document.getElementById('pathGrid');
  if (pathGrid) {
    pathGrid.innerHTML = `
      <button class="path-card" style="--stage:#8e1530" aria-expanded="false"><div class="colour"></div><div class="inside"><span class="path-number">1</span><h3>Lege</h3><span class="eng">Read</span><p>Read the complete lesson once.</p><div class="path-detail">Keep moving. The first reading is for contact with the whole lesson, not perfection.</div></div></button>
      <button class="path-card" style="--stage:#244b9b" aria-expanded="false"><div class="colour"></div><div class="inside"><span class="path-number">2</span><h3>Verba scribe</h3><span class="eng">Write vocabulary</span><p>Write each key word with its English equivalent.</p><div class="path-detail">Use your notebook. Add only the meaning needed for this lesson.</div></div></button>
      <button class="path-card" style="--stage:#c78b13" aria-expanded="false"><div class="colour"></div><div class="inside"><span class="path-number">3</span><h3>Exempla scribe</h3><span class="eng">Copy the lesson</span><p>Write out the story and exercises.</p><div class="path-detail">Handwriting slows the lesson down enough for forms and patterns to become visible.</div></div></button>
      <button class="path-card" style="--stage:#71307b" aria-expanded="false"><div class="colour"></div><div class="inside"><span class="path-number">4</span><h3>Iterum lege</h3><span class="eng">Reread aloud</span><p>Read the complete lesson aloud again.</p><div class="path-detail">Attend to phrasing, endings and meaning rather than speed.</div></div></button>
      <button class="path-card" style="--stage:#2e7051" aria-expanded="false"><div class="colour"></div><div class="inside"><span class="path-number">5</span><h3>Verifica</h3><span class="eng">Check</span><p>Underline difficult words and consult a dictionary.</p><div class="path-detail">Correct uncertainty after the second encounter, not during the first reading.</div></div></button>
      <button class="path-card" style="--stage:#8b4d10" aria-expanded="false"><div class="colour"></div><div class="inside"><span class="path-number">6</span><h3>Recita</h3><span class="eng">Record once</span><p>Make one honest final recording.</p><div class="path-detail">Add a short personal interpretation and invite correction where appropriate.</div></div></button>`;

    pathGrid.querySelectorAll('.path-card').forEach(card => {
      card.addEventListener('click', () => {
        const next = card.getAttribute('aria-expanded') !== 'true';
        card.setAttribute('aria-expanded', String(next));
      });
    });
  }
})();