import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info, Calendar, Users, FileText, Globe, Laptop, BadgeDollarSign, Megaphone } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for cleaner class merging
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle Scroll Effect for "Minimize" Animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Beranda', path: '/', icon: <Home size={18} /> },
    { name: 'Tentang Aplikasi', path: '/about', icon: <Info size={18} /> },
    { name: 'Info KSK', path: '/info-ksk', icon: <Globe size={18} /> },
    { name: 'Laptop Gratis', path: '/laptop-gratis', icon: <Laptop size={18} /> },
    { name: 'Info Biaya', path: '/info-biaya', icon: <BadgeDollarSign size={18} /> },
    { name: 'Brosur Iklan', path: '/brosur-iklan', icon: <Megaphone size={18} /> },
    { name: 'Jadwal Sosialisasi', path: '/schedule', icon: <Calendar size={18} /> },
    { name: 'Perolehan Aplikan', path: '/applicants', icon: <Users size={18} /> },
    { name: 'Laporan OKR', path: '/okr', icon: <FileText size={18} /> },
  ];

  const externalLinks = [
    { name: 'Web KSK', url: 'https://ksk.lp3i.ac.id', icon: <Globe size={18} /> }
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent',
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-md py-2 border-gray-200' 
            : 'bg-white/50 backdrop-blur-sm py-4'
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                P
              </div>
              <span className={cn(
                "font-bold text-xl tracking-tight transition-colors duration-300",
                isScrolled ? "text-gray-900" : "text-gray-800"
              )}>
                LP3I <span className="text-blue-600">PRESENTER</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 relative group",
                      isActive 
                        ? "text-blue-600 bg-blue-50" 
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    )}
                  >
                    {link.icon}
                    {link.name}
                    {/* Active Indicator Dot */}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
              
              {/* Divider */}
              <div className="h-6 w-px bg-gray-300 mx-2"></div>

              {externalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-100 shadow-lg",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => {
               const isActive = location.pathname === link.path;
               return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  )}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
             <div className="border-t border-gray-100 my-2 pt-2">
              {externalLinks.map((link) => (
                 <a
                 key={link.name}
                 href={link.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
               >
                 {link.icon}
                 {link.name}
               </a>
              ))}
             </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className={cn("transition-all duration-300", isScrolled ? "h-16" : "h-20")} />
    </>
  );
};

export default Navbar;
