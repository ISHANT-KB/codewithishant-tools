import { useState } from 'react';
import { Database, RefreshCw } from 'lucide-react';

export default function DataStorageConverter() {
  const [val, setVal] = useState<number>(1);
  const [lastUnit, setLastUnit] = useState<string>('gb');

  const units = [
    { key: 'bit', name: 'Bits (b)', multiplier: 1 / 8 },
    { key: 'byte', name: 'Bytes (B)', multiplier: 1 },
    { key: 'kb', name: 'Kilobytes (KB / KiB)', multiplier: 1024 },
    { key: 'mb', name: 'Megabytes (MB / MiB)', multiplier: 1024 * 1024 },
    { key: 'gb', name: 'Gigabytes (GB / GiB)', multiplier: 1024 * 1024 * 1024 },
    { key: 'tb', name: 'Terabytes (TB / TiB)', multiplier: 1024 * 1024 * 1024 * 1024 },
    { key: 'pb', name: 'Petabytes (PB / PiB)', multiplier: 1024 * 1024 * 1024 * 1024 * 1024 },
  ];

  const handleUnitUpdate = (key: string, inputVal: string) => {
    const parsed = parseFloat(inputVal);
    if (isNaN(parsed)) {
      setVal(0);
      setLastUnit(key);
      return;
    }
    setVal(parsed);
    setLastUnit(key);
  };

  const getBytesValue = (): number => {
    const factorObj = units.find((u) => u.key === lastUnit);
    if (!factorObj) return 0;
    return val * factorObj.multiplier;
  };

  const convertValue = (toKey: string): string => {
    const bytes = getBytesValue();
    const targetObj = units.find((u) => u.key === toKey);
    if (!targetObj || bytes === 0) return '';
    const converted = bytes / targetObj.multiplier;

    if (converted === 0) return '0';
    if (Math.abs(converted) < 0.001) return converted.toExponential(3);
    return String(parseFloat(converted.toFixed(6)));
  };

  const handleReset = () => {
    setVal(1);
    setLastUnit('gb');
  };

  return (
    <div className="space-y-6" id="data-conv-inner">
      <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 p-4 rounded-xl text-xs text-emerald-700 dark:text-emerald-400 mb-2 leading-relaxed">
        <strong>Binary Standard (1024):</strong> Enter values into any box to view instant equivalent listings across all storage levels.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {units.map((u) => {
          const displayVal = u.key === lastUnit ? (val === 0 ? '' : String(val)) : convertValue(u.key);
          return (
            <div
              key={u.key}
              className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-2 focus-within:border-emerald-500 transition-colors"
              id={`data-cell-${u.key}`}
            >
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {u.name}
              </label>
              <input
                type="number"
                value={displayVal}
                onChange={(e) => handleUnitUpdate(u.key, e.target.value)}
                placeholder="0"
                className="w-full bg-transparent border-none text-slate-900 dark:text-white font-mono text-base font-bold focus:ring-0 focus:outline-none"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors border border-slate-200 dark:border-slate-800 hover:border-emerald-500 px-3.5 py-2.5 rounded-xl cursor-pointer"
          id="btn-data-reset"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Converter</span>
        </button>
      </div>
    </div>
  );
}
