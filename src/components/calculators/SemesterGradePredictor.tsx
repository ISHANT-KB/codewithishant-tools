import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, Sliders, RefreshCw, AlertCircle, Percent, Disc } from 'lucide-react';

interface GradeSegment {
  id: string;
  name: string;
  weight: number; // e.g. 20 for 20%
  score: number;  // e.g. 85 for 85% score
  completed: boolean;
}

export default function SemesterGradePredictor() {
  const [segments, setSegments] = useState<GradeSegment[]>([
    { id: '1', name: 'Homework Assignments', weight: 25, score: 92, completed: true },
    { id: '2', name: 'Midterm Exam 1', weight: 20, score: 78, completed: true },
    { id: '3', name: 'Practical Labs', weight: 15, score: 85, completed: true },
    { id: '4', name: 'Final Exam', weight: 40, score: 80, completed: false }, // Remaining unseen final
  ]);

  // Assessment adder controls
  const [newSegName, setNewSegName] = useState('');
  const [newSegWeight, setNewSegWeight] = useState('');
  const [newSegScore, setNewSegScore] = useState('');
  const [newSegCompleted, setNewSegCompleted] = useState(true);
  const [segmentError, setSegmentError] = useState('');

  // What-If Final simulation score state
  const [whatIfScore, setWhatIfScore] = useState<number>(85);

  const handleAddSegment = (e: React.FormEvent) => {
    e.preventDefault();
    setSegmentError('');

    const name = newSegName.trim() || `Assessment ${segments.length + 1}`;
    const weight = parseFloat(newSegWeight);
    const score = parseFloat(newSegScore) || 0;

    if (isNaN(weight) || weight <= 0) {
      setSegmentError('Please enter a weight percentage greater than 0%');
      return;
    }

    const currentTotalWeight = segments.reduce((sum, s) => sum + s.weight, 0);
    if (currentTotalWeight + weight > 100) {
      setSegmentError(`Cannot exceed 100% total course weightage. Available buffer: ${(100 - currentTotalWeight).toFixed(1)}%`);
      return;
    }

    if (score < 0 || score > 100) {
      setSegmentError('Assessment score must be between 0% and 100%');
      return;
    }

    const newSeg: GradeSegment = {
      id: Date.now().toString(),
      name,
      weight,
      score,
      completed: newSegCompleted,
    };

    setSegments([...segments, newSeg]);
    setNewSegName('');
    setNewSegWeight('');
    setNewSegScore('');
  };

  const handleRemoveSegment = (id: string) => {
    setSegments(segments.filter((s) => s.id !== id));
  };

  const handleToggleCompleted = (id: string) => {
    setSegments(
      segments.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  // 1. Calculate Aggregate statistics
  const completedSegments = segments.filter((s) => s.completed);
  const uncompletedSegments = segments.filter((s) => !s.completed);

  const totalCourseWeight = segments.reduce((sum, s) => sum + s.weight, 0);
  const totalCompletedWeight = completedSegments.reduce((sum, s) => sum + s.weight, 0);
  const totalUncompletedWeight = uncompletedSegments.reduce((sum, s) => sum + s.weight, 0);

  // Current Running Average (Percentage obtained from task completed ONLY)
  // e.g. if scored 90% on assignments (25% weight) and 80% on midterm (25% weight), running total score is 0.9*25 + 0.8*25 = 42.5 out of 50. Running average is (42.5 / 50) * 100 = 85%
  const runningWeightedPoints = completedSegments.reduce((sum, s) => sum + (s.score / 100) * s.weight, 0);
  const runningAveragePercentage = totalCompletedWeight > 0 ? (runningWeightedPoints / totalCompletedWeight) * 100 : 0;

  // Best Possible Score (Scoring 100% on everything remaining)
  const maxPossibleCourseGrade = runningWeightedPoints * 100 + totalUncompletedWeight;

  // What-If Simulator final grade calculation
  // Computes overall grade assuming the remaining uncompleted blocks achieve the custom simulated slider percentage
  const simulatedUncompletedWeightedPoints = uncompletedSegments.reduce((sum, s) => sum + (whatIfScore / 100) * s.weight, 0);
  const finalSimulatedPercentage = (runningWeightedPoints + simulatedUncompletedWeightedPoints) * (100 / Math.max(1, totalCourseWeight));

  const getLetterGrade = (pct: number) => {
    if (pct >= 90) return { grade: 'A', desc: 'First Class Exemplary (Excellent)', color: 'text-emerald-500' };
    if (pct >= 80) return { grade: 'B', desc: 'Above average Class (Very Good)', color: 'text-cyan-500' };
    if (pct >= 70) return { grade: 'C', desc: 'Standard average Class (Good)', color: 'text-yellow-500' };
    if (pct >= 60) return { grade: 'D', desc: 'Marginal Pass Option', color: 'text-amber-500' };
    return { grade: 'F', desc: 'Needs Improvement / Academic Review', color: 'text-rose-500' };
  };

  const finalGradeInfo = getLetterGrade(finalSimulatedPercentage);

  const handleResetCourse = () => {
    setSegments([
      { id: '1', name: 'Homework Assignments', weight: 25, score: 92, completed: true },
      { id: '2', name: 'Midterm Exam 1', weight: 20, score: 78, completed: true },
      { id: '3', name: 'Practical Labs', weight: 15, score: 85, completed: true },
      { id: '4', name: 'Final Exam', weight: 40, score: 80, completed: false },
    ]);
    setWhatIfScore(85);
  };

  return (
    <div className="space-y-8" id="grade-predictor-root">
      
      {/* 1. COMPILATION DASHBOARD HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RUNNING STATS COLUMN */}
        <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-6 border border-slate-800 flex flex-col justify-between shadow-lg">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-lg border border-white/5 inline-block text-slate-300">
              Running Standing
            </span>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Completed Average</span>
              <span className="text-4xl font-black text-emerald-400">{runningAveragePercentage.toFixed(1)}%</span>
              <span className="text-[10px] text-slate-400 block font-medium">Weighted over {totalCompletedWeight}% combined completed coursework</span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-bold">Best Possible Grade</span>
              <span className="text-xl font-bold mt-1 block tracking-tight text-white">{maxPossibleCourseGrade.toFixed(1)}% max possible</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-bold">Total Configured Weight</span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className={`text-xs font-black ${totalCourseWeight === 100 ? 'text-emerald-500' : 'text-amber-500'}`}>{totalCourseWeight}% / 100%</span>
                {totalCourseWeight < 100 && <span className="text-[10px] text-amber-500 font-bold">(needs {100 - totalCourseWeight}% more additions)</span>}
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE SLOPE WHAT-IF SIMULATOR */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-555/5 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <Sliders className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-tight">Active What-If Grade Simulator</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Drag the slider to test different possible marks on remaining assessments ({totalUncompletedWeight}% weight).</p>
            </div>
          </div>

          {uncompletedSegments.length === 0 ? (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-2xl">
              All assessments in list are marked completed. Add or mark an assessment as uncompleted to unlock simulator sliders!
            </div>
          ) : (
            <div className="space-y-6 bg-slate-50 dark:bg-slate-950/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-850">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-350">
                  <span>Assumed Score on Remaining Exams:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-black underline">{whatIfScore}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={whatIfScore}
                  onChange={(e) => setWhatIfScore(parseInt(e.target.value))}
                  className="w-full accent-emerald-555 cursor-pointer"
                />
              </div>

              {/* simulated results banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-xl relative overflow-hidden">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Projected Course Mark</span>
                  <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                    {finalSimulatedPercentage.toFixed(1)}%
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Letter Predictor</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-3xl font-black ${finalGradeInfo.color}`}>{finalGradeInfo.grade}</span>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 capitalize">{finalGradeInfo.desc}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. GRADE SEGMENTS CONFIGURATION LIST */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-2xl">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Active Course weight breakdowns</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Check or uncheck segments to move them between completed tasks and simulator weights.</p>
            </div>
          </div>

          <button
            onClick={handleResetCourse}
            className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 rounded-xl transition cursor-pointer"
          >
            Reset Course
          </button>
        </div>

        {segmentError && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold rounded-2xl mb-4">
            {segmentError}
          </div>
        )}

        {/* SEGMENT ADDER FORM */}
        <form onSubmit={handleAddSegment} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl mb-6">
          <div className="sm:col-span-2">
            <input
              type="text"
              value={newSegName}
              onChange={(e) => setNewSegName(e.target.value)}
              placeholder="e.g. Quizzes group"
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <input
              type="number"
              value={newSegWeight}
              onChange={(e) => setNewSegWeight(e.target.value)}
              placeholder="Weight percentage (e.g. 15%)"
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              min="1"
              max="100"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={newSegScore}
              onChange={(e) => setNewSegScore(e.target.value)}
              placeholder="Your Score % (e.g. 88)"
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              min="0"
              max="100"
            />
            <button
              type="submit"
              className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer shadow-sm"
              title="Add segment"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="sm:col-span-4 flex items-center gap-2 px-1 pt-1 select-none">
            <input
              type="checkbox"
              id="newSegCompleted"
              checked={newSegCompleted}
              onChange={(e) => setNewSegCompleted(e.target.checked)}
              className="rounded text-indigo-600 accent-indigo-600"
            />
            <label htmlFor="newSegCompleted" className="text-[10px] font-bold uppercase text-slate-500 cursor-pointer">
              Mark this portion as already Completed / Graded
            </label>
          </div>
        </form>

        {/* TABLE OF SEGMENTS */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-850 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Syllabus Segment / Exam Item</th>
                <th className="py-3 px-4 text-center">Weight percentage</th>
                <th className="py-3 px-4 text-center">Score obtained</th>
                <th className="py-3 px-4 text-center">Interactive Toggle</th>
                <th className="py-3 px-4 text-center w-12">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-350">
              {segments.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20">
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase ${
                      s.completed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {s.completed ? 'Graded' : 'Simulated'}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold">{s.name}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-900 dark:text-white">{s.weight}%</td>
                  <td className="py-3 px-4 text-center font-mono">
                    {s.completed ? (
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{s.score}%</span>
                    ) : (
                      <span className="text-slate-400 font-medium italic">Simulating ({whatIfScore}%)</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleCompleted(s.id)}
                      className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer"
                    >
                      {s.completed ? 'Change to Uncompleted' : 'Mark as Graded'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleRemoveSegment(s.id)}
                      className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-500 rounded-lg cursor-pointer cursor-pointers duration-100 transition"
                      title="Clear item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
