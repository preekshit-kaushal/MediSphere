import React from 'react';
import { Field } from '../components/FormFields';

export default function Registration() {
  return (
    <div className="auth-form-wrap">
      <div className="auth-form reveal">
        <h1>Create your account</h1>
        <p className="muted">Already registered? <a href="#">Sign in</a></p>
        <form onSubmit={e => { e.preventDefault(); alert('Account created.'); }}>
          <div className="form-grid">
            <Field label="First name" placeholder="Jane" />
            <Field label="Last name" placeholder="Doe" />
          </div>
          <Field label="Email" type="email" placeholder="you@example.com" />
          <Field label="Password" type="password" placeholder="Minimum 8 characters" />
          <Field label="Confirm password" type="password" placeholder="Repeat password" />
          <label className="checkbox-row" style={{ margin: '8px 0 20px' }}>
            <input type="checkbox" required /> I agree to the Terms &amp; Privacy Policy
          </label>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Create account</button>
        </form>
      </div>
    </div>
  );
}
