'use client';

import { useReveal } from '@/lib/useReveal';

function AboutMedia() {
  const { ref, revealClassName } = useReveal<HTMLDivElement>();
  return (
    <div className={`about-media ${revealClassName}`} ref={ref}>
      <div className="about-media-block">
        <svg viewBox="0 0 100 100" fill="none">
          <rect x="18" y="14" width="64" height="72" rx="6" stroke="#171717" strokeWidth="2" fill="#fdfbf9" />
          <path d="M30 30 H70 M30 42 H70 M30 54 H58" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
          <circle cx="70" cy="66" r="12" fill="#3b82f6" fillOpacity="0.18" stroke="#171717" strokeWidth="2" />
          <path
            d="M65 66 L68.5 69.5 L75.5 62.5"
            stroke="#171717"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function AboutCopy() {
  const { ref, revealClassName } = useReveal<HTMLDivElement>();
  return (
    <div className={`about-copy ${revealClassName}`} ref={ref}>
      <p className="section-eyebrow">about us</p>
      <h2>why kp science circle?</h2>
      <p>
        KP Science Circle is a dedicated Science and Mathematics coaching institute focused on building deep
        conceptual understanding rather than rote memorization. Our approach combines structured lessons,
        hands-on problem solving and regular assessments to help every student build genuine confidence in
        Science.
      </p>
      <ul className="check-list">
        <li>Concept-first teaching with real-world examples</li>
        <li>Small batch sizes for individual attention</li>
        <li>Weekly tests and detailed performance tracking</li>
        <li>Dedicated doubt-clearing sessions</li>
        <li>Structured study material and practice sheets</li>
      </ul>
    </div>
  );
}

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <AboutMedia />
        <AboutCopy />
      </div>
    </section>
  );
}
