'use client';

import { useReveal } from '@/lib/useReveal';

const TOPPERS = [
  { initials: 'AS', score: '98% · class 10 board' },
  { initials: 'RK', score: 'neet qualified' },
  { initials: 'PM', score: '96% · class 12 board' },
  { initials: 'SD', score: 'ntse scholar' },
];

function TopperCard({ initials, score }: (typeof TOPPERS)[number]) {
  const { ref, revealClassName } = useReveal<HTMLDivElement>();
  return (
    <div className={`topper-card ${revealClassName}`} ref={ref}>
      <div className="topper-avatar">{initials}</div>
      <h4>student name</h4>
      <p className="topper-score">{score}</p>
    </div>
  );
}

export default function Results() {
  return (
    <section className="section section-alt" id="results">
      <div className="container">
        <span className="script-caption center">peel-and-stick proud</span>
        <h2 className="center">our students&apos; success</h2>
        <p className="section-sub center">
          Replace these with real topper names, photos, scores and years once available.
        </p>
        <div className="toppers-grid">
          {TOPPERS.map((topper) => (
            <TopperCard key={topper.initials} {...topper} />
          ))}
        </div>
      </div>
    </section>
  );
}
