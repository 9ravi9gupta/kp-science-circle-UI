'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 12, suffix: '+', label: 'years teaching' },
  { value: 3000, suffix: '+', label: 'students taught' },
  { value: 96, suffix: '%', label: 'board pass rate' },
  { value: 15, suffix: ':1', label: 'student-teacher ratio' },
];

function StatTile({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            const duration = 1200;
            const start = performance.now();
            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(eased * value));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat-tile">
      <span className="stat-value" ref={ref}>
        {display.toLocaleString('en-IN')}
      </span>
      <span className="stat-suffix">{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats" aria-label="Our track record">
      <div className="container stats-grid">
        {STATS.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
