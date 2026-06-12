import { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '@/lib/gallery';

interface LightboxProps {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Fullscreen gallery viewer.
 * Navigation: arrow buttons, ← / → keys, swipe on touch screens, Esc to close.
 * Adjacent images are preloaded so browsing hundreds of pieces feels instant.
 */
export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;
  const touchStartX = useRef<number | null>(null);
  const directionRef = useRef(0);

  const goTo = useCallback(
    (next: number) => {
      if (items.length === 0) return;
      directionRef.current = next > (index ?? 0) ? 1 : -1;
      onNavigate((next + items.length) % items.length);
    },
    [items.length, index, onNavigate]
  );

  const goPrev = useCallback(() => goTo((index ?? 0) - 1), [goTo, index]);
  const goNext = useCallback(() => goTo((index ?? 0) + 1), [goTo, index]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, goPrev, goNext]);

  // Lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Preload neighbours so next/prev feels instant
  useEffect(() => {
    if (index === null || items.length < 2) return;
    [index - 1, index + 1].forEach((i) => {
      const item = items[(i + items.length) % items.length];
      if (item.type === 'image') {
        const img = new Image();
        img.src = item.url;
      }
    });
  }, [index, items]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center select-none"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          {/* Counter */}
          <div className="absolute top-5 left-6 text-sm text-white/50 font-display tracking-widest z-10">
            {index! + 1} / {items.length}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute top-4 right-4 z-10 p-3 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Prev / Next */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous"
                className="absolute left-0 top-0 bottom-0 z-10 px-3 md:px-5 flex items-center text-white/50 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-9 h-9" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next"
                className="absolute right-0 top-0 bottom-0 z-10 px-3 md:px-5 flex items-center text-white/50 hover:text-white transition-colors"
              >
                <ChevronRight className="w-9 h-9" />
              </button>
            </>
          )}

          {/* Media */}
          <div
            className="w-full h-full flex items-center justify-center px-14 md:px-24 py-16"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const delta = e.changedTouches[0].clientX - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(delta) > 50) (delta < 0 ? goNext : goPrev)();
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: directionRef.current * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: directionRef.current * -40 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    draggable={false}
                    className="max-w-full max-h-[82vh] object-contain"
                  />
                ) : (
                  <video
                    src={item.url}
                    poster={item.poster}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="max-w-full max-h-[82vh]"
                  />
                )}
                <div className="mt-4 text-center text-white/60 font-display tracking-wide text-sm">
                  {item.title}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
