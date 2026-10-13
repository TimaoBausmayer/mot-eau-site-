"""Musique originale « pop électro » (120 BPM, la mineur) + bruitages pour la pub n°9 L&T Digital (20 s).
Créée de zéro (aucun extrait d'une autre musique) : libre d'utilisation.

Usage : python3 tools/musique4.py sortie.wav
Grille : 120 BPM → 1 temps = 0,5 s, 1 mesure = 2 s. Chaque scène de promo/pub9.html dure une mesure.
Drop à 2 s (le logo), petite pause rythmique 14,1 → 15,4 s (le cercle qui se remplit), final à 18 s.
"""
import sys, os
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
import musique as m
from musique import SR, n, add, noise, env_exp, hz, reverb, save, band
from musique2 import kick, b808, clap, hat, pad_soft, pluck, bell, reverse_swell, sub_drop, blip, pop, shimmer

rng = np.random.default_rng(31)
Q = 0.5; E = Q / 2; BAR = 4 * Q; DUR = 20.0
DROP, BRK, BACK, END = 2.0, 14.1, 15.4, 18.0

# la mineur → fa → do → sol
CHORDS = [(33, [57, 60, 64, 67]), (29, [53, 57, 60, 64]), (36, [55, 60, 64, 67]), (31, [55, 59, 62, 64])]
HOOK = [[81, None, 79, 76, None, 79, 76, None], [77, None, 76, 72, None, 76, 72, None],
        [79, None, 76, 79, None, 84, 79, 76], [74, None, 71, 74, None, 76, None, None]]

def whoosh_up(sec): return m.whoosh(sec)

def build():
    L = n(DUR) + n(3)
    drums = np.zeros(L); bass = np.zeros(L); keys = np.zeros(L); lead = np.zeros(L); fx = np.zeros(L)
    full = lambda t: (DROP <= t < BRK) or (BACK <= t < END)

    # nappe + arpège rapide
    for b in range(int(DUR / BAR) + 1):
        t0 = b * BAR
        if t0 >= END: break
        root, notes = CHORDS[b % 4]
        for mm in notes: add(keys, t0, pad_soft(hz(mm), BAR + 0.5, 5, 0.3), 0.05)
    for e in range(int(END / E)):
        t = e * E
        if BRK <= t < BACK: continue
        chord = CHORDS[int(t // BAR) % 4][1]
        seq = [0, 2, 1, 3, 2, 1, 3, 2]
        add(lead, t, pluck(hz(chord[seq[e % 8]] + 12), 0.4), 0.045 if t >= DROP else 0.03)

    # rythme : 4 temps au sol, claps, charleston, basse
    for e in range(int(END / E) + 1):
        t = e * E; b = int(t // BAR); k = e % 8; root, chord = CHORDS[b % 4]
        if full(t):
            if k % 2 == 0: add(drums, t, kick(), 0.85)
            if k in (2, 6): add(drums, t, clap(), 0.65)
            add(drums, t, hat(0.015), 0.2 if k % 2 else 0.13)
            if k in (0, 3, 6): add(bass, t, b808(hz(root), 0.28, glide_from=hz(root + 7) if k == 6 else None), 0.7)
            note = HOOK[b % 4][k]
            if note and t >= DROP + BAR: add(lead, t, bell(hz(note), 0.9), 0.085)
        elif t < DROP and k % 2 == 0:
            add(drums, t, hat(0.015), 0.05 + 0.1 * t / DROP)
        elif BRK <= t < BACK and k in (0, 4):
            add(lead, t, bell(hz(chord[k // 2] + 12)), 0.06)

    # ---------------- bruitages calés sur l'image
    for t, g in ((0.05, .9), (0.5, .9), (1.0, 1.0)):                # les mots qui claquent
        add(fx, t, m.impact(), g * .7); add(fx, t, sub_drop(0.6), .45); add(fx, t, m.click(), .5)
    add(fx, 1.45, m.hit(), 0.6); add(fx, 1.55, m.whoosh(0.3), 0.5)  # le trait qui barre « sans site »
    add(fx, 1.2, m.riser(0.8), 0.5); add(fx, DROP - 0.5, reverse_swell(0.5), 0.5)
    add(fx, DROP, m.impact(), 0.9); add(fx, DROP, sub_drop(1.2), 0.6); add(fx, DROP, shimmer(1.2), 0.35)
    for d in (0, .12, .24): add(fx, DROP + d, pop(), 0.35)
    add(fx, 2.6, m.click(), .6); add(fx, 3.0, m.click(), .7); add(fx, 3.0, pop(), 0.4)
    for t in range(1, 10):                                          # un coup de balai à chaque changement de scène
        add(fx, t * 2 - 0.2, m.whoosh(0.35), 0.5); add(fx, t * 2 - 0.02, m.hit(), 0.5)
    add(fx, 4.0, m.whoosh(0.6), 0.5); add(fx, 4.9, shimmer(0.6), 0.2)
    for t in (4.6, 4.85, 5.1): add(fx, t, pop(), 0.6); add(fx, t, blip(1800 + int(t * 100)), 0.15)
    for t in (6.1, 6.35, 6.6): add(fx, t, m.click(), 0.8); add(fx, t, sub_drop(0.4), 0.4)
    add(fx, 6.0, m.riser(0.9), 0.35)
    for i in range(12): add(fx, 8.12 + i * 0.1, pop(), 0.28 + 0.02 * i); add(fx, 8.12 + i * 0.1, blip(1200 + i * 130), 0.1)
    add(fx, 8.0, m.click(), 0.8); add(fx, 8.0, sub_drop(0.5), 0.4)
    add(fx, 10.1, m.click(), 0.7); add(fx, 10.5, m.click(), 0.7)
    for i in range(16): add(fx, 10.6 + i * 0.08, pop(), 0.15)       # les cœurs
    tt, gap = 10.45, 0.012
    while tt < 11.55: add(fx, tt, m.click(), 0.3); tt += gap; gap *= 1.04
    add(fx, 11.6, blip(2400), 0.3)
    add(fx, 12.0, m.riser(0.25), 0.3); add(fx, 12.1, m.click(), 0.8)
    add(fx, 12.25, m.impact(), 0.85); add(fx, 12.25, sub_drop(1.0), 0.55)
    tt, gap = 12.25, 0.014                                           # le compteur du prix
    while tt < 13.2: add(fx, tt, m.click(), 0.35); tt += gap; gap *= 1.05
    add(fx, 13.3, m.impact(), 0.8); add(fx, 13.3, m.ding(), 0.5); add(fx, 13.3, shimmer(1.2), 0.35)
    for t in (13.3, 13.5, 13.7): add(fx, t, pop(), 0.55)
    add(fx, 14.0, m.riser(1.3), 0.5); add(fx, 14.25, m.click(), 0.8)
    add(fx, 14.1, m.whoosh(1.3), 0.3)                                # le cercle qui se remplit
    add(fx, 15.4, m.ding(), 0.6); add(fx, 15.4, shimmer(1.0), 0.4); add(fx, 15.45, m.click(), 0.8)
    for t in (16.0, 16.15, 16.6, 17.05): add(fx, t, m.click(), 0.6)
    for t in (16.15, 16.6, 17.05): add(fx, t, m.hit(), 0.55); add(fx, t, pop(), 0.5); add(fx, t + 0.4, blip(2000), 0.15)
    add(fx, 17.5, reverse_swell(0.5), 0.5)
    add(fx, END, m.impact(), 0.95); add(fx, END, sub_drop(1.4), 0.6); add(fx, END, shimmer(1.6), 0.45)
    add(fx, 18.3, m.click(), 0.7); add(fx, 18.55, m.click(), 0.5)
    add(fx, 18.7, pop(), 0.7); add(fx, 18.7, m.ding(), 0.4)
    for t in (19.0, 19.5): add(fx, t, blip(2200), 0.12)

    # respiration de la nappe sur la grosse caisse + silence juste avant les drops
    duck = np.ones(L); dl = n(0.16); shape = 1 - 0.5 * np.exp(-np.arange(dl) / SR / 0.05)
    for e in range(int(END / E)):
        t = e * E
        if full(t) and e % 2 == 0:
            j = n(t); duck[j:j + dl] = np.minimum(duck[j:j + dl], shape[: len(duck[j:j + dl])])
    keys *= duck; lead *= 0.65 + 0.35 * duck
    gap = np.ones(L)
    for a in (DROP, BACK): gap[n(a - 0.08): n(a)] = 0.05
    music = (drums + bass * 0.9 + reverb(keys, 2.4, 0.35) + reverb(lead, 1.8, 0.3)) * gap
    fx = reverb(fx, 0.8, 0.14)
    music /= np.max(np.abs(music)) + 1e-9; fx /= np.max(np.abs(fx)) + 1e-9
    mix = music * 0.72 + fx * 0.55
    side = reverb(keys + lead, 1.1, 0.0) * 0.06
    st = np.stack([mix + np.roll(side, n(0.011)), mix - np.roll(side, n(0.017))], 1)[: n(DUR)]
    fo = n(0.7); st[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.5
    st[: n(0.02)] *= np.linspace(0, 1, n(0.02))[:, None]
    st = np.tanh(st / np.max(np.abs(st)) * 1.25)
    return st / np.max(np.abs(st)) * 0.9

if __name__ == "__main__":
    save(build(), sys.argv[1]); print("ok", sys.argv[1])
