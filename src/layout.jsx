import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from './contexts/CartContext';
import { useAuth } from './contexts/AuthContext';

function Navbar() {
  const { itemCount } = useCart();
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `px-1 py-0.5 text-sm font-medium transition-colors duration-150 ${
      isActive ? 'text-amber-400' : 'text-ink-400 hover:text-ink-100'
    }`;

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-ink-950/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center">
            <span className="text-ink-950 text-sm font-bold">S</span>
          </div>
          <span className="font-display font-semibold text-lg text-ink-50 tracking-tight">ShopNest</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" end className={navLinkClass}>Accueil</NavLink>
          <NavLink to="/products" className={navLinkClass}>Produits</NavLink>
          <NavLink to="/orders" className={navLinkClass}>Commandes</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs text-ink-500 font-medium">
                {user.firstName}
                {user.role === 'admin' && (
                  <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20">ADMIN</span>
                )}
              </span>
              <button className="btn-ghost text-xs py-1.5 px-3" onClick={() => { signOut(); navigate('/'); }}>Se déconnecter</button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/sign-in" className="btn-ghost text-xs py-1.5 px-3">Se connecter</Link>
              <Link to="/sign-up" className="btn-outline text-xs py-1.5 px-3">S'inscrire</Link>
            </div>
          )}

          <Link to="/cart" className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-ink-800 border border-white/[0.08] hover:border-amber-500/30 hover:bg-ink-700 transition-all duration-150 group">
            <svg className="w-4 h-4 text-ink-400 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span className="text-xs font-medium text-ink-300 group-hover:text-ink-100">Panier</span>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold bg-amber-500 text-ink-950 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer className="border-t border-white/[0.06] mt-20 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-amber-500 flex items-center justify-center">
              <span className="text-ink-950 text-xs font-bold">S</span>
            </div>
            <span className="font-display text-sm text-ink-500">ShopNest</span>
          </div>
          <p className="text-xs text-ink-600">© {new Date().getFullYear()} ShopNest. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
