import * as React from 'react';
import { Tool } from '../types';
import { Link } from '../lib/router';
import LucideIcon from './LucideIcon';
import { ArrowUpRight, Star } from 'lucide-react';
import { useFavorites } from '../lib/user-store';

interface ToolCardProps {
  tool: Tool;
  key?: any;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(tool.id);

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'calculators':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/30';
      case 'converters':
        return 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/30';
      case 'devtools':
        return 'text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-900/30';
      case 'text':
        return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/30';
      case 'seo':
        return 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900/30';
      default:
        return 'text-slate-500 bg-slate-50 dark:bg-slate-950/40 border-slate-100 dark:border-slate-900/30';
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(tool.id);
  };

  return (
    <Link
      href={tool.path}
      className="group relative bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-100 dark:hover:shadow-none hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
      id={`tool-card-${tool.id}`}
    >
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-radial from-slate-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 dark:from-slate-800/20 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl border ${getCategoryTheme(tool.category)} transition-transform duration-300 group-hover:scale-105`}>
            <LucideIcon name={tool.icon} className="w-6 h-6" />
          </div>
          
          <div className="flex items-center gap-1.5">
            {/* Star Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              type="button"
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isFav 
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-500 shadow-sm' 
                  : 'bg-slate-50 dark:bg-slate-850 hover:bg-amber-500/10 border-slate-200 dark:border-slate-800/80 hover:border-amber-500/20 text-slate-400 hover:text-amber-500'
              }`}
              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={`w-4 h-4 ${isFav ? 'fill-amber-500' : ''}`} />
            </button>

            <span className="text-slate-300 dark:text-slate-700 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors p-2">
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
          {tool.name}
        </h3>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-2 mt-5">
        <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${getCategoryTheme(tool.category)}`}>
          {tool.category}
        </span>
        {tool.popular && (
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Popular
          </span>
        )}
      </div>
    </Link>
  );
}
