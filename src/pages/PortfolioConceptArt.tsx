import { motion } from 'motion/react';
import MediaGrid from '@/components/MediaGrid';
import Seo from '@/components/Seo';
import { PrimaryLink } from '@/components/Buttons';
import { conceptArtItems } from '@/lib/gallery';

export default function PortfolioConceptArt() {
  return (
    <div className="w-full">
      <Seo
        title="Concept Art"
        description="Cover art concepts, digital paintings and 3D renders by Monti. Browse the full gallery — then get artwork built for your own release."
      />

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
            Digital paintings, 3D renders and cover concepts. Every piece started as
            someone's brief — click any of them to view the gallery full screen.
          </p>
        </motion.div>
      </div>

      <MediaGrid items={conceptArtItems} />

      {/* CTA after the proof */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight mb-4">
            Want something like this on your next release?
          </h2>
          <p className="text-muted font-light max-w-xl mx-auto mb-8">
            Covers start at €150 and every project includes up to 3 revision rounds.
          </p>
          <PrimaryLink to="/contact">Start your project</PrimaryLink>
        </motion.div>
      </div>
    </div>
  );
}
