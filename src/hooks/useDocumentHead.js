import { useEffect } from 'react';

const useDocumentHead = ({ title, description, keywords }) => {
  useEffect(() => {
    // Update title
    document.title = title || 'Naeem Khan - Full Stack Developer';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || 'Passionate full-stack developer crafting digital experiences that blend innovation with functionality.';
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords || 'web developer, full stack, react, javascript, portfolio';
  }, [title, description, keywords]);
};

export default useDocumentHead;