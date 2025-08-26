import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { trackEvent } from '../hooks/useAnalytics';

import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    

     trackEvent('Contact', 'Form Submission', 'Contact Form Submitted');
     
    // Simulate form submission
    try {
      // In a real application, you would send the data to your backend here
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Clear status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const socialLinks = [
    { icon: <FaGithub size={20} />, url: 'https://github.com', label: 'GitHub' },
    { icon: <FaLinkedin size={20} />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaTwitter size={20} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram size={20} />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaWhatsapp size={20} />, url: 'https://wa.me/923350595282', label: 'WhatsApp' },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
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
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Have a project in mind or want to discuss opportunities? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-6">Let's talk</h3>
            <p className={`mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              I'm currently available for freelance work and full-time opportunities. 
              If you have a project that you want to get started or think you need my help 
              with something, then get in touch.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full mt-1 ${
                  isDark ? 'bg-accent text-primary' : 'bg-primary/10 text-primary'
                }`}>
                  <FaEnvelope size={18} />
                </div>
                <div>
                  <h4 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Email
                  </h4>
                  <a 
                    href="mailto:aicnaeem73@gmail.com" 
                    className={`hover:text-primary transition-colors ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    aicnaeem73@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full mt-1 ${
                  isDark ? 'bg-accent text-primary' : 'bg-primary/10 text-primary'
                }`}>
                  <FaPhone size={18} />
                </div>
                <div>
                  <h4 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Phone
                  </h4>
                  <a 
                    href="tel:+923350595282" 
                    className={`hover:text-primary transition-colors ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    +92 335 0595282
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full mt-1 ${
                  isDark ? 'bg-accent text-primary' : 'bg-primary/10 text-primary'
                }`}>
                  <FaMapMarkerAlt size={18} />
                </div>
                <div>
                  <h4 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Location
                  </h4>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Pakistan
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Follow me on
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-full transition-colors duration-300 ${
                      isDark 
                        ? 'bg-accent hover:bg-primary text-white' 
                        : 'bg-gray-200 hover:bg-primary text-gray-700 hover:text-white'
                    }`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className={`rounded-2xl p-6 ${
              isDark 
                ? 'bg-secondary border border-gray-700' 
                : 'bg-white border border-gray-200 shadow-lg'
            }`}>
              <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label 
                      htmlFor="name" 
                      className={`block mb-2 font-medium ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                        isDark 
                          ? 'bg-accent border-gray-700 text-white' 
                          : 'bg-gray-100 border-gray-300 text-gray-800'
                      }`}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="email" 
                      className={`block mb-2 font-medium ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                        isDark 
                          ? 'bg-accent border-gray-700 text-white' 
                          : 'bg-gray-100 border-gray-300 text-gray-800'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label 
                    htmlFor="subject" 
                    className={`block mb-2 font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                      isDark 
                        ? 'bg-accent border-gray-700 text-white' 
                        : 'bg-gray-100 border-gray-300 text-gray-800'
                    }`}
                    placeholder="What's this about?"
                  />
                </div>

                <div className="mb-6">
                  <label 
                    htmlFor="message" 
                    className={`block mb-2 font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                      isDark 
                        ? 'bg-accent border-gray-700 text-white' 
                        : 'bg-gray-100 border-gray-300 text-gray-800'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary hover:bg-orange-600'
                  } text-white shadow-lg hover:shadow-primary/20`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Submission Status */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-3 rounded-lg text-center ${
                      submitStatus === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {submitStatus === 'success'
                      ? '✅ Message sent successfully! I\'ll get back to you soon.'
                      : '❌ Something went wrong. Please try again.'}
                  </motion.div>
                )}
              </form>
            </div>

            {/* Additional Info */}
            <div className={`mt-6 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <p className="text-sm">
                ⚡ Typically respond within 2-4 hours during business days
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;