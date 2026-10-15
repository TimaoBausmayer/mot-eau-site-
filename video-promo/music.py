# Musique originale (synthétisée, libre de droits) — 120 BPM, 24 s, une mesure = 2 s = une scène.
import numpy as np, wave, sys
SR = 44100; BPM = 120; BEAT = 60 / BPM; BAR = 4 * BEAT; DUR = 24.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
L = np.zeros(N); R = np.zeros(N)

def add(sig, t0, gain=1.0, pan=0.0):
    i = int(t0 * SR)
    if i >= N: return
    s = sig[: N - i] * gain
    L[i:i + len(s)] += s * (1 - max(0, pan)); R[i:i + len(s)] += s * (1 + min(0, pan))

def env(n, a, d, sustain=0.0):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)
    return e * (1 - sustain) + sustain
def onepole_lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); z = 0.0
    for i in range(len(x)): z = (1 - a) * x[i] + a * z; y[i] = z
    return y
def saw(f, n, harm=24):
    t = np.arange(n) / SR; s = np.zeros(n)
    for k in range(1, harm + 1):
        if f * k > SR / 2.2: break
        s += np.sin(2 * np.pi * f * k * t) / k
    return s * 0.6
note = lambda m: 440 * 2 ** ((m - 69) / 12)

def kick():
    n = int(0.45 * SR); t = np.arange(n) / SR
    f = 45 + 110 * np.exp(-t / 0.035); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.16) + 0.25 * rng.standard_normal(n) * np.exp(-t / 0.004)
def clap():
    n = int(0.25 * SR); t = np.arange(n) / SR; nz = rng.standard_normal(n)
    bp = onepole_lp(nz, 3500) - onepole_lp(nz, 900)
    e = sum(np.exp(-np.maximum(0, t - d) / 0.012) * (t >= d) for d in (0, 0.011, 0.022)) + 0.6 * np.exp(-np.maximum(0, t - 0.03) / 0.09) * (t >= 0.03)
    return bp * e * 1.6
def hat(open_=False):
    n = int((0.25 if open_ else 0.06) * SR); t = np.arange(n) / SR; nz = rng.standard_normal(n)
    return (nz - onepole_lp(nz, 7000)) * np.exp(-t / (0.08 if open_ else 0.018)) * 0.5
def impact():
    n = int(1.4 * SR); t = np.arange(n) / SR
    boom = np.sin(2 * np.pi * (38 + 40 * np.exp(-t / 0.08)) * t) * np.exp(-t / 0.5)
    nz = onepole_lp(rng.standard_normal(n), 2500) * np.exp(-t / 0.18) * 0.5
    return boom + nz
def whoosh(dur=0.5):
    n = int(dur * SR); t = np.arange(n) / SR; nz = rng.standard_normal(n)
    out = np.zeros(n); seg = 512
    for i in range(0, n, seg):
        fc = 300 + 7000 * (i / n) ** 2
        out[i:i + seg] = onepole_lp(nz[i:i + seg], fc)
    return out * (t / dur) ** 2 * 0.9
def riser(dur):
    n = int(dur * SR); t = np.arange(n) / SR
    f = 200 * 2 ** (3 * t / dur); ph = 2 * np.pi * np.cumsum(f) / SR
    return (np.sin(ph) * 0.3 + whoosh(dur) * 0.6) * (t / dur) ** 1.5
def bell(f=1568):
    n = int(1.6 * SR); t = np.arange(n) / SR
    return sum(a * np.sin(2 * np.pi * f * m * t) * np.exp(-t / d) for m, a, d in ((1, 1, .9), (2.76, .45, .35), (5.4, .25, .18), (8.9, .12, .08))) * 0.35
def pluck(freqs, dur=0.42):
    n = int(dur * SR); s = np.zeros(n)
    for f in freqs:
        for det in (-0.08, 0, 0.08):
            s += saw(f * 2 ** (det / 12), n, 16)
    s = onepole_lp(s, 2600) * env(n, 0.004, 0.16)
    return s / len(freqs) * 0.55
def pad(freqs, dur):
    n = int(dur * SR); s = np.zeros(n)
    for f in freqs:
        for det in (-0.12, 0.12):
            s += saw(f * 2 ** (det / 12), n, 10)
    a = np.minimum(1, np.arange(n) / (0.35 * SR)); r = np.minimum(1, (n - np.arange(n)) / (0.4 * SR))
    return onepole_lp(s, 1200) * a * r / len(freqs) * 0.5
def bassnote(f, dur):
    n = int(dur * SR); s = saw(f, n, 12) + 0.6 * np.sin(2 * np.pi * f / 2 * np.arange(n) / SR)
    return onepole_lp(s, 520) * env(n, 0.003, 0.14, 0.15) * 0.75

# Progression par mesure (12 mesures) : Am F C G | Am F C G | Am F | C(G) final
prog = [(57, [69, 72, 76]), (53, [69, 72, 77]), (48, [67, 72, 76]), (55, [67, 71, 74])] * 3
KICK = kick(); CLAP = clap(); HAT = hat(); OHAT = hat(True); IMP = impact(); BELL = bell()
breakdown = {5}               # mesure 6 (10–12 s) : « Et ça coûte COMBIEN ? »
for bar in range(12):
    t0 = bar * BAR; root, chord = prog[bar]
    final = bar >= 10
    if bar in breakdown:
        add(pad([note(m) for m in chord], BAR), t0, 0.9)
        add(riser(BAR * 0.95), t0 + BAR * 0.05, 0.55)
        add(KICK, t0, 0.8)
        continue
    if bar == 11:
        add(pad([note(m) for m in [72, 76, 79]], BAR), t0, 0.8)   # résolution sur Do majeur
        continue
    for b in range(4):
        tb = t0 + b * BEAT
        add(KICK, tb, 1.0)
        if b in (1, 3): add(CLAP, tb, 0.55, 0.1)
        add(HAT, tb + BEAT / 2, 0.35, -0.3)
        add(HAT, tb + BEAT / 4 * 3, 0.15, 0.3)
        # basse en croches (pas sur le temps, effet « pompe » avec le kick)
        add(bassnote(note(root - 12), BEAT / 2), tb + BEAT / 2, 0.8)
    if bar % 2 == 1: add(OHAT, t0 + 3.5 * BEAT, 0.28)
    # accords pincés en rythme syncopé
    for off in (0, 0.75, 1.5, 2.5, 3.0):
        add(pluck([note(m) for m in chord]), t0 + off * BEAT, 0.7 if not final else 0.9, -0.15 if off % 1 else 0.15)
    if final: add(pad([note(m) for m in chord], BAR), t0, 0.5)

# Impacts à chaque changement de scène + whoosh juste avant
for bar in range(1, 12):
    t = bar * BAR
    add(whoosh(0.45), t - 0.45, 0.35 if bar not in (6,) else 0.0)
    add(IMP, t, 0.55 if bar in (1, 6, 10) else 0.28)
# Sons de « brillance » : impeccable (≈3 s), c'est impeccable (≈9,4 s), logo (≈20,3 s)
for t, f in ((2.9, 1568), (3.15, 2093), (9.35, 1760), (9.6, 2349), (20.25, 1568), (20.5, 2093), (20.75, 2637)):
    add(bell(f), t, 0.5, 0.25 if f > 2000 else -0.25)

# « Sidechain » : la musique respire avec le kick (sauf kick/impacts déjà mixés : approximation globale)
duck = np.ones(N)
for bar in range(11):
    if bar in breakdown: continue
    for b in range(4):
        i = int((bar * BAR + b * BEAT) * SR); n = int(0.22 * SR); t = np.arange(n) / SR
        duck[i:i + n] = np.minimum(duck[i:i + n], 1 - 0.35 * np.exp(-t / 0.08))
L *= duck; R *= duck
mix = np.stack([L, R], 1)
mix = np.tanh(mix * 1.2) / np.tanh(1.2)                        # saturation douce
fade = np.ones(N); fn = int(1.2 * SR); fade[-fn:] = np.linspace(1, 0, fn) ** 1.5
mix *= fade[:, None]
mix /= np.max(np.abs(mix)) / 0.89                              # ≈ -1 dBFS
out = sys.argv[1] if len(sys.argv) > 1 else 'music.wav'
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
print('ok', out, DUR, 's')
