const DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

function blankData() {
  const menus = {};
  const prep = {};
  for (let week = 1; week <= 4; week += 1) {
    menus[week] = {};
    prep[week] = {};
    for (const day of DAYS) {
      menus[week][day] = ['', '', ''];
      prep[week][day] = [];
    }
  }
  return {
    settings: {
      title: 'Meal Prep Companion',
      cycleStart: '',
      owners: ['Me', 'Partner', 'Helper']
    },
    menus,
    prep,
    shoppingMaster: []
  };
}

const manifest = JSON.stringify({
  name: 'Meal Prep Companion',
  short_name: 'Meal Prep',
  start_url: '/',
  display: 'standalone',
  background_color: '#f4f7f3',
  theme_color: '#173c32',
  icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }]
});

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
<rect width="128" height="128" rx="28" fill="#173c32"/>
<path d="M31 81c28-4 43-20 59-48 8 34-4 59-32 62-12 1-22-4-27-14Z" fill="#e9b44c"/>
<path d="M38 88c13-17 29-30 49-43" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
</svg>`;

const serviceWorker = `const CACHE='meal-prep-public-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('/',copy))}return response}).catch(()=>caches.match('/')));
  }
});`;

function page() {
  const initial = JSON.stringify(blankData()).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#173c32">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <title>Meal Prep Companion</title>
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <style>
    :root{--ink:#173c32;--paper:#f4f7f3;--card:#fff;--gold:#e9b44c;--muted:#66756d;--line:#d9e3dc;--soft:#e9f1ec;--red:#a34435}
    *{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.45 ui-rounded,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    button,input,select{font:inherit}.shell{max-width:780px;margin:auto;padding:calc(18px + env(safe-area-inset-top)) 16px calc(96px + env(safe-area-inset-bottom))}
    header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}.brand{display:flex;align-items:center;gap:11px}.logo{display:grid;place-items:center;width:44px;height:44px;border-radius:14px;background:var(--ink);font-size:23px}.eyebrow{font-size:.76rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:850}h1{font-size:1.32rem;margin:0}h2{font-size:1.45rem;margin:4px 0 5px}h3{margin:0}.pill,.primary,.secondary,.danger{border:0;border-radius:12px;padding:10px 13px;font-weight:800}.pill,.secondary{background:#fff;color:var(--ink);border:1px solid var(--line)}.primary{background:var(--ink);color:#fff}.danger{background:#fff0ec;color:var(--red)}
    .panel{display:none}.panel.active{display:block}.hero{background:var(--ink);color:#fff;border-radius:23px;padding:20px;margin-bottom:18px}.hero-row{display:flex;justify-content:space-between;gap:12px}.hero .eyebrow{color:#b7cec4}.badge{height:max-content;background:#fff1c9;color:#694d0b;padding:5px 9px;border-radius:9px;font-size:.78rem;font-weight:850}.progress{height:7px;background:#365c50;border-radius:10px;overflow:hidden;margin-top:16px}.progress i{display:block;height:100%;background:var(--gold)}
    .section{margin:19px 0}.section-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px}.section-head h3{font-size:.86rem;letter-spacing:.08em;text-transform:uppercase}.muted,.section-head span{color:var(--muted);font-size:.88rem}.meal-row{display:flex;gap:8px;overflow:auto}.meal{min-width:155px;background:var(--soft);padding:12px;border-radius:15px}.meal b{display:block;font-size:.75rem;text-transform:uppercase;margin-bottom:3px}.tasks{display:grid;gap:9px}.task{display:grid;grid-template-columns:27px 1fr;gap:9px;background:#fff;border:1px solid var(--line);padding:13px;border-radius:16px}.task.preview{grid-template-columns:1fr;background:var(--soft)}.task input[type=checkbox]{appearance:none;width:23px;height:23px;border:2px solid #9aad9f;border-radius:7px}.task input[type=checkbox]:checked{background:var(--ink);border-color:var(--ink)}.task input[type=checkbox]:checked:after{content:'✓';color:#fff;display:grid;place-items:center;font-weight:900}.task input[type=checkbox]:checked+label .task-text{text-decoration:line-through;color:#89948c}.task-meta{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:5px}.tag{padding:3px 7px;border-radius:7px;font-size:.72rem;font-weight:850;background:#edf1ed;color:#526158}.tag.owner{background:#e6efff;color:#285183}.task-period{margin:11px 2px 1px;padding-top:8px;border-top:1px solid var(--line);font-size:.82rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}.task-period:first-child{margin-top:0;border:0;padding-top:0}
    .tabs{display:flex;gap:6px;overflow:auto;margin-bottom:12px}.tabs button{border:1px solid var(--line);background:#fff;color:var(--ink);padding:9px 12px;border-radius:11px;font-weight:800;white-space:nowrap}.tabs button.active{background:var(--ink);color:#fff}.card,.editor{background:#fff;border:1px solid var(--line);border-radius:18px;padding:15px;margin-bottom:11px}.card h3{margin-bottom:7px}.menu-line{display:grid;grid-template-columns:84px 1fr;gap:8px;padding:7px 0;border-top:1px solid #edf1ed}.menu-line:first-of-type{border:0}.editor label{display:block;font-size:.84rem;font-weight:800;margin:10px 0 4px}.editor input,.editor select{width:100%;border:1px solid #bdc9c0;border-radius:10px;padding:10px;background:#fff;color:var(--ink)}.task-edit{border:1px solid var(--line);border-radius:14px;padding:10px;margin:9px 0;background:var(--paper)}.task-grid{display:grid;grid-template-columns:1fr 1fr auto;gap:7px}.task-grid .task-name{grid-column:1/-1}.remove{border:0;border-radius:10px;background:#fff0ec;color:var(--red);padding:8px;font-weight:800}.add-row{display:grid;grid-template-columns:1fr 1fr auto;gap:7px;margin-top:13px;padding-top:13px;border-top:1px solid var(--line)}.add-row button{white-space:nowrap}.savebar{position:sticky;bottom:82px;background:rgba(244,247,243,.95);border:1px solid var(--line);border-radius:15px;padding:9px;display:flex;align-items:center;justify-content:space-between;gap:9px;z-index:2}.status{font-size:.86rem;color:var(--muted)}.shop{display:grid;grid-template-columns:1fr auto;gap:8px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:11px;margin-bottom:8px}.shop-fields{display:grid;gap:6px}.shop input{width:100%;border:1px solid #bdc9c0;border-radius:9px;padding:9px}.notice,.empty{padding:14px;border-radius:14px;margin-bottom:12px}.notice{background:#fff8df;color:#6b5013}.empty{border:1px dashed #aebeb2;color:var(--muted)}
    nav{position:fixed;bottom:0;left:0;right:0;padding:8px 12px calc(8px + env(safe-area-inset-bottom));background:rgba(244,247,243,.95);display:flex;justify-content:center}nav div{width:min(756px,100%);display:grid;grid-template-columns:repeat(5,1fr);gap:3px;background:#fff;border:1px solid var(--line);border-radius:17px;padding:5px}nav button{border:0;background:none;color:var(--muted);padding:9px 2px;border-radius:12px;font-weight:800;font-size:.78rem}nav button.active{background:var(--ink);color:#fff}
    @media(min-width:680px){.tasks{grid-template-columns:1fr 1fr}.task-period{grid-column:1/-1}.hero{padding:25px}}
  </style>
</head>
<body>
<main class="shell">
  <header><div class="brand"><div class="logo">🌿</div><div><div class="eyebrow">Four-week planner</div><h1 id="appTitle">Meal Prep Companion</h1></div></div><button class="pill" id="weekPill">Week 1</button></header>

  <section id="today" class="panel active">
    <div class="hero"><div class="hero-row"><div><div class="eyebrow">Today</div><h2 id="dateTitle"></h2><div id="todayDay"></div></div><span class="badge" id="doneText">0 done</span></div><div class="progress"><i id="progress"></i></div></div>
    <div class="section"><div class="section-head"><h3>Today's menu</h3></div><div class="meal-row" id="todayMeals"></div></div>
    <div class="section"><div class="section-head"><h3>Do today</h3><span id="taskCount"></span></div><div class="tasks" id="todayTasks"></div></div>
    <div class="section"><div class="section-head"><h3>Tomorrow's menu</h3><span id="tomorrowLabel"></span></div><div class="meal-row" id="tomorrowMeals"></div></div>
    <div class="section"><div class="section-head"><h3>Tomorrow's tasks</h3><span>Preview only</span></div><div class="tasks" id="tomorrowTasks"></div></div>
  </section>

  <section id="menu" class="panel"><div class="tabs" id="menuWeeks"></div><div id="menuView"></div></section>

  <section id="shopping" class="panel">
    <div class="notice">Add ingredients, their uses and optional week numbers. Leave weeks blank for items needed every week.</div>
    <div id="shoppingList"></div><button class="secondary" id="addShopping">+ Add ingredient</button>
    <div class="savebar"><span class="status" id="shoppingStatus">No unsaved changes</span><button class="primary" id="saveShopping">Save list</button></div>
  </section>

  <section id="edit" class="panel">
    <div class="notice">Select a week and day. Each task has an owner and a time section.</div>
    <div class="tabs" id="editWeeks"></div><div class="tabs" id="editDays"></div>
    <div class="editor"><h3>Meals</h3><label>Breakfast</label><input id="editBreakfast"><label>Lunch</label><input id="editLunch"><label>Dinner</label><input id="editDinner"></div>
    <div class="editor"><h3>Preparation tasks</h3><div id="taskEditor"></div><div class="add-row"><select id="newOwner"></select><select id="newTime"><option>Morning</option><option>Afternoon</option><option>Evening</option></select><button class="secondary" id="addTask">+ Add</button></div></div>
    <div class="savebar"><span class="status" id="editStatus">No unsaved changes</span><button class="primary" id="saveEdit">Save changes</button></div>
  </section>

  <section id="settings" class="panel">
    <div class="editor"><h3>Planner settings</h3><label>Application title</label><input id="settingTitle"><label>Week 1 starts on</label><input id="cycleStart" type="date"><label>Owner 1</label><input class="owner-setting"><label>Owner 2</label><input class="owner-setting"><label>Owner 3</label><input class="owner-setting"></div>
    <div class="savebar"><span class="status" id="settingsStatus">No unsaved changes</span><button class="primary" id="saveSettings">Save settings</button></div>
  </section>
</main>
<nav><div><button class="active" data-panel="today">Today</button><button data-panel="menu">Menu</button><button data-panel="shopping">Shopping</button><button data-panel="edit">Edit</button><button data-panel="settings">Settings</button></div></nav>

<script>
const blank=${initial};
const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],ordered=['Sat','Sun','Mon','Tue','Wed','Thu','Fri'],mealNames=['Breakfast','Lunch','Dinner'],timeRank={Morning:0,Afternoon:1,Evening:2};
let data=blank,menuWeek=1,editWeek=1,editDay='Sat',checks=new Set(),todayDate='',dirty=false;
const el=id=>document.getElementById(id),esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0'),dateKey=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const fmt=d=>d.toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long'});
const uid=()=>crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);
function weekFor(date){const start=data.settings.cycleStart;if(!start)return 1;const anchor=new Date(start+'T00:00:00'),day=new Date(date.getFullYear(),date.getMonth(),date.getDate()),block=Math.floor((day-anchor)/(7*86400000));return ((block%4)+4)%4+1}
function ensureData(){data.settings??=structuredClone(blank.settings);data.settings.owners=(data.settings.owners||blank.settings.owners).slice(0,3);while(data.settings.owners.length<3)data.settings.owners.push('Owner '+(data.settings.owners.length+1));data.shoppingMaster??=[];for(let w=1;w<=4;w++){data.menus[w]??={};data.prep[w]??={};for(const d of ordered){data.menus[w][d]??=['','',''];data.prep[w][d]??=[];data.prep[w][d]=data.prep[w][d].map((t,i)=>({...t,id:t.id||uid(),owner:t.owner||data.settings.owners[0],time:t.time||'Morning',position:Number.isFinite(t.position)?t.position:i}))}}}
function sortTasks(items){return [...items].sort((a,b)=>(timeRank[a.time]??9)-(timeRank[b.time]??9)||(a.position??0)-(b.position??0))}
async function request(path,options){const response=await fetch(path,options);if(!response.ok)throw new Error(await response.text());return response.json()}
async function load(){try{data=await request('/api/data')}catch{data=structuredClone(blank)}ensureData();const now=new Date();menuWeek=weekFor(now);editWeek=menuWeek;editDay=days[now.getDay()];await loadChecks(now);makeTabs();renderAll()}
async function loadChecks(now){todayDate=dateKey(now);try{const result=await request('/api/checks?date='+todayDate);checks=new Set(result.completed||[])}catch{checks=new Set(JSON.parse(localStorage.getItem('checks-'+todayDate)||'[]'))}}
function period(task,previous){if(task.time===previous)return'';const icon=task.time==='Morning'?'☀️':task.time==='Afternoon'?'🌤️':'🌙';return'<div class="task-period">'+icon+' '+esc(task.time)+'</div>'}
function mealCards(values){return values.map((value,i)=>'<div class="meal"><b>'+mealNames[i]+'</b>'+(esc(value)||'<span class="muted">Not planned</span>')+'</div>').join('')}
function taskCards(items,preview=false){let previous='';return items.length?items.map((task,i)=>{const header=period(task,previous);previous=task.time;const body='<div><div class="task-meta"><span class="tag owner">'+esc(task.owner)+'</span><span class="tag">'+esc(task.time)+'</span></div><div class="task-text">'+esc(task.text)+'</div></div>';if(preview)return header+'<div class="task preview">'+body+'</div>';return header+'<div class="task"><input type="checkbox" data-id="'+esc(task.id)+'" id="task-'+i+'" '+(checks.has(task.id)?'checked':'')+'><label for="task-'+i+'">'+body+'</label></div>'}).join(''):'<div class="empty">Nothing planned.</div>'}
function renderToday(){const now=new Date(),tomorrow=new Date(now);tomorrow.setDate(now.getDate()+1);const week=weekFor(now),day=days[now.getDay()],nextWeek=weekFor(tomorrow),nextDay=days[tomorrow.getDay()],items=sortTasks(data.prep[week][day]);el('appTitle').textContent=data.settings.title||'Meal Prep Companion';document.title=data.settings.title||'Meal Prep Companion';el('weekPill').textContent='Week '+week;el('dateTitle').textContent=fmt(now);el('todayDay').textContent=day;el('todayMeals').innerHTML=mealCards(data.menus[week][day]);el('tomorrowLabel').textContent=fmt(tomorrow);el('tomorrowMeals').innerHTML=mealCards(data.menus[nextWeek][nextDay]);el('todayTasks').innerHTML=taskCards(items);el('tomorrowTasks').innerHTML=taskCards(sortTasks(data.prep[nextWeek][nextDay]),true);const done=items.filter(t=>checks.has(t.id)).length;el('taskCount').textContent=items.length+' tasks';el('doneText').textContent=done+' of '+items.length+' done';el('progress').style.width=(items.length?done/items.length*100:0)+'%';el('todayTasks').querySelectorAll('input').forEach(box=>box.onchange=()=>toggleCheck(box.dataset.id,box.checked,now))}
async function toggleCheck(id,completed,now){if(completed)checks.add(id);else checks.delete(id);localStorage.setItem('checks-'+todayDate,JSON.stringify([...checks]));renderToday();try{await request('/api/checks',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({date:todayDate,key:id,completed})})}catch{if(completed)checks.delete(id);else checks.add(id);renderToday();el('doneText').textContent='Sync failed'}}
function makeTabs(){el('menuWeeks').innerHTML=[1,2,3,4].map(w=>'<button data-week="'+w+'">Week '+w+'</button>').join('');el('editWeeks').innerHTML=[1,2,3,4].map(w=>'<button data-week="'+w+'">W'+w+'</button>').join('');el('editDays').innerHTML=ordered.map(d=>'<button data-day="'+d+'">'+d+'</button>').join('');el('menuWeeks').querySelectorAll('button').forEach(b=>b.onclick=()=>{menuWeek=+b.dataset.week;renderMenu()});el('editWeeks').querySelectorAll('button').forEach(b=>b.onclick=()=>{captureEdit();editWeek=+b.dataset.week;renderEdit()});el('editDays').querySelectorAll('button').forEach(b=>b.onclick=()=>{captureEdit();editDay=b.dataset.day;renderEdit()})}
function renderMenu(){el('menuWeeks').querySelectorAll('button').forEach(b=>b.classList.toggle('active',+b.dataset.week===menuWeek));el('menuView').innerHTML=ordered.map(day=>'<div class="card"><h3>'+day+'</h3>'+data.menus[menuWeek][day].map((value,i)=>'<div class="menu-line"><b>'+mealNames[i]+'</b><span>'+(esc(value)||'<span class="muted">Not planned</span>')+'</span></div>').join('')+'</div>').join('')}
function ownerOptions(selected){return data.settings.owners.map(owner=>'<option '+(owner===selected?'selected':'')+'>'+esc(owner)+'</option>').join('')}
function captureEdit(){const rows=[...document.querySelectorAll('.task-edit')];data.menus[editWeek][editDay]=[el('editBreakfast').value.trim(),el('editLunch').value.trim(),el('editDinner').value.trim()];data.prep[editWeek][editDay]=rows.map((row,i)=>({id:row.dataset.id,text:row.querySelector('.task-name').value.trim(),owner:row.querySelector('.task-owner').value,time:row.querySelector('.task-time').value,position:i})).filter(t=>t.text);dirty=true;el('editStatus').textContent='Unsaved changes'}
function renderEdit(){el('editWeeks').querySelectorAll('button').forEach(b=>b.classList.toggle('active',+b.dataset.week===editWeek));el('editDays').querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.day===editDay));const meals=data.menus[editWeek][editDay],items=sortTasks(data.prep[editWeek][editDay]);el('editBreakfast').value=meals[0];el('editLunch').value=meals[1];el('editDinner').value=meals[2];let previous='';el('taskEditor').innerHTML=items.map(task=>{const header=period(task,previous);previous=task.time;return header+'<div class="task-edit" data-id="'+esc(task.id)+'"><div class="task-grid"><input class="task-name" value="'+esc(task.text)+'" placeholder="One clear action"><select class="task-owner">'+ownerOptions(task.owner)+'</select><select class="task-time"><option '+(task.time==='Morning'?'selected':'')+'>Morning</option><option '+(task.time==='Afternoon'?'selected':'')+'>Afternoon</option><option '+(task.time==='Evening'?'selected':'')+'>Evening</option></select><button class="remove" type="button">Remove</button></div></div>'}).join('');el('newOwner').innerHTML=ownerOptions(data.settings.owners[0]);el('taskEditor').querySelectorAll('.remove').forEach(button=>button.onclick=()=>{button.closest('.task-edit').remove();captureEdit();renderEdit()})}
function captureShopping(){data.shoppingMaster=[...document.querySelectorAll('.shop')].map(row=>({name:row.querySelector('.shop-name').value.trim(),uses:row.querySelector('.shop-use').value.trim(),weeks:row.querySelector('.shop-weeks').value.split(/[^1-4]+/).map(Number).filter(n=>n>=1&&n<=4)})).filter(item=>item.name)}
function renderShopping(){el('shoppingList').innerHTML=data.shoppingMaster.map((item,i)=>'<div class="shop"><div class="shop-fields"><input class="shop-name" value="'+esc(item.name)+'" placeholder="Ingredient"><input class="shop-use" value="'+esc(item.uses)+'" placeholder="Used in"><input class="shop-weeks" value="'+esc((item.weeks||[]).join(', '))+'" placeholder="Weeks; blank means every week"></div><button class="remove" data-index="'+i+'">×</button></div>').join('')||'<div class="empty">No ingredients yet.</div>';el('shoppingList').querySelectorAll('.remove').forEach(button=>button.onclick=()=>{captureShopping();data.shoppingMaster.splice(+button.dataset.index,1);renderShopping();el('shoppingStatus').textContent='Unsaved changes'})}
function renderSettings(){el('settingTitle').value=data.settings.title;el('cycleStart').value=data.settings.cycleStart;document.querySelectorAll('.owner-setting').forEach((input,i)=>input.value=data.settings.owners[i]||'')}
function renderAll(){renderToday();renderMenu();renderEdit();renderShopping();renderSettings()}
async function saveData(statusId){const status=el(statusId);status.textContent='Saving…';try{await request('/api/data',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify(data)});status.textContent='Saved on all devices ✓';dirty=false;renderAll()}catch{status.textContent='Could not save. Try again.'}}
el('edit').addEventListener('input',()=>{dirty=true;el('editStatus').textContent='Unsaved changes'});el('taskEditor').addEventListener('change',event=>{if(event.target.matches('.task-time')){captureEdit();renderEdit()}});el('addTask').onclick=()=>{captureEdit();data.prep[editWeek][editDay].push({id:uid(),text:'',owner:el('newOwner').value,time:el('newTime').value,position:data.prep[editWeek][editDay].length});renderEdit();dirty=true;el('editStatus').textContent='Unsaved changes'};el('saveEdit').onclick=()=>{captureEdit();saveData('editStatus')};
el('addShopping').onclick=()=>{captureShopping();data.shoppingMaster.push({name:'',uses:'',weeks:[]});renderShopping();el('shoppingStatus').textContent='Unsaved changes'};el('shopping').addEventListener('input',()=>el('shoppingStatus').textContent='Unsaved changes');el('saveShopping').onclick=()=>{captureShopping();saveData('shoppingStatus')};
el('settings').addEventListener('input',()=>el('settingsStatus').textContent='Unsaved changes');el('saveSettings').onclick=()=>{data.settings.title=el('settingTitle').value.trim()||'Meal Prep Companion';data.settings.cycleStart=el('cycleStart').value;data.settings.owners=[...document.querySelectorAll('.owner-setting')].map((input,i)=>input.value.trim()||'Owner '+(i+1));saveData('settingsStatus')};
document.querySelectorAll('nav button').forEach(button=>button.onclick=()=>{if(button.dataset.panel!=='edit'&&dirty)captureEdit();document.querySelectorAll('nav button,.panel').forEach(node=>node.classList.remove('active'));button.classList.add('active');el(button.dataset.panel).classList.add('active');if(button.dataset.panel==='menu')renderMenu();if(button.dataset.panel==='shopping')renderShopping();if(button.dataset.panel==='settings')renderSettings();window.scrollTo({top:0,behavior:'smooth'})});
async function refreshChecks(){const now=new Date();if(dateKey(now)!==todayDate){location.reload();return}await loadChecks(now);renderToday()}
window.addEventListener('focus',refreshChecks);document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshChecks()});setInterval(()=>{if(!document.hidden)refreshChecks()},15000);window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue=''}});if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));load();
</script>
</body>
</html>`;
}

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store'
};

function json(value, init = {}) {
  return Response.json(value, { ...init, headers: { ...jsonHeaders, ...(init.headers || {}) } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/manifest.webmanifest') {
      return new Response(manifest, { headers: { 'content-type': 'application/manifest+json' } });
    }
    if (url.pathname === '/sw.js') {
      return new Response(serviceWorker, { headers: { 'content-type': 'application/javascript; charset=utf-8', 'cache-control': 'no-cache' } });
    }
    if (url.pathname === '/icon.svg') {
      return new Response(icon, { headers: { 'content-type': 'image/svg+xml', 'cache-control': 'public, max-age=86400' } });
    }

    if (url.pathname === '/api/data' && request.method === 'GET') {
      try {
        const row = await env.DB.prepare('SELECT data FROM meal_prep_settings WHERE id = ?').bind(1).first();
        return json(row ? JSON.parse(row.data) : blankData());
      } catch (error) {
        console.error('Data load failed', error);
        return json({ error: 'Storage unavailable' }, { status: 503 });
      }
    }

    if (url.pathname === '/api/data' && request.method === 'PUT') {
      try {
        const raw = await request.text();
        if (raw.length > 200000) return json({ error: 'Payload too large' }, { status: 413 });
        const value = JSON.parse(raw);
        if (!value?.menus || !value?.prep || !value?.settings || !Array.isArray(value.shoppingMaster)) {
          return json({ error: 'Invalid planner data' }, { status: 400 });
        }
        await env.DB.prepare('INSERT INTO meal_prep_settings (id, data, updated_at) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at')
          .bind(1, JSON.stringify(value), new Date().toISOString()).run();
        return json({ ok: true });
      } catch (error) {
        console.error('Data save failed', error);
        return json({ error: 'Save failed' }, { status: 500 });
      }
    }

    if (url.pathname === '/api/checks' && request.method === 'GET') {
      try {
        const date = url.searchParams.get('date') || '';
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json({ error: 'Invalid date' }, { status: 400 });
        const rows = await env.DB.prepare('SELECT task_key FROM task_checkmarks WHERE task_date = ? AND completed = 1').bind(date).all();
        return json({ completed: (rows.results || []).map(row => row.task_key) });
      } catch (error) {
        console.error('Checkmark load failed', error);
        return json({ error: 'Checkmarks unavailable' }, { status: 503 });
      }
    }

    if (url.pathname === '/api/checks' && request.method === 'PUT') {
      try {
        const raw = await request.text();
        if (raw.length > 2000) return json({ error: 'Payload too large' }, { status: 413 });
        const value = JSON.parse(raw);
        const date = String(value.date || '');
        const key = String(value.key || '');
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !key || key.length > 200 || typeof value.completed !== 'boolean') {
          return json({ error: 'Invalid checkmark' }, { status: 400 });
        }
        if (value.completed) {
          await env.DB.prepare('INSERT INTO task_checkmarks (task_date, task_key, completed, updated_at) VALUES (?, ?, 1, ?) ON CONFLICT(task_date, task_key) DO UPDATE SET completed = 1, updated_at = excluded.updated_at')
            .bind(date, key, new Date().toISOString()).run();
        } else {
          await env.DB.prepare('DELETE FROM task_checkmarks WHERE task_date = ? AND task_key = ?').bind(date, key).run();
        }
        return json({ ok: true });
      } catch (error) {
        console.error('Checkmark save failed', error);
        return json({ error: 'Checkmark save failed' }, { status: 500 });
      }
    }

    if (url.pathname !== '/') return new Response('Not found', { status: 404 });
    return new Response(page(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
  }
};
