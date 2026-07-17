const navToggle=document.querySelector(".nav-toggle");const siteNav=document.querySelector(".site-nav");
const setNav=open=>{navToggle?.setAttribute("aria-expanded",String(open));siteNav?.classList.toggle("open",open);document.body.classList.toggle("nav-open",open)};
navToggle?.addEventListener("click",()=>setNav(navToggle.getAttribute("aria-expanded")!=="true"));
siteNav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setNav(false)));

const items=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){const ob=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");ob.unobserve(e.target)}}),{threshold:.1});items.forEach(i=>ob.observe(i))}else{items.forEach(i=>i.classList.add("visible"))}

document.querySelectorAll(".reveal-answer").forEach(button=>button.addEventListener("click",()=>{const answer=button.nextElementSibling;const open=button.getAttribute("aria-expanded")==="true";button.setAttribute("aria-expanded",String(!open));button.textContent=open?"Reveal answer":"Hide answer";if(answer)answer.hidden=open}));

document.querySelectorAll("[data-checklist]").forEach(checklist=>{
  const key=checklist.dataset.checklist;const boxes=[...checklist.querySelectorAll('input[type="checkbox"]')];const bar=checklist.querySelector("[data-progress]");const copy=checklist.querySelector("[data-progress-copy]");
  try{const saved=JSON.parse(localStorage.getItem(key)||"[]");boxes.forEach((b,i)=>b.checked=Boolean(saved[i]))}catch{}
  const update=()=>{const states=boxes.map(b=>b.checked);try{localStorage.setItem(key,JSON.stringify(states))}catch{}const n=states.filter(Boolean).length;if(bar)bar.style.width=`${n/states.length*100}%`;if(copy)copy.textContent=`${n} of ${states.length} checked.`};
  boxes.forEach(b=>b.addEventListener("change",update));
  checklist.querySelector("[data-reset-progress]")?.addEventListener("click",()=>{boxes.forEach(b=>b.checked=false);update()});
  checklist.querySelector("[data-download-progress]")?.addEventListener("click",()=>{const lines=boxes.map(b=>`${b.checked?"✓":"□"} ${b.nextElementSibling?.textContent||""}`);const blob=new Blob([lines.join("\n")],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`${key}-progress.txt`;a.click();URL.revokeObjectURL(a.href)});
  update();
});