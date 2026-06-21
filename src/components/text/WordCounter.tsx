import { useState, useEffect } from 'react';
import { Type, RefreshCw, Layers } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('Welcome to the All-in-One Utility Tools. Crafting rich, performant tools with pure Local Client-side states. Optimize your SEO headings, configure secure passwords, analyze word frequencies, and convert temperature units with extreme ease.');
  
  const [stats, setStats] = useState({
    words: 0,
    charsWithSpaces: 0,
    charsNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readTime: 0,
  });

  const [densityList, setDensityList] = useState<{ word: string; count: number; pct: number }[]>([]);

  useEffect(() => {
    analyzeText();
  }, [text]);

  const analyzeText = () => {
    const rawVal = text || '';
    
    // Character indices
    const charsWithSpaces = rawVal.length;
    const charsNoSpaces = rawVal.replace(/\s/g, '').length;

    // Word parsing
    const trimmed = rawVal.trim();
    const wordsArr = trimmed ? trimmed.split(/\s+/) : [];
    const words = wordsArr.length;

    // Sentence parsing
    const sentencesArr = rawVal.split(/[.!?]+/).filter(Boolean);
    const sentences = sentencesArr.length;

    // Paragraph splitting
    const paragraphsArr = rawVal.split(/\n+/).filter(Boolean);
    const paragraphs = paragraphsArr.length;

    // Read time (estimating average 200 words per minute)
    const readTime = Math.ceil(words / 200);

    setStats({
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readTime,
    });

    // Word density calculation
    // Clean words
    const cleanWords = wordsArr
      .map((w) => w.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''))
      .filter((w) => w && w.length > 2); // Exclude letters or simple glue words (like 'a', 'to', 'is')
    
    const freq: Record<string, number> = {};
    cleanWords.forEach((w) => {
      freq[w] = (freq[w] || 0) + 1;
    });

    const density = Object.entries(freq)
      .map(([word, count]) => ({
        word,
        count,
        pct: parseFloat(((count / cleanWords.length) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // display top 5 words

    setDensityList(density);
  };

  const handleReset = () => {
    setText('');
  };

  return (
    <div className="space-y-6" id="word-count-inner">
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Source Text Input
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          placeholder="Paste or type your editorial manuscript, text files, or metadata reviews here..."
          className="w-full p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-sm leading-relaxed focus:outline-emerald-500 text-slate-900 dark:text-slate-250"
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">Total text length is {stats.charsWithSpaces} chars.</span>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-655 font-bold px-3 py-1.5 border border-dashed border-red-200 rounded-lg cursor-pointer"
          id="btn-word-clear"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Clear Board</span>
        </button>
      </div>

      {/* Stats counters grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        <div className="bg-slate-50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-4 rounded-xl text-center">
          <span className="text-[10px] font-bold text-slate-455 block uppercase tracking-wide">Words</span>
          <span className="text-xl font-extrabold text-slate-950 dark:text-slate-100 font-mono">{stats.words}</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-4 rounded-xl text-center">
          <span className="text-[10px] font-bold text-slate-455 block uppercase tracking-wide flex-wrap leading-tight">Chars (With Spaces)</span>
          <span className="text-xl font-extrabold text-slate-950 dark:text-slate-100 font-mono">{stats.charsWithSpaces}</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-4 rounded-xl text-center">
          <span className="text-[10px] font-bold text-slate-455 block uppercase tracking-wide flex-wrap leading-tight">Chars (No Spaces)</span>
          <span className="text-xl font-extrabold text-slate-950 dark:text-slate-100 font-mono">{stats.charsNoSpaces}</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-4 rounded-xl text-center">
          <span className="text-[10px] font-bold text-slate-455 block uppercase tracking-wide">Sentences</span>
          <span className="text-xl font-extrabold text-slate-950 dark:text-slate-100 font-mono">{stats.sentences}</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-4 rounded-xl col-span-2 md:col-span-1 text-center">
          <span className="text-[10px] font-bold text-slate-455 block uppercase tracking-wide">Est. Read Time</span>
          <span className="text-xl font-extrabold text-slate-950 dark:text-slate-100 font-mono">{stats.readTime} min</span>
        </div>
      </div>

      {densityList.length > 0 && (
        <div className="mt-6 border-t border-slate-150 dark:border-slate-800/80 pt-5 space-y-3" id="density-log">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
            Top Keyword Density Usage (Excluding basic articles)
          </h4>
          <div className="bg-white dark:bg-slate-900/10 border border-slate-150 dark:border-slate-850 rounded-xl overflow-hidden divide-y divide-slate-150 dark:divide-slate-850/80">
            {densityList.map((d, i) => (
              <div key={d.word} className="p-3 text-xs flex justify-between items-center">
                <span className="font-mono text-slate-850 dark:text-slate-200 font-semibold">{d.word}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Used {d.count} times</span>
                  <span className="bg-emerald-500/10 border border-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded font-mono text-[10px]">
                    {d.pct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
