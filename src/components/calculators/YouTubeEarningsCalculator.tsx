import { useState } from 'react';
import { Youtube, Eye, Award, DollarSign, TrendingUp, Sparkles } from 'lucide-react';

const RPM_PRESETS = [
  { name: 'Finance / SaaS', rpm: 12.50, color: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200' },
  { name: 'Tech / Gadgets', rpm: 6.50, color: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200' },
  { name: 'Education', rpm: 3.50, color: 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-200' },
  { name: 'Gaming / Comedy', rpm: 1.50, color: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200' },
  { name: 'Lifestyle / Vlogs', rpm: 2.20, color: 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-200' },
];

export default function YouTubeEarningsCalculator() {
  const [dailyViews, setDailyViews] = useState<number>(20000);
  const [rpm, setRpm] = useState<number>(3.50);

  // Calculations
  const dailyEarnings = (dailyViews * rpm) / 1000;
  const monthlyEarnings = dailyEarnings * 30.4; // Average days in month
  const yearlyEarnings = dailyEarnings * 365;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(val);
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat('en-US').format(val);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="youtube-earnings-calculator-container">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
          <Youtube className="w-5 h-5 text-red-500" />
          YouTube Channel Earnings Calculator
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Estimate your YouTube AdSense revenue using video views and customizable Revenue Per Mille (RPM) metrics based on your channel niche.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT PANEL */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-6">
            {/* Daily Views Slider / Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-rose-500" />
                  Estimated Daily Views
                </label>
                <span className="text-sm font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 px-3 py-1 rounded-full">
                  {formatNumber(dailyViews)} views
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="500000"
                step="500"
                value={dailyViews}
                onChange={(e) => setDailyViews(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>500</span>
                <span>250,000</span>
                <span>500,000+</span>
              </div>
            </div>

            {/* RPM Slider / Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  Channel RPM (Revenue Per 1,000 Views)
                </label>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 rounded-full">
                  {formatCurrency(rpm)}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                RPM is your actual net income per 1,000 views after YouTube's 45% platform split has been deducted.
              </p>
              <input
                type="range"
                min="0.10"
                max="25.00"
                step="0.10"
                value={rpm}
                onChange={(e) => setRpm(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>$0.10</span>
                <span>$12.50</span>
                <span>$25.00</span>
              </div>
            </div>

            {/* Niche Presets */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Select Niche RPM Preset (Recommended)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {RPM_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setRpm(preset.rpm)}
                    className={`text-left p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md ${preset.color} flex flex-col justify-between`}
                  >
                    <span>{preset.name}</span>
                    <span className="font-bold text-slate-900 dark:text-white mt-1">{formatCurrency(preset.rpm)} RPM</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-rose-50/20 dark:from-slate-950 dark:to-rose-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Estimated Payout Estimates</h3>

            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Estimated Daily Revenue</span>
                <span className="text-2xl font-black text-rose-500">{formatCurrency(dailyEarnings)}</span>
              </div>

              <div className="bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Estimated Monthly Revenue</span>
                <span className="text-2xl font-black text-rose-500">{formatCurrency(monthlyEarnings)}</span>
              </div>

              <div className="bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Estimated Yearly Revenue</span>
                <span className="text-2xl font-black text-rose-500">{formatCurrency(yearlyEarnings)}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/50 space-y-2">
              <div className="flex justify-between text-xs py-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Total Monthly Views
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{formatNumber(Math.round(dailyViews * 30.4))}</span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Total Yearly Views
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{formatNumber(dailyViews * 365)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[11px] text-slate-400 bg-rose-500/5 dark:bg-rose-400/5 p-3 rounded-lg border border-rose-500/10 text-center">
            Ad AdSense payouts depend on audiences' localized regions (e.g. US traffic earns 5-10x higher RPM than typical developing country traffic levels).
          </div>
        </div>
      </div>
    </div>
  );
}
