import { FAQItem } from '../types';

export const faqs: Record<string, FAQItem[]> = {
  'age-calculator': [
    {
      question: "How exact is this Age Calculator?",
      answer: "The calculations are 100% mathematically exact down to the second. It compares chronological date intervals using standard native system clocks and directly accounts for astronomical leaps, variable month counts, and localized timestamp shifts."
    },
    {
      question: "Does it consider Leap Years?",
      answer: "Yes, our algorithm evaluates standard leap periods. When converting elapsed time to total days, milliseconds, or hours, any February 29th that falls between your date of birth and the target tracking date is calculated and factored in."
    },
    {
      question: "Is my personal birth date secure?",
      answer: "Absolutely. All processing occurs entirely locally inside your client-side browser runtime space. No age, DOB, or birth time metadata is ever transmitted to remote databases, APIs, clusters, or external telemetry nodes."
    },
    {
      question: "Can I use this to calculate chronological intervals for contracts?",
      answer: "Yes! By entering the contract start date in the Date of Birth field and the expiration boundary in the Target Date slot, the tool operates as a high-precision contract or lease duration analyzer."
    }
  ],
  'bmi-calculator': [
    {
      question: "What is healthy BMI range for adults?",
      answer: "According to standard WHO guidelines, a Body Mass Index result between 18.5 and 24.9 indicates normal or optimal proportional fitness. Braces below 18.5 represent underweight ranges, 25.0 to 29.9 denote overweight status, and 30.0+ classifies obesity."
    },
    {
      question: "Why does BMI separate metric and imperial formulas?",
      answer: "Metric uses direct decimals (kg/m²), but imperial calculations use a scaling factor (703) to align mass in pounds and height in square inches. Our tool supports both seamless tabs so you don't need manual conversions."
    },
    {
      question: "Is BMI a reliable healthy indicator for muscular athletes?",
      answer: "No, BMI can occasionally show errors for highly developed athletes or weightlifters. Because muscle is denser than fat tissue, heavy muscular structures register as high BMI values, meaning a bodybuilder might be categorized as overweight despite having low body fat percentages."
    },
    {
      question: "How often should I recalculate my Body Mass Index?",
      answer: "Revisiting or recalculating once every 1 to 3 months when reviewing athletic progression, dietary programs, metabolic health changes, or progressive gym targets is highly recommended."
    }
  ],
  'percentage-calculator': [
    {
      question: "What is percentage math?",
      answer: "A percentage expresses fractions as values relative to 100. It is a highly robust method to normalize indices so that rates of growth, sale savings, finance rates, and proportions are readily scannable."
    },
    {
      question: "How does the percentage change calculator work?",
      answer: "It measures the difference between target values and starting coordinates, divides that gap by the original baseline value, and multiplies by 100 to yield a clean positive (increase) or negative (decrease) percentage value."
    },
    {
      question: "Can I calculate sales discounts or GST percentages here?",
      answer: "Yes! Use Section 1 to extract direct percentages (e.g., finding a 15% discount on $200), or Section 3 to discover overall markup scales from base expenses."
    }
  ],
  'loan-emi-calculator': [
    {
      question: "What does EMI stand for?",
      answer: "EMI is an acronym for Equated Monthly Installments. It represents a flat recurring payment amount that borrowers pay to lenders on a fixed monthly date to fully settle loan contracts over a specified tenure."
    },
    {
      question: "How is the Equated Monthly Installment computed?",
      answer: "It uses an amortized annuity formula: EMI = [P * r * (1+r)^n] / [(1+r)^n - 1], where P is Principal, r represents monthly interest percentages, and n denotes total payments (years multiplied by 12)."
    },
    {
      question: "Can I use this calculator for car, home, or personal loans?",
      answer: "Our loan calculator is fully universal and handles any form of flat-rate amortized lending, including home mortgages, automobile finances, personal cash loans, or credit consolidations."
    }
  ],
  'scientific-calculator': [
    {
      question: "What functions are supported on this Scientific Calculator?",
      answer: "It supports standard operations (+, -, *, /) along with trigonometry (sin, cos, tan), logarithmic indices (log, ln), exponents (^), square roots (√), constants (pi, e), modular changes (mod), fractions, and parentheses grouping."
    },
    {
      question: "Does it evaluate calculations in degree or radian modes?",
      answer: "The evaluation engine leverages native JS Math, which computes trigonometry (Math.sin, etc.) in radians. If feeding in degree markers, multiply them by Math.PI / 180 before inputting."
    },
    {
      question: "Does it preserve mathematical order of operations?",
      answer: "Yes, calculations follow absolute algebraic priorities (PEMDAS/BODMAS) prioritizing parentheses brackets, calculations, exponents, multiplications/divisions, and additions/subtractions."
    }
  ],
  'length-converter': [
    {
      question: "How does the Length Unit Converter work?",
      answer: "It uses a standardized meter baseline. When you input any metric or imperial length, it maps that input to its meter equivalent and scale-offsets other rows instantly."
    },
    {
      question: "What systems of measurement are supported?",
      answer: "It integrates standard European Metric heights (millimeters, centimeters, meters, kilometers) and British/American Imperial gauges (inches, feet, yards, miles)."
    }
  ],
  'password-generator': [
    {
      question: "Are these passwords generated on a remote server?",
      answer: "No! All generations are triggered using cryptographically secure native client APIs (window.crypto.getRandomValues) directly in your active browser sandbox. No strings are ever logged, cached, or uploaded."
    },
    {
      question: "What contributes to high password security?",
      answer: "Strength comes primarily from structural length and character diversity. An elite standard password should contain at least 14 characters mixing symbols, numerals, and cases."
    }
  ],
  'word-counter': [
    {
      question: "How is estimated reading speed determined?",
      answer: "It divides the total word count of the pasted article by 200 (the standard average reading speed in words per minute for most adults)."
    },
    {
      question: "Does it filter out filler words in density analytics?",
      answer: "Yes, it strips common short terms (such as 'the', 'is', 'a', 'to', 'for', 'and') under 3 letters so that real semantic terms and actual marketing keywords are tracked properly."
    }
  ],
  'meta-tag-generator': [
    {
      question: "Where should I copy-paste these metadata results?",
      answer: "These compiled HTML tags should be pasted completely inside the <head> tags of your website's main index.html or layout templates."
    },
    {
      question: "How does OpenGraph metadata help web search?",
      answer: "Facebook, LinkedIn, and Slack parse OG metadata tags to render elegant rich visual cards (thumbnails, authors, headings) when users share your links."
    }
  ],
  'freelance-rate-calculator': [
    {
      question: "Why can't I just divide my target salary by 2,000 hours?",
      answer: "A standard employee works about 2,000 hours, but a freelancer must handle admin work, invoicing, drafting proposals, and promotion. Typically, only 50-60% of your time is billable. Plus, you must fund your own healthcare and software subscriptions."
    },
    {
      question: "Should I charge hourly or value-based prices?",
      answer: "Calculating your minimum hourly rate sets a baseline. For simple jobs, hourly billing works well. For custom corporate solutions, value-based flat rates are generally superior."
    }
  ],
  'youtube-earnings-calculator': [
    {
      question: "What is the difference between CPM and RPM?",
      answer: "CPM is the Cost Per Mille, which is the total price advertisers pay to show ads on your channel. RPM is your Revenue Per Mille, reflecting the actual money you receive per 1,000 video views after YouTube's platform split and secondary fees have been deducted."
    },
    {
      question: "How can I increase my channel's average RPM?",
      answer: "You can increase RPM by covering high-value commercial subjects (like finance, real estate, coding, or insurance), targeting Western audiences (US, UK, Canada), and producing longer videos (8+ mins) to insert mid-roll ads."
    }
  ],
  'upi-emi-calculator': [
    {
      question: "Why do some UPI Pay Later options have higher interest rates?",
      answer: "Micro-credit pay later lenders approve loans instantly with minimal credit scoring. To offset this high lending risk, they charge higher annualized percentage rates (ranging from 18% to 36% p.a.) compared to traditional bank loans."
    },
    {
      question: "Are there extra GST charges on Pay Later processing fees?",
      answer: "Yes, in India a statutory 18% Goods & Services Tax (GST) is applied directly to any loan processing fees, late fees, or administrative checkout surcharges."
    }
  ],
  'indian-income-tax-calculator': [
    {
      question: "Which Indian tax regime is better for me?",
      answer: "It depends completely on your investments. If you claim high exemptions (HRA, Section 80C, Sec 24 home loans), the Old Regime might save you more money. If you don't have investments, the New Regime is generally much cheaper due to lower tax rates."
    },
    {
      question: "What is the standard deduction in FY 2025-26?",
      answer: "Salaried individuals receive an automatic Standard Deduction of ₹75,000 under the New Tax Regime, while the Old Tax Regime offers a standard deduction of ₹50,000."
    }
  ],
  'gst-calculator': [
    {
      question: "What are the standard GST slab divisions in India?",
      answer: "Standard Indian transactions fall under 5% (essentials), 12% (standard low), 18% (services and regular electronics), and 28% (luxury items and motorcars) slabs."
    },
    {
      question: "When are CGST, SGST, or IGST applied?",
      answer: "For transactions within the same state (intrastate), the GST is split evenly between CGST (Central) and SGST (State). For sales across state lines (interstate), the entire amount is classified as IGST."
    }
  ],
  'sip-calculator': [
    {
      question: "How reliable are SIP mutual fund calculators?",
      answer: "They use high-performance compound interest mathematics. While they accurately estimate future payouts based on your chosen return rates, real mutual fund yields fluctuate based on stock market cycles."
    },
    {
      question: "Does an SIP compound monthly or annually?",
      answer: "In real life, mutual fund values change daily based on NAV (Net Asset Value). For compounding calculations, standard industry tools use monthly intervals to match your regular monthly payments."
    }
  ],
  'cgpa-calculator': [
    {
      question: "How does CBSE convert CGPA to percentage?",
      answer: "CBSE uses a standard multiplier: Percentage = CGPA * 9.5. This was derived from statistical analysis of board exam results."
    },
    {
      question: "How can I calculate cumulative CGPA across different semesters?",
      answer: "You shouldn't just average SGPAs. You need to calculate a weighted average by multiplying each semester's SGPA by its credit points, adding those up, and dividing by the total credits."
    }
  ],
  'attendance-calculator': [
    {
      question: "What is the standard university attendance target?",
      answer: "Most global and Indian universities (like VTU, CBSE, Mumbai University) mandate a strict 75% attendance target. Some premium programs require 80% to 85%."
    },
    {
      question: "How does it estimate how many classes I can bunk safely?",
      answer: "The algorithm calculates the maximum classes you can miss while keeping your attended-to-held ratio strictly equal to or greater than your target percentage."
    }
  ]
};
export const fallbackFaqs: FAQItem[] = [
  {
    question: "Is this utility tool free?",
    answer: "Yes, all utility calculators, converters, and script generators on our platform are 100% free with no registrations, limits, or requirements."
  },
  {
    question: "Can I use these tools in offline mode?",
    answer: "Absolutely. Since all math algorithms are processed client-side via modern standard JS, once the website loads, you can use them offline!"
  }
];
