import React, { useState } from 'react';
import { Percent, Plus, Trash2, RotateCcw, Award, CheckCircle, Calculator, Sparkles, BookOpen } from 'lucide-react';

interface SubjectMark {
  id: string;
  name: string;
  obtained: number;
  total: number;
}

export default function MarksPercentageCalculator() {
  // Simple Quick Mode
  const [quickObtained, setQuickObtained] = useState<string>('82');
  const [quickTotal, setQuickTotal] = useState<string>('100');
  const [quickError, setQuickError] = useState<string>('');

  // Coursework / Subject Breakdown Mode
  const [subjects, setSubjects] = useState<SubjectMark[]>([
    { id: '1', name: 'Mathematics', obtained: 88, total: 100 },
    { id: '2', name: 'Science', obtained: 92, total: 100 },
    { id: '3', name: 'English', obtained: 78, total: 100 },
  ]);
  const [newSubName, setNewSubName] = useState('');
  const [newSubObtained, setNewSubObtained] = useState('');
  const [newSubTotal, setNewSubTotal] = useState('100');
  const [subError, setSubError] = useState('');

  // Target Goal Solver Mode
  const [currentPercentage, setCurrentPercentage] = useState<string>('72');
  const [currentWeight, setCurrentWeight] = useState<string>('40'); // e.g. 40% assignments done
  const [targetPercentage, setTargetPercentage] = useState<string>('85');
  const [goalResult, setGoalResult] = useState<{
    needed: number;
    possible: boolean;
    reason?: string;
  } | null>(null);

  // Quick Mode Results
  const obt = parseFloat(quickObtained) || 0;
  const tot = parseFloat(quickTotal) || 100;
  
  const quickPercentage = tot > 0 ? (obt / tot) * 100 : 0;
  const clampedPercentage = Math.min(100, Math.max(0, quickPercentage));

  // CBSE/Standard Grade Scale Formula
  const getGradeAndStatus = (pct: number) => {
    if (pct >= 91) return { grade: 'A1', point: 10, label: 'Outstanding 😊', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' };
    if (pct >= 81) return { grade: 'A2', point: 9, label: 'Excellent 🎉', color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/20' };
    if (pct >= 71) return { grade: 'B1', point: 8, label: 'Very Good 👍', color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/20' };
    if (pct >= 61) return { grade: 'B2', point: 7, label: 'Good 👌', color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/20' };
    if (pct >= 51) return { grade: 'C1', point: 6, label: 'Above Average 💪', color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20' };
    if (pct >= 41) return { grade: 'C2', point: 5, label: 'Average ✍️', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' };
    if (pct >= 33) return { grade: 'D', point: 4, label: 'Passed 🏁', color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/20' };
    return { grade: 'F', point: 0, label: 'Needs Improvement 📚', color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/20' };
  };

  const quickGradeInfo = getGradeAndStatus(clampedPercentage);

  // Multi-Subject Calculations
  const calculatedTotalObtained = subjects.reduce((sum, s) => sum + s.obtained, 0);
  const calculatedTotalTotal = subjects.reduce((sum, s) => sum + s.total, 0);
  const calculatedPercentage = calculatedTotalTotal > 0 ? (calculatedTotalObtained / calculatedTotalTotal) * 100 : 0;
  const overallGradeInfo = getGradeAndStatus(calculatedPercentage);

  const handleQuickCalcReset = () => {
    setQuickObtained('82');
    setQuickTotal('100');
    setQuickError('');
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    setSubError('');

    const name = newSubName.trim() || `Subject ${subjects.length + 1}`;
    const obtainedVal = parseFloat(newSubObtained);
    const totalVal = parseFloat(newSubTotal);

    if (isNaN(obtainedVal) || isNaN(totalVal)) {
      setSubError('Please enter positive numerical values for obtained and total marks.');
      return;
    }
    if (obtainedVal < 0 || totalVal <= 0) {
      setSubError('Marks cannot be negative. Max total must be greater than zero.');
      return;
    }
    if (obtainedVal > totalVal) {
      setSubError('Obtained marks cannot exceed maximum possible marks.');
      return;
    }

    const newSub: SubjectMark = {
      id: Date.now().toString(),
      name,
      obtained: obtainedVal,
      total: totalVal,
    };

    setSubjects([...subjects, newSub]);
    setNewSubName('');
    setNewSubObtained('');
    setNewSubTotal('100');
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const handleSolveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const curPct = parseFloat(currentPercentage);
    const curW = parseFloat(currentWeight);
    const tarPct = parseFloat(targetPercentage);

    if (isNaN(curPct) || isNaN(curW) || isNaN(tarPct)) {
      return;
    }

    if (curPct < 0 || curPct > 100 || curW <= 0 || curW >= 100 || tarPct < 0 || tarPct > 100) {
      setGoalResult({
        needed: 0,
        possible: false,
        reason: 'Percentage inputs must be between 0 and 100, and current weightage must be between 1% and 99%.',
      });
      return;
    }

    const remainingWeight = 100 - curW;
    const currentContribution = (curPct / 100) * curW;
    // targetContribution = targetPercentage
    // needs to satisfy: currentContribution + (needed / 100) * remainingWeight >= targetPercentage
    const neededContribution = tarPct - currentContribution;
    const neededPercentage = (neededContribution / remainingWeight) * 100;

    if (neededPercentage > 100) {
      setGoalResult({
        needed: neededPercentage,
        possible: false,
        reason: `Requires scoring ${(neededPercentage).toFixed(1)}% on remaining tasks, which is mathematically impossible.`,
      });
    } else if (neededPercentage < 0) {
      setGoalResult({
        needed: 0,
        possible: true,
        reason: 'Your current scores guarantee meeting this target! Even if you score 0% on the remaining portion, you will pass.',
      });
    } else {
      setGoalResult({
        needed: neededPercentage,
        possible: true,
      });
    }
  };

  return (
    <div className="space-y-8" id="marks-calculator-root">
      
      {/* 1. QUICK CALCULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="quick-marks-card">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-2xl">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Quick Marks converter</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Instantly convert scores into percentages, grades and cumulative points.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Marks Obtained</label>
              <input
                type="number"
                value={quickObtained}
                onChange={(e) => {
                  setQuickObtained(e.target.value);
                  setQuickError('');
                }}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-2xl text-sm focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 focus:bg-white text-slate-900 dark:text-white font-semibold transition"
                placeholder="eg. 85"
                min="0"
                step="any"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2 font-mono">Out Of (Total)</label>
              <input
                type="number"
                value={quickTotal}
                onChange={(e) => {
                  setQuickTotal(e.target.value);
                  setQuickError('');
                }}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-2xl text-sm focus:ring-4 focus:ring-emerald-500/15 focus:border-emerald-500 focus:bg-white text-slate-900 dark:text-white font-semibold transition"
                placeholder="eg. 100"
                min="1"
                step="any"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              onClick={handleQuickCalcReset}
              className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* QUICK VALUE OUTPUT */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-lg shadow-emerald-600/10 dark:shadow-none">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold bg-white/15 px-3 py-1 rounded-full uppercase tracking-wider text-emerald-100">Result Verdict</span>
              <BookOpen className="w-5 h-5 text-emerald-200" />
            </div>

            <div className="space-y-1">
              <span className="text-4xl md:text-5xl font-black">{clampedPercentage.toFixed(2)}%</span>
              <p className="text-xs text-emerald-100 font-medium">Earned {quickObtained} / {quickTotal} possible marks</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
            <div>
              <span className="block text-[10px] font-bold text-emerald-200 uppercase tracking-wider">Letter Grade</span>
              <span className="text-2xl font-extrabold flex items-center gap-1.5 mt-0.5">
                {quickGradeInfo.grade}
                <span className="text-sm font-semibold opacity-90 border border-white/20 px-2 py-0.5 rounded-lg bg-white/5">{quickGradeInfo.point} GP</span>
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-emerald-200 uppercase tracking-wider">Classification</span>
              <span className="text-sm font-bold mt-1.5 block leading-tight">{quickGradeInfo.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUBJECT-WISE BREAKDOWN SHEET */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="sub-marksheet-section">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 border-b border-rose-100/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-2xl">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Multi-Subject Marksheet Analyzer</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Add all your academic courses to calculate exact cumulative average and grading statistics.</p>
            </div>
          </div>

          {subjects.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Overall:</span>
              <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">{calculatedPercentage.toFixed(1)}%</span>
              <span className="text-xs font-black dark:bg-blue-950/40 bg-blue-50 text-blue-600 rounded-md px-2 py-0.5">{overallGradeInfo.grade} Grade</span>
            </div>
          )}
        </div>

        {subError && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold rounded-2xl mb-4">
            {subError}
          </div>
        )}

        {/* Input Add Subject Form */}
        <form onSubmit={handleAddSubject} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl mb-6">
          <div className="sm:col-span-2">
            <input
              type="text"
              value={newSubName}
              onChange={(e) => setNewSubName(e.target.value)}
              placeholder="Subject Name (e.g. History)"
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <input
              type="number"
              value={newSubObtained}
              onChange={(e) => setNewSubObtained(e.target.value)}
              placeholder="Marks Got (e.g. 78)"
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
              min="0"
              step="any"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={newSubTotal}
              onChange={(e) => setNewSubTotal(e.target.value)}
              placeholder="Total (e.g. 100)"
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
              min="1"
              step="any"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer shadow-sm group-hover:scale-105 transition"
              title="Add subject"
              aria-label="Add subject to sheet"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Active Subjects table */}
        {subjects.length === 0 ? (
          <div className="py-10 text-center text-slate-400 dark:text-slate-600 text-xs">
            No subjects registered yet. Add coursework above to compute totals.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-850 text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Subject Name</th>
                  <th className="py-3 px-4 text-right">Marks Obtained</th>
                  <th className="py-3 px-4 text-right">Max Total</th>
                  <th className="py-3 px-4 text-right">Percentage</th>
                  <th className="py-3 px-4 text-center">Grade</th>
                  <th className="py-3 px-4 text-center w-12">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {subjects.map((sub) => {
                  const subPct = sub.total > 0 ? (sub.obtained / sub.total) * 100 : 0;
                  const itemGrade = getGradeAndStatus(subPct);
                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20 text-slate-700 dark:text-slate-350">
                      <td className="py-3.5 px-4 font-bold">{sub.name}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-medium">{sub.obtained}</td>
                      <td className="py-3.5 px-4 text-right font-mono">{sub.total}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">{subPct.toFixed(1)}%</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${itemGrade.color}`}>
                          {itemGrade.grade}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleRemoveSubject(sub.id)}
                          className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-500 rounded-lg cursor-pointer transition"
                          title="Delete course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="font-extrabold border-t-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-950/10">
                  <td className="py-4 px-4 font-black">Overall Cumulative</td>
                  <td className="py-4 px-4 text-right font-mono">{calculatedTotalObtained}</td>
                  <td className="py-4 px-4 text-right font-mono">{calculatedTotalTotal}</td>
                  <td className="py-4 px-4 text-right font-mono text-emerald-555">{calculatedPercentage.toFixed(1)}%</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-black ${overallGradeInfo.color}`}>
                      {overallGradeInfo.grade} ({overallGradeInfo.point} GP)
                    </span>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* 3. REVERSE / GOAL SOLVER CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="target-marks-solver">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white font-sans">Target Score Solver</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Calculate exactly what score is needed in final exams or remaining modules to hit your desired class target goal.</p>
          </div>
        </div>

        <form onSubmit={handleSolveGoal} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Current Combined Percentage</label>
            <div className="relative">
              <input
                type="number"
                value={currentPercentage}
                onChange={(e) => setCurrentPercentage(e.target.value)}
                className="w-full pl-4 pr-8 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-2xl text-sm focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500 focus:bg-white text-slate-900 dark:text-white font-semibold transition"
                min="0"
                max="100"
                step="any"
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-slate-400 font-bold">%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2 font-mono">Weight of Current Portion (e.g. Midterms)</label>
            <div className="relative">
              <input
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                className="w-full pl-4 pr-8 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-2xl text-sm focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500 focus:bg-white text-slate-900 dark:text-white font-semibold transition"
                min="1"
                max="99"
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-slate-400 font-bold">%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Target Class Goal percentage</label>
            <div className="relative">
              <input
                type="number"
                value={targetPercentage}
                onChange={(e) => setTargetPercentage(e.target.value)}
                className="w-full pl-4 pr-8 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-2xl text-sm focus:ring-4 focus:ring-purple-500/15 focus:border-purple-500 focus:bg-white text-slate-900 dark:text-white font-semibold transition"
                min="0"
                max="100"
                step="any"
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-slate-400 font-bold">%</span>
            </div>
          </div>

          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-2xl cursor-pointer shadow-md transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" /> Calculate Needed Score
            </button>
          </div>
        </form>

        {goalResult && (
          <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-6 animate-in fade-in duration-200">
            {goalResult.possible ? (
              <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-2xl flex items-start gap-3.5">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400">Target is Mathematically Attainable!</h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-350 mt-1 leading-relaxed">
                    You need to score a minimum average of <strong className="text-sm font-extrabold text-slate-900 dark:text-white">{goalResult.needed.toFixed(1)}%</strong> on the remaining <strong className="font-bold">{100 - parseFloat(currentWeight)}%</strong> weight of coursework.
                  </p>
                  {goalResult.reason && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-mono italic">{goalResult.reason}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900 rounded-2xl flex items-start gap-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-2 shrink-0"></div>
                <div>
                  <h4 className="text-sm font-bold text-rose-800 dark:text-rose-400">Target is Unreachable</h4>
                  <p className="text-xs text-rose-700 dark:text-rose-350 mt-1 leading-relaxed">
                    {goalResult.reason || `Scores of over 100% (specifically ${goalResult.needed.toFixed(1)}%) are mathematically required on remaining portion to average ${targetPercentage}%.`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
