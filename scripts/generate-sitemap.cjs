const fs = require('fs');
const path = require('path');

function generateSitemap() {
  console.log('--- Initializing Automated Sitemap compiler ---');
  
  const rootDir = path.join(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  
  // Ensure the /public directory exists for Vite target static copying
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('Created /public asset directory at root');
  }

  const toolsFile = path.join(rootDir, 'src/data/tools.ts');
  const blogsFile = path.join(rootDir, 'src/lib/blogs.ts');

  let toolsContent = '';
  try {
    toolsContent = fs.readFileSync(toolsFile, 'utf8');
  } catch (err) {
    console.error('Error reading tools file:', err.message);
    return;
  }

  // Extract tool paths dynamically using regular expression matching (bypassing compilation errors)
  const paths = ['/']; // include root home
  const regex = /path:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(toolsContent)) !== null) {
    if (!paths.includes(match[1])) {
      paths.push(match[1]);
    }
  }

  // Also parse blogs list
  let blogsContent = '';
  try {
    blogsContent = fs.readFileSync(blogsFile, 'utf8');
    const blogSlugRegex = /slug:\s*['"]([^'"]+)['"]/g;
    let blogMatch;
    while ((blogMatch = blogSlugRegex.exec(blogsContent)) !== null) {
      const blogPath = `/blog/${blogMatch[1]}`;
      if (!paths.includes(blogPath)) {
        paths.push(blogPath);
      }
    }
  } catch (err) {
    console.warn('Could not parse blogs list for sitemap:', err.message);
  }

  // Add search categories to crawl list
  const categories = ['calculators', 'converters', 'devtools', 'text', 'seo'];
  categories.forEach(cat => {
    paths.push(`/?category=${cat}`);
  });

  const domain = 'https://my-tool-hub.com'; // Default production domain placeholder
  const lastmod = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  paths.forEach(route => {
    const isHome = route === '/';
    const isCategory = route.includes('?category=');
    const priority = isHome ? '1.0' : isCategory ? '0.8' : '0.9';
    const changefreq = isHome ? 'daily' : 'weekly';

    xml += `  <url>\n`;
    xml += `    <loc>${domain}${route}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`Successfully generated dynamic sitemap comprising ${paths.length} nodes at /public/sitemap.xml`);
  console.log('--- Sitemap compiler finished ---');
}

generateSitemap();
