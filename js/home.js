document.addEventListener('DOMContentLoaded',async()=>{
 const {api,$,esc,artwork,url,systemCard,emptyState}=Arcanum;
 try {
 const {systems}=await api('/api/systems'); const latest=systems.slice(0,3);
 if(!latest.length){$('#recentSystems').innerHTML=emptyState('The notebook is still empty.','The first system will appear here when it’s ready.');return;}
 const s=latest[0];
 $('#recentSystems').innerHTML=`<article class="featured-system"><div class="feature-copy"><div class="feature-top"><span class="entry-number">01</span><span class="sample-stamp">SYSTEM GUIDE</span></div><div class="eyebrow">${esc(s.tags.slice(0,2).join(' / '))}</div><h2><a href="${url(s)}">${esc(s.title)}</a></h2><p>${esc(s.summary)}</p><div class="cost-note"><span>THE CATCH</span><p>${esc(s.cost||s.limitations||'Read the system for its rules.')}</p></div><a class="feature-link" href="${url(s)}">READ THE SYSTEM <span>↗</span></a></div><a class="feature-illustration" href="${url(s)}" aria-label="Read ${esc(s.title)}">${artwork(s)}</a></article>${latest.length>1?`<div class="further-entries"><div class="further-label"><span>KEEP READING</span><span>↓</span></div><div>${latest.slice(1).map((s,i)=>systemCard(s,i+1)).join('')}</div></div>`:''}`;
 }catch(e){$('#recentSystems').innerHTML=emptyState('The pages aren’t loading.',e.message+' Try refreshing in a moment.');}
});
