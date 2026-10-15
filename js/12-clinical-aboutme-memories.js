/* ═══ EtCO₂ BADGE TOGGLE ═══ */
function toggleCtAnswer(){
  var ans=document.getElementById('ctBadgeAns');
  var btn=document.getElementById('ctToggleBtn');
  if(!ans)return;
  var showing=ans.classList.contains('ct-show');
  if(showing){ans.classList.remove('ct-show');if(btn)btn.textContent='Show Answer ▾';}
  else{ans.classList.add('ct-show');if(btn)btn.textContent='Hide Answer ▴';}
}


/* ══ About-Me Memory Modal ══ */
function openAboutMeModal(){
  const el=document.getElementById('aboutMeModal');
  if(!el)return;
  el.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeAboutMeModal(){
  const el=document.getElementById('aboutMeModal');
  if(!el)return;
  el.classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&document.getElementById('aboutMeModal')?.classList.contains('open')){
    closeAboutMeModal();
  }
});


document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    if(document.getElementById('photoZoom')?.classList.contains('open')){closePhotoZoom();return;}
    if(document.getElementById('memoryDetailModal')?.classList.contains('open')){closeMemoryDetail();}
  }
});

/* ═══════════════════════════════════════
   MEMORIES TIMELINE
═══════════════════════════════════════ */
(function(){
  function renderMemoriesTimeline(filter){
    filter = filter||'all';
    const grid = document.getElementById('mtGrid');
    if(!grid) return;
    const items = filter==='all'
      ? DATA.gallery
      : DATA.gallery.filter(it=>it.cat===filter);

    if(!items.length){
      grid.innerHTML='<div class="mt-empty">No memories in this category yet.</div>';
      return;
    }
    grid.innerHTML = items.map((item,i)=>{
      const globalIdx = DATA.gallery.indexOf(item);
      const m = item.mem||{};
      const coverImg = (m.imgs&&m.imgs[0]) || item.img;
      const preview = m.story ? m.story.slice(0,140)+'…' : '';
      const tags = (m.tags||[]).slice(0,3);
      const typeLabel = item.type==='videos'?'🎬 Video':item.type==='photos'?'📸 Photos':'💻 Work';
      const typeClass = item.type==='videos'?'mt-card-type--videos':item.type==='photos'?'mt-card-type--photos':'mt-card-type--work';
      const imgCount = m.imgs ? m.imgs.length : 0;
      const vids = m.ytIds||(m.ytId?[m.ytId]:[]);
      return `<div class="mt-card" onclick="openMemoryDetail(${globalIdx})" style="animation-delay:${(i%6)*.07}s;opacity:1">
        <div class="mt-card-img">
          <img src="${coverImg}" alt="${item.label}" loading="lazy" onerror="this.parentElement.style.background='var(--c-bg3)'">
          <div class="mt-card-img-grad"></div>
          <div class="mt-card-date">📅 ${m.date||''}</div>
          <div class="mt-card-type ${typeClass}">${typeLabel}</div>
          ${imgCount>1?`<div class="mt-card-img-count">🖼 ${imgCount} photos</div>`:''}
        </div>
        <div class="mt-card-body">
          <div class="mt-card-title">${item.label}</div>
          <div class="mt-card-preview">${preview}</div>
          <div class="mt-card-tags">${tags.map(t=>`<span class="mt-card-tag">${t}</span>`).join('')}</div>
          <div class="mt-card-footer">
            <button class="mt-card-open-btn" onclick="event.stopPropagation();openMemoryDetail(${globalIdx})">◈ Full Story →</button>
            <div class="mt-card-media-icons">
              ${imgCount?`<span title="${imgCount} photos">📸</span>`:''}
              ${vids.length?`<span title="${vids.length} video${vids.length>1?'s':''}">🎬</span>`:''}
            </div>
          </div>
        </div>
      </div>`;
    }).join('');

    /* cards are already .reveal.visible — stagger fade-in via animation-delay */
  }

  function updateStats(){
    const photos = DATA.gallery.filter(it=>it.type==='photos').length;
    const vids   = DATA.gallery.filter(it=>it.type==='videos').length;
    const tp=document.getElementById('mtTotal');
    const ph=document.getElementById('mtPhotos');
    const vd=document.getElementById('mtVideos');
    if(tp) tp.textContent=DATA.gallery.length;
    if(ph) ph.textContent=photos;
    if(vd) vd.textContent=vids;
  }

  /* Script runs inline at bottom of body — DOM is already present */
  (function initMT(){
    const grid = document.getElementById('mtGrid');
    if(!grid) return;
    renderMemoriesTimeline('all');
    updateStats();
    document.querySelectorAll('[data-mt-filter]').forEach(btn=>{
      btn.addEventListener('click',function(){
        document.querySelectorAll('[data-mt-filter]').forEach(b=>b.classList.remove('active'));
        this.classList.add('active');
        renderMemoriesTimeline(this.dataset.mtFilter);
      });
    });
  })();
})();
function openBFMemoryZoom(src) {
  const overlay = document.getElementById('bfMemoryZoom');
  const img = document.getElementById('bfMemoryZoomImg');
  img.src = src;
  overlay.style.display = 'flex';
  img.style.animation = 'none';
  requestAnimationFrame(() => {
    img.style.animation = 'bfImgPop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards';
  });
  document.body.style.overflow = 'hidden';
}

function closeBFMemoryZoom() {
  document.getElementById('bfMemoryZoom').style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeBFMemoryZoom();
});
