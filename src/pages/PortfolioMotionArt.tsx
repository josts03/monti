import { motion } from 'motion/react';
import MediaGrid from '@/components/MediaGrid';
import Seo from '@/components/Seo';
import { PrimaryLink } from '@/components/Buttons';
import { motionItems } from '@/lib/gallery';

export default function PortfolioMotionArt() {
  return (
    <div className="w-full">
      <Seo
        title="Motion Art"
        description="Spotify Canvas loops and visualizers by Monti — built to loop clean and keep eyes on your release while it plays."
      />

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
            Spotify Canvas loops and visualizers. A static cover gets the
            click — motion keeps people on your track. Click any piece to play it.
          </p>
        </motion.div>
      </div>

      <MediaGrid items={motionItems} />

      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight mb-4">
            Your track deserves to move.
          </h2>
          <p className="text-muted font-light max-w-xl mx-auto mb-8">
            Spotify Canvas and visualizer loops start at €300, delivered in 1080p or 4K.
          </p>
          <PrimaryLink to="/contact">Start your project</PrimaryLink>
        </motion.div>
      </div>
    </div>
  );
}
