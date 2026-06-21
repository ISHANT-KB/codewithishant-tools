export interface Tool {
  id: string;
  name: string;
  slug: string; // e.g. 'age-calculator'
  path: string; // e.g. '/tools/age-calculator'
  description: string;
  category: 'calculators' | 'converters' | 'devtools' | 'text' | 'seo';
  icon: string; // key of lucide-react icon
  popular?: boolean;
}

export interface Blog {
  title: string;
  slug: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface MetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  structuredData?: Record<string, any>[];
}
