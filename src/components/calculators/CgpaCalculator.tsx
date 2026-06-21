import { useState } from 'react';
import { GraduationCap, Landmark, HelpCircle, RefreshCw, Calculator, Plus, Trash2, Hash } from 'lucide-react';

interface SemesterGPA {
  id: string;
  name: string;
  gpa: number;
  credits: number;
}

const FORMULA_PRESETS = [
  { name: 'CBSE / Standard (CGPA * 9.5)', multiplier: 9.5, offset: 0, scale: 10 },
  { name: 'MUMBAI University (CGPA * 7.1 + 12 flat)', multiplier: 7.1, offset: 12, scale: 10, special: 'mumbai' },
  { name: 'VTU/KTU ((CGPA - 0.75) * 10)', multiplier: 10, offset: 0, scale: 10, subtractor: 0.75, special: 'subtract' },
  { name: 'Global 4.0 Scale (CGPA * 25)', multiplier: 25, scale: 4 },
];

export default function CgpaCalculator() {
  // Simple quick converter state
  const [quickCgpa, setQuickCgpa] = useState<string>('8.5');
  const [activeFormula, setActiveFormula] = useState(FORMULA_PRESETS[0]);
  const [customMultiplier, setCustomMultiplier] = useState<string>('9.5');

  // Semester SGPA list state for dynamic computing
  const [semesters, setSemesters] = useState<SemesterGPA[]>([
    { id: '1', name: 'Semester 1', gpa: 8.2, credits: 20 },
    { id: '2', name: 'Semester 2', gpa: 8.6, credits: 20 },
  ]);

  // Semester Inputs
  const [newGpa, setNewGpa] = useState<string>('');
  const [newCredits, setNewCredits] = useState<string>('20');

  // 1. Calculations for quick converter
  const cgpaValue = Number(quickCgpa) || 0;
  let quickPercentage = 0;

  if (activeFormula.special === 'mumbai') {
    quickPercentage = cgpaValue * 7.1 + 12;
  } else if (activeFormula.special === 'subtract' && activeFormula.subtractor) {
    quickPercentage = Math.max(0, (cgpaValue - activeFormula.subtractor) * activeFormula.multiplier);
  } else {
    const mult = customMultiplier && activeFormula.name === 'Custom' ? Number(customMultiplier) : activeFormula.multiplier || 9.5;
    quickPercentage = cgpaValue * mult;
  }

  // Cap percentage at 100
  quickPercentage = Math.min(100, Math.max(0, quickPercentage));

  // Determine Class
  let gradeClass = 'Second Class';
  if (quickPercentage >= 75) {
    gradeClass = 'First Class with Distinction';
  } else if (quickPercentage >= 60) {
    gradeClass = 'First Class (60%+)';
  } else if (quickPercentage >= 50) {
    gradeClass = 'Second Class (50%+)';
  } else if (quickPercentage >= 35) {
    gradeClass = 'Pass Class';
  } else {
    gradeClass = 'Needs Improvement';
  }

  // 2. Semester based cumulative calculations
  const totalCredits = semesters.reduce((sum, sem) => sum + sem.credits, 0);
  const totalWeightedGPAs = semesters.reduce((sum, sem) => sum + (sem.gpa * sem.credits), 0);
  const calculatedCgpa = totalCredits > 0 ? (totalWeightedGPAs / totalCredits) : 0;

  // Percentage for the semesters cumulative CGPA using active formula
  let semPercentage = 0;
  if (activeFormula.special === 'mumbai') {
    semPercentage = calculatedCgpa * 7.1 + 12;
  } else if (activeFormula.special === 'subtract' && activeFormula.subtractor) {
    semPercentage = Math.max(0, (calculatedCgpa - activeFormula.subtractor) * activeFormula.multiplier);
  } else {
    const mult = customMultiplier && activeFormula.name === 'Custom' ? Number(customMultiplier) : activeFormula.multiplier || 9.5;
    semPercentage = calculatedCgpa * mult;
  }
  semPercentage = Math.min(100, Math.max(0, semPercentage));

  const handleAddSemester = () => {
    const gpaVal = Number(newGpa);
    const credVal = Number(newCredits) || 20;

    if (!gpaVal || gpaVal < 0 || gpaVal > activeFormula.scale) {
      alert(`Please enter a valid GPA of up to ${activeFormula.scale}`);
      return;
    }

    const nextSemNum = semesters.length + 1;
    const newSem: SemesterGPA = {
      id: Date.now().toString(),
      name: `Semester ${nextSemNum}`,
      gpa: gpaVal,
      credits: credVal,
    };

    setSemesters([...semesters, newSem]);
    setNewGpa('');
  };

  const handleRemoveSemester = (id: string) => {
    setSemesters(semesters.filter(sem => sem.id !== id));
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm" id="cgpa-calculator-container">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
          <GraduationCap className="w-5 h-5 text-emerald-500" />
          CGPA to Percentage / Class Converter
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Convert SGPA/CGPA into equivalent percentages, calculate cumulative multi-semester aggregates, and configure matching university specific assessment metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CONVERTER PANEL & FORMULA SELECTOR */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">1. Select Conversion Standard</h3>

            <div className="space-y-2">
              {FORMULA_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setActiveFormula(preset);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs cursor-pointer transition-all ${activeFormula.name === preset.name ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-450 font-semibold' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-100/50'}`}
                >
                  {preset.name}
                </button>
              ))}

              <button
                onClick={() => {
                  setActiveFormula({ name: 'Custom', multiplier: Number(customMultiplier) || 9.5, scale: 10 });
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs cursor-pointer transition-all ${activeFormula.name === 'Custom' ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-450 font-semibold' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-100/50'}`}
              >
                Custom Multiplier Formula
              </button>
              {activeFormula.name === 'Custom' && (
                <div className="pt-2 pl-2">
                  <label className="text-xs text-slate-400 block mb-1">Enter Custom Multiplier (e.g. 9.0 or 10.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={customMultiplier}
                    onChange={(e) => {
                      setCustomMultiplier(e.target.value);
                    }}
                    className="w-24 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-lg text-xs"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">2. Quick CGPA Input</h3>
            
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max={activeFormula.scale || 10}
                  value={quickCgpa}
                  onChange={(e) => setQuickCgpa(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-950 dark:text-white text-sm focus:outline-none focus:border-emerald-500 font-bold"
                  placeholder="e.g. 8.5"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Maximum scale: {activeFormula.scale || 10}.0</span>
              </div>

              <div className="bg-emerald-500/10 text-emerald-500 p-4.5 rounded-2xl text-center">
                <span className="text-[10.5px] uppercase font-bold text-slate-400 block mb-1">Percentage</span>
                <span className="text-3xl font-black text-emerald-500">{quickPercentage.toFixed(2)}%</span>
                <span className="text-[10px] block mt-1 text-slate-450 font-semibold">{gradeClass}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEMESTER-WISE CUMULATIVE AGGREGATOR */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-950 p-5 border border-slate-150 dark:border-slate-850 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
              <Calculator className="w-4 h-4 text-emerald-500" />
              Semester Aggregate CGPA Calculator
            </h3>
            <p className="text-[11px] text-slate-400">Add semesters together with respective credit points to dynamically weigh final averages.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Semester SGPA</label>
                <input
                  type="number"
                  step="0.01"
                  value={newGpa}
                  onChange={(e) => setNewGpa(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                  placeholder="e.g. 8.4"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Credits Points</label>
                <input
                  type="number"
                  value={newCredits}
                  onChange={(e) => setNewCredits(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-202 dark:border-slate-800 rounded-xl text-xs"
                  placeholder="e.g. 20"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddSemester}
                  className="w-full py-2 bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer hover:bg-emerald-600 transition"
                >
                  <Plus className="w-4 h-4" /> Add Semester
                </button>
              </div>
            </div>

            {/* List semesters in miniature layout */}
            <div className="space-y-2 max-h-44 overflow-y-auto pt-2">
              {semesters.map((sem) => (
                <div key={sem.id} className="flex justify-between items-center bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{sem.name}</span>
                    <span className="text-slate-400 text-[10px] ml-2">({sem.credits} Credits)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">{sem.gpa.toFixed(2)} GP</span>
                    <button
                      onClick={() => handleRemoveSemester(sem.id)}
                      className="text-red-400 hover:text-red-500 cursor-pointer p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cumulative Results indicator */}
            {semesters.length > 0 && (
              <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Weighted Cumulative CGPA</span>
                  <span className="text-2xl font-black text-emerald-500">{calculatedCgpa.toFixed(2)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Overall Percentage</span>
                  <span className="text-sm font-semibold text-slate-850 dark:text-slate-105">{semPercentage.toFixed(2)}%</span>
                  <span className="text-[10px] block text-slate-400">Credits: {totalCredits}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
