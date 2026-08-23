import React from 'react';
import { specialties } from '../data/siteData';
import { AppLink } from '../components/Navigation';

function Stat({ n, l }) {
  return <div className="hero-stat"><div className="num">{n}</div><div className="label">{l}</div></div>;
}

export default function Home({ go }) {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="eyebrow reveal"><span className="dot" /> Best &amp; Most Reliable Hospital in Punjab</span>
              <h1 className="reveal" data-delay="1">Healthcare,<br />reimagined for you.</h1>
              <p className="hero-sub reveal" data-delay="2">
                Where cutting-edge medicine meets human warmth. MediSphere brings together 45+ super-specialties,
                300+ beds, and leading clinicians to deliver uncompromising healthcare.
              </p>
              <div className="hero-ctas reveal" data-delay="3">
                <AppLink to="/appointment" go={go} className="btn btn-primary">Book Appointment →</AppLink>
                <AppLink to="/doctors" go={go} className="btn btn-ghost">Meet our doctors</AppLink>
              </div>
            </div>

            <div className="reveal" data-delay="2">
              <div className="hero-visual">
                <img src="/assets/img/slider/1.jpg" alt="MediSphere" />
                <div className="floating-card tl"><strong>Live monitoring</strong><div>96 ICU beds online</div></div>
                <div className="floating-card br"><strong>NABH accredited</strong><div>Best Hospital — 2026</div></div>
              </div>
            </div>
          </div>

          <div className="hero-stats reveal" data-delay="3">
            <Stat n="300+" l="Beds" />
            <Stat n="45+" l="Specialities" />
            <Stat n="17" l="Operation Theatres" />
            <Stat n="24/7" l="Emergency" />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="reveal">
            <span className="eyebrow"><span className="dot" /> Our Specialities</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              Care that spans <span className="grad">every system.</span>
            </h2>
            <p className="section-lead">
              From accelerated emergency response to precision surgical suites — an ecosystem of 45+ specialities,
              engineered to meet you wherever you need us.
            </p>
          </div>

          <div className="bento">
            {specialties.map(([title, text, extra], i) => (
              <div key={title} className={`spec-card reveal ${extra}`} data-delay={(i % 3) + 1}>
                <div className="ico">+</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
