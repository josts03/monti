import { useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import Lightbox from './Lightbox';
import type { GalleryItem } from '@/lib/gallery';

/**
 * Edge-to-edge media grid. Click any item to open the fullscreen
 * Lightbox gallery. Built for large collections: images lazy-load
 * and animate in only when scrolled into view.
 */
export default function MediaGrid({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 w-full mt-4">
        {items.map((item, i) => (
          <MediaCard key={item.id} item={item} index={i} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>
      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}

function MediaCard({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${item.title}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '120px' }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
      className="relative aspect-square overflow-hidden bg-[#111] group cursor-pointer text-left"
    >
      {item.type === 'image' ? (
        <img
          src={item.url}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full relative">
          {item.poster ? (
            <img
              src={item.poster}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <video
              src={item.url}
              muted
              loop
              playsInline
              preload="metadata"
              className="object-cover w-full h-full"
              onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
              onMouseLeave={(e) => e.currentTarget.pause()}
            />
          )}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/10 pointer-events-none">
            <div className="w-14 h-14 rounded-full border border-white/60 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
        <div className="p-6 text-white w-full">
          <h3 className="font-display font-medium text-lg tracking-wide">{item.title}</h3>
        </div>
      </div>
    </motion.button>
  );
}
