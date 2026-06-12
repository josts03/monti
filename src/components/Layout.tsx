import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-[100px] pb-20">
        <Outlet />
      </main>
      <footer className="border-t border-white/5 py-8 text-center text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Monti. All rights reserved.</p>
      </footer>
    </div>
  );
}
