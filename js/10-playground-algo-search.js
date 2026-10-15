/* ═══ PLAYGROUND ═══ */
function runPlayground(){
  const code=document.getElementById('pgCode').value;
  const iframe=document.getElementById('pgPreview');
  const doc=iframe.contentDocument||iframe.contentWindow.document;
  doc.open();doc.write(code);doc.close();
  document.getElementById('pgStatus').textContent='✓ Running';
  showToast('Code executed!','s',2000);
}
function copyPlaygroundCode(){
  navigator.clipboard.writeText(document.getElementById('pgCode').value)
    .then(()=>showToast('Code copied to clipboard!','s',2000));
}
function resetPlayground(){
  document.getElementById('pgCode').value=`<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body { background:#03050d;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;font-family:sans-serif; }\n  h1 { color:#00ffe5;font-size:2rem; }\n</style>\n</head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>`;
  runPlayground();
}
document.getElementById('pgCode').addEventListener('keydown',e=>{
  if(e.ctrlKey&&e.key==='Enter'){e.preventDefault();runPlayground();}
});
// Run on load
setTimeout(runPlayground, 500);

function downloadPlayground(){
  const code=document.getElementById('pgCode').value;
  const blob=new Blob([code],{type:'text/html'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='playground.html';a.click();
  URL.revokeObjectURL(a.href);showToast('Playground downloaded!','s',2000);
}

/* ═══ CSS ART INFO POPUP ═══ */
function showCssArtInfo(title,desc){
  showSkillPop(title,'🎨',desc+'\n\nThis is created purely with CSS — no images, no SVG, no JavaScript rendering. A testament to CSS\'s expressive power.');
  const code=(typeof CSS_ART_CODE!=='undefined')&&CSS_ART_CODE[title];
  if(code){
    document.getElementById('spCode').textContent=code;
    document.getElementById('spCodeWrap').hidden=false;
    document.querySelector('#skillPopBg .skill-pop').classList.add('sp-wide');
  }
}

/* ═══ SEARCH OVERLAY ═══ */
const SEARCH_INDEX=[
  {title:'Pharmacology Hub',sub:'Drug profiles, doses, mechanisms',icon:'💊',href:'#anesthesia-hub'},
  {title:'Propofol',sub:'Induction agent — GABA-A agonist',icon:'💉',href:'#anesthesia-hub'},
  {title:'Ketamine',sub:'Dissociative NMDA antagonist',icon:'💉',href:'#anesthesia-hub'},
  {title:'Fentanyl',sub:'Synthetic opioid analgesia',icon:'💉',href:'#anesthesia-hub'},
  {title:'Malignant Hyperthermia Protocol',sub:'Emergency protocol — dantrolene',icon:'🚨',href:'#anesthesia-hub'},
  {title:'Airway Assessment',sub:'Mallampati, LEMON, Cormack-Lehane',icon:'🫁',href:'#anesthesia-hub'},
  {title:'Dose Calculator',sub:'Weight-based drug dose calculator',icon:'🧮',href:'#anesthesia-hub'},
  {title:'Vital Signs Monitor',sub:'Live patient monitoring simulation',icon:'🫀',href:'#anesthesia-hub'},
  {title:'Anesthesia Quiz',sub:'25 clinical knowledge questions',icon:'🧠',href:'#anesthesia-hub'},
  {title:'Regional Anesthesia',sub:'Spinal, epidural, nerve blocks',icon:'💉',href:'#anesthesia-hub'},
  {title:'ASA Classification',sub:'Physical status grading system',icon:'📋',href:'#anesthesia-hub'},
  {title:'Code Playground',sub:'Live HTML/CSS/JS editor',icon:'🧑‍💻',href:'#webdev-mastery'},
  {title:'CSS Art Gallery',sub:'Pure CSS creations',icon:'🎨',href:'#webdev-mastery'},
  {title:'Web Vitals Dashboard',sub:'Performance metrics',icon:'⚡',href:'#webdev-mastery'},
  {title:'Projects',sub:'Selected work and case studies',icon:'💼',href:'#projects'},
  {title:'Skills',sub:'Technical expertise and tools',icon:'⚙️',href:'#skills'},
  {title:'Gallery',sub:'Photos and videos with download',icon:'📸',href:'#gallery'},
  {title:'Contact',sub:'Get in touch — hire me',icon:'✉️',href:'#contact'},
  {title:'Publications',sub:'Articles and research notes',icon:'📝',href:'#publications'},
  {title:'Certifications',sub:'Credentials and training',icon:'🏆',href:'#certifications'},
  {title:'Experience',sub:'Career journey timeline',icon:'📅',href:'#experience'},
];
const searchBtn=document.getElementById('searchBtn');
const searchClose=document.getElementById('searchClose');
const searchOverlay=document.getElementById('searchOverlay');
const searchInput=document.getElementById('searchInput');
const searchResults=document.getElementById('searchResults');
function openSearch(){searchOverlay.classList.add('open');setTimeout(()=>searchInput.focus(),100);searchResults.innerHTML='<div class="search-result"><span class="search-result__icon">🔍</span><div><div class="search-result__title">Start typing to search…</div><div class="search-result__sub">Search across drugs, protocols, projects, and more</div></div></div>';}
function closeSearch(){searchOverlay.classList.remove('open');searchInput.value='';}
searchBtn.addEventListener('click',openSearch);
searchClose.addEventListener('click',closeSearch);
searchInput.addEventListener('input',()=>{
  const q=searchInput.value.toLowerCase().trim();
  if(!q){searchResults.innerHTML='';return;}
  const matches=SEARCH_INDEX.filter(item=>item.title.toLowerCase().includes(q)||item.sub.toLowerCase().includes(q));
  searchResults.innerHTML=matches.slice(0,8).map(item=>`
    <a class="search-result" href="${item.href}" onclick="closeSearch()">
      <span class="search-result__icon">${item.icon}</span>
      <div><div class="search-result__title">${item.title}</div><div class="search-result__sub">${item.sub}</div></div>
    </a>
  `).join('')||(matches.length===0?'<div style="text-align:center;padding:1rem;color:var(--c-txt3);">No results found for "'+q+'"</div>':'');
});
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();openSearch();}
});

