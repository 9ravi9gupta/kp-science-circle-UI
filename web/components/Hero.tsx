'use client';

import { useEffect, useRef } from 'react';
import Mark from './Mark';

export default function Hero() {
  const heroArtRef = useRef<HTMLDivElement>(null);
  const tiltWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const heroArt = heroArtRef.current;
    const tiltWrap = tiltWrapRef.current;
    if (prefersReducedMotion || !hasFinePointer || !heroArt || !tiltWrap) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = heroArt.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tiltWrap.style.transform = `perspective(900px) rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg)`;
    };
    const onMouseLeave = () => {
      tiltWrap.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    };

    heroArt.addEventListener('mousemove', onMouseMove);
    heroArt.addEventListener('mouseleave', onMouseLeave);
    return () => {
      heroArt.removeEventListener('mousemove', onMouseMove);
      heroArt.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1>
            science, actually
            <br />
            clicks here.
          </h1>
          <span className="script-caption">dear students &amp; parents,</span>
          <p className="hero-body">
            KP Science Circle helps students master Physics, Chemistry, Biology and Mathematics through
            concept-first teaching, small batches and <Mark>actually</Mark> good doubt-solving — from
            school exams to competitive exam foundations.
          </p>
          <div className="hero-actions">
            <div className="hero-actions-col">
              <a href="#contact" className="btn btn-lg">
                book a free demo class
              </a>
              <span className="info-line">next batch starts monday.</span>
            </div>
            <a href="#courses" className="btn btn-lg">
              view courses
            </a>
          </div>
        </div>

        <div className="hero-art" id="heroArt" ref={heroArtRef} aria-hidden="true">
          <div className="tilt-wrap" id="tiltWrap" ref={tiltWrapRef}>
            <div className="notebook-stack">
              <div className="arrow-caption">
                <span className="script-caption">your new favourite subject</span>
                <svg width="70" height="40" viewBox="0 0 70 40" fill="none">
                  <path
                    d="M2 4 C 20 4, 30 30, 55 32"
                    stroke="#171717"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M48 26 L55 32 L47 35"
                    stroke="#171717"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="notebook notebook-back"></div>
              <div className="notebook notebook-mid"></div>
              <div className="notebook notebook-front">
                <div className="notebook-spine"></div>
                <div className="name-label">
                  <div className="nl-line">
                    <span className="nl-row">name</span>
                  </div>
                  <div className="nl-value" style={{ marginBottom: 8 }}>
                    ananya sharma
                  </div>
                  <div className="nl-line">
                    <span className="nl-row">class</span>
                    <span className="nl-row">subject</span>
                  </div>
                  <div className="nl-line">
                    <span className="nl-value">10</span>
                    <span className="nl-value">science</span>
                  </div>
                </div>
              </div>

              <span className="sticker sticker-atom">
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                  <circle cx="26" cy="26" r="24" fill="#3b82f6" fillOpacity="0.16" stroke="#171717" strokeWidth="2" />
                  <circle cx="26" cy="26" r="3.5" fill="#171717" />
                  <ellipse cx="26" cy="26" rx="18" ry="7" stroke="#171717" strokeWidth="1.6" fill="none" />
                  <ellipse
                    cx="26"
                    cy="26"
                    rx="18"
                    ry="7"
                    stroke="#171717"
                    strokeWidth="1.6"
                    fill="none"
                    transform="rotate(60 26 26)"
                  />
                  <ellipse
                    cx="26"
                    cy="26"
                    rx="18"
                    ry="7"
                    stroke="#171717"
                    strokeWidth="1.6"
                    fill="none"
                    transform="rotate(120 26 26)"
                  />
                </svg>
              </span>

              <span className="sticker sticker-flask">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <circle cx="28" cy="28" r="26" fill="#22c55e" fillOpacity="0.16" stroke="#171717" strokeWidth="2" />
                  <path
                    d="M23 16 V26 L15 39 C13.5 41.5 15.5 44 18.5 44 H37.5 C40.5 44 42.5 41.5 41 39 L33 26 V16"
                    stroke="#171717"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinejoin="round"
                  />
                  <path d="M20 16 H36" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M19 36 H37" stroke="#171717" strokeWidth="1.6" fill="none" />
                  <circle cx="25" cy="40" r="1.6" fill="#171717" />
                  <circle cx="31" cy="41" r="1.2" fill="#171717" />
                </svg>
              </span>

              <span className="sticker sticker-bolt">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" fill="#ff66cf" fillOpacity="0.16" stroke="#171717" strokeWidth="2" />
                  <path
                    d="M22 9 L12 22 H19 L17 31 L28 17 H21 Z"
                    fill="#ff66cf"
                    stroke="#171717"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="sticker sticker-star">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <path
                    d="M17 3 L20.5 13 L31 14.5 L23 21.5 L25.5 32 L17 26 L8.5 32 L11 21.5 L3 14.5 L13.5 13 Z"
                    fill="#fdfbf9"
                    stroke="#171717"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
