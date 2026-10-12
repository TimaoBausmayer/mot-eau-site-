/* Illustrations dessinées en SVG (une par métier). Couleurs : var(--acc), var(--acc2), var(--ink), var(--bg). */
(function(){
const pt = (r,a,cx=200,cy=200)=>[+(cx+r*Math.cos(a*Math.PI/180)).toFixed(1), +(cy+r*Math.sin(a*Math.PI/180)).toFixed(1)];
const rot = (a,cx=200,cy=200)=>`transform="rotate(${a} ${cx} ${cy})"`;
const S = body => `<svg viewBox="0 0 400 400" role="img" aria-hidden="true">${body}</svg>`;
const V = {};

V.pizza = () => { let s=`<circle cx="200" cy="200" r="178" fill="#e2a95c"/><circle cx="200" cy="200" r="178" fill="none" stroke="#c98a3d" stroke-width="3" opacity=".6"/><circle cx="200" cy="200" r="150" fill="var(--acc)"/>`;
  [[0,95,44],[50,100,48],[110,92,46],[170,100,44],[225,96,50],[290,100,46],[0,0,52],[330,60,36],[160,50,34]].forEach(([a,r,k])=>{ const [x,y]=pt(r,a); s+=`<circle cx="${x}" cy="${y}" r="${k}" fill="#f8e3a3" opacity=".95"/>`; });
  [[20,98],[75,60],[130,104],[190,62],[250,100],[305,66],[345,105]].forEach(([a,r])=>{ const [x,y]=pt(r,a); s+=`<circle cx="${x}" cy="${y}" r="21" fill="#b3261e"/><circle cx="${x-5}" cy="${y-4}" r="2.4" fill="#7d1a14"/><circle cx="${x+6}" cy="${y+3}" r="2.4" fill="#7d1a14"/>`; });
  [[40,120],[160,126],[280,118],[100,34]].forEach(([a,r])=>{ const [x,y]=pt(r,a); s+=`<ellipse cx="${x}" cy="${y}" rx="17" ry="9" fill="#3d8a3a" ${rot(a+40,x,y)}/><path d="M${x-12} ${y}H${x+12}" stroke="#2d6a2b" stroke-width="1.5" ${rot(a+40,x,y)}/>`; });
  [0,60,120].forEach(a=>{ const [x1,y1]=pt(178,a),[x2,y2]=pt(178,a+180); s+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#7a3d12" stroke-width="2.5" opacity=".28"/>`; });
  return S(`<g class="spin" style="animation-duration:140s">${s}</g>`); };

V.cheese = () => { const holes=[[130,150,26],[205,120,18],[260,175,30],[150,235,20],[225,255,26],[100,200,12],[290,250,14],[190,190,14],[300,120,12]]; let h='';
  holes.forEach(([x,y,r])=>h+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#d49a1c"/><circle cx="${x-r*.25}" cy="${y-r*.25}" r="${r*.55}" fill="#c58610" opacity=".7"/>`);
  return S(`<circle cx="190" cy="215" r="155" fill="#eab93e"/><circle cx="190" cy="215" r="155" fill="none" stroke="#c98a12" stroke-width="16"/>${h}
  <path d="M190 215 L335 160 A155 155 0 0 0 190 60Z" fill="var(--bg)" opacity=".92"/>
  <g transform="translate(30 -26)"><path d="M190 215 L335 160 A155 155 0 0 0 190 60Z" fill="#f4cd5c" stroke="#c98a12" stroke-width="3"/><path d="M190 215 L335 160" stroke="#d9a024" stroke-width="2"/><circle cx="262" cy="130" r="13" fill="#d49a1c"/><circle cx="238" cy="172" r="8" fill="#d49a1c"/></g>`); };

V.steak = () => S(`<path d="M62 215C50 140 125 82 212 88C305 94 352 152 340 220C332 285 270 326 198 322C115 318 72 282 62 215Z" fill="#b53a3a"/>
  <path d="M62 215C50 140 125 82 212 88C305 94 352 152 340 220C332 285 270 326 198 322C115 318 72 282 62 215Z" fill="none" stroke="#f3dcd0" stroke-width="13"/>
  <path d="M110 150C150 130 190 150 225 128M100 215C150 190 200 225 262 190M130 275C180 250 230 280 290 245M170 110C190 165 150 200 175 270" stroke="#f5c9c0" stroke-width="5" fill="none" stroke-linecap="round" opacity=".75"/>
  <circle cx="262" cy="160" r="30" fill="#f6ebdd"/><circle cx="262" cy="160" r="18" fill="#e3cdb7"/>
  <path d="M60 345H340" stroke="var(--ink)" stroke-width="3" opacity=".25" stroke-dasharray="2 10" stroke-linecap="round"/>`);

V.bread = () => { let d=''; for(let i=0;i<34;i++){ const [x,y]=pt(30+((i*37)%140),(i*53)%360,200,215); d+=`<circle cx="${x}" cy="${y}" r="1.6" fill="#fff6e0" opacity=".7"/>`; }
  return S(`<ellipse cx="200" cy="228" rx="168" ry="132" fill="#c4813d"/><ellipse cx="200" cy="206" rx="156" ry="116" fill="#d99a52"/><path d="M60 250C100 330 300 330 340 250" stroke="#9c5f26" stroke-width="10" fill="none" opacity=".35" stroke-linecap="round"/>
  <path d="M105 160C125 130 150 150 170 190M175 140C195 110 222 130 240 175M250 150C270 130 296 150 312 185" stroke="#f7dcae" stroke-width="15" fill="none" stroke-linecap="round"/>${d}
  <g transform="translate(300 90) rotate(25)"><path d="M0 80V0" stroke="#b58a2e" stroke-width="4"/>${[0,16,32,48].map(y=>`<ellipse cx="-9" cy="${y+8}" rx="5" ry="11" fill="#d8b04a" transform="rotate(-25 -9 ${y+8})"/><ellipse cx="9" cy="${y+8}" rx="5" ry="11" fill="#d8b04a" transform="rotate(25 9 ${y+8})"/>`).join('')}</g>`); };

V.flower = () => { let s=''; for(let i=0;i<14;i++){ const a=i*360/14, [x,y]=pt(66,a,200,170); s+=`<ellipse cx="${x}" cy="${y}" rx="27" ry="64" fill="var(--acc)" ${rot(a+90,x,y)}/>`; }
  for(let i=0;i<9;i++){ const a=i*40+10, [x,y]=pt(38,a,200,170); s+=`<ellipse cx="${x}" cy="${y}" rx="19" ry="46" fill="var(--acc2)" opacity=".92" ${rot(a+90,x,y)}/>`; }
  return S(`<path d="M200 238C198 290 204 330 200 385" stroke="#3f7a3b" stroke-width="10" fill="none" stroke-linecap="round"/><ellipse cx="160" cy="320" rx="14" ry="46" fill="#4f9a47" transform="rotate(-50 160 320)"/><ellipse cx="242" cy="300" rx="14" ry="42" fill="#4f9a47" transform="rotate(48 242 300)"/>${s}<circle cx="200" cy="170" r="25" fill="#f2c13d"/><circle cx="192" cy="164" r="4" fill="#c99a14"/><circle cx="208" cy="176" r="4" fill="#c99a14"/><circle cx="205" cy="160" r="3" fill="#c99a14"/>`); };

V.pole = () => S(`<defs><clipPath id="pc"><rect x="140" y="82" width="120" height="236" rx="6"/></clipPath><pattern id="pp" width="78" height="78" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)"><rect width="26" height="78" fill="var(--acc)"/><rect x="26" width="26" height="78" fill="#fff"/><rect x="52" width="26" height="78" fill="#27479b"/></pattern></defs>
  <rect x="140" y="82" width="120" height="236" rx="6" fill="url(#pp)" stroke="var(--ink)" stroke-width="5"/><rect x="140" y="82" width="120" height="236" rx="6" fill="#fff" opacity=".12" clip-path="url(#pc)"/><rect x="146" y="82" width="22" height="236" fill="#fff" opacity=".22"/>
  <rect x="124" y="50" width="152" height="38" rx="8" fill="#d6aa4a" stroke="var(--ink)" stroke-width="5"/><circle cx="200" cy="40" r="26" fill="#d6aa4a" stroke="var(--ink)" stroke-width="5"/>
  <rect x="124" y="312" width="152" height="38" rx="8" fill="#d6aa4a" stroke="var(--ink)" stroke-width="5"/><rect x="156" y="350" width="88" height="22" rx="4" fill="#d6aa4a" stroke="var(--ink)" stroke-width="5"/>
  <g stroke="var(--ink)" stroke-width="6" fill="none" stroke-linecap="round" opacity=".9"><circle cx="318" cy="140" r="14"/><circle cx="352" cy="170" r="14"/><path d="M328 150L296 196M342 160L296 196M296 196L292 232" /></g>`);

V.wheel = () => { let t=''; for(let i=0;i<40;i++){ const a=i*9,[x1,y1]=pt(160,a),[x2,y2]=pt(180,a); t+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#3b3f48" stroke-width="7" stroke-linecap="round"/>`; }
  let sp=''; for(let i=0;i<5;i++){ const a=i*72-90; sp+=`<path d="M200 200 L${pt(104,a-13)[0]} ${pt(104,a-13)[1]} L${pt(104,a+13)[0]} ${pt(104,a+13)[1]}Z" fill="#e8ebf0" stroke="#9ba2ae" stroke-width="2"/><circle cx="${pt(64,a)[0]}" cy="${pt(64,a)[1]}" r="6" fill="#6b7280"/>`; }
  return S(`<g class="spin" style="animation-duration:60s"><circle cx="200" cy="200" r="182" fill="#16181d"/>${t}<circle cx="200" cy="200" r="150" fill="#22252c"/><circle cx="200" cy="200" r="118" fill="#cfd4dc"/><circle cx="200" cy="200" r="104" fill="#aeb5c0"/>${sp}<circle cx="200" cy="200" r="26" fill="#eef0f4" stroke="#8a919d" stroke-width="3"/><circle cx="200" cy="200" r="9" fill="var(--acc)"/></g>`); };

V.pipes = () => S(`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M40 120H190a50 50 0 0 1 50 50V240a50 50 0 0 0 50 50H360" stroke="var(--ink)" stroke-width="46"/><path d="M40 120H190a50 50 0 0 1 50 50V240a50 50 0 0 0 50 50H360" stroke="var(--acc)" stroke-width="36"/><path d="M40 112H190a50 50 0 0 1 50 50V240" stroke="#fff" stroke-width="7" opacity=".4"/></g>
  <g fill="#c8cdd6" stroke="var(--ink)" stroke-width="5"><rect x="92" y="94" width="26" height="52" rx="4"/><rect x="214" y="190" width="52" height="26" rx="4"/><rect x="308" y="264" width="26" height="52" rx="4"/></g>
  <g stroke="var(--ink)" stroke-width="6" fill="none" stroke-linecap="round"><circle cx="240" cy="62" r="34" fill="var(--bg)"/><path d="M240 28V96M206 62H274M216 38L264 86M264 38L216 86"/></g><rect x="226" y="96" width="28" height="26" fill="#c8cdd6" stroke="var(--ink)" stroke-width="5"/>
  <path d="M110 330c-16 26-26 40-26 54a26 26 0 0 0 52 0c0-14-10-28-26-54z" fill="#4fb8e8" stroke="var(--ink)" stroke-width="5"/><path d="M100 372a16 16 0 0 0 14 14" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>`);

V.stones = () => S(`<g fill="none" stroke="var(--acc)" stroke-width="2" opacity=".55"><ellipse cx="200" cy="350" rx="150" ry="22"/><ellipse cx="200" cy="350" rx="118" ry="16"/><ellipse cx="200" cy="350" rx="86" ry="11"/></g>
  <ellipse cx="200" cy="318" rx="118" ry="34" fill="#8c817a"/><ellipse cx="200" cy="312" rx="118" ry="30" fill="#a39890"/><ellipse cx="206" cy="262" rx="88" ry="28" fill="#d9c1b0"/><ellipse cx="206" cy="256" rx="88" ry="25" fill="#e8d3c3"/><ellipse cx="200" cy="214" rx="60" ry="22" fill="var(--acc)"/><ellipse cx="200" cy="209" rx="60" ry="19" fill="var(--acc2)" opacity=".9"/>
  <g transform="translate(212 80)"><path d="M0 120C-70 100-90 30-40-20C0-50 60-30 70 20C80 70 50 110 0 120Z" fill="#4c8a5a"/><path d="M0 120C0 70 6 20 8-18" stroke="#2f6a40" stroke-width="4" fill="none"/><path d="M4 90C-20 80-34 70-50 56M6 62C-14 52-26 40-36 24M8 34C-6 26-12 18-18 6M6 90C30 84 46 74 60 56M8 62C28 56 40 46 52 28" stroke="#2f6a40" stroke-width="3" fill="none" stroke-linecap="round"/></g>`);

V.aperture = () => { let b='',cols=['var(--acc)','var(--acc2)']; for(let i=0;i<6;i++){ const a=i*60; const p=[pt(176,a-18),pt(176,a+42),pt(58,a+104),pt(58,a+44)].map(q=>q.join(',')).join(' '); b+=`<polygon points="${p}" fill="${cols[i%2]}" stroke="var(--bg)" stroke-width="3" opacity=".95"/>`; }
  return S(`<circle cx="200" cy="200" r="186" fill="var(--ink)"/><circle cx="200" cy="200" r="176" fill="var(--bg2)"/><g class="spin" style="animation-duration:120s">${b}</g><circle cx="200" cy="200" r="178" fill="none" stroke="var(--ink)" stroke-width="12"/><circle cx="200" cy="200" r="186" fill="none" stroke="var(--line)" stroke-width="2"/>`); };

V.wine = () => S(`<path d="M120 36h30v82c0 20 36 40 36 84v152a12 12 0 0 1-12 12H96a12 12 0 0 1-12-12V202c0-44 36-64 36-84z" fill="var(--acc)"/><rect x="118" y="34" width="34" height="46" rx="3" fill="#2a1a1f"/><path d="M96 124c-6 22-12 34-12 78" stroke="#fff" stroke-width="5" opacity=".18" fill="none" stroke-linecap="round"/>
  <rect x="92" y="236" width="86" height="94" rx="3" fill="#f4e9d8"/><rect x="104" y="250" width="62" height="3" fill="#2a1a1f"/><rect x="104" y="262" width="62" height="3" fill="#2a1a1f" opacity=".5"/><circle cx="135" cy="292" r="16" fill="none" stroke="var(--acc)" stroke-width="3"/><rect x="108" y="316" width="54" height="3" fill="#2a1a1f" opacity=".5"/>
  <path d="M232 150h112c0 70-26 112-56 112s-56-42-56-112z" fill="#f5f0ea" opacity=".35" stroke="var(--ink)" stroke-width="4"/><path d="M236 190h104c-4 52-26 72-52 72s-48-20-52-72z" fill="var(--acc)"/><path d="M288 262v84M246 352h84" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M252 172c-2 12 0 20 4 28" stroke="#fff" stroke-width="4" opacity=".4" fill="none" stroke-linecap="round"/>`);

V.mandala = () => { let s=''; for(let i=0;i<16;i++){ const a=i*22.5,[x,y]=pt(98,a); s+=`<ellipse cx="${x}" cy="${y}" rx="14" ry="44" ${rot(a+90,x,y)} fill="none" stroke="var(--ink)" stroke-width="3"/>`; }
  for(let i=0;i<8;i++){ const a=i*45+22.5,[x,y]=pt(52,a); s+=`<path d="M${x} ${y-24}L${x+16} ${y}L${x} ${y+24}L${x-16} ${y}Z" ${rot(a+90,x,y)} fill="var(--ink)"/>`; }
  let dots=''; for(let i=0;i<36;i++){ const [x,y]=pt(150,i*10); dots+=`<circle cx="${x}" cy="${y}" r="${i%3?2.4:4.4}" fill="var(--ink)"/>`; }
  return S(`<g class="spin" style="animation-duration:160s"><circle cx="200" cy="200" r="182" fill="none" stroke="var(--ink)" stroke-width="3"/><circle cx="200" cy="200" r="166" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="3 7"/>${dots}${s}<circle cx="200" cy="200" r="24" fill="var(--bg)" stroke="var(--ink)" stroke-width="4"/><circle cx="200" cy="200" r="9" fill="var(--ink)"/></g>`); };

V.barbell = () => S(`<rect x="30" y="190" width="340" height="20" rx="6" fill="#d9deef"/><g fill="var(--acc)" stroke="var(--ink)" stroke-width="5"><rect x="64" y="92" width="34" height="216" rx="8"/><rect x="102" y="120" width="26" height="160" rx="7"/><rect x="302" y="92" width="34" height="216" rx="8"/><rect x="272" y="120" width="26" height="160" rx="7"/></g><g fill="var(--acc2)" stroke="var(--ink)" stroke-width="5"><rect x="46" y="150" width="18" height="100" rx="5"/><rect x="336" y="150" width="18" height="100" rx="5"/></g><g stroke="var(--ink)" stroke-width="5" fill="#9aa4c8"><rect x="134" y="182" width="12" height="36" rx="3"/><rect x="254" y="182" width="12" height="36" rx="3"/></g>
  <g fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round" opacity=".9"><path d="M80 350h60M170 350h60M260 350h60" stroke-dasharray="1 0"/></g><path d="M130 190v-3M270 190v-3" stroke="var(--ink)"/>`);

V.rings = () => { let s=''; const cols=['#c9904f','#b9803f','#d29c5d','#a97236']; for(let i=0;i<11;i++){ const r=170-i*15; s+=`<ellipse cx="200" cy="196" rx="${r}" ry="${r*.98}" fill="${cols[i%4]}" stroke="#8a5a2a" stroke-width="1.5"/>`; }
  return S(`<defs><clipPath id="rc"><circle cx="200" cy="196" r="170"/></clipPath></defs>${s}<circle cx="200" cy="196" r="9" fill="#7a4a1f"/><path d="M200 196L330 120M200 196L88 112" stroke="#6e431d" stroke-width="2.5" opacity=".6"/>
  <g stroke="var(--ink)" stroke-width="3" fill="none"><path d="M30 384H370M30 372V396M370 372V396"/><path d="M40 384l12-6M40 384l12 6M360 384l-12-6M360 384l-12 6"/></g><text x="200" y="372" text-anchor="middle" font-family="DM Mono,monospace" font-size="15" fill="var(--ink)">420 mm</text>`); };

V.plate = () => S(`<g class="spin" style="animation-duration:200s"><circle cx="200" cy="200" r="182" fill="#f7f2e8" stroke="#d9cdb4" stroke-width="3"/><circle cx="200" cy="200" r="142" fill="none" stroke="var(--acc)" stroke-width="2.5"/><circle cx="200" cy="200" r="132" fill="#fbf8f1" stroke="#e5dcc8" stroke-width="2"/></g>
  <ellipse cx="205" cy="208" rx="74" ry="52" fill="#9b3d1c"/><ellipse cx="196" cy="196" rx="44" ry="24" fill="#c25a2e" opacity=".85"/><path d="M130 232c30 18 90 18 130-6" stroke="#fff" stroke-width="5" opacity=".25" fill="none" stroke-linecap="round"/>
  <g fill="#3f7f3a"><ellipse cx="150" cy="168" rx="16" ry="7" transform="rotate(-30 150 168)"/><ellipse cx="258" cy="164" rx="15" ry="6" transform="rotate(26 258 164)"/><ellipse cx="248" cy="252" rx="16" ry="7" transform="rotate(-22 248 252)"/></g>
  <circle cx="156" cy="250" r="7" fill="#f4e7d0"/><circle cx="170" cy="262" r="5" fill="#f4e7d0"/>
  <g stroke="var(--ink)" stroke-width="5" stroke-linecap="round" fill="none" opacity=".85"><path d="M30 120v80M22 120v34c0 12 16 12 16 0v-34M30 200v70"/><path d="M372 110c-18 24-18 62-4 90v70M372 110v90"/></g>`);

V.candles = () => { const j=(x,h,c,lab)=>`<rect x="${x}" y="${390-h}" width="86" height="${h}" rx="10" fill="${c}"/><rect x="${x}" y="${390-h}" width="86" height="26" rx="10" fill="#fff" opacity=".35"/><rect x="${x+15}" y="${390-h+h*.42}" width="56" height="${h*.34}" rx="4" fill="var(--ink)" opacity=".86"/><text x="${x+43}" y="${390-h+h*.42+h*.2}" text-anchor="middle" font-family="DM Mono,monospace" font-size="10" fill="var(--bg)" letter-spacing="2">${lab}</text><path d="M${x+43} ${390-h}v-14" stroke="var(--ink)" stroke-width="3"/><path d="M${x+43} ${390-h-16}c-10-12-7-26 0-38 7 12 10 26 0 38z" fill="#ffb347"/><path d="M${x+43} ${390-h-18}c-4-8-3-16 0-22 3 6 4 14 0 22z" fill="#fff2c4"/>`;
  return S(`<ellipse cx="200" cy="392" rx="180" ry="8" fill="var(--ink)" opacity=".12"/>${j(34,150,'var(--acc)','AURORE')}${j(158,210,'var(--acc2)','AMBRE')}${j(282,120,'#f3e7d8','FIGUE')}<g stroke="var(--ink)" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"><path d="M372 250c-6-40-4-80 8-120M380 160c-10-4-16-12-18-24M376 200c10-2 18-8 22-18"/></g>`); };

window.VISUALS = V;
})();
