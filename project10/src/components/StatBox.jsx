import React from 'react';

export default function StatBox({ label, value, note, accent = '' }) {
  return (
    <div className={`stat-box ${accent}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}