import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useInView } from 'react-intersection-observer';

// Then replace the custom useInView implementation
import { 
  FaCode, 
  FaPaintBrush, 
  FaMobile, 
  FaServer, 
  FaDatabase,
  FaTools,
  FaReact,
  FaNodeJs,
  FaAws,
  FaGitAlt,
  FaEnvelope,
  FaTimes,
  FaWhatsapp,
  FaPhone
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiFramer,
  SiDocker
} from 'react-icons/si';

// Counter component for animated numbers
const Counter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
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
  }, [inView, end, duration]);

  return <span ref={ref}>{count}+</span>;
};

// Custom hook to check if element is in viewport
// const useInView = (ref, options) => {
//   const [isInView, setIsInView] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       setIsInView(entry.isIntersecting);
//     }, options);

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => {
//       if (ref.current) {
//         observer.unobserve(ref.current);
//       }
//     };
//   }, [ref, options]);

//   return isInView;
// };

// 3D Icon Component with enhanced effects
const TechIcon3D = ({ icon, isDark, name }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {/* 3D effect layers */}
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        {/* Back shadow layer */}
        <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${
          isDark ? 'bg-primary/20' : 'bg-primary/10'
        }`} 
        style={{
          transform: isHovered ? 'translateZ(-8px) rotateX(5deg) rotateY(5deg)' : 'translateZ(-4px)',
          filter: isHovered ? 'blur(6px)' : 'blur(3px)',
          opacity: isHovered ? 0.8 : 0.6
        }} />
        
        {/* Middle layer */}
        <div className={`absolute inset-0 rounded-lg transition-all duration-400 ${
          isDark ? 'bg-primary/15' : 'bg-primary/5'
        }`} 
        style={{
          transform: isHovered ? 'translateZ(-4px) rotateX(2deg) rotateY(2deg)' : 'translateZ(-2px)',
          filter: isHovered ? 'blur(4px)' : 'blur(2px)',
          opacity: isHovered ? 0.7 : 0.4
        }} />
        
        {/* Main icon with 3D effect */}
        <motion.div
          className={`relative z-10 flex items-center justify-center h-12 w-12 mx-auto rounded-lg ${
            isDark 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl shadow-primary/30' 
              : 'bg-gradient-to-br from-white to-gray-100 shadow-2xl shadow-primary/20'
          }`}
          animate={{
            rotateX: isHovered ? 10 : 0,
            rotateY: isHovered ? -10 : 0,
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <div className={`text-2xl ${isDark ? 'text-white' : 'text-primary'}`}>
            {icon}
          </div>
        </motion.div>
      </div>
      
      {/* Floating tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md text-xs font-medium bg-primary text-white shadow-lg"
        >
          {name}
        </motion.div>
      )}
    </motion.div>
  );
};

// Hiring Modal Component (Reusable)
const HiringModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  
  if (!isOpen) return null;

  return (
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
            <FaPhone className="text-primary" />
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
            <FaWhatsapp />
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
  );
};

const About = () => {
  const { isDark } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Skills data
  const skills = [
    { name: 'Frontend Development', icon: <FaCode size={24} />, level: 90 },
    { name: 'UI/UX Design', icon: <FaPaintBrush size={24} />, level: 85 },
    { name: 'Responsive Design', icon: <FaMobile size={24} />, level: 95 },
    { name: 'Backend Development', icon: <FaServer size={24} />, level: 80 },
    { name: 'Database Management', icon: <FaDatabase size={24} />, level: 75 },
    { name: 'DevOps & Tools', icon: <FaTools size={24} />, level: 70 },
  ];

  // Technologies data with specific icons
  const technologies = [
    { name: 'React', category: 'Frontend', icon: <FaReact /> },
    { name: 'Next.js', category: 'Frontend', icon: <SiNextdotjs /> },
    { name: 'TypeScript', category: 'Frontend', icon: <SiTypescript /> },
    { name: 'Node.js', category: 'Backend', icon: <FaNodeJs /> },
    { name: 'Express', category: 'Backend', icon: <SiExpress /> },
    { name: 'MongoDB', category: 'Database', icon: <SiMongodb /> },
    { name: 'PostgreSQL', category: 'Database', icon: <SiPostgresql /> },
    { name: 'Tailwind CSS', category: 'Styling', icon: <SiTailwindcss /> },
    { name: 'Framer Motion', category: 'Animation', icon: <SiFramer /> },
    { name: 'Git', category: 'Tools', icon: <FaGitAlt /> },
    { name: 'Docker', category: 'DevOps', icon: <SiDocker /> },
    { name: 'AWS', category: 'Cloud', icon: <FaAws /> },
  ];

  return (
    <>
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="text-primary">Me</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get to know more about my journey, skills, and what drives me as a developer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left Column - Profile Image and Personal Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              {/* Profile Image - Centered on mobile, left-aligned on desktop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                className="mb-8 flex justify-center lg:justify-start"
              >
                <div className="relative">
                  <motion.img
                     src="/images/My_about_pic.webp"
                    alt="Naeem Khan - Web Developer"
                    className={`w-48 h-48 object-cover rounded-full border-4 ${
                      isDark 
                        ? 'border-primary/30 filter grayscale' 
                        : 'border-primary/20 filter-none'
                    } shadow-2xl transition-all duration-500`}
                  />
                  
                  {/* Floating elements */}
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full blur-xl -z-10"
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
                    className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/5 rounded-full blur-xl -z-10"
                  />
                </div>
              </motion.div>

              <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">My Journey</h3>
              <div className="space-y-4">
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-center lg:text-left`}>
                  Hello! I'm Naeem Khan, a passionate full-stack developer with over 5 years of 
                  experience creating digital solutions that make a difference. My journey in 
                  web development started during my university years, and I've been hooked 
                  ever since.
                </p>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-center lg:text-left`}>
                  I specialize in creating responsive, user-friendly web applications using 
                  modern technologies. My approach combines technical expertise with creative 
                  problem-solving to deliver exceptional results for my clients.
                </p>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-center lg:text-left`}>
                  When I'm not coding, you can find me exploring new technologies, contributing 
                  to open-source projects, or sharing my knowledge through blog posts and 
                  tutorials. I believe in continuous learning and staying updated with the 
                  latest industry trends.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                {[
                  { value: 5, label: 'Years Experience' },
                  { value: 50, label: 'Projects Completed' },
                  { value: 30, label: 'Happy Clients' },
                  { value: 15, label: 'Technologies' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
                  >
                    <p className="text-3xl font-bold text-primary mb-1">
                      <Counter end={stat.value} duration={2} />
                    </p>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">My Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-primary">{skill.icon}</div>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-primary font-medium">{skill.level}%</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${
                      isDark ? 'bg-accent' : 'bg-gray-200'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Enhanced Technologies Section with 3D Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-center mb-12">Technologies I Work With</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={`p-5 rounded-xl text-center border transform-style-3d transition-all duration-500 ${
                    isDark 
                      ? 'bg-secondary border-gray-700 hover:border-primary hover:shadow-2xl hover:shadow-primary/20' 
                      : 'bg-white border-gray-200 hover:border-primary hover:shadow-2xl hover:shadow-primary/20'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  whileHover={{ 
                    y: -8,
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                >
                  <TechIcon3D 
                    icon={tech.icon} 
                    isDark={isDark} 
                    name={tech.name}
                  />
                  <p className="font-medium text-sm mt-3 mb-1">{tech.name}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {tech.category}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Interested in working together? Let's bring your ideas to life!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/20"
              onClick={openModal}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Hiring Modal */}
      {isModalOpen && <HiringModal isOpen={isModalOpen} onClose={closeModal} />}
    </>
  );
};

export default About;