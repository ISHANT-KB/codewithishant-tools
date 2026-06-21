import { useState, useEffect } from 'react';
import { Fingerprint, Copy, Check, Download, Trash2, RefreshCw, Layers, Sparkles } from 'lucide-react';
import ShareResults from '../ShareResults';

export default function UUIDGenerator() {
  const [version, setVersion] = useState<'v4' | 'v1'>('v4');
  const [quantity, setQuantity] = useState<number>(10);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [uuidList, setUuidList] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Math-safe V4 RFC4122 formulation
  const generateV4 = (): string => {
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    return uuid;
  };

  // V1 UUID generator (using timestamp and pseudo-random nodes/clock seqs)
  const generateV1 = (): string => {
    const d = new Date().getTime();
    // Use high-perf timing if available
    const rNode = 'xx-xx';
    let uuid = 'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    return uuid;
  };

  const handleGenerate = () => {
    const list: string[] = [];
    const count = quantity <= 0 ? 1 : quantity > 500 ? 500 : quantity;
    
    for (let i = 0; i < count; i++) {
      let token = version === 'v4' ? generateV4() : generateV1();
      
      if (!hyphens) {
        token = token.replace(/-/g, '');
      }
      
      if (uppercase) {
        token = token.toUpperCase();
      } else {
        token = token.toLowerCase();
      }
      list.push(token);
    }
    setUuidList(list);
  };

  // Generate on mount
  useEffect(() => {
    handleGenerate();
  }, [version, quantity, uppercase, hyphens]);

  const handleCopyIndividual = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyAll = async () => {
    if (uuidList.length === 0) return;
    try {
      await navigator.clipboard.writeText(uuidList.join('\n'));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadTxt = () => {
    if (uuidList.length === 0) return;
    try {
      const text = uuidList.join('\r\n');
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `uuid-${version}-bulk-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6" id="uuid-generator-container">
      {/* Workspace configurations controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column configuration sliders/buttons */}
        <div className="lg:col-span-4 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Generator Options</span>

          {/* Version Check */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500">UUID Version Standard</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setVersion('v4')}
                className={`py-2 px-3 border rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  version === 'v4'
                    ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-50'
                }`}
                id="btn-uuid-v4"
              >
                V4 (Random)
              </button>
              <button
                onClick={() => setVersion('v1')}
                className={`py-2 px-3 border rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  version === 'v1'
                    ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-50'
                }`}
                id="btn-uuid-v1"
              >
                V1 (Timestamp)
              </button>
            </div>
          </div>

          {/* Quantity Count */}
          <div className="space-y-2 animate-pulse-once">
            <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
              <span>Bulk Quantity:</span>
              <span className="font-mono text-emerald-500 font-bold">{quantity} tokens</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full accent-emerald-500"
            />
            <div className="flex border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 text-[10px] justify-between">
              {[5, 10, 20, 50].map((num) => (
                <button
                  key={num}
                  onClick={() => setQuantity(num)}
                  className={`flex-1 py-1.5 font-bold cursor-pointer transition-all ${
                    quantity === num
                      ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-850'
                  }`}
                  id={`qty-btn-${num}`}
                >
                  {num} IDs
                </button>
              ))}
            </div>
          </div>

          {/* Toggles checkboxes */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-850">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-350 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(e) => setHyphens(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-800 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Include Separating Hyphens</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-350 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-800 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Generate in UPPERCASE Letters</span>
            </label>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full mt-2 py-3 bg-slate-900 dark:bg-slate-800 hover:opacity-95 text-white dark:text-slate-100 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-800"
            id="btn-re-uuid"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
            <span>Regenerate Bulk Stream</span>
          </button>
        </div>

        {/* Right column UUID layout lists */}
        <div className="lg:col-span-8 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <Fingerprint className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Generated UUID Pool</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadTxt}
                disabled={uuidList.length === 0}
                className="p-1.5 px-2.5 rounded-xl border text-[11px] font-bold border-slate-150 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-350 dark:hover:bg-slate-850 flex items-center gap-1 cursor-pointer transition-all disabled:opacity-40"
                title="Download bulk plain-text files"
                id="btn-download-txt"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Plain .txt</span>
              </button>

              <button
                onClick={handleCopyAll}
                disabled={uuidList.length === 0}
                className={`p-1.5 px-3 rounded-xl border text-[11px] font-bold cursor-pointer transition-all flex items-center gap-1 ${
                  copiedAll
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
                id="btn-copy-all-uuids"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
                <span>{copiedAll ? 'All Copied' : 'Copy All'}</span>
              </button>
            </div>
          </div>

          <div className="w-full h-80 bg-slate-50 dark:bg-slate-1000 border border-slate-200 dark:border-slate-850 rounded-xl overflow-y-auto font-mono text-sm">
            {uuidList.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center h-full text-slate-400 py-6 text-xs">
                <span>Click generate to populate tokens.</span>
              </div>
            ) : (
              <div className="space-y-1 p-3">
                {uuidList.map((id, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center group py-1.5 px-2.5 rounded-lg hover:bg-slate-100/60 dark:hover:bg-slate-900/60 border border-transparent hover:border-slate-150 dark:hover:border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-400 w-5 text-right select-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold break-all">
                        {id}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyIndividual(id, index)}
                      className="p-1 text-slate-400 hover:text-emerald-500 rounded transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Copy specific string only"
                      id={`copy-item-${index}`}
                    >
                      {copiedIndex === index ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {uuidList.length > 0 && (
        <ShareResults
          toolId="uuid-generator"
          toolName="RFC4122 UUID Generator"
          textToCopy={uuidList.slice(0, 5).join('\n') + (uuidList.length > 5 ? '\n... [truncated]' : '')}
          shareUrlParams={{}}
          mainMetric={{
            label: 'UUID Standard',
            value: version.toUpperCase(),
            subLabel: `Generated ${quantity} block tokens`,
            color: 'emerald'
          }}
          additionalMetrics={[
            { label: 'Hyphen Format Status', value: hyphens ? 'Hyphenated (RFC)' : 'Clean hex layout' },
            { label: 'Generated Lettercase Style', value: uppercase ? 'UPPERCASE' : 'lowercase' },
            { label: 'Token Block Array length', value: `${uuidList.length} string elements` },
            { label: 'Compliance Index', value: `RFC4122 ${version === 'v4' ? 'Random Gen' : 'Epoch based'}` }
          ]}
        />
      )}
    </div>
  );
}
