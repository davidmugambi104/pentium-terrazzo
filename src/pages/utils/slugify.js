/**
 * Convert a string to a URL-friendly slug
 * @param {string} text - Text to convert to slug
 * @returns {string} URL-friendly slug
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * Generate SEO-optimized slug for blog posts
 * @param {string} title - Blog post title
 * @returns {string} SEO-optimized slug
 */
export const generateBlogSlug = (title) => {
  return `/blog/${slugify(title)}`;
};