import { useState } from 'react';
import { Clock, Calendar, BookOpen, Smile, AlertTriangle, Play, HelpCircle, Dumbbell, Timer } from 'lucide-react';

interface DifficultyPreset {
  name: string;
  multiplier: number;
  label: string;
}

const PRESETS: DifficultyPreset[] = [
  { name: 'Familiar Subject (Quick review)', multiplier: 0.8, label: 'Fast track with confidence [-20% time]' },
  { name: 'Standard Syllabus (Standard)', multiplier: 1.0, label: 'Standard comprehension pace [Normal]' },
  { name: 'Hard / Complex (Analytical deep-dives)', multiplier: 1.3, label: 'Requires extra review buffers [+30% time]' },
  { name: 'Absolute Beginner (Self-teaching)', multiplier: 1.6, label: 'Full learning with detailed notes [+60% time]' },
];

export default function StudyTimeCalculator() {
  const [topicsCount, setTopicsCount] = useState<string>('12');
  const [hoursPerTopic, setHoursPerTopic] = useState<string>('3');
  const [daysAvailable, setDaysAvailable] = useState<string>('10');
  const [selectedPreset, setSelectedPreset] = useState<DifficultyPreset>(PRESETS[1]);
  const [studyOption, setStudyOption] = useState<'ratio-50-10' | 'ratio-25-5' | 'deep-focus'>('ratio-50-10');

  // Parse inputs
  const topics = parseInt(topicsCount) || 0;
  const timeTopic = parseFloat(hoursPerTopic) || 0;
  const days = parseInt(daysAvailable) || 1;

  // Calculations
  const baseTotalHours = topics * timeTopic;
  const weightedTotalHours = baseTotalHours * selectedPreset.multiplier;
  
  // Daily commitment
  const dailyHoursNeeded = days > 0 ? (weightedTotalHours / days) : weightedTotalHours;

  // Breaks configuration based on option selection
  let focusInterval = 50;
  let breakInterval = 10;
  let studyCycleLabel = '50 mins study + 10 mins break';

  if (studyOption === 'ratio-25-5') {
    focusInterval = 25;
    breakInterval = 5;
    studyCycleLabel = '25 mins Pomodoro focus + 5 mins break';
  } else if (studyOption === 'deep-focus') {
    focusInterval = 90;
    breakInterval = 15;
    studyCycleLabel = '90 mins intense focus + 15 mins brain rest';
  }

  // Calculate total sessions and cycle break configurations
  const cyclesPerHour = 60 / (focusInterval + breakInterval);
  const totalFocusSessions = Math.ceil(weightedTotalHours * (60 / focusInterval));
  const totalBreakHoursCombined = (totalFocusSessions * breakInterval) / 60;

  // Let's decide current workload warning labels
  let stressLevel = {
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900',
    label: 'Low Stress (Very Manageable) 🌱',
    description: 'You have comfortable buffer room. Perfect for steady retention and deep learning without burnouts.',
  };

  if (dailyHoursNeeded > 8) {
    stressLevel = {
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900',
      label: 'Cramming Overload Danger Spot! 🔥',
      description: 'You need over 8 hours of learning daily. Highly recommend scaling back, skipping less-critical chapters, or seeking a timeline extension.',
    };
  } else if (dailyHoursNeeded > 4) {
    stressLevel = {
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900',
      label: 'Intense Target Workload (Active Prep) ⚡',
      description: 'Require focused self-discipline. Implement rigid Pomodoro rules to stay hydrated and prevent fatigue chunks.',
    };
  } else if (dailyHoursNeeded > 2) {
    stressLevel = {
      color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/20 border-cyan-100 dark:border-cyan-900',
      label: 'Moderate Study (Balanced Commitment) 🎯',
      description: 'A completely achievable learning cadence. Regular active recall quizzes will easily nail the topics.',
    };
  }

  // Simple timeline milestone constructor
  const milestoneDaysSpacing = Math.max(1, Math.round(days / Math.min(3, topics)));
  
  return (
    <div className="space-y-8" id="study-time-root">
      
      {/* INPUT SETTINGS & RESULTS MAIN SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUT PANEL */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-2xl">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Plan Homework & Exam Timelines</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Estimate how much study hour commitments are required before testing dates.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="syllabus-params-box">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Syllabus Topics</label>
                <input
                  type="number"
                  value={topicsCount}
                  onChange={(e) => setTopicsCount(Math.max(0, parseInt(e.target.value) || 0).toString())}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:bg-white text-slate-900 dark:text-white font-semibold transition"
                  placeholder="e.g. 10 chapters"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2 font-mono">Hours per Topic</label>
                <input
                  type="number"
                  value={hoursPerTopic}
                  onChange={(e) => setHoursPerTopic(Math.max(0, parseFloat(e.target.value) || 0).toString())}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:bg-white text-slate-900 dark:text-white font-semibold transition"
                  placeholder="e.g. 3 hours"
                  step="0.5"
                />
              </div>

              <div id="study-countdown-box">
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Days Remaining</label>
                <input
                  type="number"
                  value={daysAvailable}
                  onChange={(e) => setDaysAvailable(Math.max(1, parseInt(e.target.value) || 1).toString())}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 focus:bg-white text-slate-900 dark:text-white font-semibold transition"
                  placeholder="e.g. 15 days"
                />
              </div>
            </div>

            {/* PREPARATION STYLE */}
            <div id="prep-depth-box">
              <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2.5">Preparation Confidence & Subject Depth</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setSelectedPreset(p)}
                    className={`p-3.5 text-left rounded-2xl border text-xs font-semibold cursor-pointer transition ${
                      selectedPreset.name === p.name
                        ? 'border-indigo-500 bg-indigo-50/10 text-indigo-500'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 text-slate-600 dark:text-slate-350 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold">{p.name}</div>
                    <div className="text-[10px] opacity-75 mt-1">{p.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* INTEGRATED STUDY BRAKEDOWN CYCLE */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2.5">Choose Focus Brake Ratio</label>
              <div className="grid grid-cols-3 gap-2">
                {(['ratio-25-5', 'ratio-50-10', 'deep-focus'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setStudyOption(opt)}
                    className={`py-2 px-3 text-center rounded-xl border text-[11px] font-bold cursor-pointer transition ${
                      studyOption === opt
                        ? 'border-indigo-500 bg-indigo-50/20 text-indigo-500'
                        : 'border-slate-150 dark:border-slate-850 bg-white dark:bg-slate-900/40 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {opt === 'ratio-25-5' && 'Pomodoro (25/5)'}
                    {opt === 'ratio-50-10' && 'Standard (50/10)'}
                    {opt === 'deep-focus' && 'Deep (90/15)'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS SUMMARY BOARD */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-lg" id="study-output-board">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider text-slate-300">Workload Summary</span>
              <Smile className="w-5 h-5 text-indigo-400" />
            </div>

            {/* Main daily hour indicator */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Target Daily Commitment</span>
              <span className="text-4xl md:text-5xl font-black block text-indigo-400">
                {dailyHoursNeeded.toFixed(1)} <span className="text-lg font-bold text-white">Hrs / Day</span>
              </span>
            </div>

            {/* Stress risk strip */}
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${stressLevel.color}`}>
              <div className="font-bold mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                {stressLevel.label}
              </div>
              <p className="opacity-90">{stressLevel.description}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Net focus hours</span>
                <span className="text-xl font-black mt-0.5 block">{weightedTotalHours.toFixed(1)} Hrs</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Break buffers</span>
                <span className="text-base font-bold mt-1 block text-slate-300">+{totalBreakHoursCombined.toFixed(1)} Hrs</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl flex items-center gap-3 border border-slate-850">
              <Timer className="w-5 h-5 text-indigo-400 shrink-0" />
              <div className="text-[11px] text-slate-300 leading-tight">
                Plan features <strong className="text-indigo-300 font-bold">{totalFocusSessions} Sessions</strong> of <span className="underline">{studyCycleLabel}</span> to complete syllabus safely.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED OUTLINE MILESTONES */}
      {topics > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">Suggested Syllabus Milestone Milestones</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Spread topic blocks across available calendar dates to avoid procrastinating blockages.</p>
            </div>
          </div>

          <div className="relative border-l-2 border-indigo-100 dark:border-indigo-950 pl-6 ml-4 space-y-6">
            {[...Array(Math.min(5, topics))].map((_, index) => {
              const currentTopicNum = Math.floor((topics / Math.min(5, topics)) * index) + 1;
              const nextTopicNum = Math.min(topics, Math.floor((topics / Math.min(5, topics)) * (index + 1)));
              const targetDayCheckpoint = Math.min(days, Math.round((days / Math.min(5, topics)) * index) + 1);

              return (
                <div key={index} className="relative">
                  {/* timeline dot indicator */}
                  <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-indigo-500 bg-white dark:bg-slate-900 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  </span>

                  <div className="bg-slate-50 dark:bg-slate-950/20 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-slate-100 dark:border-slate-850">
                    <div>
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Checkpoint {index + 1}</span>
                      <h5 className="text-xs font-black text-slate-900 dark:text-white mt-0.5">
                        {currentTopicNum === nextTopicNum ? `Finish Topic / Chapter ${currentTopicNum}` : `Complete Topics ${currentTopicNum} through ${nextTopicNum}`}
                      </h5>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Target Deadline</span>
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">By Day {targetDayCheckpoint} of {days}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
