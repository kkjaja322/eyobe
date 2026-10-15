/* ═══ PROJECT MODAL ═══ */
const projModal=document.getElementById('projModal');
document.getElementById('projModalClose').addEventListener('click',()=>{projModal.classList.remove('open');projModal.setAttribute('aria-hidden','true');document.body.style.overflow='';});
projModal.addEventListener('click',e=>{if(e.target===projModal){projModal.classList.remove('open');document.body.style.overflow='';}});
function openProjModal(id){
  const p=DATA.projects.find(x=>x.id===id);if(!p)return;
  document.getElementById('mHero').style.background=p.gradient;
  document.getElementById('mHero').innerHTML=`<span style="font-size:72px;z-index:1;position:relative">${p.emoji}</span><div class="modal-hero-ov"></div>`;
  document.getElementById('mBody').innerHTML=`
    <div class="modal-meta"><span class="modal-cat">${p.cat}</span>${p.status==='live'?'<span class="pbadge pb-live">Live</span>':p.status==='wip'?'<span class="pbadge pb-wip">In Progress</span>':''}${p.featured?'<span class="pbadge pb-feat">Featured</span>':''}</div>
    <div class="modal-title">${p.title}</div>
    <p class="modal-desc">${p.longDesc}</p>
    <div class="modal-highs">${p.highlights.map(h=>`<div class="modal-high"><div class="mh-ico">${h.i}</div><div class="mh-info"><h4>${h.t}</h4><p>${h.d}</p></div></div>`).join('')}</div>
    <div class="modal-stack-lbl">Tech Stack</div>
    <div class="modal-tags">${p.tech.map(t=>`<span class="modal-tag">${t}</span>`).join('')}</div>
    <div class="modal-actions"><a class="btn-primary" href="${p.links.live}" target="_blank" rel="noopener">View work→</a><a class="btn-outline" href="${p.links.github}" target="_blank" rel="noopener">COMUNICATE</a></div>`;
  projModal.classList.add('open');projModal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}

/* ═══ SKILL POPUP ═══ */
const spBg=document.getElementById('skillPopBg');
function showSkillPop(title,icon,desc){
  document.getElementById('spIco').textContent=icon||'⚡';
  document.getElementById('spTitle').textContent=title||'';
  document.getElementById('spDesc').textContent=desc||'';
  const cw=document.getElementById('spCodeWrap');if(cw)cw.hidden=true;
  spBg.querySelector('.skill-pop').classList.remove('sp-wide');
  spBg.classList.add('open');document.body.style.overflow='hidden';
}
function closeSkillPop(){spBg.classList.remove('open');document.body.style.overflow='';}
spBg.addEventListener('click',e=>{if(e.target===spBg)closeSkillPop();});

/* ═══ PROFILE MODAL ═══ */
const pmBg=document.getElementById('profileModalBg');
function openProfileModal(){pmBg.classList.add('open');document.body.style.overflow='hidden';}
function closeProfileModal(){pmBg.classList.remove('open');document.body.style.overflow='';}
pmBg.addEventListener('click',e=>{if(e.target===pmBg)closeProfileModal();});

/* ═══ SPOILER ═══ */
const SPOILER_DATA=['ኮምፒውተር ሳይንስ','ሃብተ ገብርኤል'];let spoilerIdx=0;
function revealSpoiler(el){
  if(el.classList.contains('revealed'))return;
  const pw=prompt('ለደህንነት ሲባል ማረጋገጫ ያስፈልጋል — ሚስጥር ቁጥሩን ያስገቡ:');
  if(pw==='one two three'){el.textContent=SPOILER_DATA[spoilerIdx++%SPOILER_DATA.length];el.classList.add('revealed');}
  else showToast('የተሳሳተ 암호!','e');
}

/* ═══ LANG TOGGLES ═══ */
function toggleHeroLang(){
  const el=document.getElementById('heroSubText');
  const lb=document.getElementById('heroLangTxt');
  if(el.dataset.current==='am'){el.textContent=el.dataset.en;el.dataset.current='en';lb.textContent='አማርኛ';}
  else{el.textContent=el.dataset.am;el.dataset.current='am';lb.textContent='English';}
}
function toggleBioLang(){
  const el=document.getElementById('bioText');
  if(el.dataset.current==='am'){el.innerHTML=el.dataset.en;el.dataset.current='en';}
  else{el.innerHTML=el.dataset.am;el.dataset.current='am';}
}

/* ═══ CONTACT FORM ═══ */
(function(){
  const form=document.getElementById('contactForm');
  const sbmt=document.getElementById('fSubmit');
  const sbox=document.getElementById('successBox');
  const fwrap=document.getElementById('formWrap');
  if(!form)return;
  function validate(name,value){
    if(name==='name')return value.trim().length>=2;
    if(name==='email')return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if(name==='message')return value.trim().length>=20;
    return true;
  }
  function setErr(name,show){const e=document.getElementById(name+'Err'),i=document.getElementById(name==='fn'?'fn':name==='fe'?'fe':'fm');if(e)e.classList.toggle('show',show);if(i)i.classList.toggle('err',show);}
  ['fn','fe','fm'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('blur',()=>{const vn=el.name||id;setErr(id,!validate(el.name,el.value));});});
form.addEventListener('submit', async e => {
  e.preventDefault();
  let ok = true;
  const n = document.getElementById('fn');
  const em = document.getElementById('fe');
  const msg = document.getElementById('fm');
  
  if(!validate('name', n.value)){setErr('fn',true); ok=false;} else setErr('fn',false);
  if(!validate('email', em.value)){setErr('fe',true); ok=false;} else setErr('fe',false);
  if(!validate('message', msg.value)){setErr('fm',true); ok=false;} else setErr('fm',false);
  if(!ok){ showToast('Please fix the errors above.','e'); return; }
  
  sbmt.disabled = true;
  sbmt.classList.add('loading');

  try {
    const formData = {
      access_key: '37dfdec0-7ef3-4b5a-826f-9d8fb1601351',
      subject: 'New Contact from Portfolio — ' + n.value,
      from_name: n.value,
      email: em.value,
      message: msg.value,
      topic: document.getElementById('fs').value || 'Not specified'
    };

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if(data.success){
      sbmt.disabled = false;
      sbmt.classList.remove('loading');
      fwrap.style.display = 'none';
      sbox.classList.add('show');
      showToast("✓ Message sent! I will be in touch soon.", 's');
    } else {
      throw new Error(data.message);
    }
  } catch(err) {
    sbmt.disabled = false;
    sbmt.classList.remove('loading');
    showToast('Failed to send. Please try again.', 'e');
  }
});
})();
function resetForm(){document.getElementById('formWrap').style.display='';document.getElementById('successBox').classList.remove('show');document.getElementById('contactForm').reset();}

/* ═══ TOAST ═══ */
function showToast(msg,type='i',dur=4000){
  const c=document.getElementById('toast-wrap');
  const t=document.createElement('div');
  const icons={s:'✓',e:'⚠',i:'ℹ'};const cls={s:'toast-s',e:'toast-e',i:'toast-i'};
  t.className=`toast ${cls[type]}`;t.innerHTML=`<span>${icons[type]}</span><span>${msg}</span>`;
  c.appendChild(t);requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('show')));
  setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),400);},dur);
}

/* ═══ CV DOWNLOAD (PDF — see js/14-cv-pdf.js) ═══ */
function loadJsPdf(){
  return new Promise((res,rej)=>{
    if(window.jspdf&&window.jspdf.jsPDF)return res(window.jspdf.jsPDF);
    const s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload=()=>res(window.jspdf.jsPDF);s.onerror=()=>rej(new Error('jsPDF failed to load'));
    document.head.appendChild(s);
  });
}
async function downloadCV(e){
  if(e)e.preventDefault();
  showToast('⬇ Preparing your CV (PDF)…','i');
  try{
    const [jsPDF,photo]=await Promise.all([loadJsPdf(),cvLoadPhoto(CV_DATA.photo)]);
    const doc=buildCvPdf(jsPDF,photo);
    doc.save('Eyob_Sisay_Abay_CV.pdf');
    setTimeout(()=>showToast('CV downloaded! ✓','s'),600);
  }catch(err){
    console.error(err);
    showToast('Could not create the PDF. Check your internet connection and try again.','e',5000);
  }
}

/* ═══ PARALLAX HERO CARD ═══ */
(function(){
  const card=document.querySelector('.profile-card');
  if(!card)return;
  window.addEventListener('mousemove',e=>{
    const nx=(e.clientX/window.innerWidth)-.5,ny=(e.clientY/window.innerHeight)-.5;
    card.style.transform=`perspective(900px) rotateY(${nx*8}deg) rotateX(${-ny*6}deg) translateZ(8px)`;
  },{passive:true});
  window.addEventListener('mouseleave',()=>{card.style.transform='';});
})();

/* ═══ SMOOTH ANCHORS ═══ */
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}});});

/* ═══ ESCAPE KEY ═══ */
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  [projModal,spBg,pmBg].forEach(m=>{if(m&&m.classList.contains('open')){m.classList.remove('open');document.body.style.overflow='';}});
  const lb=document.getElementById('lightbox');if(lb&&lb.classList.contains('open')){lb.classList.remove('open');document.body.style.overflow='';}
  if(document.getElementById('mobMenu').classList.contains('open')){document.getElementById('mobMenu').classList.remove('open');document.getElementById('ham').classList.remove('open');document.body.style.overflow='';}
  const so=document.getElementById('searchOverlay');if(so&&so.classList.contains('open')){so.classList.remove('open');}
  const dm=document.getElementById('drugModalBg');if(dm&&dm.classList.contains('open')){dm.classList.remove('open');document.body.style.overflow='';}
});

/* ═══ DISABLE RIGHT CLICK ═══ */
document.addEventListener('contextmenu',e=>{e.preventDefault();showToast('🔒 Content protected','i');});
document.addEventListener('keydown',e=>{if(e.keyCode===123||(e.ctrlKey&&(e.keyCode===85||e.keyCode===83))||(e.ctrlKey&&e.shiftKey&&e.keyCode===73)){e.preventDefault();}});

/* ══ INIT TOAST ══ */
setTimeout(()=>showToast('👋 Welcome to my portfolio!','i',3500),1500);

