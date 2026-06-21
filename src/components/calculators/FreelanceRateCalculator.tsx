import { useState } from 'react';
import { DollarSign, Briefcase, Calendar, ShieldCheck, Clock, Award } from 'lucide-react';

export default function FreelanceRateCalculator() {
  const [targetIncome, setTargetIncome] = useState<number>(75000);
  const [expenses, setExpenses] = useState<number>(12000);
  const [taxRate, setTaxRate] = useState<number>(25); // as percentage
  const [weeksOff, setWeeksOff] = useState<number>(4); // weeks of vacation/sick leave
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);

  // Derivations
  const totalWeeks = 52 - weeksOff;
  const billableWeeks = totalWeeks > 0 ? totalWeeks : 1;
  const totalBillableHours = billableWeeks * billableHoursPerWeek;

  // Gross Income needed to net targetIncome + expenses after tax percentage
  // Net = (Gross - Expenses) * (1 - taxRate/100)
  // TargetIncome = (Gross - Expenses) * (1 - taxRate/100)
  // (Gross - Expenses) = TargetIncome / (1 - taxRate/100)
  // Gross = [TargetIncome / (1 - taxRate/100)] + Expenses
  const taxFactor = 1 - taxRate / 100;
  const grossIncomeNeeded = taxFactor > 0 
    ? (targetIncome / taxFactor) + expenses 
    : targetIncome + expenses;

  const hourlyRate = totalBillableHours > 0 ? Math.ceil(grossIncomeNeeded / totalBillableHours) : 0;
  const dailyRate = hourlyRate * 8; // assuming standard 8-hour shift equivalent
  const weeklyRate = hourlyRate * billableHoursPerWeek;

  // Formatting currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="freelance-rate-calculator-container">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
          <Briefcase className="w-5 h-5 text-emerald-500" />
          Freelance Hourly & Daily Rate Calculator
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Calculate your optimal freelance rate based on target net income, realistic billable hours, business overheads, and local tax buffer specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT PANEL */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            {/* Target Income */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  Target Net Income (Take-Home)
                </label>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(targetIncome)}/year
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="250000"
                step="5000"
                value={targetIncome}
                onChange={(e) => setTargetIncome(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>$10,000</span>
                <span>$125,000</span>
                <span>$250,000</span>
              </div>
            </div>

            {/* Business Expenses */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Annual Business Expenses
                </label>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(expenses)}/year
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Include software subscriptions, hardware replacement, insurance, coworking desk, etc.</p>
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>$0</span>
                <span>$25,000</span>
                <span>$50,000</span>
              </div>
            </div>

            {/* Income Tax Buffer */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  Average Income Tax & Social Security Buffer
                </label>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {taxRate}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0% (No taxes)</span>
                <span>25%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Weeks and Billable Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Weeks Off (Vacation + Sick)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={weeksOff}
                    onChange={(e) => setWeeksOff(Math.max(0, Math.min(20, Number(e.target.value))))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <span className="absolute right-3.5 top-3 text-xs text-slate-400">weeks/yr</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Billable Hours per Week
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="80"
                    value={billableHoursPerWeek}
                    onChange={(e) => setBillableHoursPerWeek(Math.max(1, Math.min(80, Number(e.target.value))))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <span className="absolute right-3.5 top-3 text-xs text-slate-400">hrs/week</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Typically 20-30 hrs. Rest goes to admin/leads.</p>
              </div>
            </div>

          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Your Calculated Rates</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Hourly Rate</span>
                <span className="text-2xl font-black text-emerald-500">{formatCurrency(hourlyRate)}</span>
                <span className="text-[10px] text-slate-400 block mt-1">per billable hour</span>
              </div>

              <div className="bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Daily Rate</span>
                <span className="text-2xl font-black text-emerald-500">{formatCurrency(dailyRate)}</span>
                <span className="text-[10px] text-slate-400 block mt-1">based on 8-hr day</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Weekly Earnings Needed</span>
                  <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{formatCurrency(weeklyRate)}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block mb-1">Annual Gross Target</span>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{formatCurrency(grossIncomeNeeded)}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/50 space-y-2">
              <div className="flex justify-between text-xs py-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Work Weeks / Year
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{billableWeeks} weeks</span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Total Billable Hours
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{totalBillableHours} hours/yr</span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Effective Tax Retained
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{formatCurrency(grossIncomeNeeded - targetIncome - expenses)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[11px] text-slate-400 bg-emerald-500/5 dark:bg-emerald-400/5 p-3 rounded-lg border border-emerald-500/10 text-center">
            Pro tip: Always charge 15-20% higher than your computed rate to account for unbilled client negotiations and pitch overheads!
          </div>
        </div>
      </div>
    </div>
  );
}
