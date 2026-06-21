import { useState, useEffect } from 'react';
import { DollarSign, RefreshCw } from 'lucide-react';
import ShareResults from '../ShareResults';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Prepopulate query parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qAmount = params.get('emi_amount');
    const qRate = params.get('emi_rate');
    const qTenure = params.get('emi_tenure');

    if (qAmount) setLoanAmount(Math.max(0, parseFloat(qAmount) || 0));
    if (qRate) setInterestRate(Math.max(0, parseFloat(qRate) || 0));
    if (qTenure) setTenureYears(Math.max(1, parseInt(qTenure) || 1));
  }, []);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenureYears]);

  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100; // Monthly interest rate
    const n = tenureYears * 12; // Tenure in months

    if (P <= 0 || r <= 0 || n <= 0) {
      setEmi(0);
      setTotalInterest(0);
      setTotalAmount(0);
      return;
    }

    // Formula: EMI = [P * r * (1+r)^n] / [(1+r)^n - 1]
    const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayableValue = emiValue * n;
    const interestPayableValue = totalPayableValue - P;

    setEmi(parseFloat(emiValue.toFixed(2)));
    setTotalAmount(parseFloat(totalPayableValue.toFixed(2)));
    setTotalInterest(parseFloat(interestPayableValue.toFixed(2)));
  };

  const handleReset = () => {
    setLoanAmount(50000);
    setInterestRate(7.5);
    setTenureYears(5);
  };

  return (
    <div className="space-y-6" id="emi-calc-wrapper">
      
      {/* Dynamic Sliders and Inputs */}
      <div className="space-y-5">
        
        {/* Loan Principal input & Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Loan Amount ($)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-28 px-2 py-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-right font-semibold text-sm focus:outline-emerald-500"
            />
          </div>
          <input
            type="range"
            min="1000"
            max="1000000"
            step="1000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Interest rate input & slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Annual Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-20 px-2 py-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-right font-semibold text-sm focus:outline-emerald-500"
            />
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Tenure input & slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              value={tenureYears}
              onChange={(e) => setTenureYears(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 px-2 py-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-right font-semibold text-sm focus:outline-emerald-500"
            />
          </div>
          <input
            type="range"
            min="1"
            max="35"
            step="1"
            value={tenureYears}
            onChange={(e) => setTenureYears(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={handleReset}
          className="w-full py-2.5 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-850/80 text-slate-700 dark:text-slate-350 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          id="btn-emi-reset"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset EMI Configuration</span>
        </button>
      </div>

      {/* Amortized Summary Blocks */}
      <div className="mt-8 border-t border-slate-100 dark:border-slate-800/80 pt-6 space-y-4" id="emi-calc-results">
        <div className="bg-slate-90 * bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 text-center">
          <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wider font-bold">Estimated Monthly EMI Payment</span>
          <div className="text-4xl font-extrabold text-emerald-500 font-mono">
            ${emi.toLocaleString()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900/15 p-4 rounded-xl border border-slate-200 dark:border-slate-850 text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Total Interest Payable</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100 font-mono">${totalInterest.toLocaleString()}</span>
          </div>
          <div className="bg-white dark:bg-slate-900/15 p-4 rounded-xl border border-slate-200 dark:border-slate-850 text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Total Payment Amount</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100 font-mono">${totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {emi > 0 && (
          <ShareResults
            toolId="emi-calculator"
            toolName="EMI Loan Analysis"
            textToCopy={`EMI Monthly Payment: $${emi.toLocaleString()}. Total interest: $${totalInterest.toLocaleString()}, Total Payable: $${totalAmount.toLocaleString()}. Loan amount: $${loanAmount.toLocaleString()} at ${interestRate}% for ${tenureYears} years.`}
            shareUrlParams={{
              emi_amount: loanAmount,
              emi_rate: interestRate,
              emi_tenure: tenureYears
            }}
            mainMetric={{
              label: 'Monthly EMI',
              value: `$${emi.toLocaleString()}`,
              subLabel: 'Estimated monthly budget',
              color: 'emerald'
            }}
            additionalMetrics={[
              { label: 'Loan Principal Amount', value: `$${loanAmount.toLocaleString()}` },
              { label: 'Annual Interest Rate', value: `${interestRate}%` },
              { label: 'Total Tenure Length', value: `${tenureYears} Years` },
              { label: 'Sum of Interest Accrued', value: `$${totalInterest.toLocaleString()}` }
            ]}
          />
        )}
      </div>

    </div>
  );
}
