import React, { useState } from 'react';
import Modal from '../common/modal';

export default function Emergency() {
  const [request, setRequest] = useState(null);
  const [errors, setErrors] = useState({});

  const submit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const nextErrors = {};
    if (!data.patientName?.trim()) nextErrors.patientName = 'Please enter the patient name.';
    else if (data.patientName.trim().length < 2) nextErrors.patientName = 'Patient name must be at least 2 characters.';
    const phoneDigits = (data.phone || '').replace(/\D/g, '');
    if (!data.phone?.trim()) nextErrors.phone = 'Please enter a callback number.';
    else if (!(phoneDigits.length === 10 || (phoneDigits.length === 12 && phoneDigits.startsWith('91')))) nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (!data.location?.trim()) nextErrors.location = 'Please provide the pickup location.';
    else if (data.location.trim().length < 10) nextErrors.location = 'Add a more precise address or nearby landmark.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    setRequest({ ...data, id: `EMS-${Date.now().toString(36).toUpperCase()}` });
    form.reset();
  };

  const fieldProps = name => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    onChange: () => setErrors(current => current[name] ? { ...current, [name]: '' } : current),
  });

  return (
    <>
      <section className="emergency-hero">
        <div className="container">
          <span className="eyebrow emergency-eyebrow">● 24/7 emergency response</span>
          <h1>Need urgent care?</h1>
          <p>If someone is in immediate danger, call <strong>112</strong> now. You can also send MediSphere an ambulance request below.</p>
          <span className="btn emergency-call">Emergency number: 112</span>
        </div>
      </section>

      <main className="section">
        <div className="container emergency-layout">
          <section className="emergency-form-card">
            <h2>Request an ambulance</h2>
            <p className="text-dim">Share the essentials and our emergency desk will coordinate the next steps.</p>
            <form onSubmit={submit} noValidate>
              <div className="form-grid">
                <div className="form-group"><label htmlFor="patientName">Patient name *</label><input {...fieldProps('patientName')} id="patientName" name="patientName" className="form-control" placeholder="Full name" autoComplete="name" />{errors.patientName && <small className="field-error" id="patientName-error">{errors.patientName}</small>}</div>
                <div className="form-group"><label htmlFor="phone">Callback number *</label><input {...fieldProps('phone')} id="phone" name="phone" type="tel" className="form-control" placeholder="98765 43210" inputMode="tel" autoComplete="tel" />{errors.phone && <small className="field-error" id="phone-error">{errors.phone}</small>}</div>
              </div>
              <div className="form-group"><label htmlFor="location">Pickup location *</label><textarea {...fieldProps('location')} id="location" name="location" className="form-control fixed-textarea" rows="3" placeholder="Building, street, area, city, and a nearby landmark" />{errors.location && <small className="field-error" id="location-error">{errors.location}</small>}</div>
              <button className="btn emergency-submit" type="submit">Send ambulance request</button>
            </form>
          </section>

        </div>
      </main>

      {request && <Modal title="Emergency request received" tone="success" onClose={() => setRequest(null)} actions={<button className="btn btn-primary" onClick={() => setRequest(null)}>Close</button>}><div className="modal-success-icon" aria-hidden="true">✓</div><p>Your reference number is <strong>{request.id}</strong>. In a real deployment, this request would be sent directly to the emergency desk.</p><p><strong>Pickup:</strong> {request.location}</p></Modal>}
    </>
  );
}
