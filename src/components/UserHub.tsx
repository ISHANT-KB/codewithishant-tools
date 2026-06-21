import { useState } from 'react';
import { useFavorites, useRecentlyViewed, useUsageHistory } from '../lib/user-store';
import { Link } from '../lib/router';
import LucideIcon from './LucideIcon';
import { Star, Eye, History, Trash2, Sparkles, X, ChevronRight, Bookmark } from 'lucide-react';

export default function UserHub() {
  const { favoriteTools, toggleFavorite } = useFavorites();
  const { recentlyViewed, clearRecentlyViewed, removeSingleRecentlyViewed } = useRecentlyViewed();
  const { history: usageHistory, clearUsageHistory, removeSingleUsageHistory } = useUsageHistory();
  
  const [activeTab, setActiveTab] = useState<'favorites' | 'viewed' | 'history'>(
    favoriteTools.length > 0 ? 'favorites' : recentlyViewed.length > 0 ? 'viewed' : 'history'
  );

  // If there's literally no local activity, hide the container to avoid clutter
  if (favoriteTools.length === 0 && recentlyViewed.length === 0 && usageHistory.length === 0) {
    return (
      <div className="max-w-3xl mx-auto pt-6 pb-2 text-center" id="user-hub-empty">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 text-[11px] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Local session initiated. Star tools to curate your personalized workspace!</span>
        </div>
      </div>
    );
  }

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const diff = Date.now() - date.getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return 'Just now';
      if (mins < 60) return `${mins}m ago`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `${hours}h ago`;
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <div 
      className="max-w-3xl mx-auto pt-8 border-t border-slate-200/60 dark:border-slate-800/60 mt-10 space-y-6 text-left" 
      id="user-interactive-hub-panel"
    >
      {/* Header and Tab Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-black text-slate-905 dark:text-white tracking-tight flex items-center gap-1.5 uppercase">
            <span>My Local Workspace Control</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-none font-medium">
            Privacy-first browser-local data log
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl self-start sm:self-auto">
          {favoriteTools.length > 0 && (
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === 'favorites'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-350'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${activeTab === 'favorites' ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>Bookmarks ({favoriteTools.length})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('viewed')}
            className={`px-3 py-1.5 text-[11px] font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'viewed'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-350'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-blue-500" />
            <span>Recently Viewed ({recentlyViewed.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 text-[11px] font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-350'
            }`}
          >
            <History className="w-3.5 h-3.5 text-emerald-500" />
            <span>Activity Log ({usageHistory.length})</span>
          </button>
        </div>
      </div>

      {/* Dynamic Tab Body */}
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/85 rounded-2xl p-4 sm:p-5 shadow-sm min-h-[170px] relative overflow-hidden flex flex-col justify-between">
        
        {/* TAB 1: BOOKMARKS */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 pb-2">
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Bookmarked Utilities</span>
              <span className="text-[9px] text-slate-450 dark:text-slate-500">Fast load channels linked</span>
            </div>

            {favoriteTools.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {favoriteTools.map(tool => (
                  <div key={tool.id} className="group relative">
                    <Link
                      href={tool.path}
                      className="flex items-center gap-3 p-3 bg-slate-50/50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-555 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/5 transition-all text-left"
                    >
                      <div className="p-2 bg-white dark:bg-slate-950 text-slate-500 rounded-lg group-hover:scale-105 group-hover:text-emerald-500 border border-slate-100 dark:border-slate-900 transition-all shrink-0">
                        <LucideIcon name={tool.icon} className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      </div>
                      <div className="min-w-0 flex-grow pr-4">
                        <p className="text-xs font-bold text-slate-850 dark:text-slate-200 truncate group-hover:text-emerald-500 transition-colors">
                          {tool.name}
                        </p>
                        <p className="text-[9px] text-slate-450 capitalize mt-0.5 truncate">{tool.category}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-350 transform group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>

                    {/* Small overlay favorited remover */}
                    <button
                      onClick={() => toggleFavorite(tool.id)}
                      className="absolute right-4.5 top-3.5 p-1 rounded hover:bg-rose-500/10 text-slate-350 hover:text-rose-500 cursor-pointer transition-colors"
                      title="Remove Bookmark"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-450">
                <Bookmark className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                <p className="text-xs font-semibold">No Bookmarks Selected</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RECENTLY VIEWED */}
        {activeTab === 'viewed' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 pb-2">
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Recently Visited Utilities</span>
              <button
                onClick={clearRecentlyViewed}
                className="text-[10px] font-bold text-slate-450 hover:text-rose-500 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" /> Clear History
              </button>
            </div>

            {recentlyViewed.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {recentlyViewed.map(tool => (
                  <div key={tool.id} className="relative group shrink-0">
                    <Link
                      href={tool.path}
                      className="inline-flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900 border border-slate-250/70 dark:border-slate-800 rounded-xl hover:border-blue-500 hover:bg-blue-500/5 transition-all"
                    >
                      <div className="p-1 bg-white dark:bg-slate-950 text-slate-450 rounded-md border border-slate-100 dark:border-slate-850">
                        <LucideIcon name={tool.icon} className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left pr-4">
                        <p className="text-xs font-bold text-slate-850 dark:text-slate-200 group-hover:text-blue-500 truncate max-w-[120px]">{tool.name}</p>
                      </div>
                    </Link>
                    
                    <button
                      onClick={() => removeSingleRecentlyViewed(tool.id)}
                      className="absolute top-1.5 right-1.5 p-1 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-slate-400 hover:text-slate-750 dark:hover:text-white rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-sm text-[9px]"
                      title="Clear from recents"
                    >
                      <X className="w-2 h-2" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-450">
                <Eye className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                <p className="text-xs font-semibold">No tools viewed this session yet</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: OPERATION HISTORY LOG */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 pb-2">
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Calculation & Task Feed</span>
              {usageHistory.length > 0 && (
                <button
                  onClick={clearUsageHistory}
                  className="text-[10px] font-bold text-slate-450 hover:text-rose-500 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Clear Logs
                </button>
              )}
            </div>

            {usageHistory.length > 0 ? (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {usageHistory.map(entry => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between gap-4 p-3 bg-slate-50/50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850/80 rounded-xl"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">
                        <LucideIcon name={entry.toolIcon} className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Link href={entry.toolPath} className="text-xs font-bold text-slate-900 dark:text-white hover:text-emerald-550 transition-colors">
                            {entry.toolName}
                          </Link>
                          <span className="text-[9px] font-medium text-slate-450 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200/50 dark:border-slate-700">
                            Calculation
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 italic font-medium break-words leading-tight">
                          "{entry.detail}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-[9px] text-slate-400 shrink-0 font-mono">
                        {formatTime(entry.timestamp)}
                      </span>
                      <button
                        onClick={() => removeSingleUsageHistory(entry.id)}
                        className="p-1 rounded text-slate-350 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer transition-colors"
                        title="Delete log entry"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-450">
                <History className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                <p className="text-xs font-semibold">Activity log empty</p>
                <p className="text-[10px] text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                  Trigger calculations (such as submitting form results or encoding data) inside any workspace to log local calculations as logs here.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
