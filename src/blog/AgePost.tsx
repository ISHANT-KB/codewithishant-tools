import { blogs } from '../lib/blogs';
import Breadcrumb from '../components/Breadcrumb';
import SEOSection from '../components/SEOSection';
import { ArrowLeft, Hourglass, Clock, Calendar, User, Compass } from 'lucide-react';
import { Link } from '../lib/router';

export default function AgePost() {
  const meta = blogs.find((b) => b.slug === 'best-age-calculator-guide')!;

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-8 px-4 sm:px-6 lg:px-8" id="blog-post-age">
      <SEOSection
        title={meta.title}
        description={meta.description}
        keywords={["exact age calculations", "leap year calendar math", "time zone counters", "how to calculate physical age"]}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": meta.title,
            "description": meta.description,
            "datePublished": "2026-06-12",
            "author": {
              "@type": "Person",
              "name": meta.author,
            },
          }
        ]}
      />

      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-850 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
        <Breadcrumb items={[{ name: 'Blogs', path: '/blogs' }, { name: 'Age Calculator Guide', path: '/blog/best-age-calculator-guide' }]} />

        {/* Header Block editorial aesthetic */}
        <header className="space-y-4 border-b border-slate-150 dark:border-slate-800/80 pb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500 hover:underline" id="back-to-tools-btn-age">
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
          <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200">
            A person’s age is much more than a simple counting of birthdays. It is an index of rotations around the sun—a ticking counter that, depending on your frame of reference, spans celestial variables, calendrical transitions, and physical leaps.
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-8">
            How exact is calendar math?
          </h2>
          <p>
            You might assume that calculating your age is a trivial subtraction check: target year minus birth year. However, due to astronomical variations, precise chronological counting requires robust logical handling.
          </p>
          <p>
            The Gregorian calendar (the standard civil calendar today) defines a standard year as 365 days. But the Earth actually requires approximately <strong>365.2422 days</strong> to finish a full orbit surrounding the Sun. To correct this cumulative discrepancy, we insert a "Leap Day" (February 29) every four years. Failing to track which years are leap years can lead to error offsets when converting your exact life span to total days or hours.
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-8">
            The Algorithmic Steps for Subtracting Dates
          </h2>
          <p>
            When coding age, compilers must sequentially evaluate months, days, and years while accounting for varying monthly lengths (e.g., February with 28/29 days, April with 30, and May with 31):
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Year Subtraction:</strong> Initial estimate equals target year minus birth year.</li>
            <li><strong>Month Review:</strong> If the target month occurs before the birth month, deduct 1 year and add 12 months to the monthly remainder index.</li>
            <li><strong>Day Assessment:</strong> If the target date of the current month falls before the birth day, deduct 1 month and add the total days in the previous month to the day remainder. This handles precise calendar shifts.</li>
          </ol>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-8">
            Different Cultural Calendar Perspectives
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>East Asian Age Reckoning:</strong> Historically practiced in China, Korea, and Japan, a newborn child is considered 1 year old at the moment of birth. Additionally, they increment their age status not on their birthday, but on New Year's Day (either Lunar or Solar). This means a baby born on December 31st could turn 2 years old on January 1st, despite only being alive for a single day!</li>
            <li><strong>Hijri Calendar:</strong> This Islamic calendar consists of 12 lunar months in a year of 354 or 355 days. Because a lunar year is shorter than a solar year by roughly 11 days,Hijri ages accrue faster relative to solar timelines.</li>
          </ul>

        </section>

        {/* Call to action section */}
        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-500/10 text-center flex flex-col items-center">
          <Hourglass className="w-8 h-8 text-emerald-500 mb-2" />
          <h4 className="font-bold text-slate-900 dark:text-white">Calculate Your Precision Age Down to Minutes</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-lg">
            Our microsecond-capable calculation core tracks leap years, months, days, minutes, and days remaining until your next celebration!
          </p>
          <Link href="/tools/age-calculator" className="mt-4 px-5 py-2.5 bg-slate-950 dark:bg-emerald-500 text-white dark:text-slate-950 font-semibold rounded-xl text-xs hover:opacity-90 transition-colors" id="goto-age-cal-btn">
            Open Free Age Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}
