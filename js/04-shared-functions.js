/* ═══ PROJECT IMAGES ═══
   Put photos in:  images/project/
   Name them by project id:  <id>_background.png  and  <id>_profile.png
   e.g.  gatexam_background.png , gatexam_profile.png
   (.jpg / .jpeg / .webp also work). If a file is missing, the old gradient/emoji is shown. */
const PROJ_IMG_DIR='images/project';
const PROJ_IMG_EXTS=['png','jpg','jpeg','webp'];
function projImg(id,kind,cls){
  return '<img class="'+cls+'" src="'+PROJ_IMG_DIR+'/'+id+'_'+kind+'.'+PROJ_IMG_EXTS[0]+'" data-id="'+id+'" data-kind="'+kind+'" data-i="0" alt="" decoding="async" onerror="projImgFail(this)">';
}
function projImgFail(img){
  var i=+img.dataset.i+1;
  if(i<PROJ_IMG_EXTS.length){
    img.dataset.i=i;
    img.src=PROJ_IMG_DIR+'/'+img.dataset.id+'_'+img.dataset.kind+'.'+PROJ_IMG_EXTS[i];
  }else{
    var card=img.closest('.proj-card');
    if(card&&img.dataset.kind==='profile')card.classList.remove('has-av');
    img.remove();
  }
}

/* ═══ CLINICAL ALERT INDICATOR ═══ */
function updateClinicalAlert(hr,spo2,etco2,map_val,temp){
  var dot=document.getElementById('ctAlertDot');
  var lbl=document.getElementById('ctAlertLabel');
  var desc=document.getElementById('ctAlertDesc');
  if(!dot||!lbl)return;
  var status,cls,descTxt;
  if(spo2<90||map_val<55||temp>39.5||etco2>55||hr>160||hr<35){
    status='⚠ CRITICAL ALERT';cls='ct-danger';
    descTxt='Immediate intervention required — critical threshold breached';
  } else if(spo2<94||map_val<65||map_val>110||hr>120||hr<50||etco2>45||etco2<30||temp>38.5){
    status='⚡ WARNING';cls='ct-warn';
    descTxt='Parameter(s) outside acceptable intraoperative range';
  } else {
    status='● NORMAL SINUS';cls='';
    descTxt='All vitals within physiological range';
  }
  dot.className='ct-alert-dot'+(cls?' '+cls:'');
  lbl.className='ct-alert-label'+(cls?' '+cls:'');
  lbl.textContent=status;
  if(desc)desc.textContent=descTxt;
}

/* ══ Memory Detail Modal ══ */
function openMemoryDetail(idx){
  const item = DATA.gallery[idx];
  if(!item||!item.mem) return;
  const m = item.mem;
  // Close the lightbox if open
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('mdmTitle').textContent = item.label;
  document.getElementById('mdmDate').textContent = '\u{1F4C5} ' + m.date;
  document.getElementById('mdmTags').innerHTML = (m.tags||[]).map(t=>`<span class="mdm-tag">${t}</span>`).join('');

  /* story → modern chapters (blocks separated by blank line; "## " = chapter title) */
  const chapters = String(m.story||'').split(/\n\s*\n/).map(b=>b.trim()).filter(Boolean).map((b,i)=>{
    const mt = b.match(/^##\s*(.+?)\n([\s\S]*)$/);
    const title = mt ? mt[1] : '';
    const text  = mt ? mt[2] : b;
    return `<section class="mdm-chap"><div class="mdm-chap-num">${String(i+1).padStart(2,'0')}</div><div class="mdm-chap-main">${title?`<h4 class="mdm-chap-title">${title}</h4>`:''}<p class="mdm-chap-text">${text}</p></div></section>`;
  }).join('');
  let html = `<div class="mdm-story mdm-story--chapters">${chapters}</div>`;

  /* ── Photo masonry grid ── */
  if(m.imgs && m.imgs.length){
    const imgs = m.imgs;
    const hero = imgs[0];
    const rest = imgs.slice(1);
    html += `<div>
      <div class="mdm-photo-label">\u{1F4F8} Moments &amp; Memories <span style="color:var(--c-txt3);font-weight:400;letter-spacing:0">(${imgs.length} photos)</span></div>
      <div class="mdm-masonry">
        <div class="mdm-mas-hero" onclick="openPhotoZoom(this.querySelector('img').src)" title="Click to enlarge">
          <img src="${hero}" alt="Hero memory" loading="lazy" onerror="this.parentElement.style.display='none'">
          <div class="mdm-mas-ov"><span>\u25c8 Click to enlarge</span></div>
        </div>
        <div class="mdm-mas-grid">
          ${rest.map((src,i)=>`
            <div class="mdm-mas-cell" onclick="openPhotoZoom('${src}')" title="Click to enlarge">
              <img src="${src}" alt="Memory ${i+2}" loading="lazy" onerror="this.parentElement.style.display='none'">
              <div class="mdm-mas-ov"><span>\u25c8 Click to enlarge</span></div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
  }

  /* ── Videos grid ── */
  const vids = m.ytIds || (m.ytId ? [m.ytId] : []);
  if(vids.length){
    const isMulti = vids.length > 1;
    html += `<div>
      <div class="mdm-photo-label">\u{1F3AC} ${isMulti?'Videos':'Related Video'} <span style="color:var(--c-txt3);font-weight:400;letter-spacing:0">(${vids.length})</span></div>
      <div class="${isMulti?'mdm-vid-grid':'mdm-video-wrap'}">
        ${vids.map(id=>`
          <div class="mdm-video-wrap">
            <iframe src="https://www.youtube.com/embed/${id}?rel=0&modestbranding=1"
              frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope"
              allowfullscreen loading="lazy"></iframe>
          </div>`).join('')}
      </div>
    </div>`;
  }

  /* ── Share Story CTA ── */
  html += `<div class="mdm-share-row">
    <button class="mdm-share-btn" onclick="shareMemoryStory('${item.label}',${idx})">
      <span>\u21d7</span> Share This Story
    </button>
    <button class="mdm-share-btn mdm-share-btn--close" onclick="closeMemoryDetail()">
      \u2715 Close
    </button>
  </div>`;

  document.getElementById('mdmBody').innerHTML = html;
  document.getElementById('memoryDetailModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMemoryDetail(){
  const el=document.getElementById('memoryDetailModal');
  if(el) el.classList.remove('open');
  document.body.style.overflow = '';
}
function openPhotoZoom(src){
  const z=document.getElementById('photoZoom');
  const img=document.getElementById('photoZoomImg');
  img.src=src;
  z.style.display='flex';
  requestAnimationFrame(()=>requestAnimationFrame(()=>z.classList.add('open')));
  document.body.style.overflow='hidden';
}
function closePhotoZoom(){
  const z=document.getElementById('photoZoom');
  z.classList.remove('open');
  setTimeout(()=>{z.style.display='none';document.body.style.overflow='';},220);
}
function shareMemoryStory(label,idx){
  const url = window.location.href.split('#')[0]+'#gallery';
  const text = `Check out "${label}" — a memory from Eyob Eyoba's portfolio: ${url}`;
  if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(()=>{
      const btn=event.target.closest('.mdm-share-btn');
      if(btn){const orig=btn.innerHTML;btn.innerHTML='\u2713 Copied to clipboard!';btn.style.background='linear-gradient(135deg,rgba(0,229,160,.3),rgba(0,229,160,.15))';setTimeout(()=>{btn.innerHTML=orig;btn.style.background='';},2500);}
    });
  } else if(navigator.share){
    navigator.share({title:label,text,url:window.location.href});
  }
}
