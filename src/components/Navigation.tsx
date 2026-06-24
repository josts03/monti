import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { site } from '@/config/site';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setPortfolioOpen(false);
    setSocialOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          aria-label="Monti — home"
          className="text-2xl font-display font-medium tracking-tighter"
        >
          <span className="italic">M</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide">
          <div
            className="relative group"
            onMouseEnter={() => setPortfolioOpen(true)}
            onMouseLeave={() => setPortfolioOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-muted transition-colors uppercase">
              Portfolio <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {portfolioOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 pt-4"
                >
                  <div className="bg-[#111] border border-white/10 rounded-md py-2 min-w-[160px] shadow-xl">
                    <Link to="/cover-art" className="block px-4 py-2 hover:bg-white/5 transition-colors">
                      Cover Art
                    </Link>
                    <Link to="/motion-art" className="block px-4 py-2 hover:bg-white/5 transition-colors">
                      Motion Art
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/pricing"
            className={cn(
              'hover:text-muted transition-colors uppercase',
              location.pathname === '/pricing' && 'text-[#6da2ff]'
            )}
          >
            Pricing
          </Link>

          <div
            className="relative group"
            onMouseEnter={() => setSocialOpen(true)}
            onMouseLeave={() => setSocialOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-muted transition-colors uppercase">
              Social Media <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {socialOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 -right-4 pt-2"
                >
                  <div className="bg-[#111] border border-white/10 rounded-md py-2 min-w-[160px] shadow-xl">
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 hover:bg-white/5 transition-colors text-right"
                    >
                      Instagram
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Primary CTA — always one click away */}
          <Link
            to="/contact"
            className="bg-[#6da2ff] text-black px-5 py-2.5 uppercase tracking-wider hover:bg-[#8ab5ff] transition-colors"
          >
            Start a project
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#111] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 space-y-4">
              <div className="text-sm text-muted uppercase tracking-wider mb-2">Portfolio</div>
              <Link to="/cover-art" className="text-lg pl-4">
                Cover Art
              </Link>
              <Link to="/motion-art" className="text-lg pl-4">
                Motion Art
              </Link>
              <div className="w-full h-px bg-white/10" />
              <Link to="/pricing" className="text-lg">
                Pricing
              </Link>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-muted"
              >
                Instagram
              </a>
              <div className="w-full h-px bg-white/10" />
              <Link
                to="/contact"
                className="bg-[#6da2ff] text-black text-center px-5 py-3.5 uppercase tracking-wider font-medium"
              >
                Start a project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
