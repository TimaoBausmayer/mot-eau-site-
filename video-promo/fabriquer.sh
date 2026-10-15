#!/usr/bin/env bash
# Refabrique la vidéo : musique + 720 images + montage final (environ 3 minutes).
# Prérequis : python3 + numpy, node + playwright (Chromium), ffmpeg.
set -e
cd "$(dirname "$0")"
python3 music.py music.wav
node render.js full
ffmpeg -loglevel error -y -framerate 30 -i frames/%04d.jpg -i music.wav -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -profile:v high -level 4.2 -r 30 \
  -c:a aac -b:a 192k -movflags +faststart -shortest A-Proclean-reel.mp4
ffmpeg -loglevel error -y -framerate 30 -i frames/%04d.jpg -c:v libx264 -preset slow -crf 18 \
  -pix_fmt yuv420p -r 30 -movflags +faststart A-Proclean-reel-sans-musique.mp4
rm -rf frames preview music.wav
echo "OK : A-Proclean-reel.mp4 et A-Proclean-reel-sans-musique.mp4"
