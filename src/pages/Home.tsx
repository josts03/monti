import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import { PrimaryLink, GhostLink } from '@/components/Buttons';
import { homeStripItems } from '@/lib/gallery';

const services = [
  {
    title: 'Cover Art',
    price: 'from €150',
    text: 'Single, EP or album artwork — delivered ready for Spotify, Apple Music, socials and print.',
  },
  {
    title: 'Motion & Canvas',
    price: 'from €300',
    text: 'Spotify Canvas loops (3–8 s) and visualizers that keep eyes on your release while it plays.',
  },
];

const steps = [
  {
    n: '01',
    title: 'Send the brief',
    text: 'The song, your references, the deadline. The form takes a few minutes — the more you give me, the better the first concept lands.',
  },
  {
    n: '02',
    title: 'We shape it',
    text: 'I design, you react. Up to 3 revision rounds are included on every project, so we stop when it’s right — not when the meter runs out.',
  },
  {
    n: '03',
    title: 'You release',
    text: 'You get high-res masters plus exports sized for every platform. Upload, announce, done.',
  },
];

const reasons = [
  {
    title: 'You talk to the person doing the work',
    text: 'No agency, no middleman. You brief me, I design, you get answers from the same hands that make the art.',
  },
  {
    title: 'Built for the platforms',
    text: 'Files arrive ready for streaming, socials and print — correct sizes, correct formats, no “can you resize this” the night before release.',
  },
  {
    title: 'Revisions are part of the deal',
    text: 'Up to 3 rounds included on every project. We iterate until the artwork matches the sound in your head.',
  },
];

export default function Home() {
  return (
    <div className="w-full">
      <Seo description="Cover art and Spotify Canvas loops for artists who want their release to look as serious as it sounds. Covers from €150, revisions included." />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-medium tracking-tight leading-[1.05] text-[#6da2ff]">
            People see your cover before they hear your song.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted font-light max-w-2xl leading-relaxed">
            I'm Monti. I design cover art and Spotify Canvas loops
            for artists who want their release to look as serious as it sounds.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryLink to="/contact">Start your project</PrimaryLink>
            <GhostLink to="/cover-art">See the work</GhostLink>
          </div>
          <p className="mt-6 text-sm text-white/40 tracking-wide">
            Direct line to the designer · Revisions included · Files ready for every platform
          </p>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="w-full overflow-hidden border-y border-white/5 py-4 bg-transparent">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ ease: 'linear', duration: 15, repeat: Infinity }}
          className="whitespace-nowrap flex space-x-4 items-center text-[#6da2ff] font-display text-xl uppercase tracking-wider"
        >
          {[...Array(20)].map((_, i) => (
            <span key={i} className="flex space-x-4 items-center">
              <span>MONTI</span>
              <span className="opacity-50">~~</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Work strip */}
      <section className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {homeStripItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="aspect-[3/4]"
            >
              <Link to="/cover-art" aria-label={`View ${item.title} in the gallery`}>
                <img
                  src={item.url}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
                  alt={item.title}
                />
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6 text-right">
          <Link
            to="/cover-art"
            className="text-sm uppercase tracking-wider text-muted hover:text-white transition-colors"
          >
            Full portfolio →
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-3">
            What I make
          </h2>
          <p className="text-muted font-light max-w-2xl mb-12">
            Everything a release needs to look intentional — from the square that sells
            the click to the loop that holds it.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#111] border border-white/5 p-8 hover:border-[#6da2ff]/30 transition-colors group"
            >
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-xl font-display font-medium">{s.title}</h3>
                <span className="text-sm text-[#6da2ff] tracking-wide">{s.price}</span>
              </div>
              <p className="text-muted text-sm font-light leading-relaxed">{s.text}</p>
              <Link
                to="/pricing"
                className="inline-block mt-6 text-sm uppercase tracking-wider text-white/60 group-hover:text-white transition-colors"
              >
                Pricing & details →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="border-y border-white/5 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-12"
          >
            Why artists work with me
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-[#6da2ff] font-display text-sm tracking-widest mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-display font-medium mb-3">{r.title}</h3>
                <p className="text-muted text-sm font-light leading-relaxed">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-12"
        >
          From brief to release in three steps
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0a0a0a] p-8"
            >
              <div className="text-white/20 font-display text-4xl font-medium mb-4">{step.n}</div>
              <h3 className="text-lg font-display font-medium mb-3">{step.title}</h3>
              <p className="text-muted text-sm font-light leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-[#6da2ff]/20 bg-gradient-to-br from-[#6da2ff]/10 to-transparent p-10 md:p-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4">
            Got a release coming?
          </h2>
          <p className="text-muted font-light max-w-xl mx-auto mb-8">
            I take on a limited number of projects at a time, so the queue decides the
            timeline. If you have a release date, the best moment to reach out is now.
          </p>
          <PrimaryLink to="/contact">Start your project</PrimaryLink>
        </motion.div>
      </section>
    </div>
  );
}
