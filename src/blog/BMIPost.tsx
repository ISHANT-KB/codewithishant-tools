import { blogs } from '../lib/blogs';
import Breadcrumb from '../components/Breadcrumb';
import SEOSection from '../components/SEOSection';
import { ArrowLeft, BookOpen, Clock, Calendar, User, Heart } from 'lucide-react';
import { Link } from '../lib/router';

export default function BMIPost() {
  const meta = blogs.find((b) => b.slug === 'how-to-calculate-bmi')!;

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-8 px-4 sm:px-6 lg:px-8" id="blog-post-bmi">
      <SEOSection
        title={meta.title}
        description={meta.description}
        keywords={["bmi calculation", "body mass index math", "how to calculate bmi", "who weight status"]}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": meta.title,
            "description": meta.description,
            "datePublished": "2026-06-15",
            "author": {
              "@type": "Person",
              "name": meta.author,
            },
          }
        ]}
      />

      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-850 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
        <Breadcrumb items={[{ name: 'Blogs', path: '/blogs' }, { name: 'How to Calculate BMI', path: '/blog/how-to-calculate-bmi' }]} />

        {/* Header Block editorial aesthetic */}
        <header className="space-y-4 border-b border-slate-150 dark:border-slate-800/80 pb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500 hover:underline" id="back-to-tools-btn">
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
          <p className="text-base sm:text-lg font-medium text-slate-850 dark:text-slate-200">
            Maintaining a healthy body weight is one of the most proactive steps you can take for long-term health. But how do we define "healthy" on a broader mathematical scale? This is where the Body Mass Index, or BMI, plays a foundational role in epidemiology and clinical wellness metrics.
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-8">
            The History and Mathematics of BMI
          </h2>
          <p>
            The Body Mass Index was originally developed in the early 19th century by a Belgian statistician named Adolphe Quetelet. His goal was not to measure individual medical wellness, but to model the physical demographics of broad populations. For this reason, it is sometimes referred to as the <em>Quetelet Index</em>.
          </p>
          <p>
            Mathematically, BMI measures a person's mass in relation to their height. This provides an aggregate categorization benchmark that indexes tissue mass (muscle, fat, bone) relative to body stature.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6">
            1. The Metric Formula (Standard WHO Reference)
          </h3>
          <p>
            In the International System of Units (SI), the math is extremely direct:
          </p>
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 rounded-xl p-5 text-center font-mono text-sm font-bold shadow-inner">
            <span className="text-emerald-600 dark:text-emerald-400">BMI = Weight (kg) / [Height (m)]²</span>
          </div>
          <p>
            For example, let's calculate the BMI of an adult who weighs 70 kilograms and stands 175 centimeters (1.75 meters) tall:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Height squared: 1.75 × 1.75 = 3.0625</li>
            <li>Portion ratio: 70 / 3.0625 = 22.86</li>
            <li>Calculated BMI: <strong>22.9</strong> (Normal Range)</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6">
            2. The Imperial Formula
          </h3>
          <p>
            When using pounds and feet/inches, we incorporate a conversion factor (703) to align with standard metrics:
          </p>
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 rounded-xl p-5 text-center font-mono text-sm font-bold shadow-inner border-dashed">
            <span className="text-indigo-600 dark:text-indigo-400">BMI = [Weight (lbs) / [Height (inches)]²] × 703</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-8">
            World Health Organization (WHO) Classifications
          </h2>
          <p>
            For adults aged 20 and over, BMI is classified into general fitness brackets which correlate to proportional health risks:
          </p>

          <div className="overflow-x-auto border border-slate-150 dark:border-slate-800 rounded-xl">
            <table className="min-w-full divide-y divide-slate-150 dark:divide-slate-800 text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/40">
                <tr>
                  <th className="px-6 py-3 text-left font-bold text-xs uppercase text-slate-500">BMI Range</th>
                  <th className="px-6 py-3 text-left font-bold text-xs uppercase text-slate-500">Weight Status</th>
                  <th className="px-6 py-3 text-left font-bold text-xs uppercase text-slate-500">Health Association</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 dark:divide-slate-800">
                <tr>
                  <td className="px-6 py-4 font-mono">Below 18.5</td>
                  <td className="px-6 py-4 text-blue-500 font-semibold">Underweight</td>
                  <td className="px-6 py-4">Low tissue mass, nutrition support recommended</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono">18.5 – 24.9</td>
                  <td className="px-6 py-4 text-emerald-500 font-semibold">Normal Weight</td>
                  <td className="px-6 py-4">Healthy proportion, lowest relative risk</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono">25.0 – 29.9</td>
                  <td className="px-6 py-4 text-amber-500 font-semibold">Overweight</td>
                  <td className="px-6 py-4">Moderately elevated stress on joints, organs</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono">30.0 and Above</td>
                  <td className="px-6 py-4 text-rose-500 font-semibold">Obese</td>
                  <td className="px-6 py-4">Significantly elevated risk factor profile</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-8">
            Important Clinical Caveats of BMI
          </h2>
          <p>
            While BMI is an outstanding quick screening indicator, it is not a direct measure of body fat percentages:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Muscle Density:</strong> Muscle is significantly denser than fat tissue. Highly-fit athletes and bodybuilders may have high BMIs which register as Overweight or Obese simply because of their high ratio of lean muscular mass.</li>
            <li><strong>Age Factors:</strong> Elderly individuals naturally lose muscular volume over time (sarcopenia). Consequently, they may have a "Normal" BMI but actually carry extremely high body fat proportions.</li>
            <li><strong>Fat Distribution:</strong> BMI does not record <em>where</em> fat is carried. Visceral fat (abdominal surrounding internal vital organs) represents a distinct, higher health hazard compared to subcutaneous fat.</li>
          </ul>

          <p className="pt-4 text-slate-500 text-xs italic">
            Disclaimer: The materials provided above are purely informational. Any major nutritional, health, or workout alterations should be reviewed with certified medical practitioners.
          </p>
        </section>

        {/* Call to action section */}
        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-500/10 text-center flex flex-col items-center">
          <Heart className="w-8 h-8 text-emerald-500 mb-2 animate-bounce" />
          <h4 className="font-bold text-slate-900 dark:text-white">Ready to Compute Your Weight Class?</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-lg">
            Use our interactive WHO classification calculator to calculate your precise BMI on metric and imperial grids instantly.
          </p>
          <Link href="/tools/bmi-calculator" className="mt-4 px-5 py-2.5 bg-slate-950 dark:bg-emerald-500 text-white dark:text-slate-950 font-semibold rounded-xl text-xs hover:opacity-90 transition-colors" id="goto-bmi-cal-btn">
            Open Free BMI Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}
