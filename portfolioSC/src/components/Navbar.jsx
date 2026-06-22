import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('ES');
  const location = useLocation();

  // ─── LÓGICA DEL SMART HEADER (Ocultar al bajar, mostrar al subir) ───
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // Si bajamos más de 100px, ocultamos. Si subimos, mostramos.
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setLanguage(language === 'EN' ? 'ES' : 'EN');

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About me', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' }
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-150%", opacity: 0 }
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-8 px-4 pointer-events-none"
    >
      {/* ─── DOCK FLOTANTE ─── */}
      <nav className="bg-white/80 backdrop-blur-xl border border-gray-200/80 rounded-full p-2 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.06)] pointer-events-auto w-full max-w-4xl">

        {/* ─── ENLACES CENTRALES ─── */}
        <div className="flex items-center gap-1 bg-gray-50/50 p-1.5 rounded-full border border-gray-100">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-6 py-2 text-xs font-semibold tracking-widest uppercase transition-colors rounded-full ${
                  isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-sm border border-gray-100/50"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* ─── UTILIDADES (IDIOMA & TEMA) ─── */}
        <div className="flex items-center gap-2 pr-2">
          
          <button 
            onClick={toggleLanguage}
            className="w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
            title="Cambiar idioma"
          >
            {language}
          </button>
          
          <div className="w-px h-4 bg-gray-200"></div>

          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
            title="Alternar modo oscuro"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </motion.div>
          </button>

        </div>
      </nav>
    </motion.header>
  );
}