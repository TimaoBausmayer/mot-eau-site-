"""Musique originale « chill trap aérien » (92 BPM, la mineur) + bruitages pour la pub n°8 L&T Digital.
Créée de zéro (aucun extrait d'une autre musique) : libre d'utilisation.

Usage : python3 tools/musique3.py sortie.wav [--bruitages]   (--bruitages = sans la musique)
Grille : 92 BPM → 1 temps = 0,652 s, 1 mesure = 2,609 s. Chaque scène de promo/pub8.html dure une mesure.
Drop à 2,609 s (le mot « ville. »), pause 18,26 → 19,57 s (le point vert), final 22,17 s.
"""
import sys, os
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
import musique as m
from musique import SR, n, add, noise, env_exp, hz, reverb, save, band
from musique2 import kick, b808, clap, hat, pad_soft, pluck, bell, reverse_swell, sub_drop, blip, pop, shimmer

rng = np.random.default_rng(23)
Q = 60 / 92               # un temps
E = Q / 2                 # une croche
BAR = 4 * Q
DUR = 24.0
DROP, BRK, BACK, END = BAR, 7 * BAR, 7 * BAR + 2 * Q, 22.17
FX_ONLY = "--bruitages" in sys.argv

# la mineur 7 → fa maj 7 → do → sol (6)
CHORDS = [(33, [57, 60, 64, 67]), (29, [53, 57, 60, 64]), (36, [55, 60, 64, 67]), (31, [55, 59, 62, 64])]
HOOK = [
    [76, None, 79, 76, None, 74, 72, None],
    [72, None, 76, None, 77, 76, 72, None],
    [79, None, 76, 79, None, 81, 79, 76],
    [74, None, 71, None, 74, 76, None, None],
]

def wash(sec):
    """Ressac doux (bruit filtré qui respire)."""
    x = band(noise(sec), 200, 2500)
    t = np.arange(len(x)) / SR
    return x * (0.55 + 0.45 * np.sin(2 * np.pi * t / 1.3 - 1.5)) * np.minimum(1, t / 0.3)

def flutter(sec):
    """Pages qui volent."""
    x = band(noise(sec), 1500, 7000)
    t = np.arange(len(x)) / SR
    return x * (0.5 + 0.5 * np.abs(np.sin(2 * np.pi * 9 * t))) * np.exp(-t / (sec * 0.6))

def key_click():
    return m.click() * 0.8

def build():
    L = n(DUR) + n(3)
    drums = np.zeros(L); bass = np.zeros(L); keys = np.zeros(L); lead = np.zeros(L); fx = np.zeros(L)
    full = lambda t: (DROP <= t < BRK) or (BACK <= t < END)

    # nappe sur toute la durée
    for b in range(int(DUR / BAR) + 1):
        t0 = b * BAR
        if t0 >= END: break
        root, notes = CHORDS[b % 4]
        soft = not full(t0 + 0.1)
        for mm in notes:
            add(keys, t0, pad_soft(hz(mm), BAR + 0.6, 4 if soft else 6, 0.7 if soft else 0.2), 0.05)

    # arpège en croches du début à la fin (ce qui donne le côté « rêveur »)
    for e in range(int(END / E)):
        t = e * E
        if BRK <= t < BACK: continue
        chord = CHORDS[int(t // BAR) % 4][1]
        seq = [0, 2, 1, 3, 2, 1, 3, 2]
        add(lead, t, pluck(hz(chord[seq[e % 8]] + 12), 0.45), 0.05 if t < DROP else 0.045)

    # partie rythmique
    for e in range(int(END / E) + 1):
        t = e * E
        b = int(t // BAR); k = e % 8; root, chord = CHORDS[b % 4]
        if full(t):
            if k in (0, 3) or (k == 5 and b % 2):
                add(drums, t, kick(), 0.85)
                ln = {0: 3 * E, 3: 2 * E, 5: 3 * E}[k]
                add(bass, t, b808(hz(root), ln + 0.02, glide_from=hz(root + 7) if (k == 5) else None), 0.75)
            if k in (2, 6): add(drums, t, clap(), 0.6)
            if b % 2 == 1 and k == 7:
                for r in range(4): add(drums, t + r * E / 4, hat(0.012), 0.2)
            else:
                add(drums, t, hat(), 0.26); add(drums, t + E / 2, hat(0.012), 0.12)
            note = HOOK[b % 4][k]
            if note and t >= DROP + BAR: add(lead, t, bell(hz(note), 1.0), 0.09)
        elif t < DROP and k % 2 == 0:
            add(drums, t, hat(0.015), 0.06 + 0.08 * t / DROP)
        elif BRK <= t < BACK and k in (0, 2):
            add(lead, t, bell(hz(chord[k // 2] + 12)), 0.06)

    # final : accord tenu
    add(bass, END, b808(hz(33), 1.8), 0.85); add(drums, END, kick(), 1.0)
    for mm in CHORDS[0][1]: add(keys, END, pad_soft(hz(mm), 1.9, 6, 0.05), 0.07)
    add(lead, END + 0.02, bell(hz(81), 1.6), 0.12)

    # ---------------- bruitages (calés sur l'image)
    t = 0.25
    for ch in "Fais-moi le site|le plus beau|de ma ville.":
        t += 0.05
        if ch not in " |": add(fx, t + rng.uniform(-.004, .004), key_click(), 0.28 + rng.uniform(0, .1))
    add(fx, 2.2, m.click(), 0.9); add(fx, 2.2, pop(), 0.5); add(fx, 2.25, shimmer(0.8), 0.25)
    add(fx, DROP - 0.6, reverse_swell(0.6), 0.5)
    add(fx, DROP, m.impact(), 0.85); add(fx, DROP, sub_drop(1.2), 0.55); add(fx, DROP, m.whoosh(0.6), 0.6)
    add(fx, 3.26, shimmer(1.0), 0.35); add(fx, 3.26, sub_drop(0.9), 0.3)
    add(fx, 3.85, m.whoosh(0.5), 0.45)
    add(fx, 3.95, m.riser(1.25), 0.5)
    add(fx, 5.2, m.hit(), 0.6); add(fx, 5.2, shimmer(1.2), 0.35)
    add(fx, 5.25, wash(2.5), 0.22)
    add(fx, 5.5, blip(1900), 0.2)
    add(fx, 7.05, m.whoosh(0.8), 0.6); add(fx, 7.6, wash(0.9) * 1.5, 0.35)
    add(fx, 7.9, pop(), 0.6); add(fx, 8.6, blip(2400), 0.15)
    for i in range(10): add(fx, 8.0 + i * 0.16 + rng.uniform(0, .05), pop(), 0.18 + rng.uniform(0, .12))
    add(fx, 10.435, m.impact(), 0.75); add(fx, 10.45, flutter(2.4), 0.35)
    add(fx, 10.75, m.whoosh(0.3), 0.3)
    add(fx, 11.2, m.whoosh(0.5), 0.45)
    for i in range(48): add(fx, 11.6 + i * 0.024 + rng.uniform(0, .01), key_click(), 0.2)
    add(fx, 13.05, m.whoosh(0.5), 0.45); add(fx, 13.1, pop(), 0.5)
    # cliquetis du compteur qui ralentit
    tt, gap = 13.3, 0.018
    while tt < 15.5:
        add(fx, tt, m.click(), 0.35); tt += gap; gap *= 1.09
    add(fx, 15.55, blip(2600), 0.3)
    add(fx, 15.6, m.whoosh(0.8), 0.45)
    add(fx, 16.3, shimmer(1.6), 0.4); add(fx, 16.6, bell(hz(88), 1.6), 0.2)
    add(fx, BRK, blip(1200), 0.35); add(fx, BRK + 0.1, reverse_swell(0.9), 0.4)
    add(fx, 19.27, m.whoosh(0.4), 0.55); add(fx, BACK, m.impact(), 0.7)
    add(fx, 19.95, m.whoosh(0.3), 0.3)
    add(fx, 21.4, m.whoosh(0.35), 0.35); add(fx, 21.6, m.hit(), 0.5)
    add(fx, 22.15, m.click(), 0.9); add(fx, 22.15, pop(), 0.5)
    add(fx, END + 0.18, m.impact(), 0.8); add(fx, END + 0.2, shimmer(1.8), 0.4)

    # respiration de la nappe sur la grosse caisse + silence juste avant les drops
    duck = np.ones(L); dl = n(0.18); shape = 1 - 0.5 * np.exp(-np.arange(dl) / SR / 0.05)
    for e in range(int(END / E)):
        t = e * E
        if full(t) and e % 8 in (0, 3):
            j = n(t); duck[j:j + dl] = np.minimum(duck[j:j + dl], shape[: len(duck[j:j + dl])])
    keys *= duck; lead *= 0.65 + 0.35 * duck
    gap = np.ones(L)
    for a in (DROP, BACK):
        gap[n(a - 0.1): n(a)] = 0.05
    music = (drums + bass * 0.9 + reverb(keys, 2.8, 0.38) + reverb(lead, 2.0, 0.32)) * gap
    fx = reverb(fx, 0.9, 0.15)

    music /= np.max(np.abs(music)) + 1e-9
    fx /= np.max(np.abs(fx)) + 1e-9
    mix = (music * 0.75 if not FX_ONLY else 0) + fx * 0.5
    side = reverb(keys + lead, 1.2, 0.0) * (0.06 if not FX_ONLY else 0)
    st = np.stack([mix + np.roll(side, n(0.011)), mix - np.roll(side, n(0.017))], 1)[: n(DUR)]
    fo = n(1.6); st[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.5
    st[: n(0.02)] *= np.linspace(0, 1, n(0.02))[:, None]
    st = np.tanh(st / np.max(np.abs(st)) * 1.25)
    return st / np.max(np.abs(st)) * 0.9

if __name__ == "__main__":
    save(build(), sys.argv[1]); print("ok", sys.argv[1])
