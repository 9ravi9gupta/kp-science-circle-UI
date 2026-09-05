'use client';

import { useReveal } from '@/lib/useReveal';

const FEATURES = [
  {
    title: 'experienced faculty',
    description: 'Subject-expert teachers with years of classroom and exam-coaching experience.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="8" r="4.5" stroke="#171717" strokeWidth="1.7" />
        <path d="M4 23 C4 16.5 8 14 13 14 C18 14 22 16.5 22 23" stroke="#171717" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    title: 'regular testing',
    description: 'Weekly tests and progress reports keep students and parents informed at every step.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="5" y="4" width="16" height="20" rx="2" stroke="#171717" strokeWidth="1.7" />
        <path d="M9 10 H17 M9 14 H17 M9 18 H14" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'doubt sessions',
    description: 'Dedicated one-on-one doubt-clearing time outside regular class hours.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="9.5" stroke="#171717" strokeWidth="1.7" />
        <path d="M13 8 V13 L16.5 15.5" stroke="#171717" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'curated material',
    description: 'In-house notes and practice sheets built specifically for board and competitive exams.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path
          d="M6 22 V6 C6 4.5 7.5 3.5 9 4 L20 7 V20 L9 17.5 C7.5 17 6 17.5 6 19 Z"
          stroke="#171717"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'small batches',
    description: 'Limited seats per batch so every student gets individual attention.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="9" cy="9" r="3.5" stroke="#171717" strokeWidth="1.6" />
        <circle cx="18" cy="9" r="3.5" stroke="#171717" strokeWidth="1.6" />
        <path d="M3 22 C3 17.5 6 15.5 9 15.5 C10.5 15.5 12 16.5 12 18.5" stroke="#171717" strokeWidth="1.5" />
        <path d="M14 18.5 C14 16.5 15.5 15.5 18 15.5 C21 15.5 23 17.5 23 22" stroke="#171717" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'proven results',
    description: 'Consistent track record of strong board results and competitive exam selections.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M4 21 V14 M11 21 V9 M18 21 V4" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 21 H22" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

function FeatureItem({ title, description, icon }: (typeof FEATURES)[number]) {
  const { ref, revealClassName } = useReveal<HTMLDivElement>();
  return (
    <div className={`feature ${revealClassName}`} ref={ref}>
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section className="section" id="why-us">
      <div className="container">
        <span className="script-caption center">like actually teaching</span>
        <h2 className="center">what makes us different</h2>
        <div className="features-grid">
          {FEATURES.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
