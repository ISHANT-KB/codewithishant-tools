export interface TourStep {
  title: string;
  content: string;
  selector?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export const TOURS_DATA: Record<string, TourStep[]> = {
  'marks-percentage-calculator': [
    {
      title: 'Quick Marks Converter',
      content: 'Instantly calculate percentage and standard letter grades (A1 to F) using your obtained and total marks.',
      selector: '#quick-marks-card',
      position: 'bottom',
    },
    {
      title: 'Multi-Subject Marksheet',
      content: 'Add multiple subjects, quizzes, or exams to compute cumulative weightages, aggregate percentages, and print a custom PDF scorecard.',
      selector: '#sub-marksheet-section',
      position: 'top',
    },
    {
      title: 'Target Score Solver',
      content: 'Enter your desired overall goal and see exactly what score percentage is required in upcoming coursework to hit it.',
      selector: '#target-marks-solver',
      position: 'top',
    }
  ],
  'study-time-calculator': [
    {
      title: 'Syllabus Parameters',
      content: 'Define your workload scope by entering Chapter quantities and the estimated hours needed to learn each one from scratch.',
      selector: '#syllabus-params-box',
      position: 'bottom',
    },
    {
      title: 'Preparation Depth Profile',
      content: 'Choose from different preparation intensity profiles (Standard Review, Thorough Preparation, Ultimate Mastery) to scale your prep commitment.',
      selector: '#prep-depth-box',
      position: 'top',
    },
    {
      title: 'Physical Countdown Calendar',
      content: 'Set the remaining test date to compute the exact daily time allocation required to cover your modules.',
      selector: '#study-countdown-box',
      position: 'bottom',
    },
    {
      title: 'Daily Commitment Board',
      content: 'View your target daily revision hours, interactive workload stress dials, and tailored weekly pomodoro block strategies.',
      selector: '#study-output-board',
      position: 'left',
    }
  ],
  'exam-countdown': [
    {
      title: 'Create Exam Reminders',
      content: 'Schedule standard midterms or finals by providing a subject, choosing dates on the calendar, and setting the precise test hour.',
      selector: '#create-countdown-form',
      position: 'bottom',
    },
    {
      title: 'Live Countdown Clocks',
      content: 'Live tickers update physical seconds, minutes, and days leading to your goal, dynamically changing colors as deadlines turn urgent.',
      selector: '#active-countdowns-grid',
      position: 'top',
    },
    {
      title: 'Subject Chapter Checklists',
      content: 'Check off individual exam syllabus topics inside your cards to track your concrete coverage progress.',
      selector: '#checklist-container',
      position: 'top',
    }
  ],
  'gpa-planner': [
    {
      title: 'Grading Scale Selector',
      content: 'Switch between standard US 4.0 GPA models or global university 10.0 CGPA models to adjust the calculation bounds.',
      selector: '#gpa-planner-root > div:first-child',
      position: 'bottom',
    },
    {
      title: 'Past Standing Baseline',
      content: 'Input your completed cumulative credits and current GPA to establish your historical learning baseline.',
      selector: '#gpa-planner-root label:contains("Cumulative GPA") || #gpa-planner-root input',
      position: 'right',
    },
    {
      title: 'Goal GPA Parameter',
      content: 'Set your desired honors classification target along with the remaining course credits to solve your requirements.',
      selector: '#gpa-planner-root input[placeholder*="45"]',
      position: 'left',
    }
  ],
  'semester-grade-predictor': [
    {
      title: 'Course Syllabus Weightages',
      content: 'Add different school segments (such as homework, practical labs, and final exams), assigning them corresponding weights out of 100%.',
      selector: '#grade-predictor-root form',
      position: 'bottom',
    },
    {
      title: '"What-If" Final Simulator',
      content: 'Drag this dynamic slider to simulate multiple future score expectations on uncompleted assessments.',
      selector: '#grade-predictor-root input[type="range"]',
      position: 'top',
    },
    {
      title: 'Running Class Standing',
      content: 'View your completed coursework average and see the projected overall final grade letter instantaneously.',
      selector: '#grade-predictor-root .bg-slate-900',
      position: 'right',
    }
  ],
  'pomodoro-timer': [
    {
      title: 'Active Study Block Loop',
      content: 'Choose between 25-minute study sprints or short/long focus breaks to structure active work rhythms.',
      selector: '#pomo-timer-root button:contains("Focus Area")',
      position: 'bottom',
    },
    {
      title: 'Interactive SVG Circle Clock',
      content: 'Tracks your active minutes live and synthesizes sweet alarm chime melodies upon timer completion automatically.',
      selector: '#pomo-timer-root svg',
      position: 'top',
    },
    {
      title: 'Session Focus Targets',
      content: 'Write lists of actionable micro-goals to stay laser-focused while the Pomodoro clock countdown decreases.',
      selector: '#pomo-timer-root form',
      position: 'bottom',
    }
  ],
  'sitemap-generator': [
    {
      title: 'Target Domain & Config',
      content: 'Define your custom website domain URL, configure updating frequency schedules, and fine-tune index crawl priorities.',
      selector: '#sitemap-generator-root input[type="url"]',
      position: 'bottom',
    },
    {
      title: 'Download & Export Actions',
      content: 'Instantly preview structured route indices, verify compliant XML markup formats, or download standard-ready sitemap.xml files.',
      selector: '#sitemap-copy-btn',
      position: 'top',
    },
    {
      title: 'Dynamic Route Selector',
      content: 'Filter the full cataloged platform tools with individual checkbox toggles to selectively exclude specific paths before generation.',
      selector: '#sitemap-generator-root select',
      position: 'top',
    }
  ]
};
