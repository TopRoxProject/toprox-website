import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const subjects = [
  'Audit GDPR',
  'Dezvoltare Software',
  'Consultanță Strategică',
  'Suport Tehnic',
  'Altele',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (!form.name.trim()) return 'Te rugăm să introduci numele tău.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return 'Email invalid.';
    if (!form.subject) return 'Te rugăm să selectezi un subiect.';
    if (!form.message.trim() || form.message.length < 20) return 'Mesajul trebuie să conțină cel puțin 20 de caractere.';
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      await emailjs.send(
        'service_ift9sa9',
        'template_3angrya',
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        },
        'NUaxjvRFI_vBZTS5j'
      );
      setSent(true);
    } catch {
      setError('A apărut o eroare. Încearcă din nou.');
    }
    setLoading(false);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div className="contact-left">
          <div className="section-label">Contact</div>
          <h2 className="section-title">
            Hai să <span className="accent-red">vorbim</span>
          </h2>
          <p className="contact-desc">
            Spune-ne cu ce te putem ajuta și te contactăm în maximum 24 de ore.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <strong>Sediu</strong>
                <span>Sibiu, România</span>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <strong>Email</strong>
                <a href="mailto:toproxproject@gmail.com">toproxproject@gmail.com</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕐</span>
              <div>
                <strong>Program</strong>
                <span>Luni – Vineri: 09:00 – 18:00</span>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">⚡</span>
              <div>
                <strong>Răspuns</strong>
                <span>În maximum 24 de ore lucrătoare</span>
              </div>
            </div>
          </div>
          <div className="contact-badge">
            <span className="badge-dot" />
            <span>Prima consultație este <strong>gratuită</strong></span>
          </div>
        </div>

        <div className="contact-right">
          {sent ? (
            <div className="success-msg">
              <div className="success-icon">✓</div>
              <h3>Mesaj trimis cu succes!</h3>
              <p>Te vom contacta la adresa <strong>{form.email}</strong> în cel mai scurt timp.</p>
              <button className="btn-primary" onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                Trimite un alt mesaj
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nume complet *</label>
                  <input id="name" name="name" type="text" placeholder="Ion Popescu" value={form.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input id="email" name="email" type="email" placeholder="ion@firma.ro" value={form.email} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Telefon (opțional)</label>
                  <input id="phone" name="phone" type="tel" placeholder="+40 7XX XXX XXX" value={form.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subiect *</label>
                  <select id="subject" name="subject" value={form.subject} onChange={handleChange}>
                    <option value="">Selectează un subiect</option>
                    {subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Mesaj *</label>
                <textarea id="message" name="message" rows="5" placeholder="Descrie pe scurt cu ce te putem ajuta..." value={form.message} onChange={handleChange} />
              </div>
              {error && <div className="form-error">{error}</div>}
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? (
                  <span className="spinner-wrap"><span className="spinner" /> Se trimite...</span>
                ) : (
                  'Trimite mesajul →'
                )}
              </button>
              <p className="form-note">* Câmpuri obligatorii. Datele tale sunt protejate conform GDPR.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
