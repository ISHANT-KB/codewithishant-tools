import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Volume2, VolumeX, Plus, ListTodo, Trash2, CheckCircle2 } from 'lucide-react';

type TimerMode = 'focus' | 'short' | 'long';

interface Task {
  id: string;
  text: string;
  done: boolean;
}

export default function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [focusTime, setFocusTime] = useState<number>(25);
  const [shortTime, setShortTime] = useState<number>(5);
  const [longTime, setLongTime] = useState<number>(15);

  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Focus intervals streak stats
  const [completedStreaks, setCompletedStreaks] = useState<number>(() => {
    return parseInt(localStorage.getItem('pomo_completed_streaks') || '0');
  });

  // Task list items to focus on while the clock ticks down!
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Solve 3 calculus integration problems', done: false },
    { id: '2', text: 'Proofread history draft paragraph', done: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  // Keeps tracking active interval references
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync streaks to persistence
  useEffect(() => {
    localStorage.setItem('pomo_completed_streaks', completedStreaks.toString());
  }, [completedStreaks]);

  // Handle mode adjustments & set standard countdown in seconds
  const resetTimerForMode = (tMode: TimerMode) => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    let mins = 25;
    if (tMode === 'focus') mins = focusTime;
    else if (tMode === 'short') mins = shortTime;
    else if (tMode === 'long') mins = longTime;

    setMode(tMode);
    setTimeLeft(mins * 60);
  };

  // Sync seconds when config inputs change
  useEffect(() => {
    let mins = 25;
    if (mode === 'focus') mins = focusTime;
    else if (mode === 'short') mins = shortTime;
    else if (mode === 'long') mins = longTime;
    
    if (!isRunning) {
      setTimeLeft(mins * 60);
    }
  }, [focusTime, shortTime, longTime, mode]);

  // Main countdown timer ticker logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerCompleted();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode]);

  // Synthesize soft pleasant bell chime upon timer completion
  const triggerAlarmSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const playBeep = (freq: number, delay: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + delay + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
        
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duration);
      };

      // Play soft dual harmony chime
      playBeep(523.25, 0, 0.6); // C5
      playBeep(659.25, 0.15, 0.8); // E5
      playBeep(783.99, 0.3, 1.2); // G5
    } catch (e) {
      console.warn('Web Audio support absent or blocked:', e);
    }
  };

  const handleTimerCompleted = () => {
    setIsRunning(false);
    triggerAlarmSound();

    if (mode === 'focus') {
      setCompletedStreaks((prev) => prev + 1);
      // Automatically switch to short breaks
      resetTimerForMode('short');
    } else {
      // Return to focus session
      resetTimerForMode('focus');
    }
  };

  // Human countdown converter
  const formatTimerString = (secondsCount: number) => {
    const mins = Math.floor(secondsCount / 60);
    const secs = secondsCount % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Circular progress calculations
  const getActiveMaxMinutes = () => {
    if (mode === 'focus') return focusTime;
    if (mode === 'short') return shortTime;
    return longTime;
  };
  const totalSecondsForActiveMode = getActiveMaxMinutes() * 60;
  const elapsedRatio = totalSecondsForActiveMode > 0 ? (timeLeft / totalSecondsForActiveMode) : 1;
  const progressPercent = Math.min(100, Math.max(0, elapsedRatio * 100));

  // SVGs progress ring path configs
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progressPercent / 100) * circumference;

  // Add custom focus task inline
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      done: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8" id="pomo-timer-root">
      
      {/* POMODORO TIMER GRAPHIC CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* TIMER CORE DISC */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
          
          {/* Sizing modes selection buttons */}
          <div className="flex bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl select-none w-full max-w-sm justify-between">
            {(['focus', 'short', 'long'] as const).map((m) => (
              <button
                key={m}
                onClick={() => resetTimerForMode(m)}
                className={`py-2 px-3 sm:px-4 text-[10px] sm:text-xs font-black capitalize rounded-xl transition cursor-pointer ${
                  mode === m
                    ? 'bg-emerald-500 text-white shadow'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-350'
                }`}
              >
                {m === 'focus' && 'Focus Area'}
                {m === 'short' && 'Short Break'}
                {m === 'long' && 'Long Break'}
              </button>
            ))}
          </div>

          {/* SVG Progress Ring */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center select-none">
            <svg className="absolute -rotate-90 w-full h-full p-2" viewBox="0 0 200 200">
              {/* Back track ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Foreground progress ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="stroke-emerald-500 transition-all duration-300"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={isNaN(offset) ? 0 : offset}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner dynamic clock readout */}
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tighter block text-slate-900 dark:text-white">
                {formatTimerString(timeLeft)}
              </span>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                {mode === 'focus' ? 'Study Hard!' : 'Enjoy Breath'}
              </span>
            </div>
          </div>

          {/* Core Controls Block */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-3 rounded-xl border transition cursor-pointer ${
                soundEnabled
                  ? 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-600 dark:text-slate-400'
                  : 'border-slate-150 bg-black/5 text-slate-400'
              }`}
              title={soundEnabled ? 'Mute speaker feedback' : 'Unmute study bell'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className="py-3.5 px-8 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-2xl cursor-pointer shadow-md shadow-emerald-500/10 hover:scale-105 transition flex items-center gap-2"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              {isRunning ? 'Pause Loop' : 'Start Focus'}
            </button>

            <button
              onClick={() => resetTimerForMode(mode)}
              className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 text-slate-600 dark:text-slate-400 cursor-pointer transition"
              title="Reset current segment"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TIMER CONFIGURATION DIARDS */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-indigo-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-tight">Clock adjustments</h3>
            </div>

            <div className="space-y-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span>Focus Period Length:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{focusTime} Mins</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={focusTime}
                  onChange={(e) => setFocusTime(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span>Short break Length:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{shortTime} Mins</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={shortTime}
                  onChange={(e) => setShortTime(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span>Long break Length:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{longTime} Mins</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={longTime}
                  onChange={(e) => setLongTime(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center space-y-2 select-none">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Today's Streak Milestones</span>
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 block">{completedStreaks} Streaks</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">
              Great momentum! Finish focus segments to scale study targets.
            </span>
          </div>
        </div>
      </div>

      {/* 3. FOCUS MISSION CHECKLISTS */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white font-sans">Active Session Focus Targets</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">List quick actionable micro-goals to tackle before the Pomodoro chime marks completion.</p>
          </div>
        </div>

        {/* task adder */}
        <form onSubmit={handleAddTask} className="flex gap-2 mb-5">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="e.g. Find matching chemical compounds references..."
            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 rounded-xl cursor-pointer"
          >
            Add Task
          </button>
        </form>

        {/* Task lists rows */}
        {tasks.length === 0 ? (
          <div className="py-6 text-center text-slate-400 dark:text-slate-600 text-xs">
            Clean list! Create and solve focus tasks during study timers.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-60 overflow-y-auto">
            {tasks.map((t) => (
              <div key={t.id} className="py-3.5 flex items-center justify-between gap-4">
                <button
                  onClick={() => handleToggleTask(t.id)}
                  className="flex items-center gap-3 hover:text-slate-900 dark:hover:text-white cursor-pointer transition text-left"
                >
                  <CheckCircle2 className={`w-5 h-5 shrink-0 ${
                    t.done ? 'text-emerald-500 fill-emerald-500/10' : 'text-slate-300 dark:text-slate-700'
                  }`} />
                  <span className={`text-xs font-bold text-slate-700 dark:text-slate-350 ${
                    t.done ? 'line-through text-slate-400 dark:text-slate-550' : ''
                  }`}>
                    {t.text}
                  </span>
                </button>

                <button
                  onClick={() => handleRemoveTask(t.id)}
                  className="p-1 text-slate-400 hover:text-rose-500 rounded cursor-pointer transition duration-150"
                  title="Remove target"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
