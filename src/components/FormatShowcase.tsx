import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import coverImg from '@/assets/concept-art/ROWABOAT.webp';
import wideMp4 from '@/assets/formats/youtube-wide.mp4';
import widePoster from '@/assets/formats/youtube-wide.webp';
import verticalMp4 from '@/assets/formats/youtube-vertical.mp4';
import verticalPoster from '@/assets/formats/youtube-vertical.webp';
import squareMp4 from '@/assets/formats/instagram-square.mp4';
import squarePoster from '@/assets/formats/instagram-square.webp';

/**
 * One client's full release ("Row A Boat"): the cover plus the lyric video
 * cut for three platforms. The clips are 15 s web previews; the delivered
 * files are the full-length masters listed in `spec`.
 *
 * On desktop all four cards sit at equal height because each grid column's
 * fr share equals its aspect ratio (1 : 16/9 : 9/16 : 1 = 144 : 256 : 81 : 144).
 * On phones the cover and the wide video each take a full row and the other
 * two share the last one.
 */
interface Piece {
  id: string;
  kind: 'image' | 'video';
  src: string;
  poster?: string;
  ratio: number;
  platform: string;
  use: string;
  spec: string;
}

const cover: Piece = {
  id: 'cover',
  kind: 'image',
  src: coverImg,
  ratio: 1,
  platform: 'Cover art',
  use: 'Spotify, Apple Music, socials and print',
  spec: '1:1 · 4000×4000',
};

const videos: Piece[] = [
  {
    id: 'wide',
    kind: 'video',
    src: wideMp4,
    poster: widePoster,
    ratio: 16 / 9,
    platform: 'YouTube',
    use: 'Music video or visualizer upload',
    spec: '16:9 · 3840×2160 (4K)',
  },
  {
    id: 'vertical',
    kind: 'video',
    src: verticalMp4,
    poster: verticalPoster,
    ratio: 9 / 16,
    platform: 'Shorts, Reels & TikTok',
    use: 'Full-screen vertical on phones',
    spec: '9:16 · 1080×1920',
  },
  {
    id: 'square',
    kind: 'video',
    src: squareMp4,
    poster: squarePoster,
    ratio: 1,
    platform: 'Instagram feed',
    use: 'Square post in the grid and feed',
    spec: '1:1 · 2160×2160',
  },
];

function Caption({ piece }: { piece: Piece }) {
  return (
    <figcaption className="mt-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="font-display font-medium">{piece.platform}</span>
        <span className="text-xs text-[#6da2ff] tracking-wide whitespace-nowrap">
          {piece.spec}
        </span>
      </div>
      <p className="mt-1 text-muted text-sm font-light">{piece.use}</p>
    </figcaption>
  );
}

function CoverCard({ piece }: { piece: Piece }) {
  return (
    <figure className="flex flex-col">
      <div
        className="relative overflow-hidden bg-[#111] border border-white/5"
        style={{ aspectRatio: String(piece.ratio) }}
      >
        <img
          src={piece.src}
          alt='"Row A Boat" cover art'
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <Caption piece={piece} />
    </figure>
  );
}

function VideoCard({
  piece,
  unmuted,
  onToggleSound,
}: {
  piece: Piece;
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
        style={{ aspectRatio: String(piece.ratio) }}
      >
        <video
          ref={ref}
          src={piece.src}
          poster={piece.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={`${piece.platform} version, ${piece.spec}`}
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
      <Caption piece={piece} />
    </figure>
  );
}

export default function FormatShowcase() {
  const [unmutedId, setUnmutedId] = useState<string | null>(null);
  const [wide, vertical, square] = videos;

  const video = (piece: Piece) => (
    <VideoCard
      piece={piece}
      unmuted={unmutedId === piece.id}
      onToggleSound={() => setUnmutedId((id) => (id === piece.id ? null : piece.id))}
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
          Everything made for one client's single, "Row A Boat": the cover, plus the
          lyric video framed three ways. Each platform crops differently, so every
          version is laid out for its own screen instead of being cut down from one file.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid items-start gap-x-4 gap-y-10 md:gap-x-6 grid-cols-[minmax(0,81fr)_minmax(0,144fr)] lg:grid-cols-[minmax(0,144fr)_minmax(0,256fr)_minmax(0,81fr)_minmax(0,144fr)]"
      >
        <div className="col-span-2 lg:col-span-1">
          <CoverCard piece={cover} />
        </div>
        <div className="col-span-2 lg:col-span-1">{video(wide)}</div>
        <div>{video(vertical)}</div>
        <div>{video(square)}</div>
      </motion.div>
    </section>
  );
}
