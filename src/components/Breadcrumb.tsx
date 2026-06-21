import { BreadcrumbItem } from '../types';
import { Link } from '../lib/router';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // Construct Schema.org JSON-LD for breadcrumbs
  const schemaList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": window.location.origin,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": `${window.location.origin}${item.path}`,
      })),
    ],
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-6 py-2" aria-label="Breadcrumb">
      {/* JSON-LD breadcrumb registration */}
      <script type="application/ld+json">
        {JSON.stringify(schemaList)}
      </script>

      <Link href="/" className="flex items-center gap-1 hover:text-emerald-500 transition-colors" id="bc-home-link">
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={item.path} className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700" />
            {isLast ? (
              <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[200px]" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-emerald-500 transition-colors truncate max-w-[150px]" id={`bc-link-${idx}`}>
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
