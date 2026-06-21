import { ReactNode, useState, useEffect } from 'react';
import { Tool, FAQItem } from '../types';
import { tools } from '../data/tools';
import { blogs } from '../lib/blogs';
import { Link } from '../lib/router';
import Breadcrumb from './Breadcrumb';
import SEOSection from './SEOSection';
import FAQSection from './FAQSection';
import LucideIcon from './LucideIcon';
import { Sparkles, Share2, Clipboard, Heart, ArrowRight, ShieldCheck, HelpCircle, X, ChevronLeft, ChevronRight, Layers, CheckCircle2, Star } from 'lucide-react';
import { TOURS_DATA } from '../data/tours';
import { getGuideForTool, getToolFaqs } from '../lib/seo-content';
import { useFavorites, addRecentlyViewed } from '../lib/user-store';

interface ToolLayoutProps {
  tool: Tool;
  children: ReactNode;
  explanation: ReactNode;
  howToUse: ReactNode;
  benefits: ReactNode;
  faqs: FAQItem[];
  keywords?: string[];
}

export default function ToolLayout({
  tool,
  children,
  explanation,
  howToUse,
  benefits,
  faqs,
  keywords = []
}: ToolLayoutProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(tool.id);

  useEffect(() => {
    addRecentlyViewed(tool.id);
  }, [tool.id]);

  // Suggest related tools (same category, excluding current)
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  // Suggest related blogs
  const relatedBlogs = blogs.slice(0, 2);

  // Fallback guides & FAQs via dynamic SEO engine (Requirement 3 & 10)
  const dynamicGuide = getGuideForTool(tool, {});
  const finalExplanation = explanation || dynamicGuide.introduction;
  const finalHowToUse = howToUse || dynamicGuide.howToUse;
  const finalBenefits = benefits || dynamicGuide.benefits;
  const finalFaqs = getToolFaqs(tool, faqs || []);

  const breadcrumbItems = [
    { name: tool.category.charAt(0).toUpperCase() + tool.category.slice(1), path: `/?cat=${tool.category}` },
    { name: tool.name, path: tool.path },
  ];

  // Guided Tour States
  const [tourActive, setTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = TOURS_DATA[tool.id] || [];
  const hasTour = tourSteps.length > 0;

  const [highlightCoords, setHighlightCoords] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const [floatingCoords, setFloatingCoords] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [floatPosition, setFloatPosition] = useState<string>('bottom');

  const startTour = () => {
    setCurrentStep(0);
    setTourActive(true);
  };

  const dismissTour = () => {
    setTourActive(false);
    localStorage.setItem(`tour-seen-${tool.id}`, 'true');
  };

  // Auto-launch tour for first-time users of specific tools
  useEffect(() => {
    if (hasTour) {
      const hasSeenTour = localStorage.getItem(`tour-seen-${tool.id}`);
      if (!hasSeenTour) {
        const timer = setTimeout(() => {
          startTour();
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [tool.id, hasTour]);

  // Position highlighting computations
  useEffect(() => {
    if (!tourActive || !hasTour) return;

    const updatePosition = () => {
      const step = tourSteps[currentStep];
      if (!step) return;

      const el = step.selector ? document.querySelector(step.selector) : null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        const timer = setTimeout(() => {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

          setHighlightCoords({
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
            width: rect.width,
            height: rect.height
          });

          // Compute tooltip position
          const margin = 16;
          const tooltipWidth = 320;
          const tooltipHeight = 175; // Approx description space

          let top = rect.bottom + scrollTop + margin;
          let left = rect.left + scrollLeft + (rect.width - tooltipWidth) / 2;
          const pos = step.position || 'bottom';

          if (pos === 'top') {
            top = rect.top + scrollTop - tooltipHeight - margin;
          } else if (pos === 'left') {
            top = rect.top + scrollTop + (rect.height - tooltipHeight) / 2;
            left = rect.left + scrollLeft - tooltipWidth - margin;
          } else if (pos === 'right') {
            top = rect.top + scrollTop + (rect.height - tooltipHeight) / 2;
            left = rect.right + scrollLeft + margin;
          }

          // Safety window boundaries
          if (left < margin) left = margin;
          if (left + tooltipWidth > window.innerWidth - margin) {
            left = window.innerWidth - tooltipWidth - margin;
          }
          if (top < margin) top = margin;

          setFloatingCoords({ top, left });
          setFloatPosition(pos);
        }, 220); // scrollframe allowance

        return () => clearTimeout(timer);
      } else {
        setHighlightCoords(null);
        setFloatingCoords(null);
        setFloatPosition('center');
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [tourActive, currentStep, tool.id, hasTour]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tool.name + " | UtilityHub",
        text: tool.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors py-6 px-4 sm:px-6 lg:px-8" id={`tool-layout-${tool.id}`}>
      {/* Dynamic SEO Head configuration with JSON-LD breadcrumbs & tools */}
      <SEOSection
        title={tool.name}
        description={tool.description}
        keywords={[tool.name, tool.category, "free tools", "online tool", "utility", ...keywords]}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": tool.name,
            "applicationCategory": `${tool.category}Application`,
            "operatingSystem": "All",
            "browserRequirements": "Requires JavaScript. Requires HTML5.",
            "description": tool.description,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        ]}
      />

      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        {/* Header Block Section */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-500/15">
                <LucideIcon name={tool.icon} className="w-7 h-7" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {tool.name}
              </h1>
            </div>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              {tool.description}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            {hasTour && (
              <button
                onClick={startTour}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm bg-indigo-50/60 hover:bg-indigo-100 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl transition-all cursor-pointer shadow-sm shadow-indigo-100 dark:shadow-none"
                id="tour-btn"
                title="Launch walk-through tour guide"
              >
                <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Guided Tour</span>
              </button>
            )}

            <button
              onClick={() => toggleFavorite(tool.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm border rounded-xl hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer ${
                isFav
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-sm'
                  : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-750 dark:text-slate-300 hover:border-slate-350 dark:hover:border-slate-700'
              }`}
              id="favorite-btn-tool"
              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={`w-4 h-4 ${isFav ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
              <span>{isFav ? 'Favorited' : 'Favorite'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-350 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer"
              id="share-btn-tool"
            >
              <Share2 className="w-4 h-4 text-slate-400" />
              <span>Share Tool</span>
            </button>
          </div>
        </header>

        {/* Primary Page Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main workspace Column: Interactive App & Article Body */}
          <main className="lg:col-span-8 space-y-8">
            
            {/* 1. Interface Wrapper Card */}
            <section
              className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 sm:p-8 relative overflow-hidden"
              id="interactive-app-stage"
            >
              {/* Micro decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />
              
              <div className="relative z-10">
                {children}
              </div>
            </section>

            {/* AD-PLACEHOLDER Top Banner */}
            <div className="bg-slate-100 dark:bg-slate-900/30 border border-slate-200/60 dark:border-slate-850/50 rounded-xl p-5 text-center text-xs text-slate-400 select-none">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Sponsored Advertisement Banner</span>
              <p className="mt-1">High Relevance monetization space reserved for context-tailored platforms.</p>
            </div>

            {/* 2. Structured Detailed Guide Section (Targeting 1000+ words of rich SEO prose) */}
            <article className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/30 border border-slate-200/80 dark:border-slate-805/70 rounded-2xl p-6 sm:p-8 leading-relaxed space-y-8">
              
              <section id="explanation-section" className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  What is the {tool.name}?
                </h2>
                <div className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed space-y-4">
                  {finalExplanation}
                </div>
              </section>

              <section id="how-to-use-section" className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <Clipboard className="w-5 h-5 text-blue-500" />
                  How to Use the {tool.name}
                </h2>
                <div className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed">
                  {finalHowToUse}
                </div>
              </section>

              <section id="benefits-section" className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <ShieldCheck className="w-5 h-5 text-purple-500" />
                  Key Features & Advantages
                </h2>
                <div className="text-sm sm:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
                  {finalBenefits}
                </div>
              </section>

              {/* Mathematical Formula or Logical Specification Section */}
              <section id="formula-section" className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-500" />
                  Mathematical Formula & Logical Specification
                </h2>
                <div className="text-sm sm:text-base leading-relaxed text-slate-650 dark:text-slate-350">
                  {dynamicGuide.formula}
                </div>
              </section>

              {/* Real-World Calculation Cases & Step-by-Step Examples Section */}
              <section id="examples-section" className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  Real-World Calculation Cases & Examples
                </h2>
                <div className="text-sm sm:text-base leading-relaxed text-slate-650 dark:text-slate-350">
                  {dynamicGuide.examples}
                </div>
              </section>

            </article>

            {/* 3. Central FAQ Section Accordion with structural data */}
            <FAQSection items={finalFaqs} />

          </main>

          {/* Right Sidebar Column: Related Tools, Blogs, Newsletter, Ads */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* AD-PLACEHOLDER Sidebar Square */}
            <div className="bg-slate-100 dark:bg-slate-900/30 border border-slate-200/60 dark:border-slate-850/50 rounded-2xl p-6 text-center text-xs text-slate-400 select-none h-64 flex flex-col justify-center items-center">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Sponsored Advertisement Block</span>
              <p className="mt-2 max-w-[200px] leading-relaxed">Boost CTR with optimal placement of local advertising partners.</p>
            </div>

            {/* Newsletter Container */}
            <div className="bg-gradient-to-br from-indigo-50/40 via-purple-50/10 to-transparent dark:from-indigo-950/15 dark:via-transparent dark:to-transparent border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
                Get Free Weekly Tools
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Join 15,000+ developers, marketers, and health experts who receive custom productivity utilities and calculators directly in their inbox.
              </p>
              
              <form className="mt-4 space-y-2" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-emerald-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Join Newsletter
                </button>
              </form>
            </div>

            {/* Related Tools suggestions */}
            <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                Related {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
              </h3>
              <div className="space-y-4">
                {relatedTools.map((rt) => (
                  <Link
                    key={rt.id}
                    href={rt.path}
                    className="group flex gap-3 p-2 rounded-xl border border-transparent hover:border-slate-150 dark:hover:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all"
                    id={`related-tool-${rt.id}`}
                  >
                    <div className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg shrink-0 group-hover:scale-105 transition-transform text-slate-500 dark:text-slate-400">
                      <LucideIcon name={rt.icon} className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 transition-colors line-clamp-1">
                        {rt.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {rt.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recommended Blog Guides */}
            <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                Educational Manuals & Guides
              </h3>
              <div className="space-y-4">
                {relatedBlogs.map((rb) => (
                  <Link
                    key={rb.slug}
                    href={`/blog/${rb.slug}`}
                    className="block group p-2 rounded-xl border border-transparent hover:border-slate-150 dark:hover:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all"
                    id={`related-blog-${rb.slug}`}
                  >
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      {rb.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-555 mt-1 leading-snug line-clamp-2">
                      {rb.title}
                    </h4>
                    <span className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
                      Read Article <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>

      {tourActive && hasTour && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden antialiased">
          {/* Backdrop screen mask */}
          <div 
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-[1px] transition-opacity duration-300"
            onClick={dismissTour}
          />

          {/* Active Highlight Ring */}
          {highlightCoords && (
            <div
              className="absolute border-4 border-indigo-500 rounded-3xl pointer-events-none transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.5)] z-[9998]"
              style={{
                top: highlightCoords.top - 8,
                left: highlightCoords.left - 8,
                width: highlightCoords.width + 16,
                height: highlightCoords.height + 16,
              }}
            >
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
              </span>
            </div>
          )}

          {/* Dialog bubble */}
          <div
            className="absolute z-[9999] transition-all duration-300"
            style={floatingCoords ? {
              top: floatingCoords.top,
              left: floatingCoords.left,
              width: '320px',
            } : {
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '345px',
            }}
          >
            <div className="bg-slate-900 border border-indigo-500/30 text-white rounded-3xl p-5 shadow-2xl flex flex-col space-y-4">
              
              {/* Stepper info line */}
              <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                  Feature Walkthrough • Step {currentStep + 1} of {tourSteps.length}
                </span>
                <button 
                  onClick={dismissTour}
                  className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
                  title="Close Guide"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Msg Title & Body */}
              <div className="space-y-1.5">
                <h4 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/25 text-[10px] font-black text-indigo-300 border border-indigo-500/20 text-center">
                    {currentStep + 1}
                  </span>
                  {tourSteps[currentStep].title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {tourSteps[currentStep].content}
                </p>
              </div>

              {/* Progress Steppers */}
              <div className="flex gap-1.5 py-1">
                {tourSteps.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 flex-1 ${
                      idx === currentStep ? 'bg-indigo-500' : idx < currentStep ? 'bg-indigo-400/40' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={dismissTour}
                  className="text-[11px] font-bold text-slate-400 hover:text-white transition cursor-pointer"
                >
                  Skip Guide
                </button>

                <div className="flex items-center gap-2">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="px-2.5 py-1.5 text-[11px] font-bold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-750/50 rounded-lg transition cursor-pointer flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3 h-3" /> Back
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep < tourSteps.length - 1) {
                        setCurrentStep(prev => prev + 1);
                      } else {
                        dismissTour();
                      }
                    }}
                    className="px-3.5 py-1.5 text-[11px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition cursor-pointer flex items-center gap-1 shadow-md shadow-indigo-600/10"
                  >
                    {currentStep < tourSteps.length - 1 ? (
                      <>Next <ChevronRight className="w-3 h-3" /></>
                    ) : (
                      'Finish'
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
