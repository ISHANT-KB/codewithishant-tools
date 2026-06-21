import { useState } from 'react';
import { BookOpen, CheckCircle, AlertTriangle, PlayCircle, HelpCircle, Flame, Gauge } from 'lucide-react';

export default function AttendanceCalculator() {
  const [totalClasses, setTotalClasses] = useState<number>(50);
  const [attendedClasses, setAttendedClasses] = useState<number>(38);
  const [targetPercentage, setTargetPercentage] = useState<number>(75);

  const held = Math.max(1, totalClasses);
  const attended = Math.max(0, Math.min(held, attendedClasses));

  const currentPercentage = held > 0 ? (attended / held) * 100 : 0;
  const isHealthy = currentPercentage >= targetPercentage;

  let classesNeeded = 0; // if isHealthy is false, consecutive classes needed
  let classesCanBunk = 0; // if isHealthy is true, consecutive classes can bunk

  if (!isHealthy) {
    // Math: (attended + x) / (held + x) >= target/100
    // attended + x >= (target/100) * held + (target/100) * x
    // x * (1 - target/100) >= (target/100)*held - attended
    // x >= [target*held - 100*attended] / [100 - target]
    const numerator = (targetPercentage * held) - (100 * attended);
    const denominator = 100 - targetPercentage;
    if (denominator > 0) {
      classesNeeded = Math.ceil(numerator / denominator);
    }
  } else {
    // Math: attended / (held + y) >= target/100
    // attended * 100 >= target * held + target * y
    // y <= [attended * 100 - target * held] / target
    const numerator = (attended * 100) - (targetPercentage * held);
    if (targetPercentage > 0) {
      classesCanBunk = Math.floor(numerator / targetPercentage);
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="attendance-calculator-container">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-emerald-500" />
          College Attendance & Goal Calculator
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter your total classes and active attendance to see if you can skip upcoming sessions, bunk sustainably, or how many continuous attendances are mandatory to restore your target limits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT LAYOUT */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-4">
            {/* Total Classes Held */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5Spec flex justify-between items-center">
                <span>Total Classes Held So Far</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{held} classes</span>
              </label>
              <input
                type="range"
                min="5"
                max="250"
                step="1"
                value={totalClasses}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTotalClasses(val);
                  if (attendedClasses > val) {
                    setAttendedClasses(val);
                  }
                }}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>5</span>
                <span>125</span>
                <span>250</span>
              </div>
            </div>

            {/* Classes Attended */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 dynamic flex justify-between items-center">
                <span>Classes Attended</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{attended} classes</span>
              </label>
              <input
                type="range"
                min="0"
                max={held}
                step="1"
                value={attendedClasses}
                onChange={(e) => setAttendedClasses(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0</span>
                <span>{Math.round(held / 2)}</span>
                <span>{held} (Full Attendance)</span>
              </div>
            </div>

            {/* Target Attendance */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex justify-between items-center">
                <span>Target Attendance Requirement</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{targetPercentage}%</span>
              </label>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={targetPercentage}
                onChange={(e) => setTargetPercentage(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>50%</span>
                <span>75% (Standard)</span>
                <span>95% (Strict)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS CARD */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-150 dark:border-slate-850/60 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Speedometer Gauge representation */}
            <div className="relative flex items-center justify-center mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-slate-200 dark:border-slate-850 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-800 dark:text-white">{currentPercentage.toFixed(1)}%</span>
                <span className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wider">Attendance</span>
              </div>
            </div>

            {isHealthy ? (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 py-1 px-3 bg-emerald-500/10 text-emerald-500 text-xs font-semibold rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> High Attendance Healthy Zone
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your attendance is current above the <strong className="text-slate-700 dark:text-slate-200">{targetPercentage}%</strong> rule limit.
                  </p>
                  {classesCanBunk > 0 ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/10 p-4 rounded-xl mt-4">
                      <span className="text-[10px] uppercase font-mono text-emerald-600 dark:text-emerald-450 block mb-0.5">Permission To Bunk</span>
                      <strong className="text-2xl font-black text-emerald-600 dark:text-emerald-400">You can bunk up to {classesCanBunk} class{classesCanBunk > 1 ? 'es' : ''}</strong>
                      <p className="text-[10.5px] text-slate-400 mt-1">consecutively without dropping below your target percentage limit!</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 mt-2">But be careful! You are right on the edge of the threshold. Bunking even 1 class will drop you below your goal.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 py-1 px-3 bg-red-500/10 text-red-500 text-xs font-semibold rounded-full">
                  <AlertTriangle className="w-3.5 h-3.5" /> Shortage Danger Warning
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your current percentage is below your required target threshold.
                  </p>
                  <div className="bg-red-500/[0.04] border border-red-500/15 p-4 rounded-xl mt-4">
                    <span className="text-[10px] uppercase font-mono text-red-500 block mb-0.5">Consecutive classes required</span>
                    <strong className="text-2xl font-black text-red-500">Attend next {classesNeeded} class{classesNeeded > 1 ? 'es' : ''}</strong>
                    <p className="text-[10.5px] text-slate-400 mt-1">continuously continuously to restore your cumulative target back to {targetPercentage}%!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
