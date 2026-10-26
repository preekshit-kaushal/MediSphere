import React, { useState } from 'react';

const getCategory = bmi => {
  if (bmi < 18.5) return { label: 'Underweight', message: 'A balanced nutrition plan may help you reach a healthier range.' };
  if (bmi < 25) return { label: 'Healthy weight', message: 'Your BMI is in the generally healthy adult range.' };
  if (bmi < 30) return { label: 'Overweight', message: 'Small, sustainable lifestyle changes can support your health.' };
  return { label: 'Obesity range', message: 'Consider speaking with a healthcare professional for personalised guidance.' };
};

/**
 * Frontend-only BMI calculator for adults. Import and render with <BMIcal />.
 */
export default function BMIcal() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = event => {
    event.preventDefault();
    const heightInCm = Number(height);
    const weightInKg = Number(weight);

    if (!heightInCm || !weightInKg || heightInCm < 50 || heightInCm > 250 || weightInKg < 10 || weightInKg > 500) {
      setResult(null);
      setError('Enter a height between 50–250 cm and a weight between 10–500 kg.');
      return;
    }

    const bmi = weightInKg / ((heightInCm / 100) ** 2);
    setError('');
    setResult({ bmi: bmi.toFixed(1), ...getCategory(bmi) });
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setResult(null);
    setError('');
  };

  return (
    <section className="section" aria-labelledby="bmi-title">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="card">
          <span className="eyebrow"><span className="dot" /> Health tools</span>
          <h2 id="bmi-title" className="section-title" style={{ marginTop: 12 }}>BMI Calculator</h2>
          <p className="text-dim">Calculate your Body Mass Index using your height and weight.</p>

          <form onSubmit={calculate} noValidate>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="bmi-height">Height (cm)</label>
                <input id="bmi-height" className="form-control" type="number" min="50" max="250" step="0.1" inputMode="decimal" value={height} onChange={event => setHeight(event.target.value)} placeholder="e.g. 170" required />
              </div>
              <div className="form-group">
                <label htmlFor="bmi-weight">Weight (kg)</label>
                <input id="bmi-weight" className="form-control" type="number" min="10" max="500" step="0.1" inputMode="decimal" value={weight} onChange={event => setWeight(event.target.value)} placeholder="e.g. 65" required />
              </div>
            </div>
            {error && <p className="field-error" role="alert">{error}</p>}
            <div className="form-actions" style={{ justifyContent: 'flex-start' }}>
              <button className="btn btn-primary" type="submit">Calculate BMI</button>
              <button className="btn btn-secondary" type="button" onClick={reset}>Reset</button>
            </div>
          </form>

          {result && (
            <div className="booking-summary" role="status" aria-live="polite">
              <p><strong>Your BMI: {result.bmi}</strong></p>
              <p><strong>Category:</strong> {result.label}</p>
              <p className="text-dim">{result.message}</p>
            </div>
          )}

          <p className="text-dim" style={{ marginBottom: 0, marginTop: 18, fontSize: '.85rem' }}>
            BMI is a screening measure for adults and does not replace advice from a healthcare professional.
          </p>
        </div>
      </div>
    </section>
  );
}
