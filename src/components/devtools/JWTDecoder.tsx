import { useState, useEffect } from 'react';
import { KeyRound, Shield, AlertTriangle, Check, Copy, RefreshCw, Layers } from 'lucide-react';
import ShareResults from '../ShareResults';

interface DecodedToken {
  header: Record<string, any> | null;
  payload: Record<string, any> | null;
  signature: string;
  isExpired: boolean | null;
  expirationDate: Date | null;
  expiredDurationMsg: string | null;
  algorithm: string | null;
}

export default function JWTDecoder() {
  // Preset token for testing/instructions
  const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huLmRvZUB1dGlsaXR5aHViLmdsb2JhbCIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoyNTg2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  
  const [inputText, setInputText] = useState<string>(defaultToken);
  const [decayed, setDecayed] = useState<DecodedToken>({
    header: null,
    payload: null,
    signature: '',
    isExpired: null,
    expirationDate: null,
    expiredDurationMsg: null,
    algorithm: null
  });
  const [errorText, setErrorText] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Safe Base64URL decoder
  const decodeBase64Url = (str: string): string => {
    // Replace non-url compat segments
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    // Unicode decoder safety override
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  };

  const parseToken = () => {
    setErrorText(null);
    if (!inputText.trim()) {
      setDecayed({
        header: null,
        payload: null,
        signature: '',
        isExpired: null,
        expirationDate: null,
        expiredDurationMsg: null,
        algorithm: null
      });
      return;
    }

    const segments = inputText.trim().split('.');
    if (segments.length !== 3) {
      setErrorText('A valid JWT must contain exactly 3 dot-separated segments (Header, Payload, and Signature).');
      return;
    }

    try {
      // Decode Header Segment
      let headerObj = null;
      try {
        headerObj = JSON.parse(decodeBase64Url(segments[0]));
      } catch (e) {
        throw new Error('Failed to parse Header segment: Base64URL string decode error.');
      }

      // Decode Payload Segment
      let payloadObj = null;
      try {
        payloadObj = JSON.parse(decodeBase64Url(segments[1]));
      } catch (e) {
        throw new Error('Failed to parse Payload segment: Base64URL string decode error.');
      }

      // Expiry diagnostics checking
      let isExpired = null;
      let expirationDate = null;
      let expiredDurationMsg = null;

      if (payloadObj && typeof payloadObj.exp === 'number') {
        const expUnix = payloadObj.exp * 1000; // to MS
        expirationDate = new Date(expUnix);
        const diff = expUnix - Date.now();
        isExpired = diff < 0;

        const absDiffSecs = Math.abs(Math.floor(diff / 1000));
        const days = Math.floor(absDiffSecs / (3600 * 24));
        const hours = Math.floor((absDiffSecs % (3600 * 24)) / 3600);
        const mins = Math.floor((absDiffSecs % 3600) / 60);

        if (isExpired) {
          expiredDurationMsg = `Expired ${days > 0 ? days + 'd ' : ''}${hours}h ${mins}m ago`;
        } else {
          expiredDurationMsg = `Expires in ${days > 0 ? days + 'd ' : ''}${hours}h ${mins}m`;
        }
      }

      setDecayed({
        header: headerObj,
        payload: payloadObj,
        signature: segments[2],
        isExpired,
        expirationDate,
        expiredDurationMsg,
        algorithm: headerObj?.alg || 'Unknown'
      });

    } catch (err: any) {
      setErrorText(err?.message || 'Failed to decode token segments.');
    }
  };

  useEffect(() => {
    parseToken();
  }, [inputText]);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(type);
      setTimeout(() => setCopiedSection(null), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6" id="jwt-decoder-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Hand: Raw JWT Paste Box */}
        <div className="lg:col-span-5 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Encoded JWT Token Input</span>
            <button
              onClick={() => setInputText('')}
              className="p-1 px-2 text-xs font-bold text-rose-500 hover:bg-rose-500/5 hover:text-rose-600 rounded-lg transition-all"
              id="clear-jwt-input"
            >
              Clear
            </button>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-80 px-4 py-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all select-all outline-none resize-none"
            placeholder="Paste your JSON Web Token string here (typically starting with eyJ...)"
            id="jwt-input-textarea"
          />

          {errorText ? (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs px-3.5 py-3 rounded-xl font-mono leading-relaxed flex gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorText}</span>
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-150 dark:border-slate-850 text-xs text-slate-500 space-y-1.5 font-sans leading-relaxed">
              <div className="font-bold text-slate-700 dark:text-slate-350 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                <span>Format Composition breakdown:</span>
              </div>
              <div className="font-mono text-[11px] leading-relaxed">
                <span className="text-rose-500 font-bold">Header</span> (Algorithm & token metadata type).<br />
                <span className="text-blue-500 font-bold">Payload</span> (Decoded data claims: sub, exp, client metadata).<br />
                <span className="text-orange-500 font-bold">Signature</span> (Verification hash footprint parity check).
              </div>
            </div>
          )}
        </div>

        {/* Right Hand: Structured Decoded segment details, with countdown expiration indicators */}
        <div className="lg:col-span-7 flex flex-col bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Decoded Token Payload</span>

          {decayed.payload ? (
            <div className="space-y-4">
              
              {/* Expiry diagnostic status banner */}
              {decayed.expirationDate && (
                <div className={`p-4 rounded-xl border flex items-center justify-between text-xs flex-wrap gap-3 ${
                  decayed.isExpired 
                    ? 'bg-rose-500/15 border-rose-500/20 text-rose-600 dark:text-rose-400' 
                    : 'bg-emerald-500/15 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                }`}>
                  <div>
                    <span className="font-bold block uppercase tracking-wide text-[10px]">Token Active Status</span>
                    <span className="font-semibold block mt-0.5 leading-relaxed">
                      {decayed.isExpired ? 'Token Expired Compliance Check' : 'Token Active and Valid'}
                    </span>
                    <span className="text-[10px] text-slate-500 block leading-tight font-medium mt-0.5">
                      Expiry epoch timestamp date: {decayed.expirationDate.toLocaleString()}
                    </span>
                  </div>

                  <span className="font-mono font-bold px-3 py-1 bg-slate-950/10 dark:bg-slate-950/40 rounded-lg text-xs leading-none">
                    {decayed.expiredDurationMsg}
                  </span>
                </div>
              )}

              {/* Decoded Header view card */}
              <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-rose-500/20 shadow-sm space-y-2">
                <div className="flex justify-between items-center pb-1 border-b border-rose-500/10">
                  <span className="text-[10px] uppercase font-bold text-rose-500">Header: Token Metadata</span>
                  <button
                    onClick={() => handleCopy(JSON.stringify(decayed.header, null, 2), 'header')}
                    className="text-[10px] text-slate-400 hover:text-emerald-500 flex items-center gap-1"
                    id="btn-copy-jwt-header"
                  >
                    {copiedSection === 'header' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'header' ? 'Copied' : 'Copy Header'}</span>
                  </button>
                </div>
                <pre className="font-mono text-xs text-rose-650 dark:text-rose-400 leading-relaxed overflow-x-auto whitespace-pre p-2 rounded bg-rose-500/5">
                  {JSON.stringify(decayed.header, null, 2)}
                </pre>
              </div>

              {/* Decoded Payload card */}
              <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-blue-500/20 shadow-sm space-y-2">
                <div className="flex justify-between items-center pb-1 border-b border-blue-500/10">
                  <span className="text-[10px] uppercase font-bold text-blue-500">Payload: Claims / Claims Data</span>
                  <button
                    onClick={() => handleCopy(JSON.stringify(decayed.payload, null, 2), 'payload')}
                    className="text-[10px] text-slate-400 hover:text-emerald-500 flex items-center gap-1"
                    id="btn-copy-jwt-payload"
                  >
                    {copiedSection === 'payload' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'payload' ? 'Copied' : 'Copy Payload'}</span>
                  </button>
                </div>
                <pre className="font-mono text-xs text-blue-650 dark:text-blue-450 leading-relaxed overflow-x-auto whitespace-pre p-2 rounded bg-blue-500/5">
                  {JSON.stringify(decayed.payload, null, 2)}
                </pre>
              </div>

              {/* Decoded Signature indicators info */}
              <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-orange-500/10 shadow-sm space-y-2">
                <span className="text-[10px] uppercase font-bold text-orange-500 block">Signature: Cryptographic parity key</span>
                <div className="font-mono text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 bg-orange-500/5 p-2 rounded break-all select-all">
                  {decayed.signature || '-'}
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-10 text-center space-y-3">
              <KeyRound className="w-12 h-12 stroke-1 text-slate-400/50 animate-pulse" />
              <div className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                Insert a valid JSON Web Token string payload on the left input area to parse claims parameters.
              </div>
            </div>
          )}
        </div>

      </div>

      {decayed.payload && (
        <ShareResults
          toolId="jwt-decoder"
          toolName="JWT Token Decoder"
          textToCopy={`JWT Algorithm: ${decayed.algorithm}. Decoded Claims content: ${JSON.stringify(decayed.payload).substring(0, 300)}`}
          shareUrlParams={{}}
          mainMetric={{
            label: 'Claim Auth Algorithm',
            value: decayed.algorithm || 'Unknown',
            subLabel: 'Signing algorithm method',
            color: 'emerald'
          }}
          additionalMetrics={[
            { label: 'Token Expiration status', value: decayed.isExpired ? 'Expired' : 'Active and Valid' },
            { label: 'Expiry Date Epoch', value: decayed.expirationDate ? decayed.expirationDate.toLocaleString() : 'No exp claim' },
            { label: 'Claim parameters count', value: `${Object.keys(decayed.payload).length} keys` },
            { label: 'Token string segments', value: '3 Dot separated (JWT)' }
          ]}
        />
      )}
    </div>
  );
}
