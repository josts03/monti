import { motion } from 'motion/react';
import Seo from '@/components/Seo';
import { PrimaryLink, GhostLink } from '@/components/Buttons';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <Seo title="Page Not Found" description="This page doesn't exist." noIndex />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-[#6da2ff] font-display text-8xl md:text-9xl font-medium mb-6">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-medium tracking-tight mb-4">
          This page doesn't exist.
        </h1>
        <p className="text-muted font-light max-w-md mx-auto mb-10">
          Your next cover could, though. Have a look at the work or head back home.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <PrimaryLink to="/concept-art">See the work</PrimaryLink>
          <GhostLink to="/">Back home</GhostLink>
        </div>
      </motion.div>
    </div>
  );
}
