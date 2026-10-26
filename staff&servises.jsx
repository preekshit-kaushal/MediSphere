import React, { useState, useEffect, useRef, useMemo } from 'react';
import { initialStaffData, serviceCategories } from '../data/staffData';

const PAGE_SIZE = 6;

export default function Staff() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const filtered = useMemo(() => {
    return initialStaffData.filter(s => {
      const matchCat = category === 'all' || s.roleCategory === category;
      const term = search.toLowerCase();
      const matchSearch =
        !term ||
        s.name.toLowerCase().includes(term) ||
        s.roleTitle.toLowerCase().includes(term) ||
        s.assignedLocation.toLowerCase().includes(term);
      return matchCat && matchSearch;
    });
  }, [category, search]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category, search]);

  useEffect(() => {
    const sentinel = loaderRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && visibleCount < filtered.length) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount(prev => prev + PAGE_SIZE);
            setLoading(false);
          }, 300);
        }
      },
      { rootMargin: '150px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, filtered.length, loading]);

  const handleDummyCall = (name, action) => {
    alert(`${action} signal sent to ${name}. Staff has been notified.`);
  };

  return (
    <div className="staff-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Hospital Support</span>
          <h1>Staff Directory & Assistance</h1>
          <p>Find personal nurses, floor janitors, orderlies, and duty doctors on shift.</p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="staff-filter-card">
            <input
              type="text"
              className="form-control"
              placeholder="Search staff by name, role, or floor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <div className="category-pills" style={{ marginTop: '14px' }}>
              {serviceCategories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  className={`pill-btn ${category === cat.id ? 'active' : ''}`}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="filter-summary">
              Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} staff members
            </div>
          </div>

          <div className="staff-grid">
            {filtered.slice(0, visibleCount).map(staff => (
              <div key={staff.id} className="staff-card">
                <div className="staff-card-header">
                  <img src={staff.avatar} alt={staff.name} className="staff-avatar" loading="lazy" />
                  <div className="staff-title-group">
                    <div className="staff-header-top">
                      <h4>{staff.name}</h4>
                      <span className={`status-tag status-${staff.status}`}>
                        {staff.status === 'available' ? 'Available' : 'On Duty'}
                      </span>
                    </div>
                    <span className="staff-role">{staff.roleTitle}</span>
                    <span className="staff-dept">{staff.assignedLocation}</span>
                  </div>
                </div>

                <div className="staff-actions" style={{ marginTop: '16px' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleDummyCall(staff.name, 'Call')}
                  >
                    Call Staff
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleDummyCall(staff.name, 'Service request')}
                  >
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Infinite Scroll Sentinel with Observer */}
          <div ref={loaderRef} className="scroll-sentinel" style={{ minHeight: '60px', padding: '20px 0' }}>
            {loading && (
              <p className="infinite-loader">
                <span className="spinner" /> Loading more staff...
              </p>
            )}
            {!loading && visibleCount >= filtered.length && (
              <p className="end-of-list">All {filtered.length} staff members loaded.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
