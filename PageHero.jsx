import React from 'react';

export default function PageHero({ title, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1 className="reveal">{title}</h1>
        <p className="reveal" data-delay="1">{children}</p>
      </div>
    </section>
  );
}
