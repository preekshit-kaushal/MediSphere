import React, { useState } from 'react';
import PageHero from '../components/PageHero';
import { gallery } from '../data/siteData';

export default function Gallery() {
  const [image, setImage] = useState(null);

  return (
    <>
      <PageHero title="Glimpse Inside MediSphere.">
        Every room, every corridor, every piece of equipment — designed around you.
      </PageHero>

      <section className="section-sm">
        <div className="container">
          <div className="gallery-grid">
            {gallery.map(([src, alt, caption, classes], i) => (
              <div
                role="button"
                tabIndex="0"
                onClick={() => setImage('/' + src)}
                onKeyDown={e => e.key === 'Enter' && setImage('/' + src)}
                className={`gallery-item ${classes} reveal`}
                data-delay={i % 4}
                key={src}
              >
                <img src={'/' + src} alt={alt} />
                <div className="caption">{caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`lightbox ${image ? 'is-open' : ''}`} onClick={() => setImage(null)}>
        <button className="close-lb" aria-label="Close" onClick={() => setImage(null)}>×</button>
        <img src={image || ''} alt="" onClick={e => e.stopPropagation()} />
      </div>
    </>
  );
}
