import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title = "Naeem Khan - Full Stack Developer", 
  description = "Passionate full-stack developer crafting digital experiences that blend innovation with functionality.", 
  keywords = "web developer, full stack, react, javascript, portfolio", 
  image = "/src/assets/My_pic.png"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;