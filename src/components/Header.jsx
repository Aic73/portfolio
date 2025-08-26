import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import { trackEvent } from '../hooks/useAnalytics';

import { 
  FaCode, 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaUser, 
  FaProjectDiagram, 
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram
} from 'react-icons/fa';

// Hiring Modal Component (Integrated)
const HiringModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ 
            type: 'spring', 
            damping: 25, 
            stiffness: 200,
            duration: 0.3
          }}
          className={`rounded-2xl p-6 max-w-md w-full border ${
            isDark 
              ? 'bg-secondary border-gray-700' 
              : 'bg-white border-gray-300 shadow-xl'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-secondary'
            }`}>
              Get In Touch
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-accent' 
                  : 'text-gray-500 hover:text-secondary hover:bg-gray-200'
              }`}
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Let's discuss your project and how I can help bring your ideas to life. 
            I'm available for freelance work and full-time opportunities.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className={`flex items-center gap-3 p-3 rounded-lg ${
              isDark ? 'bg-accent' : 'bg-gray-100'
            }`}>
              <FaEnvelope className="text-primary" />
              <span className={isDark ? 'text-white' : 'text-secondary'}>
                aicnaeem73@gmail.com
              </span>
            </div>
            
            <div className={`flex items-center gap-3 p-3 rounded-lg ${
              isDark ? 'bg-accent' : 'bg-gray-100'
            }`}>
              <div className="text-primary">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em">
                  <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
                </svg>
              </div>
              <span className={isDark ? 'text-white' : 'text-secondary'}>
                +92 335 0595282
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.a
              href="mailto:aicnaeem73@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300"
            >
              <FaEnvelope />
              Email
            </motion.a>
            
            <motion.a
              href="https://wa.me/923350595282"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 极狐 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
              </svg>
              WhatsApp
            </motion.a>
          </div>

          {/* Additional contact options */}
          <div className={`mt-6 pt-4 border-t ${
            isDark ? 'border-gray-700' : 'border-gray-300'
          }`}>
            <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Prefer another method?
            </p>
            <div className="flex justify-center gap-4">
              {[
                { name: 'Upwork', color: 'bg-green-500' },
                { name: 'Fiverr', color: 'bg-green-400' },
                { name: 'LinkedIn', color: 'bg-blue-600' },
              ].map((platform) => (
                <motion.button
                  key={platform.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${platform.color} text-white text-xs font-medium px-3 py-1 rounded-full opacity-90 hover:opacity-100 transition-opacity`}
                >
                  {platform.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Response time indicator */}
          <div className={`mt-4 text-xs ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          } text-center`}>
            ⚡ Typically responds within 2 hours
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDark } = useTheme();
  const headerRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      // Header background on scroll
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active section detection
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-menu-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', icon: <FaHome className="text-sm" /> },
    { name: 'About', href: '#about', icon: <FaUser className="text-sm" /> },
    { name: 'Projects', href: '#projects', icon: <FaProjectDiagram className="text-sm" /> },
    { name: 'Contact', href: '#contact', icon: <FaEnvelope className="text-sm" /> },
  ];

  const socialLinks = [
    { icon: <FaGithub size={18} />, url: 'https://github.com', label: 'GitHub' },
    { icon: <FaLinkedin size={18} />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaTwitter size={18} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram size={18} />, url: 'https://instagram.com', label: 'Instagram' },
  ];

  const handleNavClick = (href) => {
    trackEvent('Navigation', 'Click', href);

    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed w-full z-40 transition-all duration-300 ${
          scrolled 
            ? `py-2 shadow-md backdrop-blur-md border-b ${
                isDark 
                  ? 'bg-secondary/95 border-gray-800 text-white' 
                  : 'bg-white/95 border-gray-200 text-secondary'
              }` 
            : `py-3 bg-transparent ${isDark ? 'text-white' : 'text-secondary'}`
        }`}
        style={{
          // Ensure header doesn't cause overflow
          left: 0,
          right: 0,
          width: '100%',
          maxWidth: '100vw',
          overflow: 'hidden'
        }}
      >
        <div className="mx-auto px-4 md:px-6 flex justify-between items-center w-full max-w-full">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 group cursor-pointer flex-shrink-0"
            onClick={() => handleNavClick('#home')}
          >
            <div className="p-2 bg-primary rounded-full group-hover:scale-110 transition-transform duration-300">
              <FaCode className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold tracking-tight whitespace-nowrap">
              Naeem Khan
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block flex-shrink-0">
            <ul className="flex space-x-1">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      activeSection === link.href.substring(1)
                        ? 'bg-primary text-white shadow-lg'
                        : `${
                            isDark 
                              ? 'text-gray-300 hover:text-white hover:bg-accent' 
                              : 'text-gray-600 hover:text-secondary hover:bg-gray-200'
                          }`
                    }`}
                  >
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <ThemeToggle />
            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="bg-primary hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/20 whitespace-nowrap"
            >
              Hire Me
            </motion.button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="lg:hidden flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`z-50 p-2 rounded-lg transition-colors mobile-menu-container ${
                isDark ? 'text-white hover:bg-accent' : 'text-secondary hover:bg-gray-200'
              }`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`lg:hidden fixed inset-0 z-30 flex flex-col items-center justify-center space-y-6 p-6 mobile-menu-container ${
              isDark 
                ? 'bg-secondary text-white' 
                : 'bg-white text-secondary'
            }`}
            style={{ paddingTop: '80px' }}
          >
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`flex items-center gap-3 text-xl font-medium px-6 py-3 rounded-full transition-all duration-300 w-full max-w-xs ${
                  activeSection === link.href.substring(1)
                    ? 'bg-primary text-white shadow-lg'
                    : `${
                        isDark 
                          ? 'text-gray-300 hover:text-white hover:bg-accent' 
                          : 'text-gray-600 hover:text-secondary hover:bg-gray-200'
                      }`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
                <span>{link.name}</span>
              </motion.a>
            ))}

            {/* Mobile Hire Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsOpen(false);
                openModal();
              }}
              className="bg-primary hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/20 w-full max-w-xs"
            >
              Hire Me
            </motion.button>

            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-colors duration-300 ${
                    isDark ? 'bg-accent hover:bg-primary' : 'bg-gray-200 hover:bg-primary hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hiring Modal */}
      <HiringModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Header;