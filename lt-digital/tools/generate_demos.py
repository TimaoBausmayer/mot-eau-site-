# -*- coding: utf-8 -*-
"""Génère une maquette HTML par métier dans ../demos/ à partir de niches.py.
Usage :  python3 generate_demos.py"""
import os, html
from niches import NICHES

OUT = os.path.join(os.path.dirname(__file__), "..", "demos")
E = html.escape

BASE_CSS = """
.js .rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}.js .rv.in{opacity:1;transform:none}
@keyframes up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
.hero .eb,.hero h1,.hero .sub,.hero .ctas{animation:up .9s cubic-bezier(.2,.7,.2,1) both}.hero h1{animation-delay:.08s}.hero .sub{animation-delay:.18s}.hero .ctas{animation-delay:.28s}
nav{transition:box-shadow .3s}nav.sc{box-shadow:0 10px 30px -18px rgba(0,0,0,.45)}
.btn{position:relative;overflow:hidden}.btn::after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.35) 50%,transparent 65%);transform:translateX(-120%);transition:transform .7s}.btn:hover::after{transform:translateX(120%)}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.js .rv{opacity:1;transform:none}}
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font-family:var(--bf),sans-serif;line-height:1.65;overflow-x:hidden}
h1,h2,h3,h4,.hf{font-family:var(--hf),serif;font-weight:var(--hw,600);line-height:1.08}
a{color:inherit;text-decoration:none}.wrap{max-width:1160px;margin:0 auto;padding:0 24px}
nav{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.nv{display:flex;align-items:center;justify-content:space-between;gap:20px;height:74px}
.lg{display:flex;align-items:center;gap:10px;font:var(--hw,600) 1.25rem var(--hf),serif;min-width:0;line-height:1.1}.lg i{flex:none}
.lg i{width:38px;height:38px;border-radius:50%;background:var(--acc);display:grid;place-items:center;font-style:normal;font-size:1.15rem}
.nl{display:flex;gap:28px;font-size:.92rem;color:var(--mut);font-weight:500}.nl a:hover{color:var(--ink)}
.btn{display:inline-block;background:var(--acc);color:var(--onacc);padding:14px 28px;border-radius:var(--r);font-weight:700;font-size:.92rem;border:0;cursor:pointer;font-family:inherit;transition:.2s;white-space:nowrap}
.btn:hover{filter:brightness(1.1);transform:translateY(-2px)}.btn.o{background:transparent;color:var(--ink);border:1.5px solid var(--ink)}.btn.o:hover{background:var(--ink);color:var(--bg)}
.eb{display:inline-block;color:var(--acc);font-weight:700;letter-spacing:.2em;text-transform:uppercase;font-size:.76rem;margin-bottom:14px}
.hero p.sub{color:var(--mut);font-size:1.1rem;max-width:520px;margin:20px 0 30px}.ctas{display:flex;gap:12px;flex-wrap:wrap}
h1 em,h2 em{font-style:normal;color:var(--acc)}
.strip{border-block:1px solid var(--line);background:var(--bg2)}.strip .wrap{display:grid;grid-template-columns:repeat(3,1fr)}
.strip div{padding:22px 14px;text-align:center;font-size:.92rem;border-right:1px solid var(--line)}.strip div:last-child{border:0}.strip small{display:block;color:var(--acc);font-weight:700;letter-spacing:.16em;text-transform:uppercase;font-size:.7rem;margin-bottom:4px}
section{padding:96px 0}.hd{text-align:center;margin-bottom:54px}.hd h2{font-size:clamp(2rem,4vw,3rem)}.hd p{color:var(--mut);margin-top:10px}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.c{background:var(--card);border:1px solid var(--line);border-radius:calc(var(--r) + 8px);padding:26px;transition:.25s}.c:hover{transform:translateY(-6px);box-shadow:0 26px 50px -30px var(--acc)}
.c .em{width:56px;height:56px;border-radius:16px;background:color-mix(in srgb,var(--acc) 16%,transparent);display:grid;place-items:center;font-size:1.7rem;margin-bottom:16px}
.c h3{font-size:1.2rem;margin-bottom:4px}.c p{color:var(--mut);font-size:.92rem;margin-bottom:14px}.c b{color:var(--acc);font-size:1.1rem}
.duo{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.vis{aspect-ratio:1;border-radius:calc(var(--r) + 24px);background:linear-gradient(145deg,var(--acc),var(--acc2));display:grid;place-items:center;font-size:clamp(7rem,16vw,12rem);position:relative;overflow:hidden;box-shadow:0 40px 80px -40px var(--acc)}
.vis::before{content:"";position:absolute;width:70%;height:70%;border-radius:50%;background:rgba(255,255,255,.15);right:-14%;top:-14%}
.duo p{color:var(--mut);margin:16px 0 26px}.stats{display:flex;gap:36px;flex-wrap:wrap}.stats strong{display:block;font:var(--hw,600) 2.2rem var(--hf),serif;color:var(--acc)}.stats span{font-size:.84rem;color:var(--mut)}
.feat{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}.feat div{padding:6px}.feat i{font-style:normal;font-size:2rem}.feat h4{margin:10px 0 4px;font-size:1.15rem}.feat p{color:var(--mut);font-size:.93rem}
.cta{background:var(--bg2)}.box{max-width:760px;margin:auto;text-align:center}.box h2{font-size:clamp(1.9rem,4vw,2.8rem);margin-bottom:26px}
.form{display:grid;grid-template-columns:1fr 1fr;gap:12px;text-align:left}.form input,.form select{padding:15px;border-radius:var(--r);border:1px solid var(--line);background:var(--card);color:var(--ink);font:inherit}.form .btn{grid-column:1/-1}
footer{padding:36px 0;text-align:center;color:var(--mut);font-size:.86rem;border-top:1px solid var(--line)}
.tag{position:fixed;left:14px;bottom:14px;z-index:99;background:#111;color:#fff;font:600 11px Inter,sans-serif;padding:6px 12px;border-radius:99px}
@media(max-width:860px){.cards,.feat{grid-template-columns:1fr 1fr}.duo{grid-template-columns:1fr;gap:34px}.nl{display:none}section{padding:62px 0}.strip .wrap{grid-template-columns:1fr}.strip div{border-right:0;border-bottom:1px solid var(--line)}}
@media(max-width:560px){.cards,.feat,.form{grid-template-columns:1fr}.nv{gap:10px}.nv .btn{padding:10px 14px;font-size:.84rem}.lg{font-size:1.02rem}.lg i{width:32px;height:32px;font-size:1rem}}
"""

# --- spécifique à chaque mise en page ---
CSS_A = """
.hero{padding:84px 0 70px}.hero-in{display:grid;grid-template-columns:1.1fr .9fr;gap:50px;align-items:center}
h1{font-size:clamp(2.5rem,5.4vw,4.3rem);letter-spacing:-.01em}
.disc{aspect-ratio:1;max-width:440px;width:100%;margin:auto;border-radius:50%;background:linear-gradient(145deg,var(--acc),var(--acc2));display:grid;place-items:center;font-size:clamp(7rem,17vw,11.5rem);position:relative;box-shadow:0 50px 90px -40px var(--acc)}
.chip{position:absolute;background:var(--card);border:1px solid var(--line);border-radius:18px;width:68px;height:68px;display:grid;place-items:center;font-size:2rem;box-shadow:0 18px 40px -18px rgba(0,0,0,.4);animation:fl 5s ease-in-out infinite}
.chip:nth-child(2){top:6%;left:-4%}.chip:nth-child(3){bottom:12%;left:-8%;animation-delay:-1.5s}.chip:nth-child(4){top:16%;right:-4%;animation-delay:-3s}
@keyframes fl{50%{transform:translateY(-10px)}}
@media(max-width:860px){.hero-in{grid-template-columns:1fr}.disc{max-width:300px}.chip{width:54px;height:54px;font-size:1.5rem}.chip:nth-child(2){left:0}.chip:nth-child(3){left:0}.chip:nth-child(4){right:0}}
"""
CSS_B = """
.hero{padding:96px 0 40px;text-align:center}.hero p.sub{margin-inline:auto}.hero .ctas{justify-content:center}
h1{font-size:clamp(2.7rem,6.4vw,5.2rem);max-width:15ch;margin:0 auto;letter-spacing:-.015em}
.emo{display:flex;gap:22px;justify-content:center;align-items:flex-end;margin:56px 0 0;font-size:clamp(3.5rem,9vw,6.4rem)}.emo span:nth-child(2){font-size:1.6em;filter:drop-shadow(0 20px 22px color-mix(in srgb,var(--acc) 55%,transparent))}.emo span{opacity:.92}
.menu{display:grid;grid-template-columns:1fr 1fr;gap:6px 70px;max-width:980px;margin:auto}
.mi{display:grid;grid-template-columns:auto 1fr auto;gap:14px;align-items:baseline;padding:18px 0;border-bottom:1px dashed var(--line)}
.mi .em{font-size:1.5rem}.mi h3{font-size:1.18rem}.mi p{color:var(--mut);font-size:.88rem;grid-column:2}.mi b{color:var(--acc);font:var(--hw,600) 1.15rem var(--hf),serif;grid-row:1;grid-column:3}
.quote{text-align:center;max-width:760px;margin:auto}.quote h2{font-size:clamp(1.9rem,4vw,3rem);margin-bottom:18px}.quote p{color:var(--mut);font-size:1.08rem}.quote .stats{justify-content:center;margin-top:32px}
@media(max-width:860px){.menu{grid-template-columns:1fr}}
"""
CSS_C = """
.hero{padding:80px 0 64px;position:relative;overflow:hidden}.hero::after{content:attr(data-e);position:absolute;right:-2%;top:6%;font-size:clamp(11rem,34vw,26rem);opacity:.1;filter:saturate(1.4);pointer-events:none;line-height:1}
h1{font-size:clamp(2.8rem,6.6vw,5.6rem);text-transform:uppercase;letter-spacing:.005em;line-height:.98;max-width:15ch;position:relative}
.hero .sub{position:relative}.hero .ctas{position:relative}
.mq{background:var(--acc);color:var(--onacc);overflow:hidden;white-space:nowrap;padding:14px 0}.mq div{display:inline-block;animation:mq 24s linear infinite;font:var(--hw,600) 1.35rem var(--hf),sans-serif;text-transform:uppercase;letter-spacing:.06em}.mq span{margin:0 24px}
@keyframes mq{to{transform:translateX(-50%)}}
.tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.t{background:var(--card);border:1px solid var(--line);padding:28px;position:relative;overflow:hidden;transition:.25s;border-radius:var(--r)}.t:hover{border-color:var(--acc);transform:translateY(-5px)}
.t .n{position:absolute;right:16px;top:6px;font:var(--hw,600) 4.5rem var(--hf),sans-serif;color:var(--acc);opacity:.12}.t .em{font-size:2.4rem;margin-bottom:14px}.t h3{font-size:1.45rem;text-transform:uppercase;letter-spacing:.02em}.t p{color:var(--mut);font-size:.92rem;margin:6px 0 16px}.t b{color:var(--acc);font:var(--hw,600) 1.5rem var(--hf),sans-serif}
.hd h2{text-transform:uppercase}.box h2,.duo h2{text-transform:uppercase}
@media(max-width:860px){.tiles{grid-template-columns:1fr 1fr}}@media(max-width:560px){.tiles{grid-template-columns:1fr}}
"""

def font_link(h, b):
    fam = lambda f: "family=" + f.replace(" ", "+") + (":ital,wght@0,400;0,500;0,600;0,700;1,500" if f in ("Cormorant Garamond","Playfair Display","Fraunces") else ":wght@400;500;600;700")
    fams = [fam(h)] if h in ("Anton","Bebas Neue","Archivo Black") else [fam(h)]
    fams = [("family="+h.replace(" ","+")) if h in ("Anton","Bebas Neue","Archivo Black") else fam(h), fam(b)]
    return "https://fonts.googleapis.com/css2?" + "&".join(fams) + "&display=swap"

def accent_h1(t):
    return E(t).replace("{", "<em>").replace("}", "</em>")

def common_head(n):
    p = n["pal"]; h, b = n["fonts"]
    heavy = h in ("Anton","Bebas Neue","Archivo Black","Oswald","Barlow Condensed")
    root = ":root{" + "".join(f"--{k}:{v};" for k, v in p.items()) + f"--hf:'{h}';--bf:'{b}';--hw:{400 if h in ('Anton','Bebas Neue','Archivo Black') else (600 if not heavy else 600)};--r:{'4px' if n['layout']=='C' else '14px'}" + "}"
    css = BASE_CSS + {"A": CSS_A, "B": CSS_B, "C": CSS_C}[n["layout"]]
    return f"""<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{E(n['name'])} — maquette</title>
<link href="{font_link(h,b)}" rel="stylesheet"><style>{root}{css}</style></head><body>"""

def nav(n):
    return f"""<nav><div class="wrap nv"><a class="lg" href="#"><i>{n['emoji']}</i>{E(n['name'])}</a><div class="nl"><a href="#offre">{E(n['offers_title'])}</a><a href="#apropos">À propos</a><a href="#contact">Contact</a></div><a class="btn" href="#contact">Contact</a></div></nav>"""

def strip(n):
    return f"""<div class="strip"><div class="wrap"><div><small>Horaires</small>{E(n['hours'])}</div><div><small>Adresse</small>{E(n['address'])}</div><div><small>Contact</small>{E(n['phone'])}</div></div></div>"""

def form(n):
    opts = "".join(f"<option>{E(o)}</option>" for o in n["form"])
    return f"""<section class="cta" id="contact"><div class="wrap box"><span class="eb">Contact</span><h2 class="hf">{E(n['form_title'])}</h2><form class="form" onsubmit="event.preventDefault();this.querySelector('.btn').textContent='Demande envoyée ✓'"><input placeholder="Votre nom" required><input placeholder="Téléphone ou e-mail" required><select>{opts}</select><input type="date"><button class="btn">{E(n['cta'])}</button></form></div></section>"""

JS = '''<script>document.documentElement.classList.add('js');addEventListener('DOMContentLoaded',()=>{const n=document.querySelector('nav');const f=()=>n.classList.toggle('sc',scrollY>8);f();addEventListener('scroll',f,{passive:true});const els=document.querySelectorAll('.rv');els.forEach(e=>{const i=[...e.parentNode.children].indexOf(e);e.style.transitionDelay=Math.min(i,6)*70+'ms'});if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});els.forEach(e=>io.observe(e))})</script>'''

def foot(n):
    return f"""<footer>{E(n['name'])} · {E(n['address'])} · Maquette de démonstration réalisée par LT Digital</footer><div class="tag">Maquette LT Digital</div>""" + JS + "</body></html>"

def feats(n):
    return "".join(f"<div class=\"rv\"><i>{e}</i><h4>{E(t)}</h4><p>{E(x)}</p></div>" for e, t, x in n["features"])

def stats(n):
    return "".join(f"<div><strong>{E(v)}</strong><span>{E(l)}</span></div>" for v, l in n["stats"])

def build_A(n):
    chips = "".join(f'<span class="chip">{c}</span>' for c in n["chips"])
    cards = "".join(f'<div class="c rv"><div class="em">{e}</div><h3>{E(t)}</h3><p>{E(d)}</p><b>{E(pr)}</b></div>' for e, t, d, pr in n["offers"])
    return common_head(n) + nav(n) + f"""
<header class="hero"><div class="wrap hero-in"><div><span class="eb">{E(n['short'])}</span><h1 class="hf">{accent_h1(n['hero'])}</h1><p class="sub">{E(n['sub'])}</p><div class="ctas"><a class="btn" href="#contact">{E(n['cta'])}</a><a class="btn o" href="#offre">{E(n['cta2'])}</a></div></div><div class="disc">{n['emoji']}{chips}</div></div></header>
{strip(n)}
<section id="offre"><div class="wrap"><div class="hd rv"><span class="eb">{E(n['short'])}</span><h2 class="hf">{E(n['offers_title'])}</h2></div><div class="cards">{cards}</div></div></section>
<section id="apropos" style="background:var(--bg2)"><div class="wrap duo"><div class="vis rv">{n['emoji']}</div><div><span class="eb">À propos</span><h2 class="hf" style="font-size:clamp(2rem,4vw,3rem)">{E(n['about_title'])}</h2><p>{E(n['about'])}</p><div class="stats">{stats(n)}</div></div></div></section>
<section><div class="wrap feat">{feats(n)}</div></section>
{form(n)}""" + foot(n)

def build_B(n):
    emo = "".join(f"<span>{c}</span>" for c in [n["chips"][0], n["emoji"], n["chips"][1]])
    items = "".join(f'<div class="mi rv"><span class="em">{e}</span><h3>{E(t)}</h3><b>{E(pr)}</b><p>{E(d)}</p></div>' for e, t, d, pr in n["offers"])
    return common_head(n) + nav(n) + f"""
<header class="hero"><div class="wrap"><span class="eb">{E(n['short'])}</span><h1 class="hf">{accent_h1(n['hero'])}</h1><p class="sub">{E(n['sub'])}</p><div class="ctas"><a class="btn" href="#contact">{E(n['cta'])}</a><a class="btn o" href="#offre">{E(n['cta2'])}</a></div><div class="emo">{emo}</div></div></header>
{strip(n)}
<section id="offre"><div class="wrap"><div class="hd rv"><span class="eb">{E(n['short'])}</span><h2 class="hf">{E(n['offers_title'])}</h2></div><div class="menu">{items}</div></div></section>
<section id="apropos" style="background:var(--bg2)"><div class="wrap quote"><span class="eb">À propos</span><h2 class="hf">{E(n['about_title'])}</h2><p>{E(n['about'])}</p><div class="stats">{stats(n)}</div></div></section>
<section><div class="wrap feat">{feats(n)}</div></section>
{form(n)}""" + foot(n)

def build_C(n):
    kw = "".join(f"<span>{E(k)}</span>✦" for k in [t for _, t, _, _ in n["offers"]] * 2)
    tiles = "".join(f'<div class="t rv"><span class="n">{i+1:02d}</span><div class="em">{e}</div><h3>{E(t)}</h3><p>{E(d)}</p><b>{E(pr)}</b></div>' for i, (e, t, d, pr) in enumerate(n["offers"]))
    return common_head(n) + nav(n) + f"""
<header class="hero" data-e="{n['emoji']}"><div class="wrap"><span class="eb">{E(n['short'])}</span><h1 class="hf">{accent_h1(n['hero'])}</h1><p class="sub">{E(n['sub'])}</p><div class="ctas"><a class="btn" href="#contact">{E(n['cta'])}</a><a class="btn o" href="#offre">{E(n['cta2'])}</a></div></div></header>
<div class="mq"><div>{kw}</div></div>
{strip(n)}
<section id="offre"><div class="wrap"><div class="hd rv"><span class="eb">{E(n['short'])}</span><h2 class="hf">{E(n['offers_title'])}</h2></div><div class="tiles">{tiles}</div></div></section>
<section id="apropos" style="background:var(--bg2)"><div class="wrap duo"><div class="vis rv">{n['emoji']}</div><div><span class="eb">À propos</span><h2 class="hf" style="font-size:clamp(2rem,4vw,3rem)">{E(n['about_title'])}</h2><p>{E(n['about'])}</p><div class="stats">{stats(n)}</div></div></div></section>
<section><div class="wrap feat">{feats(n)}</div></section>
{form(n)}""" + foot(n)

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for n in NICHES:
        with open(os.path.join(OUT, n["slug"] + ".html"), "w", encoding="utf-8") as f:
            f.write({"A": build_A, "B": build_B, "C": build_C}[n["layout"]](n))
    print(len(NICHES), "maquettes générées")
