import React from 'react';
import PageHero from '../components/PageHero';
import { AppLink } from '../components/Navigation';
import { contactInfo } from '../data/siteData';
import { Field } from '../components/FormFields';

function DemoForm() {
  return (
    <form onSubmit={e => { e.preventDefault(); alert('Thank you. Your message has been sent.'); }}>
      <div className="form-grid">
        <Field label="Name" placeholder="Your full name" />
        <Field label="Email" type="email" placeholder="you@example.com" />
      </div>
      <div className="form-grid">
        <Field label="Subject" placeholder="How can we help?" />
        <Field label="Mobile" placeholder="+91 ..." />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea className="form-control" required placeholder="Share a few details..." />
      </div>
      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
    </form>
  );
}

export default function Contact() {
  return (
    <>
      <PageHero title="Let's talk">Questions, appointments, emergencies — we're always listening.</PageHero>
      <section className="section-sm">
        <div className="container">
          <div className="contact-grid">
            <div className="reveal">
              {contactInfo.map(([title, text]) => (
                <div className="info-card" key={title}>
                  <div className="ico">+</div>
                  <div>
                    <h4>{title}</h4>
                    <p>{text.split('|').map((line, i) => <React.Fragment key={line}>{i > 0 && <br />}{line}</React.Fragment>)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="glass reveal" style={{ padding: 36 }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Send us a message</h3>
              <p className="text-dim" style={{ fontSize: 14, marginBottom: 24 }}>
                We typically respond within an hour during working hours.
              </p>
              <DemoForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
