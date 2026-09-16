import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'الخدمات', href: '#services' },
  { label: 'أتمتة الذكاء الاصطناعي', href: '#workflows' },
  { label: 'معرض الأعمال', href: '#showcase' },
  { label: 'خطط الأسعار', href: '#pricing' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stride-dark/80 backdrop-blur-xl border-b border-stride-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-stride-primary to-stride-glow flex items-center justify-center shadow-lg shadow-stride-primary/30 transition-transform group-hover:scale-110">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <div className="absolute inset-0 rounded-lg bg-stride-primary blur-lg opacity-40 -z-10" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">سترايد</span>
        </a>

        {/* Nav links — centered */}
        <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stride-text-muted hover:text-white transition-colors duration-200 relative group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-stride-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <a
            href="#demo"
            className="text-sm font-medium text-stride-text-muted hover:text-white transition-colors whitespace-nowrap"
          >
            عرض مباشر
          </a>
          <a
            href="#contact"
            className="bg-[#FF5528] text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-[#FF5528]/20 hover:scale-105 transition-all whitespace-nowrap"
          >
            ابدأ مشروعك
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="القائمة"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-stride-dark/95 backdrop-blur-xl border-b border-stride-border"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-stride-text-muted hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="bg-[#FF5528] text-white px-5 py-2.5 rounded-xl text-sm font-medium text-center mt-2"
              >
                ابدأ مشروعك
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
