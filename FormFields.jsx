import React from 'react';

export function Field({ label, type = 'text', placeholder }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} className="form-control" required placeholder={placeholder} />
    </div>
  );
}

export function Select({ label, name, options }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} className="form-control">
        {options.map(option => (
          <option
            key={option}
            value={option === 'Any Available Specialist' ? 'Any Available' : option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
