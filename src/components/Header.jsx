import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const headerBg = 'bg-white shadow-lg py-3';
  const textColor = 'text-gray-700';
  const logoTextColor = 'text-gray-900';
  const logoSubColor = 'text-primary-600';
  const logoBg = 'bg-primary-500';
  const logoIcon = 'text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${logoBg}`}>
              <svg
                className={`w-6 h-6 ${logoIcon}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75c0 1.14.46 2.18 1.21 2.94-.41.22-.79.5-1.12.83A5.75 5.75 0 005 15.25V20c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4.75a5.75 5.75 0 00-2.34-4.73c-.33-.33-.71-.61-1.12-.83.75-.76 1.21-1.8 1.21-2.94C16.75 4.13 14.62 2 12 2zm0 2c1.52 0 2.75 1.23 2.75 2.75S13.52 9.5 12 9.5 9.25 8.27 9.25 6.75 10.48 4 12 4zm0 7.5c2.21 0 4 1.79 4 4V20H8v-4.5c0-2.21 1.79-4 4-4z"/>
              </svg>
            </div>
            <div>
              <span className={`text-xl font-bold ${logoTextColor}`}>
                Dr. Sarah Mitchell
              </span>
              <p className={`text-xs ${logoSubColor}`}>
                Family Dentistry
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary-400 ${
                  location.pathname === link.href
                    ? 'text-primary-500'
                    : textColor
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-primary-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-600 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Book Appointment
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${textColor}`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-[500px] mt-4' : 'max-h-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block px-4 py-3 rounded-xl transition-colors font-medium ${
                  location.pathname === link.href
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-primary-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block text-center bg-primary-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
