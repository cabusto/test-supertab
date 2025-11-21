# Test Supertab Blog

A clean and modern Jekyll blog with the Cayman theme and Supertab integration.

## Features

- **Modern Design**: Uses the Cayman theme - a clean, responsive Jekyll theme with a beautiful gradient header
- **Blog Posts**: Multiple blog posts with easy navigation
- **Supertab Integration**: Custom paygate.js integration for content monetization
- **Responsive**: Mobile-friendly design that works on all devices
- **SEO Optimized**: Built-in SEO optimization with jekyll-seo-tag

## Theme

This site uses the [Cayman theme](https://github.com/pages-themes/cayman), a clean and modern theme for GitHub Pages with:
- Eye-catching gradient header (blue to teal)
- Clean, readable typography
- Responsive layout
- Professional appearance

## Local Development

To run this site locally:

```bash
# Install dependencies
bundle install

# Run Jekyll
bundle exec jekyll serve

# Visit http://localhost:4000
```

## Structure

- `_posts/` - Blog posts in Markdown format
- `_layouts/` - Custom layouts (default, post, supertab)
- `_includes/` - Custom includes (head-custom.html)
- `assets/` - Static assets (CSS, JavaScript, images)
- `index.md` - Homepage with blog post list

## Customizations

Custom styling has been added for:
- Enhanced post list formatting
- Back-to-home navigation on posts
- Improved date display
- Visual post separators

## Deployment

This site is configured for GitHub Pages deployment. Simply push to the main branch and GitHub Pages will automatically build and deploy the site.
