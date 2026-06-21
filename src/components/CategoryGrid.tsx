import { useState } from 'react';
import { Tool } from '../types';
import ToolCard from './ToolCard';
import { LayoutGrid, Calculator, Ruler, Terminal, Type, Globe } from 'lucide-react';

interface CategoryGridProps {
  tools: Tool[];
  initialCategory?: string;
}

export default function CategoryGrid({ tools, initialCategory = 'all' }: CategoryGridProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const categories = [
    { id: 'all', name: 'All Tools', icon: LayoutGrid, count: tools.length },
    { id: 'calculators', name: 'Calculators', icon: Calculator, count: tools.filter(t => t.category === 'calculators').length },
    { id: 'converters', name: 'Converters', icon: Ruler, count: tools.filter(t => t.category === 'converters').length },
    { id: 'devtools', name: 'Dev Tools', icon: Terminal, count: tools.filter(t => t.category === 'devtools').length },
    { id: 'text', name: 'Text Tools', icon: Type, count: tools.filter(t => t.category === 'text').length },
    { id: 'seo', name: 'SEO Tools', icon: Globe, count: tools.filter(t => t.category === 'seo').length },
  ];

  const filteredTools = activeCategory === 'all'
    ? tools
    : tools.filter((tool) => tool.category === activeCategory);

  return (
    <div className="space-y-8" id="category-grid-container">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none-style scrollbar-thin scrollbar-thumb-slate-200">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 border select-none cursor-pointer ${
                isActive
                  ? 'bg-slate-900 border-slate-900 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-slate-950 shadow-md'
                  : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-400 hover:border-slate-350 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white'
              }`}
              id={`cat-pill-${cat.id}`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400 dark:text-slate-950' : 'text-slate-400 dark:text-slate-500'}`} />
              <span>{cat.name}</span>
              <span className={`text-xs ml-0.5 px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-slate-850 dark:bg-slate-900/30' : 'bg-slate-100 dark:bg-slate-800'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of cards with smooth container spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="tools-display-grid">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/40 dark:bg-slate-900/10">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No tools found matching this criteria.
          </p>
        </div>
      )}
    </div>
  );
}
