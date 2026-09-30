import React from 'react';

export default function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>

      {children}
    </div>
  );
}