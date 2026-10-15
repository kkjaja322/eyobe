          // Wait 3.5 seconds, then fade out the loader
  window.addEventListener('load', function() {
    setTimeout(function() {
      var loader = document.getElementById('loaderScreen');
      
      // Start fading out
      loader.style.opacity = '0';
      
      // After fade finishes (0.8s), hide it completely
      setTimeout(function() {
        loader.style.display = 'none';
      }, 800);

    }, 2000); // 3500 = 3.5 seconds of loading screen
  });
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
    closeBadgePopup('bestfriend');
    closeBadgePopup('location');
  }
});
