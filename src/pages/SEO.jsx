import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO component for managing page metadata and structured data
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords
 * @param {string} props.canonicalUrl - Canonical URL
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type
 * @param {Object} props.structuredData - JSON-LD structured data
 * @param {string} props.article - Article meta data for blog posts
 */
const SEO = ({
  title = 'Terrazzo Excellence - Premium Terrazzo Installation & Restoration',
  description = 'Expert terrazzo flooring installation, restoration, and maintenance services. Sustainable, beautiful terrazzo solutions for residential and commercial projects.',
  keywords = 'terrazzo flooring, terrazzo installation, terrazzo restoration',
  canonicalUrl,
  ogImage = '/assets/og-image.jpg',
  ogType = 'website',
  structuredData,
  article
}) => {
  const siteTitle = 'Terrazzo Excellence';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const siteUrl = 'https://terrazzoexcellence.com';

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl || `${siteUrl}${window.location.pathname}`} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl || `${siteUrl}${window.location.pathname}`} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article-specific meta tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          {article.tags && article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* JSON-LD structured data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;