import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import wideMp4 from '@/assets/formats/youtube-wide.mp4';
import widePoster from '@/assets/formats/youtube-wide.webp';
import verticalMp4 from '@/assets/formats/youtube-vertical.mp4';
import verticalPoster from '@/assets/formats/youtube-vertical.webp';
import squareMp4 from '@/assets/formats/instagram-square.mp4';
import squarePoster from '@/assets/formats/instagram-square.webp';

/**
 * One release ("Row A Boat") cut for three platforms. The clips are 15 s
 * web previews; the delivered files are the full-length masters listed in `spec`.
 *
 * Cards sit at equal height because each grid column's fr share equals its
 * aspect ratio (16/9 : 9/16 : 1 = 256 : 81 : 144). On phones the wide video
 * takes its own row and the other two share the next one.
 */
const formats = [
  {
    id: 'wide',
    src: wideMp4,
    poster: widePoster,
    ratio: 16 / 9,
    platform: 'YouTube',
    use: 'Music video or visualizer upload',
    spec: '16:9 · 3840×2160 (4K)',
  },
  {
    id: 'vertical',
    src: verticalMp4,
    poster: verticalPoster,
    ratio: 9 / 16,
    platform: 'Shorts, Reels & TikTok',
    use: 'Full-screen vertical on phones',
    spec: '9:16 · 1080×1920',
  },
  {
    id: 'square',
    src: squareMp4,
    poster: squarePoster,
    ratio: 1,
    platform: 'Instagram feed',
    use: 'Square post in the grid and feed',
    spec: '1:1 · 2160×2160',
  },
] as const;

type Format = (typeof formats)[number];

function FormatVideo({
  format,
  unmuted,
  onToggleSound,
}: {
  format: Format;
  unmuted: boolean;
  onToggleSound: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // Only play while on screen, so three videos don't download and decode for nothing
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.muted = !unmuted;
  }, [unmuted]);

  return (
    <figure className="flex flex-col">
      <div
        className="relative overflow-hidden bg-[#111] border border-white/5"
        style={{ aspectRatio: String(format.ratio) }}
      >
        <video
          ref={ref}
          src={format.src}
          poster={format.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={`${format.platform} version, ${format.spec}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={unmuted ? 'Mute' : 'Play with sound'}
          aria-pressed={unmuted}
          className="absolute bottom-3 right-3 p-2 bg-black/60 backdrop-blur-sm text-white/80 hover:text-white transition-colors"
        >
          {unmuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
      <figcaption className="mt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <span className="font-display font-medium">{format.platform}</span>
          <span className="text-xs text-[#6da2ff] tracking-wide whitespace-nowrap">
            {format.spec}
          </span>
        </div>
        <p className="mt-1 text-muted text-sm font-light">{format.use}</p>
      </figcaption>
    </figure>
  );
}

export default function FormatShowcase() {
  const [unmutedId, setUnmutedId] = useState<string | null>(null);
  const [wide, vertical, square] = formats;

  const card = (format: Format) => (
    <FormatVideo
      format={format}
      unmuted={unmutedId === format.id}
      onToggleSound={() => setUnmutedId((id) => (id === format.id ? null : format.id))}
    />
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-3">
          One release, every format
        </h2>
        <p className="text-muted font-light max-w-2xl mb-12">
          The lyric video for "Row A Boat", framed three ways. Each platform crops
          differently, so every version is laid out for its own screen instead of
          being cut down from one file.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid items-start gap-x-4 gap-y-10 md:gap-x-6 grid-cols-[minmax(0,81fr)_minmax(0,144fr)] lg:grid-cols-[minmax(0,256fr)_minmax(0,81fr)_minmax(0,144fr)]"
      >
        <div className="col-span-2 lg:col-span-1">{card(wide)}</div>
        <div>{card(vertical)}</div>
        <div>{card(square)}</div>
      </motion.div>
    </section>
  );
}
