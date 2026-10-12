/* Visuels produits (illustrations "photo" dessinées en SVG). FOOD[clé](u) -> contenu SVG 400x300.
   Dans site.js : un produit peut avoir  img:"pizza-margherita"  (illustration)  ou  photo:"photos/ma-photo.jpg" (vraie photo). */
(function(){
let U = 0;
const F = {};
const rng = seed => () => (seed = (seed*9301+49297)%233280)/233280;
const P = (r,a,cx=200,cy=150)=>[cx+r*Math.cos(a*Math.PI/180), cy+r*Math.sin(a*Math.PI/180)];
const f = n => +n.toFixed(1);

function defs(u){ return `<defs>
<filter id="b${u}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>
<filter id="s${u}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.5"/></filter>
<filter id="n${u}"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7"/></filter>
<radialGradient id="v${u}" cx="50%" cy="48%" r="75%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient>
<radialGradient id="h${u}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></radialGradient>
</defs>`; }
const bg = {
 slate:(u)=>`<rect width="400" height="300" fill="#262a30"/><path d="M0 0L400 300M-100 80L300 380M120 -80L520 220" stroke="#fff" stroke-opacity=".035" stroke-width="40"/>`,
 wood:(u)=>{ let s=`<rect width="400" height="300" fill="#7b4e2c"/>`, r=rng(3); [0,75,150,225].forEach((y,i)=>{ s+=`<rect y="${y}" width="400" height="75" fill="${['#80522f','#74492a','#85572f','#7a4e2b'][i]}"/><path d="M0 ${y}H400" stroke="#3d2310" stroke-opacity=".6" stroke-width="2"/>`; for(let k=0;k<9;k++){ const yy=y+8+r()*58; s+=`<path d="M${r()*60} ${yy}C${120+r()*60} ${yy+r()*6-3} ${240+r()*60} ${yy+r()*6-3} ${400} ${yy+r()*4}" stroke="#4a2c14" stroke-opacity=".28" stroke-width="${1+r()*1.4}" fill="none"/>`; } }); return s; },
 linen:(u)=>`<rect width="400" height="300" fill="#e4d9c6"/><g stroke="#8a7a60" stroke-opacity=".12">${Array.from({length:40},(_,i)=>`<path d="M0 ${i*7.5}H400M${i*10} 0V300"/>`).join('')}</g>`,
 marble:(u)=>`<rect width="400" height="300" fill="#ecebe8"/><path d="M-20 90C80 70 120 150 220 120S360 60 430 110M40 300C100 220 180 240 250 190S380 190 420 150" stroke="#9aa0a8" stroke-opacity=".35" stroke-width="2" fill="none"/>`,
 dark:(u)=>`<rect width="400" height="300" fill="#1c1512"/><circle cx="90" cy="60" r="140" fill="#3a2a20" opacity=".35" filter="url(#b${u})"/>`
};
const wrap = (u, back, body) => `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">${defs(u)}${bg[back](u)}${body}<rect width="400" height="300" filter="url(#n${u})" opacity=".07" style="mix-blend-mode:multiply"/><rect width="400" height="300" fill="url(#v${u})"/></svg>`;
const sh = (u,cx,cy,rx,ry,o=.4)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}" filter="url(#b${u})"/>`;
const plate = (u,cx,cy,r,col='#f8f5ef')=>`${sh(u,cx+6,cy+12,r,r*.96,.45)}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${col}"/><circle cx="${cx}" cy="${cy}" r="${r*.9}" fill="none" stroke="#000" stroke-opacity=".07" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${r*.68}" fill="none" stroke="#000" stroke-opacity=".08" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#h${u})"/>`;
const board = (u,cx,cy,rx,ry,col='#b98954')=>`${sh(u,cx+8,cy+14,rx,ry,.5)}<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${col}"/><ellipse cx="${cx}" cy="${cy}" rx="${rx-5}" ry="${ry-5}" fill="none" stroke="#5a3a1a" stroke-opacity=".35" stroke-width="2"/>${[-.5,-.2,.12,.42].map(k=>`<path d="M${cx-rx*.85} ${cy+ry*k}Q${cx} ${cy+ry*k+6} ${cx+rx*.85} ${cy+ry*k}" stroke="#6b4521" stroke-opacity=".3" fill="none" stroke-width="1.4"/>`).join('')}<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#h${u})" opacity=".6"/>`;
const rboard = (u,x,y,w,h,col='#b98954')=>`${sh(u,x+w/2+8,y+h/2+14,w/2,h/2,.5)}<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${col}"/>${Array.from({length:6},(_,i)=>`<path d="M${x+10} ${y+10+i*(h-20)/5}H${x+w-10}" stroke="#6b4521" stroke-opacity=".28" stroke-width="1.4"/>`).join('')}<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="url(#h${u})" opacity=".55"/>`;
const blob = (cx,cy,r,rg,n=9,k=.22)=>{ let pts=[]; for(let i=0;i<n;i++){ const a=i*360/n, rr=r*(1+(rg()-.5)*2*k); pts.push(P(rr,a,cx,cy)); } let d=`M${f(pts[0][0])} ${f(pts[0][1])}`; for(let i=0;i<n;i++){ const p0=pts[i],p1=pts[(i+1)%n]; d+=`Q${f(p0[0])} ${f(p0[1])} ${f((p0[0]+p1[0])/2)} ${f((p0[1]+p1[1])/2)}`; } return d+'Z'; };
const leaf = (x,y,a,s=1,col='#3f8a3a')=>`<g transform="translate(${f(x)} ${f(y)}) rotate(${a}) scale(${s})"><path d="M0 0C10-14 28-14 38 0C28 14 10 14 0 0Z" fill="${col}"/><path d="M2 0H34" stroke="#fff" stroke-opacity=".3" stroke-width="1.5"/></g>`;
const ringed = (x,y,r,c1,c2)=>`<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${c1}"/><circle cx="${f(x)}" cy="${f(y)}" r="${r*.55}" fill="${c2}"/>`;

/* ---------- PIZZAS ---------- */
function pizza(u, spec){
  const r = rng(spec.seed||5); let s = `<g>${sh(u,206,160,134,128,.5)}`;
  s += `<circle cx="200" cy="150" r="128" fill="#e1a85a"/><circle cx="200" cy="150" r="128" fill="url(#h${u})"/>`;
  for(let i=0;i<46;i++){ const [x,y]=P(112+r()*12, r()*360); s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${2+r()*4}" fill="#9a5a22" opacity=".45"/>`; }
  s += `<circle cx="200" cy="150" r="104" fill="${spec.base||'#c8321f'}"/>`;
  for(let i=0;i<40;i++){ const [x,y]=P(r()*100, r()*360); s+=`<circle cx="${f(x)}" cy="${f(y)}" r="${1+r()*3}" fill="#8a1d12" opacity=".25"/>`; }
  s += (spec.layers||[]).map(l=>l(r,u)).join('');
  [0,60,120].forEach(a=>{ const [x1,y1]=P(128,a),[x2,y2]=P(128,a+180); s+=`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#3a1e08" stroke-opacity=".28" stroke-width="2"/>`; });
  return s+'</g>';
}
const scatter = (n,rmax,fn,rmin=0)=>(r,u)=>{ let s='',pts=[]; for(let i=0;i<n;i++){ for(let t=0;t<30;t++){ const [x,y]=P(rmin+r()*(rmax-rmin), r()*360); if(pts.every(p=>Math.hypot(p[0]-x,p[1]-y)>24)){ pts.push([x,y]); s+=fn(x,y,r); break; } } } return s; };
const mozz = scatter(11,86,(x,y,r)=>`<path d="${blob(x,y,17+r()*8,r,8,.28)}" fill="#fbf1d6"/><path d="${blob(x-3,y-3,10,r,7,.2)}" fill="#fffaf0" opacity=".8"/>`);
const salami = scatter(8,84,(x,y)=>`<circle cx="${f(x)}" cy="${f(y)}" r="15" fill="#a8281f"/><circle cx="${f(x)}" cy="${f(y)}" r="15" fill="none" stroke="#6e1812" stroke-width="2"/><circle cx="${f(x-4)}" cy="${f(y-3)}" r="2.3" fill="#f0c9b8"/><circle cx="${f(x+5)}" cy="${f(y+3)}" r="2" fill="#f0c9b8"/><circle cx="${f(x+1)}" cy="${f(y+6)}" r="1.8" fill="#f0c9b8"/>`);
const ham = scatter(6,80,(x,y,r)=>`<path d="${blob(x,y,17,r,6,.18)}" fill="#e9a3a0"/><path d="M${f(x-9)} ${f(y-3)}Q${f(x)} ${f(y+7)} ${f(x+10)} ${f(y-4)}" stroke="#cc7f7c" stroke-width="2" fill="none"/>`);
const mush = scatter(7,80,(x,y)=>`<path d="M${f(x-13)} ${f(y+2)}Q${f(x)} ${f(y-18)} ${f(x+13)} ${f(y+2)}Z" fill="#dcc7a3"/><rect x="${f(x-4)}" y="${f(y+2)}" width="8" height="9" rx="2" fill="#cdb48c"/>`);
const olives = scatter(7,86,(x,y)=>`<circle cx="${f(x)}" cy="${f(y)}" r="7" fill="#1f2022"/><circle cx="${f(x)}" cy="${f(y)}" r="3" fill="#5a5d52"/>`);
const capers = scatter(14,90,(x,y)=>`<circle cx="${f(x)}" cy="${f(y)}" r="3.4" fill="#5f8a3a"/>`);
const anchov = scatter(6,80,(x,y,r)=>`<ellipse cx="${f(x)}" cy="${f(y)}" rx="19" ry="3.6" fill="#8f6a4c" transform="rotate(${f(r()*180)} ${f(x)} ${f(y)})"/>`);
const chili = scatter(7,84,(x,y,r)=>`<path d="M${f(x-8)} ${f(y)}q8 -9 16 0" stroke="#d6281c" stroke-width="4" fill="none" stroke-linecap="round" transform="rotate(${f(r()*360)} ${f(x)} ${f(y)})"/>`);
const basil = scatter(5,78,(x,y,r)=>leaf(x-12,y,r()*360,.8));
const cherry = scatter(6,80,(x,y)=>`<circle cx="${f(x)}" cy="${f(y)}" r="9" fill="#d8321f"/><circle cx="${f(x-2)}" cy="${f(y-2)}" r="4" fill="#f27a5e"/>`);
const zucc = scatter(7,84,(x,y)=>`<circle cx="${f(x)}" cy="${f(y)}" r="11" fill="#7aa64a"/><circle cx="${f(x)}" cy="${f(y)}" r="8" fill="#cfe3a1"/>`);
const pepper = scatter(6,80,(x,y,r)=>`<path d="M${f(x-12)} ${f(y)}q12 -14 24 0" stroke="${r()>.5?'#f2b01e':'#d9381e'}" stroke-width="6" fill="none" stroke-linecap="round" transform="rotate(${f(r()*360)} ${f(x)} ${f(y)})"/>`);
const pesto = scatter(8,84,(x,y,r)=>`<path d="${blob(x,y,8,r,6,.3)}" fill="#6e9a3a"/>`);
const arugula = scatter(18,86,(x,y,r)=>`<path d="M${f(x)} ${f(y)}q${f(8)} ${f(-14)} ${f(18)} ${f(-6)}" stroke="#4d8a2e" stroke-width="5" fill="none" stroke-linecap="round" transform="rotate(${f(r()*360)} ${f(x)} ${f(y)})"/>`);
const burrataTop = ()=>`<path d="M160 150C158 118 190 100 222 108C252 116 262 148 246 176C230 200 186 200 168 180C162 172 160 162 160 150Z" fill="#fbf6ea"/><path d="M172 134C178 118 200 112 220 118" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/><path d="M180 188C200 196 226 192 238 178" stroke="#e9d9a0" stroke-width="4" fill="none" opacity=".6"/>`;
const four = ()=>`<path d="M200 150V46A104 104 0 0 1 304 150Z" fill="#fbf1d6"/><path d="M200 150H304A104 104 0 0 1 200 254Z" fill="#f2e2a6"/><path d="M200 150V254A104 104 0 0 1 96 150Z" fill="#f3d2a0"/><path d="M96 150A104 104 0 0 1 200 46V150Z" fill="#fff8e6"/><g fill="#6b87b8" opacity=".75">${Array.from({length:14},(_,i)=>`<circle cx="${f(214+((i*37)%80))}" cy="${f(160+((i*53)%80))}" r="3"/>`).join('')}</g><g fill="#d8a46a"><circle cx="150" cy="105" r="9"/><circle cx="125" cy="150" r="7"/></g>`;
F["pizza-margherita"]=u=>wrap(u,'slate',pizza(u,{layers:[mozz,basil],seed:4}));
F["pizza-regina"]=u=>wrap(u,'slate',pizza(u,{layers:[mozz,ham,mush],seed:9}));
F["pizza-diavola"]=u=>wrap(u,'slate',pizza(u,{layers:[mozz,salami,chili],seed:12}));
F["pizza-napoli"]=u=>wrap(u,'slate',pizza(u,{layers:[mozz,anchov,capers,olives],seed:15}));
F["pizza-4fromages"]=u=>wrap(u,'slate',pizza(u,{layers:[four],seed:2}));
F["pizza-burrata"]=u=>wrap(u,'slate',pizza(u,{layers:[cherry,arugula,burrataTop],seed:6}));
F["pizza-vege"]=u=>wrap(u,'slate',pizza(u,{layers:[mozz,zucc,pepper,pesto],seed:21}));
F["calzone"]=u=>wrap(u,'slate',`${sh(u,210,176,160,100,.5)}<path d="M52 170C60 80 150 40 220 48C300 56 352 110 348 170C340 235 250 262 190 258C110 254 48 232 52 170Z" fill="#dfa253"/><path d="M52 170C60 80 150 40 220 48C300 56 352 110 348 170C340 235 250 262 190 258C110 254 48 232 52 170Z" fill="url(#h${u})"/><path d="M82 176C94 110 160 76 220 82C284 88 322 128 318 172" stroke="#b9772e" stroke-width="7" fill="none" opacity=".6"/><g stroke="#b9772e" stroke-width="4" opacity=".7">${Array.from({length:16},(_,i)=>{const [x,y]=P(112,200+i*10.5,196,180); return `<path d="M${f(x)} ${f(y)}l${f(Math.cos((200+i*10.5)*Math.PI/180)*10)} ${f(Math.sin((200+i*10.5)*Math.PI/180)*10)}"/>`;}).join('')}</g><path d="M130 130Q200 90 270 130" stroke="#c8321f" stroke-width="10" fill="none" stroke-linecap="round" opacity=".85"/>${leaf(196,86,-8,.8)}<g fill="#8a4a1c" opacity=".5">${Array.from({length:24},(_,i)=>`<circle cx="${f(110+((i*47)%190))}" cy="${f(100+((i*71)%110))}" r="3"/>`).join('')}</g>`);
F["tiramisu"]=u=>wrap(u,'marble',`${plate(u,200,156,132)}${sh(u,206,214,100,16,.4)}
<path d="M118 118L292 118L316 98L142 98Z" fill="#6a3d1c"/>${Array.from({length:90},(_,i)=>`<circle cx="${f(146+((i*61)%160))}" cy="${f(101+((i*17)%14))}" r="1.4" fill="#2e1808" opacity=".6"/>`).join('')}
<path d="M292 118L316 98L316 178L292 198Z" fill="#d9c79a"/><path d="M292 118L316 98L316 110L292 130Z" fill="#8a5a30"/><path d="M292 154L316 142L316 154L292 166Z" fill="#8a5a30" opacity=".85"/>
<rect x="118" y="118" width="174" height="80" fill="#f6e8c6"/><rect x="118" y="118" width="174" height="14" fill="#5a3418"/><rect x="118" y="132" width="174" height="22" fill="#f8ecd0"/><rect x="118" y="154" width="174" height="14" fill="#a97a4c"/><rect x="118" y="168" width="174" height="18" fill="#f8ecd0"/><rect x="118" y="186" width="174" height="12" fill="#a97a4c"/>
<g stroke="#e8d4a8" stroke-width="2" opacity=".6"><path d="M118 143H292M118 177H292"/></g><rect x="118" y="118" width="174" height="80" fill="url(#h${u})" opacity=".35"/>
<g fill="#4a2a12" opacity=".7"><circle cx="86" cy="216" r="2.4"/><circle cx="104" cy="226" r="1.8"/><circle cx="318" cy="222" r="2.2"/><circle cx="330" cy="206" r="1.6"/></g>${leaf(284,86,-40,.5)}`);
F["pannacotta"]=u=>wrap(u,'marble',`${plate(u,200,156,132)}${sh(u,206,214,84,14,.4)}
<path d="M122 206C122 130 164 92 200 92C236 92 278 130 278 206Z" fill="#fbf6ec"/><path d="M122 206C122 130 164 92 200 92C236 92 278 130 278 206Z" fill="url(#h${u})"/>
<path d="M134 156C140 122 170 94 200 94C230 94 260 122 266 156C260 166 254 156 250 172C246 186 240 166 232 162C222 158 218 182 210 178C200 174 200 160 190 164C180 168 176 186 168 172C162 160 152 172 134 156Z" fill="#b8132a"/><path d="M146 138C158 116 180 104 198 104" stroke="#e8505e" stroke-width="5" fill="none" stroke-linecap="round" opacity=".75"/>
${ringed(188,86,9,'#a3122b','#e0405a')}${ringed(214,82,8,'#6e1a52','#a8408a')}${ringed(204,94,6,'#b0152c','#e8606e')}${leaf(206,74,-70,.5)}<path d="M122 206H278" stroke="#000" stroke-opacity=".12" stroke-width="3"/>`);
F["spritz"]=u=>wrap(u,'dark',`${sh(u,210,262,90,12,.55)}<path d="M146 90H254L240 250C238 262 226 268 214 268H186C174 268 162 262 160 250Z" fill="#f2f5f6" fill-opacity=".18" stroke="#fff" stroke-opacity=".5" stroke-width="3"/><path d="M152 118H248L238 246C236 256 226 262 214 262H186C174 262 164 256 162 246Z" fill="#ff8a1f"/><path d="M152 118H248L246 140H154Z" fill="#ffb34d"/><g fill="#fff" fill-opacity=".5"><circle cx="186" cy="200" r="5"/><circle cx="210" cy="176" r="4"/><circle cx="196" cy="226" r="3"/><circle cx="222" cy="214" r="5"/></g><rect x="188" y="110" width="70" height="46" rx="6" fill="#ffb01f" transform="rotate(18 188 110)" opacity=".95"/><circle cx="240" cy="126" r="22" fill="#ffd36a" stroke="#f08a1c" stroke-width="3"/><path d="M240 126L226 118M240 126L254 120M240 126L250 140M240 126L228 140" stroke="#f08a1c" stroke-width="2"/><path d="M160 130C158 170 164 220 170 250" stroke="#fff" stroke-opacity=".6" stroke-width="4" fill="none" stroke-linecap="round"/>`);
window.FOOD = F; window.__foodU = ()=>++U; window.__fh = {rng,P,f,wrap,sh,plate,board,rboard,blob,leaf,ringed,defs,bg};
})();
