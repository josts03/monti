import { Link, Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { site } from '@/config/site';
import logo from '@/assets/logo.webp';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-[100px] pb-20">
        <Outlet />
      </main>

      <footer className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img
              src={logo}
              alt="Monti"
              width={480}
              height={210}
              loading="lazy"
              className="h-16 w-auto mb-3"
            />
            <p className="text-muted text-sm font-light leading-relaxed max-w-xs">
              Cover art and motion design for artists who want their
              release to look as serious as it sounds.
            </p>
          </div>

          <div>
            <div className="text-sm uppercase tracking-wider text-white/40 mb-4">Explore</div>
            <nav className="flex flex-col space-y-2 text-sm text-muted">
              <Link to="/cover-art" className="hover:text-white transition-colors">
                Cover Art
              </Link>
              <Link to="/motion-art" className="hover:text-white transition-colors">
                Motion Art
              </Link>
              <Link to="/pricing" className="hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Start a project
              </Link>
            </nav>
          </div>

          <div>
            <div className="text-sm uppercase tracking-wider text-white/40 mb-4">Contact</div>
            <div className="flex flex-col space-y-2 text-sm text-muted">
              <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
                {site.email}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram {site.instagramHandle}
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 py-6 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} Monti. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
