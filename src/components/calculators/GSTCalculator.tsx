import { useState } from 'react';
import { Receipt, Percent, FileText, ArrowUpDown, ChevronRight, CornerDownRight } from 'lucide-react';

export default function GSTCalculator() {
  const [amount, setAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18); // 18% default standard
  const [isInclusive, setIsInclusive] = useState<boolean>(false); // false = GST Exclusive (Add GST), true = GST Inclusive (Remove GST)
  const [customRate, setCustomRate] = useState<string>('');

  const activeRate = customRate !== '' ? Number(customRate) : gstRate;

  // Real-time calculation
  let baseAmount = 0;
  let gstAmount = 0;
  let totalAmount = 0;

  if (isInclusive) {
    // Inclusive: Amount includes GST
    // Amount = Base * (1 + Rate/100)
    // Base = Amount / (1 + Rate/100)
    baseAmount = amount / (1 + activeRate / 100);
    gstAmount = amount - baseAmount;
    totalAmount = amount;
  } else {
    // Exclusive: Amount does not include GST
    baseAmount = amount;
    gstAmount = amount * (activeRate / 100);
    totalAmount = amount + gstAmount;
  }

  // Dual breakdowns
  const cgstAmount = gstAmount / 2;
  const sgstAmount = gstAmount / 2;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handleRateSelect = (rate: number) => {
    setGstRate(rate);
    setCustomRate('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="gst-calculator-container">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
          <Receipt className="w-5 h-5 text-emerald-500" />
          GST (Goods & Services Tax) Calculator
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Calculate exclusive or inclusive GST instantly for custom values. Features dual CGST/SGST breakdowns and standard commercial tax slabs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT LAYOUT */}
        <div className="lg:col-span-7 space-y-6">
          {/* Base Amount */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Enter Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-450 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                value={amount === 0 ? '' : amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-sm focus:outline-none focus:border-emerald-500 font-medium"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Exclusive vs Inclusive Toggles */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Calculation Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsInclusive(false)}
                className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${!isInclusive ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50'}`}
              >
                Add GST (Exclusive)
              </button>
              <button
                onClick={() => setIsInclusive(true)}
                className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${isInclusive ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50'}`}
              >
                Remove GST (Inclusive)
              </button>
            </div>
          </div>

          {/* Standard Slabs */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1">
              <Percent className="w-4 h-4 text-emerald-500" />
              Tax Rates & Standard Slabs
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[5, 12, 18, 28].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleRateSelect(rate)}
                  className={`py-2.5 px-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${gstRate === rate && customRate === '' ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-450' : 'bg-white dark:bg-slate-900 dark:border-slate-800 text-slate-650 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  {rate}%
                </button>
              ))}
              {/* Custom rate input button container */}
              <div className="relative">
                <input
                  type="number"
                  placeholder="Custom"
                  value={customRate}
                  onChange={(e) => setCustomRate(e.target.value)}
                  className={`w-full py-2.5 px-2 text-center rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white ${customRate !== '' ? 'border-emerald-500 ring-2 ring-emerald-500/10' : ''}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RECEIPT / BILL DETAILS */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> Tax Summary Receipt
            </h3>

            <div className="space-y-3.5 border-b border-slate-200/50 dark:border-slate-800/80 pb-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Net Unit Price (Base Value)</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(baseAmount)}</span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Total GST ({activeRate}%)</span>
                <span className="font-semibold text-emerald-500">+{formatCurrency(gstAmount)}</span>
              </div>
            </div>

            {/* Split Slabs CGST/SGST Details */}
            <div className="bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1">State & Central splits</span>
              
              <div className="flex items-center text-xs justify-between">
                <span className="text-slate-400 flex items-center gap-0.5">
                  <CornerDownRight className="w-3 h-3 text-slate-400" /> CGST (Central Tax - {activeRate / 2}%)
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-350">{formatCurrency(cgstAmount)}</span>
              </div>

              <div className="flex items-center text-xs justify-between">
                <span className="text-slate-400 flex items-center gap-0.5">
                  <CornerDownRight className="w-3 h-3 text-slate-400" /> SGST (State Tax - {activeRate / 2}%)
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-350">{formatCurrency(sgstAmount)}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-4">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Total Payable Sum</span>
                <span className="text-lg font-black text-emerald-500">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[10px] text-slate-400 bg-slate-100/50 dark:bg-slate-900/40 p-3 rounded-lg text-center border border-slate-200/20">
            For interstate trading, whole tax amount computes under <strong>IGST (Integrated GST)</strong> valued at {activeRate}%.
          </div>
        </div>
      </div>
    </div>
  );
}
