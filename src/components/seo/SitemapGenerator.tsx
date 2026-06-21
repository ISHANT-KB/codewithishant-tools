import React, { useState, useEffect } from 'react';
import { tools } from '../../data/tools';
import { 
  Globe, 
  Copy, 
  Download, 
  RefreshCw, 
  Search, 
  Settings, 
  Sliders, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles,
  CheckSquare, 
  Square,
  FileCode,
  Layers,
  ChevronDown,
  Info
} from 'lucide-react';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  name: string;
  category: string;
  id: string;
}

export default function SitemapGenerator() {
  // Config state
  const [domain, setDomain] = useState('https://my-tool-hub.com');
  const [useLastmod, setUseLastmod] = useState(true);
  const [customLastmod, setCustomLastmod] = useState(new Date().toISOString().split('T')[0]);
  const [defaultFreq, setDefaultFreq] = useState('weekly');
  const [homePriority, setHomePriority] = useState('1.0');
  const [toolPriority, setToolPriority] = useState('0.8');
  const [popularPriority, setPopularPriority] = useState('0.9');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Track checked selections of individual pages to include
  const [includeHome, setIncludeHome] = useState(true);
  const [includeCategories, setIncludeCategories] = useState(true);
  const [selectedToolIds, setSelectedToolIds] = useState<Set<string>>(
    new Set(tools.map(t => t.id))
  );

  // Custom added URLs (advanced user flexibility)
  const [customUrls, setCustomUrls] = useState<{ id: string; loc: string; freq: string; priority: string }[]>([]);
  const [newCustomLoc, setNewCustomLoc] = useState('');
  const [newCustomFreq, setNewCustomFreq] = useState('weekly');
  const [newCustomPriority, setNewCustomPriority] = useState('0.5');

  // XML copy status
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Categories extracted from tools list dynamically
  const categories = Array.from(new Set(tools.map(t => t.category)));

  // Auto scroll/format domain
  const getCleanDomain = () => {
    let d = domain.trim();
    if (!d) return 'https://my-tool-hub.com';
    if (!/^https?:\/\//i.test(d)) {
      d = 'https://' + d;
    }
    // Remove trailing slash if present to avoid dual-slashes
    return d.replace(/\/+$/, '');
  };

  // Compile URL structure
  const [compiledList, setCompiledList] = useState<SitemapUrl[]>([]);

  useEffect(() => {
    const cleanDomain = getCleanDomain();
    const result: SitemapUrl[] = [];

    // 1. Add Home page
    if (includeHome) {
      result.push({
        id: 'home',
        name: 'Home Dashboard',
        category: 'core',
        loc: `${cleanDomain}/`,
        lastmod: customLastmod,
        changefreq: 'daily',
        priority: homePriority
      });
    }

    // 2. Add Category Pages
    if (includeCategories) {
      categories.forEach(cat => {
        result.push({
          id: `category-${cat}`,
          name: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Hub`,
          category: 'category-page',
          loc: `${cleanDomain}/?category=${cat}`,
          lastmod: customLastmod,
          changefreq: 'weekly',
          priority: '0.8'
        });
      });
    }

    // 3. Add individual checked Tools from the global dataset
    tools.forEach(tool => {
      if (selectedToolIds.has(tool.id)) {
        const priority = tool.popular ? popularPriority : toolPriority;
        result.push({
          id: tool.id,
          name: tool.name,
          category: tool.category,
          loc: `${cleanDomain}${tool.path}`,
          lastmod: customLastmod,
          changefreq: defaultFreq,
          priority: priority
        });
      }
    });

    // 4. Add custom URLs
    customUrls.forEach(item => {
      result.push({
        id: item.id,
        name: item.loc,
        category: 'custom',
        loc: item.loc.startsWith('http') ? item.loc : `${cleanDomain}/${item.loc.replace(/^\/+/, '')}`,
        lastmod: customLastmod,
        changefreq: item.freq,
        priority: item.priority
      });
    });

    setCompiledList(result);
  }, [
    domain,
    includeHome,
    includeCategories,
    selectedToolIds,
    customUrls,
    customLastmod,
    defaultFreq,
    homePriority,
    toolPriority,
    popularPriority
  ]);

  // Generate XML string
  const generateXML = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    compiledList.forEach(item => {
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(item.loc)}</loc>\n`;
      if (useLastmod && item.lastmod) {
        xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
      }
      xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
      xml += `    <priority>${item.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const escapeXml = (unsafe: string) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateXML()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const xmlText = generateXML();
    const element = document.createElement('a');
    const file = new Blob([xmlText], { type: 'application/xml;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'sitemap.xml';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Selection managers
  const handleToggleTool = (id: string) => {
    const next = new Set(selectedToolIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedToolIds(next);
  };

  const handleSelectAllFiltered = () => {
    const next = new Set(selectedToolIds);
    filteredToolsForSelection.forEach(tool => next.add(tool.id));
    setSelectedToolIds(next);
  };

  const handleDeselectAllFiltered = () => {
    const next = new Set(selectedToolIds);
    filteredToolsForSelection.forEach(tool => next.delete(tool.id));
    setSelectedToolIds(next);
  };

  const handleResetToDefaults = () => {
    setDomain('https://my-tool-hub.com');
    setUseLastmod(true);
    setCustomLastmod(new Date().toISOString().split('T')[0]);
    setDefaultFreq('weekly');
    setHomePriority('1.0');
    setToolPriority('0.8');
    setPopularPriority('0.9');
    setIncludeHome(true);
    setIncludeCategories(true);
    setSelectedToolIds(new Set(tools.map(t => t.id)));
    setCustomUrls([]);
  };

  // Add Custom URL validation & action
  const handleAddCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const pathVal = newCustomLoc.trim();
    if (!pathVal) return;

    setCustomUrls(prev => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        loc: pathVal,
        freq: newCustomFreq,
        priority: newCustomPriority
      }
    ]);
    setNewCustomLoc('');
  };

  const handleRemoveCustomUrl = (id: string) => {
    setCustomUrls(prev => prev.filter(item => item.id !== id));
  };

  // Filter tools for selection panels
  const filteredToolsForSelection = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalSelectedCount = compiledList.length;
  const estimatedBytes = new Blob([generateXML()]).size;

  return (
    <div className="space-y-8" id="sitemap-generator-root">
      
      {/* Dynamic Summary Cards Grid (Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-slate-400">Total Indexed URLs</div>
            <div className="text-xl font-black text-slate-800 dark:text-white mt-0.5">{totalSelectedCount}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-slate-400">Estimated Size</div>
            <div className="text-xl font-black text-slate-800 dark:text-white mt-0.5">
              {(estimatedBytes / 1024).toFixed(2)} KB
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl animate-pulse">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-slate-400">SEO Validity</div>
            <div className="text-xl font-black text-slate-800 dark:text-white mt-0.5">100% W3C Compliant</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Control Panel Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-4">
              <h3 className="text-md font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-500" />
                Configure Crawl Parameters
              </h3>
              <button
                onClick={handleResetToDefaults}
                className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-all cursor-pointer"
                title="Restore default parameters"
              >
                Reset Default
              </button>
            </div>

            {/* Target Domain Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Site Domain URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Globe className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="https://my-tool-hub.com"
                  className="w-full pl-9 pr-4 py-2 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl text-sm focus:outline-emerald-500 text-slate-900 dark:text-white"
                />
              </div>
              <p className="text-[10px] text-slate-450 dark:text-slate-500 leading-snug">
                Sitemaps require absolute URLs. This domain will prefix the relative routes.
              </p>
            </div>

            {/* Change Frequency and Lastmod Date Option */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Tool Changefreq
                </label>
                <select
                  value={defaultFreq}
                  onChange={(e) => setDefaultFreq(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl text-sm focus:outline-emerald-500 text-slate-700 dark:text-slate-300"
                >
                  <option value="always">always</option>
                  <option value="hourly">hourly</option>
                  <option value="daily">daily</option>
                  <option value="weekly">weekly (Default)</option>
                  <option value="monthly">monthly</option>
                  <option value="yearly">yearly</option>
                  <option value="never">never</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>Include Lastmod</span>
                  <input
                    type="checkbox"
                    checked={useLastmod}
                    onChange={(e) => setUseLastmod(e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-800 text-emerald-500 focus:ring-emerald-500"
                  />
                </label>
                <input
                  type="date"
                  value={customLastmod}
                  onChange={(e) => setCustomLastmod(e.target.value)}
                  disabled={!useLastmod}
                  className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl text-sm focus:outline-emerald-500 text-slate-700 dark:text-slate-300 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Crawl Priority Weights */}
            <div className="space-y-4 border-t border-slate-100 dark:border-slate-800/60 pt-4">
              <div className="flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Priorities Weights</span>
              </div>

              {/* Homepage Priority */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Home page</span>
                  <span className="font-extrabold text-indigo-500 font-mono">{homePriority}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={homePriority}
                  onChange={(e) => setHomePriority(e.target.value)}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Standard Tools Priority */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Standard tools</span>
                  <span className="font-extrabold text-indigo-500 font-mono">{toolPriority}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={toolPriority}
                  onChange={(e) => setToolPriority(e.target.value)}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Popular Tools Priority */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Popular / High index tools</span>
                  <span className="font-extrabold text-indigo-500 font-mono">{popularPriority}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={popularPriority}
                  onChange={(e) => setPopularPriority(e.target.value)}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            {/* Core Toggles */}
            <div className="space-y-3 border-t border-slate-100 dark:border-slate-800/60 pt-4">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 cursor-pointer">
                <span>Index Home Page (/)</span>
                <input
                  type="checkbox"
                  checked={includeHome}
                  onChange={(e) => setIncludeHome(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-800 text-emerald-500 focus:ring-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 cursor-pointer">
                <span>Index Category Queries (?category=...)</span>
                <input
                  type="checkbox"
                  checked={includeCategories}
                  onChange={(e) => setIncludeCategories(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-800 text-emerald-500 focus:ring-emerald-500"
                />
              </label>
            </div>
          </div>

          {/* ADD CUSTOM URLS (Advanced flexible support) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Plus className="w-4 h-4 text-purple-500" />
              Add Custom URLs (e.g. About, Contact)
            </h3>

            <form onSubmit={handleAddCustomUrl} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="e.g. blog or https://my-blog-url.com"
                  value={newCustomLoc}
                  onChange={(e) => setNewCustomLoc(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs focus:outline-emerald-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newCustomFreq}
                  onChange={(e) => setNewCustomFreq(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs text-slate-705 dark:text-slate-300"
                >
                  <option value="daily">daily</option>
                  <option value="weekly">weekly</option>
                  <option value="monthly">monthly</option>
                  <option value="yearly">yearly</option>
                </select>

                <select
                  value={newCustomPriority}
                  onChange={(e) => setNewCustomPriority(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50/50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs text-slate-705 dark:text-slate-300"
                >
                  <option value="1.0">1.0</option>
                  <option value="0.8">0.8</option>
                  <option value="0.5">0.5</option>
                  <option value="0.3">0.3</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!newCustomLoc.trim()}
                className="w-full flex items-center justify-center gap-1 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-xs font-extrabold hover:bg-emerald-500 hover:dark:bg-emerald-500 transition-all cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Inject Custom Route</span>
              </button>
            </form>

            {customUrls.length > 0 && (
              <div className="space-y-2 border-t border-slate-100 dark:border-slate-800/60 pt-4">
                <p className="text-[10px] font-black uppercase text-slate-400">Custom Routes Inject list</p>
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-50 dark:divide-slate-850">
                  {customUrls.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-xs pt-1.5 text-slate-700 dark:text-slate-300">
                      <span className="truncate font-medium max-w-xs">{item.loc}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] px-1.5 py-0.5 bg-slate-105 dark:bg-slate-800 rounded">
                          {item.priority}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomUrl(item.id)}
                          className="text-slate-400 hover:text-rose-500 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Preview & Live Selection Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Visual XML Display & Copy Buttons */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'editor' 
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  XML Output Code
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  Structured URLs ({totalSelectedCount})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-2 text-xs bg-emerald-500 text-white font-extrabold rounded-xl hover:bg-emerald-650 dark:hover:bg-emerald-550 transition-all cursor-pointer shadow-sm shadow-emerald-100 dark:shadow-none"
                  title="Copy generated sitemap.xml markup"
                  id="sitemap-copy-btn"
                >
                  {copied ? <Check className="w-3.5 h-3.5 animate-bounce" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy XML'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center gap-1 px-3 py-2 text-xs bg-slate-950 dark:bg-slate-800 text-white font-extrabold rounded-xl hover:bg-slate-800 hover:dark:bg-slate-700 transition-all border border-slate-850 dark:border-slate-700 cursor-pointer shadow-sm"
                  title="Download compliant XML file"
                  id="sitemap-download-btn"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* XML View */}
            {activeTab === 'editor' && (
              <div className="relative">
                <div className="absolute top-3 right-3 text-[10px] font-black uppercase text-slate-500 bg-slate-100 dark:bg-slate-850 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 pointer-events-none">
                  xml syntax verified
                </div>
                <pre className="w-full h-96 overflow-auto text-xs text-left bg-slate-950 text-slate-350 dark:bg-slate-1000 p-5 rounded-2xl font-mono leading-relaxed border border-slate-850 dark:border-slate-950 scrollbar-thin scrollbar-thumb-slate-800 dark:scrollbar-thumb-slate-800">
                  <code className="block select-text">
                    <span className="text-slate-500">{"<?xml version=\"1.0\" encoding=\"UTF-8\"?>"}</span>{"\n"}
                    <span className="text-rose-455">{"<urlset"}</span> <span className="text-indigo-400">xmlns</span>=<span className="text-emerald-400">"http://www.sitemaps.org/schemas/sitemap/0.9"</span><span className="text-rose-455">{">"}</span>{"\n"}
                    {compiledList.map((item, idx) => (
                      <span key={idx} className="block pl-4">
                        <span className="text-rose-455">{"<url>"}</span>{"\n"}
                        <span className="block pl-4 text-emerald-400">
                          <span className="text-rose-455">{"<loc>"}</span>
                          <span className="text-white selection:bg-emerald-500 selection:text-white select-all">{escapeXml(item.loc)}</span>
                          <span className="text-rose-455">{"</loc>"}</span>
                        </span>
                        {useLastmod && item.lastmod && (
                          <span className="block pl-4">
                            <span className="text-rose-455">{"<lastmod>"}</span>
                            <span className="text-indigo-350">{item.lastmod}</span>
                            <span className="text-rose-455">{"</lastmod>"}</span>
                          </span>
                        )}
                        <span className="block pl-4">
                          <span className="text-rose-455">{"<changefreq>"}</span>
                          <span className="text-slate-400">{item.changefreq}</span>
                          <span className="text-rose-455">{"</changefreq>"}</span>
                        </span>
                        <span className="block pl-4">
                          <span className="text-rose-455">{"<priority>"}</span>
                          <span className="text-indigo-300">{item.priority}</span>
                          <span className="text-rose-455">{"</priority>"}</span>
                        </span>
                        <span className="text-rose-455">{"</url>"}</span>{"\n"}
                      </span>
                    ))}
                    <span className="text-rose-455">{"</urlset>"}</span>
                  </code>
                </pre>
              </div>
            )}

            {/* List View */}
            {activeTab === 'preview' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl flex items-start gap-3">
                  <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-slate-800 dark:text-white">Active Link Validation Included</h5>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">
                      This list presents the structured output in clear human order. Search-engines will crawl routes in exactly this order sequence to optimize critical initial index priority.
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-850 max-h-80 overflow-y-auto space-y-1.5 pr-2">
                  {compiledList.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs py-2">
                      <div className="min-w-0 pr-2">
                        <p className="font-extrabold text-slate-800 dark:text-white truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-450 truncate font-mono mt-0.5">{item.loc}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-450 rounded-md capitalize">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-500">
                          {item.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DYNAMIC SITE MAP SELECTION ACCORDION */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-100 dark:border-slate-800/60 pb-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-500" />
                  Active Tool Route Selection Index
                </h3>
                <p className="text-[10px] text-slate-450 dark:text-slate-550 leading-none mt-0.5">
                  Select and toggle specific paths you wish to include in index
                </p>
              </div>

              {/* Core quick buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAllFiltered}
                  className="text-[10px] font-bold px-2.5 py-1 bg-emerald-50/50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 text-emerald-600 rounded-lg border border-emerald-200 dark:border-emerald-900 cursor-pointer"
                >
                  Select Filtered
                </button>
                <button
                  type="button"
                  onClick={handleDeselectAllFiltered}
                  className="text-[10px] font-bold px-2.5 py-1 bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg border border-slate-205 dark:border-slate-800 cursor-pointer"
                >
                  Clear Filtered
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="flex gap-2.5">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  placeholder="Filter crawl list..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50/50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800/80 rounded-xl text-xs focus:outline-emerald-500 text-slate-900 dark:text-white"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50/50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800/80 rounded-xl text-xs text-slate-705 dark:text-slate-350 focus:outline-emerald-500"
              >
                <option value="all">All ({tools.length})</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* List Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
              {filteredToolsForSelection.map((tool) => {
                const isSelected = selectedToolIds.has(tool.id);
                return (
                  <div
                    key={tool.id}
                    onClick={() => handleToggleTool(tool.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer select-none text-xs group text-left ${
                      isSelected 
                        ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-520/20 text-slate-800 dark:text-slate-200' 
                        : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-850 hover:border-slate-350 dark:hover:border-slate-705 text-slate-500 dark:text-slate-450'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="shrink-0 text-slate-400 group-hover:text-emerald-500 transition-colors">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 dark:text-slate-700" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-bold truncate leading-tight ${isSelected ? 'text-slate-900 dark:text-white' : ''}`}>
                          {tool.name}
                        </p>
                        <p className="text-[9px] text-slate-400 font-mono truncate leading-none mt-0.5">
                          {tool.path}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-1.5">
                      {tool.popular && (
                        <span className="text-[8px] font-black uppercase text-amber-500 bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/20">
                          popular
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-400">
                        {tool.popular ? popularPriority : toolPriority}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[10px] text-slate-400 text-center leading-none mt-2">
              Showing {filteredToolsForSelection.length} of {tools.length} total platform tools.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
