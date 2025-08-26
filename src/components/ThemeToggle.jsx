import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  // Debug logs
  // console.log('Current theme is dark:', isDark);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-accent dark:bg-accent-light flex items-center p-1 cursor-pointer theme-transition"
      aria-label="Toggle theme"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        style={{ x: isDark ? 24 : 0 }}
      >
        {isDark ? (
          <FaSun className="text-white text-xs" />
        ) : (
          <FaMoon className="text-white text-xs" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;