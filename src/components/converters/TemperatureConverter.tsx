import { useState } from 'react';
import { Thermometer, RefreshCw } from 'lucide-react';

export default function TemperatureConverter() {
  const [val, setVal] = useState<number>(25);
  const [lastScale, setLastScale] = useState<string>('celsius');

  const convertValue = (toScale: string): string => {
    if (isNaN(val)) return '';
    let celsius = 0;

    // First convert to standard Celsius
    if (lastScale === 'celsius') {
      celsius = val;
    } else if (lastScale === 'fahrenheit') {
      celsius = (val - 32) * (5 / 9);
    } else if (lastScale === 'kelvin') {
      celsius = val - 273.15;
    }

    // Now convert Celsius to target
    let result = 0;
    if (toScale === 'celsius') {
      result = celsius;
    } else if (toScale === 'fahrenheit') {
      result = (celsius * (9 / 5)) + 32;
    } else if (toScale === 'kelvin') {
      result = celsius + 273.15;
    }

    return String(parseFloat(result.toFixed(2)));
  };

  const handleUpdate = (scale: string, inputVal: string) => {
    const parsed = parseFloat(inputVal);
    if (isNaN(parsed)) {
      setVal(NaN);
      setLastScale(scale);
      return;
    }
    setVal(parsed);
    setLastScale(scale);
  };

  const handleReset = () => {
    setVal(25);
    setLastScale('celsius');
  };

  return (
    <div className="space-y-6" id="temp-conv-inner">
      <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 p-4 rounded-xl text-xs text-emerald-700 dark:text-emerald-400 mb-2 leading-relaxed">
        <strong>Dynamic Conversion:</strong> Type any value into Celsius, Fahrenheit, or Kelvin below to instantly cross-convert across all targets.
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        {/* CELSIUS INPUT */}
        <div className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between focus-within:border-emerald-500 transition-colors">
          <div>
            <label className="block text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-1">
              Degrees Celsius (°C)
            </label>
            <input
              type="number"
              value={lastScale === 'celsius' ? (isNaN(val) ? '' : val) : convertValue('celsius')}
              onChange={(e) => handleUpdate('celsius', e.target.value)}
              placeholder="0"
              className="bg-transparent border-none text-slate-900 dark:text-white font-mono text-xl font-bold focus:ring-0 focus:outline-none"
            />
          </div>
          <span className="text-xl font-bold text-slate-300 dark:text-slate-700 select-none">°C</span>
        </div>

        {/* FAHRENHEIT INPUT */}
        <div className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between focus-within:border-emerald-500 transition-colors">
          <div>
            <label className="block text-xs font-bold text-amber-500 dark:text-amber-400 uppercase tracking-wider mb-1">
              Degrees Fahrenheit (°F)
            </label>
            <input
              type="number"
              value={lastScale === 'fahrenheit' ? (isNaN(val) ? '' : val) : convertValue('fahrenheit')}
              onChange={(e) => handleUpdate('fahrenheit', e.target.value)}
              placeholder="32"
              className="bg-transparent border-none text-slate-900 dark:text-white font-mono text-xl font-bold focus:ring-0 focus:outline-none"
            />
          </div>
          <span className="text-xl font-bold text-slate-300 dark:text-slate-700 select-none">°F</span>
        </div>

        {/* KELVIN INPUT */}
        <div className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between focus-within:border-emerald-500 transition-colors">
          <div>
            <label className="block text-xs font-bold text-purple-500 dark:text-purple-400 uppercase tracking-wider mb-1">
              Kelvin (K)
            </label>
            <input
              type="number"
              value={lastScale === 'kelvin' ? (isNaN(val) ? '' : val) : convertValue('kelvin')}
              onChange={(e) => handleUpdate('kelvin', e.target.value)}
              placeholder="273.15"
              className="bg-transparent border-none text-slate-900 dark:text-white font-mono text-xl font-bold focus:ring-0 focus:outline-none"
            />
          </div>
          <span className="text-xl font-bold text-slate-300 dark:text-slate-700 select-none">K</span>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors border border-slate-200 dark:border-slate-800 hover:border-emerald-500 px-3.5 py-2.5 rounded-xl cursor-pointer"
          id="btn-temp-reset"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Temperature Board</span>
        </button>
      </div>
    </div>
  );
}
