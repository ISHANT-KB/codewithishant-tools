import { useState } from 'react';
import { Smartphone, Percent, Calendar, ShieldCheck, PieChart, Coins } from 'lucide-react';

export default function UpiEmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(15000);
  const [interestRate, setInterestRate] = useState<number>(24); // Annual Interest Rate (default 24% typical of pay later)
  const [tenure, setTenure] = useState<number>(3); // 3 months default
  const [processingFee, setProcessingFee] = useState<number>(2); // 2% processing fee

  // UPI EMI Calculations
  const P = loanAmount;
  const annualR = interestRate / 100;
  const r = annualR / 12; // Monthly rate
  const n = tenure;

  let emi = 0;
  if (r > 0) {
    emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else {
    emi = P / n;
  }

  const roundedEmi = Math.ceil(emi);
  const totalRepayment = roundedEmi * n;
  const totalInterest = Math.max(0, totalRepayment - P);
  const feeAmount = Math.round(P * (processingFee / 100));
  const totalCostOfCredit = totalInterest + feeAmount;
  const totalAmountPaid = P + totalCostOfCredit;

  // Format currency in Indian Rupees
  const formatRupee = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="upi-emi-calculator-container">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-emerald-500/10 dark:bg-emerald-400/10 p-1.5 rounded-lg text-emerald-500">
            <Smartphone className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            UPI EMI & Pay Later Cost Calculator
          </h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Analyze micro-loans, credit limits, and purchase options from popular pay-later wallets (Amazon Pay Later, Flipkart Pay Later, Paytm, Mobikwik ZIP) to reveal hidden charges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT PANEL */}
        <div className="lg:col-span-7 space-y-5">
          {/* Purchase Expense slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Purchase / Loan Amount
              </label>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {formatRupee(loanAmount)}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="150000"
              step="1000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>₹1,000</span>
              <span>₹75,000</span>
              <span>₹1,50,000</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1">
                <Percent className="w-4 h-4 text-emerald-500" />
                Interest Rate (p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="48"
                  step="1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, Math.min(48, Number(e.target.value))))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-sm focus:outline-none focus:border-emerald-500 mr-2"
                />
                <span className="absolute right-3.5 top-3 text-xs text-slate-400">%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">PayLater typical ranges: 18% - 36%</p>
            </div>

            {/* Tenure Options */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-emerald-500" />
                Tenure (Months)
              </label>
              <select
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value={1}>1 Month (Next Cycle)</option>
                <option value={3}>3 Months</option>
                <option value={6}>6 Months</option>
                <option value={9}>9 Months</option>
                <option value={12}>12 Months</option>
              </select>
            </div>

            {/* Processing Fee */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Processing Fee
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={processingFee}
                  onChange={(e) => setProcessingFee(Math.max(0, Math.min(10, Number(e.target.value))))}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
                />
                <span className="absolute right-3.5 top-3 text-xs text-slate-400">%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Typical flat fees vary 1% - 3% plus GST</p>
            </div>
          </div>

          {/* Quick Pay Later Presets Info */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <h4 className="font-bold text-slate-705 dark:text-slate-300">Quick Guide to UPI Pay-Later Schemes:</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Zero-Interest Window:</strong> Usually only valid strictly for 15 - 30 days bills, after which dynamic daily interest starts.</li>
              <li><strong>Hidden Processing Costs:</strong> A processing checkout fee can easily compound micro-interest rates on lower value items.</li>
            </ul>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">EMI & Repayment Details</h3>

            <div className="bg-emerald-500/[0.04] p-4 rounded-xl border border-emerald-500/10 text-center">
              <span className="text-xs text-slate-400 block mb-1">Equated Monthly Installment (EMI)</span>
              <span className="text-3xl font-black text-emerald-500">{formatRupee(roundedEmi)}</span>
              <span className="text-xs text-slate-400 block mt-1">for {tenure} months</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Total Interest Payable</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-200">{formatRupee(totalInterest)}</span>
              </div>

              <div className="bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Upfront Processing Fee</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-200">{formatRupee(feeAmount)}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" /> Principal Amount
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{formatRupee(P)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <PieChart className="w-3.5 h-3.5" /> Total Extra Charges
                </span>
                <span className="text-xs font-semibold text-red-500">+{formatRupee(totalCostOfCredit)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Total Repayment Sum</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{formatRupee(totalAmountPaid)}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 text-[10px] text-slate-400 text-center">
            Calculations are estimations. Actual checkout dashboards might add supplementary 18% GST on the processing fee amount.
          </div>
        </div>
      </div>
    </div>
  );
}
