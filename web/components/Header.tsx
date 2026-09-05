'use client';

import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '#home', label: 'home' },
  { href: '#about', label: 'about' },
  { href: '#courses', label: 'courses' },
  { href: '#why-us', label: 'why us' },
  { href: '#results', label: 'results' },
  { href: '#testimonials', label: 'testimonials' },
  { href: '#contact', label: 'contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
      (el): el is Element => Boolean(el)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="header">
      <div className="container header-inner">
        <a href="#home" className="logo">
          <svg className="logo-mark" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 4 L18.2 12.4 L26.5 14.5 L18.2 16.6 L16 25 L13.8 16.6 L5.5 14.5 L13.8 12.4 Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="logo-text">kp science circle</span>
        </a>
        <nav className={`nav${navOpen ? ' is-open' : ''}`} id="nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeHref === link.href ? 'active' : ''}
              onClick={() => setNavOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn nav-cta">
          enroll now
        </a>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
