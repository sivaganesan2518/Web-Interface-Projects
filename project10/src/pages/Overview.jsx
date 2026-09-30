import React from 'react';
import { Link } from 'react-router-dom';
import StatBox from '../components/StatBox';
import SectionHeading from '../components/SectionHeading';
import EmptyState from '../components/EmptyState';

const average = (values) =>
  values.length
    ? values.reduce((a, b) => a + b, 0) / values.length
    : 0;

function getStudentSummary(learners, marks) {
  return learners.map((student) => {
    const own = marks.filter((m) => m.studentId === student.id);

    const pct = own.length
      ? (average(own.map((m) => Number(m.marks))) / 100) * 100
      : 0;

    return {
      ...student,
      pct,
      count: own.length
    };
  });
}

export default function Overview({ learners, marks, attendance }) {
  const summaries = getStudentSummary(learners, marks);

  const percentages = summaries
    .filter((s) => s.count)
    .map((s) => s.pct);

  const avgPct = average(percentages);

  const attendanceRows = Object.values(attendance);

  const present = attendanceRows.filter(
    (r) => r.status === 'Present'
  ).length;

  const attendancePct = attendanceRows.length
    ? (present / attendanceRows.length) * 100
    : 0;

  const recent = [...learners].slice(-4).reverse();

  const markedLearners = new Set(
    marks.map((m) => m.studentId)
  ).size;

  return (
    <div className="page-stack">

      <section className="hero-board">

        <div className="hero-main">

          <div className="stamp">
            FIELD NOTE 03
          </div>

          <h2>
            One desk.
            <br />
            <i>Every learner.</i>
          </h2>

          <p>
            Academic Compass keeps learner records, marks, attendance
            and study plans connected so you can move from a name to
            a useful insight without changing systems.
          </p>

          <div className="hero-links">
            <Link to="/learners" className="ink-btn">
              Open directory ↗
            </Link>

            <Link to="/planner" className="text-link">
              View study planner
            </Link>
          </div>

        </div>

        <div className="hero-metric">

          <span>CLASS PULSE</span>

          <strong>
            {avgPct ? `${avgPct.toFixed(1)}%` : '—'}
          </strong>

          <p>
            average marked percentage
          </p>

          <div className="meter">
            <span
              style={{
                width: `${Math.min(avgPct, 100)}%`
              }}
            />
          </div>

          <small>
            {markedLearners} of {learners.length} learners have marks
          </small>

        </div>

      </section>

      <div className="stat-strip">

        <StatBox
          label="Learners"
          value={learners.length}
          note="active directory"
          accent="olive"
        />

        <StatBox
          label="Marked"
          value={markedLearners}
          note="with subject entries"
          accent="rust"
        />

        <StatBox
          label="Average"
          value={
            percentages.length
              ? `${avgPct.toFixed(1)}%`
              : '—'
          }
          note="across learners"
          accent="gold"
        />

        <StatBox
          label="Attendance"
          value={
            attendanceRows.length
              ? `${attendancePct.toFixed(0)}%`
              : '—'
          }
          note="recorded roll calls"
          accent="wine"
        />

      </div>

      <div className="two-column">

        <section className="paper-panel">

          <SectionHeading
            eyebrow="RECENT ENTRIES"
            title="New to the register"
          />

          {recent.length ? (
            <div className="recent-list">

              {recent.map((student, index) => (

                <div
                  className="recent-item"
                  key={student.id}
                >

                  <span className="index">
                    0{index + 1}
                  </span>

                  <div>
                    <b>{student.name}</b>

                    <small>
                      {student.roll} • {student.className}
                    </small>
                  </div>

                  <span className="initials">
                    {student.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </span>

                </div>

              ))}

            </div>
          ) : (
            <EmptyState
              title="No learners yet"
              text="Use the directory to add your first learner."
            />
          )}

        </section>

        <section className="paper-panel quick-panel">

          <SectionHeading
            eyebrow="SHORTCUTS"
            title="Go straight to the desk"
          />

          <Link
            to="/gradebook"
            className="quick-row"
          >
            <span>01</span>

            <div>
              <b>Record marks</b>
              <small>Enter subject-wise scores</small>
            </div>

            <strong>→</strong>
          </Link>

          <Link
            to="/attendance"
            className="quick-row"
          >
            <span>02</span>

            <div>
              <b>Take attendance</b>
              <small>Mark today's roll call</small>
            </div>

            <strong>→</strong>
          </Link>

          <Link
            to="/performance"
            className="quick-row"
          >
            <span>03</span>

            <div>
              <b>Read performance</b>
              <small>Compare class patterns</small>
            </div>

            <strong>→</strong>
          </Link>

        </section>

      </div>

    </div>
  );
}