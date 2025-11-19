export const blogPosts = [
  {
    id: 1,
    title: 'How to Clean and Maintain Polished Terrazzo Floors',
    slug: 'how-to-clean-and-maintain-polished-terrazzo-floors',
    excerpt: 'Learn the proper techniques for cleaning and maintaining your terrazzo floors to keep them looking beautiful for decades.',
    content: `
# How to Clean and Maintain Polished Terrazzo Floors

Terrazzo flooring is renowned for its durability and timeless beauty, but proper maintenance is essential to preserve its polished appearance. As experts in **terrazzo installation and restoration**, we've compiled this comprehensive guide to help you maintain your floors.

## Understanding Terrazzo Composition

Before diving into maintenance, it's important to understand what terrazzo is made of. Traditional terrazzo consists of marble, quartz, granite, or glass chips embedded in a cement or epoxy binder. This composition makes it incredibly durable but also requires specific care.

### Why Proper Maintenance Matters

Regular **terrazzo maintenance** prevents:
- Surface etching from acidic cleaners
- Loss of shine from improper cleaning
- Staining from spills
- Damage from abrasive materials

## Daily Cleaning Routine

### Sweeping and Dust Mopping

**Frequency**: Daily or as needed

Use a soft-bristled broom or microfiber dust mop to remove loose dirt and debris. This prevents scratches from abrasive particles.

### Damp Mopping

**Frequency**: Weekly or as needed

\`\`\`javascript
// Terrazzo Maintenance Checklist
const terrazzoMaintenance = {
  daily: [
    'Sweep with soft-bristled broom',
    'Use microfiber dust mop',
    'Wipe up spills immediately'
  ],
  weekly: [
    'Damp mop with pH-neutral cleaner',
    'Check for stains or damage',
    'Dry thoroughly after cleaning'
  ],
  monthly: [
    'Deep clean with terrazzo-specific cleaner',
    'Inspect for wear patterns',
    'Apply protective sealant if needed'
  ],
  annually: [
    'Professional deep cleaning',
    'Assessment for restoration needs',
    'Polishing by certified technicians'
  ]
};
\`\`\`

## Choosing the Right Cleaning Products

### pH-Neutral Cleaners

Always use pH-neutral cleaners specifically designed for **terrazzo flooring**. Avoid:

- Vinegar solutions (too acidic)
- Ammonia-based cleaners
- Abrasive scrubbing powders
- Wax-based products

### Recommended Cleaning Solution

Mix a small amount of pH-neutral cleaner with warm water. Test any new cleaner in an inconspicuous area first.

## Dealing with Stains

### Common Stain Types and Solutions

1. **Oil-based stains**: Use a degreasing cleaner
2. **Organic stains**: Hydrogen peroxide solution
3. **Rust stains**: Commercial rust removers (test first)
4. **Ink stains**: Isopropyl alcohol

## Professional Maintenance Services

While daily maintenance can be handled by homeowners, **professional terrazzo polishing** and **terrazzo restoration** services are recommended annually or biannually for:

- Deep cleaning and stain removal
- Surface polishing to restore shine
- Crack repair and grout maintenance
- Sealing and protection

## Long-Term Preservation Tips

1. **Use protective pads** under furniture legs
2. **Place mats** at entrances to catch debris
3. **Avoid dragging** heavy objects across the surface
4. **Maintain consistent humidity** levels
5. **Schedule professional inspections** annually

## When to Consider Terrazzo Restoration

If your floors show signs of:
- Significant scratching or etching
- Loss of shine that cleaning can't restore
- Cracks or chips in the surface
- Stains that won't come out

It might be time for **terrazzo resurfacing** or complete **terrazzo restoration**.

## Conclusion

Proper **terrazzo care** ensures your floors remain beautiful and functional for generations. By following these maintenance guidelines and investing in professional **terrazzo polishing services** when needed, you can protect your investment and enjoy the timeless elegance of terrazzo flooring.

For complex maintenance issues or **terrazzo repair** needs, always consult with certified **terrazzo contractors near me** who specialize in **terrazzo restoration**.
    `,
    author: 'Maria Rodriguez',
    publishDate: '2024-01-15',
    modifiedDate: '2024-01-15',
    readTime: '8 min read',
    tags: ['terrazzo maintenance', 'how to clean terrazzo', 'polished terrazzo', 'terrazzo care'],
    featuredImage: '/assets/terrazzo-cleaning.jpg',
    altText: 'Professional cleaning and maintenance of polished terrazzo flooring'
  },
  {
    id: 2,
    title: 'Terrazzo vs Epoxy: Which Flooring is Right for You?',
    slug: 'terrazzo-vs-epoxy-which-flooring-is-right-for-you',
    excerpt: 'Compare the benefits, costs, and applications of terrazzo and epoxy flooring to make the best choice for your project.',
    content: `...` // Full content would continue similarly
  },
  // Additional 4 posts with similar structure
  {
    id: 3,
    title: 'Cost Breakdown: Terrazzo Installation per Square Foot',
    slug: 'cost-breakdown-terrazzo-installation-per-square-foot',
    excerpt: 'Complete guide to terrazzo installation costs, including factors that affect pricing and budget planning tips.',
    tags: ['terrazzo cost', 'terrazzo price per sq ft', 'terrazzo installation cost']
  },
  {
    id: 4,
    title: 'Top Terrazzo Design Ideas for Modern Homes',
    slug: 'top-terrazzo-design-ideas-for-modern-homes',
    excerpt: 'Discover innovative terrazzo design patterns and color combinations for contemporary residential spaces.',
    tags: ['terrazzo design ideas', 'terrazzo patterns', 'terrazzo colors']
  },
  {
    id: 5,
    title: 'How Terrazzo Supports Sustainable, Eco-Friendly Design',
    slug: 'how-terrazzo-supports-sustainable-eco-friendly-design',
    excerpt: 'Explore the environmental benefits of terrazzo flooring and its role in green building practices.',
    tags: ['terrazzo sustainability', 'terrazzo eco-friendly']
  },
  {
    id: 6,
    title: 'Guide to Resurfacing and Repairing Terrazzo',
    slug: 'guide-to-resurfacing-and-repairing-terrazzo',
    excerpt: 'Learn when and how to repair damaged terrazzo surfaces, from minor chips to complete resurfacing projects.',
    tags: ['terrazzo resurfacing', 'terrazzo repair', 'terrazzo restoration']
  }
];

export const getBlogPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentPostId, tags, limit = 3) => {
  return blogPosts
    .filter(post => 
      post.id !== currentPostId && 
      post.tags.some(tag => tags.includes(tag))
    )
    .slice(0, limit);
};