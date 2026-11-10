/* Fast loader: hide as soon as the page structure is ready (no waiting for every image/font) */
(function(){
  var done=false;
  function hideLoader(){
    if(done)return; done=true;
    var l=document.getElementById('loaderScreen');
    if(!l)return;
    l.style.transition='opacity .35s ease';
    l.style.opacity='0';
    l.style.pointerEvents='none';
    setTimeout(function(){l.style.display='none';},380);
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){setTimeout(hideLoader,250);});
  }else{ setTimeout(hideLoader,250); }
  window.addEventListener('load',hideLoader);   // safety net
  setTimeout(hideLoader,2500);                  // never block the page longer than this
})();

'use strict';
function openBadgePopup(id){
  var el=document.getElementById('popup-'+id);
  if(!el)return;
  el.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeBadgePopup(id){
  var el=document.getElementById('popup-'+id);
  if(!el)return;
  el.classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    closeBadgePopup('location');
  }
});
