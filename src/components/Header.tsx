import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 动态获取多语言导航链接
  const navLinks = Array.from({ length: 7 }).map((_, idx) => ({
    to: t(`Header.navLinks.${idx}.to`),
    label: t(`Header.navLinks.${idx}.label`)
  }));

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0">
          <Logo size={isScrolled ? 40 : 48} />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to}
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary-500 ${
                  isActive 
                    ? 'text-primary-600 font-semibold'
                    : 'text-neutral-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-neutral-100" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-neutral-100" aria-label="User Account">
            <User size={20} />
          </button>
          <Link 
            to={t('Header.cta.detail.url')}
            className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors">
            {t('Header.cta.detail.label')}
            </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-neutral-100" 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <nav className="flex flex-col px-4 pt-2 pb-4">
            {navLinks.map((link) => (
              <NavLink 
                key={link.to} 
                to={link.to}
                className={({ isActive }) => 
                  `py-3 border-b border-neutral-100 text-sm font-medium ${
                    isActive 
                      ? 'text-primary-600 font-semibold'
                      : 'text-neutral-700'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link 
            to={t('Header.cta.detail.url')}
            className="bg-primary-500 hover:bg-primary-600 text-white py-3 mt-4 rounded-full text-sm font-medium transition-colors">
            {t('Header.cta.detail.label')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;