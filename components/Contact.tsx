'use client';

import { useState } from 'react';

export default function Contact() {
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNote('Thanks! This form is a placeholder — connect it to your email/CRM to start receiving enquiries.');
    e.currentTarget.reset();
  };

  return (
    <section className="section section-alt" id="contact">
      <div className="container contact-grid">
        <div className="contact-info">
          <p className="section-eyebrow">contact</p>
          <h2>book your free demo class</h2>
          <p>Fill in the form and our team will get back to you within 24 hours, or reach us directly:</p>
          <ul className="contact-list">
            <li>
              <strong>phone:</strong> +91-XXXXXXXXXX
            </li>
            <li>
              <strong>email:</strong> info@kpsciencecircle.in
            </li>
            <li>
              <strong>address:</strong> your centre address, city, state, pin
            </li>
            <li>
              <strong>hours:</strong> mon–sat, 9:00 am – 7:00 pm
            </li>
          </ul>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            full name
            <input type="text" name="name" required />
          </label>
          <label>
            phone number
            <input type="tel" name="phone" required />
          </label>
          <label>
            email
            <input type="email" name="email" required />
          </label>
          <label>
            class / course of interest
            <input type="text" name="course" placeholder="e.g. Class 10 Science" />
          </label>
          <label>
            message
            <textarea name="message" rows={4}></textarea>
          </label>
          <button type="submit" className="btn btn-block">
            request callback
          </button>
          <p className="form-note">{note}</p>
        </form>
      </div>
    </section>
  );
}
