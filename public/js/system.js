document.addEventListener('DOMContentLoaded',async()=>{
 const {esc,api,$,artwork}=Arcanum;
 try {
 const id=new URLSearchParams(location.search).get('id');
 if(!id) throw Error('Choose a system from the library.');
 const {system:s}=await api('/api/systems/'+encodeURIComponent(id));
 if(s.pageUrl){location.replace(s.pageUrl);return;}
 document.title=s.title+" — Bandit's Power Systems";
 $('#systemMain').innerHTML=`<article class="container reading"><div class="reading-nav"><a href="/library.html">← CURRENT LIBRARY</a><span>SAMPLE SYSTEM / READING COPY</span></div><header class="reading-header"><div><span class="eyebrow">${esc(s.tags.join(' / '))}</span><h1>${esc(s.title)}</h1><p class="reading-summary">${esc(s.summary)}</p></div>${artwork(s)}</header><div class="reading-layout"><aside class="reading-aside"><span class="eyebrow">ON THIS PAGE</span><a href="#mechanics">01 / How it works</a>${[['source','The source',s.source],['cost','The cost',s.cost],['limits','The limits',s.limitations]].filter(x=>x[2]).map(([id,title],i)=>`<a href="#${id}">0${i+2} / ${title}</a>`).join('')}${s.attachment?`<a class="download-link" href="${esc(s.attachment.url)}">Manuscript ↓</a>`:''}<span class="side-note">Nothing comes<br>from nothing.</span></aside><div><section class="prose" id="mechanics"><span class="eyebrow">01 / THE MECHANICS</span><h2>How it works</h2><p>${esc(s.description)}</p></section>${[['source','The source',s.source],['cost','The cost',s.cost],['limits','The limits',s.limitations]].filter(x=>x[2]).map(([id,title,text],i)=>`<section class="rule ${id==='cost'?'cost-rule':''}" id="${id}"><span class="rule-number">0${i+2}</span><div><h2>${title}</h2><p>${esc(text)}</p></div></section>`).join('')}<div class="sample-note"><span class="note-marker">!</span><p>This is a sample system, not one of Bandit’s originals.</p></div><a class="end-link" href="/library.html">BACK TO THE LIBRARY <span>↗</span></a></div></div></article>`;
 }catch(e){$('#systemMain').innerHTML='<div class="container reading">'+Arcanum.emptyState('That page got away.',e.message)+'<a class="end-link" href="/library.html">← Back to the library</a></div>';}
});
