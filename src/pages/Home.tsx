import { motion } from 'motion/react';

const homeImages = [
  "https://picsum.photos/seed/montiHome1/600/800",
  "https://picsum.photos/seed/montiHome2/600/800",
  "https://picsum.photos/seed/montiHome3/600/800",
  "https://picsum.photos/seed/montiHome4/600/800",
];

export default function Home() {
  return (
    <div className="w-full flex flex-col h-[calc(100vh-100px)] justify-between pb-0">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 pt-12 flex-grow flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-medium tracking-tight leading-[1.1] text-[#6da2ff]">
             Life isn't about finding yourself. It's about creating yourself.
          </h1>
        </motion.div>
      </div>

      {/* Marquee Section */}
      <div className="w-full overflow-hidden border-y border-white/5 py-4 my-8 bg-transparent">
        <motion.div
           animate={{ x: [0, -1000] }}
           transition={{ ease: "linear", duration: 15, repeat: Infinity }}
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
      
      {/* Bottom Images */}
      <div className="w-full h-1/3 min-h-[300px] mt-auto">
        <div className="grid grid-cols-4 h-full gap-1">
          {homeImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-full h-full"
            >
              <img 
                src={src} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                alt={`Portfolio selection ${i + 1}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
