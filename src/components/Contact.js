import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useI18n, Rich } from '../i18n';
import { EMAIL } from '../i18n/config';
import Icon from './Icon';

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const { t, href } = useI18n();
  const c = t.common.contact;
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sendError, setSendError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const summaryRef = useRef(null);
  const successRef = useRef(null);

  const change = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => { const n = { ...er }; delete n[name]; return n; });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = c.errors.name;
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = c.errors.email;
    if (!form.subject) e.subject = c.errors.subject;
    if (form.message.trim().length < 20) e.message = c.errors.message;
    return e;
  };

  const submit = async e => {
    e.preventDefault();
    setSendError('');
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) {
      setTimeout(() => summaryRef.current && summaryRef.current.focus(), 0);
      return;
    }
    setLoading(true);
    try {
      await emailjs.send('service_ift9sa9', 'template_3angrya', {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      }, 'NUaxjvRFI_vBZTS5j');
      setSent(true);
      setTimeout(() => successRef.current && successRef.current.focus(), 0);
    } catch {
      setSendError(c.errors.send);
    }
    setLoading(false);
  };

  const field = (name, label, required, input) => (
    <div className={`field ${errors[name] ? 'has-error' : ''}`}>
      <label htmlFor={`f-${name}`}>
        {label} <span className="field-hint">({required ? c.required : c.optional})</span>
      </label>
      {input}
      {errors[name] && <p className="field-error" id={`e-${name}`}>{errors[name]}</p>}
    </div>
  );
  const aria = name => ({
    id: `f-${name}`,
    name,
    value: form[name],
    onChange: change,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `e-${name}` : undefined,
  });
  const errList = Object.entries(errors);

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-info">
          <p className="eyebrow">{c.label}</p>
          <h2 id="contact-title" className="h2">{c.title} <span className="accent">{c.accent}</span></h2>
          <p className="lead">{c.desc}</p>
          <ul className="contact-list">
            <li><Icon name="pin" /><div><strong>{c.officeLabel}</strong><span>{c.office}</span></div></li>
            <li><Icon name="mail" /><div><strong>{c.emailLabel}</strong><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></li>
            <li><Icon name="clock" /><div><strong>{c.hoursLabel}</strong><span>{c.hours}</span></div></li>
          </ul>
          <p className="pill-note"><Icon name="check" size={18} /> <span><Rich text={c.free} /></span></p>
        </div>

        <div className="card contact-card">
          {sent ? (
            <div className="form-success" role="status">
              <Icon name="check" size={40} className="success-icon" />
              <h3 ref={successRef} tabIndex={-1}>{c.successTitle}</h3>
              <p><Rich text={c.successText} tokens={{ email: <strong>{form.email}</strong> }} /></p>
              <button type="button" className="btn btn-primary" onClick={() => { setSent(false); setForm(EMPTY); }}>{c.again}</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate aria-labelledby="form-title">
              <h3 id="form-title" className="sr-only">{c.formTitle}</h3>
              {errList.length > 0 && (
                <div className="error-summary" ref={summaryRef} tabIndex={-1} role="alert">
                  <p>{c.errors.summary}</p>
                  <ul>{errList.map(([k, v]) => <li key={k}><a href={`#f-${k}`}>{v}</a></li>)}</ul>
                </div>
              )}
              <div className="form-row">
                {field('name', c.name, true, <input type="text" autoComplete="name" placeholder={c.namePh} required {...aria('name')} />)}
                {field('email', c.email, true, <input type="email" autoComplete="email" inputMode="email" placeholder={c.emailPh} required {...aria('email')} />)}
              </div>
              <div className="form-row">
                {field('phone', c.phone, false, <input type="tel" autoComplete="tel" placeholder={c.phonePh} {...aria('phone')} />)}
                {field('subject', c.subject, true, (
                  <select required {...aria('subject')}>
                    <option value="">{c.subjectPh}</option>
                    {c.subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                ))}
              </div>
              {field('message', c.message, true, <textarea rows="5" placeholder={c.messagePh} required {...aria('message')} />)}
              {sendError && <p className="form-send-error" role="alert">{sendError} <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>}
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? c.sending : c.submit} {!loading && <Icon name="arrow" size={18} />}
              </button>
              <p className="form-note">
                <Rich text={c.consent} tokens={{ privacy: <a href={href('privacy')}>{c.privacyLink}</a> }} />
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
