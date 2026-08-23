import React from 'react';
import PageHero from '../components/PageHero';
import { doctors } from '../data/siteData';

export default function Doctors() {
  return (
    <>
      <PageHero title="Meet our specialist">
        A team of physicians, surgeons, and carers — each chosen not just for their expertise, but for their conviction that medicine is a service.
      </PageHero>
      <section className="section-sm">
        <div className="container">
          <div className="doctor-grid">
            {doctors.map(([id, specialty, name, degree], i) => (
              <div className="doctor-card reveal" data-delay={i % 4} key={id}>
                <div className="doctor-img"><img src={`/assets/img/team/${id}.jpg`} alt={name} /></div>
                <div className="doctor-info">
                  <span className="specialty">{specialty}</span>
                  <h4>{name}</h4>
                  <div className="degree">{degree}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
