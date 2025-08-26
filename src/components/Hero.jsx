import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDownload, FaArrowDown } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

// Import your CV file
import MyCV from '../assets/My_CV.pdf';

const Hero = () => {
  const { isDark } = useTheme();
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef(null);

  // Scroll to next section
  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Check if stats section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Counter component for animated numbers
  const Counter = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (statsInView) {
        let start = 0;
        const increment = end / (duration * 60); // 60fps

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.ceil(start));
          }
        }, 1000 / 60);

        return () => clearInterval(timer);
      }
    }, [statsInView, end, duration]);

    return <span>{count}+</span>;
  };

  // Social links data
  const socialLinks = [
    { icon: <FaGithub size={20} />, url: 'https://github.com', label: 'GitHub' },
    { icon: <FaLinkedin size={20} />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaTwitter size={20} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram size={20} />, url: 'https://instagram.com', label: 'Instagram' },
  ];

  // Stats data
  const stats = [
    { value: 5, label: 'Experience' },
    { value: 20, label: 'Projects' },
    { value: 80, label: 'Clients' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              Hi, I'm <span className="text-primary">Naeem Khan</span>
            </motion.h1>

            {/* Typewriter Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl mb-8 min-h-[2rem] flex items-center justify-center lg:justify-start"
            >
              <span className={`mr-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>I'm a</span>
              <span className="text-primary font-semibold">
                <Typewriter
                  words={['Web Developer', 'UI/UX Designer', 'React Specialist', 'Freelancer']}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className={`text-base md:text-lg mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Passionate full-stack developer crafting digital experiences that blend innovation 
              with functionality. Transforming ideas into seamless, responsive web applications.
            </motion.p>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex justify-center lg:justify-start gap-3 mb-8"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isDark 
                      ? 'bg-accent hover:bg-primary text-white' 
                      : 'bg-gray-200 hover:bg-primary text-gray-700 hover:text-white'
                  } shadow-lg hover:shadow-primary/20`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Download CV Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="flex justify-center lg:justify-start mb-10"
            >
              <motion.a
                href={MyCV}
                download="Naeem_Khan_CV.pdf"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center gap-3 py-3 px-8 text-base font-semibold rounded-full transition-all duration-300 ${
                  isDark
                    ? 'bg-primary hover:bg-orange-600 text-white border border-primary'
                    : 'bg-primary hover:bg-orange-600 text-white border border-primary'
                } shadow-lg hover:shadow-primary/30`}
              >
                <FaDownload className="text-sm" />
                <span>Download CV</span>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className={`rounded-2xl p-6 grid grid-cols-3 gap-4 ${
                isDark 
                  ? 'bg-accent/80 border border-gray-700' 
                  : 'bg-gray-100/80 border border-gray-200'
              }`}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <motion.p
                    whileHover={{ scale: 1.1 }}
                    className="text-2xl md:text-3xl font-bold text-primary mb-1"
                  >
                    <Counter end={stat.value} duration={2} />
                  </motion.p>
                  <p className={`text-xs font-medium ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  } group-hover:text-primary transition-colors`}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex justify-center lg:justify-end relative"
          >
            <div className="relative">
              {/* Floating background elements */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl -z-10"
              />
              
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -bottom-6 -right-6 w-28 h-28 bg-primary/5 rounded-full blur-xl -z-10"
              />

              {/* Main Profile Image */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  <motion.img
                   src="/images/My_pic.png"
                    alt="Naeem Khan - Web Developer"
                    className={`w-60 h-60 md:w-96 md:h-96 object-cover rounded-full border-4 border-primary/20 shadow-2xl ${
                      isDark ? 'filter grayscale' : 'filter-none'
                    } transition-all duration-500`}
                    loading="eager"
                    onError={(e) => {
                      // e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-full" />
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="absolute -bottom-2 -right-2 bg-primary text-white px-3 py-1 rounded-full font-semibold text-xs shadow-lg"
                >
                  Available
                </motion.div>
              </div>



            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
        >
          <motion.button
            onClick={scrollToNext}
            whileHover={{ y: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full ${
              isDark ? 'bg-accent/50' : 'bg-white/50'
            } backdrop-blur-sm border ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}
            aria-label="Scroll to next section"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaArrowDown className={`${isDark ? 'text-white' : 'text-gray-700'}`} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;