import React from 'react';
import { useLocation } from 'react-router-dom';

const titles = {
  '/overview': [
    'Good morning, faculty desk',
    'A quick look at the academic day.'
  ],
  '/learners': [
    'Learner directory',
    'Build a clear class register without paperwork.'
  ],
  '/gradebook': [
    'Marks & gradebook',
    'Capture subject results and let the totals calculate themselves.'
  ],
  '/attendance': [
    'Attendance tracker',
    'Take today’s roll call in a calmer, faster view.'
  ],
  '/performance': [
    'Performance insights',
    'Read the patterns behind the stored results.'
  ],
  '/planner': [
    'Study planner',
    'Turn upcoming academic work into small, trackable tasks.'
  ]
};

export default function Header({ learners }) {
  const location = useLocation();

  const [title, subtitle] =
    titles[location.pathname] || titles['/overview'];

  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <header className="topbar">

      <div className="crumb">
        <span>ACADEMIC COMPASS</span>
        <b>/</b>
        <em>{title}</em>
      </div>

      <div className="top-meta">

        <div className="date-chip">
          {today}
        </div>

        <div className="mini-profile">
          <span>FD</span>

          <div>
            <b>Faculty Desk</b>
            <small>{learners.length} learners</small>
          </div>
        </div>

      </div>

      <div className="header-copy">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

    </header>
  );
}