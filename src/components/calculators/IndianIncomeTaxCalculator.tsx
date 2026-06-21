import { useState } from 'react';
import { IndianRupee, HelpCircle, Briefcase, FileSpreadsheet, Percent, Calculator, ArrowRight, Shield } from 'lucide-react';

export default function IndianIncomeTaxCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(1000000); // 10 Lakhs default
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [isSalaried, setIsSalaried] = useState<boolean>(true);

  // Old Regime Deductions
  const [sec80C, setSec80C] = useState<number>(150000); // 1.5 Lakh max
  const [sec80D, setSec80D] = useState<number>(25000);  // Health Insurance
  const [hraExemption, setHraExemption] = useState<number>(0);
  const [otherDeductions, setOtherDeductions] = useState<number>(0);

  // Calculations
  const standardDeductionNew = isSalaried ? 75000 : 0;
  const standardDeductionOld = isSalaried ? 50000 : 0;

  const totalGross = grossSalary + otherIncome;

  // 1. Calculate New Regime Tax (FY 2025-26 / AY 2026-27 proposal blocks)
  const taxableIncomeNew = Math.max(0, totalGross - standardDeductionNew);

  const getNewRegimeTax = (income: number) => {
    // Slabs:
    // Up to 4,00,000: Nil
    // 4,00,001 to 8,00,000: 5%
    // 8,00,001 to 12,00,000: 10%
    // 12,00,001 to 16,00,000: 15%
    // 16,00,001 to 20,00,000: 20%
    // Above 20,00,000: 30%
    let calculatedTax = 0;

    if (income <= 400000) {
      calculatedTax = 0;
    } else if (income <= 800000) {
      calculatedTax = (income - 400000) * 0.05;
    } else if (income <= 1200000) {
      calculatedTax = (400000 * 0.05) + (income - 800000) * 0.10;
    } else if (income <= 1600000) {
      calculatedTax = (400000 * 0.05) + (400000 * 0.10) + (income - 1200000) * 0.15;
    } else if (income <= 2000000) {
      calculatedTax = (400000 * 0.05) + (400000 * 0.10) + (400000 * 0.15) + (income - 1600000) * 0.20;
    } else {
      const slab1 = 400000 * 0.05; // 20000
      const slab2 = 400000 * 0.10; // 40000
      const slab3 = 400000 * 0.15; // 60000
      const slab4 = 400000 * 0.20; // 80000
      calculatedTax = slab1 + slab2 + slab3 + slab4 + (income - 2000000) * 0.30;
    }

    // 87A rebate for New regime: Income up to 7 Lakhs net has rebate
    if (income <= 700000) {
      calculatedTax = 0; // Completely tax free under standard 87A
    }

    return calculatedTax;
  };

  // 2. Calculate Old Regime Tax
  // Deductions capped
  const capped80C = Math.min(150000, sec80C);
  const capped80D = Math.min(75000, sec80D);
  const totalDeductionsOld = standardDeductionOld + capped80C + capped80D + hraExemption + otherDeductions;
  const taxableIncomeOld = Math.max(0, totalGross - totalDeductionsOld);

  const getOldRegimeTax = (income: number) => {
    // Slabs:
    // Up to 2,50,000: Nil
    // 2,50,001 to 5,00,000: 5%
    // 5,00,001 to 10,00,000: 20%
    // Above 10,00,000: 30%
    let calculatedTax = 0;

    if (income <= 250000) {
      calculatedTax = 0;
    } else if (income <= 500000) {
      calculatedTax = (income - 250000) * 0.05;
    } else if (income <= 1000000) {
      calculatedTax = (250000 * 0.05) + (income - 500000) * 0.20;
    } else {
      calculatedTax = (250000 * 0.05) + (500000 * 0.20) + (income - 1000000) * 0.30;
    }

    // 87A rebate for Old regime: Net taxable income up to 5 Lakhs gets rebate up to ₹12,500
    if (income <= 500000) {
      calculatedTax = 0;
    }

    return calculatedTax;
  };

  const rawTaxNew = getNewRegimeTax(taxableIncomeNew);
  const cessNew = Math.round(rawTaxNew * 0.04);
  const finalTaxNew = Math.round(rawTaxNew + cessNew);

  const rawTaxOld = getOldRegimeTax(taxableIncomeOld);
  const cessOld = Math.round(rawTaxOld * 0.04);
  const finalTaxOld = Math.round(rawTaxOld + cessOld);

  const taxSaved = finalTaxOld - finalTaxNew;

  const formatRupee = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="indian-income-tax-calculator-container">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
          <Calculator className="w-5 h-5 text-emerald-500" />
          Indian Income Tax Calculator & Comparison (FY 2025-26)
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Compare your tax liability under the revised New Tax Regime (Union Budget 2025 announcements) against the Old Tax Regime with standard deductions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT PANEL */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">1. Basic Income details</h3>

            {/* Salaried Toggle */}
            <div className="flex items-center justify-between py-1">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Salaried Individual?</span>
              <button
                onClick={() => setIsSalaried(!isSalaried)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isSalaried ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${isSalaried ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Income Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-slate-450" /> Annual Gross Salary
              </label>
              <input
                type="number"
                value={grossSalary === 0 ? '' : grossSalary}
                onChange={(e) => setGrossSalary(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
                placeholder="₹ Amount"
              />
            </div>

            {/* Other Income Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Income from Other Sources (Interest, Rental, etc.)
              </label>
              <input
                type="number"
                value={otherIncome === 0 ? '' : otherIncome}
                onChange={(e) => setOtherIncome(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-sm focus:outline-none focus:border-emerald-500"
                placeholder="₹ Other earnings"
              />
            </div>
          </div>

          {/* DEDUCTIONS SECTION (OLD REGIME ONLY) */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-00/60 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
              <Shield className="w-4 h-4 text-emerald-500" />
              2. Old Regime Deductions & Exemptions
            </h3>
            <p className="text-[11px] text-slate-400">These investments only decrease your tax liability under the Old Regime.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Section 80C (PPF, ELSS, LIC)
                </label>
                <input
                  type="number"
                  value={sec80C}
                  onChange={(e) => setSec80C(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none"
                  max="150000"
                />
                <span className="text-[10px] text-slate-400">Max ₹1,50,000 exemption capped</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Section 80D (Health Premium)
                </label>
                <input
                  type="number"
                  value={sec80D}
                  onChange={(e) => setSec80D(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  HRA Exemption / Rent Deductions
                </label>
                <input
                  type="number"
                  value={hraExemption}
                  onChange={(e) => setHraExemption(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Section 24 (Home Loan Interest)
                </label>
                <input
                  type="number"
                  value={otherDeductions}
                  onChange={(e) => setOtherDeductions(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* COMPARISON RESULTS */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-emerald-500/5 dark:bg-emerald-400/5 border border-emerald-500/15 p-5 rounded-2xl flex flex-col items-center justify-center text-center">
            {taxSaved > 0 ? (
              <>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Tax regime savings</span>
                <span className="text-3xl font-black text-emerald-500 mb-2">{formatRupee(taxSaved)}</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  You save tax by choosing the <strong className="text-emerald-500">New Tax Regime</strong> this upcoming financial year!
                </p>
              </>
            ) : taxSaved < 0 ? (
              <>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Tax regime savings</span>
                <span className="text-3xl font-black text-emerald-500 mb-2">{formatRupee(Math.abs(taxSaved))}</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  You save tax by choosing the <strong className="text-emerald-500">Old Tax Regime</strong> due to your active investments!
                </p>
              </>
            ) : (
              <>
                <span className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Tax liability comparison</span>
                <span className="text-2xl font-black text-slate-750 dark:text-white mb-1">Equal Slabs</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">Both regimes yield identical tax payments on this income level.</p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NEW REGIME CARD */}
            <div className="border border-emerald-500/20 bg-emerald-500/[0.01] rounded-2xl p-5 space-y-4 relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl">RECOMMENDED</span>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800/80 pb-2">New Regime Slabs</h4>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-450 text-slate-400">Taxable Net Income:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formatRupee(taxableIncomeNew)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-450 text-slate-400">Standard Deduction:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">-{formatRupee(standardDeductionNew)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 dark:border-slate-850 pt-2 text-sm font-bold">
                  <span className="text-slate-800 dark:text-slate-100">Estimated Tax:</span>
                  <span className="text-emerald-500">{formatRupee(finalTaxNew)}</span>
                </div>
              </div>
            </div>

            {/* OLD REGIME CARD */}
            <div className="border border-slate-150 dark:border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800/80 pb-2">Old Regime Slabs</h4>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-450 text-slate-400">Taxable Net Income:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formatRupee(taxableIncomeOld)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-450 text-slate-400">Investments/Exemption:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">-{formatRupee(totalDeductionsOld)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 dark:border-slate-850 pt-2 text-sm font-bold">
                  <span className="text-slate-800 dark:text-slate-100">Estimated Tax:</span>
                  <span className="text-slate-750 dark:text-slate-200">{formatRupee(finalTaxOld)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl">
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-350 mb-2">New Regime Slab Structure (FY 2025-26):</h5>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] text-slate-400 font-mono">
              <div>₹0 - 4,00,000 : NIL</div>
              <div>₹4,00,001 - 8,00,000 : 5%</div>
              <div>₹8,00,001 - 12,00,050 : 10%</div>
              <div>₹12,00,001 - 16,00,000 : 15%</div>
              <div>₹16,00,001 - 20,00,000 : 20%</div>
              <div>Above ₹20,00,000 : 30%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
