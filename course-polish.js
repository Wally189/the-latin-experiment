(()=>{
  const style=document.createElement('style');
  style.textContent=`
    @media(min-width:901px){
      .frame{grid-template-rows:auto auto 1fr!important}
      .global-nav{grid-row:1/4!important}
      .mobile-catalogue{grid-row:1!important}
      .mobile-list{grid-row:2!important;max-height:32vh!important;padding:12px 20px 14px!important}
      .app{grid-row:3!important}
      .mobile-catalogue .toggle{min-width:230px!important;padding:13px 24px!important;font-size:16px!important;border:2px solid var(--gold)!important;box-shadow:0 5px 15px rgba(30,10,8,.12)!important}
      .brand-mark{background:transparent!important;border:2px solid var(--gold)!important;color:var(--gold)!important;font-size:28px!important}
    }
    .interpretation-note::before{content:"Alan’s note: ";font-weight:900;color:var(--ink)}
    .lede a{color:inherit;font-weight:800;text-decoration-color:var(--gold);text-decoration-thickness:2px;text-underline-offset:3px}
  `;
  document.head.appendChild(style);

  const mark=document.querySelector('.brand-mark');
  if(mark){mark.textContent='✠';mark.setAttribute('aria-hidden','true')}

  const lede=document.querySelector('.hero .lede');
  if(lede&&!lede.querySelector('a')){
    lede.innerHTML=lede.innerHTML.replace('Father William Most’s course','<a href="index.html#materials">Father William Most’s course</a>');
  }

  const note=document.querySelector('.interpretation-note');
  if(note&&note.textContent.trim().startsWith('Alan’s note:')){
    note.textContent=note.textContent.trim().replace(/^Alan’s note:\s*/,'');
  }

  const toggle=document.getElementById('mobileToggle');
  const list=document.getElementById('mobileList');
  const labelToggle=()=>{if(toggle&&list)toggle.textContent=list.classList.contains('open')?'Hide lesson list':'Show all 81 lessons'};
  labelToggle();
  toggle?.addEventListener('click',()=>setTimeout(labelToggle,0));

  const observer=new MutationObserver(()=>{
    const currentLede=document.querySelector('.hero .lede');
    if(currentLede&&!currentLede.querySelector('a'))currentLede.innerHTML=currentLede.innerHTML.replace('Father William Most’s course','<a href="index.html#materials">Father William Most’s course</a>');
    const currentMark=document.querySelector('.brand-mark');if(currentMark)currentMark.textContent='✠';
  });
  const page=document.getElementById('lessonPage');if(page)observer.observe(page,{childList:true,subtree:true});
})();