import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Roberta G',
    role: 'Project Manager',
    company: 'Firmă Consultanta IT, Timisoara',
    text: 'Cursul de Project Management sustinut de TopRoxProject a fost cea mai buna decizie pentru mine ca Project Manager la inceput e drum. Intr-o piata suprasaturata de training-uri care deseori te pregatesc mai degraba pentru examenul de la final, acest curs m-a pregatit pentru realitatea din teren, aratandu-mi ce se intampla cu adevarat in culisele domeniului. Cursul mi-a construit o baza solida si structurata, m-am invatat sa recunosc din timp anumite fenomene specifice si mi-a oferit resurse si bune practici aplicabile imediat in proiectele mele.Atmosfera prietenoasa si trainerul exceptional au facut acest curs sa se simta ca o serie de discutii cu un mentor foarte bine pregatit, cu experienta vasta care spune lucrurilor pe nume fara sa te descurajeze astfel incat tu ai parte de cea mai buna pregatire posibila la linia de start in acest rol.',
    rating: 5,
    initial: 'R',
  },

  {
    name: 'Radu Ionescu',
    role: 'CTO',
    company: 'Startup tech, Cluj',
    text: 'Aplicația GDPR_TopRox este exact ce aveam nevoie. Interface clar, rapoarte profesionale și suport rapid când am avut întrebări. Valoare excelentă pentru prețul plătit.',
    rating: 5,
    initial: 'R',
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
