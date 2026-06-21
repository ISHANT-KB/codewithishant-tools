import { useState } from 'react';
import { PiggyBank, ShieldCheck, Wallet, ArrowRight, CircleDot } from 'lucide-react';

export default function RDCalculator() {
  const [currency, setCurrency] = useState<string>('₹');
  const [monthlyAmount, setMonthlyAmount] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(6.8);
  const [tenureMonths, setTenureMonths] = useState<number>(36); // 3 Years default
  const [isSeniorCitizen, setIsSeniorCitizen] = useState<boolean>(false);

  // Apply senior citizen premium (+0.5%)
  const effectiveRate = interestRate + (isSeniorCitizen ? 0.5 : 0);

  // Precise bank RD quarterly compounding loop
  let maturityValue = 0;
  let totalInvested = 0;
  
  for (let k = 1; k <= tenureMonths; k++) {
    // k represents the number of months the k-th installment earns interest
    // standard banking RD formula uses Quarterly Compounding (4 times a year)
    const quartersRemaining = k / 3;
    const ratePerQuarter = (effectiveRate / 100) / 4;
    const installmentMaturity = monthlyAmount * Math.pow(1 + ratePerQuarter, quartersRemaining);
    
    maturityValue += installmentMaturity;
    totalInvested += monthlyAmount;
  }

  const interestEarned = Math.max(0, maturityValue - totalInvested);

  // Formatter helper
  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency === '₹' ? 'INR' : currency === '$' ? 'USD' : currency === '€' ? 'EUR' : 'GBP',
      maximumFractionDigits: 0,
    }).format(val).replace('INR', '₹').replace('USD', '$').replace('EUR', '€').replace('GBP', '£');
  };

  // Percent representation
  const total = maturityValue;
  const principalPercentage = (totalInvested / total) * 100;
  const interestPercentage = (interestEarned / total) * 100;

  // SVG representation support
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (interestPercentage / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="rd-calculator-container">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <PiggyBank className="w-5 h-5 text-indigo-500" />
            Recurring Deposit (RD) Calculator
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Calculate maturity earnings and regular interest returns for structured monthly savings.
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
          {/* Monthly Deposit Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Monthly Deposit Installment
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Math.max(0, Number(e.target.value)))}
                  className="w-28 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="500"
              max="250000"
              step="500"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{formatValue(500)}</span>
              <span>{formatValue(100000)}</span>
              <span>{formatValue(250000)}</span>
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
                  className="w-20 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-indigo-500"
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
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
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
                Saving Duration (Months)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Math.max(1, Number(e.target.value)))}
                  className="w-20 px-3 py-1 text-sm font-bold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-right rounded-lg focus:outline-none focus:border-indigo-500"
                />
                <span className="text-xs text-slate-400 font-medium">months</span>
              </div>
            </div>
            <input
              type="range"
              min="3"
              max="120"
              step="1"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>3 months</span>
              <span>5 Years (60m)</span>
              <span>10 Years (120m)</span>
            </div>
          </div>

          {/* Senior Citizens options */}
          <div className="pt-2">
            <button
              onClick={() => setIsSeniorCitizen(!isSeniorCitizen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm border rounded-xl font-medium transition cursor-pointer ${
                isSeniorCitizen
                  ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-455'
                  : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <span>Apply Senior Citizen Premium (+0.50% Extra return)</span>
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                isSeniorCitizen ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-300 bg-white'
              }`}>
                {isSeniorCitizen && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
              </span>
            </button>
          </div>
        </div>

        {/* RESULTS SUMMARY CARD */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-indigo-50/20 dark:from-slate-950 dark:to-indigo-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">RD Maturity Summary</h3>

            {/* Total Corpus */}
            <div className="bg-indigo-500/[0.04] p-5 rounded-xl border border-indigo-500/10 text-center relative overflow-hidden">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Maturity Value</span>
              <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{formatValue(maturityValue)}</span>
              <span className="text-[10px] text-slate-400 block mt-1">
                over {(tenureMonths/12).toFixed(1)} years (Total {tenureMonths} installments)
              </span>
            </div>

            {/* Circular Chart */}
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
                    className="stroke-indigo-500 transition-all duration-500"
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
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-655" />
                  <div className="text-xs">
                    <span className="text-slate-400 block">Invested Capital</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{formatValue(totalInvested)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <div className="text-xs">
                    <span className="text-slate-400 block">Total Interest</span>
                    <span className="font-bold text-indigo-500">{formatValue(interestEarned)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Wallet className="w-4 h-4 text-slate-400" /> Total Deposit Sum
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{formatValue(totalInvested)}</span>
              </div>

              <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <CircleDot className="w-4 h-4 text-indigo-500" /> Compound Wealth Gained
                </span>
                <span className="text-sm font-bold text-indigo-650 dark:text-indigo-400">{formatValue(interestEarned)}</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-550/5 rounded-xl border border-indigo-500/10 text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
              <span className="font-bold text-slate-700 dark:text-slate-350 block">Recurring vs One-time:</span>
              <p>RDs let you build robust corpuses through low modular daily/weekly/monthly payments without locking away vast capital sums upfront.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
