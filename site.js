/* Advaitham Groups: shared data and helpers. Plan rates and items are edited in PLANS below. */
(function(){
'use strict';
var A=window.ADV={};
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
A.$=$;A.$$=$$;
A.WA='917892658981';
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
    hl:['Sunvik / A-One TMT steel + Ultratech / ACC / Birla cement','Concrete grade as per structural engineer recommendation','6" & 4" standard solid blocks, 10ft ceiling','Ceramic wall dado, SS sink, granite counter up to ₹140/sqft','Vitrified flooring up to ₹70/sqft','Basic UPVC windows at ₹400/sqft, laminate doors','Asian Paints Tractor emulsion + Apex exterior','Finolex FR wiring, basic switches (Lisha / GM)','2000L overhead tank, 7000L underground tank','SS pipe railings, MS gate up to ₹550/sqft','Architectural drawings included, 1 design option by our architect'],
    cmp:{steel:'Sunvik / A-One TMT',cement:'Ultratech / ACC / Birla',masonry:'6" & 4" standard solid blocks',ceiling:'10 ft',flooring:'Vitrified, up to ₹70/sqft',kitchen:'Ceramic wall dado, SS sink, granite counter up to ₹140/sqft',windows:'Basic UPVC, ₹400/sqft',doors:'Laminate doors',paint:'Asian Paints Tractor emulsion + Apex exterior',electrical:'Finolex FR wiring, basic switches (Lisha / GM)',sanitary:'—',railings:'SS pipe railings, MS gate up to ₹550/sqft',tanks:'2000L overhead tank, 7000L underground tank',lighting:'—',drawings:'1 design option by our architect',interiors:'Not included'}},
  classic:{no:'02',name:'Classic',rate:2399,
    blurb:'Upgraded brands and finishes. A meaningful step up in quality and durability.',
    hl:['Indus TMT steel + Ultratech / ACC / Birla cement','Concrete grade as per structural engineer recommendation','AVS / Delta blocks (6" & 4"), 10ft ceiling','Ceramic dado, FRPA sink, quartz counter up to ₹550/sqft','Granite flooring up to ₹130/sqft','Classic UPVC windows at ₹850/sqft, membrane doors up to ₹9,000','Asian Paints Tractor + Apex exterior','Finolex / Havells wiring, mid-variant switches, UPS provision','Parryware / Jaquar sanitary fittings up to ₹50,000','SS pipe railings, MS gate','Architectural drawings included, 1 design option by our architect'],
    cmp:{steel:'Indus TMT',cement:'Ultratech / ACC / Birla',masonry:'AVS / Delta blocks (6" & 4")',ceiling:'10 ft',flooring:'Granite, up to ₹130/sqft',kitchen:'Ceramic dado, FRPA sink, quartz counter up to ₹550/sqft',windows:'Classic UPVC, ₹850/sqft',doors:'Membrane doors, up to ₹9,000',paint:'Asian Paints Tractor + Apex exterior',electrical:'Finolex / Havells wiring, mid-variant switches, UPS provision',sanitary:'Parryware / Jaquar fittings up to ₹50,000',railings:'SS pipe railings, MS gate',tanks:'—',lighting:'—',drawings:'1 design option by our architect',interiors:'Not included'}},
  premium:{no:'03',name:'Premium',rate:2799,
    blurb:'JSW Neo / Tata steel, 11ft ceilings, Legrand switches, SS glass railings. No compromises.',
    hl:['JSW Neo / Tata TMT steel + Ultratech / ACC / Birla cement','11ft ceiling height, elevated proportions throughout','Alpha / Delta + AAC block combination (6" & 4")','FRPA / Futura sink, quartz counter up to ₹650/sqft','Granite / Smart Marble flooring up to ₹170/sqft','UPVC windows with mesh at ₹850/sqft, membrane doors','Asian Paints Premium emulsion + Apex exterior','Finolex / Havells wiring, Legrand / Havells glass switches','Parryware / Jaquar fittings up to ₹70,000','SS glass railings at ₹1,300/rft, sliding gate','Architectural drawings, 2 options from different architects, you choose'],
    cmp:{steel:'JSW Neo / Tata TMT',cement:'Ultratech / ACC / Birla',masonry:'Alpha / Delta + AAC block combination (6" & 4")',ceiling:'11 ft, elevated proportions throughout',flooring:'Granite / Smart Marble, up to ₹170/sqft',kitchen:'FRPA / Futura sink, quartz counter up to ₹650/sqft',windows:'UPVC with mesh, ₹850/sqft',doors:'Membrane doors',paint:'Asian Paints Premium emulsion + Apex exterior',electrical:'Finolex / Havells wiring, Legrand / Havells glass switches',sanitary:'Parryware / Jaquar fittings up to ₹70,000',railings:'SS glass railings at ₹1,300/rft, sliding gate',tanks:'—',lighting:'—',drawings:'2 options from different architects, you choose',interiors:'Not included'}},
  luxury:{no:'04',name:'Luxury Royale',rate:3399,
    blurb:'Full luxury, with basic interiors included. Modular kitchen, wardrobes and home automation come standard, not an add-on quote later.',
    hl:['JSW Neo / Tata TMT + Ultratech cement, 11ft ceiling','Laterite / granite stone cladding on elevation','Complete acrylic modular kitchen included','Grohe / Toto sanitary fittings up to ₹1,00,000','Burma teak main door, CNC carving, PU polish','Asian Paints Royal emulsion + Royal Play 2 walls / 1000 sqft','Full house lighting automation included','Automated sliding gate, FR-LSH wiring','Legrand Myrius switches, smart home provision','2 wardrobes + 1 TV cabinet per 1000 sqft included','Basic interiors package included: modular kitchen + wardrobes done, no separate interiors quote needed to move in','Architectural drawings, 3 options from our best architects, you choose'],
    cmp:{steel:'JSW Neo / Tata TMT',cement:'Ultratech',masonry:'Laterite / granite stone cladding on elevation',ceiling:'11 ft',flooring:'—',kitchen:'Complete acrylic modular kitchen included',windows:'—',doors:'Burma teak main door, CNC carving, PU polish',paint:'Asian Paints Royal emulsion + Royal Play 2 walls / 1000 sqft',electrical:'Legrand Myrius switches, FR-LSH wiring, smart home provision',sanitary:'Grohe / Toto fittings up to ₹1,00,000',railings:'Automated sliding gate',tanks:'—',lighting:'Full house lighting automation',drawings:'3 options from our best architects, you choose',interiors:'Basic interiors: modular kitchen, wardrobes done, no separate interiors quote needed to move in. 2 wardrobes + 1 TV cabinet per 1000 sqft'}},
  custom:{no:'05',name:'Custom',rate:null,from:1800,
    blurb:'For budget-first builds or non-standard specs we cannot box into a fixed tier. We scope this one plot by plot, and final pricing is set after your site visit and BOQ, not before.',
    hl:['Starting from ₹1,800/sqft, final price fixed after site visit and BOQ, not before','Structural grade set by our structural engineer, standard-grade finishes','Choose material brands from our vetted vendor list within your budget','Same live cameras, milestone payments and weekly reports as every package, no exceptions','Best for: budget-conscious builds, rental units, outbuildings, or unusual site conditions','Architectural drawings included, 1 design option by our architect'],
    cmp:{steel:'As scoped by structural engineer',cement:'As scoped',masonry:'As you choose',ceiling:'As designed',flooring:'As you choose',kitchen:'As you choose',windows:'As you choose',doors:'As you choose',paint:'As you choose',electrical:'As you choose',sanitary:'As you choose',railings:'As you choose',tanks:'As you choose',lighting:'As you choose',drawings:'1 design option by our architect',interiors:'As scoped'}}
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
/* Reference bill of quantities (A to M). Quantities scale with built-up area; each amount scales with area x package rate, relative to the reference. */
A.REF={area:2800,rate:1999,total:5598024};
/* [item, description, unit, quantity, amount] */
A.SHEET=[
 {n:'Preliminary & Site Establishment',items:[
  ['Site mobilization, layout marking & soil test','Boundary layout, benchmarking, soil bearing test for foundation design','Lot',1,103284]]},
 {n:'Earthwork & Foundation',items:[
  ['Excavation for foundation & footings','Footprint-based earthwork · G+1 footprint','cum',180,154928],
  ['PCC bed & foundation concrete','Grade as per structural engineer recommendation','cum',45,206588],
  ['Foundation reinforcement steel','JSW Neo / Tata TMT','kg',3500,175583]]},
 {n:'RCC Superstructure',items:[
  ['TMT steel reinforcement — columns, beams & slabs','JSW Neo / Tata TMT + Ultratech / ACC / Birla cement','kg',8800,722989],
  ['Cement — structural grade','Ultratech / ACC / Birla','bags',880,335673],
  ['Concrete — columns, beams & slabs','Grade as per structural engineer recommendation · 11 ft ceiling','cum',80,516421]]},
 {n:'Masonry',items:[
  ['Blockwork — external & internal walls (8" & 4")','Alpha/Delta + AAC block combination','sqft (wall area)',3800,464779]]},
 {n:'Plastering & Waterproofing',items:[
  ['Internal + external plastering','11 ft ceiling height, both faces','sqft',5200,284031],
  ['Waterproofing — terrace & wet areas','Terrace, bathrooms, balconies, sunken areas','sqft',800,103284]]},
 {n:'Flooring & Tiling',items:[
  ['Living, bedroom & common area flooring','Granite / Smart Marble flooring up to ₹170/sqft','sqft',1700,516421],
  ['Kitchen counter','Quartz counter up to ₹550/sqft','rft',8,180747],
  ['Bathroom dado & flooring','Ceramic wall dado, anti-skid floor tiles','sqft',240,103284]]},
 {n:'Doors & Windows',items:[
  ['Windows','UPVC windows with mesh ₹650/sqft','sqft',180,284031],
  ['Doors — main & internal','Membrane doors','nos',11,165255]]},
 {n:'Electrical',items:[
  ['Wiring, points & switches','Finolex / Havells wiring, Legrand / Havells glass switches','points',29,258210]]},
 {n:'Plumbing & Sanitary',items:[
  ['Plumbing lines — CPVC / PVC','Water supply & drainage lines','points',17,103284],
  ['Sanitaryware & CP fittings','Parryware / Jaguar fittings up to ₹70,000','bathroom sets',4,180747]]},
 {n:'Painting',items:[
  ['Interior + exterior painting','Asian Paints Premium emulsion + Apex exterior','sqft',6000,180747]]},
 {n:'Railings & Gate',items:[
  ['Railings — staircase, balcony & terrace','SS glass railings up to ₹1,300/rft','rft',120,180747],
  ['Main gate','Sliding gate up to ₹800/sqft','Lot',1,92958]]},
 {n:'Architectural Design & Project Management',items:[
  ['Architectural drawings','2 options from different architects, you choose','Lot',1,129105]]},
 {n:'Contingency & Site Overheads',items:[
  ['Contingency, sundries & site transportation','Buffer for site conditions, wastage & minor variations','Lot',1,154928]]}
];
A.boqData=function(S){
  var c=A.calc(S);
  var T=A.REF.total*(c.area*A.PLANS[S.pkg].rate*(c.ext?1.1:1))/(A.REF.area*A.REF.rate);
  var qs=c.area/A.REF.area;
  var cats=A.SHEET.map(function(sec,i){
    var items=sec.items.map(function(it){
      var lot=it[2]==='Lot',q=lot?1:it[3]*qs,amt=Math.round(it[4]*T/A.REF.total);
      return {n:it[0],d:it[1],u:it[2],q:q,amt:amt,rate:amt/q};
    });
    return {L:String.fromCharCode(65+i),n:sec.n,items:items,sub:items.reduce(function(t,x){return t+x.amt},0)};
  });
  var total=cats.reduce(function(t,k){return t+k.sub},0);
  cats.forEach(function(k){k.pct=total?Math.round(k.sub/total*100):0});
  return {c:c,cats:cats,total:total};
};

A.qfmt=function(q,u){return u==='months'?(Math.round(q*10)/10).toFixed(1):A.inr(Math.max(1,Math.round(q)))};
/* ---------- compare table ---------- */
A.CMP_ROWS=[['Steel','steel'],['Cement','cement'],['Masonry','masonry'],['Ceiling height','ceiling'],['Flooring','flooring'],['Kitchen counter & sink','kitchen'],['Windows','windows'],['Doors','doors'],['Painting','paint'],['Electrical','electrical'],['Sanitary & CP fittings','sanitary'],['Railings & gate','railings'],['Water tanks','tanks'],['Lighting & automation','lighting'],['Architectural drawings','drawings'],['Interiors','interiors']];
A.COMPARE_ROWS=[
  ['Rate',function(k){var p=A.PLANS[k];return p.rate?'₹'+A.inr(p.rate)+' / sqft':'From ₹'+A.inr(p.from)+' / sqft'}],
  ['For 1,000 sqft',function(k){var v='₹'+A.inr(A.perThousand(k));return A.PLANS[k].rate?v:'From '+v}]
].concat(A.CMP_ROWS.map(function(r){return [r[0],function(k){return A.PLANS[k].cmp[r[1]]}]}));
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
