import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const LINKS = [
  { path: '/', label: 'Home' },
  { path: '/predict', label: 'Predict' },
  { path: '/about', label: 'About' },
];

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#06070e]/90 backdrop-blur-xl border-b border-white/70' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => handleNav('/')}
          className="flex gap-2 cursor-pointer font-display font-extrabold text-lg tracking-wide text-white"
        >
          <span className='flex items-center'><img src={logo} className='h-6 w-6' alt="" /></span>
          <div>
            <span>Pulmora</span>
            <span className="text-violet-400">.ml</span>
          </div>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map(l => (
            <li key={l.path}>
              <button
                onClick={() => handleNav(l.path)}
                className={`cursor-pointer text-sm font-medium transition-colors duration-200 relative pb-0.5 ${isActive(l.path) ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
              >
                {l.label}
                {isActive(l.path) && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-violet-400 rounded-full" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={() => handleNav('/predict')}
          className="cursor-pointer hidden md:block bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:-translate-y-px tracking-wide"
        >
          Analyze X-Ray
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="cursor-pointer md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#0c0e1a]/97 backdrop-blur-xl border-b border-white/[0.06] px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {LINKS.map(l => (
              <li key={l.path}>
                <button
                  onClick={() => handleNav(l.path)}
                  className={`cursor-pointer w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive(l.path)
                      ? 'bg-violet-600/20 text-violet-300'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <button
                onClick={() => handleNav('/predict')}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors tracking-wide"
              >
                Analyze X-Ray
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
