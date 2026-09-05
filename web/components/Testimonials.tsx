'use client';

import { useReveal } from '@/lib/useReveal';

const TESTIMONIALS = [
  {
    seed: 'Meera-Kapoor',
    name: 'meera kapoor',
    role: 'parent, class 9 student',
    quote: 'The teachers explain concepts so clearly that Science actually stopped being scary for my daughter.',
  },
  {
    seed: 'Rohan-Verma',
    name: 'rohan verma',
    role: 'class 11 student',
    quote: 'Small batch size meant I could actually ask questions and get answers. The weekly tests kept me on track all year.',
  },
  {
    seed: 'Sunita-Desai',
    name: 'sunita desai',
    role: 'parent, class 10 student',
    quote: 'Great study material and very organised doubt sessions. Highly recommend for board exam preparation.',
  },
];

function TestimonialCard({ seed, name, role, quote }: (typeof TESTIMONIALS)[number]) {
  const { ref, revealClassName } = useReveal<HTMLQuoteElement>();
  return (
    <blockquote className={`testimonial ${revealClassName}`} ref={ref}>
      <div className="testimonial-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="testimonial-avatar"
          src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&backgroundColor=f7efe9&radius=50`}
          alt=""
          width={46}
          height={46}
          loading="lazy"
        />
        <div>
          <span className="testimonial-name">{name}</span>
          <span className="testimonial-role">{role}</span>
        </div>
      </div>
      <p>&quot;{quote}&quot;</p>
    </blockquote>
  );
}

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <span className="script-caption center">said with a straight face</span>
        <h2 className="center">what parents &amp; students say</h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.seed} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
