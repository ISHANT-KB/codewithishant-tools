import { useState, useEffect } from 'react';
import { Palette, Copy, Check, Eye, HelpCircle, Grid, Layers, Sparkles } from 'lucide-react';
import ShareResults from '../ShareResults';

export default function ColorConverter() {
  const [hex, setHex] = useState<string>('#10b981');
  const [rgb, setRgb] = useState<{ r: number; g: number; b: number }>({ r: 16, g: 185, b: 129 });
  const [hsl, setHsl] = useState<{ h: number; s: number; l: number }>({ h: 159, s: 84, l: 44 });
  const [cmyk, setCmyk] = useState<{ c: number; m: number; y: number; k: number }>({ c: 91, m: 0, y: 30, k: 27 });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Hex to RGB
  const hexToRgb = (hexStr: string) => {
    let cleanHex = hexStr.replace(/^#/, '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(x => x + x).join('');
    }
    if (cleanHex.length !== 6) return null;
    const num = parseInt(cleanHex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  };

  // RGB to Hex
  const rgbToHex = (r: number, g: number, b: number) => {
    const toHexVal = (val: number) => {
      const hexVal = Math.max(0, Math.min(255, val)).toString(16);
      return hexVal.length === 1 ? '0' + hexVal : hexVal;
    };
    return `#${toHexVal(r)}${toHexVal(g)}${toHexVal(b)}`;
  };

  // RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r = l;
    let g = l;
    let b = l;

    if (s !== 0) {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  // RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const k = 1 - Math.max(r, g, b);
    if (k === 1) {
      return { c: 0, m: 0, y: 0, k: 100 };
    }
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  // CMYK to RGB
  const cmykToRgb = (c: number, m: number, y: number, k: number) => {
    c /= 100;
    m /= 100;
    y /= 100;
    k /= 100;
    return {
      r: Math.round(255 * (1 - c) * (1 - k)),
      g: Math.round(255 * (1 - m) * (1 - k)),
      b: Math.round(255 * (1 - y) * (1 - k))
    };
  };

  // Update logic on Hex update
  const handleHexChange = (newHex: string) => {
    setHex(newHex);
    const parsedRgb = hexToRgb(newHex);
    if (parsedRgb) {
      setRgb(parsedRgb);
      setHsl(rgbToHsl(parsedRgb.r, parsedRgb.g, parsedRgb.b));
      setCmyk(rgbToCmyk(parsedRgb.r, parsedRgb.g, parsedRgb.b));
    }
  };

  // Update on RGB sliders update
  const handleRgbChange = (updates: Partial<{ r: number; g: number; b: number }>) => {
    const updatedRgb = { ...rgb, ...updates };
    setRgb(updatedRgb);
    const compiledHex = rgbToHex(updatedRgb.r, updatedRgb.g, updatedRgb.b);
    setHex(compiledHex);
    setHsl(rgbToHsl(updatedRgb.r, updatedRgb.g, updatedRgb.b));
    setCmyk(rgbToCmyk(updatedRgb.r, updatedRgb.g, updatedRgb.b));
  };

  // Update on HSL sliders
  const handleHslChange = (updates: Partial<{ h: number; s: number; l: number }>) => {
    const updatedHsl = { ...hsl, ...updates };
    setHsl(updatedHsl);
    const parsedRgb = hslToRgb(updatedHsl.h, updatedHsl.s, updatedHsl.l);
    setRgb(parsedRgb);
    setHex(rgbToHex(parsedRgb.r, parsedRgb.g, parsedRgb.b));
    setCmyk(rgbToCmyk(parsedRgb.r, parsedRgb.g, parsedRgb.b));
  };

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  // WCAG contrast calculation (Luminance)
  const getRelativeLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const getContrastRatio = (lum1: number, lum2: number) => {
    const l1 = Math.max(lum1, lum2);
    const l2 = Math.min(lum1, lum2);
    return (l1 + 0.05) / (l2 + 0.05);
  };

  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  const whiteLuminance = 1.0;
  const blackLuminance = 0.0;
  
  const contrastWithWhite = getContrastRatio(luminance, whiteLuminance);
  const contrastWithBlack = getContrastRatio(luminance, blackLuminance);

  // Generate beautiful variations (Tints & Shades)
  const generateVariations = () => {
    const shades = [];
    const tints = [];
    
    // Generate shades (darker)
    for (let factor = 0.2; factor <= 0.8; factor += 0.2) {
      const sR = Math.round(rgb.r * (1 - factor));
      const sG = Math.round(rgb.g * (1 - factor));
      const sB = Math.round(rgb.b * (1 - factor));
      shades.push(rgbToHex(sR, sG, sB));
    }
    
    // Generate tints (lighter)
    for (let factor = 0.2; factor <= 0.8; factor += 0.2) {
      const tR = Math.round(rgb.r + (255 - rgb.r) * factor);
      const tG = Math.round(rgb.g + (255 - rgb.g) * factor);
      const tB = Math.round(rgb.b + (255 - rgb.b) * factor);
      tints.push(rgbToHex(tR, tG, tB));
    }

    return { shades, tints };
  };

  const { shades, tints } = generateVariations();

  return (
    <div className="space-y-6" id="color-converter-container">
      {/* Prime dual workspace section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Color Picker View Circle & Input sliders */}
        <div className="lg:col-span-7 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Interactive Palette Slate</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono bg-slate-50 dark:bg-slate-950 px-2.5 py-1 rounded-lg">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hex }} />
              <span>{hex.toUpperCase()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Color presentation block and input color eyedropper */}
            <div className="md:col-span-4 flex flex-col items-center justify-center space-y-3">
              <div
                className="w-28 h-28 rounded-2xl shadow-inner border border-slate-200/50 dark:border-slate-850 flex items-center justify-center text-xs font-bold font-mono text-center select-none cursor-pointer transition-all hover:scale-103 duration-200 relative group"
                style={{ backgroundColor: hex }}
                title="Click eye-dropper picker to select color"
              >
                {/* Overlay picker indicator */}
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="bg-slate-950/70 text-white dark:text-slate-100 rounded-lg px-2 py-1 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                  Open Picker
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-sans tracking-tight text-center">Click block representation to trigger OS pick.</span>
            </div>

            {/* Main sliders controllers */}
            <div className="md:col-span-8 space-y-4 font-sans text-xs">
              
              {/* RGB Slider components stack */}
              <div className="space-y-2 pb-3 border-b border-dashed border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">RGB Color Channels (0-255)</span>
                
                {/* Red channel slider */}
                <div className="flex gap-2.5 items-center justify-between">
                  <span className="w-8 font-semibold text-rose-500 font-mono">Red:</span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    value={rgb.r}
                    onChange={(e) => handleRgbChange({ r: parseInt(e.target.value) || 0 })}
                    className="flex-1 accent-rose-500 h-1.5 bg-slate-100 rounded-lg"
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) => handleRgbChange({ r: Math.min(255, Math.max(0, parseInt(e.target.value) || 0)) })}
                    className="w-12 py-0.5 px-1 bg-slate-50 dark:bg-slate-950 text-center font-mono border rounded-lg focus:outline-none"
                  />
                </div>

                {/* Green channel slider */}
                <div className="flex gap-2.5 items-center justify-between">
                  <span className="w-8 font-semibold text-emerald-500 font-mono">Green:</span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    value={rgb.g}
                    onChange={(e) => handleRgbChange({ g: parseInt(e.target.value) || 0 })}
                    className="flex-1 accent-emerald-500 h-1.5 bg-slate-100 rounded-lg"
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) => handleRgbChange({ g: Math.min(255, Math.max(0, parseInt(e.target.value) || 0)) })}
                    className="w-12 py-0.5 px-1 bg-slate-50 dark:bg-slate-950 text-center font-mono border rounded-lg focus:outline-none"
                  />
                </div>

                {/* Blue channel slider */}
                <div className="flex gap-2.5 items-center justify-between">
                  <span className="w-8 font-semibold text-blue-500 font-mono">Blue:</span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    value={rgb.b}
                    onChange={(e) => handleRgbChange({ b: parseInt(e.target.value) || 0 })}
                    className="flex-1 accent-blue-500 h-1.5 bg-slate-100 rounded-lg"
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) => handleRgbChange({ b: Math.min(255, Math.max(0, parseInt(e.target.value) || 0)) })}
                    className="w-12 py-0.5 px-1 bg-slate-50 dark:bg-slate-950 text-center font-mono border rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              {/* HSL Sliders stack */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">HSL Spectrum Tuning</span>
                
                {/* Hue slider */}
                <div className="flex gap-2.5 items-center justify-between">
                  <span className="w-8 font-semibold text-slate-500 font-mono">Hue:</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={hsl.h}
                    onChange={(e) => handleHslChange({ h: parseInt(e.target.value) || 0 })}
                    className="flex-1 accent-emerald-500 h-1.5 bg-slate-100 rounded-lg"
                  />
                  <span className="w-12 text-center font-mono text-[10px] bg-slate-50 dark:bg-slate-950 border py-0.5 rounded-lg select-none">{hsl.h}°</span>
                </div>

                {/* Saturation slider */}
                <div className="flex gap-2.5 items-center justify-between">
                  <span className="w-8 font-semibold text-slate-500 font-mono">Sat:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={hsl.s}
                    onChange={(e) => handleHslChange({ s: parseInt(e.target.value) || 0 })}
                    className="flex-1 accent-emerald-500 h-1.5 bg-slate-100 rounded-lg"
                  />
                  <span className="w-12 text-center font-mono text-[10px] bg-slate-50 dark:bg-slate-950 border py-0.5 rounded-lg select-none">{hsl.s}%</span>
                </div>

                {/* Lightness slider */}
                <div className="flex gap-2.5 items-center justify-between">
                  <span className="w-8 font-semibold text-slate-500 font-mono">Light:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={hsl.l}
                    onChange={(e) => handleHslChange({ l: parseInt(e.target.value) || 0 })}
                    className="flex-1 accent-emerald-500 h-1.5 bg-slate-100 rounded-lg"
                  />
                  <span className="w-12 text-center font-mono text-[10px] bg-slate-50 dark:bg-slate-950 border py-0.5 rounded-lg select-none">{hsl.l}%</span>
                </div>
              </div>

            </div>
          </div>

          {/* WCAG Contrast Ratio Accessibility checker */}
          <div className="bg-slate-50/75 dark:bg-slate-950/40 p-4 border border-slate-150 dark:border-slate-850 rounded-xl space-y-3 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-blue-500" />
              <span>WCAG 2.1 Accessibility Contrast Checker</span>
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 border p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400">Contrast against White:</span>
                  <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-100 block">{contrastWithWhite.toFixed(2)} : 1</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 font-bold rounded ${
                  contrastWithWhite >= 4.5 ? 'bg-emerald-500/15 text-emerald-500' : contrastWithWhite >= 3.0 ? 'bg-amber-500/15 text-amber-500' : 'bg-rose-500/15 text-rose-500'
                }`}>
                  {contrastWithWhite >= 4.5 ? 'AAA Pass' : contrastWithWhite >= 3.0 ? 'AA Pass' : 'Low Contrast'}
                </span>
              </div>

              <div className="bg-white dark:bg-slate-900 border p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400">Contrast against Black:</span>
                  <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-100 block">{contrastWithBlack.toFixed(2)} : 1</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 font-bold rounded ${
                  contrastWithBlack >= 4.5 ? 'bg-emerald-500/15 text-emerald-500' : contrastWithBlack >= 3.0 ? 'bg-amber-500/15 text-amber-500' : 'bg-rose-500/15 text-rose-500'
                }`}>
                  {contrastWithBlack >= 4.5 ? 'AAA Pass' : contrastWithBlack >= 3.0 ? 'AA Pass' : 'Low Contrast'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Generated Formats and Shades Lists */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Format values list blocks */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block pb-1">Space Core Formats</span>

            {[
              { label: 'HEX Code Code', value: hex.toUpperCase(), key: 'hex' },
              { label: 'RGB Combination', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, key: 'rgb' },
              { label: 'HSL Layout structure', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, key: 'hsl' },
              { label: 'CMYK Core Percentages', value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, key: 'cmyk' }
            ].map((fItem) => (
              <div key={fItem.key} className="bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">{fItem.label}</span>
                  <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block">{fItem.value}</span>
                </div>

                <button
                  onClick={() => handleCopy(fItem.value, fItem.key)}
                  className={`p-1.5 px-2.5 rounded-lg border text-xs font-bold cursor-pointer transition-all flex items-center gap-1 ${
                    copiedKey === fItem.key
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 text-slate-600 hover:bg-slate-100 dark:text-slate-350 dark:border-slate-800 dark:hover:bg-slate-850'
                  }`}
                  id={`btn-copy-color-${fItem.key}`}
                >
                  {copiedKey === fItem.key ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === fItem.key ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Color variation palettes lists */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block pb-1">Tints & Shades Scaler</span>
            
            {/* Lighter spectrum */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Lighter Tints (+20% increments):</span>
              <div className="flex gap-1.5 font-mono text-[9px] text-center">
                {tints.map((tHex, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleHexChange(tHex)}
                    className="flex-1 py-4 border border-slate-150 dark:border-slate-850 rounded-lg cursor-pointer transition-transform hover:scale-105"
                    style={{ backgroundColor: tHex }}
                    title={`Apply ${tHex}`}
                  />
                ))}
              </div>
            </div>

            {/* Darker spectrum */}
            <div className="space-y-1.5 pt-2 border-t border-slate-150/50 dark:border-slate-850">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Darker Shades (-20% decrements):</span>
              <div className="flex gap-1.5 font-mono text-[9px] text-center">
                {shades.map((sHex, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleHexChange(sHex)}
                    className="flex-1 py-4 border border-slate-150 dark:border-slate-850 rounded-lg cursor-pointer transition-transform hover:scale-105"
                    style={{ backgroundColor: sHex }}
                    title={`Apply ${sHex}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      {hex && (
        <ShareResults
          toolId="color-converter"
          toolName="RGB HEX Color Converter"
          textToCopy={`HEX: ${hex.toUpperCase()}\nRGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})\nHSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
          shareUrlParams={{}}
          mainMetric={{
            label: 'Selected Hex',
            value: hex.toUpperCase(),
            subLabel: 'Hexadecimal layout',
            color: 'emerald'
          }}
          additionalMetrics={[
            { label: 'RGB Triplet Core', value: `${rgb.r}, ${rgb.g}, ${rgb.b}` },
            { label: 'HSL Angle Dimensions', value: `${hsl.h}°, ${hsl.s}%, ${hsl.l}%` },
            { label: 'CMYK Core Scales', value: `${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%` },
            { label: 'WCAG White Contrast', value: `${contrastWithWhite.toFixed(1)}:1` }
          ]}
        />
      )}
    </div>
  );
}
