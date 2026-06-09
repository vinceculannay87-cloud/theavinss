/* ============================================================
   FOR MY LOVE — Site script
   Hamburger, particles, gallery, timeline, marry-me, animations
   ============================================================ */

/* ===== Background particles ===== */
function spawnParticles(n=24){
  const wrap=document.createElement('div');
  wrap.className='particles';
  for(let i=0;i<n;i++){
    const s=document.createElement('span');
    const size=8+Math.random()*20;
    s.textContent='\u2726';
    s.style.left=Math.random()*100+'%';
    s.style.fontSize=size+'px';
    s.style.animationDuration=(10+Math.random()*14)+'s';
    s.style.animationDelay=(Math.random()*14)+'s';
    wrap.appendChild(s);
  }
  document.body.appendChild(wrap);
}

/* ===== Hamburger menu ===== */
const NAV = [
  {href:'index.html',label:'Home',icon:'fa-house'},
  {href:'story.html',label:'Our Story',icon:'fa-book-heart'},
  {href:'gallery.html',label:'Gallery',icon:'fa-images'},
  {href:'timeline.html',label:'Timeline',icon:'fa-clock-rotate-left'},
  {href:'timer.html',label:'Countdown',icon:'fa-hourglass-half'},
  {href:'letter.html',label:'Letter',icon:'fa-envelope-open-text'},
  {href:'reasons.html',label:'Reasons',icon:'fa-heart'},
  {href:'future.html',label:'Future',icon:'fa-star'},
  {href:'music.html',label:'Music',icon:'fa-music'},
  {href:'game.html',label:'Game',icon:'fa-gamepad'},
  {href:'confession.html',label:'Confession',icon:'fa-feather'},
  {href:'marry.html',label:'Marry Me',icon:'fa-ring'},
];

function injectNav(){
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const bar=document.createElement('header');
  bar.className='topbar';
  bar.innerHTML=`
    <a class="brand" href="index.html">Althea Nicole &amp; Vince</a>
    <button class="hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>`;
  const overlay=document.createElement('div');
  overlay.className='menu-overlay';overlay.id='menuOverlay';
  const side=document.createElement('aside');
  side.className='sidemenu';side.id='sideMenu';
  side.innerHTML=`
    <button class="close" id="menuClose" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button>
    <h3>Navigate</h3>
    <ul>${NAV.map(n=>`
      <li><a href="${n.href}" class="${current===n.href?'active':''}">
        <i class="fa-solid ${n.icon}"></i><span>${n.label}</span>
      </a></li>`).join('')}</ul>`;
  document.body.prepend(bar);
  document.body.appendChild(overlay);
  document.body.appendChild(side);
  setTimeout(() => {
  const active = side.querySelector('.active');
  if(active){
    active.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}, 100);

  const ham=document.getElementById('hamburger');
  const open=()=>{side.classList.add('open');overlay.classList.add('open');ham.classList.add('open');document.body.style.overflow='hidden'};
  const close=()=>{side.classList.remove('open');overlay.classList.remove('open');ham.classList.remove('open');document.body.style.overflow=''};
  ham.addEventListener('click',()=>side.classList.contains('open')?close():open());
  overlay.addEventListener('click',close);
  document.getElementById('menuClose').addEventListener('click',close);
}

/* ===== Typing effect ===== */
function typeText(el,text,speed=55){
  if(!el)return;let i=0;el.textContent='';
  (function tick(){
    if(i<text.length){el.textContent+=text.charAt(i++);setTimeout(tick,speed)}
  })();
}

/* ===== Scroll reveal ===== */
function revealOnScroll(selector='.t-item'){
  const items=document.querySelectorAll(selector);
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
  },{threshold:.15});
  items.forEach(i=>io.observe(i));
}

/* ===== LocalStorage helpers ===== */
const store = {
  get: (k, fallback = []) => {
    try {
      const value = localStorage.getItem(k);
      return value ? JSON.parse(value) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v))
};

const SUPABASE_URL =
  "https://vepggtiujdvlxvzophds.supabase.co";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlcGdndGl1amR2bHh2em9waGRzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDgyNTc4NywiZXhwIjoyMDk2NDAxNzg3fQ.kNeEH4iZS1uFa8r3QsJDdWrZtFji07ct2gDONprsLek";

const SUPABASE_BUCKET = 'memories';

// Default placeholders to avoid ReferenceError when not provided
const SUPABASE_DEFAULT_URL = '';
const SUPABASE_DEFAULT_ANON_KEY = '';

// Supabase client is created when needed through createSupabaseClient().
function getSupabaseConfig() {
  return window.SUPABASE_CONFIG || {};
}

function getSupabaseCredentials() {
  const config = getSupabaseConfig();
  const url = config.url || window.SUPABASE_URL || SUPABASE_URL;
  const anonKey = config.anonKey || window.SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;
  const bucket = config.bucket || window.SUPABASE_BUCKET || SUPABASE_BUCKET;
  return { url, anonKey, bucket };
}

function getSupabaseBucket() {
  return getSupabaseCredentials().bucket;
}

function createSupabaseClient() {
  const { url, anonKey } = getSupabaseCredentials();

  if (!url || !anonKey) {
    console.error('Supabase configuration missing. Set SUPABASE_URL and SUPABASE_ANON_KEY in script.js.');
    return null;
  }

  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    console.error('Supabase JS library is not loaded. Add the Supabase script before script.js.');
    return null;
  }

  return window.supabase.createClient(url, anonKey);
}

/* home */
function fallingLeaves() {
  const container = document.getElementById("leaves");

  const colors = [
    "#d8b4fe",
    "#c084fc",
    "#a855f7",
    "#9333ea"
  ];

  setInterval(() => {
const leaf = document.createElement("img");

leaf.src = "/maple-leaf.png";
leaf.className = "falling-leaf";
leaf.style.color = "#a855f7";

leaf.style.left = Math.random() * 100 + "vw";
leaf.style.width = (12 + Math.random() * 18) + "px";

leaf.style.animationDuration =
  (8 + Math.random() * 6) + "s";

leaf.style.setProperty(
  "--drift",
  (Math.random() * 120 - 60) + "px"
);

    container.appendChild(leaf);

    setTimeout(() => leaf.remove(), 15000);

  }, 300);
}

fallingLeaves();


/* ===== Gallery (memories) ===== */
function initGallery(){
  const grid=document.getElementById('memGrid');
  const empty=document.getElementById('memEmpty');
  const addBtn=document.getElementById('addMemBtn');
  const overlay=document.getElementById('memModal');
  const form=document.getElementById('memForm');
  const fileInput=document.getElementById('memFile');
  const preview=document.getElementById('memPreview');
  const cancel=document.getElementById('memCancel');

  if (!overlay || !form || !fileInput || !preview || !cancel) {
    console.warn('Gallery modal elements not found.');
    return;
  }

  const supabase = createSupabaseClient();
  const bucket = getSupabaseBucket();
  const isSupabaseConfigured = !!supabase && !!bucket;

  const LOCAL_KEY = 'gallery_local_memories';

  let galleryData = [];
  let selectedFile = null;

  const imgOverlay = document.getElementById('imgOverlay');
  const imgPreviewFull = document.getElementById('imgPreviewFull');
  const closeImg = document.getElementById('closeImg');



  async function fetchGallery(){
    if (!isSupabaseConfigured || !supabase) {
      // Load from localStorage fallback so Save still works without Supabase
      galleryData = store.get(LOCAL_KEY, []);
      render();
      return;
    }

    try {
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      galleryData = data || [];

      render();
    } catch (err) {
      console.error('Gallery load failed:', err);
      galleryData = [];
      render();
    }
  }

  function openImage(src){
    imgPreviewFull.src = src;
    imgOverlay.classList.add('show');
  }

  function closeImage(){
    imgOverlay.classList.remove('show');
  }

  imgOverlay.addEventListener('click', (e) => {
    if (e.target === imgOverlay) closeImage();
  });

  closeImg.addEventListener('click', closeImage);

  async function updateDescription(id, desc){
    try {
      if (!isSupabaseConfigured || !supabase) {
        const all = store.get(LOCAL_KEY, []);
        const i = all.findIndex(item => String(item.id) === String(id));
        if (i > -1) { all[i].description = desc; store.set(LOCAL_KEY, all); await fetchGallery(); return; }
        throw new Error('Local item not found');
      }

      const { error } = await supabase
        .from('memories')
        .update({ description: desc })
        .eq('id', id);
      if (error) throw error;
      await fetchGallery();
    } catch (err) {
      console.error(err);
      alert('Unable to update description.');
    }
  }

  async function deleteMemory(id){
    if (!confirm('Delete this memory?')) return;
    try {
      if (!isSupabaseConfigured || !supabase) {
        const all = store.get(LOCAL_KEY, []);
        const filtered = all.filter(item => String(item.id) !== String(id));
        store.set(LOCAL_KEY, filtered);
        await fetchGallery();
        return;
      }

      const memory = galleryData.find(item => String(item.id) === String(id));
      if (memory?.image_path) {
        const { error: storageError } = await supabase
          .storage.from(bucket)
          .remove([memory.image_path]);
        if (storageError) throw storageError;
      }

      const { error: deleteError } = await supabase
        .from('memories')
        .delete()
        .eq('id', id);
      if (deleteError) throw deleteError;

      await fetchGallery();
    } catch (err) {
      console.error(err);
      alert('Unable to delete memory.');
    }
  }

  function render(){
    grid.innerHTML = '';
    if (!galleryData.length) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    galleryData.forEach((memory, idx) => {
      const card = document.createElement('article');
      card.className = 'glass mem-card';
      card.style.animationDelay = `${idx * 70}ms`;
      const imageUrl = memory.image_url || (memory.image_path ? supabase.storage.from(bucket).getPublicUrl(memory.image_path).data.publicUrl : '');
      card.innerHTML = `
        <div class="img"><img src="${imageUrl}" alt="memory"></div>
        <div class="body">
          <div class="date">
            <i class="fa-solid fa-calendar"></i>${formatDate(memory.date)}
          </div>
          <div class="desc">${escapeHtml(memory.description)}</div>
        </div>
        <button class="view" data-src="${imageUrl}">
          <i class="fa-solid fa-eye"></i> View Image
        </button>
        <button class="edit" data-id="${memory.id}" aria-label="Edit">
          <i class="fa-solid fa-pen"></i>
        </button>
      `;
      grid.appendChild(card);
    });

    grid.querySelectorAll('.view').forEach(btn => {
      btn.addEventListener('click', () => openImage(btn.dataset.src));
    });

    grid.querySelectorAll('.edit').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const memory = galleryData.find(item => item.id == id);
        if (!memory) return;
        const newDesc = prompt('Edit description:', memory.description);
        if (newDesc !== null && newDesc.trim() !== '') {
          await updateDescription(id, newDesc.trim());
        }
      });
    });

    grid.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        await deleteMemory(btn.dataset.id);
      });
    });
  }

  function openModal(){
    overlay.classList.add('show');
    selectedFile = null;
    preview.innerHTML = '';
    form.reset();
  }

  function closeModal(){
    overlay.classList.remove('show');
  }

  addBtn.addEventListener('click', openModal);
  cancel.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  fileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = ev => {
      preview.innerHTML = `<img src="${ev.target.result}" alt="preview">`;
    };
    reader.readAsDataURL(file);
  });

  async function uploadFile(file){
    if (!isSupabaseConfigured || !supabase) {
      // Fallback: read file as data URL and store locally
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ url: reader.result, path: null });
        reader.onerror = () => reject(new Error('File read failed'));
        reader.readAsDataURL(file);
      });
    }

    if (!bucket) {
      throw new Error('Supabase storage bucket is not configured. Set SUPABASE_BUCKET or SUPABASE_CONFIG.bucket.');
    }

    const fileExt = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase
      .storage.from(bucket)
      .upload(filePath, file, { upsert: false });
    if (uploadError) {
      console.error('Supabase storage upload failed:', uploadError);
      throw uploadError;
    }

    const { data: publicUrlData, error: urlError } = await supabase
      .storage.from(bucket)
      .getPublicUrl(filePath);
    if (urlError) {
      console.error('Getting public URL failed:', urlError);
      throw urlError;
    }

    return { url: publicUrlData.publicUrl, path: filePath };
  }

  async function uploadImage(file) {
    return await uploadFile(file);
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const date = form.querySelector('input[name="date"]').value;
    const desc = form.querySelector('textarea[name="desc"]').value.trim();

    if (!selectedFile || !date || !desc) {
      alert('Please complete all fields.');
      return;
    }

    try {
      const { url, path } = await uploadImage(selectedFile);

      if (!isSupabaseConfigured || !supabase) {
        // save locally
        const all = store.get(LOCAL_KEY, []);
        all.push({ id: Date.now(), image_url: url, image_path: path, date, description: desc, created_at: new Date().toISOString() });
        store.set(LOCAL_KEY, all);
        closeModal();
        await fetchGallery();
        return;
      }

      const insertBody = { image_url: url, date, description: desc };

      const { error } = await supabase.from('memories').insert([
        insertBody
      ]);
      if (error) throw error;

      closeModal();
      await fetchGallery();
    } catch (err) {
      console.error('Upload error:', err);
      const msg = String(err?.message || err || 'Unknown error');
      if (msg.includes('Bucket not found') || msg.includes('storage bucket') || msg.includes('Supabase storage bucket is not configured')) {
        alert(`Unable to save the memory: ${msg}. Check SUPABASE_BUCKET and your Supabase bucket settings.`);
      } else {
        alert(`Unable to save the memory: ${msg}`);
      }
    }
  });

  fetchGallery();
}

/* ===== Timeline (events) ===== */
function initTimeline(){
  const feed=document.getElementById('feed');
  const empty=document.getElementById('feedEmpty');
  const addBtn=document.getElementById('addEventBtn');
  const overlay=document.getElementById('evtModal');
  const form=document.getElementById('evtForm');
  const cancel=document.getElementById('evtCancel');

  function render(){
    const evs=store.get('events',[]);
    feed.innerHTML='';
    if(!evs.length){empty.style.display='block';return}
    empty.style.display='none';
    evs.slice().reverse().forEach((ev,idx)=>{
      const realIdx=evs.length-1-idx;
      const d=new Date(ev.ts);
      const card=document.createElement('article');
      card.className='glass feed-card';
      card.style.animationDelay=(idx*60)+'ms';
      card.innerHTML=`
        <div class="when"><i class="fa-regular fa-clock"></i>${formatDateTime(d)}</div>
<h3 class="event-title">${escapeHtml(ev.title || 'Untitled')}</h3>
<p class="msg">${escapeHtml(ev.msg)}</p>
        <button class="del" data-i="${realIdx}" aria-label="Delete"><i class="fa-solid fa-xmark"></i></button>`;
      feed.appendChild(card);
    });
    feed.querySelectorAll('.del').forEach(b=>b.addEventListener('click',()=>{
      const i=+b.dataset.i;const all=store.get('events',[]);all.splice(i,1);store.set('events',all);render();
    }));
  }

  addBtn.addEventListener('click',()=>overlay.classList.add('show'));
  cancel.addEventListener('click',()=>overlay.classList.remove('show'));
  overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.classList.remove('show')});

form.addEventListener('submit',e=>{
  e.preventDefault();

  const title = form.title.value.trim();
  const msg = form.msg.value.trim();

  if(!title || !msg) return;

  const all = store.get('events',[]);

  all.push({
    title,
    msg,
    ts: Date.now()
  });

  store.set('events',all);

  form.reset();
  overlay.classList.remove('show');
  render();
});

  render();
}

/* ===== Countdown ===== */
function initCountdown(targetDate){
  const t=new Date(targetDate).getTime();
  const dEl=document.getElementById('cd-d');
  const hEl=document.getElementById('cd-h');
  const mEl=document.getElementById('cd-m');
  const sEl=document.getElementById('cd-s');
  function tick(){
    const now=Date.now();let diff=t-now;
    const past=diff<0;diff=Math.abs(diff);
    const d=Math.floor(diff/86400000);
    const h=Math.floor((diff%86400000)/3600000);
    const m=Math.floor((diff%3600000)/60000);
    const s=Math.floor((diff%60000)/1000);
    dEl.textContent=d;hEl.textContent=String(h).padStart(2,'0');
    mEl.textContent=String(m).padStart(2,'0');sEl.textContent=String(s).padStart(2,'0');
    const lbl=document.getElementById('cd-label');
    if(lbl)lbl.textContent=past?'Time since naging tayo':'Until our day';
  }
  tick();setInterval(tick,1000);
}

/* ===== Game (find the heart) ===== */
function initGame(){
  const grid=document.getElementById('gameGrid');
  const msg=document.getElementById('gameMsg');
  if(!grid)return;
  function build(){
    grid.innerHTML='';
    const size=30;const heartIdx=Math.floor(Math.random()*size);
    for(let i=0;i<size;i++){
      const b=document.createElement('button');
      b.textContent='?';
      b.addEventListener('click',()=>{
        if(i===heartIdx){b.innerHTML='<i class="fa-solid fa-heart" style="color:#ff8fb1"></i>';msg.textContent='kulay pink madik kanya ata hahaha';setTimeout(build,1800)}
        else{b.style.opacity=.3;msg.textContent='Partakam. hanapin ah hayss'}
      });
      grid.appendChild(b);
    }
  }
  build();
}

/* ===== Marry Me ===== */
function initMarry(){
  const yes=document.getElementById('yesBtn');
  const no=document.getElementById('noBtn');
  const wrap=document.getElementById('marryBtns');
  const celebration=document.getElementById('celebration');
  let attempts=0;
  const yesSizes=[1,1.15,1.3,1.5,1.75,2,2.3,2.6];
  const noSizes=[1,.9,.78,.66,.54,.44,.36,.3];

  function escape(){
    attempts++;
    const i=Math.min(attempts,yesSizes.length-1);
    yes.style.transform=`scale(${yesSizes[i]})`;
    no.style.transform=`scale(${noSizes[i]})`;
    // move no button
    const w=window.innerWidth,h=window.innerHeight;
    const x=(Math.random()*w*.7)-w*.35;
    const y=(Math.random()*h*.6)-h*.3;
    no.style.position='fixed';
    no.style.left=Math.max(20,Math.min(w-140,w/2+x))+'px';
    no.style.top=Math.max(80,Math.min(h-80,h/2+y))+'px';
  }
  no.addEventListener('mouseenter',escape);
  no.addEventListener('focus',escape);
  no.addEventListener('touchstart',e=>{e.preventDefault();escape()},{passive:false});
  no.addEventListener('click',escape);

  yes.addEventListener('click',()=>{
    document.getElementById('marryMain').style.display='none';
    celebration.classList.add('show');
    bloomFlowers();
    setTimeout(fallingPetals,1200);
  });
}
function bloomFlowers(){
  const N=18;
  for(let i=0;i<N;i++){
    const f=document.createElement('div');f.className='flower';
    f.style.left=(Math.random()*90+5)+'vw';
    f.style.top=(Math.random()*80+10)+'vh';
    f.style.animationDelay=(Math.random()*1.2)+'s';
    for(let p=0;p<6;p++){
      const petal=document.createElement('div');petal.className='petal';
      petal.style.transform=`rotate(${p*60}deg) translateY(-12px)`;
      f.appendChild(petal);
    }
    const c=document.createElement('div');c.className='center';f.appendChild(c);
    document.body.appendChild(f);
  }
}
function fallingPetals(){
  setInterval(()=>{
    const p=document.createElement('div');p.className='petal-fall';
    p.style.left=Math.random()*100+'vw';
    p.style.animationDuration=(6+Math.random()*6)+'s';
    p.style.opacity=.4+Math.random()*.6;
    p.style.transform=`scale(${.6+Math.random()*.9})`;
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),12000);
  },180);
}

/* ===== Utils ===== */
function escapeHtml(s) {
  return String(s).replace(/[&]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function formatDate(iso){
  try{const d=new Date(iso+'T00:00:00');return d.toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'})}catch{return iso}
}
function formatDateTime(d){
  return d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})+' · '+d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});
}

/* ===== Bootstrap ===== */
document.addEventListener('DOMContentLoaded',()=>{
  injectNav();
  spawnParticles(22);
  if(document.getElementById('memGrid')){
    initGallery();
  }
});

