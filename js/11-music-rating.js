/* ═══ MUSIC PLAYER ═══ */
const TRACKS=[
  {title:'Min Bitwedegn New',sub:'Abel Birhanu',src:'abel.mp3'},
  {title:'Eyesus Lbel Eyesus',sub:'Tewodros Yoseph',src:'tewodros.mp3'},
  {title:'Le Tsehat',sub:'Gebre Yohannes',src:'gebre.mp3'},
];
let trackIdx=0,isPlaying=false,menuVisible=false,playerVisible=false;
const _audio=new Audio();
_audio.addEventListener('ended',()=>{trackIdx=(trackIdx+1)%TRACKS.length;loadTrack(trackIdx);_audio.play();isPlaying=true;syncUI();});

function toggleMusicMenu(){
  menuVisible=!menuVisible;
  document.getElementById('musicMenu').classList.toggle('show',menuVisible);
}
function selectTrack(idx){
  trackIdx=idx;
  loadTrack(idx);
  _audio.play();
  isPlaying=true;
  playerVisible=true;
  menuVisible=false;
  document.getElementById('musicMenu').classList.remove('show');
  document.getElementById('musicPlayer').classList.add('show');
  syncUI();
  showToast('♪ Now Playing: '+TRACKS[idx].title+' — '+TRACKS[idx].sub,'i',2500);
}
function loadTrack(idx){
  _audio.src=TRACKS[idx].src;
  document.getElementById('musicTitle').textContent=TRACKS[idx].title;
  document.getElementById('musicSub').textContent=TRACKS[idx].sub;
  document.querySelectorAll('.music-menu__item').forEach((el,i)=>el.classList.toggle('active',i===idx));
}
function togglePlay(){
  if(!playerVisible) return;
  if(_audio.paused){_audio.play();isPlaying=true;}
  else{_audio.pause();isPlaying=false;}
  syncUI();
  showToast(isPlaying?'▶ Playing: '+TRACKS[trackIdx].title:'⏸ Paused','i',2000);
}
function nextTrack(){trackIdx=(trackIdx+1)%TRACKS.length;loadTrack(trackIdx);if(isPlaying)_audio.play();}
function prevTrack(){trackIdx=(trackIdx-1+TRACKS.length)%TRACKS.length;loadTrack(trackIdx);if(isPlaying)_audio.play();}
function syncUI(){
  const btn=document.getElementById('playPauseBtn');
  if(btn){btn.textContent=isPlaying?'⏸':'▶';btn.classList.toggle('playing',isPlaying);}
}

/* ═══ STUDY MODE ═══ */
function closeMusicPlayer(){
  _audio.pause();
  isPlaying=false;
  syncUI();
  playerVisible=false;
  document.getElementById('musicPlayer').classList.remove('show');
}
document.addEventListener('click',function(e){
  if(!e.target.closest('#musicMenu')&&!e.target.closest('.music-toggle-btn')){
    menuVisible=false;
    var menu=document.getElementById('musicMenu');
    if(menu) menu.classList.remove('show');
  }
});
/* ═══ RATING MODAL ═══ */
let currentRating = 0;

function openRatingModal(){
  const overlay = document.getElementById('ratingModalOverlay');
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  currentRating = 0;
  updateStars(0);
  document.getElementById('ratingVal').value = '0';
  document.getElementById('ratingForm').style.display = 'block';
  document.getElementById('ratingSuccess').style.display = 'none';
  document.getElementById('ratingSubmitBtn').disabled = false;
  document.getElementById('ratingBtnTxt').textContent = '✦ Send Feedback to Eyob';
  document.getElementById('ratingSpinner').style.display = 'none';
  document.getElementById('ratingForm').reset();
  document.querySelectorAll('.fav-chip').forEach(c => c.classList.remove('checked'));
}

function closeRatingModal(){
  const overlay = document.getElementById('ratingModalOverlay');
  overlay.style.display = 'none';
  document.body.style.overflow = '';
}

function setRating(val){
  currentRating = val;
  document.getElementById('ratingVal').value = val;
  updateStars(val);
  const labels = ['','⭐ Poor','⭐⭐ Fair','⭐⭐⭐ Good','⭐⭐⭐⭐ Very Good','⭐⭐⭐⭐⭐ Excellent!'];
  document.getElementById('starLabel').textContent = labels[val] || '';
}

function updateStars(val){
  document.querySelectorAll('.rate-star').forEach(s => {
    s.classList.toggle('active', +s.dataset.val <= val);
  });
}

/* fav chips toggle */
document.querySelectorAll('.fav-chip').forEach(chip => {
  chip.addEventListener('click', () => chip.classList.toggle('checked'));
});

async function submitRating(e){
  e.preventDefault();
  const name       = document.getElementById('r-name').value.trim();
  const email      = document.getElementById('r-email').value.trim();
  const suggestion = document.getElementById('r-suggestion').value.trim();
  const rating     = document.getElementById('ratingVal').value;
  let valid = true;

  const nameErr = document.getElementById('r-name-err');
  const emailErr = document.getElementById('r-email-err');
  const sugErr   = document.getElementById('r-sug-err');
  nameErr.style.display  = 'none';
  emailErr.style.display = 'none';
  sugErr.style.display   = 'none';

  if(name.length < 2)  { nameErr.style.display='block';  valid=false; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { emailErr.style.display='block'; valid=false; }
  if(suggestion.length < 20) { sugErr.style.display='block'; valid=false; }
  if(+rating === 0) { showToast('Please select a star rating!','e'); valid=false; }
  if(!valid) return;

  const favs = [...document.querySelectorAll('.fav-chip.checked')]
    .map(c => c.querySelector('input').value).join(', ') || 'Not specified';
  const recommend = document.querySelector('input[name="recommend"]:checked')?.value || 'Not answered';
  const role      = document.getElementById('r-role').value    || 'Not specified';
  const source    = document.getElementById('r-source').value  || 'Not specified';
  const extra     = document.getElementById('r-extra').value.trim() || 'None';

  const btn = document.getElementById('ratingSubmitBtn');
  document.getElementById('ratingBtnTxt').textContent = 'Sending...';
  document.getElementById('ratingSpinner').style.display = 'block';
  btn.disabled = true;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      },
      body: JSON.stringify({
        access_key: '37dfdec0-7ef3-4b5a-826f-9d8fb1601351',
        subject: `Portfolio Feedback — ${rating} Stars from ${name}`,
        from_name: name,
        email: email,
        rating: `${rating} / 5 stars`,
        profession: role,
        source: source,
        favourites: favs,
        recommend: recommend,
        suggestion: suggestion,
        additional_comments: extra
      })
    });

    const data = await res.json();

    if(data.success){
      document.getElementById('ratingForm').style.display = 'none';
      document.getElementById('ratingSuccess').style.display = 'block';
      showToast('Feedback sent! Thank you!', 's');
    } else {
      throw new Error(data.message);
    }
  } catch(err) {
    btn.disabled = false;
    document.getElementById('ratingBtnTxt').textContent = '✦ Send Feedback to Eyob';
    document.getElementById('ratingSpinner').style.display = 'none';
    showToast('Failed to send. Please try again.', 'e');
  }
}
/* ═══ DRUG FILTER BAR BUTTONS (re-init for correct scoping) ═══ */
document.querySelectorAll('#drugFilterBar .fbtn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#drugFilterBar .fbtn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

