import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Andrei Moldovan',
    role: 'Director General',
    company: 'Firmă producție, Sibiu',
    text: 'TopRox ne-a ajutat să trecem prin tot procesul de conformitate GDPR fără bătăi de cap. Au venit cu soluții concrete, nu doar cu liste lungi de cerințe. Le recomand cu toată încrederea.',
    rating: 5,
    initial: 'A',
  },
  {
    name: 'Maria Constantin',
    role: 'Administrator',
    company: 'Clinică medicală, Sibiu',
    text: 'Am colaborat pentru un audit de securitate IT și am rămas impresionată de profesionalism. Au identificat probleme pe care nu le știam că există și au rezolvat totul rapid și discret.',
    rating: 5,
    initial: 'M',
  },
  {
    name: 'Radu Ionescu',
    role: 'CTO',
    company: 'Startup tech, Cluj',
    text: 'Aplicația GDPR_TopRox este exact ce aveam nevoie. Interface clar, rapoarte profesionale și suport rapid când am avut întrebări. Valoare excelentă pentru prețul plătit.',
    rating: 5,
    initial: 'R',
  },
  {
    name: 'Elena Popa',
    role: 'Manager Operațional',
    company: 'Distribuție, Brașov',
    text: 'Migrarea pe cloud părea complicată, dar echipa TopRox a gestionat totul impecabil. Acum avem backup automat, costuri mai mici și liniște. Nu mai stăm cu grija că pierdem date.',
    rating: 5,
    initial: 'E',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-inner">
        <div className="section-header">
          <div className="section-label">Testimoniale</div>
          <h2 className="section-title">
            Ce spun <span className="accent-blue">clienții</span>
          </h2>
        </div>

        <div className="testimonials-slider">
          <div className="testimonial-main">
            <div className="quote-mark">"</div>
            <p className="testimonial-text">{testimonials[current].text}</p>
            <div className="testimonial-author">
              <div className="author-avatar">
                {testimonials[current].initial}
              </div>
              <div className="author-info">
                <strong>{testimonials[current].name}</strong>
                <span>{testimonials[current].role} · {testimonials[current].company}</span>
              </div>
              <div className="testimonial-stars">
                {'★'.repeat(testimonials[current].rating)}
              </div>
            </div>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="testimonials-cards">
          {testimonials.map((t, i) => (
            <div
              className={`tcard ${i === current ? 'active' : ''}`}
              key={i}
              onClick={() => setCurrent(i)}
            >
              <div className="tcard-header">
                <div className="tcard-avatar">{t.initial}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.company}</span>
                </div>
              </div>
              <p>"{t.text.substring(0, 80)}..."</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
