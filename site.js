/* Advaitham Groups: shared data and helpers. Plan rates and items are edited in PLANS below. */
(function(){
'use strict';
var A=window.ADV={};
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
A.$=$;A.$$=$$;
A.WA='917022250878';
A.waLink=function(msg){return 'https://wa.me/'+A.WA+'?text='+encodeURIComponent(msg)};
A.inr=function(n){return Math.round(n).toLocaleString('en-IN')};
A.money=function(v){var L=v/1e5;return L>=100?'₹'+(v/1e7).toFixed(2)+' Cr':'₹'+Math.round(L)+' L'};
A.flash=function(btn,txt){var o=btn.getAttribute('data-l')||btn.textContent;btn.setAttribute('data-l',o);btn.textContent=txt;setTimeout(function(){btn.textContent=o},1600)};
A.copyText=function(text,btn){
  function fallback(){
    var ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta);ta.select();var ok=false;try{ok=document.execCommand('copy')}catch(e){}
    document.body.removeChild(ta);A.flash(btn,ok?'Copied':'Select to copy');
  }
  try{navigator.clipboard.writeText(text).then(function(){A.flash(btn,'Copied')},fallback)}catch(e){fallback()}
};
A.save=function(s){try{localStorage.setItem('advaitham-estimate',JSON.stringify(s))}catch(e){}};
A.load=function(){try{return JSON.parse(localStorage.getItem('advaitham-estimate'))}catch(e){return null}};

/* ---------- plans ---------- */
A.ORDER=['essential','classic','premium','luxury','custom'];
A.PRICED=['essential','classic','premium','luxury'];
A.PLANS={
  essential:{no:'01',name:'Essential',rate:1999,
    blurb:'Solid construction with reliable materials. Everything you need, nothing unnecessary.',
    hl:['Sunvik / A-One TMT steel + Ultratech / ACC / Birla cement','Vitrified flooring up to ₹70/sqft','10ft ceilings with 6" & 4" solid blocks','Architectural drawings included, 1 design option'],
    steel:'Sunvik / A-One TMT',cement:'Ultratech / ACC / Birla',ceiling:'10 ft',drawings:'1 design option',interiors:'Not included',floor:'Vitrified tiles, up to ₹70/sqft'},
  classic:{no:'02',name:'Classic',rate:2399,
    blurb:'Upgraded brands and finishes. A meaningful step up in quality and durability.',
    hl:['Indus TMT steel + Ultratech / ACC / Birla cement','Granite flooring up to ₹130/sqft','Quartz counter up to ₹550/sqft','Architectural drawings included, 1 design option'],
    steel:'Indus TMT',cement:'Ultratech / ACC / Birla',ceiling:'10 ft',drawings:'1 design option',interiors:'Not included',floor:'Granite flooring, up to ₹130/sqft'},
  premium:{no:'03',name:'Premium',rate:2799,
    blurb:'JSW Neo / Tata steel, 11ft ceilings, Legrand switches, SS glass railings. No compromises.',
    hl:['JSW Neo / Tata TMT steel, 11ft ceiling height','Granite / Smart Marble flooring up to ₹170/sqft','Asian Paints Premium emulsion, SS glass railings','Architectural drawings, 2 options, you choose'],
    steel:'JSW Neo / Tata TMT',cement:'Ultratech / ACC / Birla',ceiling:'11 ft',drawings:'2 options, you choose',interiors:'Not included',floor:'Granite / Smart Marble, up to ₹170/sqft'},
  luxury:{no:'04',name:'Luxury Royale',rate:3399,
    blurb:'Full luxury, with basic interiors included. Modular kitchen, wardrobes and home automation come standard.',
    hl:['Complete acrylic modular kitchen included','Full house lighting automation','Burma teak main door, Grohe / Toto fittings','Architectural drawings, 3 options, you choose'],
    steel:'JSW Neo / Tata TMT',cement:'Ultratech',ceiling:'11 ft',drawings:'3 options, you choose',interiors:'Basic interiors: modular kitchen, wardrobes, home automation',floor:'Premium flooring'},
  custom:{no:'05',name:'Custom',rate:null,from:1800,
    blurb:'For budget-first builds or non-standard specs we cannot box into a fixed tier. We scope this one plot by plot, and the final price is set after your site visit and BOQ.',
    hl:['Starting from ₹1,800/sqft, final price set after site visit and BOQ','Structural grade set by our structural engineer, standard-grade finishes','Choose material brands from our vetted vendor list within your budget','Same milestone payments and weekly reports as every package'],
    steel:'As scoped',cement:'As scoped',ceiling:'As designed',drawings:'Scoped with you',interiors:'As scoped'}
};
A.perThousand=function(k){var p=A.PLANS[k];return (p.rate||p.from)*1000};

/* ---------- build stages ---------- */
A.STAGES=[
  {name:'Base',label:'Foundation',title:'Foundation and agreement',pct:15,text:'Site visit and soil or existing-structure review where needed. Drawings and the 3D walkthrough are shared, the milestone agreement is signed, and foundation work begins.',checks:['Soil and site review','Milestone agreement signed']},
  {name:'Frame',label:'Structure',title:'Structure',pct:40,text:'Columns, beams and slabs are cast floor by floor, following the structural drawings.',checks:['Steel inspected before every pour','Concrete cube samples tested']},
  {name:'Walls',label:'Walls',title:'Walls and roof',pct:15,text:'Masonry, lintels and sunshades go up, door and window frames are fixed, and the terrace parapet is built.',checks:['Wall alignment and levels checked','Frames fixed to the drawings']},
  {name:'Services',label:'MEP & Plaster',title:'Services and plaster',pct:20,text:'Electrical conduits, plumbing and drainage are laid and tested before plastering starts.',checks:['Electrical and plumbing tested before plaster','Flood test on wet areas before tiling']},
  {name:'Finish',label:'Handover',title:'Finishes and handover',pct:10,text:'Flooring, painting and fittings are completed, the snag list is cleared and the building is handed over.',checks:['Snag list cleared with you on site','As-built drawings handed over']}
];
(function(){var c=0;A.STAGES.forEach(function(s){c+=s.pct;s.cum=c})})();

/* ---------- estimate ---------- */
A.FLOOR_NAMES=['G','G+1','G+2','G+3','G+4'];
A.defaults=function(){return {plot:1200,floors:3,type:'new',pkg:'classic'}};
A.clean=function(s){
  var d=A.defaults();s=s||{};
  var plot=+s.plot,fl=+s.floors;
  return {plot:plot>=600&&plot<=3000?Math.round(plot/50)*50:d.plot,
    floors:fl>=1&&fl<=5?Math.round(fl):d.floors,
    type:s.type==='ext'?'ext':'new',
    pkg:A.PRICED.indexOf(s.pkg)>=0?s.pkg:d.pkg};
};
A.floorLabel=function(S){return S.type==='ext'?(S.floors+(S.floors>1?' added floors':' added floor')):A.FLOOR_NAMES[S.floors-1]};
A.calc=function(S){
  var p=A.PLANS[S.pkg],ext=S.type==='ext',rate=p.rate*(ext?1.1:1),area=S.plot*S.floors,base=area*rate;
  var low=base*0.926,high=base*1.125,mid=Math.round((low+high)/2/1000)*1000;
  var weeks=ext?Math.round(6+5*S.floors+S.plot/200):Math.round(10+area*0.005833);
  return {area:area,low:low,high:high,mid:mid,weeks:weeks,ext:ext,pkg:p.name};
};
A.chipGroup=function(host,name,items,current,onChange){
  host.innerHTML='';
  items.forEach(function(it){
    var id=name+'-'+it.v,l=document.createElement('label');
    l.className='chip';
    l.innerHTML='<input type="radio" name="'+name+'" id="'+id+'" value="'+it.v+'"'+(String(it.v)===String(current)?' checked':'')+'><span>'+it.t+'</span>';
    $('input',l).addEventListener('change',function(){onChange(it.v)});
    host.appendChild(l);
  });
};
A.syncChips=function(name,val){var i=$('#'+name+'-'+val);if(i)i.checked=true};
A.floorItems=function(S){
  if(S.type==='ext')return [1,2,3,4].map(function(n){return {v:n,t:'+'+n}});
  return A.FLOOR_NAMES.map(function(t,i){return {v:i+1,t:t}});
};

/* ---------- BOQ ---------- */
/* [item, unit, quantity function, share of the category]. Category shares add up to 100. */
A.CATS=[
 {n:'Excavation and foundation',w:9,it:[['Earthwork excavation and backfill','cum',function(x){return x.p*1.1},.30],['PCC bed concrete','cum',function(x){return x.p*.10},.20],['Footing and plinth concrete, M25','cum',function(x){return x.p*.22},.30],['Anti-termite treatment','sqft',function(x){return x.p},.05],['Foundation labour and shuttering','sqft',function(x){return x.p},.15]]},
 {n:'RCC structure',w:28,it:[['Ready-mix concrete, M25','cum',function(x){return x.a*.048},.33],[function(k){return 'TMT steel, Fe550 ('+A.PLANS[k].steel+')'},'kg',function(x){return x.a*4.2},.34],['Shuttering and centering','sqft',function(x){return x.a*2.2},.17],['RCC labour','sqft',function(x){return x.a},.16]]},
 {n:'Blockwork and masonry',w:10,it:[['Solid blocks, 6 in','nos',function(x){return x.a*3.2},.36],['Solid blocks, 4 in','nos',function(x){return x.a*1.1},.14],[function(k){return 'Cement for masonry ('+A.PLANS[k].cement+')'},'bags',function(x){return x.a*.10},.14],['Sand for masonry','cft',function(x){return x.a*.9},.10],['Masonry labour','sqft',function(x){return x.a},.26]]},
 {n:'Plastering',w:8,it:[['Cement for plaster','bags',function(x){return x.a*.17},.22],['M-sand for plaster','cft',function(x){return x.a*1.4},.12],['Internal wall plastering','sqft',function(x){return x.a*2.6},.30],['External plastering','sqft',function(x){return x.a*.9},.16],['Ceiling plastering','sqft',function(x){return x.a*.95},.20]]},
 {n:'Flooring and tiling',w:11,it:[[function(k){return 'Floor finish, supply ('+A.PLANS[k].floor+')'},'sqft',function(x){return x.a*.95},.38],['Bathroom and kitchen wall tiles','sqft',function(x){return x.a*.45},.17],['Tile laying labour','sqft',function(x){return x.a*1.4},.22],['Granite counters and staircase','sqft',function(x){return x.a*.08},.13],['Skirting and thresholds','rft',function(x){return x.a*.55},.10]]},
 {n:'Doors and windows',w:8,it:[['Main entrance doors','nos',function(x){return x.f},.20],['Internal flush doors','nos',function(x){return x.f*3},.22],['Aluminium or UPVC windows','sqft',function(x){return x.a*.12},.38],['MS railing and window grills','rft',function(x){return x.a*.15},.20]]},
 {n:'Electrical',w:7,it:[['Concealed conduit and wiring','points',function(x){return x.a*.045},.46],['Modular switches and plates','nos',function(x){return x.a*.045},.22],['Distribution boards and MCBs','nos',function(x){return x.f*2},.16],['Earthing and meter connection','lot',function(){return 1},.16]]},
 {n:'Plumbing and sanitary',w:7,it:[['Water supply and drainage piping','rft',function(x){return x.a*.2},.40],['Sanitary ware','sets',function(x){return x.f*2},.28],['CP fittings','sets',function(x){return x.f*2},.20],['Overhead tank and connections','nos',function(){return 1},.12]]},
 {n:'Painting and finishing',w:6,it:[['Putty and primer','sqft',function(x){return x.a*4},.35],['Interior emulsion paint','sqft',function(x){return x.a*3.2},.40],['Exterior paint','sqft',function(x){return x.a*.9},.25]]},
 {n:'Waterproofing',w:3,it:[['Terrace waterproofing','sqft',function(x){return x.p},.45],['Bathroom and balcony waterproofing','sqft',function(x){return x.a*.12},.35],['Sump and tank waterproofing','lot',function(){return 1},.20]]},
 {n:'Project management and quality control',w:3,it:[['Project management and weekly reports','months',function(x){return x.w/4.3},.50],['Site engineer supervision','months',function(x){return x.w/4.3},.30],['Quality tests, cube tests and steel inspection','nos',function(x){return x.f*4},.20]]}
];
A.qfmt=function(q,u){return u==='months'?(Math.round(q*10)/10).toFixed(1):A.inr(Math.max(1,Math.round(q)))};
A.boqData=function(S){
  var c=A.calc(S),x={a:c.area,p:S.plot,f:S.floors,w:c.weeks};
  var cats=A.CATS.map(function(cat){
    var items=cat.it.map(function(it){
      var amt=Math.round(c.mid*cat.w/100*it[3]),q=it[2](x),name=typeof it[0]==='function'?it[0](S.pkg):it[0];
      return {n:name,u:it[1],q:q,amt:amt,rate:q?amt/q:0};
    });
    return {n:cat.n,w:cat.w,items:items,sub:items.reduce(function(s,i){return s+i.amt},0)};
  });
  return {c:c,cats:cats,total:cats.reduce(function(s,k){return s+k.sub},0)};
};

/* ---------- compare table ---------- */
A.COMPARE_ROWS=[
  ['Rate',function(k){var p=A.PLANS[k];return p.rate?'₹'+A.inr(p.rate)+' / sqft':'From ₹'+A.inr(p.from)+' / sqft'}],
  ['For 1,000 sqft',function(k){var v='₹'+A.inr(A.perThousand(k));return A.PLANS[k].rate?v:'From '+v}],
  ['Steel',function(k){return A.PLANS[k].steel}],
  ['Cement',function(k){return A.PLANS[k].cement}],
  ['Ceiling height',function(k){return A.PLANS[k].ceiling}],
  ['Architectural drawings',function(k){return A.PLANS[k].drawings}],
  ['Interiors',function(k){return A.PLANS[k].interiors}]
];
A.cmpTable=function(keys){
  var head='<thead><tr><th scope="col">Item</th>'+keys.map(function(k){return '<th scope="col">'+A.PLANS[k].name+'</th>'}).join('')+'</tr></thead>';
  var rows=A.COMPARE_ROWS.map(function(r){return '<tr><th scope="row">'+r[0]+'</th>'+keys.map(function(k){return '<td>'+r[1](k)+'</td>'}).join('')+'</tr>'}).join('');
  return head+'<tbody>'+rows+'</tbody>';
};

/* ---------- menu ---------- */
document.addEventListener('DOMContentLoaded',function(){
  var menuBtn=$('#menu-btn'),links=$('#nav-links');
  if(!menuBtn||!links)return;
  menuBtn.addEventListener('click',function(){
    var open=links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',open?'true':'false');
    menuBtn.setAttribute('aria-label',open?'Close menu':'Open menu');
  });
  $$('a',links).forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')})});
});
})();
