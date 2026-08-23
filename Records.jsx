import React, { useState } from 'react';
import { AppLink, Brand } from '../components/Navigation';
import { readPatients, savePatients } from '../utils/navigation';

export default function Records({ go }) {
  const [records, setRecords] = useState(readPatients);

  const remove = index => {
    const next = records.filter((_, i) => i !== index);
    savePatients(next);
    setRecords(next);
  };

  const clear = () => {
    if (confirm('Are you sure you want to delete all patient records?')) {
      localStorage.removeItem('mediSpherePatients');
      setRecords([]);
    }
  };

  return (
    <>
      <header>
        <div className="container" style={{ padding: 20 }}><Brand go={go} /></div>
      </header>

      <main className="records-container">
        <div className="records-header">
          <div>
            <h2>Patient Appointment Records</h2>
            <p>Live registry of all patient submissions stored in local browser memory.</p>
          </div>
          <div>
            <AppLink
              to="/appointment"
              go={go}
              className="action-btn"
              style={{ background: 'var(--brand, #0f766e)', color: '#fff', textDecoration: 'none' }}
            >
              + New Appointment
            </AppLink>
            <button className="action-btn btn-danger" onClick={clear}>Clear All Records</button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="patient-table">
            <thead>
              <tr>
                {['Name', 'Email', 'Phone', 'Department', 'Doctor', 'Appointment', 'Action'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', color: '#64748b', padding: 30 }}>
                    No patient records found. Book an appointment to populate data.
                  </td>
                </tr>
              ) : records.map((p, index) => (
                <tr key={`${p.email}-${index}`}>
                  <td>{p.fullName}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>{p.department}</td>
                  <td>{p.doctor}</td>
                  <td>{p.date}<br /><small>{p.timeSlot || 'Time not selected'}</small></td>
                  <td><button className="btn-delete-row" onClick={() => remove(index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
