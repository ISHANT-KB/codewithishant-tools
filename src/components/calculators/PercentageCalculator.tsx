import { useState } from 'react';
import { Percent, RefreshCw } from 'lucide-react';

export default function PercentageCalculator() {
  // Option 1: What is X% of Y?
  const [percent1, setPercent1] = useState('15');
  const [total1, setTotal1] = useState('200');
  const [result1, setResult1] = useState<number | null>(null);

  // Option 2: X is what percent of Y?
  const [part2, setPart2] = useState('30');
  const [total2, setTotal2] = useState('150');
  const [result2, setResult2] = useState<number | null>(null);

  // Option 3: Percentage increase or decrease from X to Y
  const [from3, setFrom3] = useState('50');
  const [to3, setTo3] = useState('80');
  const [result3, setResult3] = useState<{ change: number; type: 'Increase' | 'Decrease' | 'No Change' } | null>(null);

  const calc1 = () => {
    const p = parseFloat(percent1);
    const t = parseFloat(total1);
    if (!isNaN(p) && !isNaN(t)) {
      setResult1(parseFloat(((p / 100) * t).toFixed(4)));
    }
  };

  const calc2 = () => {
    const p = parseFloat(part2);
    const t = parseFloat(total2);
    if (!isNaN(p) && !isNaN(t) && t !== 0) {
      setResult2(parseFloat(((p / t) * 100).toFixed(4)));
    }
  };

  const calc3 = () => {
    const f = parseFloat(from3);
    const t = parseFloat(to3);
    if (!isNaN(f) && !isNaN(t) && f !== 0) {
      const diff = t - f;
      const change = parseFloat(((diff / f) * 100).toFixed(4));
      setResult3({
        change: Math.abs(change),
        type: change > 0 ? 'Increase' : change < 0 ? 'Decrease' : 'No Change',
      });
    }
  };

  const handleReset = () => {
    setPercent1('15'); setTotal1('200'); setResult1(null);
    setPart2('30'); setTotal2('150'); setResult2(null);
    setFrom3('50'); setTo3('80'); setResult3(null);
  };

  return (
    <div className="space-y-8" id="percentage-calc-inner">
      
      {/* SECTION 1: What is X% of Y */}
      <div className="bg-slate-50 dark:bg-slate-900/10 p-5 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-4">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-350 uppercase tracking-wider flex items-center gap-1.5">
          <span className="p-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-xs font-mono">1</span>
          Calculate Portion of Whole
        </h4>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span>What is</span>
          <input
            type="number"
            value={percent1}
            onChange={(e) => setPercent1(e.target.value)}
            className="w-24 px-3 py-2 border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-emerald-500 text-center font-semibold"
          />
          <span>% of</span>
          <input
            type="number"
            value={total1}
            onChange={(e) => setTotal1(e.target.value)}
            className="w-28 px-3 py-2 border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-emerald-500 text-center font-semibold"
          />
          <button
            onClick={calc1}
            className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:opacity-90 transition-colors cursor-pointer text-xs ml-auto"
            id="calc1-btn"
          >
            Calculate
          </button>
        </div>
        {result1 !== null && (
          <div className="mt-2 bg-white dark:bg-slate-950/40 p-3 rounded-xl border border-slate-150 dark:border-slate-800/80 flex justify-between items-center">
            <span className="text-xs text-slate-500">Result:</span>
            <span className="font-mono font-bold text-emerald-500 text-base">{percent1}% of {total1} is {result1}</span>
          </div>
        )}
      </div>

      {/* SECTION 2: X is what % of Y */}
      <div className="bg-slate-50 dark:bg-slate-900/10 p-5 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-4">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-350 uppercase tracking-wider flex items-center gap-1.5">
          <span className="p-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-xs font-mono">2</span>
          Compute Percent Ratio
        </h4>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <input
            type="number"
            value={part2}
            onChange={(e) => setPart2(e.target.value)}
            className="w-24 px-3 py-2 border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-emerald-500 text-center font-semibold"
          />
          <span>is what percent of</span>
          <input
            type="number"
            value={total2}
            onChange={(e) => setTotal2(e.target.value)}
            className="w-28 px-3 py-2 border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-emerald-500 text-center font-semibold"
          />
          <span>?</span>
          <button
            onClick={calc2}
            className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:opacity-90 transition-colors cursor-pointer text-xs ml-auto"
            id="calc2-btn"
          >
            Calculate
          </button>
        </div>
        {result2 !== null && (
          <div className="mt-2 bg-white dark:bg-slate-950/40 p-3 rounded-xl border border-slate-150 dark:border-slate-800/80 flex justify-between items-center">
            <span className="text-xs text-slate-500">Result:</span>
            <span className="font-mono font-bold text-emerald-500 text-base">{part2} is {result2}% of {total2}</span>
          </div>
        )}
      </div>

      {/* SECTION 3: Percentage increase or decrease */}
      <div className="bg-slate-50 dark:bg-slate-900/10 p-5 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-4">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-350 uppercase tracking-wider flex items-center gap-1.5">
          <span className="p-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-xs font-mono">3</span>
          Percentage Increase / Decrease
        </h4>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span>What is the percentage change from</span>
          <input
            type="number"
            value={from3}
            onChange={(e) => setFrom3(e.target.value)}
            className="w-24 px-3 py-2 border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-emerald-500 text-center font-semibold"
          />
          <span>to</span>
          <input
            type="number"
            value={to3}
            onChange={(e) => setTo3(e.target.value)}
            className="w-28 px-3 py-2 border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-emerald-500 text-center font-semibold"
          />
          <button
            onClick={calc3}
            className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:opacity-90 transition-colors cursor-pointer text-xs ml-auto"
            id="calc3-btn"
          >
            Calculate
          </button>
        </div>
        {result3 !== null && (
          <div className="mt-2 bg-white dark:bg-slate-950/40 p-3 rounded-xl border border-slate-150 dark:border-slate-800/80 flex justify-between items-center">
            <span className="text-xs text-slate-500">Result:</span>
            <span className="font-mono font-bold text-base">
              {result3.type === 'No Change' ? (
                <span className="text-slate-500">There is no change (0%)</span>
              ) : (
                <span className={result3.type === 'Increase' ? 'text-emerald-500' : 'text-red-500'}>
                  {result3.type}: {result3.change}% from {from3} to {to3}
                </span>
              )}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors border border-slate-250 dark:border-slate-800 hover:border-emerald-500 px-3 py-2 rounded-xl cursor-pointer"
          id="pct-reset-btn"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Percentage Boards</span>
        </button>
      </div>

    </div>
  );
}
