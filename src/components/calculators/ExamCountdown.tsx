import React, { useState, useEffect } from 'react';
import { Calendar, Trash2, Plus, Clock, AlertCircle, CheckSquare, ListTodo, Sparkles } from 'lucide-react';

interface ExamDeadline {
  id: string;
  subject: string;
  dateString: string; // ISO date-time
  color: string;
  urgency: 'high' | 'medium' | 'low';
  prepProgress: string[]; // checklist items done
}

const DEFAULT_EXAMS: ExamDeadline[] = [
  {
    id: 'exam-1',
    subject: 'Computer Science (Final Term)',
    dateString: new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 16), // 5 days from now
    color: 'from-blue-500 to-indigo-600',
    urgency: 'medium',
    prepProgress: ['Syllabus Cover', 'Practice Coding Exercises'],
  },
  {
    id: 'exam-2',
    subject: 'Physics Mechanics Quiz',
    dateString: new Date(Date.now() + 86400000 * 1.5).toISOString().slice(0, 16), // 1.5 days from now
    color: 'from-amber-500 to-orange-600',
    urgency: 'high',
    prepProgress: ['Formula Sheets Review'],
  },
  {
    id: 'exam-3',
    subject: 'English Prose & Essays',
    dateString: new Date(Date.now() + 86400000 * 12).toISOString().slice(0, 16), // 12 days from now
    color: 'from-emerald-500 to-teal-600',
    urgency: 'low',
    prepProgress: [],
  },
];

const PRESET_CHECKLIST = [
  'Skim syllabus topics',
  'Summarize chapter notes',
  'Review formulas / definitions',
  'Solve past 3-year exam papers',
  'Mock timed self-assessment',
];

export default function ExamCountdown() {
  const [exams, setExams] = useState<ExamDeadline[]>(() => {
    try {
      const saved = localStorage.getItem('school_exam_deadlines');
      return saved ? JSON.parse(saved) : DEFAULT_EXAMS;
    } catch {
      return DEFAULT_EXAMS;
    }
  });

  // Tickers listener state to trigger re-renders every 1s
  const [timeTicker, setTimeTicker] = useState(Date.now());

  // Input states
  const [newSub, setNewSub] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('09:00');
  const [errorText, setErrorText] = useState('');

  // Persist list changes
  useEffect(() => {
    localStorage.setItem('school_exam_deadlines', JSON.stringify(exams));
  }, [exams]);

  // Sync internal real-time clocks every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTicker(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!newSub.trim() || !newDate) {
      setErrorText('Please enter both the Exam Subject name and choose a valid date.');
      return;
    }

    const targetDateTime = new Date(`${newDate}T${newTime || '09:00'}`);
    if (isNaN(targetDateTime.getTime())) {
      setErrorText('Invalid date or time parameters provided.');
      return;
    }

    if (targetDateTime.getTime() < Date.now()) {
      setErrorText('The exam date cannot be set in the past! Pick an upcoming schedule.');
      return;
    }

    // Determine default Urgency level based on days remaining
    const diffMs = targetDateTime.getTime() - Date.now();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    let urg: 'high' | 'medium' | 'low' = 'low';
    if (diffDays < 3) urg = 'high';
    else if (diffDays < 7) urg = 'medium';

    // Cycle colorful gradients
    const colors = [
      'from-blue-500 to-indigo-600',
      'from-rose-500 to-pink-600',
      'from-amber-500 to-orange-600',
      'from-emerald-500 to-teal-600',
      'from-purple-500 to-violet-600',
    ];
    const pickedColor = colors[exams.length % colors.length];

    const newExam: ExamDeadline = {
      id: Date.now().toString(),
      subject: newSub.trim(),
      dateString: targetDateTime.toISOString().slice(0, 16),
      color: pickedColor,
      urgency: urg,
      prepProgress: [],
    };

    setExams([newExam, ...exams]);
    setNewSub('');
    setNewDate('');
    setNewTime('09:00');
  };

  const handleRemoveExam = (id: string) => {
    setExams(exams.filter((ex) => ex.id !== id));
  };

  // Toggle preparation checklist tasks
  const handleTogglePrepItem = (examId: string, item: string) => {
    setExams(
      exams.map((ex) => {
        if (ex.id !== examId) return ex;
        const exists = ex.prepProgress.includes(item);
        const nextProg = exists
          ? ex.prepProgress.filter((i) => i !== item)
          : [...ex.prepProgress, item];
        return { ...ex, prepProgress: nextProg };
      })
    );
  };

  // Compute countdown parameters
  const getCountdownString = (isoString: string) => {
    const target = new Date(isoString).getTime();
    const remains = target - Date.now();

    if (remains <= 0) {
      return {
        completed: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        text: 'Exam and countdown finalized!',
      };
    }

    const secs = Math.floor(remains / 1000) % 60;
    const mins = Math.floor(remains / (1000 * 60)) % 60;
    const hrs = Math.floor(remains / (1000 * 60 * 60)) % 24;
    const dys = Math.floor(remains / (1000 * 60 * 60 * 24));

    return {
      completed: false,
      days: dys,
      hours: hrs,
      minutes: mins,
      seconds: secs,
      text: `${dys}d ${hrs}h ${mins}m left`,
    };
  };

  return (
    <div className="space-y-8" id="exams-countdown-root">
      
      {/* 1. INPUT SCHEDULER BAR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="create-countdown-form">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-rose-500/10 text-rose-500 rounded-2xl">
            <Calendar className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Register Upcoming Exams</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">Keep deadlines visible. Added plans are securely saved in local storage.</p>
          </div>
        </div>

        {errorText && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold rounded-2xl mb-4">
            {errorText}
          </div>
        )}

        <form onSubmit={handleAddExam} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Exam Subject/Title</label>
            <input
              type="text"
              value={newSub}
              onChange={(e) => setNewSub(e.target.value)}
              placeholder="e.g. Physics Section A Mechanics"
              className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Exam Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Time of Exam</label>
            <div className="flex gap-2">
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 rounded-xl cursor-pointer shadow-md transition flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 2. REALTIME COUNTDOWN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="active-countdowns-grid">
        {exams.map((ex) => {
          const timer = getCountdownString(ex.dateString);
          const prepPercentage = (ex.prepProgress.length / PRESET_CHECKLIST.length) * 100;

          // Days styling check
          let urgencyBadgeLabel = 'Ready Mode';
          let urgencyBadgeColor = 'bg-slate-100 dark:bg-slate-950 text-slate-500 border-slate-200';

          if (!timer.completed) {
            const totalDaysVal = timer.days;
            if (totalDaysVal < 2) {
              urgencyBadgeLabel = 'Urgent Cramming Space! 🚨';
              urgencyBadgeColor = 'bg-rose-500/10 dark:bg-rose-950/20 text-rose-500 border-rose-500/20';
            } else if (totalDaysVal < 5) {
              urgencyBadgeLabel = 'Moderate Study Priority 🔔';
              urgencyBadgeColor = 'bg-amber-500/10 dark:bg-amber-950/20 text-amber-500 border-amber-500/20';
            } else {
              urgencyBadgeLabel = 'Safe Buffer Area';
              urgencyBadgeColor = 'bg-emerald-500/10 dark:bg-emerald-950/20 text-emerald-500 border-emerald-500/20';
            }
          }

          return (
            <div
              key={ex.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
              id={`exam-card-${ex.id}`}
            >
              {/* Card top banner */}
              <div className={`p-5 bg-gradient-to-r ${ex.color} text-white relative`}>
                <button
                  type="button"
                  onClick={() => handleRemoveExam(ex.id)}
                  className="absolute right-3.5 top-3.5 p-1.5 bg-black/15 hover:bg-black/30 rounded-xl transition cursor-pointer"
                  title="Remove exam"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-lg border border-white/10 select-none">
                  Exam Countdown
                </span>
                
                <h4 className="font-extrabold text-sm md:text-base mt-2.5 leading-snug line-clamp-1">{ex.subject}</h4>
                <div className="flex items-center gap-1 text-[11px] text-white/80 mt-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(ex.dateString).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                </div>
              </div>

              {/* Countdown metrics */}
              <div className="p-5 space-y-5">
                {timer.completed ? (
                  <div className="py-2.5 text-center bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center gap-1.5 border border-rose-500/15">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-black">Exam Schedule Commenced!</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2 text-center select-none font-mono">
                    <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 p-2 rounded-2xl">
                      <span className="block text-xl font-black text-slate-800 dark:text-white leading-none">{timer.days}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 block">Days</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 p-2 rounded-2xl">
                      <span className="block text-xl font-black text-slate-800 dark:text-white leading-none">{timer.hours}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 block">Hrs</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 p-2 rounded-2xl">
                      <span className="block text-xl font-black text-slate-800 dark:text-white leading-none">{timer.minutes}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 block">Mins</span>
                    </div>
                    <div className="bg-rose-50 dark:bg-rose-950/15 border border-rose-100/10 p-2 rounded-2xl">
                      <span className="block text-xl font-black text-rose-500 dark:text-rose-400 leading-none">{timer.seconds}</span>
                      <span className="text-[9px] font-bold text-rose-400 uppercase mt-1 block">Secs</span>
                    </div>
                  </div>
                )}

                {/* Urgency Badge */}
                <div className={`p-1.5 border rounded-xl text-center text-[10px] font-black uppercase tracking-wider ${urgencyBadgeColor}`}>
                  {urgencyBadgeLabel}
                </div>

                {/* Preparation status bar tracker */}
                <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 uppercase tracking-wide">
                      <ListTodo className="w-3.5 h-3.5 text-slate-400" /> Syllabus Checked
                    </span>
                    <span className="font-bold">{prepPercentage.toFixed(0)}%</span>
                  </div>

                  {/* progress layout */}
                  <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${prepPercentage}%` }}
                    ></div>
                  </div>

                  {/* Checklist options */}
                  <div className="space-y-1.5 pt-1" id="checklist-container">
                    {PRESET_CHECKLIST.map((item) => {
                      const isChecked = ex.prepProgress.includes(item);
                      return (
                        <button
                          key={item}
                          onClick={() => handleTogglePrepItem(ex.id, item)}
                          className="w-full text-left py-1 text-[10px] font-bold flex items-center gap-2 text-slate-600 dark:text-slate-350 hover:text-slate-950 dark:hover:text-white transition cursor-pointer"
                        >
                          <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center shrink-0 ${
                            isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-700'
                          }`}>
                            {isChecked && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          </div>
                          <span className={isChecked ? 'line-through text-slate-400' : ''}>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
