import { useState, useEffect } from 'react';
import { Braces, Copy, Check, Trash2, ArrowDownUp, RefreshCw, ZoomIn, ZoomOut, Search } from 'lucide-react';
import ShareResults from '../ShareResults';

export default function JSONFormatter() {
  const [inputVal, setInputVal] = useState<string>('{\n  "serviceName": "UtilityHub Analytics",\n  "version": "4.2.1",\n  "status": "operational",\n  "database": {\n    "shards": 3,\n    "replicas": 2,\n    "tags": ["cloud", "replicated", "production"]\n  },\n  "metrics": {\n    "latencyMs": 14,\n    "uptimePct": 99.985,\n    "activeClients": 14028\n  }\n}');
  const [outputVal, setOutputVal] = useState<string>('');
  const [indentSize, setIndentSize] = useState<number>(2);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const formatJSON = (mode: 'prettify' | 'minify') => {
    setErrorText(null);
    if (!inputVal.trim()) {
      setOutputVal('');
      setHighlightedHtml('');
      return;
    }

    try {
      const parsedObj = JSON.parse(inputVal);
      if (mode === 'minify') {
        const minified = JSON.stringify(parsedObj);
        setOutputVal(minified);
      } else {
        const space = indentSize;
        const formatted = JSON.stringify(parsedObj, null, space);
        setOutputVal(formatted);
      }
    } catch (err: any) {
      setErrorText(err?.message || 'Invalid JSON format');
      setOutputVal('');
      setHighlightedHtml('');
    }
  };

  useEffect(() => {
    formatJSON('prettify');
  }, [inputVal, indentSize]);

  // Syntax highlighting logic for pre-rendered block
  useEffect(() => {
    if (!outputVal) {
      setHighlightedHtml('');
      return;
    }

    // Safety escaping
    let escaped = outputVal
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    if (searchQuery.trim()) {
      const escapedQuery = searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(${escapedQuery})`, 'gi');
      escaped = escaped.replace(
        regex,
        '<mark class="bg-yellow-400/30 text-yellow-200 border border-yellow-500/30 px-0.5 rounded">$1</mark>'
      );
    }

    setHighlightedHtml(escaped);
  }, [outputVal, searchQuery]);

  const handleCopy = async () => {
    if (!outputVal) return;
    try {
      await navigator.clipboard.writeText(outputVal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBeautifyRaw = () => {
    formatJSON('prettify');
  };

  const handleMinifyRaw = () => {
    formatJSON('minify');
  };

  const getByteSize = (str: string) => {
    return new Blob([str]).size;
  };

  const inputSize = getByteSize(inputVal);
  const outputSize = getByteSize(outputVal);
  const sizeReduction = inputSize > 0 ? (((inputSize - outputSize) / inputSize) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6" id="json-formatter-container">
      {/* Upper workspace layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Panel */}
        <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Raw JSON Input</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400">{inputSize} bytes</span>
              <button
                onClick={() => setInputVal('')}
                className="p-1 px-2 text-xs font-semibold text-rose-500 hover:bg-rose-500/5 hover:text-rose-600 rounded-md transition-all cursor-pointer flex items-center gap-1"
                title="Clear contents"
                id="btn-clear-json-formatter"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          <textarea
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full h-80 px-4 py-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
            placeholder="Paste your unformatted or minified JSON string here..."
            id="json-input"
          />

          <div className="flex flex-wrap gap-2.5 items-center justify-between">
            {/* Indent Configuration */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Spacing:</span>
              <div className="flex border border-slate-200 dark:border-slate-850 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900">
                {[2, 4].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setIndentSize(sz)}
                    className={`px-3 py-1 text-xs font-medium cursor-pointer transition-all ${
                      indentSize === sz
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    id={`btn-indent-${sz}`}
                  >
                    {sz} Spaces
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleMinifyRaw}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
                id="btn-minify"
              >
                <ArrowDownUp className="w-3.5 h-3.5" />
                <span>Minify</span>
              </button>

              <button
                onClick={handleBeautifyRaw}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold rounded-xl transition-all cursor-pointer"
                id="btn-beautify"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Format</span>
              </button>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Prettified Outputs</span>
              {sizeReduction !== '0' && parseFloat(sizeReduction) > 0 && (
                <span className="text-[10px] bg-red-500/10 text-red-500 font-bold px-1.5 py-0.5 rounded">
                  +{sizeReduction}% size inflated
                </span>
              )}
              {parseFloat(sizeReduction) < 0 && (
                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-1.5 py-0.5 rounded">
                  {sizeReduction}% size reduced
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-mono text-slate-400">{outputSize} bytes</span>
              <button
                onClick={handleCopy}
                disabled={!outputVal}
                className={`p-1 px-2.5 rounded-lg border text-[11px] font-bold cursor-pointer transition-all flex items-center gap-1 ${
                  copied
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                }`}
                id="btn-copy-formatted-json"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick search input to filter values */}
          {outputVal && (
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search highlighted elements/words inside formatted text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-lg text-xs font-sans text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none focus:ring-1 focus:ring-emerald-500/20"
                id="search-formatted-json"
              />
            </div>
          )}

          <div className="w-full h-80 bg-slate-50 dark:bg-slate-950/45 border border-slate-200 dark:border-slate-800 rounded-xl p-4 overflow-y-auto relative font-mono text-sm">
            {errorText ? (
              <div className="text-rose-500 flex flex-col items-center justify-center h-full space-y-2">
                <Braces className="w-8 h-8 opacity-20" />
                <span className="text-xs font-semibold text-center leading-relaxed">
                  JSON Syntax Error Encountered:<br />
                  <span className="text-rose-400 font-mono text-[11px] block mt-1">{errorText}</span>
                </span>
              </div>
            ) : outputVal ? (
              <pre 
                className="whitespace-pre text-emerald-600 dark:text-emerald-400 leading-relaxed text-xs selection:bg-emerald-500/20 selection:text-white"
                dangerouslySetInnerHTML={{ __html: highlightedHtml || outputVal }}
              />
            ) : (
              <div className="text-slate-400 flex flex-col items-center justify-center h-full space-y-1.5 text-xs text-center">
                <Braces className="w-10 h-10 stroke-1 opacity-25" />
                <span>Please fill raw JSON content to render.</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {outputVal && !errorText && (
        <ShareResults
          toolId="json-formatter"
          toolName="JSON Formatter & Prettifier"
          textToCopy={outputVal.substring(0, 500) + (outputVal.length > 500 ? '\n... [truncated]' : '')}
          shareUrlParams={{}}
          mainMetric={{
            label: 'Indentation Spaces',
            value: `${indentSize} spaces`,
            subLabel: `${outputVal.split('\n').length} Formatted Rows`,
            color: 'emerald'
          }}
          additionalMetrics={[
            { label: 'Uncompressed bytes size', value: `${outputSize} bytes` },
            { label: 'Line item rows count', value: `${outputVal.split('\n').length} rows` },
            { label: 'Calculated properties count', value: `${(outputVal.match(/":/g) || []).length} keys` },
            { label: 'Syntax nesting level depth', value: `${(outputVal.match(/\{/g) || []).length} objects` }
          ]}
        />
      )}
    </div>
  );
}
