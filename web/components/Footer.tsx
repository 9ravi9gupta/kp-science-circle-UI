export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="container footer-inner">
          <div>
            <a href="#home" className="logo footer-logo">
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
            <p>Concept-first Science &amp; Maths coaching for school and competitive exams.</p>
          </div>
          <div className="footer-links">
            <h4>quick links</h4>
            <a href="#about">about</a>
            <a href="#courses">courses</a>
            <a href="#results">results</a>
            <a href="#contact">contact</a>
          </div>
          <div className="footer-contact">
            <h4>get in touch</h4>
            <p>info@kpsciencecircle.in</p>
            <p>+91-XXXXXXXXXX</p>
          </div>
        </div>
      </div>
      <div className="footer-band">
        <p>© {new Date().getFullYear()} kp science circle — we&apos;re done, and we had fun.</p>
      </div>
    </footer>
  );
}
