import { useState } from 'react';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const empty = { name: '', email: '', subject: '', message: '' };
const validate = v => {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = 'Enter a valid email';
  if (v.subject.trim().length < 3) e.subject = 'Subject must be at least 3 characters';
  if (v.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
  return e;
};
export default function ContactForm() {
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const change = e => setV({ ...v, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs); setStatus(null);
    if (Object.keys(errs).length) return;
    setBusy(true);
    try {
      const r = await fetch(`${API}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) });
      const d = await r.json();
      if (r.ok) { setStatus({ ok: true, text: 'Thank you! Your message has been sent.' }); setV(empty); }
      else { setErrors(d.errors || {}); setStatus({ ok: false, text: d.message || 'Please fix the highlighted fields.' }); }
    } catch { setStatus({ ok: false, text: 'Could not reach the server. Please try again later.' }); }
    setBusy(false);
  };
  const field = (name, label, type = 'text') => (
    <label>{label}
      {type === 'textarea' ? <textarea name={name} rows="5" value={v[name]} onChange={change} /> : <input name={name} type={type} value={v[name]} onChange={change} />}
      {errors[name] && <small className="err">{errors[name]}</small>}
    </label>
  );
  return (
    <form className="card form" onSubmit={submit} noValidate>
      {field('name', 'Name')}{field('email', 'Email', 'email')}{field('subject', 'Subject')}{field('message', 'Message', 'textarea')}
      <button className="btn primary" disabled={busy}>{busy ? 'Sending...' : 'Send Message'}</button>
      {status && <p role="status" className={status.ok ? 'ok' : 'err'}>{status.text}</p>}
    </form>
  );
}
