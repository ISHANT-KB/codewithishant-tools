import { useState } from 'react';
import { blogs } from '../lib/blogs';
import { Link, useRouter } from '../lib/router';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOSection from './SEOSection';
import { Search, BookOpen, Clock, User, Calendar, ArrowRight, Sparkles, Filter } from 'lucide-react';

export default function BlogIndex() {
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(blogs.map(b => b.category)))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors flex flex-col" id="blog-index-page">
      <Navbar />

      <SEOSection
        title="Knowledge Hub & Educational Guides"
        description="Explore detailed calculative breakdowns, step-by-step mathematical procedures, system converters specs, and developer optimization manuals."
        keywords={["utility blogs", "bmi calculation guide", "leap year formulas", "percentage math explained"]}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Knowledge Hub & Educational Guides | UtilityHub",
            "description": "Explore detailed calculative breakdowns, step-by-step mathematical procedures, and developer optimization manuals.",
            "url": `${window.location.origin}/blog`
          }
        ]}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Banner header section */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-8 sm:p-12 text-left shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Dynamic education base
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              The UtilityHub <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Knowledge & Math Hub</span>
            </h1>
            <p className="text-slate-350 text-sm sm:text-base leading-relaxed">
              Unlock the core arithmetic, conversion guidelines, cryptographic protocols, and formatting specifications powering our extensive suite of productivity modules.
            </p>
          </div>
        </div>

        {/* Filters and search console */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Search bar */}
          <div className="md:col-span-6 relative" id="blog-search-wrapper">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides, authors or key terms..."
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/40 text-slate-900 dark:text-white focus:outline-emerald-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="md:col-span-6 flex flex-wrap gap-2 items-center justify-start md:justify-end">
            <span className="text-xs font-bold text-slate-405 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold capitalize rounded-xl border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 border-emerald-520 font-black shadow-sm'
                    : 'bg-white dark:bg-slate-900/30 text-slate-600 dark:text-slate-405 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-705'
                }`}
              >
                {cat === 'all' ? 'All Guides' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Catalog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.slug}
                className="group bg-white dark:bg-slate-900/30 border border-slate-205 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-705 transition-all flex flex-col justify-between h-full"
                id={`blog-card-${blog.slug}`}
              >
                <div className="space-y-4">
                  {/* Category tag */}
                  <span className="inline-block text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded-md border border-emerald-500/10">
                    {blog.category}
                  </span>

                  <div className="space-y-2 text-left">
                    <h3 className="text-base font-extrabold text-slate-850 dark:text-white group-hover:text-emerald-555 transition-all leading-snug line-clamp-2">
                      <Link href={`/blog/${blog.slug}`} className="hover:underline">
                        {blog.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-404 leading-relaxed line-clamp-3">
                      {blog.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-6 space-y-4">
                  {/* Author and Read time meta */}
                  <div className="flex justify-between items-center text-[10px] text-slate-450 font-medium">
                    <span className="flex items-center gap-1 truncate max-w-[120px]">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {blog.author}
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {blog.readTime}
                    </span>
                    <span className="flex items-center gap-1 shrink-0 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {blog.date}
                    </span>
                  </div>

                  {/* Read button */}
                  <button
                    onClick={() => navigate(`/blog/${blog.slug}`)}
                    className="w-full py-2.5 rounded-xl text-xs font-extrabold bg-slate-900 hover:bg-emerald-500 dark:bg-slate-800 hover:dark:bg-emerald-500 text-white hover:text-slate-950 transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                    id={`blog-btn-${blog.slug}`}
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900/10 border border-slate-205 dark:border-slate-800 rounded-3xl max-w-xl mx-auto space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
            <h4 className="text-base font-extrabold text-slate-800 dark:text-white">No Guides Match Your Terms</h4>
            <p className="text-xs text-slate-505 dark:text-slate-450 leading-relaxed max-w-sm mx-auto">
              Try adjusting your query, utilizing simpler parameters, or resetting categories filters. Over 60 free tools remain accessible on our primary page!
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-xs font-bold text-emerald-500 hover:underline hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
