/* ═══ TIME ═══ */
function updateTimes(){
  const eat=new Date(new Date().toLocaleString('en-US',{timeZone:'Africa/Addis_Ababa'}));
  const h=eat.getHours(),m=String(eat.getMinutes()).padStart(2,'0'),a=h>=12?'PM':'AM',h12=h%12||12;
  const str=`${h12}:${m} ${a}`;
  const lt=document.getElementById('liveTime'),et=document.getElementById('eatTime');
  if(lt)lt.textContent=str;
  if(et)et.textContent=str+' EAT';
}
updateTimes();setInterval(updateTimes,30000);

/* ═══ GALLERY ═══ */
(function(){
  const grid=document.getElementById('galleryGrid');
  if(!grid)return;
  let lbItems=[],lbIdx=0;

  function render(cat){
    const list=cat==='all'?DATA.gallery:DATA.gallery.filter(g=>g.cat===cat);
    lbItems=list;
    grid.innerHTML=list.map((item,i)=>{
      const isVid=item.type==='video'||item.type==='videos';
      const hasSrc=item.img||item.ytId;
      const thumbSrc=item.ytId?item.img:item.img||'';
      const mediaHtml=hasSrc
        ?`<img src="${thumbSrc}" alt="${item.label}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling&&(this.nextElementSibling.style.display='flex')"
             style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">
           <div class="gitem-placeholder" style="display:none">
             <div class="gitem-placeholder-ico">${item.placeholder}</div>
             <div class="gitem-placeholder-txt">${item.label}</div>
           </div>`
        :`<div class="gitem-placeholder">
             <div class="gitem-placeholder-ico">${item.placeholder}</div>
             <div class="gitem-placeholder-txt">${item.label}</div>
           </div>`;
      const realIdx = DATA.gallery.indexOf(item);
      return `
      <div class="gitem${isVid?' video-item':''} clickable" data-idx="${i}" title="${item.label}"
           style="background:${item.color};position:relative;">
        ${mediaHtml}
        ${isVid?'<div class="gitem-play">▶</div>':''}
        <div class="gitem-ov"><span class="gitem-lbl">${item.label}</span></div>
        ${item.mem ? `<button class="gitem-detail-btn" onclick="event.stopPropagation();openMemoryDetail(${realIdx})" title="View Details">◈</button>` : ''}
        <button class="gitem-dl-btn" onclick="event.stopPropagation();downloadGalleryItem(${realIdx})" title="Download ${item.label}">⬇</button>
      </div>`;
    }).join('');
    grid.querySelectorAll('.gitem').forEach(el=>{el.addEventListener('click',()=>{lbIdx=+el.dataset.idx;openLightbox();});});
  }

  function openLightbox(){
    const item=lbItems[lbIdx];
    const realIdx=DATA.gallery.indexOf(item);
    const isVideo=item.type==='video'||item.type==='videos';
    let contentHtml;
    if(isVideo&&item.ytId){
      contentHtml=`<iframe width="100%" height="420"
        src="https://www.youtube.com/embed/${item.ytId}?autoplay=1&rel=0&modestbranding=1"
        frameborder="0" allow="autoplay;encrypted-media;fullscreen"
        allowfullscreen style="border-radius:16px;display:block;"></iframe>`;
    } else if(item.imgHD||item.img){
      const src=item.imgHD||item.img;
      contentHtml=`<img src="${src}" alt="${item.label}"
        style="max-width:100%;max-height:78vh;border-radius:16px;object-fit:contain;display:block;margin:0 auto;">`;
    } else {
      contentHtml=`<div style="min-height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;border-radius:16px;background:${item.color||'var(--c-bg3)'};padding:3rem;font-size:4rem">${item.placeholder}<div style="font-size:1rem;color:var(--c-txt2)">${item.label}</div></div>`;
    }
    document.getElementById('lbContent').innerHTML=contentHtml;
    document.getElementById('lbCaption').textContent=item.label;
    const actions=document.getElementById('lbActions');
    if(actions){
      actions.innerHTML=`
        <button class="lb-download-btn" onclick="downloadGalleryItem(${realIdx})">
          ⬇ Download ${isVideo?'Video':'Image'}
        </button>
        <button class="lb-download-btn" style="background:linear-gradient(135deg,var(--c-neon3),var(--c-amber));color:#000;" onclick="shareGalleryItem(${realIdx})">
          ↗ Share
        </button>
        ${item.mem?`<button class="lb-detail-btn" onclick="openMemoryDetail(${realIdx})">◈ Detail</button>`:''}
      `;
    }
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow='hidden';
  }

  render('all');
  document.querySelectorAll('.gtab').forEach(t=>{t.addEventListener('click',()=>{document.querySelectorAll('.gtab').forEach(x=>x.classList.remove('active'));t.classList.add('active');render(t.dataset.gtab);});});

  document.getElementById('lbClose').addEventListener('click',()=>{document.getElementById('lightbox').classList.remove('open');document.body.style.overflow='';});
  document.getElementById('lbPrev').addEventListener('click',()=>{lbIdx=(lbIdx-1+lbItems.length)%lbItems.length;openLightbox();});
  document.getElementById('lbNext').addEventListener('click',()=>{lbIdx=(lbIdx+1)%lbItems.length;openLightbox();});
  document.getElementById('lightbox').addEventListener('click',e=>{if(e.target===document.getElementById('lightbox')){document.getElementById('lightbox').classList.remove('open');document.body.style.overflow='';}});
  document.addEventListener('keydown',e=>{if(!document.getElementById('lightbox').classList.contains('open'))return;if(e.key==='ArrowLeft'){lbIdx=(lbIdx-1+DATA.gallery.length)%DATA.gallery.length;openLightbox();}else if(e.key==='ArrowRight'){lbIdx=(lbIdx+1)%DATA.gallery.length;openLightbox();}else if(e.key==='Escape'){document.getElementById('lightbox').classList.remove('open');document.body.style.overflow='';}});
  
  // Make functions global for onclick in HTML
  window.openMemoryDetail = openMemoryDetail;
  window.closeMemoryDetail = closeMemoryDetail;
  window.openPhotoZoom = openPhotoZoom;
  window.closePhotoZoom = closePhotoZoom;
  window.shareMemoryStory = shareMemoryStory;
})();

/* ═══ DOWNLOAD GALLERY ITEM ═══ */
function downloadGalleryItem(idx) {
  const item = DATA.gallery[idx];
  if(!item) return;
  const isVideo = item.type === 'video' || item.type === 'videos';
  showToast(`⬇ Preparing ${isVideo ? 'video' : 'image'} download: ${item.label}`, 'i');
  
  if (isVideo) {
    // For videos, download the thumbnail
    const thumbSrc = item.img || `https://img.youtube.com/vi/${item.ytId}/hqdefault.jpg`;
    fetch(thumbSrc)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Eyob_Eyoba_${item.label.replace(/[^a-z0-9]/gi,'_')}_thumbnail.jpg`;
        a.click();
        URL.revokeObjectURL(url);
        setTimeout(() => showToast(`✓ "${item.label}" thumbnail downloaded!`, 's'), 500);
      })
      .catch(() => {
        // Fallback to canvas placeholder
        downloadPlaceholder();
      });
  } else if (item.imgHD || item.img) {
    // Download actual image
    const imgSrc = item.imgHD || item.img;
    fetch(imgSrc)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Eyob_Eyoba_${item.label.replace(/[^a-z0-9]/gi,'_')}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
        setTimeout(() => showToast(`✓ "${item.label}" downloaded!`, 's'), 500);
      })
      .catch(() => {
        // Fallback to canvas placeholder
        downloadPlaceholder();
      });
  } else {
    // No image, use placeholder
    downloadPlaceholder();
  }
  
  function downloadPlaceholder() {
    const canvas = document.createElement('canvas');
    canvas.width = 800; canvas.height = 600;
    const ctx = canvas.getContext('2d');
    // Background
    ctx.fillStyle = item.color || '#0b1428';
    ctx.fillRect(0, 0, 800, 600);
    // Border
    ctx.strokeStyle = 'rgba(0,255,229,0.3)';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, 780, 580);
    // Text
    ctx.fillStyle = '#e8f4ff';
    ctx.font = 'bold 28px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.label, 400, 280);
    ctx.font = '18px "Segoe UI", sans-serif';
    ctx.fillStyle = '#8ba5c8';
    ctx.fillText('Eyob Eyoba Portfolio', 400, 320);
    ctx.fillText(isVideo ? '🎬 Video Preview' : '📸 Photo', 400, 355);
    ctx.font = '14px monospace';
    ctx.fillStyle = 'rgba(0,255,229,0.6)';
    ctx.fillText('eyobeyoba.portfolio', 400, 550);
    // Placeholder icon
    ctx.font = '80px serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.placeholder || (isVideo ? '🎬' : '📸'), 400, 200);
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const ext = isVideo ? 'jpg' : 'png';
      a.href = url;
      a.download = `Eyob_Eyoba_${item.label.replace(/[^a-z0-9]/gi,'_')}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
      setTimeout(() => showToast(`✓ "${item.label}" downloaded!`, 's'), 500);
    });
  }
}

/* ═══ SHARE GALLERY ITEM ═══ */
function shareGalleryItem(idx) {
  const item = DATA.gallery[idx];
  if(navigator.share) {
    navigator.share({title: item.label, text: `Check out this from Eyob Eyoba's portfolio: ${item.label}`, url: window.location.href});
  } else {
    navigator.clipboard.writeText(window.location.href).then(()=>showToast('Link copied to clipboard!','s'));
  }
}

