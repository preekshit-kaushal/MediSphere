import React from 'react';
import { AppLink, Brand } from './Navigation';

function Column({ title, links, go }) {
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {links.map(([to, label]) => (
          <li key={to}><AppLink to={to} go={go}>{label}</AppLink></li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ go }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand go={go} />
            <p className="text-dim mt-6" style={{ maxWidth: 340, fontSize: 14 }}>
              MediSphere bridges the gap between healthcare providers and patient care through
              intelligent, integrated management software. From appointment scheduling to
              electronic health records, it simplifies hospital operations while maintaining
              the highest standards of quality and accessibility.
            </p>
          </div>

          <Column
            title="Explore"
            links={[['/about', 'About Us'], ['/doctors', 'Our Doctors'], ['/gallery', 'Gallery']]}
            go={go}
          />

          <Column
            title="Services"
            links={[['/appointment', 'Book Appointment'], ['/registration', 'Patient Registration'], ['/contact', 'Emergency']]}
            go={go}
          />

          <div>
            <h4>Contact</h4>
            <ul>
              <li>Opposite To Chitkara University Rajpura, Punjab</li>
              <li><a href="tel:+9198700">+91 98700 xxxxx</a></li>
              <li>medisphere@gmail.com</li>
              <li style={{ color: 'red' }}>● 24/7 Emergency</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} MediSphere. All rights reserved.<br />
            Read all Terms and Conditions.
          </span>
          <span>
            <AppLink to="/privacy" go={go}>Privacy</AppLink> ·{' '}
            <AppLink to="/terms" go={go}>Terms</AppLink>
          </span>
        </div>
      </div>
    </footer>
  );
}
