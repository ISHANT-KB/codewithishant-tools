import { useState } from 'react';
import { Ruler, RefreshCw } from 'lucide-react';

export default function LengthConverter() {
  const [val, setVal] = useState<number>(1);
  const [lastUnit, setLastUnit] = useState<string>('meter');

  const units = [
    { key: 'meter', name: 'Meters (m)', factor: 1 },
    { key: 'kilometer', name: 'Kilometers (km)', factor: 1000 },
    { key: 'centimeter', name: 'Centimeters (cm)', factor: 0.01 },
    { key: 'millimeter', name: 'Millimeters (mm)', factor: 0.001 },
    { key: 'inch', name: 'Inches (in)', factor: 0.0254 },
    { key: 'foot', name: 'Feet (ft)', factor: 0.3048 },
    { key: 'yard', name: 'Yards (yd)', factor: 0.9144 },
    { key: 'mile', name: 'Miles (mi)', factor: 1609.344 },
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

  const getMeterValue = (): number => {
    const factorObj = units.find((u) => u.key === lastUnit);
    if (!factorObj) return 0;
    return val * factorObj.factor;
  };

  const convertValue = (toKey: string): string => {
    const meters = getMeterValue();
    const targetObj = units.find((u) => u.key === toKey);
    if (!targetObj || meters === 0) return '';
    const converted = meters / targetObj.factor;

    // Support clean rounding
    if (converted === 0) return '0';
    if (Math.abs(converted) < 0.00001) return converted.toExponential(4);
    return String(parseFloat(converted.toFixed(6)));
  };

  const handleReset = () => {
    setVal(1);
    setLastUnit('meter');
  };

  return (
    <div className="space-y-6" id="length-conv-inner">
      <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 p-4 rounded-xl text-xs text-emerald-700 dark:text-emerald-400 mb-2 leading-relaxed">
        <strong>Tip:</strong> Simply type or spin any value below. All other standard metric and imperial lengths will update automatically in real-time!
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {units.map((u) => {
          const displayVal = u.key === lastUnit ? (val === 0 ? '' : String(val)) : convertValue(u.key);
          return (
            <div
              key={u.key}
              className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-2 focus-within:border-emerald-500 dark:focus-within:border-emerald-500 transition-colors"
              id={`length-cell-${u.key}`}
            >
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {u.name}
              </label>
              <input
                type="number"
                value={displayVal}
                onChange={(e) => handleUnitUpdate(u.key, e.target.value)}
                placeholder="0"
                className="w-full bg-transparent border-none text-slate-900 dark:text-white font-mono text-base font-bold focus:ring-0 focus:outline-none focus:border-none"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors border border-slate-200 dark:border-slate-800 hover:border-emerald-500 px-3.5 py-2.5 rounded-xl cursor-pointer"
          id="btn-len-reset"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Converter</span>
        </button>
      </div>
    </div>
  );
}
