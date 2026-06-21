import { useState, useEffect } from 'react';
import { Search, Copy, Check, Info, FileText, CheckCircle, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';
import ShareResults from '../ShareResults';

interface MatchDetail {
  text: string;
  index: number;
  groups: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState<string>('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,})');
  const [flags, setFlags] = useState<{
    global: boolean;
    ignoreCase: boolean;
    multiline: boolean;
    dotAll: boolean;
  }>({
    global: true,
    ignoreCase: true,
    multiline: false,
    dotAll: false,
  });

  const [testText, setTestText] = useState<string>('Send contract proposals to sales@utilityhub.global or contact our technical support guys directly at devops@utilityhub.io for sandbox environment queries.');
  const [replaceText, setReplaceText] = useState<string>('[CONFIDENTIAL_EMAIL]');
  const [matches, setMatches] = useState<MatchDetail[]>([]);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [replacedOutput, setReplacedOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Quick patterns
  const loadedPresetPatterns = [
    { name: 'Email Address', pat: '([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,})', flag: { g: true, i: true, m: false, s: false }, replace: '[REDACTED_EMAIL]' },
    { name: 'Phone (US)', pat: '\\+?1?\\s*\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})', flag: { g: true, i: true, m: false, s: false }, replace: '[REDACTED_PHONE]' },
    { name: 'Numbers Only', pat: '\\d+', flag: { g: true, i: false, m: false, s: false }, replace: '#' },
    { name: 'URL Link', pat: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', flag: { g: true, i: true, m: false, s: false }, replace: '[LINK]' },
    { name: 'HTML Tags', pat: '<[^>]+>', flag: { g: true, i: true, m: false, s: false }, replace: '' }
  ];

  const handleApplyPreset = (preset: typeof loadedPresetPatterns[0]) => {
    setPattern(preset.pat);
    setFlags({
      global: preset.flag.g,
      ignoreCase: preset.flag.i,
      multiline: preset.flag.m,
      dotAll: preset.flag.s,
    });
    setReplaceText(preset.replace);
  };

  const getActiveFlagsStr = () => {
    let f = '';
    if (flags.global) f += 'g';
    if (flags.ignoreCase) f += 'i';
    if (flags.multiline) f += 'm';
    if (flags.dotAll) f += 's';
    return f;
  };

  useEffect(() => {
    setErrorText(null);
    setMatches([]);
    setReplacedOutput('');

    if (!pattern) return;

    try {
      const activeFlags = getActiveFlagsStr();
      const regex = new RegExp(pattern, activeFlags);

      // Perform matching
      const foundMatches: MatchDetail[] = [];
      
      if (flags.global) {
        let match;
        // Avoid infinite loop block safety
        let loopLimit = 0;
        while ((match = regex.exec(testText)) !== null && loopLimit < 500) {
          loopLimit++;
          foundMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
          // If regex matched empty string, increment index manually to prevent infinite loop
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = testText.match(regex);
        if (match) {
          foundMatches.push({
            text: match[0],
            index: match.index || 0,
            groups: match.slice(1)
          });
        }
      }

      setMatches(foundMatches);

      // Perform replace
      const rOut = testText.replace(regex, replaceText);
      setReplacedOutput(rOut);

    } catch (err: any) {
      setErrorText(err?.message || 'Invalid Regular Expression');
    }
  }, [pattern, flags, testText, replaceText]);

  // Generate HTML overlay with matched highlights
  const renderHighlightedText = () => {
    if (!testText) return 'Please type some text.';
    if (matches.length === 0 || errorText) {
      // Escape HTML safety
      return testText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Sort matches from end to beginning to replace without index displacement issues
    const sorted = [...matches].sort((a, b) => b.index - a.index);
    let output = testText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // To prevent overlapping double highlights, we can build character offset mappings inside the loop
    let textArr = Array.from(testText);
    
    // Build match character indices set
    const highlightIdxs = new Set<number>();
    matches.forEach(m => {
      for (let i = 0; i < m.text.length; i++) {
        highlightIdxs.add(m.index + i);
      }
    });

    // Instead of complex parsing, let us perform standard segment styling that is robust
    let resultHtml = '';
    let inSpan = false;

    for (let i = 0; i < testText.length; i++) {
      const char = testText[i].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const isMatched = highlightIdxs.has(i);

      if (isMatched && !inSpan) {
        resultHtml += '<span class="bg-yellow-400/20 text-yellow-600 dark:bg-emerald-500/10 dark:text-emerald-400 font-bold border border-emerald-500/20 px-0.5 rounded">';
        inSpan = true;
      } else if (!isMatched && inSpan) {
        resultHtml += '</span>';
        inSpan = false;
      }
      resultHtml += char;
    }
    if (inSpan) {
      resultHtml += '</span>';
    }

    return resultHtml;
  };

  const handleCopyReplaced = async () => {
    try {
      await navigator.clipboard.writeText(replacedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6" id="regex-tester-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Input Workspace Configuration */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Regex Definition Deck */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block pb-1">Regex Pattern Compiler</span>
            
            <div className="flex gap-2 items-center flex-wrap sm:flex-nowrap">
              <span className="text-slate-400 font-mono text-lg font-bold">/</span>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  placeholder="Insert pattern here... [e.g. ^[0-9]+]"
                  id="regex-pattern-input"
                />
              </div>
              <span className="text-slate-400 font-mono text-lg font-bold">/</span>
              <span className="font-mono text-emerald-500 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl text-xs font-bold flex-shrink-0">
                {getActiveFlagsStr() || 'no flags'}
              </span>
            </div>

            {/* Error Indicator */}
            {errorText && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs px-3.5 py-2.5 rounded-xl font-mono leading-relaxed">
                Syntax Error: {errorText}
              </div>
            )}

            {/* Flags Options checkboxes */}
            <div className="flex flex-wrap gap-4 pt-1 items-center justify-between border-t border-slate-100 dark:border-slate-850">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-350 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={flags.global}
                    onChange={(e) => setFlags({ ...flags, global: e.target.checked })}
                    className="rounded border-slate-300 dark:border-slate-800 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Global (g)</span>
                </label>

                <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-350 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={flags.ignoreCase}
                    onChange={(e) => setFlags({ ...flags, ignoreCase: e.target.checked })}
                    className="rounded border-slate-300 dark:border-slate-800 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Ignore Case (i)</span>
                </label>

                <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-350 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={flags.multiline}
                    onChange={(e) => setFlags({ ...flags, multiline: e.target.checked })}
                    className="rounded border-slate-300 dark:border-slate-800 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Multiline (m)</span>
                </label>

                <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-350 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={flags.dotAll}
                    onChange={(e) => setFlags({ ...flags, dotAll: e.target.checked })}
                    className="rounded border-slate-300 dark:border-slate-800 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Dot All (s)</span>
                </label>
              </div>

              {/* Utility Clear Preset buttons */}
              <button
                onClick={() => {
                  setPattern('');
                  setTestText('');
                }}
                className="text-[11px] font-bold text-slate-400 hover:text-slate-500 cursor-pointer"
                id="btn-regex-clear-all"
              >
                Reset All Fields
              </button>
            </div>
          </div>

          {/* Test Text Canvas Highlight */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block pb-1">Sample Text Test Bed</span>

            <textarea
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="w-full h-36 px-4 py-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
              placeholder="Write some sample text to evaluate against the compiled regex pattern..."
              id="regex-test-text"
            />

            {/* Overlap highlighted render */}
            <div className="bg-slate-100/50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850 font-mono text-xs text-slate-700 dark:text-slate-300 min-h-24 max-h-36 overflow-y-auto leading-relaxed">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Live Matching Overlay:</span>
              <div dangerouslySetInnerHTML={{ __html: renderHighlightedText() }} />
            </div>
          </div>

          {/* Replacement Segment */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block pb-1">Regex Text Replacer</span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 animate-pulse-once">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Replace Matching String With:</span>
                <input
                  type="text"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-55 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-xl text-slate-800 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
                  placeholder="e.g. [REDACTED]"
                  id="regex-replace-val"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Replacement Results Output:</span>
                  <button
                    onClick={handleCopyReplaced}
                    disabled={!replacedOutput}
                    className="text-[10px] font-extrabold text-emerald-500 hover:opacity-85 flex items-center gap-1 cursor-pointer"
                    id="btn-copy-regex-replace"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-slate-700 dark:text-slate-350 font-mono text-xs min-h-10 max-h-24 overflow-y-auto break-all">
                  {replacedOutput || 'No replacements applied.'}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Preset Patterns Deck & Match Insights */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Preset Buttons Grid */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-850 rounded-2xl p-5 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Common Presets Templates</span>
            
            <div className="flex flex-col gap-2">
              {loadedPresetPatterns.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(p)}
                  className="w-full text-left p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-850 hover:border-emerald-500/20 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer group"
                  id={`preset-r-${idx}`}
                >
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-250 group-hover:text-emerald-500 transition-all">{p.name}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">{p.pat}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Match statistics summary */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-850 rounded-2xl p-5 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Match Groups Metadata</span>

            {matches.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400 select-none">
                No active matches found. Verify pattern structures or sample text.
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                <span className="text-[10px] text-slate-500 block mb-1">Found {matches.length} matches:</span>
                
                {matches.slice(0, 10).map((m, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-2.5 rounded-lg text-xs leading-normal">
                    <div className="flex justify-between items-center font-mono">
                      <span className="text-emerald-500 font-bold bg-emerald-500/5 px-1 rounded">Match #{idx + 1}</span>
                      <span className="text-[10px] text-slate-400">Position: {m.index}</span>
                    </div>
                    <div className="font-mono font-semibold text-slate-800 dark:text-slate-200 mt-1 break-words">"{m.text}"</div>
                    {m.groups.length > 0 && (
                      <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-0.5">
                        <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Capture Groups:</span>
                        {m.groups.map((g, gIdx) => (
                          <div key={gIdx} className="font-mono text-[10px] text-slate-500 truncate">
                            Group {gIdx + 1}: <span className="font-semibold text-blue-400">"{g || 'empty'}"</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {matches.length > 10 && (
                  <div className="text-[10px] text-center text-slate-400 font-semibold pt-1">
                    ...and {matches.length - 10} more matches.
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {!errorText && (
        <ShareResults
          toolId="regex-tester"
          toolName="Regular Expression Tester"
          textToCopy={`Compiled Regex pattern: /${pattern}/${getActiveFlagsStr() || ''}. Found matches: ${matches.length}.`}
          shareUrlParams={{}}
          mainMetric={{
            label: 'Matches Spotted',
            value: `${matches.length}`,
            subLabel: 'Across testbed canvas',
            color: 'emerald'
          }}
          additionalMetrics={[
            { label: 'Flags Combination', value: getActiveFlagsStr() || 'none' },
            { label: 'Parsed Pattern Code', value: String(pattern).substring(0, 20) },
            { label: 'String Length processed', value: `${testText.length} characters` },
            { label: 'Replacements Rendered', value: `${(replaceText ? matches.length : 0)} matches` }
          ]}
        />
      )}
    </div>
  );
}
