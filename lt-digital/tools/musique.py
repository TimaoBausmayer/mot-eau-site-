"""Musique originale + bruitages pour les pubs L&T Digital (100 % créés ici, libres d'utilisation).

Usage : python3 tools/musique.py pub6 sortie.wav   (ou pub5)
Tempo 120 BPM, temps forts à 0,87 s + 0,5 s × n (comme les coupes des vidéos).
"""
import sys, wave
import numpy as np

SR = 44100
rng = np.random.default_rng(7)
BEAT = 0.5
OFF = 0.87

# ---------------------------------------------------------------- outils
def n(sec):
    return int(round(sec * SR))

def env_exp(length, decay):
    t = np.arange(length) / SR
    return np.exp(-t / decay)

def add(buf, start, sig, gain=1.0):
    i = n(start)
    if i >= len(buf) or i + len(sig) <= 0:
        return
    if i < 0:
        sig = sig[-i:]; i = 0
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i] * gain

def band(sig, lo, hi):
    """filtre passe-bande par FFT (segments courts)"""
    F = np.fft.rfft(sig)
    f = np.fft.rfftfreq(len(sig), 1 / SR)
    F[(f < lo) | (f > hi)] = 0
    return np.fft.irfft(F, len(sig))

def noise(sec):
    return rng.standard_normal(n(sec))

def hz(note):
    return 440.0 * 2 ** ((note - 69) / 12)

# ---------------------------------------------------------------- instruments
def kick():
    L = n(0.45); t = np.arange(L) / SR
    f = 45 + 95 * np.exp(-t / 0.045)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * env_exp(L, 0.22)
    s[: n(0.004)] += band(noise(0.004), 2000, 9000) * 0.6
    return np.tanh(s * 1.6)

def snare():
    L = n(0.28)
    body = np.sin(2 * np.pi * 190 * np.arange(L) / SR) * env_exp(L, 0.05)
    nz = band(noise(0.28), 1200, 9000) * env_exp(L, 0.09)
    clap = np.zeros(L)
    for d in (0, 0.011, 0.022):
        k = n(d); clap[k:] += band(noise(0.28), 900, 5000)[: L - k] * env_exp(L - k, 0.02)
    return body * 0.5 + nz * 0.6 + clap * 0.5

def hat(open_=False):
    d = 0.16 if open_ else 0.035
    L = n(d + 0.05)
    return band(noise(d + 0.05), 7000, 16000) * env_exp(L, d / 2.2)

def pluck(freq, dec=0.16, length=0.35):
    L = n(length); t = np.arange(L) / SR
    s = np.sin(2 * np.pi * freq * t) + 0.35 * np.sin(4 * np.pi * freq * t) + 0.12 * np.sin(6 * np.pi * freq * t)
    return s * env_exp(L, dec) * np.minimum(1, t / 0.003)

def pad_voice(freq, length):
    L = n(length); t = np.arange(L) / SR
    s = np.zeros(L)
    for det in (-0.0035, 0.0035):
        f = freq * (1 + det)
        for k in range(1, 9):
            s += np.sin(2 * np.pi * f * k * t + k) / k * (0.85 ** k)
    a = np.minimum(1, t / 0.35); r = np.minimum(1, (length - t) / 0.4)
    return s * a * np.clip(r, 0, 1)

def sub(freq, length):
    L = n(length); t = np.arange(L) / SR
    s = np.sin(2 * np.pi * freq * t) + 0.25 * np.sin(4 * np.pi * freq * t)
    return s * np.minimum(1, t / 0.005) * np.exp(-t / (length * 0.9))

def impact():
    L = n(2.2); t = np.arange(L) / SR
    boom = np.sin(2 * np.pi * (38 + 60 * np.exp(-t / 0.08)) * t) * env_exp(L, 0.7)
    crash = band(noise(2.2), 2500, 14000) * env_exp(L, 0.45)
    return np.tanh(boom * 1.4) * 0.9 + crash * 0.35

def hit():
    L = n(0.6); t = np.arange(L) / SR
    s = np.sin(2 * np.pi * (60 + 140 * np.exp(-t / 0.03)) * t) * env_exp(L, 0.18)
    return np.tanh(s * 2) * 0.8 + band(noise(0.6), 800, 6000) * env_exp(L, 0.05) * 0.4

def riser(sec):
    L = n(sec); t = np.arange(L) / SR
    out = np.zeros(L); seg = n(0.05)
    nz = noise(sec)
    for i in range(0, L, seg):
        x = i / L
        lo = 300 + 5000 * x ** 2
        out[i:i + seg] = band(nz[i:i + seg], lo, lo * 2.5)
    tone = np.sin(2 * np.pi * np.cumsum(200 + 900 * (t / sec) ** 2) / SR)
    return (out * 0.8 + tone * 0.15) * (t / sec) ** 2

def whoosh(sec=0.45):
    L = n(sec); t = np.arange(L) / SR
    out = np.zeros(L); seg = n(0.03); nz = noise(sec)
    for i in range(0, L, seg):
        x = i / L
        c = 600 + 6000 * x
        out[i:i + seg] = band(nz[i:i + seg], c * 0.6, c * 1.6)
    return out * np.sin(np.pi * t / sec) ** 2

def click():
    return band(noise(0.02), 2500, 9000) * env_exp(n(0.02), 0.003) * 0.6

def shutter():
    s = np.zeros(n(0.25))
    s[: n(0.02)] += click() * 1.4
    k = n(0.07); s[k:k + n(0.02)] += click()
    s += band(noise(0.25), 1500, 8000) * env_exp(n(0.25), 0.03) * 0.3
    return s

def ding():
    L = n(0.9); t = np.arange(L) / SR
    return (np.sin(2 * np.pi * 1318.5 * t) + 0.6 * np.sin(2 * np.pi * 1975.5 * t)) * env_exp(L, 0.25) * 0.35

def tick():
    L = n(0.05); t = np.arange(L) / SR
    return np.sin(2 * np.pi * 2400 * t) * env_exp(L, 0.008) * 0.35

# ---------------------------------------------------------------- réglages par pub
CHORDS = [  # (basse, notes du pad) : la mineur – fa – do – sol
    (45, [57, 60, 64, 69]),
    (41, [53, 57, 60, 65]),
    (48, [55, 60, 64, 67]),
    (43, [55, 59, 62, 67]),
]

PUBS = {
    "pub6": dict(
        dur=90.0,
        cuts=[2.37, 5.37, 9.37, 11.37, 14.37, 17.37, 21.37, 24.37, 26.37, 30.37, 33.37, 37.37, 40.37, 43.37,
              47.37, 51.37, 54.37, 57.37, 61.37, 65.37, 69.37, 73.37, 75.37, 80.37],
        big=[2.37, 26.37, 51.37, 75.37, 80.37],          # gros impacts (avec montée avant)
        breaks=[(47.37, 51.37), (73.37, 75.37)],         # passages sans batterie
        end_drums=86.87,
        typing=[(0.25, 1.45, 32), (6.27, 7.37, 20)],
        clicks=[1.87],
        slams=[2.37, 2.87, 3.37, 3.87, 4.37, 26.87, 27.37, 27.87, 54.37, 54.87, 55.37, 73.37, 73.87, 74.37, 75.87],
        stamps=[11.87, 13.37],
        glitch=[12.32],
        shutters=[33.87, 34.37, 34.87],
        dings=[63.87, 76.87],
        counter=(14.97, 16.87, 16),
    ),
    "pub5": dict(
        dur=30.0,
        cuts=[2.37, 5.37, 8.37, 11.37, 13.37, 16.37, 19.37, 21.87, 24.37, 25.37],
        big=[2.37, 19.37, 25.37],
        breaks=[(24.37, 25.37)],
        end_drums=28.87,
        typing=[(0.25, 1.45, 32)],
        clicks=[1.87],
        slams=[19.37, 20.37, 20.87, 21.37, 22.37, 22.87, 23.37, 24.37, 24.7, 25.05],
        stamps=[8.87, 10.37],
        glitch=[9.3],
        shutters=[13.87, 14.37, 14.87],
        dings=[26.87],
        counter=(2.95, 4.85, 16),
    ),
}

# ---------------------------------------------------------------- nouveaux instruments (style doux)
def epiano(freq, length=1.6):
    """piano électrique chaleureux (FM douce + trémolo)"""
    L = n(length); t = np.arange(L) / SR
    I = 1.6 * np.exp(-t / 0.25)
    s = np.sin(2 * np.pi * freq * t + I * np.sin(2 * np.pi * freq * t))
    s += 0.18 * np.sin(2 * np.pi * 2 * freq * t) * np.exp(-t / 0.4)
    s *= np.exp(-t / 0.9) * np.minimum(1, t / 0.004) * (1 + 0.08 * np.sin(2 * np.pi * 5 * t))
    return s

def bell(freq, length=1.2):
    L = n(length); t = np.arange(L) / SR
    s = np.sin(2 * np.pi * freq * t + 1.2 * np.exp(-t / 0.15) * np.sin(2 * np.pi * 3.5 * freq * t))
    return s * np.exp(-t / 0.45) * np.minimum(1, t / 0.002)

def soft_kick():
    L = n(0.35); t = np.arange(L) / SR
    f = 48 + 70 * np.exp(-t / 0.03)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(L, 0.16)

def clap():
    L = n(0.35); s = np.zeros(L)
    for d in (0, 0.009, 0.018, 0.027):
        k = n(d); s[k:] += band(noise(0.35), 1000, 6000)[: L - k] * env_exp(L - k, 0.012 if d < .027 else 0.09)
    return s * 0.5

def shaker():
    L = n(0.06)
    return band(noise(0.06), 6000, 14000) * env_exp(L, 0.012) * np.minimum(1, np.arange(L) / SR / 0.008)

def warm_bass(freq, length):
    L = n(length); t = np.arange(L) / SR
    s = np.sin(2 * np.pi * freq * t) + 0.15 * np.sin(4 * np.pi * freq * t)
    return s * np.minimum(1, t / 0.01) * np.clip((length - t) / 0.05, 0, 1)

def reverb(x, sec=1.8, mix=0.25):
    ir = rng.standard_normal(n(sec)) * np.exp(-np.arange(n(sec)) / SR / (sec / 5))
    ir = band(ir, 200, 7000); ir /= np.sqrt(np.sum(ir ** 2))
    N = 1 << int(np.ceil(np.log2(len(x) + len(ir))))
    w = np.fft.irfft(np.fft.rfft(x, N) * np.fft.rfft(ir, N), N)[: len(x)]
    return x + w * mix

# accords « feel good » : Fa maj7 – Mi m7 – Ré m7 – Do maj7
CHORDS2 = [(41, [53, 57, 60, 64]), (40, [52, 55, 59, 62]), (38, [50, 53, 57, 60]), (36, [48, 52, 55, 59])]
HOOK = [76, 74, 72, 74, 76, 79, 76, 72]   # petite mélodie (cloche)

# ---------------------------------------------------------------- composition
def build(cfg):
    D = cfg["dur"]; L = n(D) + n(2.5)
    music = np.zeros(L); drums = np.zeros(L); fx = np.zeros(L)
    in_break = lambda t: any(a <= t < b for a, b in cfg["breaks"])
    K, C, SH = soft_kick(), clap(), shaker()

    # accords au piano : sur le 1 et en syncope (« et » du 2), une mesure = 2 s
    bar = 0; t = OFF - 2.0
    while t < D:
        root, notes = CHORDS2[bar % 4]
        for off, g in ((0.0, 1.0), (0.75, 0.7), (1.25, 0.55)):
            if 0 <= t + off < D - 1:
                for m in notes: add(music, t + off, epiano(hz(m)), 0.05 * g)
        if t + 2 > 2.37 and not in_break(t + 0.1) and t < cfg["end_drums"]:      # basse ronde
            for off, ln in ((0.0, 0.7), (0.75, 0.45), (1.25, 0.6)):
                if t + off >= 0: add(music, t + off, warm_bass(hz(root - 12), ln), 0.22)
        if bar % 2 == 1 and t > 4:                                                # mélodie toutes les 2 mesures
            for k, m in enumerate(HOOK):
                add(music, t + k * 0.25, bell(hz(m)), 0.045)
        t += 2.0; bar += 1

    # batterie légère
    i = 0
    while OFF + i * BEAT < D:
        t = OFF + i * BEAT
        if t >= 2.37 and not in_break(t) and t < cfg["end_drums"]:
            if i % 2 == 0 or i % 8 == 7: add(drums, t, K, 0.7)
            if i % 2 == 1: add(drums, t, C, 0.5)
            for k in range(4): add(drums, t + k * 0.125, SH, 0.12 if k % 2 else 0.07)
        i += 1
    music = reverb(music, 2.2, 0.3) + reverb(drums, 1.0, 0.12)

    # bruitages (devant)
    for c in cfg["cuts"]:
        add(fx, c - 0.42, whoosh(), 0.55)
        if c not in cfg["big"]: add(fx, c, hit(), 0.55)
    for c in cfg["big"]:
        add(fx, c - 1.5, riser(1.5), 0.45)
        add(fx, c, impact(), 0.9)
    for a, b, k in cfg["typing"]:
        for x in np.linspace(a, b, k):
            add(fx, x + rng.uniform(-0.01, 0.01), click(), 0.9)
    for c in cfg["clicks"]: add(fx, c, click(), 1.0); add(fx, c, ding(), 0.9)
    for c in cfg["slams"]: add(fx, c, hit(), 0.7)
    for c in cfg["stamps"]: add(fx, c, hit(), 0.8); add(fx, c, band(noise(0.15), 200, 2000) * env_exp(n(0.15), 0.03), 0.6)
    for c in cfg["glitch"]:
        for k in range(6): add(fx, c + k * 0.05, band(noise(0.04), 300 + 900 * k, 4000 + 900 * k), 0.35)
    for c in cfg["shutters"]: add(fx, c, shutter(), 1.2)
    for c in cfg["dings"]: add(fx, c, ding(), 1.2)
    a, b, k = cfg["counter"]
    for x in np.linspace(a, b, k): add(fx, x, tick(), 1.4)
    fx = reverb(fx, 0.8, 0.12)

    # mixage : bruitages devant, musique en fond (~ -12 dB)
    music /= np.max(np.abs(music)) + 1e-9
    fx /= np.max(np.abs(fx)) + 1e-9
    mix = music * 0.24 + fx * 0.85
    left = mix + 0.08 * np.roll(music, n(0.012)); right = mix + 0.08 * np.roll(music, n(0.019))
    st = np.stack([left, right], 1)[: n(D)]
    fo = n(3.0); st[-fo:] *= np.linspace(1, 0, fo)[:, None]
    st[: n(0.05)] *= np.linspace(0, 1, n(0.05))[:, None]
    st = np.tanh(st / np.max(np.abs(st)) * 1.1)
    return st / np.max(np.abs(st)) * 0.89

def save(st, path):
    data = (st * 32767).astype(np.int16)
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes())

if __name__ == "__main__":
    name, out = sys.argv[1], sys.argv[2]
    save(build(PUBS[name]), out)
    print("ok", out)
