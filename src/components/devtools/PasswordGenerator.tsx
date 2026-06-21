import { useState, useEffect } from 'react';
import { ShieldCheck, Copy, Eye, EyeOff, RefreshCw, Key } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [passLength, setPassLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  
  const [bulkCount, setBulkCount] = useState(1);
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);

  const [strength, setStrength] = useState({ label: 'Weak', color: 'bg-red-500', pct: 25 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generatePasswords();
  }, [passLength, includeUpper, includeLower, includeNumbers, includeSymbols, bulkCount]);

  const generateSinglePassword = (len: number): string => {
    let charset = '';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) return '';

    let res = '';
    const array = new Uint32Array(len);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < len; i++) {
      res += charset[array[i] % charset.length];
    }
    return res;
  };

  const generatePasswords = () => {
    const mainPass = generateSinglePassword(passLength);
    setPassword(mainPass);

    if (bulkCount > 1) {
      const arr: string[] = [];
      for (let i = 0; i < bulkCount; i++) {
        arr.push(generateSinglePassword(passLength));
      }
      setBulkPasswords(arr);
    } else {
      setBulkPasswords([]);
    }

    calculateStrength(mainPass);
  };

  const calculateStrength = (pass: string) => {
    if (!pass) {
      setStrength({ label: 'None', color: 'bg-slate-200', pct: 0 });
      return;
    }

    let entropy = 0;
    let poolSize = 0;
    if (includeUpper) poolSize += 26;
    if (includeLower) poolSize += 26;
    if (includeNumbers) poolSize += 10;
    if (includeSymbols) poolSize += 26;

    if (poolSize === 0) poolSize = 1;
    entropy = pass.length * Math.log2(poolSize);

    if (entropy < 40) {
      setStrength({ label: 'Weak', color: 'bg-red-500', pct: 25 });
    } else if (entropy < 60) {
      setStrength({ label: 'Moderate', color: 'bg-amber-500', pct: 50 });
    } else if (entropy < 85) {
      setStrength({ label: 'Strong', color: 'bg-emerald-500', pct: 75 });
    } else {
      setStrength({ label: 'Excellent (Very Secure)', color: 'bg-emerald-600', pct: 100 });
    }
  };

  const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6" id="pass-gen-inner">
      {/* Dynamic results header panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-inner">
        <span className="font-mono text-xl text-emerald-400 select-all break-all pr-4">
          {password || 'Select options below'}
        </span>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => handleCopy(password)}
            className="p-3 bg-slate-800 text-slate-350 hover:text-white rounded-xl transition-colors cursor-pointer"
            title="Copy to clipboard"
            id="btn-copy-main-pass"
          >
            {copied ? <span className="text-[10px] font-bold text-emerald-400 font-mono">COPIED</span> : <Copy className="w-5 h-5" />}
          </button>
          <button
            onClick={generatePasswords}
            className="p-3 bg-slate-800 text-slate-350 hover:text-white rounded-xl transition-colors cursor-pointer"
            title="Generate custom password"
            id="btn-regen-pass"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Strength Indicator Meter */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold text-slate-500">
          <span>Password Strength Estimate</span>
          <span className="text-slate-700 dark:text-slate-350">{strength.label}</span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-300 ${strength.color}`} style={{ width: `${strength.pct}%` }} />
        </div>
      </div>

      {/* Configuration Slider and checkbox items split in card columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pt-2">
        
        {/* Left Col settings */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold uppercase text-slate-500 mb-2">
              <span>Length:</span>
              <span className="font-mono text-slate-850 dark:text-slate-300">{passLength} characters</span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={passLength}
              onChange={(e) => setPassLength(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Bulk Generator (Number of Passwords)
            </label>
            <select
              value={bulkCount}
              onChange={(e) => setBulkCount(parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-emerald-500 text-slate-750 dark:text-slate-300"
            >
              <option value="1">1 (Single Secure Password)</option>
              <option value="5">5 (Generate List)</option>
              <option value="10">10 (Generate List)</option>
              <option value="20">20 (Generate List)</option>
            </select>
          </div>
        </div>

        {/* Right Col Checkbox Options */}
        <div className="bg-slate-50 dark:bg-slate-900/10 p-4 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl space-y-3.5">
          <span className="text-[10px] font-bold text-slate-455 uppercase tracking-wider block border-b border-slate-150 dark:border-slate-800 pb-1.5">Character Parameters</span>
          
          <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-350 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 border-slate-300 cursor-pointer"
            />
            <span>Include Uppercase Letters (A-Z)</span>
          </label>

          <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-350 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 border-slate-300 cursor-pointer"
            />
            <span>Include Lowercase Letters (a-z)</span>
          </label>

          <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-350 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 border-slate-300 cursor-pointer"
            />
            <span>Include Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-350 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 border-slate-300 cursor-pointer"
            />
            <span>Include Special Symbols (!@#$)</span>
          </label>
        </div>

      </div>

      {bulkPasswords.length > 0 && (
        <div className="mt-6 border-t border-slate-150 dark:border-slate-800/80 pt-5 space-y-3" id="bulk-passwords-list">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Generated Bulk Password List</span>
            <button
              onClick={() => handleCopy(bulkPasswords.join('\n'))}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
            >
              Copy All Passwords
            </button>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/10 border border-slate-150 dark:border-slate-850 rounded-xl p-4 divide-y divide-slate-150 dark:divide-slate-850/80">
            {bulkPasswords.map((bp, index) => (
              <div key={index} className="py-2 flex justify-between items-center hover:bg-slate-100/30 dark:hover:bg-slate-900/20 px-1 font-mono text-xs select-all">
                <span className="text-slate-900 dark:text-slate-200">{bp}</span>
                <button
                  onClick={() => handleCopy(bp)}
                  className="p-1 text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer"
                  title="Copy password"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
