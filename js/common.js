window.Arcanum = (() => {
 const $ = s => document.querySelector(s);
 const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 async function api(url) { const r=await fetch(url); const d=await r.json(); if(!r.ok) throw Error(d.error||'Could not load this page.'); return d; }
 const formatDate = d => new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric'}).format(new Date(d));
 function emptyState(title,text){return `<div class="empty"><span class="eyebrow">A BLANK PAGE, FOR NOW.</span><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`;}
 const studies={ 'blood-magic':{image:'blood-study.svg',theme:'blood',caption:'Blood Magic',alt:'Five branches connected by flowing blood around a central drop.'},'transmatter-alchemy':{image:'transmatter-study.svg',theme:'tide',caption:'Transmatter Alchemy',alt:'An atomic structure with electrons moving between two materials.'},'divine-transfusion':{image:'infusion-study.svg',theme:'ember',caption:'Infusion',alt:'A dagger carrying three circular Spell Slots.'}};
 function study(s) {return studies[s.id]||null;}
 function artwork(s,cls='') {const d=study(s); return d?`<figure class="study ${d.theme} ${cls}"><img src="/images/${d.image}" alt="${d.alt}"><figcaption>${d.caption}</figcaption></figure>`:`<figure class="study custom ${cls}">${s.coverUrl?`<img src="${esc(s.coverUrl)}" alt="Cover for ${esc(s.title)}">`:'<span class="custom-mark" aria-hidden="true">?</span>'}<figcaption>${esc(s.title)} / SYSTEM NOTES</figcaption></figure>`;}
 const url=s=>s.pageUrl||'/system.html?id='+encodeURIComponent(s.id);
 function systemCard(s,i=0){return `<article class="index-row"><span class="entry-number">${String(i+1).padStart(2,'0')}</span><a href="${url(s)}" class="index-art" aria-label="Read ${esc(s.title)}">${artwork(s)}</a><div class="index-copy"><div class="eyebrow">${esc(s.tags.slice(0,2).join(' / '))}</div><h2><a href="${url(s)}">${esc(s.title)}</a></h2><p>${esc(s.summary)}</p></div><a class="index-arrow" href="${url(s)}" aria-label="Read ${esc(s.title)}">↗</a></article>`;}
 return {$,esc,api,formatDate,emptyState,systemCard,artwork,url};
})();
