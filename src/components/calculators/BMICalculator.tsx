import { useState, useEffect } from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import ShareResults from '../ShareResults';

export default function BMICalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [heightMetric, setHeightMetric] = useState('175'); // cm
  const [weightMetric, setWeightMetric] = useState('70');  // kg
  
  const [weightImperial, setWeightImperial] = useState('154'); // lbs
  const [heightFeet, setHeightFeet] = useState('5'); // feet
  const [heightInches, setHeightInches] = useState('9'); // inches

  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const [colorClass, setColorClass] = useState<string>('');
  const [healthAdvice, setHealthAdvice] = useState<string>('');

  const calculateBMIValue = (
    system: 'metric' | 'imperial', 
    hMet: string, 
    wMet: string, 
    wImp: string, 
    hFt: string, 
    hInch: string
  ) => {
    let bmiValue = 0;

    if (system === 'metric') {
      const heightM = parseFloat(hMet) / 100;
      const weightK = parseFloat(wMet);
      if (heightM > 0 && weightK > 0) {
        bmiValue = weightK / (heightM * heightM);
      }
    } else {
      const weightL = parseFloat(wImp);
      const feet = parseFloat(hFt) || 0;
      const inches = parseFloat(hInch) || 0;
      const totalInches = (feet * 12) + inches;
      if (totalInches > 0 && weightL > 0) {
        bmiValue = (weightL / (totalInches * totalInches)) * 703;
      }
    }
    return bmiValue;
  };

  const calculateBMI = () => {
    const bmiValue = calculateBMIValue(unitSystem, heightMetric, weightMetric, weightImperial, heightFeet, heightInches);

    if (bmiValue <= 0) {
      alert("Invalid height or weight values entered!");
      return;
    }

    const roundedBmi = parseFloat(bmiValue.toFixed(1));
    setBmi(roundedBmi);

    // Classification Categories according to WHO Standards
    if (roundedBmi < 18.5) {
      setCategory('Underweight');
      setColorClass('text-blue-500 bg-blue-500/10 border-blue-500/20');
      setHealthAdvice('Your weight is lower than recommended for optimal health. It is suggested to discuss with a health advisor about balanced caloric goals and muscle building exercises.');
    } else if (roundedBmi >= 18.5 && roundedBmi < 25) {
      setCategory('Normal Weight');
      setColorClass('text-emerald-500 bg-emerald-500/10 border-emerald-500/20');
      setHealthAdvice('Congratulations! Your Body Mass Index is in the optimal range. Maintaining a balanced diet and regular physical activity will help preserve this healthy baseline.');
    } else if (roundedBmi >= 25 && roundedBmi < 30) {
      setCategory('Overweight');
      setColorClass('text-amber-500 bg-amber-500/10 border-amber-500/20');
      setHealthAdvice('Your weight resides slightly in the overweight spectrum. Small, consistent modifications such as managing portion sizes and adding low-impact cardio can support weight goals.');
    } else {
      setCategory('Obese');
      setColorClass('text-rose-500 bg-rose-500/10 border-rose-500/20');
      setHealthAdvice('Your BMI indicates Obesity. Consider consulting with professional healthcare practitioners to form structured wellness, metabolic, and progressive exercise targets.');
    }
  };

  // Prepopulate query parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qUnit = params.get('bmi_unit');
    const qHMetric = params.get('bmi_h_metric');
    const qWMetric = params.get('bmi_w_metric');
    const qWImperial = params.get('bmi_w_imperial');
    const qHFeet = params.get('bmi_h_feet');
    const qHInches = params.get('bmi_h_inches');

    let loaded = false;
    if (qUnit === 'metric' || qUnit === 'imperial') {
      setUnitSystem(qUnit);
      loaded = true;
    }
    if (qHMetric) { setHeightMetric(qHMetric); loaded = true; }
    if (qWMetric) { setWeightMetric(qWMetric); loaded = true; }
    if (qWImperial) { setWeightImperial(qWImperial); loaded = true; }
    if (qHFeet) { setHeightFeet(qHFeet); loaded = true; }
    if (qHInches) { setHeightInches(qHInches); loaded = true; }

    if (loaded) {
      const activeUnit = (qUnit as 'metric' | 'imperial') || 'metric';
      const hMet = qHMetric || heightMetric;
      const wMet = qWMetric || weightMetric;
      const wImp = qWImperial || weightImperial;
      const hFt = qHFeet || heightFeet;
      const hInch = qHInches || heightInches;

      const val = calculateBMIValue(activeUnit, hMet, wMet, wImp, hFt, hInch);
      if (val > 0) {
        const roundedBmi = parseFloat(val.toFixed(1));
        setBmi(roundedBmi);
        if (roundedBmi < 18.5) {
          setCategory('Underweight');
          setColorClass('text-blue-500 bg-blue-500/10 border-blue-500/20');
          setHealthAdvice('Your weight is lower than recommended for optimal health.');
        } else if (roundedBmi >= 18.5 && roundedBmi < 25) {
          setCategory('Normal Weight');
          setColorClass('text-emerald-500 bg-emerald-500/10 border-emerald-500/20');
          setHealthAdvice('Congratulations! Your Body Mass Index is in the optimal range.');
        } else if (roundedBmi >= 25 && roundedBmi < 30) {
          setCategory('Overweight');
          setColorClass('text-amber-500 bg-amber-500/10 border-amber-500/20');
          setHealthAdvice('Your weight resides slightly in the overweight spectrum.');
        } else {
          setCategory('Obese');
          setColorClass('text-rose-500 bg-rose-500/10 border-rose-500/20');
          setHealthAdvice('Your BMI indicates Obesity.');
        }
      }
    }
  }, []);

  const handleReset = () => {
    setHeightMetric('175');
    setWeightMetric('70');
    setWeightImperial('154');
    setHeightFeet('5');
    setHeightInches('9');
    setBmi(null);
  };

  return (
    <div className="space-y-6" id="bmi-calc-wrapper">
      {/* Tab select metric or imperial */}
      <div className="flex border-b border-slate-150 dark:border-slate-800" role="tablist">
        <button
          onClick={() => setUnitSystem('metric')}
          className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            unitSystem === 'metric'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          id="btn-bmi-tab-metric"
        >
          Metric Units (kg / cm)
        </button>
        <button
          onClick={() => setUnitSystem('imperial')}
          className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            unitSystem === 'imperial'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          id="btn-bmi-tab-imperial"
        >
          Imperial Units (lbs / ft-in)
        </button>
      </div>

      {unitSystem === 'metric' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={heightMetric}
              onChange={(e) => setHeightMetric(e.target.value)}
              placeholder="e.g. 175"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-sm font-medium focus:outline-emerald-500 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weightMetric}
              onChange={(e) => setWeightMetric(e.target.value)}
              placeholder="e.g. 70"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-sm font-medium focus:outline-emerald-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Height (Feet)
              </label>
              <input
                type="number"
                value={heightFeet}
                onChange={(e) => setHeightFeet(e.target.value)}
                placeholder="e.g. 5"
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-sm font-medium focus:outline-emerald-500 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Height (Inches)
              </label>
              <input
                type="number"
                value={heightInches}
                onChange={(e) => setHeightInches(e.target.value)}
                placeholder="e.g. 9"
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-sm font-medium focus:outline-emerald-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Weight (Pounds)
            </label>
            <input
              type="number"
              value={weightImperial}
              onChange={(e) => setWeightImperial(e.target.value)}
              placeholder="e.g. 154"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl text-sm font-medium focus:outline-emerald-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      )}

      {/* Trigger Buttons */}
      <div className="flex gap-3">
        <button
          onClick={calculateBMI}
          className="flex-1 py-3 px-6 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          id="btn-bmi-submit"
        >
          <Activity className="w-4 h-4" />
          <span>Compute BMI Index</span>
        </button>
        <button
          onClick={handleReset}
          className="p-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
          title="Reset height and weight"
          id="btn-bmi-reset"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Results dashboard rendering standard indicators */}
      {bmi !== null && (
        <div className="mt-8 border-t border-slate-100 dark:border-slate-800/80 pt-6 space-y-6" id="bmi-results-box">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800/70 pb-6 md:pb-0 md:pr-6">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Your Calculated BMI</span>
              <div className="text-5xl font-extrabold text-slate-900 dark:text-white">
                {bmi}
              </div>
              <span className={`inline-block mt-3 px-4 py-1 rounded-full border text-xs font-bold tracking-wide uppercase ${colorClass}`}>
                {category}
              </span>
            </div>

            <div className="md:col-span-8">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Health Classification Advice</h4>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                {healthAdvice}
              </p>

              {/* Graphical WHO Slider */}
              <div className="mt-6 space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1">
                  <span>Under (18.5)</span>
                  <span>Normal (24.9)</span>
                  <span>Over (29.9)</span>
                  <span>Obese (30+)</span>
                </div>
                {/* Horizontal slider rail */}
                <div className="relative h-2.5 w-full bg-slate-150 dark:bg-slate-800 rounded-full flex overflow-hidden">
                  <div className="h-full bg-blue-400" style={{ width: '25%' }} title="Underweight" />
                  <div className="h-full bg-emerald-400" style={{ width: '30%' }} title="Normal" />
                  <div className="h-full bg-amber-400" style={{ width: '25%' }} title="Overweight" />
                  <div className="h-full bg-rose-400" style={{ width: '20%' }} title="Obese" />

                  {/* Dynamic indicator flag pinpointing their BMI index */}
                  {(() => {
                    // Position slider pointer
                    const minVal = 14;
                    const maxVal = 35;
                    const posPct = Math.min(Math.max(((bmi - minVal) / (maxVal - minVal)) * 100, 2), 98);
                    return (
                      <div
                        className="absolute top-1.5 -mt-2.5 h-4 w-4 bg-slate-900 dark:bg-white border-2 border-emerald-500 rounded-full shadow"
                        style={{ left: `${posPct}%` }}
                        title={`Your score: ${bmi}`}
                      />
                    );
                  })()}
                </div>
              </div>
            </div>

          </div>

          <ShareResults
            toolId="bmi-calculator"
            toolName="Body Mass Index (BMI)"
            textToCopy={`BMI: ${bmi} (${category}). Height: ${unitSystem === 'metric' ? heightMetric + ' cm' : heightFeet + ' ft ' + heightInches + ' in'}, Weight: ${unitSystem === 'metric' ? weightMetric + ' kg' : weightImperial + ' lbs'}.`}
            shareUrlParams={{
              bmi_unit: unitSystem,
              bmi_h_metric: heightMetric,
              bmi_w_metric: weightMetric,
              bmi_w_imperial: weightImperial,
              bmi_h_feet: heightFeet,
              bmi_h_inches: heightInches,
            }}
            mainMetric={{
              label: 'BMI Score',
              value: String(bmi),
              subLabel: category,
              color: category === 'Normal Weight' ? 'emerald' : category === 'Underweight' ? 'blue' : category === 'Overweight' ? 'amber' : 'rose'
            }}
            additionalMetrics={[
              { label: 'Classification Status', value: category },
              { label: 'Calculated Weight Class', value: category },
              { label: 'Measured Height', value: unitSystem === 'metric' ? `${heightMetric} cm` : `${heightFeet}' ${heightInches}"` },
              { label: 'Current Weight', value: unitSystem === 'metric' ? `${weightMetric} kg` : `${weightImperial} lbs` }
            ]}
          />
        </div>
      )}
    </div>
  );
}
