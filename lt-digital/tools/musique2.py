"""Musique originale « trap cinématique » (90 BPM, ré mineur) + bruitages pour la pub n°7 L&T Digital.
Créée de zéro (aucun extrait d'une autre musique) : libre d'utilisation.

Usage : python3 tools/musique2.py sortie.wav
Grille : 90 BPM → 1 temps = 0,667 s, 1 mesure = 2,667 s. Drop à 8,0 s, pause 18,67 → 22,67 s, final 29,33 s.
"""
import sys, os
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
import musique as m
from musique import SR, n, add, band, noise, env_exp, hz, reverb, save

rng = np.random.default_rng(11)
E = 60 / 90 / 2          # une croche
BAR = 8 * E
DUR = 32.0
DROP, BRK, BACK, END = 8.0, 18.667, 22.667, 29.333
FX_ONLY = "--bruitages" in sys.argv

# ---------------------------------------------------------------- instruments
def kick():
    L = n(0.35); t = np.arange(L) / SR
    f = 52 + 160 * np.exp(-t / 0.025)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(L, 0.12)
    s[: n(0.003)] += band(noise(0.003), 2000, 9000) * 0.8
    return np.tanh(s * 2.2)

def b808(freq, length, glide_from=None):
    L = n(length); t = np.arange(L) / SR
    f = freq * (1 + 1.5 * np.exp(-t / 0.03))
    if glide_from:
        f = f * (glide_from / freq) ** np.exp(-t / 0.09)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR)
    s *= np.minimum(1, t / 0.003) * np.exp(-t / (length * 0.55)) * np.clip((length - t) / 0.03, 0, 1)
    return np.tanh(s * 2.6) * 0.8          # saturation : audible même sur téléphone

def clap():
    L = n(0.5); s = np.zeros(L)
    for d in (0, 0.008, 0.017, 0.026):
        k = n(d); s[k:] += band(noise(0.5), 900, 7000)[: L - k] * env_exp(L - k, 0.01 if d < .026 else 0.16)
    body = np.sin(2 * np.pi * 200 * np.arange(L) / SR) * env_exp(L, 0.03)
    return s * 0.55 + body * 0.25

def hat(dec=0.025):
    L = n(dec * 4 + 0.02)
    return band(noise(dec * 4 + 0.02), 7500, 17000) * env_exp(L, dec)

def pad_soft(freq, length, harm=6, att=0.6):
    L = n(length); t = np.arange(L) / SR
    s = np.zeros(L)
    for det in (-0.004, 0.0, 0.004):
        for k in range(1, harm + 1):
            s += np.sin(2 * np.pi * freq * (1 + det) * k * t + k * 1.7) / k * (0.7 ** k)
    return s * np.minimum(1, t / att) * np.clip((length - t) / 0.6, 0, 1)

def pluck(freq, length=0.6):
    L = n(length); t = np.arange(L) / SR
    s = np.zeros(L)
    for k in range(1, 12):
        s += np.sin(2 * np.pi * freq * k * t) / k * np.exp(-t * (4 + k * 3.0))
    return s * np.minimum(1, t / 0.002)

def bell(freq, length=1.4):
    L = n(length); t = np.arange(L) / SR
    s = np.sin(2 * np.pi * freq * t + 1.4 * np.exp(-t / 0.12) * np.sin(2 * np.pi * 3.5 * freq * t))
    return s * np.exp(-t / 0.5) * np.minimum(1, t / 0.002)

def reverse_swell(sec=1.2):
    L = n(sec)
    s = band(noise(sec), 400, 9000) * env_exp(L, sec / 4)
    s = m.reverb(s, 1.0, 0.6)[:L]
    return s[::-1] * 0.7

def sub_drop(sec=1.6):
    L = n(sec); t = np.arange(L) / SR
    f = 90 * np.exp(-t / 0.6) + 32
    return np.tanh(np.sin(2 * np.pi * np.cumsum(f) / SR) * 2) * env_exp(L, 0.6)

def blip(freq=1600):
    L = n(0.18); t = np.arange(L) / SR
    return (np.sin(2 * np.pi * freq * t) * 0.6 + np.sin(2 * np.pi * freq * 1.5 * t) * 0.25) * env_exp(L, 0.04)

def pop():
    L = n(0.12); t = np.arange(L) / SR
    f = 900 * np.exp(-t / 0.02) + 300
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(L, 0.03)

def shimmer(sec=1.5):
    s = np.zeros(n(sec))
    for k, f in enumerate([1760, 2217, 2637, 3520]):
        add(s, k * 0.05, bell(f, sec - k * 0.05), 0.25)
    return s

# ---------------------------------------------------------------- composition
#                 basse(808)  accord du pad (ré m add9, si♭ maj9, fa add9, do add9)
CHORDS = [(38, [50, 53, 57, 64]), (34, [46, 50, 53, 60]), (41, [53, 57, 60, 67]), (36, [48, 52, 55, 62])]
HOOK = [  # mélodie (croche par croche, None = silence), 4 mesures
    [69, None, 74, None, 77, 76, 74, None],
    [74, None, 77, None, 81, 79, 77, None],
    [72, None, 77, None, 81, 79, 77, 76],
    [76, None, 79, None, 72, None, 74, None],
]

def build():
    L = n(DUR) + n(3)
    drums = np.zeros(L); bass = np.zeros(L); keys = np.zeros(L); lead = np.zeros(L); fx = np.zeros(L)
    full = lambda t: (DROP <= t < BRK) or (BACK <= t < END)

    # pad sur toute la durée (doux dans l'intro et la pause)
    for b in range(int(DUR / BAR) + 1):
        t0 = b * BAR
        if t0 >= DUR: break
        root, notes = CHORDS[b % 4]
        soft = not full(t0 + 0.1)
        for mm in notes:
            add(keys, t0, pad_soft(hz(mm), BAR + 0.5, 4 if soft else 7, 0.9 if soft else 0.25), 0.05 if soft else 0.045)

    # intro : notes de cloche sur les mots, arpège léger
    for t, mm in ((0.15, 74), (0.87, 77), (1.53, 81), (2.0, 76)):
        add(lead, t, bell(hz(mm)), 0.12)
    for e in range(int(2.667 / E), int(DROP / E)):
        t = e * E; chord = CHORDS[int(t // BAR) % 4][1]
        add(lead, t, pluck(hz(chord[e % 4] + 12), 0.5), 0.05 + 0.04 * (t - 2.667) / 5.3)

    # partie rythmique (en croches)
    for e in range(int(DUR / E) + 1):
        t = e * E
        if t >= DUR: break
        b = int(t // BAR); k = e % 8; root, chord = CHORDS[b % 4]
        if full(t):
            if k in (0, 3, 6) or (k == 7 and b % 2):
                add(drums, t, kick(), 0.9)
                ln = {0: 3 * E, 3: 3 * E, 6: 2 * E, 7: E}[k]
                add(bass, t, b808(hz(root), ln + 0.02, glide_from=hz(root + 5) if (k == 6 and b % 2) else None), 0.8)
            if k == 4: add(drums, t, clap(), 0.75)
            if k == 7: add(drums, t, hat(0.09), 0.25)                      # charleston ouvert
            elif b % 2 == 1 and k >= 6:                                    # roulement de charleston
                for r in range(4): add(drums, t + r * E / 4, hat(0.012), 0.22)
            elif b % 4 == 2 and k == 5:                                    # triolets
                for r in range(3): add(drums, t + r * E / 3, hat(0.015), 0.22)
            else:
                add(drums, t, hat(), 0.3 if k % 2 == 0 else 0.2)
            note = HOOK[b % 4][k] if (t < BRK or t >= BACK) else None
            if note: add(lead, t, pluck(hz(note)), 0.13)
        elif 5.333 <= t < DROP:                                            # montée de l'intro
            add(drums, t, hat(0.015), 0.08 + 0.1 * (t - 5.333) / 2.7)
        elif BRK <= t < BACK:                                              # pause : cloches douces
            if k in (0, 3):
                add(lead, t, bell(hz(chord[(e // 3) % 4] + 12)), 0.06)

    # roulements de caisse claire avant le drop et le retour
    for a, bnd in ((7.333, DROP), (21.995, BACK)):
        steps = 16
        for i in range(steps):
            tt = a + (bnd - a) * (1 - (1 - i / steps) ** 1.4)
            add(drums, tt, clap() * 0.6, 0.15 + 0.4 * i / steps)

    # final : grosse note tenue
    add(bass, END, b808(hz(38), 2.6), 0.9); add(drums, END, kick(), 1.0)
    for mm in CHORDS[0][1]: add(keys, END, pad_soft(hz(mm), 2.6, 6, 0.05), 0.06)

    # ---------------- bruitages (calés sur l'image)
    for t in (0.15, 0.87, 1.53): add(fx, t, blip(1800), 0.25); add(fx, t - 0.12, m.whoosh(0.3), 0.12)
    add(fx, 1.9, m.whoosh(0.35), 0.2)
    add(fx, 2.667 - 1.2, reverse_swell(1.2), 0.5); add(fx, 2.667, sub_drop(1.4), 0.55)
    add(fx, 3.2, pop(), 0.6); add(fx, 3.55, m.whoosh(0.45), 0.5)
    add(fx, 4.0, m.hit(), 0.55)
    for t in (5.0, 5.667): add(fx, t - 0.1, m.whoosh(0.4), 0.55)
    add(fx, 6.333, m.hit(), 0.45)
    for t in (6.333, 6.667, 7.0, 7.333): add(fx, t, pop(), 0.45)
    add(fx, 6.0, m.riser(2.0), 0.4)
    add(fx, DROP, m.impact(), 0.95); add(fx, DROP, sub_drop(2.0), 0.6)
    add(fx, 8.3, m.whoosh(0.6), 0.3)
    add(fx, 10.55, m.whoosh(0.4), 0.5); add(fx, 10.667, pop(), 0.6)
    for i in range(34):
        add(fx, 10.9 + i * 0.045 + rng.uniform(-0.006, 0.006), m.click(), 0.55)
    add(fx, 12.55, m.whoosh(0.5), 0.55)
    for i in range(10): add(fx, 13.333 + i * 0.267, pop(), 0.4)
    for t in (16.0, 16.667, 17.333, 18.0): add(fx, t - 0.15, m.whoosh(0.3), 0.45); add(fx, t, m.hit(), 0.45)
    add(fx, BRK - 0.8, reverse_swell(0.8), 0.4)
    for t in (18.867, 19.2, 19.533, 20.2, 20.867): add(fx, t, blip(1500 + 120 * (t - 18.8)), 0.25)
    add(fx, 21.533, sub_drop(1.2), 0.45); add(fx, 21.533, shimmer(1.4), 0.35)
    add(fx, 21.333, m.riser(1.333), 0.4)
    add(fx, BACK, m.impact(), 0.95)
    add(fx, 23.333, pop(), 0.5)
    for t in (24.0, 24.667, 25.333, 26.0): add(fx, t, blip(2100), 0.22)
    add(fx, END - 1.3, m.riser(1.3), 0.35); add(fx, END, m.impact(), 1.0); add(fx, END, shimmer(2.0), 0.4)

    # « respiration » de la basse et du pad sur la grosse caisse + silence juste avant les drops
    duck = np.ones(L); dl = n(0.18); shape = 1 - 0.55 * np.exp(-np.arange(dl) / SR / 0.05)
    for e in range(int(DUR / E)):
        t = e * E
        if full(t) and e % 8 in (0, 3, 6):
            j = n(t); duck[j:j + dl] = np.minimum(duck[j:j + dl], shape[: len(duck[j:j + dl])])
    keys *= duck; lead *= 0.6 + 0.4 * duck
    gap = np.ones(L)
    for a in (DROP, BACK):
        gap[n(a - 0.12): n(a)] = 0.05
    music = (drums + bass * 0.9 + reverb(keys, 2.6, 0.35) + reverb(lead, 1.8, 0.3)) * gap
    fx = reverb(fx, 0.9, 0.15)

    music /= np.max(np.abs(music)) + 1e-9
    fx /= np.max(np.abs(fx)) + 1e-9
    mix = (music * 0.72 if not FX_ONLY else 0) + fx * 0.5
    side = reverb(keys + lead, 1.2, 0.0) * (0.06 if not FX_ONLY else 0)
    st = np.stack([mix + np.roll(side, n(0.011)), mix - np.roll(side, n(0.017))], 1)[: n(DUR)]
    fo = n(2.0); st[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.5
    st[: n(0.02)] *= np.linspace(0, 1, n(0.02))[:, None]
    st = np.tanh(st / np.max(np.abs(st)) * 1.25)
    return st / np.max(np.abs(st)) * 0.9

if __name__ == "__main__":
    save(build(), sys.argv[1]); print("ok", sys.argv[1])
