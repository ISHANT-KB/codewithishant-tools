import { useState } from 'react';
import { TrendingUp, Percent, Calendar, ShieldCheck, DollarSign, Wallet, ArrowRight, CircleDot } from 'lucide-react';

const RETURN_PRESETS = [
  { label: 'Conservative (Debt/Gold)', rate: 8, color: 'bg-slate-50 dark:bg-slate-950/30' },
  { label: 'Moderate (Index Funds)', rate: 12, color: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600' },
  { label: 'Aggressive (Mid/Small Cap)', rate: 15, color: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600' },
];

export default function SipCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12); // 12% default
  const [tenureYears, setTenureYears] = useState<number>(10); // 10 years default

  // SIP Math
  const P = monthlyAmount;
  const annualR = expectedReturn;
  const r = (annualR / 100) / 12; // Monthly rate
  const t = tenureYears * 12; // total months

  // M = P * [ ((1 + r)^t - 1) / r ] * (1 + r)
  let maturityValue = 0;
  if (r > 0) {
    maturityValue = P * ((Math.pow(1 + r, t) - 1) / r) * (1 + r);
  } else {
    maturityValue = P * t;
  }

  const totalInvested = P * t;
  const wealthGained = Math.max(0, maturityValue - totalInvested);

  // Formatting currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="sip-calculator-container">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          SIP (Systematic Investment Plan) Calculator
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Determine the long-term wealth accumulated, interest accrued, and maturity valuation of your monthly compounding mutual funds or equity SIP allocations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT PANEL */}
        <div className="lg:col-span-7 space-y-6">
          {/* Monthly Investment */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Monthly SIP Contribution
              </label>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-55 dark:bg-emerald-950/20 px-3 py-1 rounded-full">
                {formatCurrency(monthlyAmount)}/month
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>₹500</span>
              <span>₹50,000</span>
              <span>₹1,00,000+</span>
            </div>
          </div>

          {/* Expected Interest */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Expected Annual Return Rate
              </label>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-55 dark:bg-emerald-950/20 px-3 py-1 rounded-full">
                {expectedReturn}% p.a.
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1%</span>
              <span>15%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Time Horizon */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Maturity Time Period (Years)
              </label>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-55 dark:bg-emerald-950/20 px-3 py-1 rounded-full">
                {tenureYears} Years
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 Year</span>
              <span>20 Years</span>
              <span>40 Years</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2 pt-2">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Typical return standards</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {RETURN_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setExpectedReturn(preset.rate)}
                  className={`p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-left cursor-pointer transition hover:-translate-y-0.5 hover:shadow-sm ${preset.color} font-medium flex justify-between items-center`}
                >
                  <span className="text-slate-700 dark:text-slate-300">{preset.label}</span>
                  <span className="font-bold">{preset.rate}%</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTS SUMMARY CARD */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">SIP Accumulated Wealth</h3>

            {/* Total Corpus */}
            <div className="bg-emerald-500/[0.04] p-4.5 rounded-xl border border-emerald-500/10 text-center">
              <span className="text-xs text-slate-400 block mb-1">Expected Maturity Amount</span>
              <span className="text-3xl font-black text-emerald-500">{formatCurrency(maturityValue)}</span>
              <span className="text-[10px] text-slate-400 block mt-1">over {tenureYears} years investment</span>
            </div>

            <div className="space-y-3">
              <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Wallet className="w-4 h-4 text-slate-400" /> Invested Sum
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{formatCurrency(totalInvested)}</span>
              </div>

              <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <CircleDot className="w-4 h-4 text-emerald-500" /> Wealth Gained
                </span>
                <span className="text-sm font-bold text-emerald-500">{formatCurrency(wealthGained)}</span>
              </div>
            </div>

            {/* Compounding Pro Tip Info */}
            <div className="p-3 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-xl border border-emerald-500/10 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
              <p className="font-bold text-slate-700 dark:text-slate-350">The Power of Compounding:</p>
              <p>Your interest earns interest over time. If you double your tenure from 10 to 20 years, your overall wealth doesn't just double; it compounding accelerates exponentially!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
