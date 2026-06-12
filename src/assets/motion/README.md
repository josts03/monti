# Motion art videos go here

Drop your video loops into this folder and they appear on the Motion Art page
automatically — no code changes.

- Allowed formats: `.mp4` (best), `.webm`
- The filename becomes the title: `fire-canvas.mp4` → "Fire Canvas"
- Files are sorted by name — prefix with numbers to control order.
- Optional poster/thumbnail: add an image with the SAME filename,
  e.g. `fire-canvas.mp4` + `fire-canvas.jpg`. The image is shown in the
  grid; the video plays in the fullscreen viewer.

## Export settings (important for site speed)

- Codec: **H.264 (AVC) + AAC audio, MP4 container** — plays everywhere
- Pixel format: `yuv420p` (otherwise some browsers show a black frame)
- Resolution: 1080p is plenty for the grid
- Keep loops short (3–15 s) and files small — ideally **under ~10 MB each**
- ffmpeg one-liner:
  `ffmpeg -i input.mov -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart -c:a aac out.mp4`
