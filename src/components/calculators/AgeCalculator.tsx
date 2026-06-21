import { useState, useEffect } from 'react';
import { Calendar, RefreshCw, Clock, Watch, CalendarDays } from 'lucide-react';
import ShareResults from '../ShareResults';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('1995-06-15');
  const [birthTime, setBirthTime] = useState('12:00');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<any | null>(null);

  const runAgeCalculation = (bDate: string, bTime: string, tDate: string) => {
    if (!bDate) return null;

    const dob = new Date(`${bDate}T${bTime || '00:00'}`);
    const now = new Date(`${tDate}T23:59:59`);

    if (dob > now) {
      return null;
    }

    const diffMs = now.getTime() - dob.getTime();

    // Comprehensive Calculations
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);

    // Exact Years, Months, Days calculation
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
      months -= 1;
      // Get days in previous month
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Days until next birthday
    const nextBdayYear = now.getMonth() < dob.getMonth() || (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())
      ? now.getFullYear()
      : now.getFullYear() + 1;
    
    const nextBday = new Date(nextBdayYear, dob.getMonth(), dob.getDate());
    const msUntilBday = nextBday.getTime() - now.getTime();
    const daysUntilBday = Math.ceil(msUntilBday / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalMonths: years * 12 + months,
      totalWeeks: diffWeeks,
      totalDays: diffDays,
      totalHours: diffHours,
      totalMinutes: diffMins,
      totalSeconds: diffSecs,
      daysUntilBday,
    };
  };

  const calculateAge = () => {
    if (!birthDate) return;

    const dob = new Date(`${birthDate}T${birthTime || '00:00'}`);
    const now = new Date(`${targetDate}T23:59:59`);

    if (dob > now) {
      alert("Date of Birth cannot be in the future relative to target date!");
      return;
    }

    const res = runAgeCalculation(birthDate, birthTime, targetDate);
    setResult(res);
  };

  // Read params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qDob = params.get('age_dob');
    const qTob = params.get('age_tob');
    const qTarget = params.get('age_target');

    let loaded = false;
    if (qDob) { setBirthDate(qDob); loaded = true; }
    if (qTob) { setBirthTime(qTob); loaded = true; }
    if (qTarget) { setTargetDate(qTarget); loaded = true; }

    if (loaded) {
      const activeDob = qDob || birthDate;
      const activeTob = qTob || birthTime;
      const activeTarget = qTarget || targetDate;
      const res = runAgeCalculation(activeDob, activeTob, activeTarget);
      if (res) {
        setResult(res);
      }
    }
  }, []);

  const handleReset = () => {
    setBirthDate('1995-06-15');
    setBirthTime('12:00');
    setTargetDate(new Date().toISOString().split('T')[0]);
    setResult(null);
  };

  return (
    <div className="space-y-6" id="age-calc-inner">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-sm font-medium focus:outline-emerald-500 text-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Time of Birth (Optional)
          </label>
          <input
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-sm font-medium focus:outline-emerald-500 text-slate-800 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Calculate Age At Date
        </label>
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-sm font-medium focus:outline-emerald-500 text-slate-800 dark:text-white"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={calculateAge}
          className="flex-1 py-3 px-6 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          id="btn-age-calc"
        >
          <Calendar className="w-4 h-4" />
          <span>Calculate Exact Age</span>
        </button>
        <button
          onClick={handleReset}
          className="p-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
          title="Reset values"
          id="btn-age-reset"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {result && (
        <div className="mt-8 border-t border-slate-100 dark:border-slate-800/80 pt-6 space-y-6" id="age-calc-results">
          {/* Primary High Impact Dashboard Box */}
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/70 rounded-2xl p-6 text-center">
            <span className="text-xs font-bold text-slate-455 uppercase tracking-wider block mb-1">Your Exact Age is</span>
            <div className="text-4xl font-extrabold text-slate-900 dark:text-white flex justify-center items-baseline gap-1.5 flex-wrap">
              <span className="text-emerald-500">{result.years}</span> <span className="text-xl font-medium text-slate-500 dark:text-slate-400 mr-2">years</span>
              <span className="text-emerald-500">{result.months}</span> <span className="text-xl font-medium text-slate-500 dark:text-slate-400 mr-2">months</span>
              <span className="text-emerald-500">{result.days}</span> <span className="text-xl font-medium text-slate-500 dark:text-slate-400">days</span>
            </div>
            
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/15 text-blue-600 dark:text-blue-400 text-xs font-medium">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>{result.daysUntilBday} days remaining until your next birthday!</span>
            </div>
          </div>

          {/* Breakdown Statistics grid */}
          <div>
            <span className="text-xs font-bold text-slate-455 uppercase tracking-wider block mb-3">Equivalent Alternative Formats</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-4 rounded-xl text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">In Months</span>
                <span className="text-lg font-bold text-slate-850 dark:text-slate-200">{result.totalMonths.toLocaleString()}</span>
              </div>
              <div className="bg-white dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-4 rounded-xl text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">In Weeks</span>
                <span className="text-lg font-bold text-slate-850 dark:text-slate-200">{result.totalWeeks.toLocaleString()}</span>
              </div>
              <div className="bg-white dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-4 rounded-xl text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">In Days</span>
                <span className="text-lg font-bold text-slate-850 dark:text-slate-200">{result.totalDays.toLocaleString()}</span>
              </div>
              <div className="bg-white dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-4 rounded-xl text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">In Hours</span>
                <span className="text-lg font-bold text-slate-850 dark:text-slate-200">{result.totalHours.toLocaleString()}</span>
              </div>
              <div className="bg-white dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-4 rounded-xl text-center col-span-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">In Minutes</span>
                <span className="text-lg font-semibold text-slate-850 dark:text-slate-200 text-ellipsis overflow-hidden block">{result.totalMinutes.toLocaleString()}</span>
              </div>
              <div className="bg-white dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-4 rounded-xl text-center col-span-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">In Seconds</span>
                <span className="text-lg font-semibold text-slate-850 dark:text-slate-200 text-ellipsis overflow-hidden block">{result.totalSeconds.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <ShareResults
            toolId="age-calculator"
            toolName="Exact Age Analysis"
            textToCopy={`Age: ${result.years} years, ${result.months} months, ${result.days} days. Total days: ${result.totalDays.toLocaleString()}. Days until next birthday: ${result.daysUntilBday}!`}
            shareUrlParams={{
              age_dob: birthDate,
              age_tob: birthTime,
              age_target: targetDate
            }}
            mainMetric={{
              label: 'Exact Age',
              value: `${result.years} Yrs`,
              subLabel: `${result.months} mo, ${result.days} days`,
              color: 'blue'
            }}
            additionalMetrics={[
              { label: 'Total Months Lived', value: `${result.totalMonths.toLocaleString()} months` },
              { label: 'Total Weeks Lived', value: `${result.totalWeeks.toLocaleString()} weeks` },
              { label: 'Total Days Lived', value: `${result.totalDays.toLocaleString()} days` },
              { label: 'Days Until Birthday', value: `${result.daysUntilBday} days` }
            ]}
          />
        </div>
      )}
    </div>
  );
}
