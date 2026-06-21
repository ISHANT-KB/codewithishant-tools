import { useState } from 'react';
import { Terminal, RefreshCw, Copy, ArrowRightLeft } from 'lucide-react';

export default function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [inputVal, setInputVal] = useState('Build elegant client tools instantly.');
  const [outputVal, setOutputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const processText = () => {
    setErrorMsg('');
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(inputVal)));
        setOutputVal(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(inputVal.trim())));
        setOutputVal(decoded);
      }
    } catch (e) {
      setErrorMsg('Invalid character string detected. Please ensure input format is valid for translation.');
      setOutputVal('');
    }
  };

  const handleSwap = () => {
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
    setInputVal(outputVal || '');
    setOutputVal('');
    setErrorMsg('');
  };

  const handleCopy = () => {
    if (!outputVal) return;
    navigator.clipboard.writeText(outputVal).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setInputVal('');
    setOutputVal('');
    setErrorMsg('');
  };

  return (
    <div className="space-y-6" id="base64-calc-inner">
      {/* Tab headers selecting base encode decode modes */}
      <div className="flex border-b border-slate-150 dark:border-slate-800" role="tablist">
        <button
          onClick={() => { setMode('encode'); setErrorMsg(''); setOutputVal(''); }}
          className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            mode === 'encode'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          id="btn-b64-tab-encode"
        >
          Base64 Encoder
        </button>
        <button
          onClick={() => { setMode('decode'); setErrorMsg(''); setOutputVal(''); }}
          className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            mode === 'decode'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          id="btn-b64-tab-decode"
        >
          Base64 Decoder
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* INPUT BOX AREA */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {mode === 'encode' ? 'Raw Text String Input' : 'Base64 Encoded Source'}
          </label>
          <textarea
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            rows={8}
            placeholder={mode === 'encode' ? 'Type or paste normal characters...' : 'e.g. QnVpbGQgZWxlZ2FudCBjbGllbnQgdG9vbHMgaW5zdGFudGx5Lg=='}
            className="w-full p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-sm font-mono focus:outline-emerald-500 text-slate-900 dark:text-slate-200"
          />
        </div>

        {/* OUTPUT BOX AREA */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {mode === 'encode' ? 'Base64 Translated Output' : 'Decoded String Output'}
          </label>
          <div className="relative">
            <textarea
              value={outputVal}
              readOnly
              rows={8}
              placeholder="Result will display here..."
              className="w-full p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 rounded-xl text-sm font-mono text-slate-800 dark:text-slate-250 cursor-text"
            />
            {outputVal && (
              <button
                onClick={handleCopy}
                className="absolute right-3 bottom-3 px-3.5 py-2 bg-slate-900/90 dark:bg-slate-850/90 text-white rounded-lg text-xs font-semibold hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/15 text-red-600 dark:text-red-450 p-4 rounded-xl text-xs font-medium" id="b64-error">
          {errorMsg}
        </div>
      )}

      {/* Button Controls and utility toggles */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={processText}
          className="px-6 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
          id="btn-b64-trigger"
        >
          <Terminal className="w-4 h-4" />
          <span>{mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}</span>
        </button>

        <button
          onClick={handleSwap}
          className="p-3 border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-semibold"
          title="Swap inputs"
          id="btn-b64-swap"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleClear}
          className="p-3 border border-red-200/40 dark:border-red-950/20 bg-white dark:bg-slate-950 text-red-500 hover:text-red-600 dark:hover:text-red-400 rounded-xl hover:bg-red-50/20 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-semibold xl:ml-auto"
          id="btn-b64-clear"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Clear Board</span>
        </button>
      </div>

    </div>
  );
}
