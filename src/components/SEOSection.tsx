import { useEffect } from 'react';
import { MetadataProps } from '../types';

export default function SEOSection({
  title,
  description,
  keywords = [],
  ogImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
  structuredData = []
}: MetadataProps) {
  useEffect(() => {
    // Determine the user-facing site title
    const siteTitle = title.includes("UtilityHub") || title.includes("Calculators")
      ? title
      : `${title} | UtilityHub Free Offline Tools`;

    document.title = siteTitle;

    // Select the best image category for maximum social click-through-rates (CTR)
    const selectCtrImage = (): string => {
      if (ogImage && ogImage !== "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200") {
        return ogImage;
      }

      const lowerTitle = title.toLowerCase();
      const lowerDesc = description.toLowerCase();
      const lowerPath = window.location.pathname.toLowerCase();

      // 1. Finance & Investment (SIP, Loan, Interest, FD, RD, Tax, GST, Break Even, Profit, etc)
      if (
        lowerPath.includes('emi') ||
        lowerPath.includes('interest') ||
        lowerPath.includes('sip') ||
        lowerPath.includes('fd') ||
        lowerPath.includes('rd') ||
        lowerPath.includes('retirement') ||
        lowerPath.includes('inflation') ||
        lowerPath.includes('break-even') ||
        lowerPath.includes('profit') ||
        lowerPath.includes('tax') ||
        lowerPath.includes('gst') ||
        lowerTitle.includes('loan') ||
        lowerTitle.includes('interest') ||
        lowerTitle.includes('tax') ||
        lowerTitle.includes('finance') ||
        lowerTitle.includes('earnings') ||
        lowerDesc.includes('finance') ||
        lowerDesc.includes('investment')
      ) {
        return "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop";
      }

      // 2. Birthday & Age Calculation
      if (lowerPath.includes('age') || lowerTitle.includes('age') || lowerTitle.includes('birthday')) {
        return "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop";
      }

      // 3. BMI & Fitness / Health Metrics
      if (lowerPath.includes('bmi') || lowerTitle.includes('bmi') || lowerTitle.includes('health') || lowerTitle.includes('body mass')) {
        return "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop";
      }

      // 4. Developer Tools, Formatter, Validator, Password, Hash, URL, JWT, Cryptography
      if (
        lowerPath.includes('json') ||
        lowerPath.includes('regex') ||
        lowerPath.includes('base64') ||
        lowerPath.includes('jwt') ||
        lowerPath.includes('uuid') ||
        lowerPath.includes('hash') ||
        lowerPath.includes('password') ||
        lowerPath.includes('url') ||
        lowerPath.includes('color') ||
        lowerTitle.includes('json') ||
        lowerTitle.includes('developer') ||
        lowerTitle.includes('regex') ||
        lowerTitle.includes('base64') ||
        lowerTitle.includes('password') ||
        lowerTitle.includes('encoder') ||
        lowerTitle.includes('decoder') ||
        lowerTitle.includes('converter') && (lowerTitle.includes('color') || lowerTitle.includes('hex'))
      ) {
        return "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop";
      }

      // 5. Scientific, General Math, & Percentages
      if (
        lowerPath.includes('percentage') ||
        lowerPath.includes('scientific') ||
        lowerTitle.includes('percentage') ||
        lowerTitle.includes('fraction') ||
        lowerTitle.includes('scientific') ||
        lowerTitle.includes('calculator') && (lowerTitle.includes('math') || lowerTitle.includes('grade'))
      ) {
        return "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop";
      }

      // 6. Time, Pomodoro Timer & Calendars / Countdowns
      if (
        lowerPath.includes('pomo') ||
        lowerPath.includes('study') ||
        lowerPath.includes('exam') ||
        lowerPath.includes('countdown') ||
        lowerTitle.includes('pomodoro') ||
        lowerTitle.includes('timer') ||
        lowerTitle.includes('study time') ||
        lowerTitle.includes('countdown')
      ) {
        return "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200&auto=format&fit=crop";
      }

      // 7. Academic GPA, CGPA Planning & Attendance predicting
      if (
        lowerPath.includes('gpa') ||
        lowerPath.includes('cgpa') ||
        lowerPath.includes('attendance') ||
        lowerPath.includes('semester') ||
        lowerTitle.includes('gpa') ||
        lowerTitle.includes('cgpa') ||
        lowerTitle.includes('attendance') ||
        lowerTitle.includes('grade') ||
        lowerTitle.includes('academic') ||
        lowerTitle.includes('student')
      ) {
        return "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop";
      }

      // 8. Search Engine Optimization (Sitemaps, Metatags, Metadata)
      if (
        lowerPath.includes('sitemap') ||
        lowerPath.includes('meta-tag') ||
        lowerPath.includes('seo') ||
        lowerTitle.includes('sitemap') ||
        lowerTitle.includes('seo') ||
        lowerTitle.includes('meta tag')
      ) {
        return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop";
      }

      // 9. Physical Unit Converters (Length, Mass, Temperature, Memory, Storage)
      if (
        lowerPath.includes('converter') ||
        lowerPath.includes('length') ||
        lowerPath.includes('temperature') ||
        lowerPath.includes('storage') ||
        lowerTitle.includes('converter') ||
        lowerTitle.includes('ruler') ||
        lowerTitle.includes('scale') ||
        lowerTitle.includes('metric')
      ) {
        return "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=1200&auto=format&fit=crop";
      }

      // 10. Word processing & counters
      if (
        lowerPath.includes('word') ||
        lowerPath.includes('text') ||
        lowerTitle.includes('word') ||
        lowerTitle.includes('text') ||
        lowerTitle.includes('counter')
      ) {
        return "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop";
      }

      return ogImage;
    };

    const finalImage = selectCtrImage();

    // Helper to find or create meta tag
    const updateMeta = (nameAttr: string, valueAttr: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${valueAttr}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, valueAttr);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard metadata updates
    updateMeta('name', 'description', description);
    if (keywords.length > 0) {
      updateMeta('name', 'keywords', keywords.join(', '));
    }

    // OpenGraph dynamic synchronization
    updateMeta('property', 'og:title', siteTitle);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:image', finalImage);
    updateMeta('property', 'og:url', window.location.href);
    updateMeta('property', 'og:type', 'website');
    updateMeta('property', 'og:site_name', 'UtilityHub Free Offline Tools');
    updateMeta('property', 'og:locale', 'en_US');

    // Twitter card synchronization
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', siteTitle);
    updateMeta('name', 'twitter:description', description);
    updateMeta('name', 'twitter:image', finalImage);
    updateMeta('name', 'twitter:site', '@utilityhub');
    updateMeta('name', 'twitter:creator', '@utilityhub');

    // Dynamic Rel="Canonical" Link Synchronizer (Requirement 1 & 7)
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', window.location.href);

  }, [title, description, keywords, ogImage]);

  // Inject general organization and website schemas into the document body or return scripted tags
  const defaultWebsiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "UtilityHub Tools Suite",
    "url": window.location.origin,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${window.location.origin}/?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const defaultOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "UtilityHub",
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo.png`,
    "sameAs": [
      "https://github.com/utilityhub",
      "https://twitter.com/utilityhub"
    ]
  };

  const allSchemas = [
    defaultWebsiteSchema,
    defaultOrganizationSchema,
    ...structuredData
  ];

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
