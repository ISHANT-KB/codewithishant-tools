import { useState } from 'react';
import { Palmtree, Compass, Wallet, DollarSign, Calendar, TrendingUp } from 'lucide-react';

export default function RetirementCalculator() {
  const [currency, setCurrency] = useState<string>('₹');
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [monthlyExpenseToday, setMonthlyExpenseToday] = useState<number>(50000);
  const [currentSavings, setCurrentSavings] = useState<number>(200000);
  const [inflationRate, setInflationRate] = useState<number>(6.0);
  const [preRetirementReturn, setPreRetirementReturn] = useState<number>(12.0); // Equity typical
  const [postRetirementReturn, setPostRetirementReturn] = useState<number>(7.0); // Debt typical

  // Year timelines
  const activeYears = Math.max(1, retirementAge - currentAge);
  const postRetirementYears = Math.max(1, lifeExpectancy - retirementAge);

  // Future monthly cost adjusted for inflation leading up to retirement:
  // Expense_ret = Expense_today * (1 + inflation/100)^activeYears
  const monthlyExpenseAtRetirement = monthlyExpenseToday * Math.pow(1 + inflationRate / 100, activeYears);
  const annualizedRetirementExpense = monthlyExpenseAtRetirement * 12;

  // Real return rate in retirement:
  // real_r = ((1 + post_return/100) / (1 + inflation/100)) - 1
  const realRate = ((1 + postRetirementReturn / 100) / (1 + inflationRate / 100)) - 1;

  // Target corpus calculation (PV of annuity reflecting inflation during retirement)
  let targetCorpus = 0;
  if (realRate !== 0) {
    targetCorpus = annualizedRetirementExpense * ((1 - Math.pow(1 + realRate, -postRetirementYears)) / realRate);
  } else {
    targetCorpus = annualizedRetirementExpense * postRetirementYears;
  }

  // Future Value of Existing Savings
  const fvSavings = currentSavings * Math.pow(1 + preRetirementReturn / 100, activeYears);

  // Net Corpus Needed
  const netCorpusNeeded = Math.max(0, targetCorpus - fvSavings);

  // Required monthly savings to build Net Corpus:
  // FV_ann = S * [ (1 + r)^n - 1 ] / r * (1 + r)
  const preRetirementMonths = activeYears * 12;
  const monthlyPreRate = (preRetirementReturn / 100) / 12;
  
  let requiredMonthlySavings = 0;
  if (monthlyPreRate > 0) {
    const compoundFactor = Math.pow(1 + monthlyPreRate, preRetirementMonths) - 1;
    requiredMonthlySavings = (netCorpusNeeded * monthlyPreRate) / (compoundFactor * (1 + monthlyPreRate));
  } else {
    requiredMonthlySavings = netCorpusNeeded / preRetirementMonths;
  }

  // Formatting helper
  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency === '₹' ? 'INR' : currency === '$' ? 'USD' : currency === '€' ? 'EUR' : 'GBP',
      maximumFractionDigits: 0,
    }).format(val).replace('INR', '₹').replace('USD', '$').replace('EUR', '€').replace('GBP', '£');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="retirement-calculator-container">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <Palmtree className="w-5 h-5 text-emerald-500" />
            Retirement Corpus Planner
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Calculate your future target retirement corpus adjusted for inflation and determine standard monthly savings.
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
        {/* INPUT PANEL */}
        <div className="lg:col-span-7 space-y-6">
          {/* Age configurations */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Current Age</label>
              <input
                type="number"
                min="18"
                max="100"
                value={currentAge}
                onChange={(e) => setCurrentAge(Math.max(18, Math.min(100, Number(e.target.value))))}
                className="w-full px-3 py-2 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl focus:outline-none focus:border-emerald-500 text-center"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Retirement Age</label>
              <input
                type="number"
                min={currentAge + 1}
                max="100"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Math.max(currentAge + 1, Math.min(100, Number(e.target.value))))}
                className="w-full px-3 py-2 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl focus:outline-none focus:border-emerald-500 text-center"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Life Expectancy</label>
              <input
                type="number"
                min={retirementAge + 1}
                max="110"
                value={lifeExpectancy}
                onChange={(e) => setLifeExpectancy(Math.max(retirementAge + 1, Math.min(110, Number(e.target.value))))}
                className="w-full px-3 py-2 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl focus:outline-none focus:border-emerald-500 text-center"
              />
            </div>
          </div>

          {/* Monthly Expenses Today */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Current Monthly Living Expenses (In Today's values)
              </label>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 rounded-full">
                {formatValue(monthlyExpenseToday)}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="500000"
              step="5000"
              value={monthlyExpenseToday}
              onChange={(e) => setMonthlyExpenseToday(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Current Nest Egg */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Current Accumulated Nest Egg Savings
              </label>
              <span className="text-sm font-bold text-slate-700 dark:text-white">
                {formatValue(currentSavings)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10000000"
              step="20000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-505"
            />
          </div>

          {/* Assumptions Accordion */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Compass className="w-4 h-4 text-emerald-500" />
              Pre & Post Retirement Economic Assumptions
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Projected Inflation (% p.a.)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-center rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Pre-Retire Returns (% p.a.)</label>
                <input
                  type="number"
                  step="0.1"
                  value={preRetirementReturn}
                  onChange={(e) => setPreRetirementReturn(Math.max(0.1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-center rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Post-Retire Returns (% p.a.)</label>
                <input
                  type="number"
                  step="0.1"
                  value={postRetirementReturn}
                  onChange={(e) => setPostRetirementReturn(Math.max(0.1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-center rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS SUMMARY CARD */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Nest Egg Calculation</h3>

            <div className="bg-emerald-500/[0.04] p-5 rounded-xl border border-emerald-500/10 text-center relative overflow-hidden">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Inflation Adjusted Target Corpus Needed</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 block truncate">{formatValue(targetCorpus)}</span>
              <span className="text-[10px] text-slate-400 block mt-1">
                to fund your lifestyle from age {retirementAge} to {lifeExpectancy} ({postRetirementYears} years)
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 block">Est. Inflation Monthly Cost at Age {retirementAge}</span>
                <span className="font-extrabold text-slate-700 dark:text-slate-200 text-right">{formatValue(monthlyExpenseAtRetirement)}/mo</span>
              </div>
              
              <div className="bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 block">Future Value of Existing Savings</span>
                <span className="font-extrabold text-slate-700 dark:text-slate-200 text-right">{formatValue(fvSavings)}</span>
              </div>

              <div className="bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-850 flex justify-between items-center text-xs">
                <span className="font-bold text-slate-500 dark:text-slate-400">Net Additional Nest Egg Required</span>
                <span className="font-black text-rose-500 text-right">{formatValue(netCorpusNeeded)}</span>
              </div>
            </div>

            {/* Main call to action recommendation */}
            <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Recommended Saving Rate</span>
              <span className="text-xl font-extrabold text-emerald-500 block">{formatValue(requiredMonthlySavings)}</span>
              <span className="text-[9px] text-slate-400 block mt-0.5">invested monthly at {preRetirementReturn}% returns for the next {activeYears} years</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
