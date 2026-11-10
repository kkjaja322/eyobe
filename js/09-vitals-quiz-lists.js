/* ═══ VITAL SIGNS MONITOR ═══ */
let vitalIntervals = [];
let currentScenario = 'normal';
const VITAL_SCENARIOS = {
  normal: {hr:[70,80],spo2:[96,99],sbp:[115,130],dbp:[70,85],etco2:[36,42],temp:[36.4,37.0],rr:[12,16],bis:[44,58],fio2:[40,40]},
  hypotension: {hr:[100,115],spo2:[94,97],sbp:[70,85],dbp:[40,55],etco2:[34,40],temp:[36.2,36.8],rr:[16,20],bis:[50,65],fio2:[60,60]},
  tachycardia: {hr:[130,155],spo2:[95,98],sbp:[145,165],dbp:[90,105],etco2:[37,44],temp:[36.5,37.2],rr:[18,22],bis:[45,60],fio2:[40,40]},
  desaturation: {hr:[90,110],spo2:[82,88],sbp:[105,125],dbp:[65,80],etco2:[38,46],temp:[36.3,36.9],rr:[22,28],bis:[48,62],fio2:[100,100]},
  mh: {hr:[125,155],spo2:[88,93],sbp:[155,175],dbp:[95,110],etco2:[58,75],temp:[38.9,40.5],rr:[24,30],bis:[55,70],fio2:[100,100]},
  pediatric: {hr:[90,110],spo2:[97,100],sbp:[90,105],dbp:[55,70],etco2:[34,40],temp:[36.8,37.3],rr:[20,26],bis:[42,55],fio2:[40,40]},
  obstetric: {hr:[80,95],spo2:[96,99],sbp:[105,125],dbp:[60,80],etco2:[30,36],temp:[36.5,37.1],rr:[14,18],bis:[44,58],fio2:[50,50]},
};

function randBetween(min,max){return +(min+(Math.random()*(max-min))).toFixed(1);}

function setVitalScenario(s){
  currentScenario=s;
  if(s==='mh') showToast('⚠ MH CRISIS SCENARIO — EtCO₂ rising, Temperature rising!','e',6000);
  else if(s==='desaturation') showToast('⚠ DESATURATION SCENARIO — SpO₂ falling!','e',5000);
  else if(s==='hypotension') showToast('⚠ HYPOTENSION SCENARIO — MAP critically low!','e',5000);
  else if(s==='tachycardia') showToast('⚠ TACHYCARDIA SCENARIO — HR elevated, BP rising!','e',5000);
  else showToast('Patient scenario updated: '+s,'i',3000);
}

function updateVitals(){
  const sc=VITAL_SCENARIOS[currentScenario]||VITAL_SCENARIOS.normal;
  const hr=Math.round(randBetween(sc.hr[0],sc.hr[1]));
  const spo2=Math.round(randBetween(sc.spo2[0],sc.spo2[1]));
  const sbp=Math.round(randBetween(sc.sbp[0],sc.sbp[1]));
  const dbp=Math.round(randBetween(sc.dbp[0],sc.dbp[1]));
  const etco2=Math.round(randBetween(sc.etco2[0],sc.etco2[1]));
  const temp=randBetween(sc.temp[0],sc.temp[1]);
  const rr=Math.round(randBetween(sc.rr[0],sc.rr[1]));
  const bis=Math.round(randBetween(sc.bis[0],sc.bis[1]));
  const fio2=sc.fio2[0];
  const map=Math.round((sbp+2*dbp)/3);
  const setEl=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  setEl('vHR',hr); setEl('vSPO2',spo2); setEl('vBP',sbp+'/'+dbp+' ('+map+')');
  setEl('vETCO2',etco2); setEl('vTEMP',temp); setEl('vRR',rr); setEl('vBIS',bis); setEl('vFIO2',fio2);
  // Color alerts
  const hrEl=document.getElementById('vHR');
  if(hrEl){hrEl.style.color=hr<60||hr>100?'#ffb347':hr>130?'#ff4d7e':'#00ff64';}
  const spo2El=document.getElementById('vSPO2');
  if(spo2El){spo2El.style.color=spo2<94?'#ff4d7e':spo2<96?'#ffb347':'#00c8ff';}
  const bpEl=document.getElementById('vBP');
  if(bpEl){bpEl.style.color=map<65?'#ff4d7e':map<70?'#ffb347':'#ffff00';}
  const co2El=document.getElementById('vETCO2');
  if(co2El){co2El.style.color=etco2>50?'#ff4d7e':etco2<35||etco2>45?'#ffb347':'#ff8c00';}
  const tempEl=document.getElementById('vTEMP');
  if(tempEl){tempEl.style.color=temp>38.5?'#ff4d7e':temp>37.5?'#ffb347':'#ff6060';}
  updateClinicalAlert(hr,spo2,etco2,map,temp);
}

// ECG canvas drawing
(function(){
  const canvas=document.getElementById('ecgCanvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let x=0;
  const W=()=>canvas.offsetWidth;
  canvas.width=canvas.offsetWidth||800;
  function drawECG(){
    canvas.width=canvas.offsetWidth||800;
    const w=canvas.width,h=canvas.height;
    ctx.clearRect(0,0,w,h);
    // Grid
    ctx.strokeStyle='rgba(0,255,100,0.08)';ctx.lineWidth=1;
    for(let gx=0;gx<w;gx+=20){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,h);ctx.stroke();}
    for(let gy=0;gy<h;gy+=10){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(w,gy);ctx.stroke();}
    // ECG waveform
    ctx.strokeStyle='#00ff64';ctx.lineWidth=1.5;ctx.shadowColor='#00ff64';ctx.shadowBlur=3;
    ctx.beginPath();
    const mid=h/2;
    const seg=w/8;
    // One full ECG complex pattern
    const points=[];
    for(let i=0;i<=w;i++){
      const px=i/w;
      const cycle=px*4;
      const phase=cycle%1;
      let py=mid;
      if(phase<0.1){py=mid;} // isoelectric
      else if(phase<0.15){py=mid-6;} // P wave up
      else if(phase<0.2){py=mid;} // baseline
      else if(phase<0.22){py=mid+4;} // Q
      else if(phase<0.26){py=mid-h*0.55;} // R spike
      else if(phase<0.30){py=mid+8;} // S
      else if(phase<0.35){py=mid;} // baseline
      else if(phase<0.5){py=mid;} // ST
      else if(phase<0.6){py=mid-12;} // T wave
      else if(phase<0.7){py=mid;} // baseline
      else{py=mid;} // rest
      points.push({x:i,y:py});
    }
    // Scroll effect
    const offset=(Date.now()/8)%w;
    ctx.beginPath();
    for(let i=0;i<points.length;i++){
      const px=(points[i].x+w-offset)%w;
      if(i===0) ctx.moveTo(px,points[i].y);
      else ctx.lineTo(px,points[i].y);
    }
    ctx.stroke();
    ctx.shadowBlur=0;
    requestAnimationFrame(drawECG);
  }
  drawECG();
  setInterval(updateVitals,2000);
  updateVitals();
})();

/* ═══ MACHINE GRID RENDER ═══ */
(function(){
  const grid=document.getElementById('machineGrid');
  if(!grid)return;
  grid.innerHTML=MACHINE_COMPONENTS.map(c=>`
    <div class="machine-component" onclick="showToast('${c.name}: ${c.desc.substring(0,60)}...','i',5000)">
      <div class="machine-component__icon">${c.icon}</div>
      <div class="machine-component__name">${c.name}</div>
      <div class="machine-component__desc">${c.desc}</div>
    </div>
  `).join('');
})();

/* ═══ CASE STUDIES RENDER ═══ */
(function(){
  const grid=document.getElementById('caseGrid');
  if(!grid)return;
  grid.innerHTML=CASE_STUDIES.map((c,i)=>`
    <div class="case-card">
      <div class="case-card__header">
        <div class="case-card__id">${c.id}</div>
        <div class="case-card__title">${c.title}</div>
        <div class="case-card__badges">
          <span class="case-badge case-badge-asa">${c.asa}</span>
          <span class="case-badge case-badge-age">Age: ${c.age}</span>
          <span class="case-badge case-badge-type">${c.type}</span>
        </div>
      </div>
      <div class="case-card__body">
        <div class="case-vitals">
          <div class="case-vital"><span class="case-vital-val">${c.vitals.bp}</span><span class="case-vital-lbl">BP mmHg</span></div>
          <div class="case-vital"><span class="case-vital-val">${c.vitals.hr}</span><span class="case-vital-lbl">HR bpm</span></div>
          <div class="case-vital"><span class="case-vital-val">${c.vitals.spo2}%</span><span class="case-vital-lbl">SpO₂</span></div>
        </div>
        <p style="font-size:.83rem;color:var(--c-txt2);line-height:1.65;margin-bottom:.75rem;">${c.scenario}</p>
        <div class="case-card__question">${c.question}</div>
        <button class="case-reveal-btn" onclick="revealCase(this, ${i})">Reveal Answer</button>
        <div class="case-answer" id="case-ans-${i}">${c.answer}</div>
      </div>
    </div>
  `).join('');
})();
function revealCase(btn,i){
  const ans=document.getElementById('case-ans-'+i);
  if(ans){ans.classList.toggle('show');btn.textContent=ans.classList.contains('show')?'Hide Answer':'Reveal Answer';}
}

/* ═══ QUIZ ═══ */
let quizIdx=0,quizScore=0,quizAnswered=false;
function loadQuizQuestion(){
  const q=QUIZ_QUESTIONS[quizIdx];
  document.getElementById('quizQuestion').textContent=q.q;
  document.getElementById('quizOptions').innerHTML=q.opts.map((o,i)=>`
    <button class="quiz-option" onclick="answerQuiz(${i})">${String.fromCharCode(65+i)}. ${o}</button>
  `).join('');
  document.getElementById('quizFeedback').classList.remove('show','correct-fb','wrong-fb');
  document.getElementById('quizNext').classList.remove('show');
  document.getElementById('quizProgressFill').style.width=((quizIdx/QUIZ_QUESTIONS.length)*100)+'%';
  document.getElementById('quizCounter').textContent='Q '+(quizIdx+1)+' / '+QUIZ_QUESTIONS.length;
  quizAnswered=false;
}
function answerQuiz(selected){
  if(quizAnswered)return;
  quizAnswered=true;
  const q=QUIZ_QUESTIONS[quizIdx];
  const opts=document.querySelectorAll('.quiz-option');
  opts.forEach((o,i)=>{o.disabled=true;if(i===q.correct)o.classList.add('correct');});
  const fb=document.getElementById('quizFeedback');
  if(selected===q.correct){
    quizScore++;
    opts[selected].classList.add('correct');
    fb.className='quiz-feedback correct-fb show';
    fb.textContent='✓ Correct! '+q.exp;
  } else {
    opts[selected].classList.add('wrong');
    fb.className='quiz-feedback wrong-fb show';
    fb.textContent='✗ Incorrect. Correct answer: '+q.opts[q.correct]+'. '+q.exp;
  }
  document.getElementById('quizNext').classList.add('show');
}
function nextQuizQuestion(){
  quizIdx++;
  if(quizIdx>=QUIZ_QUESTIONS.length){
    document.getElementById('quizContainer').style.display='none';
    const pct=Math.round((quizScore/QUIZ_QUESTIONS.length)*100);
    const msgs=['Keep studying! Review the pharmacology section.','Good effort! Review the sections you missed.','Well done! Solid anesthesia knowledge.','Excellent! Outstanding performance!','Perfect score! You\'re ready for the clinical!'];
    const msgIdx=Math.floor(pct/25);
    document.getElementById('quizScoreVal').textContent=quizScore+'/'+QUIZ_QUESTIONS.length+' ('+pct+'%)';
    document.getElementById('quizScoreMsg').textContent=msgs[Math.min(msgIdx,4)];
    document.getElementById('quizScore').classList.add('show');
    document.getElementById('quizProgressFill').style.width='100%';
    if(pct>=80)showToast('🎉 Quiz complete! Score: '+pct+'%','s',5000);
    else showToast('Quiz complete! Score: '+pct+'% — keep studying!','i',5000);
  } else {
    loadQuizQuestion();
  }
}
function restartQuiz(){
  quizIdx=0;quizScore=0;quizAnswered=false;
  document.getElementById('quizScore').classList.remove('show');
  document.getElementById('quizContainer').style.display='block';
  // Shuffle questions
  for(let i=QUIZ_QUESTIONS.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [QUIZ_QUESTIONS[i],QUIZ_QUESTIONS[j]]=[QUIZ_QUESTIONS[j],QUIZ_QUESTIONS[i]];
  }
  loadQuizQuestion();
}
if(document.getElementById('quizQuestion')) loadQuizQuestion();

/* ═══ DRUG INTERACTION CHECKER ═══ */
const DRUG_INTERACTIONS={
  'propofol+fentanyl':{severity:'caution',msg:'Synergistic CNS and respiratory depression. Reduce propofol induction dose by 20–30% when fentanyl premedication given (>3 mcg/kg). Monitor airway closely.'},
  'propofol+midazolam':{severity:'caution',msg:'Potentiation of sedation and respiratory depression. Reduce propofol dose significantly. This combination dramatically reduces induction requirements.'},
  'midazolam+fentanyl':{severity:'danger',msg:'DANGEROUS SYNERGY: Combined respiratory depression significantly exceeds individual effects. Multiple deaths reported. Use only with immediate resuscitation capability. Reduce both doses.'},
  'succinylcholine+rocuronium':{severity:'danger',msg:'CONTRAINDICATED: Do not give rocuronium after succinylcholine — phase II block, prolonged neuromuscular blockade. Wait for full succinylcholine offset before administering non-depolarizing NMBA.'},
  'neostigmine+succinylcholine':{severity:'danger',msg:'ABSOLUTELY CONTRAINDICATED: Neostigmine prolongs succinylcholine block (inhibits plasma cholinesterase). Can cause prolonged paralysis (Phase II block). Never use together.'},
  'atropine+neostigmine':{severity:'safe',msg:'Recommended combination: Atropine (0.02 mg/kg) administered with neostigmine to prevent muscarinic side effects (bradycardia, bronchospasm). Give together or atropine 1–2 min first.'},
  'neostigmine+atropine':{severity:'safe',msg:'Standard reversal combination. Glycopyrrolate (0.01 mg/kg) preferred over atropine as it does not cross BBB.'},
  'fentanyl+remifentanil':{severity:'caution',msg:'Combined opioid use: additive respiratory depression. If transitioning to remifentanil, reduce fentanyl dose. Post-remifentanil: ensure adequate analgesia coverage (fentanyl 1-2 mcg/kg 20 min before end).'},
  'sevoflurane+succinylcholine':{severity:'danger',msg:'MALIGNANT HYPERTHERMIA TRIGGER: Both agents can trigger MH in susceptible individuals. Use TIVA (propofol) + non-depolarizing NMBA in known MH-susceptible patients.'},
  'dexmedetomidine+propofol':{severity:'caution',msg:'Synergistic sedation — significant dose reduction of propofol needed. Dexmedetomidine reduces propofol requirements by 30–50%. Risk of profound bradycardia. Monitor HR closely.'},
  'ketamine+midazolam':{severity:'safe',msg:'Standard combination for procedural sedation. Midazolam (0.05 mg/kg) reduces emergence reactions from ketamine by 50%. Reduces salivation, dysphoria. Use together for all ketamine procedures.'},
  'ketamine+propofol':{severity:'safe',msg:'"Ketofol" combination: ketamine (0.5 mg/kg) + propofol (1 mg/kg). Ketamine\'s sympathomimetic effect offsets propofol\'s hypotension. Reduced doses of each needed. Popular for ED procedural sedation.'},
  'fentanyl+haloperidol':{severity:'caution',msg:'QT prolongation risk — both agents can prolong QT interval. Avoid in patients with known long QT syndrome. Monitor ECG. Use with caution.'},
  'ondansetron+haloperidol':{severity:'danger',msg:'Additive QT prolongation — increased risk of Torsades de Pointes. Avoid combination. Use different antiemetic classes.'},
  'rocuronium+sugammadex':{severity:'safe',msg:'Optimal reversal pair: Sugammadex specifically encapsulates rocuronium (and vecuronium). Use 2 mg/kg for moderate block, 4 mg/kg deep block, 16 mg/kg immediate reversal.'},
  'ephedrine+phenylephrine':{severity:'safe',msg:'Can be used together for combined vasodilation and bradycardia. Phenylephrine for pure vasoconstriction, ephedrine for β-mediated cardiac support. Complementary in balanced approach to hypotension.'},
};
function checkDrugInteraction(){
  const d1=document.getElementById('dint1').value;
  const d2=document.getElementById('dint2').value;
  if(!d1||!d2){showToast('Please select two drugs to check','e');return;}
  if(d1===d2){showToast('Select two different drugs','e');return;}
  const key=d1+'+'+d2;
  const key2=d2+'+'+d1;
  const int=DRUG_INTERACTIONS[key]||DRUG_INTERACTIONS[key2];
  const result=document.getElementById('dintResult');
  if(!int){
    result.className='dint-result dint-safe show';
    result.innerHTML='<div class="dint-severity">NO MAJOR INTERACTION FOUND</div>No clinically significant interaction documented between '+d1+' and '+d2+' in the current database. Always verify with current drug references and your pharmacist. Individual patient factors may create interactions not listed here.';
  } else {
    result.className='dint-result dint-'+int.severity+' show';
    const icon=int.severity==='danger'?'⚠ DANGER':int.severity==='caution'?'⚠ CAUTION':'✓ SAFE';
    result.innerHTML='<div class="dint-severity">'+icon+'</div>'+int.msg;
  }
  var pb=document.getElementById('ctPonderBox');if(pb)pb.style.display='block';
}

/* ═══ PUBLICATIONS RENDER ═══ */
(function(){
  const grid=document.getElementById('pubGrid');
  if(!grid)return;
  grid.innerHTML=PUBLICATIONS_DATA.map(p=>`
    <div class="pub-card" onclick="showToast('Opening: ${p.title}','i')">
      <div class="pub-card__type">
        <span class="pub-type-badge pub-type-${p.type}">${p.typeLabel}</span>
        <span class="pub-card__date">${p.date}</span>
      </div>
      <div class="pub-card__title">${p.title}</div>
      <p class="pub-card__excerpt">${p.excerpt}</p>
      <div class="pub-card__footer">
        <div class="pub-card__tags">${p.tags.map(t=>`<span class="pub-tag">${t}</span>`).join('')}</div>
        <span class="pub-card__read">${p.readTime} read →</span>
      </div>
    </div>
  `).join('');
})();

/* ═══ CERTIFICATIONS RENDER ═══ */
(function(){
  const grid=document.getElementById('certGrid');
  if(!grid)return;
  grid.innerHTML=CERTS_DATA.map(c=>`
    <div class="cert-card">
      <div class="cert-icon ${c.iconCls}">${c.icon}</div>
      <div class="cert-info">
        <div class="cert-title">${c.title}</div>
        <div class="cert-issuer">${c.issuer}</div>
        <div class="cert-date">${c.date}</div>
      </div>
      ${c.verified?'<div class="cert-badge cert-badge-verified" title="Verified">✓</div>':''}
    </div>
  `).join('');
})();

/* ═══ TESTIMONIALS RENDER + POPUP ═══ */
(function(){
  const grid=document.getElementById('testiGrid');
  if(!grid)return;
  const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const initials=n=>n.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i,'').split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase();
  /* avatar: real photo if provided, otherwise professional initials badge */
  const avatar=(t,cls)=>t.photo
    ?`<img class="${cls}" src="${esc(t.photo)}" alt="${esc(t.name)}" loading="lazy" onerror="this.outerHTML='<div class=&quot;${cls} ${cls}--ini&quot;>${esc(initials(t.name))}</div>'">`
    :`<div class="${cls} ${cls}--ini">${esc(initials(t.name))}</div>`;
  const stars=n=>Array.from({length:5},(_,i)=>`<span class="${i<n?'on':''}">★</span>`).join('');

  grid.innerHTML=TESTIMONIALS_DATA.map((t,i)=>`
    <div class="testi-card testi-card--click" tabindex="0" role="button" aria-label="Read full feedback from ${esc(t.name)}" data-testi="${i}">
      <div class="testi-stars">${stars(t.stars)}</div>
      <p class="testi-text">"${t.text}"</p>
      <div class="testi-author">
        ${avatar(t,'testi-avatar')}
        <div><div class="testi-name">${esc(t.name)}</div><div class="testi-role">${esc(t.role)}</div></div>
        <span class="testi-more">View ›</span>
      </div>
    </div>
  `).join('');

  /* popup (built once) */
  const bg=document.createElement('div');
  bg.className='tp-bg';bg.id='testiPopup';bg.setAttribute('aria-hidden','true');
  bg.innerHTML=`<div class="tp-box" role="dialog" aria-modal="true" aria-labelledby="tpName">
    <button class="tp-close" aria-label="Close">✕</button>
    <div class="tp-head"><div class="tp-ava" id="tpAva"></div>
      <div class="tp-id"><h3 id="tpName"></h3><div class="tp-role" id="tpRole"></div><div class="tp-stars" id="tpStars"></div></div></div>
    <blockquote class="tp-quote" id="tpText"></blockquote>
    <div class="tp-info" id="tpInfo"></div>
    <div class="tp-actions"><a class="btn-primary" id="tpMail" href="#">✉ Send Email</a><button class="btn-outline" id="tpDone" type="button">Close</button></div>
  </div>`;
  document.body.appendChild(bg);
  const q=id=>bg.querySelector('#'+id);
  let lastFocus=null;

  function open(i){
    const t=TESTIMONIALS_DATA[i];if(!t)return;
    lastFocus=document.activeElement;
    q('tpAva').innerHTML=avatar(t,'tp-img');
    q('tpName').textContent=t.name;
    q('tpRole').textContent=t.role;
    q('tpStars').innerHTML=stars(t.stars);
    q('tpText').textContent=t.text;
    const rows=[['📍','Location',t.place],['✉️','Email',t.email?`<a href="mailto:${esc(t.email)}">${esc(t.email)}</a>`:''],['💼','Worked On',esc(t.project)],['📅','Date',esc(t.date)]]
      .filter(r=>r[2]).map(r=>`<div class="tp-row"><span class="tp-ico">${r[0]}</span><div><small>${r[1]}</small><div>${r[1]==='Email'?r[2]:esc(r[2]).replace(/&amp;/g,'&')}</div></div></div>`).join('');
    q('tpInfo').innerHTML=rows;
    const m=q('tpMail');
    if(t.email){m.style.display='';m.href='mailto:'+t.email;}else m.style.display='none';
    bg.classList.add('open');bg.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
    setTimeout(()=>bg.querySelector('.tp-close').focus(),50);
  }
  function close(){
    bg.classList.remove('open');bg.setAttribute('aria-hidden','true');document.body.style.overflow='';
    if(lastFocus&&lastFocus.focus)lastFocus.focus();
  }
  grid.addEventListener('click',e=>{const c=e.target.closest('[data-testi]');if(c)open(+c.dataset.testi);});
  grid.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const c=e.target.closest('[data-testi]');if(c){e.preventDefault();open(+c.dataset.testi);}}});
  bg.addEventListener('click',e=>{if(e.target===bg)close();});
  bg.querySelector('.tp-close').addEventListener('click',close);
  q('tpDone').addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&bg.classList.contains('open'))close();});
})();

/* ═══ DEV TOOLS RENDER ═══ */
(function(){
  const grid=document.getElementById('devToolsGrid');
  if(!grid)return;
  grid.innerHTML=DEV_TOOLS_DATA.map(t=>`
    <div class="dev-tool" onclick="showToast('${t.name}: ${t.desc}','i',4000)">
      <div class="dev-tool__icon">${t.icon}</div>
      <div class="dev-tool__name">${t.name}</div>
      <div class="dev-tool__desc">${t.desc}</div>
    </div>
  `).join('');
})();

/* ═══ PERFORMANCE METRICS RENDER ═══ */
(function(){
  const grid=document.getElementById('perfGrid');
  if(!grid)return;
  const metrics=[
    {name:'Performance',score:98,desc:'Lighthouse score',cls:'good'},
    {name:'Accessibility',score:100,desc:'WCAG 2.2 AA',cls:'good'},
    {name:'Best Practices',score:95,desc:'Modern standards',cls:'good'},
    {name:'SEO',score:97,desc:'Search optimised',cls:'good'},
  ];
  grid.innerHTML=metrics.map(m=>{
    const r=36;const circ=2*Math.PI*r;const dash=circ-(m.score/100*circ);
    return `
    <div class="perf-metric">
      <div class="perf-metric-ring">
        <svg width="80" height="80" class="perf-ring-svg">
          <circle class="perf-ring-bg" cx="40" cy="40" r="${r}"/>
          <circle class="perf-ring-fill perf-ring-fill-${m.cls}" cx="40" cy="40" r="${r}"
            stroke-dasharray="${circ}" stroke-dashoffset="${circ}" data-offset="${dash}"/>
        </svg>
        <div class="perf-ring-val">${m.score}</div>
      </div>
      <div class="perf-metric-name">${m.name}</div>
      <div class="perf-metric-desc">${m.desc}</div>
    </div>`;
  }).join('');
  const perfObs=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.perf-ring-fill').forEach(ring=>{
        setTimeout(()=>{ring.style.strokeDashoffset=ring.dataset.offset;},200);
      });
      perfObs.unobserve(e.target);
    }
  }),{threshold:.3});
  document.querySelectorAll('.perf-metric').forEach(el=>perfObs.observe(el));
})();

