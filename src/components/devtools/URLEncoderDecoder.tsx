import { useState, useEffect } from 'react';
import { Link, Copy, Check, RefreshCw, Trash2, ArrowUpDown } from 'lucide-react';
import ShareResults from '../ShareResults';

export default function URLEncoderDecoder() {
  const [inputText, setInputText] = useState<string>('https://utilityhub.global/search?query=react framework & components&v=1.0.4');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [spaceRule, setSpaceRule] = useState<'rfc3986' | 'form'>('rfc3986'); // %20 vs +
  const [outputText, setOutputText] = useState<string>('');
  const [errorText, setErrorText] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const processText = () => {
    setErrorText(null);
    if (!inputText) {
      setOutputText('');
      return;
    }

    try {
      if (mode === 'encode') {
        let encoded = encodeURIComponent(inputText);
        if (spaceRule === 'form') {
          // encodeURIComponent encodes space as %20. If form style is active, convert to +
          encoded = encoded.replace(/%20/g, '+');
        }
        setOutputText(encoded);
      } else {
        let targetText = inputText;
        if (spaceRule === 'form') {
          // convert '+' characters to spaces before decoding
          targetText = targetText.replace(/\+/g, ' ');
        }
        const decoded = decodeURIComponent(targetText);
        setOutputText(decoded);
      }
    } catch (err: any) {
      setErrorText(err?.message || 'Malformed URL format. Ensure percentage symbols (%) are succeeded by valid hex characters.');
      setOutputText('');
    }
  };

  useEffect(() => {
    processText();
  }, [inputText, mode, spaceRule]);

  const handleToggleMode = () => {
    setInputText(outputText || inputText); // Swap flow
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6" id="url-encoder-decoder-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input panel block */}
        <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {mode === 'encode' ? 'Raw Payload Input' : 'Encoded URI Input'}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400">{inputText.length} chars</span>
              <button
                onClick={() => setInputText('')}
                className="p-1 px-2 text-xs font-semibold text-rose-500 hover:bg-rose-500/5 hover:text-rose-600 rounded-md transition-all cursor-pointer flex items-center gap-1"
                id="btn-clear-url"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-80 px-4 py-3 bg-slate-55 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-850 dark:text-slate-100 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
            placeholder={mode === 'encode' ? "Insert your text or URLs here to encode..." : "Insert percent encoded string here to decode..."}
            id="url-input-textarea"
          />

          <div className="flex flex-wrap gap-2 items-center justify-between">
            {/* Actions toggle and space selectors */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500">Space rule:</span>
              <div className="flex border border-slate-200 dark:border-slate-850 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900 text-xs">
                <button
                  onClick={() => setSpaceRule('rfc3986')}
                  className={`px-2.5 py-1 font-semibold cursor-pointer transition-all ${
                    spaceRule === 'rfc3986' ? 'bg-slate-900 dark:bg-slate-800 text-white font-bold' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                  id="space-rfc"
                >
                  %20 (RFC 3986)
                </button>
                <button
                  onClick={() => setSpaceRule('form')}
                  className={`px-2.5 py-1 font-semibold cursor-pointer transition-all ${
                    spaceRule === 'form' ? 'bg-slate-900 dark:bg-slate-800 text-white font-bold' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                  id="space-plus"
                >
                  + (Form Post)
                </button>
              </div>
            </div>

            <button
              onClick={handleToggleMode}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
              title="Switch encode / decode flow direction"
              id="btn-url-toggle-mode"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Convert to {mode === 'encode' ? 'Decode' : 'Encode'}</span>
            </button>
          </div>
        </div>

        {/* Output panel block */}
        <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {mode === 'encode' ? 'Encoded URI Results' : 'Decoded Text Results'}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400">{outputText.length} chars</span>
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className={`p-1 px-2.5 rounded-lg border text-[11px] font-bold cursor-pointer transition-all flex items-center gap-1 ${
                  copied
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                }`}
                id="btn-copy-url-output"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>
            </div>
          </div>

          <div className="w-full h-80 bg-slate-50 dark:bg-slate-950/45 border border-slate-200 dark:border-slate-800 rounded-xl p-4 overflow-y-auto relative font-mono text-sm select-all">
            {errorText ? (
              <div className="text-rose-500 flex flex-col items-center justify-center text-center h-full space-y-2">
                <Link className="w-8 h-8 opacity-20" />
                <span className="text-xs font-semibold leading-relaxed">
                  URL Decode Syntax Fault:<br />
                  <span className="text-rose-400 font-mono text-[11px] block mt-1">{errorText}</span>
                </span>
              </div>
            ) : outputText ? (
              <span className="text-emerald-600 dark:text-emerald-400 leading-relaxed text-xs break-all">
                {outputText}
              </span>
            ) : (
              <div className="text-slate-400 flex flex-col items-center justify-center h-full space-y-1 text-xs">
                <Link className="w-10 h-10 stroke-1 opacity-25" />
                <span>Output parsed stream will appear here.</span>
              </div>
            )}
          </div>

          <div className="text-[11px] leading-relaxed text-slate-500">
            <strong>Percentage Encoding Code Rule:</strong> Converts unsafe ASCII values into <code>%</code> followed by their corresponding hex equivalents. Double quotes, spaces, symbols, and non-ASCII character arrays represent primary targets.
          </div>
        </div>

      </div>

      {outputText && !errorText && (
        <ShareResults
          toolId="url-encoder-decoder"
          toolName="URL URI Encoder"
          textToCopy={outputText.substring(0, 300) + (outputText.length > 300 ? '...' : '')}
          shareUrlParams={{}}
          mainMetric={{
            label: 'Process Mode',
            value: mode.toUpperCase(),
            subLabel: `Finished conversion`,
            color: 'emerald'
          }}
          additionalMetrics={[
            { label: 'Space Formatting Scheme', value: spaceRule === 'form' ? 'Plus character (+)' : 'Percent-20 (%20)' },
            { label: 'Processed text length', value: `${inputText.length} chars` },
            { label: 'Transferred output string', value: `${outputText.length} chars` },
            { label: 'Variance Percent Ratio', value: `${(((outputText.length - inputText.length) / (inputText.length || 1)) * 100).toFixed(1)}%` }
          ]}
        />
      )}
    </div>
  );
}
