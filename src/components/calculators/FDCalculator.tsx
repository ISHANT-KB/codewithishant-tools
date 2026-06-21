import { useState } from 'react';
import { Coins, HelpCircle, ShieldCheck, Wallet, ArrowRight, CircleDot, Activity } from 'lucide-react';

const COMPOUND_PRESETS = [
  { label: 'Quarterly (Most Common)', value: 4 },
  { label: 'Monthly', value: 12 },
  { label: 'Half-Yearly', value: 2 },
  { label: 'Yearly', value: 1 }
];

export default function FDCalculator() {
  const [currency, setCurrency] = useState<string>('₹');
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.1);
  const [durationValue, setDurationValue] = useState<number>(5);
  const [durationType, setDurationType] = useState<'years' | 'months'>('years');
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(4); // Quarterly default
  const [isSeniorCitizen, setIsSeniorCitizen] = useState<boolean>(false);

  // Apply senior citizen premium if checked (typically +0.5%)
  const effectiveRate = interestRate + (isSeniorCitizen ? 0.5 : 0);

  // Conversion of period to years
  const T = durationType === 'years' ? durationValue : durationValue / 12;
  const P = principal;
  const n = compoundingFrequency;
  const r = effectiveRate / 100;

  // Formula: Maturity Amount (A) = P * (1 + r/n)^(n*t)
  const maturityAmount = P * Math.pow(1 + r / n, n * T);
  const interestEarned = Math.max(0, maturityAmount - P);

  // Formatter helper
  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency === '₹' ? 'INR' : currency === '$' ? 'USD' : currency === '€' ? 'EUR' : 'GBP',
      maximumFractionDigits: 0,
    }).format(val).replace('INR', '₹').replace('USD', '$').replace('EUR', '€').replace('GBP', '£');
  };

  // Pie chart calculation
  const total = maturityAmount;
  const principalPercentage = (P / total) * 100;
  const interestPercentage = (interestEarned / total) * 100;

  // SVG circular progress offsets
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (interestPercentage / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="fd-calculator-container">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <Coins className="w-5 h-5 text-amber-500" />
            Fixed Deposit (FD) Calculator
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Calculate interest earnings, maturity wealth, and return grids of stable bank Fixed Deposits.
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
          {/* Total Principal */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Deposit Principal Amount
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value)))}
                  className="w-28 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="5000"
              max="5000000"
              step="5000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{formatValue(5000)}</span>
              <span>{formatValue(1000000)}</span>
              <span>{formatValue(5000000)}</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Annual Interest Rate (% p.a.)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-20 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-amber-500"
                />
                <span className="text-xs text-slate-400 font-medium">%</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.05"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1%</span>
              <span>7.5%</span>
              <span>15%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                FD Maturity Tenure
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={durationValue}
                  onChange={(e) => setDurationValue(Math.max(1, Number(e.target.value)))}
                  className="w-16 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-amber-500"
                />
                <select
                  value={durationType}
                  onChange={(e) => {
                    setDurationType(e.target.value as 'years' | 'months');
                    setDurationValue(e.target.value === 'years' ? 5 : 60);
                  }}
                  className="px-2 py-1 text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max={durationType === 'years' ? 25 : 300}
              step="1"
              value={durationValue}
              onChange={(e) => setDurationValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 {durationType}</span>
              <span>{durationType === 'years' ? '12 Years' : '150 Months'}</span>
              <span>{durationType === 'years' ? '25 Years' : '300 Months'}</span>
            </div>
          </div>

          {/* Compounding and Senior Citizen Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Compounding Mode</label>
              <select
                value={compoundingFrequency}
                onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 dark:text-slate-200"
              >
                {COMPOUND_PRESETS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Investor Type</label>
              <button
                onClick={() => setIsSeniorCitizen(!isSeniorCitizen)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm border rounded-xl font-medium transition cursor-pointer ${
                  isSeniorCitizen
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400'
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span>Senior Citizen (+0.50% Extra)</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  isSeniorCitizen ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {isSeniorCitizen && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* RESULTS SUMMARY CARD */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-amber-50/20 dark:from-slate-950 dark:to-amber-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">FD Summary</h3>

            {/* Total Corpus */}
            <div className="bg-amber-500/[0.04] p-5 rounded-xl border border-amber-500/10 text-center relative overflow-hidden">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Maturity Capital Valuation</span>
              <span className="text-3xl font-black text-amber-500">{formatValue(maturityAmount)}</span>
              <span className="text-[10px] text-slate-400 block mt-1">
                on {effectiveRate.toFixed(2)}% effective rate of interest
              </span>
            </div>

            {/* Circular Chart Representation */}
            <div className="flex items-center justify-center gap-6 py-2 bg-white dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-850">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="stroke-slate-100 dark:stroke-slate-800"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="stroke-amber-500 transition-all duration-500"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Interest</span>
                  <span className="text-sm font-extrabold text-slate-700 dark:text-slate-300">
                    {interestPercentage.toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="text-left space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-650" />
                  <div className="text-xs">
                    <span className="text-slate-400 block">Principal sum</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{formatValue(P)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="text-xs">
                    <span className="text-slate-400 block">Interest earned</span>
                    <span className="font-bold text-amber-500">{formatValue(interestEarned)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown details */}
            <div className="space-y-3">
              <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Wallet className="w-4 h-4 text-slate-400" /> Invested Principal
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{formatValue(P)}</span>
              </div>

              <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <CircleDot className="w-4 h-4 text-amber-500" /> Cumulative Interest
                </span>
                <span className="text-sm font-bold text-amber-550 dark:text-amber-400">{formatValue(interestEarned)}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-500/5 dark:bg-amber-400/5 rounded-xl border border-amber-500/10 text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Compounding Advice:</span>
              <p>Choosing a higher compounding mode (e.g. quarterly or monthly) produces faster compound growth than annually, leading to increased overall yields.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
