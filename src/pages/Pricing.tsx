import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Cover Art Design",
    price: "From 150€",
    features: ["Conceptualization", "Up to 3 revisions", "High resolution (print & digital)", "Ready for Spotify/Apple Music"]
  },
  {
    title: "3D Illustration",
    price: "From 250€",
    features: ["Complex 3D scene and lighting", "Personal or commercial projects", "Up to 3 revisions", "High resolution"]
  },
  {
    title: "Animation / Visualizer",
    price: "From 300€",
    features: ["Spotify Canvas (3-8s) or YouTube Loop", "Audio reactive by agreement", "1080p or 4K quality", "Aligned with visual identity"]
  },
  {
    title: "Overall Visual Identity (Album)",
    price: "Custom quote",
    features: ["Cover Art", "Tracklist graphics", "Social media assets", "Spotify Canvas for main singles"]
  }
];

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
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
          Transparent and fair. Every project is a unique challenge, so prices can be adjusted based on complexity and timeline.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#111] border border-white/5 p-8 flex flex-col h-full hover:border-white/10 transition-colors"
          >
            <h3 className="text-xl font-display font-medium mb-2">{service.title}</h3>
            <div className="text-2xl mb-6">{service.price}</div>
            
            <ul className="space-y-3 mt-auto flex-grow">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start text-muted text-sm">
                  <span className="mr-3 text-white/40">―</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-white/5">
              <Link to="/contact" className="uppercase text-sm tracking-wider font-medium hover:text-muted transition-colors">
                Send an inquiry
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
