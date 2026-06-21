import { ReactNode } from 'react';
import { Tool, FAQItem } from '../types';
import { tools } from '../data/tools';

export interface GeneratedGuide {
  introduction: ReactNode;
  howToUse: ReactNode;
  benefits: ReactNode;
  formula: ReactNode;
  examples: ReactNode;
  faqs: FAQItem[];
  relatedTitle: string;
  keywords: string[];
}

// Map specific tools to detailed formulas and calculations
export function getToolFormula(tool: Tool): ReactNode {
  const codeStyle = "px-1.5 py-0.5 font-mono text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded";
  const containerStyle = "p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-150 dark:border-slate-800/60 font-sans space-y-3";

  // Specific Overrides
  if (tool.id === 'simple-interest-calculator') {
    return (
      <div className={containerStyle}>
        <p className="font-semibold text-slate-900 dark:text-white">Flat Simple Interest Formula:</p>
        <div className="font-mono text-emerald-600 dark:text-emerald-400 p-3 bg-white dark:bg-slate-950 rounded-xl text-center border border-slate-100 dark:border-slate-900 font-bold text-lg">
          I = P × R × T / 100
        </div>
        <div className="text-xs text-slate-500 leading-relaxed">
          Where <span className={codeStyle}>I</span> is interest accrued, <span className={codeStyle}>P</span> is the starting Principal amount, <span className={codeStyle}>R</span> is the annual rate of interest, and <span className={codeStyle}>T</span> is the time duration in years.
        </div>
      </div>
    );
  }

  if (tool.id === 'compound-interest-calculator') {
    return (
      <div className={containerStyle}>
        <p className="font-semibold text-slate-900 dark:text-white">Compound Interest Equation:</p>
        <div className="font-mono text-emerald-600 dark:text-emerald-400 p-3 bg-white dark:bg-slate-950 rounded-xl text-center border border-slate-100 dark:border-slate-900 font-bold text-lg">
          A = P (1 + r/n)^(n·t)
        </div>
        <div className="text-xs text-slate-500 leading-relaxed">
          Where <span className={codeStyle}>A</span> is final amount, <span className={codeStyle}>P</span> is primary investment, <span className={codeStyle}>r</span> is nominal rate, <span className={codeStyle}>n</span> is compounding frequency (monthly = 12, quarterly = 4), and <span className={codeStyle}>t</span> is overall tenure in years.
        </div>
      </div>
    );
  }

  if (tool.id === 'discount-calculator') {
    return (
      <div className={containerStyle}>
        <p className="font-semibold text-slate-900 dark:text-white">Discount Percentage Formula:</p>
        <div className="font-mono text-emerald-600 dark:text-emerald-400 p-3 bg-white dark:bg-slate-950 rounded-xl text-center border border-slate-100 dark:border-slate-900 font-bold text-lg">
          Sale Price = Original Price × (1 - Discount / 100)
        </div>
        <div className="text-xs text-slate-500 leading-relaxed">
          The total savings is calculated as <span className={codeStyle}>Original Price − Sale Price</span>. This basic formula helps buyers verify markdown rates and final prices before purchase.
        </div>
      </div>
    );
  }

  if (tool.id === 'salary-calculator') {
    return (
      <div className={containerStyle}>
        <p className="font-semibold text-slate-900 dark:text-white">Hourly Wage to Annual Earnings:</p>
        <div className="font-mono text-emerald-600 dark:text-emerald-400 p-3 bg-white dark:bg-slate-950 rounded-xl text-center border border-slate-100 dark:border-slate-900 font-bold text-lg">
          Annual Package = Hourly Compensation × 2080 Hours
        </div>
        <div className="text-xs text-slate-500 leading-relaxed">
          Standard accounting assumes <span className={codeStyle}>40 working hours per week</span> for <span className={codeStyle}>52 weeks</span>, resulting in exactly <span className={codeStyle}>2,080 billable hours per year</span>. Pre-tax conversions then distribute into weekly or monthly structures.
        </div>
      </div>
    );
  }

  if (tool.id === 'base64-encoder-decoder') {
    return (
      <div className={containerStyle}>
        <p className="font-semibold text-slate-900 dark:text-white">Base64 Radix-64 Encoding Logic:</p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Base64 takes standard binary data and transforms it into 6-bit chunks. Each 6-bit chunk maps to one of the 64 characters in the index sequence:
        </p>
        <div className="font-mono text-[10px] break-all bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-900 text-slate-500 text-center">
          A-Z, a-z, 0-9, +, /, and padding =
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Every <span className={codeStyle}>3 bytes</span> (24 bits) of ASCII text compiles cleanly into exactly <span className={codeStyle}>4 Base64 characters</span>. This ensures safe text passage over legacy email systems and browser URL paths.
        </p>
      </div>
    );
  }

  if (tool.id === 'keyword-density-checker') {
    return (
      <div className={containerStyle}>
        <p className="font-semibold text-slate-900 dark:text-white">SEO Keyword Density Formula:</p>
        <div className="font-mono text-emerald-600 dark:text-emerald-400 p-3 bg-white dark:bg-slate-950 rounded-xl text-center border border-slate-100 dark:border-slate-900 font-bold text-lg">
          Density (%) = (N_key / N_total) × 100
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Where <span className={codeStyle}>N_key</span> is the frequency of the specific target keyword, and <span className={codeStyle}>N_total</span> is the total word count in the audited document. Optimal keyword ranges fall between <span className={codeStyle}>1% and 2.5%</span>.
        </p>
      </div>
    );
  }

  // Category Level Defaults
  if (tool.category === 'calculators') {
    return (
      <div className={containerStyle}>
        <p className="font-semibold text-slate-900 dark:text-white">Calculation Standard & Equation:</p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          This calculator uses precise client-side algorithms based on standardized global norms:
        </p>
        <div className="font-mono text-emerald-600 dark:text-emerald-400 p-3 bg-white dark:bg-slate-950 rounded-xl text-center border border-slate-100 dark:border-slate-900 font-bold text-xs select-all">
          Result = f(Inputs, ConfigurationParameters)
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Our computational engine runs in an optimized loop, executing immediately on each parameter shift. By avoiding remote server pings, we ensure sub-millisecond calculation speeds.
        </p>
      </div>
    );
  }

  if (tool.category === 'converters') {
    return (
      <div className={containerStyle}>
        <p className="font-semibold text-slate-900 dark:text-white">Metric Scaling Conversions:</p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          This converter establishes a single <strong>unambiguous baseline value</strong> for high fidelity. For example:
        </p>
        <div className="font-mono text-emerald-600 dark:text-emerald-400 p-3 bg-white dark:bg-slate-950 rounded-xl text-center border border-slate-100 dark:border-slate-900 font-bold text-sm">
          Value_target = (Value_source / Base_ratio_source) × Base_ratio_target
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          By compiling ratios to a central baseline, the conversion avoids cumulative floating-point calculation errors and ensures perfect bidirectional conversions across systems.
        </p>
      </div>
    );
  }

  if (tool.category === 'devtools') {
    return (
      <div className={containerStyle}>
        <p className="font-semibold text-slate-900 dark:text-white">Logical & Syntactic Validation:</p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Our browser workspace compiles logical data streams using the following schema parsing pipeline:
        </p>
        <div className="font-mono text-emerald-650 dark:text-emerald-400 p-2.5 bg-white dark:bg-slate-950 rounded-xl text-[10px] space-y-1 border border-slate-100 dark:border-slate-900">
          <div>Raw String Input → UTF-8 Stream Parser</div>
          <div>→ Token Validation & Format Checking</div>
          <div>→ Client Sandbox Output rendering</div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Sanitization and lexical processing are computed entirely locally inside your browser, preventing data leak paths and maintaining strict privacy.
        </p>
      </div>
    );
  }

  // Generic Catchall
  return (
    <div className={containerStyle}>
      <p className="font-semibold text-slate-900 dark:text-white">Core Algorithms & Mechanics:</p>
      <p className="text-xs text-slate-600 dark:text-slate-400">
        This tool uses modern native JavaScript string functions, mathematical constants, and regular expressions to execute operations in real time.
      </p>
      <div className="font-mono text-emerald-600 dark:text-emerald-400 p-2.5 bg-white dark:bg-slate-950 rounded-xl text-center text-xs border border-slate-100 dark:border-slate-900">
         ProcessTime &lt; 0.01ms / Cycle
      </div>
    </div>
  );
}

// Generate real-world detailed SEO examples
export function getToolExamples(tool: Tool): ReactNode {
  const highlightClass = "font-semibold text-slate-900 dark:text-white";
  const boxStyle = "p-5 bg-white dark:bg-slate-900/10 border border-slate-150 dark:border-slate-800 rounded-2xl shadow-sm text-sm space-y-3 leading-relaxed";

  if (tool.id === 'simple-interest-calculator') {
    return (
      <div className={boxStyle}>
        <span className="block text-xs font-bold text-emerald-600 uppercase tracking-widest">Real-World Case Study</span>
        <p>
          Let's say a business owner invests <span className={highlightClass}>$5,000</span> in a local savings certificate that pays a fixed <span className={highlightClass}>6% interest rate</span> p.a. for <span className={highlightClass}>4 years</span>.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-500 text-xs">
          <li><strong>P (Principal):</strong> $5,000</li>
          <li><strong>R (Rate):</strong> 6% per annum</li>
          <li><strong>T (Time):</strong> 4 years</li>
          <li><strong>Calculation:</strong> Interest = 5,000 × 0.06 × 4 = $1,200</li>
        </ul>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
          At maturity, the investor collects exactly <span className={highlightClass}>$6,200</span>. Simple interest is ideal for fixed bank accounts, short term bonds, or local loan contracts.
        </p>
      </div>
    );
  }

  if (tool.id === 'compound-interest-calculator') {
    return (
      <div className={boxStyle}>
        <span className="block text-xs font-bold text-emerald-600 uppercase tracking-widest">Compounding Case Study</span>
        <p>
          An investor puts <span className={highlightClass}>$10,000</span> into an index fund yielding an average <span className={highlightClass}>8% annual return</span>, compounded <span className={highlightClass}>monthly</span>, and leaves it for <span className={highlightClass}>10 years</span>.
        </p>
        <p className="text-xs text-slate-500">
          Due to compound interest, the principal earns interest on interest. In year 1, the fund grows to $10,830. By year 10, the total compounds to <span className={highlightClass}>$22,196.40</span>, giving a massive gain of <span className={highlightClass}>$12,196.40</span>!
        </p>
      </div>
    );
  }

  if (tool.id === 'discount-calculator') {
    return (
      <div className={boxStyle}>
        <span className="block text-xs font-bold text-emerald-600 uppercase tracking-widest">Retail Example</span>
        <p>
          You find a high-end keyboard priced at <span className={highlightClass}>$180</span>. The store offers a stackable promotional coupon of <span className={highlightClass}>35% off</span>.
        </p>
        <p className="text-xs text-slate-500">
          The tool computes the cash discount as exactly <span className={highlightClass}>$63</span>, leaving a final checkout price of <span className={highlightClass}>$117</span>. It helps shoppers compare multi-buy retail prices and tax savings in seconds.
        </p>
      </div>
    );
  }

  if (tool.id === 'keyword-density-checker') {
    return (
      <div className={boxStyle}>
        <span className="block text-xs font-bold text-emerald-600 uppercase tracking-widest">SEO Optimization Case</span>
        <p>
          A blogger paste a draft of <span className={highlightClass}>800 words</span>. The tool searches and flags that the word "calculator" is repeated <span className={highlightClass}>32 times</span>.
        </p>
        <p className="text-xs text-slate-500">
          The calculated keyword density yields <span className={highlightClass}>4.0%</span>. The checker flags this in red as keyword stuffing, suggesting the blogger reduce repetitions to under 16 times (2.0%) to avoid search penalties.
        </p>
      </div>
    );
  }

  // Categories fallback examples
  if (tool.category === 'calculators') {
    return (
      <div className={boxStyle}>
        <span className="block text-xs font-bold text-indigo-500 uppercase tracking-widest">Practical Scenario Usage</span>
        <p>
          Consider performing a calculation for a business spreadsheet or academic assignment.
        </p>
        <p className="text-xs text-slate-500">
          Instead of relying on a pen & paper or risking manual spreadsheet formula errors, you enter your numbers into the fields on this page. The layout computes results in real-time, giving you instant verification to make quick, data-driven decisions.
        </p>
      </div>
    );
  }

  if (tool.category === 'converters') {
    return (
      <div className={boxStyle}>
        <span className="block text-xs font-bold text-indigo-500 uppercase tracking-widest">Frictional Example Scenario</span>
        <p>
          A software engineer is coordinating an international shipment of technical items.
        </p>
        <p className="text-xs text-slate-500">
          The packaging requirements are listed in imperial pounds (lbs) and inches (in), but the shipping carrier accepts metric listings. By pasting values into our converter, the engineer gets instant metric translations down to four decimals, preventing cargo delays.
        </p>
      </div>
    );
  }

  return (
    <div className={boxStyle}>
      <span className="block text-xs font-bold text-indigo-505 uppercase tracking-widest">Workflow Scenario</span>
      <p>
        A professional developer is debugging a web server communication log.
      </p>
      <p className="text-xs text-slate-500">
        By dropping raw parameters into the tool, they instantly parse, format, or process data without exposing API keys or secrets to public servers. This workflow accelerates development cycles and secures customer logs.
      </p>
    </div>
  );
}

// Generate custom FAQs for every tool dynamically to never serve "thin faqs"
export function getToolFaqs(tool: Tool, staticFaqs: FAQItem[]): FAQItem[] {
  // If static faqs exist with more than default 2 entries, return them
  if (staticFaqs && staticFaqs.length > 2) {
    return staticFaqs;
  }

  // Create customized FAQs based on tool specifics
  return [
    {
      question: `How does the ${tool.name} compile results?`,
      answer: `The ${tool.name} runs entirely client-side inside your browser sandbox. It evaluates your mathematical inputs or text files using standardized procedures written in TypeScript, delivering results in less than 1 millisecond.`
    },
    {
      question: `Is it safe to copy-paste confidential parameters into this ${tool.category} tool?`,
      answer: `Absolutely. Since the calculations and visual conversions are processed directly inside your local browser memory, your passwords, file paths, salaries, or physical metrics are never synced to public clouds, databases, or analytics clusters.`
    },
    {
      question: `Does the ${tool.name} work on mobile browsers?`,
      answer: `Yes! Every utility on our platform features fully fluid Tailwind CSS components that adjust to any screen width. This ensures high readability and complete touchscreen accessibility on both iOS and Android handsets.`
    },
    {
      question: `Are there limits on using this free online tool?`,
      answer: `None whatsoever. You can execute infinite calculations, convert extensive size spreadsheets, or validate code parameters all day with zero limits, registration requirements, or premium paywalls.`
    }
  ];
}

// Dynamic Guide Resolver
export function getGuideForTool(tool: Tool, staticGuides: Record<string, any>): GeneratedGuide {
  const staticGuide = staticGuides[tool.id];

  const keywords = staticGuide?.keywords || [
    `free ${tool.name.toLowerCase()}`,
    `online ${tool.name.toLowerCase()}`,
    `how to calculate ${tool.name.toLowerCase()}`,
    `best offline ${tool.category}`,
    `calculator`,
    `sandbox utility`
  ];

  return {
    introduction: staticGuide?.explanation || (
      <div className="space-y-4">
        <p>
          The <strong>{tool.name}</strong> is a high-performance, web-accessible utility engineered to help users {tool.description.toLowerCase().replace(/\.$/, '')}. It operates as a vital node in our comprehensive suite of calculators, unit converters, and developer platforms.
        </p>
        <p>
          In professional operations, accuracy is a non-negotiable metric. This {tool.category} utility eliminates the friction of manual bookkeeping or mathematical formula calculations by delivering immediate, decimal-precise outcomes on a unified visual dashboard.
        </p>
        <p>
          By leveraging efficient, sandboxed parsing algorithms, are {tool.name} ensures optimal rendering speed. It provides high global usability, allowing students, developers, and professionals to solve tasks instantly on any desktop or mobile device.
        </p>
      </div>
    ),
    howToUse: staticGuide?.howToUse || (
      <ol className="list-decimal pl-6 space-y-2 text-slate-655 dark:text-slate-350 text-sm sm:text-base">
        <li><strong>Open the Workspace:</strong> Navigate to the <code>{tool.path}</code> URL. The client application initiates in offline mode instantly.</li>
        <li><strong>Enter Values:</strong> Fill in the input fields or toggle configuration parameters inside the interactive card.</li>
        <li><strong>Analyze Outputs:</strong> The layout updates instantly in real-time as you type, rendering formatted results or warnings.</li>
        <li><strong>Export data:</strong> Click standard copy buttons to transfer results to your clipboard or share the link with colleague nodes.</li>
      </ol>
    ),
    benefits: staticGuide?.benefits || (
      <ul className="list-disc pl-6 space-y-2 text-slate-655 dark:text-slate-350 text-sm sm:text-base">
        <li><strong>Zero Network Dependency:</strong> Computes calculations 100% offline, keeping you productive in high-security planes or field sites.</li>
        <li><strong>Guaranteed Input Privacy:</strong> Because numbers or records never leave your machine, your intellectual details remain completely private.</li>
        <li><strong>Micro-Layout Precision:</strong> Crafted with balanced typographic tracking, responsive touch padding, and visual hierarchy.</li>
        <li><strong>Standardized Formulas:</strong> Computes variables in strict alignment with World Health Organization, financial, or IEEE coding systems.</li>
      </ul>
    ),
    formula: getToolFormula(tool),
    examples: getToolExamples(tool),
    faqs: [], // Handled dynamically in getToolFaqs
    relatedTitle: `Recommended ${tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}`,
    keywords
  };
}

// Generate related links statically for calculators, converters, devtools, text, etc.
export function getRelatedLinks(tool: Tool): { name: string; path: string }[] {
  // Return different categories of utilities to create strong internal link density (Requirement 4)
  const categoryRelated = tools
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 2);

  const generalRelated = tools
    .filter(t => t.category !== tool.category)
    .slice(0, 2);

  const combined = [...categoryRelated, ...generalRelated];
  return combined.map(t => ({ name: t.name, path: t.path }));
}
