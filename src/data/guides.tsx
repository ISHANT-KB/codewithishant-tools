import { ReactNode } from 'react';

interface ToolGuide {
  explanation: ReactNode;
  howToUse: ReactNode;
  benefits: ReactNode;
  keywords: string[];
}

export const guides: Record<string, ToolGuide> = {
  'age-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>
          The <strong>Chronological Age Calculator</strong> is a precision utility engineered to compute the exact duration of time elapsed between a starting point (typically a person's birth date and time) and a target end date. Knowing your age in years is simple, but calculating it down to leap-year corrected days, weeks, custom hours, and minutes requires dynamic calendar algorithms.
        </p>
        <p>
          Unlike basic age estimates, our calculation model dynamically tracks variable month lengths—such as February having 28 or 29 days, or April having 30 days—across centuries. This is critical because failing to account for leap years can result in multi-day errors of age representations.
        </p>
        <p>
          This calculator conforms to standard Gregorian civil calendar structures. It handles leap days (February 29th) seamlessly, providing a flawless timeline for fitness logs, legal documents, contracts, chronological ages, or family celebrations.
        </p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Select Date of Birth:</strong> Click the date selector under "Date of Birth" to pick the day you were born.</li>
        <li><strong>Add Time of Birth (Optional):</strong> Input your exact hour of birth in 24-hour style to unlock minute-level results.</li>
        <li><strong>Determine Target Date:</strong> Set the active checkpoint date (by default, today's current calendar date).</li>
        <li><strong>Click Calculate:</strong> Click "Calculate Exact Age" to instantly trigger the parsing calculations.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>100% Exact Chronological Math:</strong> Integrates absolute leap year adjustments across centuries.</li>
        <li><strong>Micro-Timeline Breakdowns:</strong> View your lifespans calculated instantly in years, months, weeks, days, hours, and seconds.</li>
        <li><strong>Birthday Countdown Registry:</strong> Automatically reveals the exact number of calendar days remaining until your next celebration.</li>
        <li><strong>Completely Private:</strong> Calculations run 100% locally in your active sandbox. No birth metrics are sent to servers.</li>
      </ul>
    ),
    keywords: ["exact timeline", "leap year calendar", "age down to seconds", "birthday count"]
  },

  'bmi-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>
          The <strong>Body Mass Index (BMI) Scientific Calculator</strong> is a widely recognized medical screening utility used to categorize a person's physique into weight status categories. By analyzing the proportional relationship between height and weight, the BMI core provides a quick reference index that correlates to potential wellness indicators.
        </p>
        <p>
          Our calculator implements the official math and metrics established by the World Health Organization (WHO) and standard medical clinics. It supports both metric units (centimeters and kilograms) and British/American imperial systems (feet, inches, pounds) with integrated calculations, ensuring high global usability.
        </p>
        <p>
          While BMI is not a direct diagnostic measure of muscle density vs. fat proportions, it represents a highly effective first-step screening standard. Tracking BMI changes supports active physical goals, athletic progressions, nutritional planning, or health coaching protocols.
        </p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Choose Unit System:</strong> Select either "Metric" or "Imperial" using the top toggle tabs.</li>
        <li><strong>Input Height Parameters:</strong> Enter your height (in centimeters for metric, or feet and inches for imperial).</li>
        <li><strong>Enter Current Weight:</strong> Provide your active weight (in kilograms for metric, or pounds for imperial).</li>
        <li><strong>Process:</strong> Click the "Compute BMI Index" button to generate your score, weight class segment, and custom wellness tips.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Dual-System Support:</strong> Seamlessly toggle metric or imperial formulas with automated scaling adjustments.</li>
        <li><strong>Interactive WHO Slider:</strong> A dynamic visual indicator displays your score relative to Underweight, Normal, Overweight, and Obese brackets in real-time.</li>
        <li><strong>Clinical Wellness Advice:</strong> Translates raw scores into customized, actionable fitness advice based on WHO categories.</li>
        <li><strong>No Account Required:</strong> Calculate your wellness metrics instantly without logins or registrations.</li>
      </ul>
    ),
    keywords: ["healthy bmi brackets", "who weight standards", "proportional fitness", "body mass equation"]
  },

  'percentage-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>
          Percentages are the universal standard for comparing relative ratios, sales decreases, monetary growth, and statistical rates. The <strong>Multi-Mode Percentage Calculator</strong> organizes three discrete operational boards into a unified client dashboard, eliminating math errors during calculations.
        </p>
        <p>
          Whether you are evaluating promotional sale folders, verifying tax (GST/VAT) segments on a receipt, checking investment growth, or trying to calculate a tip, this calculator solves fractions instantly.
        </p>
        <p>
          This dashboard displays exact calculations in real-time. It separates fractions, portions, and percentage modifications symmetrically, representing a highly helpful tool for developers, bookkeeping analysts, and academic researchers alike.
        </p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Portion Calculator:</strong> Enter the percentage and target whole (e.g., 15% of 200) then click "Calculate" in Board 1.</li>
        <li><strong>Percentage Ratio:</strong> Input two numbers (e.g., 30 is what percent of 150) to evaluate the percentage portion in Board 2.</li>
        <li><strong>Percent Change:</strong> Fill fields under Board 3 to calculate percentage increase or decrease from coordinate X to Y.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Multi-Board Setup:</strong> Solves three different percentage equations in one screen.</li>
        <li><strong>High-Precision Outputs:</strong> Results compile up to 4 decimal places for exact professional accounting standards.</li>
        <li><strong>Direction Detection:</strong> Automatically senses whether calculations represent a rise, drop, or flat index.</li>
        <li><strong>One-Click Resets:</strong> Fast reset buttons clear all boards instantly, letting you compute back-to-back ratios cleanly.</li>
      </ul>
    ),
    keywords: ["percentage increase", "discount calculations", "percent whole ratios", "flat rate margins"]
  },

  'loan-emi-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>
          An <strong>Equated Monthly Installment (EMI) loan calculator</strong> evaluates amortization metrics for personal, automotive, or home lending. It helps individuals understand the complete financial obligations, amortization curves, and absolute interest factors associated with flat-rate amortized contracts.
        </p>
        <p>
          By adjusting principal, annual rate percentages, and payment tenure boundaries, you can review how monthly obligations fluctuate. This ensures you make informed borrowing choices and plan your budget effectively.
        </p>
        <p>
          Calculations are calculated using official annuity principles utilized by top banks and lending associations. Results compile monthly EMIs, total interest paid, and total balance payouts over years cleanly.
        </p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Input Loan Amount:</strong> Type your target loan sum ($) in the box or play with the sliding principal anchor.</li>
        <li><strong>Configure Interest Rate:</strong> Drag or type the expected annual interest percentage (e.g., 7.5% p.a.).</li>
        <li><strong>Define Tenure:</strong> Select the duration of the borrowing period in years.</li>
        <li><strong>Read Output:</strong> The calculated monthly installment, total interest payable, and total amount will update instantly.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Real-Time Sliding Scale:</strong> Drag controls make comparison of different loan amounts super engaging.</li>
        <li><strong>Precise Interest Tracking:</strong> Clearly isolates the principal sum from the cumulative interest surcharge.</li>
        <li><strong>Universal Compliance:</strong> Formulated according to the standard mathematical annuity schedules used by banking institutions worldwide.</li>
      </ul>
    ),
    keywords: ["monthly loan emi", "amortization interest", "car mortgage calculators", "annual rate scales"]
  },

  'scientific-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>
          For advanced science, engineering, and programming formulations, standard arithmetic calculators often fall short. The <strong>Advanced Scientific Calculator Console</strong> delivers professional, trigonometry-capable logic directly to your browser sandbox.
        </p>
        <p>
          It supports standard arithmetic keys plus multi-level brackets, square root indices, custom power scales, constant values (p, e), natural logarithms, modular remainders, and basic inversions.
        </p>
        <p>
          Calculations process locally inside your client environment using highly-optimized, secure parsing loops. PEMDAS/BODMAS algebraic priorities are strictly applied, ensuring high accuracy.
        </p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Enter Numbers & Operations:</strong> Click on standard numerical keys or utilize keyboard inputs.</li>
        <li><strong>Incorporate Advanced Functions:</strong> Use sin, cos, tan, or exponent selectors (parentheses auto-close where appropriate).</li>
        <li><strong>Review Formula Layout:</strong> Evaluate your built equation on the top of the display screen.</li>
        <li><strong>Press Equals (=):</strong> Click equal to calculate the final value.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Full Scientific Catalog:</strong> Supports trigonometry, logarithmic bases, fractional remainders, and power exponents.</li>
        <li><strong>Algebraic Priority Matching:</strong> Adheres to strict operator ordering rules (BODMAS/PEMDAS) for accurate calculations.</li>
        <li><strong>Interactive History Logs:</strong> Tracks a scrolling list of your five most recent calculations.</li>
        <li><strong>Clear & CE Keys:</strong> Backspace individual characters (CE) or wipe the screen completely (C) for error-free math.</li>
      </ul>
    ),
    keywords: ["trigonometry solver", "parentheses math", "exponential constants", "log base calculators"]
  },

  'length-converter': {
    explanation: (
      <div className="space-y-4">
        <p>
          Length variables are expressed across various metric and imperial scales, from microscopic millimeters to sweeping milestones. The <strong>Multi-Unit Length Converter</strong> provides a real-time table mapping eight standard length measurements simultaneously.
        </p>
        <p>
          Our converter addresses standard frustrations associated with dropdown selectors. Instead of picking source and target units back-to-back, this tool features an active grid where typing in any field automatically updates all other parameters.
        </p>
        <p>
          Calculations leverage a standardized meter base configuration. This ensures high-precision outputs, whether you are checking product sizes, planning construction diagrams, finishing school work, or looking up geographical boundaries.
        </p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Locate Unit Box:</strong> Find the measurement unit you want to convert (e.g., Inches, Meters, or Miles).</li>
        <li><strong>Type Value:</strong> Input the value directly into that specific box. All other fields will calculate and update instantly.</li>
        <li><strong>Reset (Optional):</strong> Click the "Reset Converter" key to restore all unit boxes to a baseline of 1.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Automated Matrix Conversion:</strong> Translates one input across seven alternative metric/imperial units simultaneously.</li>
        <li><strong>Decimal Precision Rendering:</strong> Displays up to 6 decimal places or switches to scientific notation for extremely small lengths.</li>
        <li><strong>High-Contrast Text inputs:</strong> Clean fonts and spacious layout boxes make reading values effortlessly clear.</li>
      </ul>
    ),
    keywords: ["metric length unit", "inches to meters", "miles kilometers scales", "construction converter"]
  },

  'password-generator': {
    explanation: (
      <div className="space-y-4">
        <p>
          Data security and privacy are paramount in our digital world. The <strong>Secure High-Entropy Password Generator</strong> is a cryptographic tool that creates randomized, non-reproducible passwords locally in your browser.
        </p>
        <p>
          Unlike basic generators that rely on standard pseudo-random number seeds, our generator utilizes standard <code>window.crypto.getRandomValues</code> APIs. This provides highly reliable cryptographic randomness to protect against brute-force attacks.
        </p>
        <p>
          You can customize characters by enabling or disabling uppercase, lowercase, numbers, or symbols. The tool also supports bulk password list generation, allowing you to secure multiple folders or service setups simultaneously.
        </p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Set Password Length:</strong> Select between 8 and 64 characters utilizing the custom horizontal slider.</li>
        <li><strong>Choose Character Rules:</strong> Check or uncheck UPPERCASE, lowercase, numbers, or symbols on the right.</li>
        <li><strong>Bulk Settings (Optional):</strong> Select quantity in the dropdown to generate bulk lists of passwords.</li>
        <li><strong>Copy Results:</strong> Click copy on the primary dashboard box (or Copy All for bulk lists) to save securely.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Cryptographically Secure:</strong> Uses reliable system-level randomizers instead of standard mathematical estimates.</li>
        <li><strong>Active Entropy Evaluation:</strong> Dynamically gauges and color-codes strength ratings (Weak to Excellent) based on complexity.</li>
        <li><strong>Bulk Output Support:</strong> Generates lists of up to 20 secure configurations at once.</li>
        <li><strong>Absolute Privacy:</strong> Generation occurs entirely client-side. No passwords ever touch remote databases or networks.</li>
      </ul>
    ),
    keywords: ["cryptographic secure password", "brute force protection", "bulk password registry", "entropy evaluator"]
  },

  'word-counter': {
    explanation: (
      <div className="space-y-4">
        <p>
          Whether you are writing blog articles, composing metadata, or managing character limits for social platforms like X/Twitter, tracking text metrics is essential. The <strong>Professional Word & Character Counter</strong> is a specialized workspace that analyzes text volume, structure, and keyword densities instantly.
        </p>
        <p>
          In addition to counting raw word volume, it isolates characters with and without spaces, lists total sentences, counts paragraph blocks, and estimates reading times based on standard adult averages.
        </p>
        <p>
          It also features an inline Keyword Density Checker. By stripping common filler words, it highlights the five most recurring terms, helping you optimize content without keyword stuffing.
        </p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Paste or Type Text:</strong> Input your content directly into the central text workspace.</li>
        <li><strong>Review Live Statistics:</strong> Real-time word, character, sentence, and paragraph counters update with every keystroke.</li>
        <li><strong>Analyze Keyword Densities:</strong> Check the "Top Keyword Density Usage" section underneath to optimize word frequency.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Accurate Live Metric Syncing:</strong> Dynamic scanning processes long text inputs without lagging.</li>
        <li><strong>Isolates Spaces:</strong> Crucial for complying with strict character limits on social media and ad platforms.</li>
        <li><strong>Keyword Optimization:</strong> Identifies and tracks keyword frequencies, helping you prevent search engine penalties.</li>
        <li><strong>Read Time Indicator:</strong> Estimates standard reading times based on an average reading speed of 200 words per minute.</li>
      </ul>
    ),
    keywords: ["seo word frequencies", "character counting tools", "paragraph analyzer", "read times estimation"]
  },

  'meta-tag-generator': {
    explanation: (
      <div className="space-y-4">
        <p>
          Search engines crawl web metadata to index sites and understand content structure. The <strong>Meta Tag Generator & SEO Optimizer</strong> simplifies this process by compiling standard web metadata tags in a clean, copy-pastable interface.
        </p>
        <p>
          It supports standard meta tags (title, description, keywords, author, robots) alongside modern OpenGraph and Twitter social media cards to optimize visual links shared across platforms like Facebook, Slack, and LinkedIn.
        </p>
        <p>
          Simply input your page credentials, and the tool compiles valid, formatted HTML blocks instantly.
        </p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Complete Site Fields:</strong> Provide your page title, description, and primary keywords list.</li>
        <li><strong>Configure Crawler Rules:</strong> Choose index/follow crawler configurations in the Robots dropdown.</li>
        <li><strong>Set Social Previews:</strong> Fill in the OG type and provide an absolute URL path for preview images.</li>
        <li><strong>Copy Generated Package:</strong> Click "Copy Code" to copy the generated HTML block directly into your clipboard.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Comprehensive SEO Catalog:</strong> Combines basic HTML metadata with OpenGraph and Twitter card formats in a single block.</li>
        <li><strong>Real-Time Code Preview:</strong> Displays the compiled HTML snippet instantly as you type.</li>
        <li><strong>Ensures Standard Compliance:</strong> Generates beautifully indented, valid HTML tags that are ready for immediate execution.</li>
      </ul>
    ),
    keywords: ["meta header codes", "opengraph social previews", "robots crawl indexer", "sitemap index templates"]
  },
  'freelance-rate-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Freelance Rate Calculator</strong> is designed to help independent contractors, developers, consultants, and creative professionals determine exactly what to charge clients in order to meet their financial goals.</p>
        <p>Many freelancers make the mistake of calculating their hourly rate by simply dividing their target salary by 2,000 hours. This fails to account for taxes, business expenses, sick days, vacations, and unbilled admin/marketing overhead. This tool provides a professional alternative.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Adjust your Target Net Income (take-home salary) slider.</li>
        <li>Input your estimated Annual Business Expenses like software licenses or healthcare.</li>
        <li>Set your local Income Tax Rate buffer, which is withheld before your take-home pay.</li>
        <li>Configure how many weeks off you plan to take and estimate your realistic weekly billable hours.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Realistic pricing based on net-take home and overhead cost totals.</li>
        <li>Built-in buffer for non-billable hours, client pitches, and administrative work.</li>
        <li>Instant breakdown of hourly, daily, and weekly rate equivalents.</li>
      </ul>
    ),
    keywords: ["hourly rate math", "day rate calculator", "independent pricing", "freelance pricing plan"]
  },
  'youtube-earnings-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>YouTube Earnings Calculator</strong> lets creators estimate their potential AdSense revenue based on daily video views and niche-specific Revenue Per Mille (RPM) rates.</p>
        <p>Niches like corporate finance or SaaS software enjoy massive advertiser competition (yielding $10+ RPM), while gaming, lifestyle, and comedy channels typically obtain lower rates. This tool lets you compare these payouts side-by-side.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Select your estimated average daily video views.</li>
        <li>Set your target RPM or click any of the five preconfigured industry niche buttons.</li>
        <li>Review your estimated daily, monthly, and yearly cash payouts.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Preset niche selectors for Finance, Tech, Life, Gaming, and Education.</li>
        <li>Accounts for average monthly days (30.4) for precise projections.</li>
        <li>Interactive sliders with instant, real-time results.</li>
      </ul>
    ),
    keywords: ["adsense estimation", "rpm multiplier", "niche CPM rates", "creator income metrics"]
  },
  'upi-emi-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>UPI EMI & Pay Later Cost Calculator</strong> empowers consumers to dissect interest rates and processing fees utilized by Indian mobile wallets and digital checkout credit lines (such as Paytm Postpaid, Amazon Pay Later, etc.).</p>
        <p>Many pay-later schemes market themselves as "no-cost EMI" or low processing, but can carry high annualized interest rates or penalty percentages on overdue balances. This tool computes your real financial expenditures.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Under purchase amount, drag the slider to match your shopping cart transaction.</li>
        <li>Input the annual interest rate printed in the mobile app's terms.</li>
        <li>Select your credit tenure in months and processing fee percentage.</li>
        <li>Observe the exact equated monthly installments to budget correctly.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Identifies hidden overhead charges alongside upfront processing fees.</li>
        <li>Side-by-side display of raw interest payments and complete repayment totals.</li>
        <li>Enables smart decision-making to avoid compounding debt spirals.</li>
      </ul>
    ),
    keywords: ["pay later rates", "micro loan compound", "one-time processing fees", "micro checkout fees"]
  },
  'indian-income-tax-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Indian Income Tax Calculator</strong> evaluates your income tax liabilities under both the classic Old Tax Regime and the newly updated New Tax Regime slabs (FY 2025-26 / AY 2026-27 definitions).</p>
        <p>Due to the latest budget revisions, standard deductions and slabs have changed. This comparison highlights which tax regime is mathematically superior based on your active Section 80C, 80D, and HRA exemptions.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Enter your total annual gross salary and supplementary interest or rental income.</li>
        <li>Toggle your professional category (Salaried vs Business/Employer).</li>
        <li>If comparing the Old Regime, input your Section 80C investments, 80D insurances, and HRA exemptions.</li>
        <li>Analyze the side-by-side calculated tax breakdown to determine your optimal choice.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Calculates exact standard deductions under both current regime structures.</li>
        <li>Includes 4% Health and Education Cess additions on raw taxes.</li>
        <li>Computes proper Sec 87A tax rebates automatically for safe filing.</li>
      </ul>
    ),
    keywords: ["87A rebate comparison", "old vs new regimes", "exemptions list 80C", "income tax slabs India"]
  },
  'gst-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>GST Calculator</strong> is a compliant tax utility designed for merchants, purchasers, and accounting teams to calculate Central, State, and Integrated Goods and Services Tax (GST).</p>
        <p>It supports both Tax Exclusive calculations (adding GST to base price) and Tax Inclusive calculations (stripping GST to reveal original unit costs).</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Enter your transaction gross amount in the numerical input block.</li>
        <li>Choose either "Add GST (Exclusive)" or "Remove GST (Inclusive)".</li>
        <li>Select any of the standard slabs (5%, 12%, 18%, 28%) or type a custom rate.</li>
        <li>Review your base pricing receipts and Central/State tax splits.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Instant rendering of CGST and SGST equal-half breakdowns.</li>
        <li>Seamless, high-performance exclusive and inclusive calculations.</li>
        <li>Features standard fiscal slabs with full custom rate overrides.</li>
      </ul>
    ),
    keywords: ["cgst sgst splitting", "tax inclusive price", "tax exclusive unit cost", "GST rates slab India"]
  },
  'sip-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>SIP (Systematic Investment Plan) Calculator</strong> tracks the growth of monthly mutual fund or equity SIP contributions over long-term timelines.</p>
        <p>By investing a fixed amount regularly, you leverage dollar-cost averaging and compound interest, allowing your money to multiply exponentially over time.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Set your monthly SIP contribution goal using the slider.</li>
        <li>Drag the Expected Return slider (typically 12% is used for index tracking mutual funds).</li>
        <li>Adjust your horizon tenure (Years) to see the effects of long-term compounding.</li>
        <li>Review your final maturity corpus and wealth gains.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>High-fidelity compound interest formula with monthly compounding.</li>
        <li>Realistic return presets for Conservative, Moderate, and Aggressive profiles.</li>
        <li>Instant mathematical comparisons between total invested sums and final returns.</li>
      </ul>
    ),
    keywords: ["mutual fund returns", "systematic investment plan math", "compounding interest curve", "wealth corpus calculator"]
  },
  'cgpa-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>CGPA to Percentage Calculator</strong> converts Academic Grade Point Averages (on 10.0 or 4.0 scales) into equivalent cumulative percentages and official classes.</p>
        <p>Different boards and regional universities (such as CBSE, VTU, Mumbai University) utilize unique scaling multipliers and subtractive offsets. This tool accommodates these variations.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Select your university or board preset formula standard.</li>
        <li>For a quick conversion, enter your CGPA in the numerical card.</li>
        <li>To track multiple terms, add SGPAs alongside semester credit points in the aggregator area.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Accurate conversions matching CBSE, Mumbai Univ, and VTU guidelines.</li>
        <li>Weighted multi-semester CGPA GPA calculations.</li>
        <li>Outputs academic ranks like First Class with Distinction dynamically.</li>
      </ul>
    ),
    keywords: ["cgpa to percentage multiplier", "sgpa weight credits", "cbse percentage conversion", "academic grade classes"]
  },
  'attendance-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>College Attendance Goal Calculator</strong> is a must-have utility for university students seeking to maintain a target attendance percentage (typically 75% or 80%).</p>
        <p>It provides clear, actionable advice by calculating exactly how many consecutive classes you can safely skip or must attend to stay above your target.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Drag the top slider to specify your total classes held to date.</li>
        <li>Set the "Classes Attended" slider to match your current performance.</li>
        <li>Adjust your target attendance requirement (such as 75%).</li>
        <li>Read the generated safety recommendation instantly.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Smart predictive advice: tells you exactly how many classes you can safety bunk.</li>
        <li>Calculates attendance shortages and lists required consecutive classes.</li>
        <li>Easy-to-use sliding dashboard designed for mobile browsers.</li>
      </ul>
    ),
    keywords: ["bunking threshold math", "75 percent rule tracker", "classes required for criteria", "consecutive attendance target"]
  },
  'json-formatter': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>JSON Formatter & Prettifier</strong> is a dedicated workspace designed to beautify minified data structures into perfectly tabular, nested object hierarchies.</p>
        <p>It cleans syntax, validates brackets, formats offsets, and enables deep diagnostics checks to ensure fast data interpretation.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Paste your unformatted, raw JSON payload into the editor space.</li>
        <li>Choose your preferred indentation spacing layout (2 spaces or 4 spaces).</li>
        <li>Click "Format JSON" to trigger formatting and structural highlight mappings.</li>
        <li>Copy or download the prettified results directly.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Beautify minified network API responses for readable inspection.</li>
        <li>Flexible indention tabs (2 vs 4 spaces) fit formatting presets perfectly.</li>
        <li>Offers direct copy actions and download options.</li>
      </ul>
    ),
    keywords: ["json prettify", "minified json viewer", "api response inspection", "nested object visualization"]
  },
  'json-validator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>JSON Syntax Validator</strong> helps developers evaluate structural compliance on schemas and objects.</p>
        <p>It parses nested structures, tracking precisely where quotes are missed, colons are misplaced, or delimiters are omitted.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Paste your raw object string into the diagnostics textbox workspace.</li>
        <li>Click the "Validate JSON" action button.</li>
        <li>Review error line numbers, column Offsets, and suggestions.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Automated error location estimates matching rows and columns.</li>
        <li>Clear, actionable instructions pointing to quotation or separator replacements.</li>
        <li>Quick custom presets (missing comma, single quotes) for immediate testing.</li>
      </ul>
    ),
    keywords: ["json syntax check", "validate json schema", "missing commas finder", "unmatched brackets checker"]
  },
  'regex-tester': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Regular Expressions (Regex) Tester</strong> represents an interactive sandbox to test pattern matching constructs in real-time.</p>
        <p>Configure matches, flags, replacement strings, and reveal index locations instantly inside a clean desktop environment.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Type your active regex pattern inside the compiler entry block (between the slashes).</li>
        <li>Choose modifiers: Global (g), Multiline (m), Case Insensitive (i), or DotAll (s).</li>
        <li>Insert test text into the test bed area to highlight matching string occurrences.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Stun-free execution: prevents infinite regex matching loops safely.</li>
        <li>Detailed lists displaying match text occurrences and capture groups.</li>
        <li>Features common presets: Email, URL, phone numbers, and HTML tags.</li>
      </ul>
    ),
    keywords: ["regex capture groups", "match highlighting regex", "regex cheatsheet presets", "interactive regex compiler"]
  },
  'uuid-generator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>UUID & GUID Generator</strong> is a bulk generation deck delivering random tokens conforming to RFC4122 specifications.</p>
        <p>Generate high-entropy Version 4 (Random) or Version 1 (Timestamp) identifier sequences for databases or token arrays.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Toggle standard versions: V4 (Random generation) vs V1 (Timestamp coordinate standard).</li>
        <li>Adjust the count slider to specify your bulk array length (from 1 to 100 codes).</li>
        <li>Choose options: hyphens separator toggle, case converter (lowercase vs UPPERCASE).</li>
        <li>Download the plain text file, or copy the entire list.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Creates standard 100% compliant RFC4122 token strings.</li>
        <li>Simplifies bulk generations without rate-limiting constraints.</li>
        <li>Direct save-to-text downloads simplify database seed configurations.</li>
      </ul>
    ),
    keywords: ["rfc4122 uuid generator", "bulk guid creator", "database seed uuid4", "high entropy random tokens"]
  },
  'hash-generator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Cryptographic Hash Generator</strong> computes string footprints using highly efficient subtle crypto APIs.</p>
        <p>Evaluate input text streams to output MD5 checksum, SHA-1 legacy signatures, SHA-256 modern digests, and SHA-512 robust hashes.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Write or paste your target payload strings into the entry textbox.</li>
        <li>Verify how text updates dynamically compile digests in real-time.</li>
        <li>Toggle UPPERCASE options, or copy the specific checksum keys.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Runs 100% locally in browser standard subtle cryptography layers.</li>
        <li>Outputs four different core hashing standards in a clean column screen.</li>
        <li>Verifies file authenticity, security passwords, or signature validation markers.</li>
      </ul>
    ),
    keywords: ["sha256 digest generator", "md5 checksum computation", "sha512 files comparison", "local secure crypto hashes"]
  },
  'url-encoder-decoder': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>URL / URI Percent Encoder & Decoder</strong> ensures that text strings and parameter objects are formatted safely for internet protocols.</p>
        <p>Prevent errors on query strings, transfer arguments with double-quotes, and easily decode back nested URL references.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Paste your raw URLs or encoded strings into the editor textbox.</li>
        <li>Choose space conversion rule configurations: %20 (RFC 3986) or + (Form encoding).</li>
        <li>Toggle mode redirects to convert back and forth rapidly.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Safeguards custom URLs containing unsafe symbols, emojis, and parameters.</li>
        <li>Ensures high compatibility with Web standards and API payloads.</li>
        <li>Helps diagnose decode faults through descriptive catch errors.</li>
      </ul>
    ),
    keywords: ["percent encoding schemes", "query string encoder", "decode url query parameters", "form post space conversion"]
  },
  'color-converter': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>RGB / HEX / HSL Color Converter & Palette Deck</strong> is a visually immersive workbench designed for UI developers.</p>
        <p>Inspect WCAG accessibility contrast ratios and generate tints or shades variations instantly.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Use sliders to adjust Hue, Saturation, Lightness, or Red, Green, and Blue channels.</li>
        <li>Click the preview color square to trigger native OS Eye-Dropper controls.</li>
        <li>Review WCAG AAA and AA ratings, and copy color values to CSS setups.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Includes real-time WCAG 2.1 accessibility ratings against black and white backdrops.</li>
        <li>Produces full tint (+20%) and shade (-20%) ranges with quick application triggers.</li>
        <li>Calculates CMYK print profile offsets.</li>
      </ul>
    ),
    keywords: ["wcag contrast check", "rgb hex hsl sliders", "material palette colors generator", "cmyk print profile converter"]
  },
  'jwt-decoder': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>JWT (JSON Web Token) Debugger</strong> parses signature and authorization claims safely.</p>
        <p>Evaluate expired states, check algorithm security headers, and examine deep payload properties instantly.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Paste your encrusted JWT string starting with eyJ... into the input deck.</li>
        <li>Review separate, elegantly-styled, color-coded Header and Payload panels.</li>
        <li>Analyze lifetime metadata including countdown indicators and signing algorithms.</li>
      </ol>
    ),
    benefits: [
        "Live countdown tracking expired hours and minutes.",
        "Colors match different parts of the raw JWT (Header: red, Payload: blue, Signature: orange).",
        "Handles unicode claims securely during base64 decoding."
      ],
    keywords: ["jwt decoding headers", "token expiration countdown", "debug authorization claims", "signing algorithms HS256 RS256"]
  },
  'fd-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Fixed Deposit (FD) Calculator</strong> helps conservative investors determine exactly how much interest they can earn on fixed deposit sums over a chosen maturity term.</p>
        <p>It supports flexible compounding schedules (monthly, quarterly, half-yearly, or annually) and provides clear, tax-aware interest details.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Enter your total initial Principal investment sum in the input field.</li>
        <li>Set the offered annual Interest Rate (percentage per annum).</li>
        <li>Select the duration of your deposit in years or months.</li>
        <li>Choose the preferred compounding frequency (typically quarterly or monthly).</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Supports monthly, quarterly, semi-annual, and annual compounding splits.</li>
        <li>Displays detailed maturity timelines and cumulative wealth visualizers.</li>
        <li>Helps contrast fixed-interest banking benefits against long-term inflation index curves.</li>
      </ul>
    ),
    keywords: ["fixed deposit interest compound", "fd rates maturity payout", "term deposit returns calculator", "banking fixed deposit wealth"]
  },
  'rd-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Recurring Deposit (RD) Calculator</strong> computes maturity amounts for systematic monthly term savings schemes.</p>
        <p>It is perfect for planning disciplined monthly contributions, detailing total capital deposits, total interest gained, and overall maturity gains.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Input your fixed monthly installment contribution.</li>
        <li>Adjust the expected yearly interest rate percentage.</li>
        <li>Determine the tenure of your deposit in years or months.</li>
        <li>Observe the growing interest curve as compounding accumulates regularly over your lifetime horizon.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Saves manual calculations of complex interest formulas (using quarterly compounding for standard RDs).</li>
        <li>Provides a clean, visual representation of capital vs interest earned.</li>
        <li>Perfect for building budget-friendly emergency savings funds or specific goal savings.</li>
      </ul>
    ),
    keywords: ["recurring deposit maturity", "rd interest wealth calculator", "monthly installment term returns", "displined emergency funds saving"]
  },
  'inflation-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Inflation & Purchasing Power Calculator</strong> measures how the changing price of goods over time affects the true purchasing power of currency.</p>
        <p>It helps you compute how much a specific sum in the past is worth today, or how much today’s money will be worth in the future under customizable rates.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Enter the starting asset/money amount you want to analyze.</li>
        <li>Choose your target time direction (calculate Future Value or Past Value).</li>
        <li>Set the average projected annual inflation rate (%).</li>
        <li>Determine the active years period to visualize purchasing power depreciation.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Unmasks the hidden cost of holding idle cash over long durations.</li>
        <li>Guides retirement planners by converting nominal values block to real purchasing power.</li>
        <li>Enables tracking of specific historical consumer price indexes (CPI) or custom estimations.</li>
      </ul>
    ),
    keywords: ["purchasing power index depreciation", "inflation cumulative cost cash", "future worth current assets", "historical cpi goods calculation"]
  },
  'retirement-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Retirement Corpus Planner</strong> maps out your financial path to a secure, comfortable post-career life.</p>
        <p>It factors in inflation, current assets, expected monthly post-retirement costs, and return rates to outline the ideal nest egg you need.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Specify your current age and target age of retirement.</li>
        <li>Input your expected monthly expenses in today's currency.</li>
        <li>Enter details of any currently accumulated retirement savings nest-eggs.</li>
        <li>Set rates for average yearly inflation, pre-retirement growth, and post-retirement safe withdrawals.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Delivers clear target net-worth goals adjusted specifically for future inflation.</li>
        <li>Calculates the precise amount you need to save each month leading up to retirement.</li>
        <li>Ensures peace of mind by showing if your current savings velocity is sufficient.</li>
      </ul>
    ),
    keywords: ["retirement wealth corpus calculator", "inflation adjusted retirement costs", "post retirement safe monthly withdrawals", "disciplined retirement nestegg planner"]
  },
  'break-even-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Break-Even Analysis Calculator</strong> identifies the precise threshold where business income exactly offsets operational expenses.</p>
        <p>Knowing this point helps small business owners, startups, and freelancers set minimum production quotas and evaluate profitability margins.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Enter your total fixed operating expenses (such as rent, payroll, utilities, and software).</li>
        <li>Input the individual variable costs incurred to produce or deliver a single units (e.g. materials, shipping).</li>
        <li>Specify the sale price of a single unit.</li>
        <li>Analyze the automatically calculated quantity of unit sales needed to achieve a net gain of zero.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Reveals direct sales thresholds in both unit count and total currency revenue.</li>
        <li>Interactive sliders let you run immediate "what-if" scenarios (lowering costs versus raising prices).</li>
        <li>Highlights margins of safety to prevent business losses.</li>
      </ul>
    ),
    keywords: ["break even point units quantity", "fixed variable pricing thresholds", "margins of safety sales cost", "freelancer startup business profitability"]
  },
  'profit-margin-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Gross & Net Profit Margin Calculator</strong> determines key business efficiency metrics based on sales, raw costs, and operating expenses.</p>
        <p>It calculates precise Gross Profit Margins, Net Profit Margins, Cost Markup Percentages, and Net Profit values instantly.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Select the calculation basis (Cost and Revenue/Price, or Direct numerical margins).</li>
        <li>Key in your raw product Cost of Goods Sold (COGS).</li>
        <li>Input your target Selling Price or general revenue.</li>
        <li>Incorporate auxiliary overhead, tax, or operating costs to extract net margins.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Helps set optimized price markup structures to safeguard product profit.</li>
        <li>Clearly separates gross margins (raw product profitability) and net margins (business profitability).</li>
        <li>Delivers instant copyable metrics to record in retail or e-commerce spreadsheets.</li>
      </ul>
    ),
    keywords: ["profit margin markup markup pricing", "gross profit net price", "cost of goods cogs ratio", "retail ecommerce pricing markup"]
  },
  'marks-percentage-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Marks Percentage Calculator</strong> provides a rapid, intuitive interface to compile academic grades, compute aggregate score percentages, and analyze coursework marks.</p>
        <p>Whether examining a single scorecard or a multi-subject report card, this tool helps translate raw points into percentages and letter grades conforming to recognized global benchmarks.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Under "Quick Marks converter", enter your Obtained Marks and scale (total possible marks) to receive your class percent and letter grade.</li>
        <li>To build a full coursework list, add custom fields in the "Multi-Subject Marksheet" table.</li>
        <li>Use the "Target Score Solver" to check what scores are needed in future coursework to hit your goal percentage.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Quickly tracks multi-assessment and multi-course records simultaneously.</li>
        <li>Identifies weak spots and tells you mathematically what future score to target.</li>
        <li>Handles dynamic grade-point conversions out of custom maximum scales.</li>
      </ul>
    ),
    keywords: ["test score calculator", "marks percentage finder", "grades converter", "cbse marks breakdown"]
  },
  'study-time-calculator': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Study Time Calculator</strong> calculates the daily study hour commitment required to cover your school syllabus without cramming before final examinations.</p>
        <p>Adding buffer time based on current confidence levels and chosen study ratios prevents academic fatigue.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Input the total number of chapters or syllabus topics you have left to study.</li>
        <li>Estimate the average hours needed to understand one topic from scratch.</li>
        <li>Set the countdown of physical days remaining.</li>
        <li>Choose a preparation depth preset and look at your targeted daily study hours.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Divides daunting syllabi into manageable checkmarked portions.</li>
        <li>Gives a prompt stress rating warning when study milestones require scaling.</li>
        <li>Provides a structured schedule recommending focus and break sessions.</li>
      </ul>
    ),
    keywords: ["study schedule planner", "revision time calculator", "exam prep estimator", "weekly homework scheduler"]
  },
  'exam-countdown': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Exam Countdown & Checklist</strong> is an interactive exam planner that shows running days, hours, and seconds remaining until deadlines, paired with core tasks lists.</p>
        <p>Keeping a countdown keeps students in healthy momentum to cover final modules.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Input the Subject name, Choose active dates and scheduled hours.</li>
        <li>Click "Add" to publish a real-time tracking panel on your page.</li>
        <li>Check off completed topics using the embedded checklist.</li>
        <li>Remove cards using the trash icon once exams are finalized.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Visual color-coded cards prioritize highest urgency exams.</li>
        <li>Ticks live countdown seconds synchronously without refresh.</li>
        <li>Saves all custom deadlines seamlessly in local storage.</li>
      </ul>
    ),
    keywords: ["exam timer countdown", "school test checklists", "revision schedule", "deadline manager localstorage"]
  },
  'gpa-planner': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>GPA Graduation Planner</strong> determines the exact future semester average grade required to lift your cumulative CGPA or GPA to a target graduation classification.</p>
        <p>Calculates credit-weighted targets to ensure accuracy for global models.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Select either Scale 4.0 or Scale 10.0 to match your grading scale.</li>
        <li>Enter your current average GPA and total credits completed to date.</li>
        <li>Set your target graduation GPA goal.</li>
        <li>Provide the remaining credit hours left in your course catalog.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Solves credit weight differentials so complex semesters align properly.</li>
        <li>Flags mathematically impossible targets with clear recommendations.</li>
        <li>Provides a visual assessment scale of active stress and feasibility.</li>
      </ul>
    ),
    keywords: ["required sgpa calculator", "gpa planner graduation", "target cgpa solver", "academic honors planner"]
  },
  'semester-grade-predictor': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Semester Grade Predictor</strong> utilizes assessment weight breakdowns to trace your running average and simulate what score you need on final exams.</p>
        <p>Using interactive sliders makes discovering grade thresholds fast and visual.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Input current test weights, quizzes, labs, and assignments under Course Breakdowns.</li>
        <li>Toggle tasks between completed status to simulate future exams.</li>
        <li>Slide the simulator bar to predict final grades in real time.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Calculates exact thresholds to secure an A, B, or C class.</li>
        <li>Updates scores live as you modify weights out of 100%.</li>
        <li>Reduces end-of-semester stress by clarifying target requirements.</li>
      </ul>
    ),
    keywords: ["final exam grade scale", "what if grade simulator", "course marks predictor", "semester grade weightage"]
  },
  'pomodoro-timer': {
    explanation: (
      <div className="space-y-4">
        <p>The <strong>Focus Pomodoro Timer</strong> pairs traditional time-blocking rules with soundbell chimes and interactive tasks lists to maintain concentration.</p>
        <p>Perfect for long study sessions and exam preparation weeks.</p>
      </div>
    ),
    howToUse: (
      <ol className="list-decimal pl-6 space-y-2">
        <li>Choose a mode: Focus (25m), Short Break (5m), or Long Break (15m).</li>
        <li>Click "Start Focus" to trigger the circular tick progress rings.</li>
        <li>Tweak intervals manually using the sliders on the settings card.</li>
        <li>Create mission milestones in your Tasklist to solve study goals.</li>
      </ol>
    ),
    benefits: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Web Audio API triggers friendly alarm tones when tasks finish.</li>
        <li>Tracks your day's completed focus streaks on the dashboard.</li>
        <li>Integrates checklist goals alongside active timer dials.</li>
      </ul>
    ),
    keywords: ["study pomodoro clock", "25 5 timer chime", "focus intervals tasks", "browser sound timer alarm"]
  }
};
