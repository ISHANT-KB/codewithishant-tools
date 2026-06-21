import { useState } from 'react';
import { FAQItem } from '../types';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  description?: string;
}

export default function FAQSection({
  items,
  title = "Frequently Asked Questions",
  description = "Get expert answers to common queries regarding calculations, accuracy, and operational details about this tool."
}: FAQSectionProps) {
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({ 0: true });

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Construct JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-10" id="faq-section">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      <div className="max-w-3xl mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-emerald-500" />
          {title}
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
          {description}
        </p>
      </div>

      <div className="space-y-4 max-w-4xl">
        {items.map((item, index) => {
          const isOpen = !!openIndexes[index];
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-200"
              id={`faq-item-${index}`}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between p-5 text-left font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                onClick={() => toggleIndex(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-btn-${index}`}
              >
                <span className="pr-4 text-base">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-btn-${index}`}
                className={`transition-all duration-200 overflow-hidden ${
                  isOpen ? 'max-h-96 opacity-100 border-t border-slate-100 dark:border-slate-800/80' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
