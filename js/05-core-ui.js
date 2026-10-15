/* ═══════════════════════════════════════════════════════════════
   ✦ ORIGINAL JAVASCRIPT (Preserved)
═══════════════════════════════════════════════════════════════ */

/* ═══ CANVAS HERO ═══ */
(function(){
  const cv = document.getElementById('hero-canvas');
  if(!cv) return;
  const ctx = cv.getContext('2d');
  let W,H,parts=[],rafId;
  function resize(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;parts=Array.from({length:70},()=>mkPart());}
  function mkPart(){return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.5+.5,a:Math.random()*.6+.2,hue:Math.floor(Math.random()*80+170)};}
  function draw(){
    rafId=requestAnimationFrame(draw);
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<parts.length;i++){
      const p=parts[i];
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;
      if(p.y<0||p.y>H)p.vy*=-1;
      for(let j=i+1;j<parts.length;j++){
        const q=parts[j],dx=q.x-p.x,dy=q.y-p.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){ctx.strokeStyle=`hsla(${p.hue},80%,65%,${(1-d/120)*.15})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
      }
      ctx.fillStyle=`hsla(${p.hue},80%,70%,${p.a})`;
      ctx.shadowColor=`hsla(${p.hue},100%,80%,.5)`;ctx.shadowBlur=p.r*4;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
    }
  }
  resize();
  new ResizeObserver(resize).observe(cv);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(rafId);}else{draw();}});
  draw();
})();

/* ═══ CURSOR ═══ */
(function(){
  if(window.matchMedia('(hover:none)').matches)return;
  const d=document.getElementById('cDot'),r=document.getElementById('cRing');
  let rx=0,ry=0,tx=0,ty=0;
  window.addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;d.style.left=tx+'px';d.style.top=ty+'px';});
  (function loop(){requestAnimationFrame(loop);rx+=(tx-rx)*.12;ry+=(ty-ry)*.12;r.style.left=rx+'px';r.style.top=ry+'px';})();
  document.addEventListener('mouseover',e=>{document.body.classList.toggle('cur-h',!!e.target.closest('a,button,[role=button],.clickable,.proj-card,.channel,.gc'));});
})();

/* ═══ SCROLL ═══ */
window.addEventListener('scroll',()=>{
  const s=window.scrollY,mx=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById('scroll-prog').style.width=(mx>0?s/mx*100:0)+'%';
  document.getElementById('nav').classList.toggle('scrolled',s>20);
  document.getElementById('btt').classList.toggle('show',s>500);
},{passive:true});

/* ═══ BTT ═══ */
document.getElementById('btt').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* ═══ NAV LINKS ACTIVE ═══ */
const navLinks=document.querySelectorAll('.nav__link');
const sections=document.querySelectorAll('section[id]');
new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(l=>{l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id)});}});},{rootMargin:'-30% 0px -60% 0px'}).observe && sections.forEach(s=>new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)navLinks.forEach(l=>{l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id)});});},{rootMargin:'-30% 0px -60% 0px'}).observe(s));

/* ═══ THEME ═══ */
(function(){
  const saved=localStorage.getItem('theme')||'dark';
  document.documentElement.dataset.theme=saved;
  document.getElementById('themeKn').textContent=saved==='dark'?'🌙':'☀️';
})();
document.getElementById('themeBn').addEventListener('click',()=>{
  const n=document.documentElement.dataset.theme==='dark'?'light':'dark';
  document.documentElement.dataset.theme=n;
  localStorage.setItem('theme',n);
  document.getElementById('themeKn').textContent=n==='dark'?'🌙':'☀️';
});

/* ═══ MOBILE MENU ═══ */
const ham=document.getElementById('ham'),mob=document.getElementById('mobMenu');
ham.addEventListener('click',()=>{const o=!mob.classList.contains('open');mob.classList.toggle('open',o);ham.classList.toggle('open',o);document.body.style.overflow=o?'hidden':'';});
document.querySelectorAll('[data-mlink]').forEach(l=>l.addEventListener('click',()=>{mob.classList.remove('open');ham.classList.remove('open');document.body.style.overflow='';}));

/* ═══ REVEAL ON SCROLL ═══ */
const ro=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');ro.unobserve(e.target);}}),{rootMargin:'0px 0px -80px 0px',threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* ═══ TIMELINE ═══ */
(function(){
  const wrap=document.getElementById('tlWrap');
  if(!wrap)return;
  wrap.innerHTML=DATA.experience.map((item,i)=>`
    <div class="tl-item" data-tl>
      <div class="tl-node"><div class="tl-dot">${item.emoji}</div></div>
      <div class="gc tl-content">
        <div class="tl-period">${item.period}</div>
        <div class="tl-role">${item.role}</div>
        <div class="tl-company">${item.company.split('·').map((p,pi)=>`<span>${p.trim()}</span>${pi<item.company.split('·').length-1?'<div class="d"></div>':''}`).join('')}</div>
        <p class="tl-desc">${item.desc}</p>
        <div class="tl-tags">${item.tags.map(t=>`<span class="tl-tag">${t}</span>`).join('')}</div>
      </div>
      <div class="tl-spacer"></div>
    </div>`).join('');
  const tobs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');tobs.unobserve(e.target);}}),{rootMargin:'0px 0px -60px 0px',threshold:.15});
  wrap.querySelectorAll('[data-tl]').forEach((el,i)=>{el.style.transitionDelay=i*80+'ms';tobs.observe(el);});
})();

/* ═══ PROJECTS ═══ */
(function(){
  const grid=document.getElementById('projGrid');
  if(!grid)return;
  function render(filter){
    const list=filter==='all'?DATA.projects:DATA.projects.filter(p=>p.filter===filter);
    grid.innerHTML=list.map((p,i)=>`
      <article class="gc proj-card" data-pid="${p.id}" data-fcat="${p.filter}" role="button" tabindex="0" aria-label="View ${p.title}" style="transition-delay:${i*60}ms">
        <div class="proj-thumb"><div class="proj-thumb-bg" style="background:${p.gradient}"><span>${p.emoji}</span></div><div class="proj-thumb-ov"></div>
          <div class="proj-badges">${p.featured?'<span class="pbadge pb-feat">Featured</span>':''}${p.status==='live'?'<span class="pbadge pb-live">Live</span>':p.status==='wip'?'<span class="pbadge pb-wip">In Progress</span>':''}</div>
        </div>
        <div class="proj-body">
          <div class="proj-cat">${p.cat}</div>
          <div class="proj-title">${p.title}</div>
          <p class="proj-desc">${p.desc}</p>
          <div class="proj-footer"><div class="proj-techs">${p.tech.slice(0,3).map(t=>`<span class="proj-tech">${t}</span>`).join('')}</div><div class="proj-arrow">↗</div></div>
        </div>
      </article>`).join('');
    requestAnimationFrame(()=>grid.querySelectorAll('.proj-card').forEach((el,i)=>{setTimeout(()=>el.classList.add('vis'),i*60+50);}));
    grid.querySelectorAll('.proj-card').forEach(c=>{
      c.addEventListener('click',()=>openProjModal(c.dataset.pid));
      c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProjModal(c.dataset.pid);}});
    });
    const pobs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');pobs.unobserve(e.target);}}),{threshold:.1});
    grid.querySelectorAll('.proj-card').forEach(el=>pobs.observe(el));
  }
  render('all');
  document.querySelectorAll('.fbtn').forEach(btn=>{
    btn.addEventListener('click',()=>{document.querySelectorAll('.fbtn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(btn.dataset.f);});
  });
})();

/* ═══ SKILLS ═══ */
(function(){
  const grid=document.getElementById('skillsGrid');
  if(!grid)return;
  grid.innerHTML=DATA.skills.map(g=>`
    <div class="gc sk-card">
      <div class="sk-head"><div class="skill-group__icon sk-ico ${g.cls}">${g.ico}</div><div><div class="sk-ttl">${g.title}</div><div class="sk-sub">${g.sub}</div></div></div>
      <div class="sk-items">${g.items.map(it=>`<div class="sk-item"><div class="si-top"><span class="si-name">${it.n}</span><span class="si-lv">${it.ll}</span></div><div class="si-bar"><div class="${it.c} si-fill" data-width="${it.l}" style="width:0"></div></div></div>`).join('')}</div>
    </div>`).join('');
  const sobs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');e.target.querySelectorAll('[data-width]').forEach(b=>{requestAnimationFrame(()=>{b.style.width=b.dataset.width+'%';});});sobs.unobserve(e.target);}}),{threshold:.2});
  grid.querySelectorAll('.sk-card').forEach((el,i)=>{el.style.transitionDelay=i*80+'ms';sobs.observe(el);});
})();

/* ═══ SKILL BARS in about section ═══ */
(function(){
  const bars=document.querySelectorAll('#aboutBars [data-width]');
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.width+'%';obs.unobserve(e.target);}}),{threshold:.3});
  bars.forEach(b=>obs.observe(b));
})();

/* ═══ COUNT UP ═══ */
(function(){
  function countUp(el){
    const target=+el.dataset.count,suf=el.dataset.suffix||'',dur=2000;
    const start=performance.now();
    (function tick(now){
      const p=Math.min((now-start)/dur,1),v=Math.round(1-(1-p)**4)*target;
      el.textContent=v+suf;
      if(p<1)requestAnimationFrame(tick);else el.textContent=target+suf;
    })(performance.now());
  }
  const cobs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){countUp(e.target);cobs.unobserve(e.target);}}),{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el=>cobs.observe(el));
})();

