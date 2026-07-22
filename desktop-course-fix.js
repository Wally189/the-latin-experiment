(() => {
  const style = document.createElement('style');
  style.textContent = `
    .mobile-list{display:none}
    img{max-width:100%;height:auto}
    .main-column,.side-column,.content-card,.audio-card,.path-card,.hero>*{min-width:0}
    @media (min-width:901px){
      .mobile-catalogue,.mobile-list{display:none!important}
      .lesson-page{padding:28px 32px 54px}
      .lesson-grid{grid-template-columns:minmax(0,1fr)!important}
      .side-column{grid-template-columns:repeat(2,minmax(0,1fr))!important;margin-top:24px}
      .side-column .manifesto{grid-column:1/-1;min-height:210px}
      .hero{grid-template-columns:minmax(0,1.1fr) minmax(260px,.9fr)}
      .hero-visual .latin{font-size:clamp(42px,4vw,68px);text-align:center}
      .audio-grid{grid-template-columns:1fr!important}
      .path-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}
      .lower-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
      .quick-actions{grid-template-columns:repeat(5,minmax(0,1fr))}
      h1{font-size:clamp(64px,7vw,92px)}
    }
    @media (min-width:901px) and (max-width:1180px){
      .app{grid-template-columns:230px minmax(0,1fr)}
      .hero{grid-template-columns:1fr}
      .hero-visual{min-height:250px}
      .side-column{grid-template-columns:1fr!important}
      .path-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
      .lower-grid{grid-template-columns:1fr}
      .quick-actions{grid-template-columns:repeat(2,minmax(0,1fr))}
    }
  `;
  document.head.appendChild(style);

  const byHeading = text => [...document.querySelectorAll('section')].find(s => s.querySelector('h2')?.textContent.trim().toLowerCase() === text.toLowerCase());
  const first = byHeading('First reading');
  const between = byHeading('Between the readings');
  const second = byHeading('Second reading');
  [first, between, second].forEach(s => s?.remove());

  const yourTurn = [...document.querySelectorAll('section,article')].find(el => el.querySelector('h2')?.textContent.trim().toLowerCase() === 'your turn');
  if (yourTurn && !document.getElementById('singleRecordingSequence')) {
    const section = document.createElement('section');
    section.className = 'section';
    section.id = 'singleRecordingSequence';
    section.innerHTML = `<div class="section-head"><div><h2>Work through Lesson I</h2><p>One guided sequence and one final recording.</p></div></div><div class="audio-grid"><article class="audio-card"><h3>The study sequence</h3><ol style="margin:12px 0 0;padding-left:1.3rem;color:#5f5651;font-size:14px;line-height:1.75"><li>Read the whole lesson once.</li><li>Write the key vocabulary with its English equivalent.</li><li>Write out the story and exercises.</li><li>Reread the lesson aloud.</li><li>Underline difficult words and check them in a dictionary.</li><li>Make one honest final recording and note what you now understand.</li></ol></article><article class="audio-card"><h3>One honest recording</h3><span class="tag">learner recording · after study</span><p>The recording is evidence of learning, not an authoritative pronunciation guide.</p><div class="audio-placeholder"><button class="play" disabled aria-label="Recording not yet available">▶</button><span>Recording to be added after study</span><span class="audio-line"></span></div><strong>My interpretation</strong><p>This will be Alan’s brief account of what he understood. Corrections and thoughtful feedback are welcome.</p></article></div>`;
    yourTurn.parentNode.insertBefore(section, yourTurn);
  }

  const pathGrid = document.getElementById('pathGrid');
  if (pathGrid) {
    pathGrid.style.gridTemplateColumns = 'repeat(3,minmax(0,1fr))';
  }
})();
