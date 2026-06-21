import { useState } from 'react';
import { Percent, Wallet, BarChart2, DollarSign, ArrowRight, Activity, ShieldCheck } from 'lucide-react';

export default function ProfitMarginCalculator() {
  const [currency, setCurrency] = useState<string>('₹');
  const [cost, setCost] = useState<number>(300);
  const [sellingPrice, setSellingPrice] = useState<number>(500);
  const [overhead, setOverhead] = useState<number>(50); // Operating Expenses

  // Calculations
  const grossProfit = Math.max(0, sellingPrice - cost);
  const grossProfitMargin = sellingPrice > 0 ? (grossProfit / sellingPrice) * 105 : 0;
  // Let's cap at 100% or use standard: GP Margin = (GP / Rev) * 100
  const actualGPMargin = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;

  const netProfit = Math.max(0, sellingPrice - cost - overhead);
  const netProfitMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;

  const markupPercentage = cost > 0 ? (grossProfit / cost) * 100 : 0;

  // Formatter helper
  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency === '₹' ? 'INR' : currency === '$' ? 'USD' : currency === '€' ? 'EUR' : 'GBP',
      maximumFractionDigits: 0,
    }).format(val).replace('INR', '₹').replace('USD', '$').replace('EUR', '€').replace('GBP', '£');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="profit-margin-calculator-container">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <Percent className="w-5 h-5 text-emerald-500" />
            Gross & Net Profit Margin Calculator
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Calculate markup, gross margins, net ratios, and operating cost balances of your retail or wholesale inventory.
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
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          {/* Cost Price */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Cost of Goods Sold (Raw Item Cost)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(Math.max(0, Number(e.target.value)))}
                  className="w-24 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="100000"
              step="10"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-505"
            />
          </div>

          {/* Selling price */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Item Selling Price (Revenue)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Math.max(cost, Number(e.target.value)))}
                  className="w-24 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <input
              type="range"
              min={cost}
              max="250000"
              step="10"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Math.max(cost, Number(e.target.value)))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-505"
            />
          </div>

          {/* Operating overhead */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Operating Expenses / Overhead Taxes
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={overhead}
                  onChange={(e) => setOverhead(Math.max(0, Number(e.target.value)))}
                  className="w-24 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max={Math.max(0, sellingPrice - cost)}
              step="5"
              value={overhead}
              onChange={(e) => setOverhead(Math.min(Math.max(0, sellingPrice - cost), Number(e.target.value)))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-505"
            />
          </div>

          {/* Dynamic SVG Visual distribution ratio bar */}
          <div className="bg-slate-50/50 dark:bg-slate-950/30 border border-slate-150 dark:border-slate-850 p-4 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-3">Revenue Segment Distribution</span>
            <div className="h-6 w-full rounded-lg overflow-hidden flex font-bold text-[10px] text-white">
              {/* Cost portion */}
              <div
                style={{ width: `${(cost / (sellingPrice || 1)) * 100}%` }}
                className="bg-slate-400 dark:bg-slate-655 flex items-center justify-center transition-all duration-300"
              >
                {cost > 0 && `${((cost / sellingPrice) * 100).toFixed(0)}% Cost`}
              </div>
              {/* Overhead portion */}
              {overhead > 0 && (
                <div
                  style={{ width: `${(overhead / sellingPrice) * 100}%` }}
                  className="bg-rose-400 dark:bg-rose-500 flex items-center justify-center transition-all duration-300 border-l border-white/20"
                >
                  {`${((overhead / sellingPrice) * 100).toFixed(0)}% Overhead`}
                </div>
              )}
              {/* Net profit portion */}
              <div
                style={{ width: `${(netProfit / (sellingPrice || 1)) * 100}%` }}
                className="bg-emerald-500 flex-1 flex items-center justify-center transition-all duration-300 border-l border-white/20"
              >
                {netProfit > 0 && `${((netProfit / sellingPrice) * 100).toFixed(0)}% Net`}
              </div>
            </div>
            <div className="flex gap-4 justify-center mt-3 text-xs text-slate-500 dark:text-slate-450">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-slate-400" />
                <span>COGS {formatValue(cost)}</span>
              </div>
              {overhead > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-rose-400" />
                  <span>Expenses {formatValue(overhead)}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                <span>Net Profit {formatValue(netProfit)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-slate-50 to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Margin Ratios Breakdown</h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Gross margin */}
              <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 rounded-xl p-4 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Gross Profit Margin</span>
                <span className="text-2xl font-black text-slate-800 dark:text-white">{actualGPMargin.toFixed(1)}%</span>
              </div>

              {/* Net margin */}
              <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 rounded-xl p-4 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Net profit Margin</span>
                <span className="text-2xl font-black text-emerald-500">{netProfitMargin.toFixed(1)}%</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs text-slate-500 border-b border-slate-100 dark:border-slate-850 pb-2.5">
                <span>Gross Profit (Markup Difference)</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{formatValue(grossProfit)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 border-b border-slate-100 dark:border-slate-850 pb-2.5">
                <span>Markup Multiplier percentage</span>
                <span className="font-bold text-indigo-500">+{markupPercentage.toFixed(1)}% markup</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 pb-1">
                <span className="font-semibold text-slate-700 dark:text-slate-350">Actual Net Operating Profit</span>
                <span className="font-extrabold text-emerald-500">{formatValue(netProfit)}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/[0.04] rounded-xl border border-emerald-500/10 text-[11px] text-slate-505 dark:text-slate-400 space-y-0.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Retail Note:</span>
              <p>Markup is calculated relative to your Cost Price, while Margin is calculated relative to your Selling Retail Price. Keep these metrics aligned in pricing audits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
