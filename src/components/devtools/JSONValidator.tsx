import { useState, useEffect } from 'react';
import { FileCode, CheckCircle2, AlertCircle, Copy, Check, Sparkles, RefreshCcw, HelpCircle } from 'lucide-react';
import ShareResults from '../ShareResults';

export default function JSONValidator() {
  const [inputVal, setInputVal] = useState<string>('{\n  "status": "active",\n  "database": "postgresql"\n  "replicas": 4 // missing comma here to demonstrate validation!\n}');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorDetails, setErrorDetails] = useState<{
    message: string;
    line?: number;
    column?: number;
    suggestion?: string;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const checkValidation = (val: string) => {
    if (!val.trim()) {
      setIsValid(null);
      setErrorDetails(null);
      return;
    }

    try {
      JSON.parse(val);
      setIsValid(true);
      setErrorDetails(null);
    } catch (err: any) {
      setIsValid(false);
      const errorMsg = err?.message || 'Syntax Error';
      
      // Parse Line & Column numbers from typical Chrome/V8 error messages:
      // "Unexpected string in JSON at position 52"
      // "Expected ',' or '}' after property value in JSON at position 45 (line 4 column 2)"
      
      let line: number | undefined;
      let column: number | undefined;
      let suggestion = '';

      // Check for common error properties
      const lineMatch = errorMsg.match(/line (\d+)/i);
      const colMatch = errorMsg.match(/column (\d+)/i);
      if (lineMatch) line = parseInt(lineMatch[1], 10);
      if (colMatch) column = parseInt(colMatch[1], 10);

      // Try estimating line/col based on character count indexing if position is given
      const positionMatch = errorMsg.match(/position (\d+)/i);
      if (positionMatch && !line) {
        const position = parseInt(positionMatch[1], 10);
        const linesBefore = val.substring(0, position).split('\n');
        line = linesBefore.length;
        column = linesBefore[linesBefore.length - 1].length + 1;
      }

      // Contextual help suggestions
      if (errorMsg.includes('Unexpected token')) {
        suggestion = 'Check for trailing commas or double quotes instead of single quotes.';
      } else if (errorMsg.includes('Unexpected string')) {
        suggestion = 'You might be missing a comma separating objects or properties.';
      } else if (errorMsg.includes('Unexpected end of JSON')) {
        suggestion = 'Ensure all brackets { } and square brackets [ ] are balanced and properly closed.';
      } else if (errorMsg.includes('Expected property name')) {
        suggestion = 'Keys in JSON must have double quotes. Single quotes or bare keys are invalid.';
      } else {
        suggestion = 'Verify syntax, spelling, and character quoting styles.';
      }

      setErrorDetails({
        message: errorMsg,
        line,
        column,
        suggestion
      });
    }
  };

  const handleValidate = () => {
    checkValidation(inputVal);
  };

  const loadExample = (type: 'valid' | 'invalid-comma' | 'invalid-quotes') => {
    if (type === 'valid') {
      setInputVal('{\n  "service": "billing-api",\n  "port": 8080,\n  "settings": {\n    "secure": true,\n    "sslProtocol": "TLSv1.3"\n  },\n  "flags": ["prod", "primary"]\n}');
      setIsValid(null);
      setErrorDetails(null);
    } else if (type === 'invalid-comma') {
      setInputVal('{\n  "name": "gateway-balancer"\n  "ip": "10.0.4.12",\n  "status": "online"\n}');
      setIsValid(null);
      setErrorDetails(null);
    } else if (type === 'invalid-quotes') {
      setInputVal('{\n  \'authMethod\': "OAuth2",\n  "durationSec": 3600\n}');
      setIsValid(null);
      setErrorDetails(null);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inputVal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Run on mount once
  useEffect(() => {
    if (inputVal) {
      checkValidation(inputVal);
    }
  }, []);

  return (
    <div className="space-y-6" id="json-validator-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Textarea Workspace */}
        <div className="lg:col-span-8 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">JSON Diagnostics Deck</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-1 px-2.5 rounded-lg border text-[11px] hover:bg-slate-50 border-slate-150 text-slate-600 dark:text-slate-350 dark:border-slate-800 dark:hover:bg-slate-850 flex items-center gap-1 cursor-pointer transition-all"
                id="btn-copy-validator-raw"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={() => setInputVal('')}
                className="p-1 px-2 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-500/5 hover:text-rose-600 rounded-md transition-all cursor-pointer"
                id="btn-clear-validator"
              >
                Clear
              </button>
            </div>
          </div>

          <textarea
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setIsValid(null); // Reset flag on edit for live interaction feel
            }}
            className="w-full h-80 px-4 py-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-850 dark:text-slate-100 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
            placeholder="Paste your JSON output string to diagnose syntax problems..."
            id="validator-textarea"
          />

          <div className="flex flex-wrap gap-2 items-center justify-between pt-1">
            {/* Quick Test Presets */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-400">Presets:</span>
              <button
                onClick={() => loadExample('valid')}
                className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 max-sm:text-[10px] dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100/50 rounded-lg cursor-pointer transition-all"
                id="preset-valid"
              >
                Valid Schema
              </button>
              <button
                onClick={() => loadExample('invalid-comma')}
                className="px-2.5 py-1 text-xs font-semibold bg-rose-50 max-sm:text-[10px] dark:bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100/50 rounded-lg cursor-pointer transition-all"
                id="preset-invalid-comma"
              >
                Missing Comma
              </button>
              <button
                onClick={() => loadExample('invalid-quotes')}
                className="px-2.5 py-1 text-xs font-semibold bg-rose-50 max-sm:text-[10px] dark:bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100/50 rounded-lg cursor-pointer transition-all"
                id="preset-invalid-quotes"
              >
                Single Quotes
              </button>
            </div>

            <button
              onClick={handleValidate}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 hover:opacity-95 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-500/10"
              id="validate-action-button"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Validate JSON</span>
            </button>
          </div>
        </div>

        {/* Right Side: Compliance Results Console */}
        <div className="lg:col-span-4 flex flex-col bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Validation Console</span>

          {isValid === null ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <HelpCircle className="w-10 h-10 stroke-1 text-slate-400/50 animate-pulse" />
              <div className="text-xs text-slate-500 select-none">
                Click <strong>Validate JSON</strong> to evaluate syntax and review formatting analysis rules.
              </div>
            </div>
          ) : isValid ? (
            <div className="flex-1 space-y-4 justify-center flex flex-col">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Syntax is 100% Valid!</h4>
                <p className="text-[11px] text-slate-500 mt-1">Ready for serialization or configuration deployment environments.</p>
              </div>

              <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-205 dark:border-slate-850 space-y-2.5 text-xs">
                <div className="flex justify-between border-b pb-1.5 border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Total Size:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-200">{new Blob([inputVal]).size} bytes</span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Lines Count:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-200">{inputVal.split('\n').length} lines</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Characters:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-200">{inputVal.length} chars</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 space-y-4 flex flex-col justify-between">
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
                <div className="flex gap-2 text-rose-500 items-start mb-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wide">Validation Error</h4>
                    <p className="text-[11px] text-rose-400/90 leading-relaxed font-mono mt-1 break-words">{errorDetails?.message}</p>
                  </div>
                </div>

                {errorDetails?.line && (
                  <div className="mt-3 bg-rose-500/5 border border-rose-500/10 rounded-lg p-2.5 font-mono text-[11px] text-slate-600 dark:text-slate-350">
                    <span className="font-bold text-rose-500">Location:</span> Line {errorDetails.line}
                    {errorDetails.column && `, Column ${errorDetails.column}`}
                  </div>
                )}
              </div>

              {errorDetails?.suggestion && (
                <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-850 space-y-2 text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <RefreshCcw className="w-3.5 h-3.5 text-blue-500" />
                    <span>How to Resolve:</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{errorDetails.suggestion}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isValid !== null && (
        <ShareResults
          toolId="json-validator"
          toolName="JSON Syntax Validator"
          textToCopy={`JSON validation check - status is ${isValid ? 'Valid' : 'Invalid'}. Raw payload size: ${inputVal.length} chars.`}
          shareUrlParams={{}}
          mainMetric={{
            label: 'Diagnose Accuracy',
            value: isValid ? 'SUCCESS' : 'FAILED',
            subLabel: isValid ? 'Approved syntax structure' : 'Syntax conflicts spotted',
            color: isValid ? 'emerald' : 'rose'
          }}
          additionalMetrics={[
            { label: 'Evaluation Conformity', value: isValid ? 'Approved' : 'Correction Needed' },
            { label: 'Diagnostic Line Count', value: `${inputVal.split('\n').length} lines` },
            { label: 'Spotted Location', value: errorDetails?.line ? `Row ${errorDetails.line}` : 'N/A' },
            { label: 'Character Count size', value: `${inputVal.length} bytes` }
          ]}
        />
      )}
    </div>
  );
}
