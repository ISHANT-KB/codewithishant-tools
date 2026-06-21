import { Link } from '../lib/router';
import { Zap, Heart, Shield, FileText, Globe, Info } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-150 dark:border-slate-900 pt-16 pb-12 transition-colors" id="global-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Upper Column blocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2 group" id="footer-logo">
              <div className="p-1.5 bg-emerald-500 rounded-lg text-slate-950">
                <Zap className="w-4.5 h-4.5 fill-current" />
              </div>
              <span className="font-sans font-black text-sm tracking-tight text-slate-850 dark:text-white">
                UtilityHub Suite
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Free, modern, cryptographically secure offline-capable utility calculators, formatting units converters, developer code sanitizers, text counts metrics, and sitemap SEO schemas.
            </p>
            <div className="flex gap-4 pt-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                <span>100% Secure Sandbox</span>
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                <span>Runs Offline</span>
              </span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Calculators</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/tools/age-calculator" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Age Calculator</Link></li>
              <li><Link href="/tools/bmi-calculator" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">BMI Calculator</Link></li>
              <li><Link href="/tools/percentage-calculator" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Percentage Calc</Link></li>
              <li><Link href="/tools/loan-emi-calculator" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">EMI Loan Calculator</Link></li>
              <li><Link href="/tools/scientific-calculator" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Scientific Math</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Converters</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/tools/length-converter" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Length Converter</Link></li>
              <li><Link href="/tools/temperature-converter" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Temperature Unit</Link></li>
              <li><Link href="/tools/data-storage-converter" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Data Sizes (1024)</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Dev & SEO Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/tools/password-generator" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Secure Password</Link></li>
              <li><Link href="/tools/base64-encoder-decoder" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Base64 Encoder</Link></li>
              <li><Link href="/tools/word-counter" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Word Frequency Counter</Link></li>
              <li><Link href="/tools/meta-tag-generator" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">HTML Meta Generator</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Guides Base</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/blog" className="text-emerald-500 hover:underline font-bold transition-colors">Knowledge Hub Index</Link></li>
              <li><Link href="/blog/how-to-calculate-bmi" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">WHO BMI Standard</Link></li>
              <li><Link href="/blog/best-age-calculator-guide" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Gregorian Leap Math</Link></li>
              <li><Link href="/blog/percentage-calculator-explained" className="text-slate-600 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors">Master percentages</Link></li>
              <li><Link href="/seo-report" className="text-indigo-500 hover:underline font-semibold transition-colors">SEO Performance Audit</Link></li>
            </ul>
          </div>

        </div>

        {/* monetization, Analytics and GSC declaration blocks */}
        <div className="border-t border-slate-150 dark:border-slate-900 pt-8 xl:flex items-center justify-between gap-4 space-y-4 xl:space-y-0 text-center xl:text-left">
          
          <div className="flex flex-col max-w-xl">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-1 flex items-center justify-center xl:justify-start gap-1">
              <Info className="w-3.5 h-3.5 text-blue-400" />
              SOCIALLY COMPLIANT PLATFORM METRICS
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              This portal incorporates placeholders for <strong>Google AdSense</strong> slots, <strong>Google Search Console</strong> tracking, and <strong>Microsoft Clarity</strong> recording. Zero browser data is sold or stored. Analytics logs strictly measure screen performance and Lighthouse speeds.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 select-none">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse" />
            <span>for optimal user performance</span>
          </div>

        </div>

        {/* Bottom copyright declaration */}
        <div className="border-t border-slate-100 dark:border-slate-900/40 pt-6 text-center text-[11px] text-slate-400 dark:text-slate-500">
          <span>&copy; {new Date().getFullYear()} UtilityHub Suite. Built in complete compliance with React 19 standards. All rights reserved globally.</span>
        </div>

      </div>
    </footer>
  );
}
