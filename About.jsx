import React from 'react';
import PageHero from '../components/PageHero';
import { AppLink } from '../components/Navigation';
import { aboutValues } from '../data/siteData';

function Info({ title, heading, text }) {
  return (
    <div className="card reveal">
      <span className="eyebrow"><span className="dot" /> {title}</span>
      <h3 style={{ marginTop: 16, fontSize: '1.4rem' }}>{heading}</h3>
      <p className="text-dim">{text}</p>
    </div>
  );
}

export default function About({ go }) {
  return (
    <>
      <PageHero title="About Us">
        A multi-speciality institution born of a single idea — that quality and affordability should never be mutually exclusive.
      </PageHero>

      <section className="section-sm">
        <div className="container">
          <div className="about-grid">
            <div className="reveal">
              <span className="eyebrow"><span className="dot" /> Our Story</span>
              <h2 className="section-title" style={{ marginTop: 18 }}>Built on trust, powered by science.</h2>
              <p className="text-dim">
                Opposite To Chitkara University, MediSphere brings state-of-the-art facilities and treatments
                under one roof — built around the patient, not the procedure.
              </p>
              <p className="text-dim">
                With multiple treatment options, latest-generation technology, 24/7 ambulance response, and a
                curated team of experienced specialists, we were recognised as <strong>Best Hospital 2026</strong> — a milestone, not a destination.
              </p>
              <div className="hero-ctas" style={{ marginTop: 24 }}>
                <AppLink to="/doctors" go={go} className="btn btn-primary">Meet our doctors →</AppLink>
                <AppLink to="/contact" go={go} className="btn btn-ghost">Visit us</AppLink>
              </div>
            </div>
            <div className="reveal">
              <div className="about-img"><img src="/MediSphere%20Building%20View.png" alt="MediSphere" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal text-center" style={{ margin: '0 auto 50px', maxWidth: 720, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="section-title" style={{ marginTop: 18, textAlign: 'center' }}>
              &quot;Well-being as a humane commitment to enliven humanity.&quot;
            </h2>
          </div>
          <div className="about-grid">
            <Info title="Vision" heading="Enlivening humanity, one patient at a time." text="To ensure well-being as a humane commitment — raising the standard of healthcare in every life we touch." />
            <Info title="Mission" heading="Available. Accessible. Affordable." text="Safe, efficacious, professional, and ethical care — delivered with the rigor of science and the warmth of hospitality." />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal"><h2 className="section-title" style={{ marginTop: 18 }}>Five words we live by.</h2></div>
          <div className="values" style={{ marginTop: 40 }}>
            {aboutValues.map((value, index) => {
              const [title, text] = value.split('|');
              return (
                <div className="value reveal" key={title}>
                  <div className="n">0{index + 1}</div>
                  <strong>{title}</strong>
                  <p className="text-dim" style={{ fontSize: 13, margin: '8px 0 0' }}>{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
