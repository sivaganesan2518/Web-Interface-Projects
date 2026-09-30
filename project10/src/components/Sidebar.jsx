import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/overview', icon: '⌂', label: 'Overview' },
  { to: '/learners', icon: '♙', label: 'Learner Directory' },
  { to: '/gradebook', icon: '✎', label: 'Marks & Gradebook' },
  { to: '/attendance', icon: '◷', label: 'Attendance' },
  { to: '/performance', icon: '↗', label: 'Performance' },
  { to: '/planner', icon: '☷', label: 'Study Planner' }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="brand">
        <div className="brand-mark">AC</div>

        <div>
          <strong>Academic</strong>
          <span>Compass</span>
        </div>
      </div>

      <div className="side-note">
        <span className="dot" />

        <div>
          <small>Campus desk</small>
          <b>2026 • Semester 03</b>
        </div>
      </div>

      <nav className="nav-list" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <span className="nav-icon">
              {link.icon}
            </span>

            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="book-spine" />

        <p>
          Keep every learner's journey in one place.
        </p>
      </div>

    </aside>
  );
}