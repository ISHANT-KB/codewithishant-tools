import { useState } from 'react';
import { Scale, CheckCircle2, ChevronRight, Calculator, RefreshCw, HelpCircle, ShieldAlert } from 'lucide-react';

export default function BreakEvenCalculator() {
  const [currency, setCurrency] = useState<string>('₹');
  const [fixedCosts, setFixedCosts] = useState<number>(120000);
  const [variableCost, setVariableCost] = useState<number>(45);
  const [salePrice, setSalePrice] = useState<number>(120);

  // Business logic math
  const contributionMargin = salePrice - variableCost;
  const contributionMarginRatio = salePrice > 0 ? (contributionMargin / salePrice) * 100 : 0;

  const canBreakEven = contributionMargin > 0;

  const breakEvenUnits = canBreakEven ? Math.ceil(fixedCosts / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * salePrice;

  // Formatter helper
  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency === '₹' ? 'INR' : currency === '$' ? 'USD' : currency === '€' ? 'EUR' : 'GBP',
      maximumFractionDigits: 0,
    }).format(val).replace('INR', '₹').replace('USD', '$').replace('EUR', '€').replace('GBP', '£');
  };

  // Progression schedule points from 0 to 200% of break-even units
  const steps = [0, 0.5, 1, 1.5, 2];
  const schedule = steps.map((s) => {
    const units = Math.ceil((breakEvenUnits || 100) * s);
    const revenue = units * salePrice;
    const totalVariableCost = units * variableCost;
    const totalCost = fixedCosts + totalVariableCost;
    const netProfit = revenue - totalCost;
    return {
      label: s === 0 ? 'Start' : s === 1 ? 'Break-Even Goal' : `${s * 100}% of Goal`,
      units,
      revenue,
      totalCost,
      netProfit,
    };
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="break-even-calculator-container">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <Scale className="w-5 h-5 text-indigo-500" />
            Break-Even Analysis Calculator
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Determine fixed cost thresholds, ideal product pricing, and minimum unit sales needed to achieve zero losses.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start md:self-auto">
          {['₹', '$', '€', '£'].map((cur) => (
            <button
              key={cur}
              onClick={() => setCurrency(cur)}
              className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition ${
                currency === cur
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT GRID */}
        <div className="lg:col-span-7 space-y-6">
          {/* Total Fixed Costs */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Total Fixed Costs (Monthly / Annual)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(Math.max(0, Number(e.target.value)))}
                  className="w-24 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-indigo-505"
                />
              </div>
            </div>
            <input
              type="range"
              min="1000"
              max="2000000"
              step="5000"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{formatValue(1000)}</span>
              <span>{formatValue(1000000)}</span>
              <span>{formatValue(2000000)}</span>
            </div>
          </div>

          {/* Sale Price Per Unit */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Unit Sale Retail Price
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Math.max(0, Number(e.target.value)))}
                  className="w-20 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-indigo-505"
                />
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="5000"
              step="5"
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-550"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{formatValue(1)}</span>
              <span>{formatValue(2500)}</span>
              <span>{formatValue(5000)}</span>
            </div>
          </div>

          {/* Variable Cost per unit */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Unit Variable Production Cost
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={variableCost}
                  onChange={(e) => setVariableCost(Math.max(0, Number(e.target.value)))}
                  className="w-20 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-indigo-505"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max={salePrice}
              step="1"
              value={variableCost}
              onChange={(e) => setVariableCost(Math.min(salePrice, Number(e.target.value)))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-550"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0% cost</span>
              <span>Half price ({formatValue(salePrice / 2)})</span>
              <span>Max price ({formatValue(salePrice)})</span>
            </div>
          </div>

          {!canBreakEven && (
            <div className="bg-rose-500/[0.04] p-4.5 rounded-2xl border border-rose-500/10 flex gap-3 text-xs text-slate-600 dark:text-slate-400">
              <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
              <div>
                <p className="font-bold text-rose-600 dark:text-rose-400 mb-0.5">Negative Margin Warning!</p>
                <p>Your production cost exceeds or equals your retail selling price! You must raise prices or lower expenses to operate a viable break-even model.</p>
              </div>
            </div>
          )}

          {/* Progression Table list */}
          <div className="bg-slate-50/50 dark:bg-slate-950/30 border border-slate-150 dark:border-slate-850 p-4 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Scale Schedule Progression</h4>
            
            <div className="space-y-2 overflow-x-auto min-w-full">
              <table className="w-full text-left text-xs text-slate-500 dark:text-slate-400">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-850 pb-2">
                    <th className="font-bold pb-2 text-slate-400">Stage</th>
                    <th className="font-bold pb-2 text-slate-400 text-center">Units Sold</th>
                    <th className="font-bold pb-2 text-slate-400 text-center">Revenue</th>
                    <th className="font-bold pb-2 text-slate-400 text-center">Operating Cost</th>
                    <th className="font-bold pb-2 text-slate-400 text-right">Net Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50 dark:divide-slate-850/50">
                  {schedule.map((stepData) => (
                    <tr key={stepData.label} className="py-2.5">
                      <td className="py-2 font-semibold text-slate-700 dark:text-slate-300">{stepData.label}</td>
                      <td className="py-2 text-center font-bold text-slate-600 dark:text-slate-400">{stepData.units}</td>
                      <td className="py-2 text-center text-slate-600 dark:text-slate-400">{formatValue(stepData.revenue)}</td>
                      <td className="py-2 text-center text-slate-600 dark:text-slate-400">{formatValue(stepData.totalCost)}</td>
                      <td className={`py-2 text-right font-bold ${
                        stepData.netProfit > 0 ? 'text-emerald-500' : stepData.netProfit === 0 ? 'text-indigo-500' : 'text-rose-500'
                      }`}>
                        {formatValue(stepData.netProfit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SUMMARY CARD */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-indigo-50/20 dark:from-slate-950 dark:to-indigo-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Break-even Summary</h3>

            {/* Total Threshold Units */}
            <div className="bg-indigo-500/[0.04] p-5 rounded-xl border border-indigo-500/10 text-center relative overflow-hidden">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Break-Even Units Volume</span>
              <span className="text-3xl font-black text-indigo-650 dark:text-indigo-400">{salePrice > 0 ? breakEvenUnits : '-'} Units</span>
              <span className="text-[10px] text-slate-400 block mt-1">
                needed to cover {formatValue(fixedCosts)} fixed expenses
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 block">Unit Margin Contribution</span>
                <span className={`font-bold ${contributionMargin > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {formatValue(contributionMargin)} /unit
                </span>
              </div>
              
              <div className="bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 block">Contribution Margin Ratio</span>
                <span className="font-black text-slate-700 dark:text-slate-200">
                  {contributionMarginRatio.toFixed(1)}%
                </span>
              </div>

              <div className="bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-850 flex justify-between items-center text-xs">
                <span className="font-bold text-slate-500 dark:text-slate-400">Total Revenue at Break-even</span>
                <span className="font-black text-indigo-500 text-right">{formatValue(breakEvenRevenue)}</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-500/[0.04] rounded-xl border border-indigo-500/10 text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5 leading-relaxed">
              <span className="font-bold text-slate-700 dark:text-slate-350 block">Operational Insight:</span>
              <p>Every unit sold above the {breakEvenUnits} units target threshold deposits {formatValue(contributionMargin)} directly into pure, cost-unencumbered net earnings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
