import { useState, useRef } from 'react';
import { Copy, Download, Share2, Check, Link2, Image, Sparkles } from 'lucide-react';
import { addUsageHistory } from '../lib/user-store';

interface MetricDetail {
  label: string;
  value: string;
}

interface ShareResultsProps {
  toolId: string;
  toolName: string;
  textToCopy: string;
  shareUrlParams: Record<string, string | number>;
  mainMetric: {
    label: string;
    value: string;
    subLabel?: string;
    color?: 'emerald' | 'blue' | 'rose' | 'amber' | 'indigo' | 'purple';
  };
  additionalMetrics: MetricDetail[];
}

export default function ShareResults({
  toolId,
  toolName,
  textToCopy,
  shareUrlParams,
  mainMetric,
  additionalMetrics
}: ShareResultsProps) {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate the full Shareable Link
  const getShareUrl = () => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    
    // Ensure the tool id is present to return to this specific tool
    const queryParams = new URLSearchParams();
    
    // Convert all params to strings and append
    Object.entries(shareUrlParams).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        queryParams.set(key, String(val));
      }
    });

    return `${origin}${pathname}?${queryParams.toString()}`;
  };

  const handleCopyText = async () => {
    try {
      const summary = `${toolName} Results:\n${textToCopy}\n\nCalculate yours at: ${getShareUrl()}`;
      await navigator.clipboard.writeText(summary);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
      
      // Log operation event in history
      addUsageHistory(toolId, `Copied Results: ${mainMetric.label} = ${mainMetric.value}`);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleShareLink = async () => {
    const url = getShareUrl();
    
    // Log operation event in history
    addUsageHistory(toolId, `Shared Calculation: ${mainMetric.label} = ${mainMetric.value}`);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${toolName} Results | UtilityHub`,
          text: `Check out my ${toolName} calculations!`,
          url: url
        });
      } catch (err) {
        // Fallback to clipboard if share gets cancelled or fails
        copyUrlFallback(url);
      }
    } else {
      copyUrlFallback(url);
    }
  };

  const copyUrlFallback = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.error('Failed to copy link', e);
    }
  };

  const handleDownloadPNG = () => {
    setIsGenerating(true);
    
    // Log operation event in history
    addUsageHistory(toolId, `Exported PNG report card: ${mainMetric.label} = ${mainMetric.value}`);

    const canvas = canvasRef.current;
    if (!canvas) {
      setIsGenerating(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsGenerating(false);
      return;
    }

    // Set precise canvas dimensions for a beautiful card ratio (640x440)
    canvas.width = 640;
    canvas.height = 440;

    // Draw dark background gradient (Space Dark theme)
    const gradient = ctx.createLinearGradient(0, 0, 640, 440);
    gradient.addColorStop(0, '#0B1329'); // slate night
    gradient.addColorStop(0.5, '#0F172A'); // deep charcoal
    gradient.addColorStop(1, '#020617'); // cosmic black
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 640, 440);

    // Draw glowing tech decoration rings
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(640, 0, 200, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(59, 130, 246, 0.04)';
    ctx.beginPath();
    ctx.arc(0, 440, 250, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw aesthetic card border
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 620, 420);

    // Logo / branding line
    ctx.fillStyle = '#10B981'; // Emerald font
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('UtilityHub', 35, 45);

    ctx.fillStyle = '#94A3B8'; // Muted grey
    ctx.font = 'normal 13px sans-serif';
    ctx.fillText('•   Professional Analytics Card', 130, 45);

    // Draw a divider line
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(35, 65);
    ctx.lineTo(605, 65);
    ctx.stroke();

    // Card Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(toolName, 35, 110);

    // Draw main stats container
    // Determine color theme bases
    let metricColor = '#10B981'; // default emerald
    let metricBg = 'rgba(16, 185, 129, 0.08)';
    let metricBorder = 'rgba(16, 185, 129, 0.2)';

    if (mainMetric.color === 'blue') {
      metricColor = '#3B82F6';
      metricBg = 'rgba(59, 130, 246, 0.08)';
      metricBorder = 'rgba(59, 130, 246, 0.2)';
    } else if (mainMetric.color === 'rose') {
      metricColor = '#F43F5E';
      metricBg = 'rgba(244, 63, 94, 0.08)';
      metricBorder = 'rgba(244, 63, 94, 0.2)';
    } else if (mainMetric.color === 'amber') {
      metricColor = '#F59E0B';
      metricBg = 'rgba(245, 158, 11, 0.08)';
      metricBorder = 'rgba(245, 158, 11, 0.2)';
    } else if (mainMetric.color === 'purple') {
      metricColor = '#A855F7';
      metricBg = 'rgba(168, 85, 247, 0.08)';
      metricBorder = 'rgba(168, 85, 247, 0.2)';
    } else if (mainMetric.color === 'indigo') {
      metricColor = '#6366F1';
      metricBg = 'rgba(99, 102, 241, 0.08)';
      metricBorder = 'rgba(99, 102, 241, 0.2)';
    }

    // Main highlight box
    ctx.fillStyle = metricBg;
    
    // Draw rounded rect manually or via CanvasPath.roundRect if supported
    // Clean cross-platform rounded rect
    const drawRoundedRect = (cvCtx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
      cvCtx.beginPath();
      cvCtx.moveTo(x + radius, y);
      cvCtx.lineTo(x + width - radius, y);
      cvCtx.quadraticCurveTo(x + width, y, x + width, y + radius);
      cvCtx.lineTo(x + width, y + height - radius);
      cvCtx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      cvCtx.lineTo(x + radius, y + height);
      cvCtx.quadraticCurveTo(x, y + height, x, y + height - radius);
      cvCtx.lineTo(x, y + radius);
      cvCtx.quadraticCurveTo(x, y, x + radius, y);
      cvCtx.closePath();
    };

    drawRoundedRect(ctx, 35, 140, 240, 150, 16);
    ctx.fill();
    ctx.strokeStyle = metricBorder;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inside main stats box
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(mainMetric.label.toUpperCase(), 55, 175);

    ctx.fillStyle = metricColor;
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(mainMetric.value, 55, 230);

    if (mainMetric.subLabel) {
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 13px sans-serif';
      // Word wrap safety
      const sub = mainMetric.subLabel.length > 22 ? mainMetric.subLabel.slice(0, 20) + '...' : mainMetric.subLabel;
      ctx.fillText(sub, 55, 265);
    }

    // Additional breakdown metrics column
    let startY = 155;
    additionalMetrics.slice(0, 4).forEach((metric) => {
      // Small horizontal bubble card for each item
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      drawRoundedRect(ctx, 295, startY - 18, 310, 36, 8);
      ctx.fill();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
      ctx.stroke();

      // Draw metric line indicator dot
      ctx.fillStyle = metricColor;
      ctx.beginPath();
      ctx.arc(310, startY, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Draw Key
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'normal 12px sans-serif';
      const labelShort = metric.label.length > 25 ? metric.label.slice(0, 23) + '..' : metric.label;
      ctx.fillText(labelShort, 324, startY + 4);

      // Draw val
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(metric.value, 590, startY + 4);
      ctx.textAlign = 'left'; // Reset

      startY += 44;
    });

    // Draw Footer reference
    ctx.fillStyle = 'rgba(148, 163, 184, 0.08)';
    ctx.fillRect(10, 370, 620, 60);

    ctx.fillStyle = '#64748B';
    ctx.font = 'normal 11px sans-serif';
    ctx.fillText('Calculate and track your metrics instant using free global utility systems:', 35, 395);

    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 11px sans-serif';
    const cleanUrl = getShareUrl().replace(/(^\w+:|^)\/\//, '').substring(0, 60) + (getShareUrl().length > 60 ? '...' : '');
    ctx.fillText(cleanUrl, 35, 413);

    // Download flow
    setTimeout(() => {
      try {
        const link = document.createElement('a');
        link.download = `${toolId}-results-${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Error rendering image download', err);
      } finally {
        setIsGenerating(false);
      }
    }, 500);
  };

  return (
    <div 
      className="bg-slate-50/50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-800 rounded-2xl p-5 mt-6 space-y-4"
      id={`share-panel-${toolId}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Share & Export Results
          </h3>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-150/50 dark:bg-slate-850 px-2 py-0.5 rounded-full font-semibold">
          Organic growth engine
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Copy Result */}
        <button
          onClick={handleCopyText}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
            copiedText 
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400' 
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
          }`}
          title="Copy formatted text results to clipboard"
          id="btn-copy-result"
        >
          {copiedText ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Result Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Result</span>
            </>
          )}
        </button>

        {/* Share Link */}
        <button
          onClick={handleShareLink}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
            copiedLink 
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400' 
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
          }`}
          title="Share custom link with preloaded query arguments"
          id="btn-share-link"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5" />
              <span>Share Link</span>
            </>
          )}
        </button>

        {/* Download PNG */}
        <button
          onClick={handleDownloadPNG}
          disabled={isGenerating}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all bg-emerald-500 hover:bg-emerald-600 text-slate-950 border-emerald-500 hover:opacity-90 disabled:opacity-50`}
          title="Render premium vector summary card image"
          id="btn-download-png"
        >
          {isGenerating ? (
            <>
              <span className="animate-spin w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Download PNG</span>
            </>
          )}
        </button>
      </div>

      {/* Hidden high-res canvas utilized for offline graphics rendering */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
