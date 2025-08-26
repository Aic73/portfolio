import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { trackEvent } from '../hooks/useAnalytics';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCode,
  FaMobile,
  FaDesktop,
  FaServer,
  FaFilter
} from 'react-icons/fa';

// Project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features user authentication, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "fullstack",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity application for managing tasks and projects with team collaboration features and real-time updates.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1139&q=80",
    technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
    category: "frontend",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Real-time weather application with 5-day forecast, location search, and interactive maps.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1165&q=80",
    technologies: ["JavaScript", "API Integration", "CSS3", "Chart.js"],
    category: "frontend",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false
  },
  {
    id: 4,
    title: "RESTful API Service",
    description: "A scalable backend service with authentication, database management, and third-party integrations.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80",
    technologies: ["Node.js", "Express", "MongoDB", "JWT"],
    category: "backend",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false
  },
  {
    id: 5,
    title: "Fitness Tracker Mobile App",
    description: "Cross-platform mobile application for tracking workouts, nutrition, and fitness progress.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
    category: "mobile",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "A responsive portfolio website with dark/light mode, animations, and project showcase.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1115&q=80",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    category: "frontend",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false
  }
];



const handleClick = (projectName) => {
  trackEvent('Project', 'Click', projectName);

};

const handleDemoClick = (projectName) => {
  trackEvent('Project', 'Live Demo Click', projectName);
};



const handleSourceCodeClick = (projectName) => {
  trackEvent('Project', 'Source Code Click', projectName);
};





const Projects = () => {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const filtersRef = useRef(null);

  // Close filters when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects', icon: <FaCode /> },
    { id: 'frontend', name: 'Frontend', icon: <FaDesktop /> },
    { id: 'backend', name: 'Backend', icon: <FaServer /> },
    { id: 'fullstack', name: 'Full Stack', icon: <FaCode /> },
    { id: 'mobile', name: 'Mobile', icon: <FaMobile /> },
  ];

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
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
            My <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Here are some of my recent works. Each project represents my skills and dedication to quality.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center"
          ref={filtersRef}
        >
          <div className="relative inline-block">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                isDark
                  ? 'bg-accent hover:bg-primary text-white'
                  : 'bg-gray-200 hover:bg-primary hover:text-white text-gray-700'
              }`}
            >
              <FaFilter className="text-sm" />
              <span>Filter Projects</span>
            </button>

            {/* Filter dropdown */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-full left-0 mt-2 py-2 rounded-lg shadow-lg z-10 min-w-[200px] ${
                    isDark ? 'bg-secondary border border-gray-700' : 'bg-white border border-gray-200'
                  }`}
                >
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setFilter(category.id);
                        setShowFilters(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-2 text-left transition-colors ${
                        filter === category.id
                          ? 'bg-primary text-white'
                          : isDark
                            ? 'hover:bg-accent text-gray-300'
                            : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="text-sm">{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Active filter indicator */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  filter === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : isDark
                      ? 'bg-accent text-gray-300 hover:bg-primary/80'
                      : 'bg-gray-200 text-gray-700 hover:bg-primary/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
                className={`group rounded-xl overflow-hidden border ${
                  isDark 
                    ? 'bg-secondary border-gray-700' 
                    : 'bg-white border-gray-200 shadow-md hover:shadow-lg'
                } transition-all duration-300 hover:-translate-y-2`}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white text-gray-900 rounded-full"
                        aria-label="View live project"
                      >
                        <FaExternalLinkAlt size={16} />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white text-gray-900 rounded-full"
                        aria-label="View source code"
                      >
                        <FaGithub size={16} />
                      </motion.a>
                    )}
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-5">
                  <h3 className={`text-xl font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${
                          isDark
                            ? 'bg-accent text-gray-300'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex justify-between items-center">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 text-sm font-medium ${
                          isDark 
                            ? 'text-primary hover:text-orange-400' 
                            : 'text-primary hover:text-orange-600'
                        }`}
                      >
                        <FaExternalLinkAlt size={12} />
                        Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 text-sm font-medium ${
                          isDark 
                            ? 'text-gray-400 hover:text-white' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <FaGithub size={14} />
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className={`text-xl font-medium mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              No projects found
            </h3>
            <p className={isDark ? 'text-gray-500' : 'text-gray-400'}>
              Try selecting a different filter category
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Interested in seeing more of my work?
          </p>
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-primary hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/20"
          >
            <FaGithub size={18} />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;