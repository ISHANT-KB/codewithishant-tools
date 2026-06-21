import { useState, useEffect, ReactNode, useRef, lazy, Suspense } from 'react';
import { RouterProvider, useRouter, Link } from './lib/router';
import { tools } from './data/tools';
import { blogs } from './lib/blogs';
import { guides } from './data/guides';
import { faqs, fallbackFaqs } from './data/faqs';

// Layout Structural Elements
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToolLayout from './components/ToolLayout';
import CategoryGrid from './components/CategoryGrid';
import BlogCard from './components/BlogCard';
import SEOSection from './components/SEOSection';
import FAQSection from './components/FAQSection';

// Interactive Calculators (Lazy-loaded for Lighthouse Performance optimization)
const AgeCalculator = lazy(() => import('./components/calculators/AgeCalculator'));
const BMICalculator = lazy(() => import('./components/calculators/BMICalculator'));
const PercentageCalculator = lazy(() => import('./components/calculators/PercentageCalculator'));
const EMICalculator = lazy(() => import('./components/calculators/EMICalculator'));
const ScientificCalculator = lazy(() => import('./components/calculators/ScientificCalculator'));
const FreelanceRateCalculator = lazy(() => import('./components/calculators/FreelanceRateCalculator'));
const YouTubeEarningsCalculator = lazy(() => import('./components/calculators/YouTubeEarningsCalculator'));
const UpiEmiCalculator = lazy(() => import('./components/calculators/UpiEmiCalculator'));
const IndianIncomeTaxCalculator = lazy(() => import('./components/calculators/IndianIncomeTaxCalculator'));
const GSTCalculator = lazy(() => import('./components/calculators/GSTCalculator'));
const SipCalculator = lazy(() => import('./components/calculators/SipCalculator'));
const CgpaCalculator = lazy(() => import('./components/calculators/CgpaCalculator'));
const AttendanceCalculator = lazy(() => import('./components/calculators/AttendanceCalculator'));
const MarksPercentageCalculator = lazy(() => import('./components/calculators/MarksPercentageCalculator'));
const StudyTimeCalculator = lazy(() => import('./components/calculators/StudyTimeCalculator'));
const ExamCountdown = lazy(() => import('./components/calculators/ExamCountdown'));
const GpaPlanner = lazy(() => import('./components/calculators/GpaPlanner'));
const SemesterGradePredictor = lazy(() => import('./components/calculators/SemesterGradePredictor'));
const PomodoroTimer = lazy(() => import('./components/calculators/PomodoroTimer'));
const FDCalculator = lazy(() => import('./components/calculators/FDCalculator'));
const RDCalculator = lazy(() => import('./components/calculators/RDCalculator'));
const InflationCalculator = lazy(() => import('./components/calculators/InflationCalculator'));
const RetirementCalculator = lazy(() => import('./components/calculators/RetirementCalculator'));
const BreakEvenCalculator = lazy(() => import('./components/calculators/BreakEvenCalculator'));
const ProfitMarginCalculator = lazy(() => import('./components/calculators/ProfitMarginCalculator'));

// Interactive Converters (Lazy-loaded for Lighthouse Performance optimization)
const LengthConverter = lazy(() => import('./components/converters/LengthConverter'));
const TemperatureConverter = lazy(() => import('./components/converters/TemperatureConverter'));
const DataStorageConverter = lazy(() => import('./components/converters/DataStorageConverter'));

// Interactive Dev & Text Tools (Lazy-loaded for Lighthouse Performance optimization)
const Base64Tool = lazy(() => import('./components/devtools/Base64Tool'));
const PasswordGenerator = lazy(() => import('./components/devtools/PasswordGenerator'));
const WordCounter = lazy(() => import('./components/text/WordCounter'));
const MetaTagGenerator = lazy(() => import('./components/seo/MetaTagGenerator'));
const SitemapGenerator = lazy(() => import('./components/seo/SitemapGenerator'));
const JSONFormatter = lazy(() => import('./components/devtools/JSONFormatter'));
const JSONValidator = lazy(() => import('./components/devtools/JSONValidator'));
const RegexTester = lazy(() => import('./components/devtools/RegexTester'));
const UUIDGenerator = lazy(() => import('./components/devtools/UUIDGenerator'));
const HashGenerator = lazy(() => import('./components/devtools/HashGenerator'));
const URLEncoderDecoder = lazy(() => import('./components/devtools/URLEncoderDecoder'));
const ColorConverter = lazy(() => import('./components/devtools/ColorConverter'));
const JWTDecoder = lazy(() => import('./components/devtools/JWTDecoder'));

// Manual Blog Posts (Lazy-loaded for Lighthouse Performance optimization)
const BMIPost = lazy(() => import('./blog/BMIPost'));
const AgePost = lazy(() => import('./blog/AgePost'));
const PercentagePost = lazy(() => import('./blog/PercentagePost'));
const BlogIndex = lazy(() => import('./components/BlogIndex'));
const SeoReport = lazy(() => import('./components/SeoReport'));

// Lucide icon helper
import LucideIcon from './components/LucideIcon';
import { Info, Sparkles, BookOpen, Layers, Search, Pin, AlertCircle, ArrowLeft, X, History, Star, Eye } from 'lucide-react';
import CommandPalette from './components/CommandPalette';
import { useFavorites, useRecentlyViewed, useRecentlyUsed, useUsageHistory } from './lib/user-store';
import UserHub from './components/UserHub';

function ViewResolver() {
  const { pathname, navigate } = useRouter();

  // Search filter query state for the home dashboard
  const [homeSearch, setHomeSearch] = useState('');
  const [isCatalogLoading, setIsCatalogLoading] = useState(false);

  // Load local user-store data reactively
  const { favoriteTools } = useFavorites();
  const { recentlyViewed, clearRecentlyViewed, removeSingleRecentlyViewed } = useRecentlyViewed();
  const { recentlyUsed, clearRecentlyUsed, removeSingleRecentlyUsed } = useRecentlyUsed();
  const { history: usageHistory, clearUsageHistory, removeSingleUsageHistory } = useUsageHistory();

  useEffect(() => {
    setIsCatalogLoading(true);
    const timer = setTimeout(() => {
      setIsCatalogLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [homeSearch]);

  // 1. Resolve Blog routes manually as requested (wrapped in Suspense for dynamic chunking)
  if (pathname === '/blog') {
    return (
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500 font-sans gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          <p className="text-xs font-bold font-sans text-slate-500">Preparing Hub Workspace...</p>
        </div>
      }>
        <BlogIndex />
      </Suspense>
    );
  }
  if (pathname === '/seo-report' || pathname === '/seo-dashboard') {
    return (
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500 font-sans gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          <p className="text-xs font-bold font-sans text-slate-500">Preparing Metrics Audit...</p>
        </div>
      }>
        <SeoReport />
      </Suspense>
    );
  }
  if (pathname === '/blog/how-to-calculate-bmi') {
    return (
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500 font-sans gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          <p className="text-xs font-bold font-sans text-slate-500">Preparing Article...</p>
        </div>
      }>
        <BMIPost />
      </Suspense>
    );
  }
  if (pathname === '/blog/best-age-calculator-guide') {
    return (
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500 font-sans gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          <p className="text-xs font-bold font-sans text-slate-500">Preparing Article...</p>
        </div>
      }>
        <AgePost />
      </Suspense>
    );
  }
  if (pathname === '/blog/percentage-calculator-explained') {
    return (
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500 font-sans gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          <p className="text-xs font-bold font-sans text-slate-500">Preparing Article...</p>
        </div>
      }>
        <PercentagePost />
      </Suspense>
    );
  }

  // 2. Resolve Active Tool Routes dynamically
  if (pathname.startsWith('/tools/')) {
    const slug = pathname.replace('/tools/', '');
    const activeTool = tools.find((t) => t.slug === slug);

    if (activeTool) {
      // Fetch corresponding Guides prose text and FAQs
      const guide = guides[activeTool.id];
      const toolFaqs = faqs[activeTool.id] || fallbackFaqs;

      if (guide) {
        // Render Active Working Tools wrapped with ToolLayout
        let ToolComponent: ReactNode = null;

        switch (activeTool.id) {
          case 'age-calculator':
            ToolComponent = <AgeCalculator />;
            break;
          case 'bmi-calculator':
            ToolComponent = <BMICalculator />;
            break;
          case 'percentage-calculator':
            ToolComponent = <PercentageCalculator />;
            break;
          case 'loan-emi-calculator':
            ToolComponent = <EMICalculator />;
            break;
          case 'scientific-calculator':
            ToolComponent = <ScientificCalculator />;
            break;
          case 'length-converter':
            ToolComponent = <LengthConverter />;
            break;
          case 'temperature-converter':
            ToolComponent = <TemperatureConverter />;
            break;
          case 'data-storage-converter':
            ToolComponent = <DataStorageConverter />;
            break;
          case 'password-generator':
            ToolComponent = <PasswordGenerator />;
            break;
          case 'base64-encoder-decoder':
            ToolComponent = <Base64Tool />;
            break;
          case 'word-counter':
            ToolComponent = <WordCounter />;
            break;
          case 'meta-tag-generator':
            ToolComponent = <MetaTagGenerator />;
            break;
          case 'sitemap-generator':
            ToolComponent = <SitemapGenerator />;
            break;
          case 'json-formatter':
            ToolComponent = <JSONFormatter />;
            break;
          case 'json-validator':
            ToolComponent = <JSONValidator />;
            break;
          case 'regex-tester':
            ToolComponent = <RegexTester />;
            break;
          case 'uuid-generator':
            ToolComponent = <UUIDGenerator />;
            break;
          case 'hash-generator':
            ToolComponent = <HashGenerator />;
            break;
          case 'url-encoder-decoder':
            ToolComponent = <URLEncoderDecoder />;
            break;
          case 'color-converter':
            ToolComponent = <ColorConverter />;
            break;
          case 'jwt-decoder':
            ToolComponent = <JWTDecoder />;
            break;
          case 'freelance-rate-calculator':
            ToolComponent = <FreelanceRateCalculator />;
            break;
          case 'youtube-earnings-calculator':
            ToolComponent = <YouTubeEarningsCalculator />;
            break;
          case 'upi-emi-calculator':
            ToolComponent = <UpiEmiCalculator />;
            break;
          case 'indian-income-tax-calculator':
            ToolComponent = <IndianIncomeTaxCalculator />;
            break;
          case 'gst-calculator':
            ToolComponent = <GSTCalculator />;
            break;
          case 'sip-calculator':
            ToolComponent = <SipCalculator />;
            break;
          case 'cgpa-calculator':
            ToolComponent = <CgpaCalculator />;
            break;
          case 'attendance-calculator':
            ToolComponent = <AttendanceCalculator />;
            break;
          case 'marks-percentage-calculator':
            ToolComponent = <MarksPercentageCalculator />;
            break;
          case 'study-time-calculator':
            ToolComponent = <StudyTimeCalculator />;
            break;
          case 'exam-countdown':
            ToolComponent = <ExamCountdown />;
            break;
          case 'gpa-planner':
            ToolComponent = <GpaPlanner />;
            break;
          case 'semester-grade-predictor':
            ToolComponent = <SemesterGradePredictor />;
            break;
          case 'pomodoro-timer':
            ToolComponent = <PomodoroTimer />;
            break;
          case 'fd-calculator':
            ToolComponent = <FDCalculator />;
            break;
          case 'rd-calculator':
            ToolComponent = <RDCalculator />;
            break;
          case 'inflation-calculator':
            ToolComponent = <InflationCalculator />;
            break;
          case 'retirement-calculator':
            ToolComponent = <RetirementCalculator />;
            break;
          case 'break-even-calculator':
            ToolComponent = <BreakEvenCalculator />;
            break;
          case 'profit-margin-calculator':
            ToolComponent = <ProfitMarginCalculator />;
            break;
          default:
            ToolComponent = null;
        }

        if (ToolComponent) {
          return (
            <ToolLayout
              tool={activeTool}
              explanation={guide.explanation}
              howToUse={guide.howToUse}
              benefits={guide.benefits}
              faqs={toolFaqs}
              keywords={guide.keywords}
            >
              <Suspense fallback={
                <div className="flex flex-col items-center justify-center py-16 text-slate-500 dark:text-slate-400 font-sans gap-3 min-h-[300px]">
                  <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                  <p className="text-xs font-bold tracking-wide">Loading workspace...</p>
                </div>
              }>
                {ToolComponent}
              </Suspense>
            </ToolLayout>
          );
        }
      }

      // Render placeholders for other cataloged tools to fulfill 500+ tools structure index safely
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
          <SEOSection
            title={`${activeTool.name} Preview`}
            description={`Calculate or perform conversions with the ${activeTool.name} tool.`}
          />
          <div className="max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-5 shadow-sm">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/15 text-amber-500 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 pointer-events-none" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Scaling Preview</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              The <strong>{activeTool.name}</strong> has been structured inside our metadata and indexing schemas. It is currently being integrated into our next offline update pack.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500 hover:underline"
              id="back-home-preview"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Dashboard</span>
            </button>
          </div>
        </div>
      );
    }
  }

  // 3. Fallback: Render Main Home Dashboard index if path is not matched
  const popularTools = tools.filter((t) => t.popular);

  const displayedHomeTools = homeSearch.trim() === ''
    ? tools
    : tools.filter((t) =>
        t.name.toLowerCase().includes(homeSearch.toLowerCase()) ||
        t.description.toLowerCase().includes(homeSearch.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <SEOSection
        title="Free Online calculators,Converters & Dev Tools"
        description="Access free, high performance security friendly productivity tools including age calculators, BMI index grids, Base64 formatting converters, and sitemaps."
        keywords={["free online tools", "unit converters", "developer utils", "case converters", "emi lenders"]}
      />

      {/* Title Hero Block */}
      <section className="bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/10 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/5 border-b border-slate-150 dark:border-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="home-hero">
        <div className="absolute inset-0 bg-dotted-pattern opacity-10" />
        <div className="max-w-7xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="flex flex-wrap items-center justify-center gap-2 mb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Free Offline Utilities Suite</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-bold tracking-wider uppercase" id="dashboard-tools-counter">
              <Layers className="w-3.5 h-3.5" />
              <span>{tools.length} Dynamic Tech Tools</span>
            </div>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-tight">
            Simplify Your Work With <span className="text-emerald-500 font-sans">Zero-Error</span> Tools
          </h2>
          
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-650 dark:text-slate-400 leading-relaxed">
            Highly structured and blazing fast. Perform advanced clinical health checks, calculate loan percentages, prettify JSON codes, and compile SEO meta tags completely offline.
          </p>

          {/* Large Hero Search bar input */}
          <div className="max-w-lg mx-auto relative pt-4 transition-all duration-300 ease-in-out hover:scale-[1.01] focus-within:scale-[1.02] focus-within:max-w-[550px] focus-within:z-10 group rounded-2xl border border-transparent focus-within:border-emerald-500/20 dark:focus-within:border-emerald-400/20 focus-within:shadow-[0_20px_50px_rgba(16,185,129,0.12)] dark:focus-within:shadow-[0_20px_50px_rgba(52,211,153,0.18)]" id="hero-search-wrapper">
            <Search className="absolute left-4.5 top-8 w-5 h-5 text-slate-400 pointer-events-none transition-colors duration-300 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-450" />
            <input
              type="text"
              value={homeSearch}
              onChange={(e) => setHomeSearch(e.target.value)}
              placeholder={`Type keyword to filter ${tools.length} free tools instantly...`}
              className="w-full pl-12 pr-24 sm:pr-32 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 rounded-2xl shadow-lg shadow-slate-100/10 dark:shadow-none text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/25 dark:focus:border-emerald-400 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:shadow-2xl focus:shadow-emerald-500/10 dark:focus:shadow-emerald-500/15 transition-all duration-300 ease-in-out font-medium"
            />
            {!homeSearch && (
              <div className="absolute right-4 top-[24px] hidden sm:flex items-center gap-1.5 pointer-events-none select-none">
                <kbd className="inline-flex h-5.5 select-none items-center gap-0.5 rounded-md border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/80 px-1.5 font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500 shadow-sm">
                  <span>/</span>
                </kbd>
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-350 dark:text-slate-600 font-sans">or</span>
                <kbd className="inline-flex h-5.5 select-none items-center gap-0.5 rounded-md border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/80 px-1.5 font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500 shadow-sm">
                  <span>⌘</span><span>K</span>
                </kbd>
              </div>
            )}
            {homeSearch && (
              <button
                onClick={() => setHomeSearch('')}
                className="absolute right-3 top-[26px] p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
                id="btn-hero-search-clear"
                title="Clear filter text"
                aria-label="Clear filter text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Curated Interactive User local workspace hub component */}
          {homeSearch.trim() === '' && (
            <UserHub />
          )}

        </div>
      </section>

      {/* Featured / Popular Tools block banner */}
      {homeSearch.trim() === '' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="popular-tools-strip">
          <div className="flex items-center gap-2 mb-6">
            <Pin className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-455">Popular Utility Shortcuts</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {popularTools.map((pt) => {
              const bgClass = pt.category === 'calculators' ? 'bg-blue-500/5 hover:border-blue-500/35 border-slate-200' : 'bg-emerald-500/5 hover:border-emerald-500/35 border-slate-200';
              return (
                <Link
                  key={pt.id}
                  href={pt.path}
                  className="p-3.5 bg-white dark:bg-slate-900/25 border border-slate-200 dark:border-slate-800 rounded-xl text-center group hover:shadow-md transition-all flex flex-col items-center justify-center gap-2"
                  id={`popular-pill-${pt.id}`}
                >
                  <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg text-slate-500 dark:text-slate-400 group-hover:scale-105 transition-transform">
                    <LucideIcon name={pt.icon} className="w-5 h-5 text-slate-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-555 transition-colors line-clamp-1 leading-snug">
                    {pt.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Main utilities dashboard Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="main-catalog-grid">
        <div className="border-b border-slate-150 dark:border-slate-900/80 pb-6 mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white" id="utilities-title">
              Complete Utility Catalog
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Select a category to sort our specialized calculation nodes or search keywords instantly.
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-medium px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 select-none" id="catalog-tools-counter">
            <Info className="w-4 h-4" />
            <span>{tools.length} Full Tools Ready</span>
          </div>
        </div>

        {isCatalogLoading ? (
          <div className="space-y-8 animate-pulse" id="catalog-skeleton-container">
            {/* Mock Category Pills Skeleton */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none-style">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="h-11 w-32 bg-slate-200/60 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-full shrink-0"
                />
              ))}
            </div>

            {/* Mock Tools Grid Skeleton resembling ToolCard structure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[200px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-slate-200/60 dark:bg-slate-800/50 rounded-xl" />
                      <div className="w-5 h-5 bg-slate-200/60 dark:bg-slate-800/30 rounded-md" />
                    </div>
                    <div className="h-5 bg-slate-200/60 dark:bg-slate-800/50 rounded-md w-2/3 mb-3" />
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200/40 dark:bg-slate-800/20 rounded w-full" />
                      <div className="h-3 bg-slate-200/40 dark:bg-slate-800/20 rounded w-5/6" />
                    </div>
                  </div>
                  <div className="h-6 bg-slate-200/60 dark:bg-slate-800/40 rounded-full w-20 mt-5" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <CategoryGrid tools={displayedHomeTools} />
        )}
      </section>

      {/* Manual static blogs section */}
      {homeSearch.trim() === '' && (
        <section className="bg-slate-100/50 dark:bg-slate-950/40 border-y border-slate-150 dark:border-slate-900 py-16 px-4 sm:px-6 lg:px-8" id="home-blogs">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="max-w-2xl">
              <span className="block text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Educational Manuals
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-slate-900 dark:text-white mt-1">
                Latest Analytical Insights & Guides
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Unlock structural breakdowns behind leap year astronomical variations, the metabolic limits of WHO classifications, and percentage bookkeeping.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dashboard FAQs */}
      {homeSearch.trim() === '' && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="dashboard-faqs">
          <FAQSection
            items={[
              {
                question: "How do these tools run completely offline?",
                answer: "This is a key technical layout advantage of our platform. Every script, numerical converter, and formatting encoder is compiled entirely in client-side TypeScript. Once loaded, the browser processes all calculations locally without pinging servers."
              },
              {
                question: "Do you capture or log my input coordinates?",
                answer: "Never. Because calculations run entirely in the browser's local sandbox, no clipboard copy-pastes, passwords, age timelines, heights, or receipt costs are ever written to external servers or APIs."
              },
              {
                question: "Are there any volume limits on calculating?",
                answer: "Zero. You can generate hundreds of secure passwords, convert infinite metric measurements, or evaluate extensive word count spreadsheets with absolutely zero restrictions."
              }
            ]}
            title="General Platform FAQ"
            description="Clear answers regarding offline capabilities, data secure limits, and compatibility specs across folders."
          />
        </section>
      )}
    </div>
  );
}

export default function App() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Check for Ctrl+K or Cmd+K
      const isCmdK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
      
      // 2. Check for '/' key
      const isSlash = e.key === '/';

      if (isCmdK || isSlash) {
        // If '/' or Ctrl+K is pressed, verify we are not currently typing inside any text input element
        const active = document.activeElement;
        if (active && (
          active.tagName === 'INPUT' ||
          active.tagName === 'TEXTAREA' ||
          (active as HTMLElement).isContentEditable
        )) {
          return;
        }

        // Prevent default browser/form actions
        e.preventDefault();
        setIsPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-command-palette', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <RouterProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow">
          <ViewResolver />
        </div>
        <Footer />
        <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
      </div>
    </RouterProvider>
  );
}
