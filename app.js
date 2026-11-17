'use strict';
(() => {
 const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
 const menu = $('.menu-button'), nav = $('#navigation');
 function closeMenu(){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open navigation');}
 menu?.addEventListener('click',()=>{const on=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(on));menu.setAttribute('aria-label',on?'Close navigation':'Open navigation');nav.classList.toggle('open',on);});
 $$('#navigation a').forEach(a=>a.addEventListener('click',closeMenu));
 const stages=[
 ['Record the source.','Choose a saved loading point or select a location on the map. Record the material, purchase quantity, purchase rate and optional purchase photos.'],
 ['Connect the people and vehicle.','Choose the driver and, where applicable, the vehicle for the delivery record. The quick-booking screen also provides a route into the trip draft.'],
 ['Complete the delivery record.','Add the site, DC date and number, sale quantity and rate. Attach optional proof-of-delivery photos and keep expenses with the trip.'],
 ['Keep receipts and reports together.','Record the customer payment with its date, amount and method. Review billing records, customer statements and business profit.']
 ];
 function selectStage(i){const c=$('#stage-content');if(!c)return;c.innerHTML=`<span class="stage-number">0${i+1}</span><h3>${stages[i][0]}</h3><p>${stages[i][1]}</p>`;$$('[data-stage]').forEach(b=>{const on=Number(b.dataset.stage)===i;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',String(on));});}
 $$('[data-stage]').forEach(b=>b.addEventListener('click',()=>selectStage(Number(b.dataset.stage))));selectStage(0);
 document.addEventListener('click', event => {
  const link = event.target.closest('[data-expand]');
  if (!link) return;
  const details = document.getElementById(link.dataset.expand)?.querySelector('details');
  if (details) details.open = true;
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){closeMenu();menu?.focus();}});
 if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const o=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target);}}),{threshold:.06});document.body.classList.add('motion-ready');$$('.reveal').forEach(e=>o.observe(e));}
})();
