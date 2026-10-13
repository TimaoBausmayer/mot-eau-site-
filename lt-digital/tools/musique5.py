"""Musique originale + bruitages de la pub n°10 L&T Digital (24 s, 120 BPM, la mineur).
Créée de zéro (aucun extrait d'une autre musique) : libre d'utilisation.

Usage : python3 tools/musique5.py sortie.wav promo/pub10/cues.json
cues.json = {"sections": {...}, "cues": [{"t": 2.0, "s": "impact"}, ...]}
  sections : drop (s), breaks [[début, fin], ...] (rythmique coupée), final (s), end (s), silence [[début, fin]] (tout coupé)
  sons disponibles : voir SFX plus bas (impact, whoosh, riser, pop, click, ding, shimmer, sub, swell, blip, hit, glitch,
  typing:<durée>, ticks:<durée>, stamp, zip, glass, heart, swoosh_up, rumble:<durée>, bloop, snap, chime)
  « gain » facultatif (1 = normal).
"""
import sys, os, json
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
import musique as m
from musique import SR, n, add, noise, env_exp, hz, reverb, save, band
from musique2 import kick, b808, clap, hat, pad_soft, pluck, bell, reverse_swell, sub_drop, blip, pop, shimmer

rng = np.random.default_rng(57)
Q = 0.5; E = Q / 2; S16 = Q / 4; BAR = 4 * Q; DUR = 24.0

CHORDS = [(33, [57, 60, 64, 67]), (29, [53, 57, 60, 64]), (36, [55, 60, 64, 67]), (31, [55, 59, 62, 66])]
HOOK = [[81, None, 79, 76, None, 79, 81, None], [77, None, 76, 72, None, 76, 77, None],
        [79, None, 76, 79, None, 84, 83, 79], [78, None, 74, 78, None, 79, None, None]]

def glitch(sec=0.25):
    L = n(sec); x = np.zeros(L)
    k = 0
    while k < L:
        seg = int(SR * rng.uniform(0.008, 0.03)); f = rng.uniform(200, 3000)
        t = np.arange(min(seg, L - k)) / SR
        x[k:k + len(t)] = np.sign(np.sin(2 * np.pi * f * t)) * rng.uniform(.2, .6) if rng.random() < .6 else band(noise(len(t) / SR), 800, 8000)[:len(t)] * .7
        k += seg + int(SR * rng.uniform(0, 0.01))
    return x * np.linspace(1, .3, L)

def typing(sec=0.6, rate=14):
    x = np.zeros(n(sec) + n(0.1)); t = 0.0
    while t < sec: add(x, t, m.click() * rng.uniform(.5, 1), 0.6); t += 1 / rate * rng.uniform(.7, 1.3)
    return x

def ticks(sec=1.0, start_gap=0.012, grow=1.06):
    x = np.zeros(n(sec) + n(0.1)); t, g = 0.0, start_gap
    while t < sec: add(x, t, m.click(), 0.5); t += g; g *= grow
    return x

def stamp(): return mixs((m.impact(), .8), (band(noise(0.06), 200, 2000) * env_exp(n(0.06), 0.02), .8))
def zip_(sec=0.18):
    L = n(sec); t = np.arange(L) / SR; f = 800 + 5000 * t / sec
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * band(noise(sec), 2000, 9000)[:L] * env_exp(L, sec / 2) * 2
def mixs(*sigs):
    L = max(len(x) for x, _ in sigs); o = np.zeros(L)
    for x, g in sigs: o[:len(x)] += x * g
    return o
def glass(): return mixs((bell(hz(96), 1.2), .8), (bell(hz(103), 1.0), .4))
def heart(): return mixs((pop(), .6), (blip(2600), .3))
def rumble(sec=1.0):
    x = band(noise(sec), 30, 160); t = np.arange(len(x)) / SR
    return x * np.minimum(1, t / (sec * .6)) * 3
def bloop():
    L = n(0.18); t = np.arange(L) / SR; f = 300 + 900 * np.exp(-t / 0.04)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(L, 0.07)
def chime(): return mixs((bell(hz(88), 1.4), 1), (bell(hz(95), 1.2), .6))

def sfx(name, buf, t, g=1.0):
    nm, _, arg = name.partition(":"); a = float(arg) if arg else None
    if nm == "impact": add(buf, t, m.impact(), .85 * g); add(buf, t, sub_drop(0.8), .5 * g)
    elif nm == "whoosh": add(buf, t, m.whoosh(a or 0.4), .55 * g)
    elif nm == "swoosh_up": add(buf, t, m.whoosh(a or 0.3), .45 * g); add(buf, t, blip(1800), .1 * g)
    elif nm == "riser": add(buf, t, m.riser(a or 1.0), .5 * g)
    elif nm == "pop": add(buf, t, pop(), .6 * g)
    elif nm == "click": add(buf, t, m.click(), .75 * g)
    elif nm == "ding": add(buf, t, m.ding(), .55 * g)
    elif nm == "shimmer": add(buf, t, shimmer(a or 1.2), .38 * g)
    elif nm == "sub": add(buf, t, sub_drop(a or 1.0), .55 * g)
    elif nm == "swell": add(buf, t - (a or 0.5), reverse_swell(a or 0.5), .5 * g)
    elif nm == "blip": add(buf, t, blip(int(a or 1800)), .2 * g)
    elif nm == "hit": add(buf, t, m.hit(), .55 * g)
    elif nm == "glitch": add(buf, t, glitch(a or 0.25), .35 * g)
    elif nm == "typing": add(buf, t, typing(a or 0.6), .5 * g)
    elif nm == "ticks": add(buf, t, ticks(a or 1.0), .45 * g)
    elif nm == "stamp": add(buf, t, stamp(), .8 * g)
    elif nm == "zip": add(buf, t, zip_(a or 0.18), .35 * g)
    elif nm == "glass": add(buf, t, glass(), .3 * g)
    elif nm == "heart": add(buf, t, heart(), .45 * g)
    elif nm == "rumble": add(buf, t, rumble(a or 1.0), .4 * g)
    elif nm == "bloop": add(buf, t, bloop(), .5 * g)
    elif nm == "snap": add(buf, t, m.click(), .9 * g); add(buf, t, m.hit(), .3 * g)
    elif nm == "chime": add(buf, t, chime(), .25 * g)
    else: raise ValueError("son inconnu : " + name)

def build(cfg):
    S = cfg.get("sections", {})
    DROP = S.get("drop", 2.0); END = S.get("final", 22.0); STOP = S.get("end", 24.0)
    BRKS = S.get("breaks", []); SIL = S.get("silence", [])
    L = n(DUR) + n(3)
    drums = np.zeros(L); bass = np.zeros(L); keys = np.zeros(L); lead = np.zeros(L); fx = np.zeros(L)
    inb = lambda t: any(a <= t < b for a, b in BRKS)
    full = lambda t: DROP <= t < END and not inb(t)
    for b in range(int(DUR / BAR) + 1):
        t0 = b * BAR
        if t0 >= STOP: break
        root, notes = CHORDS[b % 4]
        for mm in notes: add(keys, t0, pad_soft(hz(mm), BAR + 0.5, 5, 0.25 if t0 >= DROP else 0.8), 0.05)
    for e in range(int(END / E)):
        t = e * E
        chord = CHORDS[int(t // BAR) % 4][1]; seq = [0, 2, 1, 3, 2, 1, 3, 2]
        add(lead, t, pluck(hz(chord[seq[e % 8]] + 12), 0.38), 0.04 if t >= DROP else 0.028)
    for s in range(int(END / S16) + 1):
        t = s * S16; e = s // 2; b = int(t // BAR); k = e % 8; root, chord = CHORDS[b % 4]
        on8 = s % 2 == 0
        if full(t):
            if on8 and k % 2 == 0: add(drums, t, kick(), 0.85)
            if on8 and k in (2, 6): add(drums, t, clap(), 0.62)
            add(drums, t, hat(0.012), (0.16 if on8 and k % 2 else 0.1) if on8 else 0.06)
            if on8 and k in (0, 3, 6): add(bass, t, b808(hz(root), 0.28, glide_from=hz(root + 7) if k == 6 else None), 0.7)
            note = HOOK[b % 4][k] if on8 else None
            if note and t >= DROP + BAR: add(lead, t, bell(hz(note), 0.9), 0.08)
        elif t < DROP and on8 and k % 2 == 0:
            add(drums, t, hat(0.015), 0.04 + 0.1 * t / max(DROP, .01))
        elif inb(t) and on8 and k in (0, 4):
            add(lead, t, bell(hz(chord[k // 2] + 12)), 0.055)
    # accord final tenu
    add(bass, END, b808(hz(33), 1.8), 0.85); add(drums, END, kick(), 1.0)
    for mm in CHORDS[0][1]: add(keys, END, pad_soft(hz(mm), STOP - END + .5, 6, 0.05), 0.07)
    add(lead, END + 0.02, bell(hz(81), 1.6), 0.12)
    for c in cfg.get("cues", []): sfx(c["s"], fx, c["t"], c.get("gain", 1.0))
    duck = np.ones(L); dl = n(0.16); shape = 1 - 0.5 * np.exp(-np.arange(dl) / SR / 0.05)
    for e in range(int(END / E)):
        t = e * E
        if full(t) and e % 2 == 0:
            j = n(t); duck[j:j + dl] = np.minimum(duck[j:j + dl], shape[: len(duck[j:j + dl])])
    keys *= duck; lead *= 0.65 + 0.35 * duck
    gap = np.ones(L)
    for a in [DROP] + [b for _, b in BRKS]: gap[n(a - 0.08): n(a)] = 0.05
    for a, b in SIL: gap[n(a): n(b)] = 0.0
    music = (drums + bass * 0.9 + reverb(keys, 2.4, 0.35) + reverb(lead, 1.8, 0.3)) * gap
    fx = reverb(fx, 0.8, 0.14)
    music /= np.max(np.abs(music)) + 1e-9; fx /= np.max(np.abs(fx)) + 1e-9
    mix = music * 0.7 + fx * 0.58
    side = reverb(keys + lead, 1.1, 0.0) * 0.06 * gap
    st = np.stack([mix + np.roll(side, n(0.011)), mix - np.roll(side, n(0.017))], 1)[: n(DUR)]
    fo = n(0.8); st[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.5
    st[: n(0.02)] *= np.linspace(0, 1, n(0.02))[:, None]
    st = np.tanh(st / np.max(np.abs(st)) * 1.25)
    return st / np.max(np.abs(st)) * 0.9

if __name__ == "__main__":
    cfg = json.load(open(sys.argv[2], encoding="utf-8")) if len(sys.argv) > 2 else {}
    save(build(cfg), sys.argv[1]); print("ok", sys.argv[1])
