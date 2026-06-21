import { useState } from 'react';
import { Delete, Trash2 } from 'lucide-react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const keys = [
    { label: 'C', type: 'clear', class: 'text-red-500 hover:bg-red-500/15' },
    { label: 'CE', type: 'backspace', class: 'text-amber-500 hover:bg-amber-500/15' },
    { label: '(', type: 'char', class: '' },
    { label: ')', type: 'char', class: '' },
    { label: 'π', type: 'char', value: 'Math.PI', class: 'font-serif' },
    
    { label: 'sin', type: 'func', value: 'Math.sin(', class: 'text-emerald-500 font-semibold' },
    { label: 'cos', type: 'func', value: 'Math.cos(', class: 'text-emerald-500 font-semibold' },
    { label: 'tan', type: 'func', value: 'Math.tan(', class: 'text-emerald-500 font-semibold' },
    { label: '√', type: 'func', value: 'Math.sqrt(', class: 'text-emerald-500 font-semibold' },
    { label: 'e', type: 'char', value: 'Math.E', class: 'font-serif' },

    { label: 'ln', type: 'func', value: 'Math.log(', class: 'text-emerald-500 font-semibold' },
    { label: 'log', type: 'func', value: 'Math.log10(', class: 'text-emerald-500 font-semibold' },
    { label: '^', type: 'char', value: '**', class: 'text-blue-500 font-bold' },
    { label: 'mod', type: 'char', value: '%', class: 'text-blue-500 font-bold' },
    { label: '/', type: 'char', class: 'text-blue-500 font-bold' },

    { label: '7', type: 'char', class: 'font-bold' },
    { label: '8', type: 'char', class: 'font-bold' },
    { label: '9', type: 'char', class: 'font-bold' },
    { label: '*', type: 'char', class: 'text-blue-500 font-bold' },
    { label: 'exp', type: 'func', value: 'Math.exp(', class: 'text-emerald-500 font-semibold' },

    { label: '4', type: 'char', class: 'font-bold' },
    { label: '5', type: 'char', class: 'font-bold' },
    { label: '6', type: 'char', class: 'font-bold' },
    { label: '-', type: 'char', class: 'text-blue-500 font-bold' },
    { label: 'x²', type: 'func', value: '**2', class: 'text-emerald-500' },

    { label: '1', type: 'char', class: 'font-bold' },
    { label: '2', type: 'char', class: 'font-bold' },
    { label: '3', type: 'char', class: 'font-bold' },
    { label: '+', type: 'char', class: 'text-blue-500 font-bold' },
    { label: '1/x', type: 'func', value: '1/(', class: 'text-emerald-500' },

    { label: '0', type: 'char', class: 'font-bold col-span-2' },
    { label: '.', type: 'char', class: 'font-bold' },
    { label: '=', type: 'eval', class: 'bg-emerald-500 text-slate-950 font-bold col-span-2 hover:bg-emerald-400' },
  ];

  const handleKeyPress = (key: any) => {
    if (key.type === 'clear') {
      setDisplay('');
    } else if (key.type === 'backspace') {
      setDisplay((prev) => prev.slice(0, -1));
    } else if (key.type === 'char') {
      setDisplay((prev) => prev + (key.value || key.label));
    } else if (key.type === 'func') {
      setDisplay((prev) => prev + (key.value || key.label));
    } else if (key.type === 'eval') {
      try {
        // Run evaluating engine safely
        const evalString = display
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(')
          .replace(/√\(/g, 'Math.sqrt(');
        
        const evaluated = Function(`"use strict"; return (${evalString})`)();
        if (evaluated === undefined || isNaN(evaluated)) {
          setDisplay('Error');
        } else {
          const resultStr = String(parseFloat(evaluated.toFixed(8)));
          setHistory((prev) => [display + ' = ' + resultStr, ...prev.slice(0, 4)]);
          setDisplay(resultStr);
        }
      } catch (e) {
        setDisplay('Error');
      }
    }
  };

  return (
    <div className="space-y-6" id="scientific-calc-inner">
      {/* Display Screen box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-right overflow-hidden shadow-inner">
        <span className="text-[10px] font-mono text-slate-500 block min-h-4">
          {history[0] || ''}
        </span>
        <div className="text-3xl font-mono text-emerald-400 select-all tracking-wider mt-1 truncate max-w-full min-h-10">
          {display || '0'}
        </div>
      </div>

      {/* Grid of keys */}
      <div className="grid grid-cols-5 gap-2.5">
        {keys.map((key) => (
          <button
            key={key.label}
            onClick={() => handleKeyPress(key)}
            className={`py-3.5 px-1 rounded-xl cursor-pointer text-xs transition-all flex items-center justify-center border font-mono ${
              key.class ||
              'bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-850'
            } ${key.label === '0' || key.label === '=' ? 'col-span-2' : ''}`}
            id={`sci-key-${key.label}`}
          >
            {key.label}
          </button>
        ))}
      </div>

      {history.length > 0 && (
        <div className="pt-4 border-t border-slate-150 dark:border-slate-850">
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block mb-2">History Log</span>
          <div className="space-y-1 font-mono text-xs text-slate-500 dark:text-slate-400">
            {history.map((h, i) => (
              <div key={i} className="flex justify-between">
                <span>#{i + 1}</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
