import { useState, useEffect, useRef } from 'react';
import { tools } from '../data/tools';
import { useFavorites, useRecentlyViewed, useRecentlyUsed } from '../lib/user-store';
import { useRouter } from '../lib/router';
import LucideIcon from './LucideIcon';
import { Search, Star, History, Sparkles, X, ChevronRight, CornerDownLeft, Command, HelpCircle } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { favoriteTools } = useFavorites();
  const { recentlyViewed } = useRecentlyViewed();
  const { recentlyUsed } = useRecentlyUsed();

  // Filter tools based on query
  const filteredTools = query.trim() === '' 
    ? [] 
    : tools.filter(tool => 
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase()) ||
        tool.category.toLowerCase().includes(query.toLowerCase())
      );

  // If search is empty, define standard fallback groups
  const trendingTools = tools.filter(t => t.popular).slice(0, 4);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle global and spatial keyboard inputs
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const listSize = filteredTools.length > 0 ? filteredTools.length : 0;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (listSize > 0) {
          setSelectedIndex(prev => (prev + 1) % listSize);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (listSize > 0) {
          setSelectedIndex(prev => (prev - 1 + listSize) % listSize);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (listSize > 0 && filteredTools[selectedIndex]) {
          const selected = filteredTools[selectedIndex];
          navigate(selected.path);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredTools, selectedIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (resultsRef.current) {
      const activeEl = resultsRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 md:px-0"
      id="global-command-palette-modal"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Main Palette box */}
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900/95 border border-slate-250 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        id="palette-shell"
      >
        {/* Search header container */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-150 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 relative">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type tool name, formulas, categories to find instant... (Arrow keys, Enter)"
            className="w-full bg-transparent text-sm font-medium text-slate-900 dark:text-white border-0 outline-none placeholder-slate-400 focus:ring-0 focus:outline-none"
          />
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/80 text-slate-400 hover:text-slate-700 dark:hover:text-slate-250 transition-colors"
            title="Close Search Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic results or shortcuts content body */}
        <div className="flex-grow overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          
          {query.trim() !== '' ? (
            <div className="space-y-2" ref={resultsRef}>
              <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest px-1.5 mb-2">
                <span>Matching Tools ({filteredTools.length})</span>
                <span className="flex items-center gap-1 font-mono hover:underline">
                  <CornerDownLeft className="w-3 h-3" /> Press Enter to navigate
                </span>
              </div>
              
              {filteredTools.length > 0 ? (
                filteredTools.map((tool, idx) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      navigate(tool.path);
                      onClose();
                    }}
                    data-active={idx === selectedIndex}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
                      idx === selectedIndex
                        ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:opacity-100 shadow-sm font-semibold'
                        : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-850/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2.5 rounded-xl border shrink-0 ${
                        idx === selectedIndex 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                          : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-450 dark:text-slate-500'
                      }`}>
                        <LucideIcon name={tool.icon} className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate">{tool.name}</p>
                        <p className="text-[10px] mt-0.5 truncate text-slate-450 dark:text-slate-450">{tool.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className="text-[9px] font-bold uppercase py-0.5 px-2 bg-slate-100 dark:bg-slate-950 text-slate-500 rounded-md border border-slate-200/50 dark:border-slate-800">
                        {tool.category}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${idx === selectedIndex ? 'translate-x-0.5 text-emerald-500' : 'text-slate-350'}`} />
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-10 space-y-2">
                  <div className="p-3 bg-rose-500/10 border border-rose-500/15 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-rose-500">
                    <X className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">No utilities matching "{query}"</h4>
                  <p className="text-xs text-slate-450 max-w-sm mx-auto leading-relaxed">
                    Check spelling criteria, clear search text, or explore default favorites and calculator nodes below.
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Curved segment layout for default states (favorites, recent, and popular)
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2" id="palette-default-bento">
              
              {/* Box 1: Favorites */}
              <div className="space-y-3 text-left">
                <h4 className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                  <span>Favorite Shortcuts ({favoriteTools.length})</span>
                </h4>
                {favoriteTools.length > 0 ? (
                  <div className="space-y-2 max-h-[220px] overflow-y-auto">
                    {favoriteTools.map(tool => (
                      <button
                        key={tool.id}
                        onClick={() => {
                          navigate(tool.path);
                          onClose();
                        }}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-slate-150 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/60 hover:border-emerald-500 hover:bg-emerald-550/5 transition-all text-left cursor-pointer group"
                      >
                        <div className="p-1.5 bg-white dark:bg-slate-950 rounded-lg text-slate-500 border border-slate-100 dark:border-slate-850 group-hover:text-emerald-500">
                          <LucideIcon name={tool.icon} className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 shrink-0 flex-grow">
                          <p className="text-xs font-bold leading-tight text-slate-850 dark:text-slate-200 group-hover:text-emerald-500">{tool.name}</p>
                          <p className="text-[9px] text-slate-450 capitalize mt-0.5">{tool.category}</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-350 transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-500">No favorites curated yet</p>
                    <p className="text-[9px] text-slate-400 leading-relaxed">
                      Click the star button on any tool card inside the catalog to populate this listing.
                    </p>
                  </div>
                )}
              </div>

              {/* Box 2: Recently Used/Viewed */}
              <div className="space-y-3 text-left">
                <h4 className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest flex items-center gap-1">
                  <History className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>Recently Used / Viewed</span>
                </h4>
                {recentlyViewed.length > 0 ? (
                  <div className="space-y-2">
                    {recentlyViewed.slice(0, 4).map(tool => (
                      <button
                        key={tool.id}
                        onClick={() => {
                          navigate(tool.path);
                          onClose();
                        }}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-slate-150 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/60 hover:border-blue-500 hover:bg-blue-500/5 transition-all text-left cursor-pointer group"
                      >
                        <div className="p-1.5 bg-white dark:bg-slate-950 rounded-lg text-slate-500 border border-slate-100 dark:border-slate-850 group-hover:text-blue-500">
                          <LucideIcon name={tool.icon} className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 shrink-0 flex-grow">
                          <p className="text-xs font-bold leading-tight text-slate-850 dark:text-slate-200 group-hover:text-blue-500">{tool.name}</p>
                          <p className="text-[9px] text-slate-450 capitalize mt-0.5">{tool.category}</p>
                        </div>
                        <span className="text-[8px] font-semibold text-slate-400 shrink-0">VIEWED</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-500 font-sans">History transparent</p>
                    <p className="text-[9px] text-slate-400 leading-relaxed font-sans">
                      Start exploring free calculators and converters online to log recent traversals.
                    </p>
                  </div>
                )}
              </div>

              {/* Row 2, Left: Trending */}
              <div className="space-y-3 text-left">
                <h4 className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0 animate-pulse" />
                  <span>Trending Modules</span>
                </h4>
                <div className="space-y-2">
                  {trendingTools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        navigate(tool.path);
                        onClose();
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-slate-150 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/60 hover:border-emerald-500 hover:bg-emerald-555/5 transition-all text-left cursor-pointer group"
                    >
                      <div className="p-1.5 bg-white dark:bg-slate-950 rounded-lg text-slate-500 border border-slate-100 dark:border-slate-850 group-hover:text-emerald-500">
                        <LucideIcon name={tool.icon} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 shrink-0 flex-grow">
                        <p className="text-xs font-bold leading-tight text-slate-850 dark:text-slate-200 group-hover:text-emerald-505">{tool.name}</p>
                        <p className="text-[9px] text-slate-450 capitalize mt-0.5">{tool.category}</p>
                      </div>
                      <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/15 tracking-wider uppercase shrink-0">HOT</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 2, Right: Keyboard Guide */}
              <div className="space-y-3 text-left" id="palette-shortcuts-ledger">
                <h4 className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>Shortcut Maps</span>
                </h4>
                
                <div className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-800 rounded-2xl h-full space-y-3.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Toggle Palette</span>
                    <kbd className="inline-flex h-5 items-center gap-0.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-1.5 font-mono text-[10px] font-bold text-slate-550 shadow-sm">
                      <Command className="w-2.5 h-2.5" /><span>K</span>
                    </kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Search Context</span>
                    <kbd className="inline-flex h-5 items-center gap-0.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-2 font-mono text-[10px] font-bold text-slate-550 shadow-sm">
                      <span>/</span>
                    </kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Reset Search</span>
                    <kbd className="inline-flex h-5 items-center gap-0.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-1.5 font-mono text-[10px] font-bold text-slate-550 shadow-sm">
                      <span>ESC</span>
                    </kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium font-sans">Navigate Nodes</span>
                    <span className="text-[10px] font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider font-mono">↑ ↓ Keys</span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer info strip */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border-t border-slate-150 dark:border-slate-800/80 px-5 py-3 flex items-center justify-between text-[11px] text-slate-450 dark:text-slate-500">
          <div className="flex items-center gap-1.5">
            <Command className="w-3.5 h-3.5" />
            <span>Search bar powered completely in the browser sandbox.</span>
          </div>
          <span className="font-mono text-[10px]">{tools.length} Modules Indexed</span>
        </div>
      </div>
    </div>
  );
}
