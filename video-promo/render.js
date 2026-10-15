// node render.js preview  → planche d'images clés ; node render.js full → toutes les images (30 i/s)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const mode=process.argv[2]||'preview';
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const p=await b.newPage({viewport:{width:1080,height:1920}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.goto('file://'+path.join(__dirname,'promo.html'));
  await p.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r})))});
  const dir=path.join(__dirname,mode==='full'?'frames':'preview');fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir);
  const times=mode==='full'?Array.from({length:720},(_,i)=>i/30):(process.argv[3]?process.argv[3].split(',').map(Number):[0.3,1.2,1.8,2.6,3.7,4.4,5.0,5.8,7.0,8.3,9.0,9.8,10.6,11.4,12.4,13.6,14.9,15.75,17.2,18.8,20.7,21.6,23.5]);
  const t0=Date.now();
  for(const [i,t] of times.entries()){
    await p.evaluate(t=>renderAt(t),t);
    await p.screenshot({path:path.join(dir,String(i).padStart(4,'0')+'.jpg'),type:'jpeg',quality:mode==='full'?93:80});
    if(mode==='full'&&i%90===0)console.log('image',i,'/',times.length,Math.round((Date.now()-t0)/1000)+'s');
  }
  console.log('terminé',times.length,'images',Math.round((Date.now()-t0)/1000)+'s','| erreurs JS:',errs.length?errs:'aucune');
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
