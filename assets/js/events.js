
function esc(v=''){
  return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function fmtDate(iso, allDay=false){
  const d=new Date(iso);
  return new Intl.DateTimeFormat('en-US',{
    month:'short',day:'numeric',year:'numeric',
    ...(allDay?{}:{hour:'numeric',minute:'2-digit'})
  }).format(d);
}
function eventCard(e){
  const time = e.allDay ? fmtDate(e.start,true) : fmtDate(e.start,false);
  const end = (!e.allDay && e.end) ? ` – ${new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit'}).format(new Date(e.end))}` : '';
  const loc = e.location ? `<div class="event-location">${esc(e.location)}</div>` : '';
  const desc = e.description ? `<p>${esc(e.description)}</p>` : '';
  return `<article class="event-card">
    <div class="event-date">${esc(time)}${esc(end)}</div>
    <h3>${esc(e.title || 'Mane Chain Event')}</h3>
    ${loc}${desc}
  </article>`;
}
async function loadEvents(limit){
  const target=document.querySelector('#eventsGrid');
  if(!target) return;
  try{
    const r=await fetch(`assets/data/events.json?v=${Date.now()}`,{cache:'no-store'});
    if(!r.ok) throw new Error('events.json unavailable');
    const data=await r.json();
    const now=Date.now()-86400000;
    let events=(data.events||[]).filter(e=>new Date(e.end || e.start).getTime()>=now)
      .sort((a,b)=>new Date(a.start)-new Date(b.start));
    if(limit) events=events.slice(0,limit);
    target.innerHTML=events.length
      ? events.map(eventCard).join('')
      : `<div class="events-empty">New events are coming soon. Check back for upcoming Mane Chain pop-ups and appearances.</div>`;
  }catch(err){
    target.innerHTML=`<div class="events-empty">Upcoming events are being updated. Please check back soon.</div>`;
  }
}
