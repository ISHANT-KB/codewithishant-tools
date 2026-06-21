import { useState, useEffect, useRef } from 'react';
import { tools } from '../data/tools';
import { Link, useRouter } from '../lib/router';
import { Search, Moon, Sun, Monitor, Menu, X, ArrowRight, Zap, Check } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

export default function Navbar() {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'system';
  });
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  // Initialize and Sync Theme mode setting
  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (currentTheme: Theme) => {
      let isDark = false;
      if (currentTheme === 'system') {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        isDark = currentTheme === 'dark';
      }
      
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Sync click events outside both dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'dark':
        return <Moon className="w-5 h-5 text-emerald-400" />;
      case 'system':
      default:
        return <Monitor className="w-5 h-5 text-slate-500 dark:text-slate-400" />;
    }
  };

  const filteredTools = query.trim() === ''
    ? []
    : tools.filter((t) =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);

  const handleSearchSelect = (path: string) => {
    setQuery('');
    setQuery('');
    setShowSearchDropdown(false);
    navigate(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-150 dark:border-slate-900/80 transition-all duration-200" id="global-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* LOGO INDEX BRANDING */}
        <Link href="/" className="flex items-center gap-2 group shrink-0" id="nav-logo-link">
          <div className="p-2 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-base tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-550 transition-colors">
              UtilityHub
            </span>
            <span className="text-[9px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500 -mt-0.5">
              Free Utilities
            </span>
          </div>
        </Link>

        {/* SEARCH BAR TRIGGER BUTTON */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
          type="button"
          className="flex-grow max-w-sm mx-4 hidden md:flex items-center justify-between px-3.5 py-2 border border-slate-200 dark:border-slate-800 rounded-full bg-slate-100/50 dark:bg-slate-900/30 text-slate-400 hover:text-slate-500 hover:border-slate-300 dark:hover:border-slate-700 group text-left cursor-pointer transition-all"
          id="nav-search-trigger-btn"
          title="Search utilities (Ctrl+K)"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            <span className="text-xs font-medium text-slate-505 dark:text-slate-400">Search tools and utilities...</span>
          </div>
          <div className="flex items-center gap-1 select-none">
            <kbd className="inline-flex h-4.5 select-none items-center gap-0.5 rounded border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 px-1.5 font-mono text-[9px] font-bold text-slate-400 dark:text-slate-500 shadow-sm">
              <span>⌘</span><span>K</span>
            </kbd>
          </div>
        </button>

        {/* RIGHT SYSTEM ACTIONS */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile search trigger */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            type="button"
            className="md:hidden p-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer flex items-center justify-center"
            title="Search utilities"
            aria-label="Search utilities"
            id="mobile-search-trigger"
          >
            <Search className="w-5 h-5 text-slate-500" />
          </button>

          {/* Theme dropdown */}
          <div ref={themeMenuRef} className="relative" id="nav-theme-wrapper">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-705 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer flex items-center justify-center"
              aria-label="Theme preference picker"
              id="nav-theme-btn"
            >
              {renderThemeIcon()}
            </button>

            {showThemeMenu && (
              <div
                className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-100"
                id="nav-theme-menu"
              >
                {(['light', 'dark', 'system'] as Theme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTheme(t);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                      theme === t
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {t === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
                      {t === 'dark' && <Moon className="w-4 h-4 text-emerald-400" />}
                      {t === 'system' && <Monitor className="w-4 h-4 text-slate-500 dark:text-slate-400" />}
                      <span className="capitalize">{t}</span>
                    </div>
                    {theme === t && <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Knowledge Hub Link / Blog Index (Requirement 4 & 8) */}
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all"
            id="nav-blog-hub-link"
          >
            <span>Knowledge Hub</span>
          </Link>

          {/* Featured quick index link */}
          <Link
            href="/seo-report"
            className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2 bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 text-xs font-bold rounded-xl hover:opacity-90 active:scale-98 transition-all"
            id="nav-seo-report-link"
          >
            <span>SEO Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </nav>
  );
}
