import { blogs } from '../lib/blogs';
import Breadcrumb from '../components/Breadcrumb';
import SEOSection from '../components/SEOSection';
import { ArrowLeft, Percent, Clock, Calendar, User } from 'lucide-react';
import { Link } from '../lib/router';

export default function PercentagePost() {
  const meta = blogs.find((b) => b.slug === 'percentage-calculator-explained')!;

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-8 px-4 sm:px-6 lg:px-8" id="blog-post-pct">
      <SEOSection
        title={meta.title}
        description={meta.description}
        keywords={["how to calculate percentages", "percentage ratio math", "financial increase formulas", "discount calculations"]}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": meta.title,
            "description": meta.description,
            "datePublished": "2026-06-10",
            "author": {
              "@type": "Person",
              "name": meta.author,
            },
          }
        ]}
      />

      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-850 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
        <Breadcrumb items={[{ name: 'Blogs', path: '/blogs' }, { name: 'Percentage Explained', path: '/blog/percentage-calculator-explained' }]} />

        {/* Header Block editorial aesthetic */}
        <header className="space-y-4 border-b border-slate-150 dark:border-slate-800/80 pb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500 hover:underline" id="back-to-tools-btn-pct">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Tools Desk</span>
          </Link>
          <span className="block text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {meta.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight text-slate-900 dark:text-white">
            {meta.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 items-center">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>By {meta.author}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{meta.date}</span>
            </span>
            <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]">
              <Clock className="w-3 h-3" />
              <span>{meta.readTime}</span>
            </span>
          </div>
        </header>

        {/* Content sections (Editorial Prose) */}
        <section className="prose prose-slate dark:prose-invert max-w-none text-slate-650 dark:text-slate-300 leading-relaxed space-y-6">
          <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 font-sans">
            Whether you are analyzing quarterly sales metrics, computing discounts while shopping, or determining raw tips at a restaurant, percentages are the most ubiquitous mathematical standard in everyday commerce. 
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-8">
            What literally is a Percentage?
          </h2>
          <p>
            The term "percent" breaks down into Latin origins: <em>per</em> (by) and <em>centum</em> (hundred). In essence, a percentage is a fraction or ratio expressed with a denominator of exactly 100. It normalizes statistical fractions so they can be easily compared.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6">
            1. Core Scenario: Finding the Portion of a Whole
          </h3>
          <p>
            This is the standard question: "What is 15% of 200?"
          </p>
          <p className="font-mono text-xs bg-slate-50 dark:bg-slate-950 p-4 border rounded-xl">
            Formula: Value = (Percentage / 100) × Whole <br />
            Math: (15 / 100) × 200 = 0.15 × 200 = 30
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6">
            2. Scenario Two: Finding the Percentage Ratio
          </h3>
          <p>
            Answering the question: "30 is what percent of 150?"
          </p>
          <p className="font-mono text-xs bg-slate-50 dark:bg-slate-950 p-4 border rounded-xl">
            Formula: Percentage = (Portion / Whole) × 100 <br />
            Math: (30 / 150) × 100 = 0.2 × 100 = 20%
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6">
            3. Scenario Three: Calculating Change (Increase / Decrease)
          </h3>
          <p>
            When prices rise or populations shift, we measure the relative trend: "What is percentage increase from 50 to 80?"
          </p>
          <p className="font-mono text-xs bg-slate-50 dark:bg-slate-950 p-4 border rounded-xl">
            Step A (Difference): New Value - Old Value (e.g., 80 - 50 = 30) <br />
            Step B (Scale): (Difference / Old Value) × 100 (e.g., (30 / 50) × 100 = 60%)
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-8">
            Why percentages are often visually misleading
          </h2>
          <p>
            In visual marketing, companies often exploit compounding percentage directions. For example, if a investment drops in value by 50% on Monday, it does not only require a 50% recovery on Tuesday to return to its original benchmark. It actually requires a <strong>100% increase</strong>!
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Start value: $100</li>
            <li>After 50% drop: $50</li>
            <li>To recover to $100, the addition is $50. $50 is 100% of the active $50 value!</li>
          </ul>

        </section>

        {/* Call to action section */}
        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-500/10 text-center flex flex-col items-center">
          <Percent className="w-8 h-8 text-emerald-500 mb-2" />
          <h4 className="font-bold text-slate-900 dark:text-white">Perform Zero-Error Percentage calculations</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-lg">
            Avoid accounting or math mistakes. Use our complete interactive percentage module for ratios, discount factors, increases and decimal proportions.
          </p>
          <Link href="/tools/percentage-calculator" className="mt-4 px-5 py-2.5 bg-slate-950 dark:bg-emerald-500 text-white dark:text-slate-950 font-semibold rounded-xl text-xs hover:opacity-90 transition-colors" id="goto-pct-cal-btn">
            Open Free Percentage Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}
