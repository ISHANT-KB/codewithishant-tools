import { useState } from 'react';
import { GraduationCap, Award, RefreshCw, AlertCircle, CheckCircle, Flame, Star, BookOpen } from 'lucide-react';

interface GpaScalePreset {
  name: string;
  max: number;
  step: number;
}

const SCALE_PRESETS: GpaScalePreset[] = [
  { name: '4.0 Global Scale (US, High Schools)', max: 4.0, step: 0.05 },
  { name: '10.0 University Scale (India DB, IITs)', max: 10.0, step: 0.1 },
  { name: '5.0 Scale (Singapore, etc.)', max: 5.0, step: 0.1 },
];

export default function GpaPlanner() {
  const [scale, setScale] = useState<GpaScalePreset>(SCALE_PRESETS[0]);
  const [currentGpa, setCurrentGpa] = useState<string>('3.2');
  const [currentCredits, setCurrentCredits] = useState<string>('45');
  const [targetGpa, setTargetGpa] = useState<string>('3.6');
  const [remainingCredits, setRemainingCredits] = useState<string>('45');

  // Convert inputs to numbers safely
  const curGpaVal = parseFloat(currentGpa) || 0;
  const curCredVal = parseFloat(currentCredits) || 0;
  const tarGpaVal = parseFloat(targetGpa) || 0;
  const remCredVal = parseFloat(remainingCredits) || 0;

  // Validate limits
  const isCurGpaInvalid = curGpaVal < 0 || curGpaVal > scale.max;
  const isTarGpaInvalid = tarGpaVal < 0 || tarGpaVal > scale.max;

  // Math calculation
  const totalCombinedCredits = curCredVal + remCredVal;
  const targetAggPointsNeeded = tarGpaVal * totalCombinedCredits;
  const currentEarnedPoints = curGpaVal * curCredVal;
  const remainingPointsNeeded = targetAggPointsNeeded - currentEarnedPoints;
  const requiredAverageGpa = remCredVal > 0 ? (remainingPointsNeeded / remCredVal) : 0;

  // Planning breakdown analysis status
  let statusColor = 'text-emerald-500 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900';
  let statusHeader = 'Fully Achievable (Smooth Sails)';
  let statusText = 'Excellent! Your remaining credits are plenty, requiring a reasonable score well below perfect range.';
  let iconComponent = <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />;

  if (isCurGpaInvalid || isTarGpaInvalid) {
    statusColor = 'text-rose-500 bg-rose-50 border-rose-100 dark:bg-rose-950/25';
    statusHeader = 'Limits Exceeded';
    statusText = `Current or Target GPA exceeds the max configured scale of ${scale.max}.`;
    iconComponent = <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
  } else if (requiredAverageGpa > scale.max) {
    statusColor = 'text-rose-500 bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900';
    statusHeader = 'Mathematically Unobtainable 🚫';
    statusText = `Score needed is ${(requiredAverageGpa).toFixed(2)}, which exceeds the maximum scale limit of ${scale.max}. Consider adjusting your overall target or adding more elective credits to buffer.`;
    iconComponent = <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
  } else if (requiredAverageGpa <= curGpaVal) {
    statusColor = 'text-teal-500 bg-teal-50 border-teal-100 dark:bg-teal-950/20 dark:border-teal-900';
    statusHeader = 'Guaranteed Match! 🎉';
    statusText = `Your target is comfortably lower than your current standing. Even if you maintain an average of ${requiredAverageGpa.toFixed(2)} in remaining sections, you will hit your goal easily.`;
    iconComponent = <Star className="w-5 h-5 text-teal-400 shrink-0" />;
  } else if (requiredAverageGpa > scale.max - 0.4) {
    statusColor = 'text-orange-500 bg-orange-50 border-orange-100 dark:bg-orange-950/20 dark:border-orange-900';
    statusHeader = 'Requires Near-Perfect Effort 🔥';
    statusText = `Crucial study hours ahead! You need to maintain a high level avg of ${requiredAverageGpa.toFixed(2)} GPA to touch your goal. No slacking is allowed.`;
    iconComponent = <Flame className="w-5 h-5 text-orange-500 shrink-0" />;
  }

  const handleReset = () => {
    setCurrentGpa('3.2');
    setCurrentCredits('45');
    setTargetGpa('3.6');
    setRemainingCredits('45');
  };

  return (
    <div className="space-y-8" id="gpa-planner-root">
      
      {/* SCALE SELECTED CONTROLS */}
      <div className="bg-slate-50 dark:bg-slate-950/30 p-4 border border-slate-150 dark:border-slate-850 rounded-2xl flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Choose Active GPA Grading System:</span>
        </div>
        <div className="flex gap-2">
          {SCALE_PRESETS.map((sc) => (
            <button
              key={sc.name}
              onClick={() => {
                setScale(sc);
                // Adjust initial placeholders to scale standard
                if (sc.max === 10.0 && currentGpa === '3.2') {
                  setCurrentGpa('8.0');
                  setTargetGpa('9.0');
                } else if (sc.max === 4.0 && currentGpa === '8.0') {
                  setCurrentGpa('3.2');
                  setTargetGpa('3.6');
                }
              }}
              className={`py-1.5 px-3 rounded-xl border text-[11px] font-bold cursor-pointer transition ${
                scale.max === sc.max
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              Scale {sc.max.toFixed(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUTS PANEL */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-2xl">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Past & Future Credits Sorter</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Match historical scores alongside upcoming parameters to solve requirements.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <h4 className="text-xs font-black uppercase text-indigo-500 tracking-wider mb-3">Academic Backlog (To Date)</h4>
              <div className="space-y-4 bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
                <div>
                  <label className="block text-[11px] font-bold text-slate-505 mb-1 text-slate-500">Current Cumulative GPA</label>
                  <input
                    type="number"
                    value={currentGpa}
                    onChange={(e) => setCurrentGpa(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                    max={scale.max}
                    min="0"
                    step={scale.step}
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Scale {scale.max} limit</span>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-505 mb-1 text-slate-500">Credits Completed So Far</label>
                  <input
                    type="number"
                    value={currentCredits}
                    onChange={(e) => setCurrentCredits(Math.max(0, parseFloat(e.target.value) || 0).toString())}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                    placeholder="e.g. 45 credits"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase text-indigo-500 tracking-wider mb-3">Target Graduation Plans</h4>
              <div className="space-y-4 bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
                <div>
                  <label className="block text-[11px] font-bold text-slate-505 mb-1 text-slate-500">Desired Graduation GPA</label>
                  <input
                    type="number"
                    value={targetGpa}
                    onChange={(e) => setTargetGpa(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                    max={scale.max}
                    min="0"
                    step={scale.step}
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Goal grade points</span>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-505 mb-1 text-slate-500">Credits Remaining to Complete</label>
                  <input
                    type="number"
                    value={remainingCredits}
                    onChange={(e) => setRemainingCredits(Math.max(1, parseFloat(e.target.value) || 1).toString())}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                    placeholder="e.g. 45 credits"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-805 rounded-xl cursor-pointer transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reload Default
            </button>
          </div>
        </div>

        {/* RESULTS SUMMARY BOARD */}
        <div className="lg:col-span-5 bg-gradient-to-tr from-indigo-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-lg shadow-indigo-500/10 dark:shadow-none border border-indigo-800/20">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider text-indigo-200">Required Standing</span>
              <Award className="w-5 h-5 text-indigo-300" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest block">Required Average SGPA</span>
              <span className={`text-4xl md:text-5xl font-black block tracking-tight ${requiredAverageGpa > scale.max ? 'text-rose-400' : 'text-indigo-300'}`}>
                {requiredAverageGpa > scale.max ? 'Impossible' : requiredAverageGpa <= 0 ? '0.00' : requiredAverageGpa.toFixed(2)}
              </span>
              <span className="text-xs font-medium text-slate-300 block">
                Needed across remaining <strong className="text-white">{remainingCredits} credits</strong> (total credits: {totalCombinedCredits})
              </span>
            </div>

            {/* Feasibility Alert Status Block */}
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${statusColor} text-slate-850 dark:text-slate-200`}>
              <div className="font-extrabold mb-1 flex items-center gap-1.5 text-slate-900 dark:text-white">
                {iconComponent}
                {statusHeader}
              </div>
              <p className="opacity-90">{statusText}</p>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-indigo-800/40 space-y-3 font-semibold text-xs text-indigo-200">
            <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-xl">
              <span>Past Grade Points Earned</span>
              <span className="text-white font-mono">{currentEarnedPoints.toFixed(1)} GP</span>
            </div>
            <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-xl">
              <span>Goal Grade Points Needed</span>
              <span className="text-white font-mono">{Math.max(0, remainingPointsNeeded).toFixed(1)} GP</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
