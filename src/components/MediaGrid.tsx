import { motion } from 'motion/react';
import { useState } from 'react';

interface GridItem {
  id: string;
  url: string;
  title?: string;
  type: 'image' | 'video';
}

export default function MediaGrid({ items }: { items: GridItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 w-full mt-4">
      {items.map((item, i) => (
        <MediaCard key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}

function MediaCard({ item, index }: { item: GridItem; index: number }) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative aspect-square overflow-hidden bg-[#111] group cursor-pointer"
    >
      {item.type === 'image' ? (
        <img
          src={item.url}
          alt={item.title || "Portfolio Item"}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <div className="w-full h-full relative" onLoad={() => setLoaded(true)}>
          {/* Mock video player interface */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/20">
             <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
               <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-2"></div>
             </div>
          </div>
          <img 
            src={item.url} 
            alt={item.title || "Video Thumbnail"} 
            className="object-cover w-full h-full transition-transform duration-700" 
            onLoad={() => setLoaded(true)}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        {item.title && (
          <div className="p-6 text-white w-full">
            <h3 className="font-display font-medium text-lg tracking-wide">{item.title}</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}
