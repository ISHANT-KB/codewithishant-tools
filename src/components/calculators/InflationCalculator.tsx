import { useState } from 'react';
import { TrendingDown, ShieldAlert, DollarSign, ArrowRight, Table, Sparkles, Scale } from 'lucide-react';

export default function InflationCalculator() {
  const [currency, setCurrency] = useState<string>('₹');
  const [amount, setAmount] = useState<number>(100000);
  const [inflationRate, setInflationRate] = useState<number>(6.0); // 6% average default
  const [years, setYears] = useState<number>(10);
  const [viewType, setViewType] = useState<'decay' | 'cost'>('decay'); // decay of purchasing power vs increased cost of goods

  // Calculate values
  // Future Cost = Amount * (1 + inflation/100)^years
  const futureCost = amount * Math.pow(1 + inflationRate / 100, years);
  
  // Purchasing power decay = Amount / (1 + inflation/100)^years
  const purchasingPowerDecay = amount / Math.pow(1 + inflationRate / 100, years);
  const totalDifference = Math.abs(amount - (viewType === 'decay' ? purchasingPowerDecay : futureCost));

  // Formatter helper
  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency === '₹' ? 'INR' : currency === '$' ? 'USD' : currency === '€' ? 'EUR' : 'GBP',
      maximumFractionDigits: 0,
    }).format(val).replace('INR', '₹').replace('USD', '$').replace('EUR', '€').replace('GBP', '£');
  };

  // Generate Year-on-Year Timeline
  const timelineData = Array.from({ length: Math.min(years + 1, 30) }, (_, i) => {
    const costValue = amount * Math.pow(1 + inflationRate / 100, i);
    const powerValue = amount / Math.pow(1 + inflationRate / 100, i);
    return {
      year: i,
      cost: costValue,
      power: powerValue,
    };
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="inflation-calculator-container">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-rose-500" />
            Inflation & Purchasing Power Calculator
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Discover how historical and future inflation rates change your money's standard buying power over years.
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

      {/* VIEW TYPE TAB SELECTOR */}
      <div className="flex bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl mb-8 max-w-lg">
        <button
          onClick={() => setViewType('decay')}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl cursor-pointer transition flex items-center justify-center gap-1.5 ${
            viewType === 'decay'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
          }`}
        >
          <TrendingDown className="w-4 h-4 text-rose-500" />
          Purchasing Power Decay
        </button>
        <button
          onClick={() => setViewType('cost')}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl cursor-pointer transition flex items-center justify-center gap-1.5 ${
            viewType === 'cost'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
          }`}
        >
          <Scale className="w-4 h-4 text-emerald-500" />
          Future Cost of Goods
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT PANEL */}
        <div className="lg:col-span-7 space-y-6">
          {/* Starting Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Starting Cash / Value
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                  className="w-28 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="1000"
              max="10000000"
              step="1000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{formatValue(1000)}</span>
              <span>{formatValue(5000000)}</span>
              <span>{formatValue(10000000)}</span>
            </div>
          </div>

          {/* Average Inflation rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Average Annual Inflation Rate (% p.a.)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-20 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-rose-500"
                />
                <span className="text-sm text-slate-400 font-bold">%</span>
              </div>
            </div>
            <input
              type="range"
              min="0.5"
              max="25"
              step="0.1"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0.5% (Low)</span>
              <span>6% (Historical Avg)</span>
              <span>25% (Hyperinflation)</span>
            </div>
          </div>

          {/* Time Horizon years */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Duration Time Horizon (Years)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                  className="w-16 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-rose-500"
                />
                <span className="text-xs text-slate-400 font-bold">Years</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 Year</span>
              <span>20 Years</span>
              <span>40 Years</span>
            </div>
          </div>

          {/* Context Alert box */}
          <div className="bg-rose-500/[0.04] p-4.5 rounded-2xl border border-rose-500/10 flex gap-3 text-xs text-slate-600 dark:text-slate-400">
            <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
            <div>
              <p className="font-bold text-rose-600 dark:text-rose-400 mb-1">Unmasking Inflation</p>
              <p>Over a {years} years period at {inflationRate}% inflation, your cash holding lose a massive portion of its baseline economic purchasing potential. Putting liquid money only in savings accounts often means guaranteed purchasing depreciation.</p>
            </div>
          </div>
        </div>

        {/* RESULTS SUMMARY CARD */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-rose-50/20 dark:from-slate-950 dark:to-rose-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {viewType === 'decay' ? 'Purchasing Power Breakdown' : 'Cost Escalation Breakdown'}
            </h3>

            {/* Principal value conversion */}
            <div className={`p-5 rounded-xl text-center relative overflow-hidden border ${
              viewType === 'decay' 
                ? 'bg-rose-500/[0.04] border-rose-500/10'
                : 'bg-emerald-500/[0.04] border-emerald-500/10'
            }`}>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                {viewType === 'decay' ? 'Worth of today\'s money' : 'Future cost of equivalent items'}
              </span>
              <span className={`text-3xl font-black ${
                viewType === 'decay' ? 'text-rose-500' : 'text-emerald-500'
              }`}>
                {formatValue(viewType === 'decay' ? purchasingPowerDecay : futureCost)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-1">
                in {years} years under cumulative compound inflation
              </span>
            </div>

            {/* Quick Metrics columns */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Lost Core buying power</span>
                <span className="text-sm font-extrabold text-rose-500">{formatValue(totalDifference)}</span>
              </div>
              <div className="bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Overall percentage loss</span>
                <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  {viewType === 'decay' 
                    ? `-${((1 - purchasingPowerDecay / amount) * 100).toFixed(0)}%`
                    : `+${((futureCost / amount - 1) * 100).toFixed(0)}%`
                  }
                </span>
              </div>
            </div>

            {/* Quick Chart Graph (Responsive SVG) */}
            <div className="bg-white dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-850">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Yearly Projection Curve</span>
                <span className="text-[10px] font-medium text-slate-400">0 to {years} yrs</span>
              </div>
              
              <div className="h-16 flex items-end gap-1 pt-2 border-b border-l border-slate-200 dark:border-slate-800 pb-0.5 px-0.5">
                {timelineData.map((data) => {
                  const maxVal = Math.max(...timelineData.map(d => viewType === 'decay' ? d.power : d.cost), amount);
                  const minVal = Math.min(...timelineData.map(d => viewType === 'decay' ? d.power : d.cost));
                  const targetMetric = viewType === 'decay' ? data.power : data.cost;
                  const ratio = maxVal > 0 ? (targetMetric / maxVal) : 0.5;
                  const percentHeight = Math.max(10, Math.min(100, ratio * 100));

                  return (
                    <div
                      key={data.year}
                      className="flex-1 flex flex-col items-center group relative cursor-pointer"
                    >
                      <div
                        style={{ height: `${percentHeight}%` }}
                        className={`w-full rounded-t-sm transition-all duration-300 ${
                          viewType === 'decay' 
                            ? 'bg-rose-400 dark:bg-rose-500 group-hover:bg-rose-500' 
                            : 'bg-emerald-400 dark:bg-emerald-500 group-hover:bg-emerald-500'
                        }`}
                      />
                      {/* Tooltip on element hover */}
                      <div className="absolute bottom-full mb-1 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-20 shadow-md">
                        Yr {data.year}: {formatValue(targetMetric)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
