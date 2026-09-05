'use client';

import { useReveal } from '@/lib/useReveal';

const COURSES = [
  {
    title: 'class 8–10 science',
    description:
      'Complete Physics, Chemistry & Biology coverage aligned with the school board syllabus, with strong focus on board exam performance.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="8" width="28" height="24" rx="4" stroke="#171717" strokeWidth="1.8" fill="#3b82f6" fillOpacity="0.14" />
        <path d="M12 16 H28 M12 22 H22" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'class 11–12 pcb/pcm',
    description: 'In-depth subject-wise coaching in Physics, Chemistry, Biology and Mathematics for senior secondary students.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="#171717" strokeWidth="1.8" fill="#22c55e" fillOpacity="0.14" />
        <path d="M20 10 V30 M10 20 H30" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" transform="rotate(45 20 20)" />
      </svg>
    ),
  },
  {
    title: 'neet / jee foundation',
    description: 'Early foundation building for competitive exams, developing problem-solving speed and accuracy from Class 9 onward.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="#171717" strokeWidth="1.8" fill="#ff66cf" fillOpacity="0.14" />
        <circle cx="20" cy="20" r="4" fill="#171717" />
      </svg>
    ),
  },
  {
    title: 'olympiad & scholarship prep',
    description: 'Targeted preparation for Science and Maths Olympiads and scholarship exams (NTSE, NSO, IMO and similar).',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M12 30 L20 8 L28 30" stroke="#171717" strokeWidth="1.8" strokeLinejoin="round" fill="#fdfbf9" />
        <path d="M15 23 H25" stroke="#171717" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: 'weekend batches',
    description: 'Flexible weekend-only batches for students balancing school and extracurricular commitments.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="14" cy="17" r="6" stroke="#171717" strokeWidth="1.6" fill="#3b82f6" fillOpacity="0.14" />
        <circle cx="26" cy="17" r="6" stroke="#171717" strokeWidth="1.6" fill="#22c55e" fillOpacity="0.14" />
        <path d="M6 32 C6 26 12 24 14 24 C16 24 18 25.5 18 28" stroke="#171717" strokeWidth="1.5" fill="none" />
        <path d="M22 28 C22 25.5 24 24 26 24 C28 24 34 26 34 32" stroke="#171717" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    title: 'online live classes',
    description: 'Interactive live online sessions with the same curriculum and testing rigor as our in-centre batches.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="7" y="10" width="26" height="17" rx="2" stroke="#171717" strokeWidth="1.8" fill="#fdfbf9" />
        <path d="M4 30 H36" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

function CourseCard({ title, description, icon }: (typeof COURSES)[number]) {
  const { ref, revealClassName } = useReveal<HTMLElement>();
  return (
    <article className={`card ${revealClassName}`} ref={ref}>
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default function Courses() {
  return (
    <section className="section section-alt" id="courses">
      <div className="container">
        <span className="script-caption center">handpicked for every grade</span>
        <h2 className="center">courses built around you</h2>
        <p className="section-sub center">Choose the batch that matches your child&apos;s grade and goals.</p>
        <div className="cards-grid">
          {COURSES.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}
