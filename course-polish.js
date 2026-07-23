(()=>{
  const style=document.createElement('style');
  style.textContent=`
    @media(min-width:901px){
      html{background:#efe3d6!important}
      body{margin:0!important;padding:2vw!important;background:#efe3d6!important}
      .shell{width:100%!important;max-width:none!important;min-height:96vh!important;margin:0!important;padding:0!important}
      .frame{width:100%!important;min-height:96vh!important;margin:0!important;grid-template-rows:auto auto 1fr!important;border:10px solid var(--ink)!important;border-radius:26px!important;background:linear-gradient(to right,var(--ink) 0 105px,#fff 105px 100%)!important;box-shadow:none!important}
      .global-nav{grid-row:1/4!important;width:105px!important;min-width:105px!important;height:calc(96vh - 20px)!important;margin:0!important;padding:20px 9px!important;gap:0!important}
      .mobile-catalogue{grid-row:1!important}
      .mobile-list{grid-row:2!important;max-height:32vh!important;padding:12px 20px 14px!important}
      .app{grid-row:3!important}
      .mobile-catalogue .toggle{min-width:230px!important;padding:13px 24px!important;font-size:16px!important;border:2px solid var(--gold)!important;box-shadow:0 5px 15px rgba(30,10,8,.12)!important}
      .brand{margin:0 auto 30px!important}
      .brand-mark{display:grid!important;place-items:center!important;width:55px!important;height:55px!important;margin:0 auto!important;border:0!important;border-radius:50%!important;background:var(--gold)!important;color:var(--ink)!important;font-size:29px!important;line-height:1!important}
      .nav-links{gap:0!important}
      .nav-links a{display:flex!important;flex-direction:column!important;min-height:0!important;align-items:center!important;justify-content:center!important;margin:3px 0!important;padding:13px 3px!important;border-radius:12px!important;color:#aaa!important;text-align:center!important;line-height:1.2!important}
      .nav-links a:hover,.nav-links a:focus-visible,.nav-links a[aria-current="page"]{color:#fff!important;background:#35100e!important;box-shadow:inset 3px 0 var(--gold)!important;outline:none!important}
    }
    .interpretation-note::before{content:"Alan’s note: ";font-weight:900;color:var(--ink)}
    .lede a{color:inherit;font-weight:800;text-decoration-color:var(--gold);text-decoration-thickness:2px;text-underline-offset:3px}
  `;
  document.head.appendChild(style);

  const toggle=document.getElementById('mobileToggle');
  const list=document.getElementById('mobileList');
  const labelToggle=()=>{
    if(toggle&&list){
      toggle.textContent=list.classList.contains('open')?'Hide lesson list':'Show all 81 lessons';
    }
  };
  labelToggle();
  toggle?.addEventListener('click',()=>setTimeout(labelToggle,0));
})();