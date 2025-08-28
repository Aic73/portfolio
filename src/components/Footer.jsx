import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaHeart, 
  FaEnvelope 
} from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { trackEvent } from '../hooks/useAnalytics';

const Footer = () => {
  const { isDark } = useTheme();

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: <FaGithub size={20} />, 
      url: 'https://github.com/yourusername', 
      label: 'GitHub',
      color: 'hover:text-gray-400'
    },
    { 
      icon: <FaLinkedin size={20} />, 
      url: 'https://linkedin.com/in/yourusername', 
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    { 
      icon: <FaTwitter size={20} />, 
      url: 'https://twitter.com/yourusername', 
      label: 'Twitter',
      color: 'hover:text-blue-400'
    },
    { 
      icon: <FaInstagram size={20} />, 
      url: 'https://instagram.com/yourusername', 
      label: 'Instagram',
      color: 'hover:text-pink-400'
    },
    { 
      icon: <FaEnvelope size={20} />, 
      url: 'mailto:aicnaeem73@gmail.com', 
      label: 'Email',
      color: 'hover:text-red-400'
    },
  ];

  const handleSocialClick = (platform, url) => {
    trackEvent('Social Media', 'Click', platform);
    window.open(url, '_blank');
  };

  return (
    <footer className={`py-12 px-4 mt-20 ${
      isDark ? 'bg-secondary border-t border-gray-800' : 'bg-gray-100 border-t border-gray-200'
    }`}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold mb-2">Naeem Khan</h3>
            <p className={`max-w-md ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Full-stack developer crafting digital experiences that blend innovation with functionality.
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                onClick={() => handleSocialClick(social.label, social.url)}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isDark 
                    ? 'bg-accent text-white hover:bg-primary' 
                    : 'bg-white text-gray-700 shadow-md hover:bg-primary hover:text-white'
                } ${social.color}`}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className={`text-center mt-12 pt-6 border-t ${
            isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
          }`}
        >
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Naeem Khan. Made with 
            <FaHeart className="text-red-500 mx-1" /> 
            using React & Tailwind
          </p>
          <p className="text-sm mt-2">
            Designed and developed with passion
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

