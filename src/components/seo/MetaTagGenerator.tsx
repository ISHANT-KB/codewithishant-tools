import { useState } from 'react';
import { BadgeInfo, Copy, Sparkles, RefreshCw } from 'lucide-react';

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('My Online Tool Hub');
  const [description, setDescription] = useState('Free web based calculators, metrics calculators, encoding generators, and unit converters in a fast application workspace.');
  const [keywords, setKeywords] = useState('calculators, converters, unit converter, meta tags, password generator');
  const [author, setAuthor] = useState('Alex Carter');
  const [robots, setRobots] = useState('index, follow');
  const [ogType, setOgType] = useState('website');
  const [ogImage, setOgImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600');
  
  const [copied, setCopied] = useState(false);

  const generateHTML = (): string => {
    return `<!-- Secondary Search Optimization tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">
<meta name="robots" content="${robots}">

<!-- Facebook Open Graph Protocols -->
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${window.location.origin}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${ogImage}">

<!-- Twitter Social Protocols -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${window.location.origin}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${ogImage}">`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateHTML()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => {
    setTitle('My Online Tool Hub');
    setDescription('Free web based calculators, metrics calculators, encoding generators, and unit converters in a fast application workspace.');
    setKeywords('calculators, converters, unit converter, meta tags, password generator');
    setAuthor('Alex Carter');
    setRobots('index, follow');
    setOgType('website');
    setOgImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600');
  };

  return (
    <div className="space-y-6" id="meta-tag-inner">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Form parameters */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Site / Page Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-emerald-500 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Site / Page Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-emerald-500 text-slate-900 dark:text-slate-250"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Keywords (comma-separated list)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-emerald-500 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-emerald-500 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Robots Directives
              </label>
              <select
                value={robots}
                onChange={(e) => setRobots(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-emerald-500 text-slate-755 dark:text-slate-300"
              >
                <option value="index, follow">index, follow (Standard Default)</option>
                <option value="noindex, follow">noindex, follow (Skip results catalog)</option>
                <option value="index, nofollow">index, nofollow (Lock outbound paths)</option>
                <option value="noindex, nofollow">noindex, nofollow (Complete Private)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                OG Type Protocol
              </label>
              <select
                value={ogType}
                onChange={(e) => setOgType(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-emerald-500 text-slate-755 dark:text-slate-300"
              >
                <option value="website">website (Standard)</option>
                <option value="article">article (Scientific/Document)</option>
                <option value="profile">profile (Biography/CV)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                OG Banner Preview URL
              </label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-emerald-500 text-slate-900 dark:text-white text-xs truncate"
              />
            </div>
          </div>
        </div>

        {/* Generated output editor */}
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Output Header Blocks</span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-500 transition-colors"
              id="btn-meta-reset"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset parameters</span>
            </button>
          </div>
          <div className="relative">
            <pre className="w-full p-4 border border-slate-200 dark:border-slate-800 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto whitespace-pre leading-relaxed h-[360px]">
              {generateHTML()}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute right-3 bottom-3 px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
              id="btn-meta-copy"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'COPIED!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
