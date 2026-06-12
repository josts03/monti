import MediaGrid from '@/components/MediaGrid';
import { motion } from 'motion/react';

const mockAnimations = Array.from({ length: 12 }).map((_, i) => ({
  id: `animacije-${i}`,
  url: `https://picsum.photos/seed/monti-animacija${i}/800/800`,
  title: `Animation ${i + 1}`,
  type: 'video' as const
}));

export default function PortfolioAnimations() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-6 mb-12 pt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tighter mb-4">
            Motion Art
          </h1>
          <p className="text-muted text-lg font-light max-w-2xl">
            Motion pictures and motion graphics. Exploring form, rhythm, and space through 3D and 2D animation.
          </p>
        </motion.div>
      </div>
      
      <div className="w-full">
        <MediaGrid items={mockAnimations} />
      </div>
    </div>
  );
}
