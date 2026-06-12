import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';

const services = [
  {
    title: 'Cover Art Design',
    price: 'From €150',
    slug: 'Cover Art',
    popular: true,
    features: [
      'Single, EP or album artwork',
      'Concept development from your brief',
      'Up to 3 revision rounds included',
      'High-res masters: streaming, print & vinyl',
      'Sized for Spotify, Apple Music & socials',
    ],
  },
  {
    title: '3D Illustration',
    price: 'From €250',
    slug: '3D Illustration',
    popular: false,
    features: [
      'Full 3D scene, modelling and lighting',
      'Personal or commercial use',
      'Up to 3 revision rounds included',
      'High-resolution delivery',
    ],
  },
  {
    title: 'Animation / Visualizer',
    price: 'From €300',
    slug: 'Animation / Visualizer',
    popular: false,
    features: [
      'Spotify Canvas (3–8 s) or YouTube loop',
      'Seamless loop, built for replay',
      'Audio-reactive on request',
      '1080p or 4K delivery',
    ],
  },
  {
    title: 'Full Visual Identity (Album)',
    price: 'Custom quote',
    slug: 'Full Visual Identity',
    popular: false,
    features: [
      'Cover art for the record',
      'Tracklist & promo graphics',
      'Social media asset pack',
      'Spotify Canvas for the lead singles',
    ],
  },
];

const faqs = [
  {
    q: 'How fast will I get my artwork?',
    a: "It depends on scope and the current queue. Tell me your release date in the brief and I'll confirm the timeline before anything starts — no surprises mid-project.",
  },
  {
    q: 'What do you need from me to start?',
    a: 'The song (a demo is fine), any references or moods you like, your deadline, and where the artwork will live. The contact form walks you through all of it.',
  },
  {
    q: 'What if I don’t like the first concept?',
    a: 'Up to 3 revision rounds are included in every project. We iterate until it fits — that’s what the rounds are for.',
  },
  {
    q: 'What files do I get?',
    a: 'High-resolution masters plus exports sized for each platform — streaming, socials, and print or vinyl if you need it. You upload, it fits.',
  },
  {
    q: 'Can you match a visual style I already have?',
    a: 'Yes. Send your existing artwork or brand references and I’ll build on them instead of starting from zero.',
  },
];

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Seo
        title="Pricing — Cover Art from €150"
        description="Transparent pricing: cover art from €150, 3D illustration from €250, Spotify Canvas and visualizers from €300. Up to 3 revision rounds included on every project."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tighter mb-6">
          Pricing & Services
        </h1>
        <p className="text-muted text-lg font-light">
          Every price below is a starting point — the final quote depends on scope and
          deadline. You'll always know the exact number before we start, and it won't
          change mid-project.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={
              service.popular
                ? 'relative bg-[#111] border border-[#6da2ff]/40 p-8 flex flex-col h-full'
                : 'relative bg-[#111] border border-white/5 p-8 flex flex-col h-full hover:border-white/15 transition-colors'
            }
          >
            {service.popular && (
              <span className="absolute -top-3 left-8 bg-[#6da2ff] text-black text-xs font-medium uppercase tracking-wider px-3 py-1">
                Most booked
              </span>
            )}
            <h3 className="text-xl font-display font-medium mb-2">{service.title}</h3>
            <div className="text-3xl font-display mb-6 text-[#6da2ff]">{service.price}</div>

            <ul className="space-y-3 flex-grow">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start text-muted text-sm">
                  <span className="mr-3 text-[#6da2ff]/60">―</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/5">
              <Link
                to={`/contact?service=${encodeURIComponent(service.slug)}`}
                className={
                  service.popular
                    ? 'inline-flex items-center gap-2 bg-[#6da2ff] text-black font-medium uppercase tracking-wider text-sm px-6 py-3 hover:bg-[#8ab5ff] transition-colors w-full justify-center'
                    : 'inline-flex items-center gap-2 border border-white/20 font-medium uppercase tracking-wider text-sm px-6 py-3 hover:border-white/60 hover:bg-white/5 transition-colors w-full justify-center'
                }
              >
                {service.price === 'Custom quote' ? 'Get a quote' : 'Request this'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto mt-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-display font-medium tracking-tight mb-10 text-center"
        >
          Questions artists ask before booking
        </motion.h2>
        <div className="divide-y divide-white/5 border-y border-white/5">
          {faqs.map((faq, i) => (
            <motion.details
              key={faq.q}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group py-5"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between font-display font-medium text-lg">
                {faq.q}
                <span className="text-[#6da2ff] ml-4 transition-transform duration-300 group-open:rotate-45 text-2xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted text-sm font-light leading-relaxed max-w-2xl">
                {faq.a}
              </p>
            </motion.details>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-muted font-light mb-6">
            Something else on your mind? Ask before you book — it costs nothing.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#6da2ff] text-black font-medium uppercase tracking-wider text-sm px-8 py-4 hover:bg-[#8ab5ff] transition-colors"
          >
            Start your project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
