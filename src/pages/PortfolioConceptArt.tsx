import MediaGrid from '@/components/MediaGrid';
import { motion } from 'motion/react';

const mockImages = Array.from({ length: 16 }).map((_, i) => ({
  id: `slike-${i}`,
  url: `https://picsum.photos/seed/monti-slika${i}/800/800`,
  title: `Image ${i + 1}`,
  type: 'image' as const
}));

export default function PortfolioImages() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-6 mb-12 pt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tighter mb-4">
            Concept Art
          </h1>
          <p className="text-muted text-lg font-light max-w-2xl">
            A collection of digital paintings, 3D renders, and graphic design. Every piece carries its own story and unique aesthetic.
          </p>
        </motion.div>
      </div>
      
      <div className="w-full">
        <MediaGrid items={mockImages} />
      </div>
    </div>
  );
}
