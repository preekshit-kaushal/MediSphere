import React, { useState } from 'react';
import { AppLink, Brand } from '../components/Navigation';
import { Select } from '../components/FormFields';
import { appointmentDepartments, appointmentDoctors, timeSlots } from '../data/siteData';
import { readPatients, savePatients } from '../utils/navigation';

export default function Appointment({ go }) {
  const [message, setMessage] = useState('');
  const today = new Date().toISOString().slice(0, 10);

  const submit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fullName = data.get('fullName').trim();
    const email = data.get('email').trim();
    const phone = data.get('phone').trim();

    if (!fullName || !email || !phone) {
      setMessage('Please fill out all required fields (Name, Email, and Phone).');
      return;
    }

    const patients = readPatients();
    patients.push({
      id: `MS-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      fullName,
      email,
      phone,
      department: data.get('department') || 'General Medicine',
      doctor: data.get('doctor') || 'Any Available',
      date: data.get('date') || today,
      timeSlot: data.get('timeSlot'),
      submittedAt:
        new Date().toLocaleDateString() + ' ' +
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    savePatients(patients);
    go('/patient-records');
  };

  return (
    <>
      <header>
        <div className="container" style={{ padding: 20 }}><Brand go={go} /></div>
      </header>

      <main className="form-container">
        <div className="form-header">
          <h2>Book Patient Appointment</h2>
          <p>Fill out the required information to schedule a consultation.</p>
        </div>

        <form onSubmit={submit} noValidate>
          {message && <p role="alert">{message}</p>}

          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input id="fullName" name="fullName" className="form-control" placeholder="e.g. Rahul Sharma" required />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" className="form-control" placeholder="abc@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" className="form-control" placeholder="+91 xxxxx xxxxx" required />
            </div>
          </div>

          <div className="form-grid">
            <Select label="Department" name="department" options={appointmentDepartments} />
            <Select label="Doctor" name="doctor" options={appointmentDoctors} />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="date">Preferred Date *</label>
              <input type="date" min={today} id="date" name="date" className="form-control" required />
            </div>

            <div className="form-group">
              <label htmlFor="timeSlot">Preferred Time *</label>
              <select id="timeSlot" name="timeSlot" className="form-control" required>
                <option value="">Select a time slot</option>
                {timeSlots.map(slot => <option key={slot}>{slot}</option>)}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <AppLink to="/patient-records" go={go} className="btn btn-secondary">Cancel</AppLink>
            <button className="btn btn-primary">Submit Appointment</button>
          </div>
        </form>
      </main>
    </>
  );
}
