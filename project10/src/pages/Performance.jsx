
import React from 'react';
import SectionHeading from '../components/SectionHeading';
import EmptyState from '../components/EmptyState';

const subjects = [
  'Tamil',
  'English',
  'Mathematics',
  'Science',
  'Social Science'
];

function grade(mark) {
  if (mark >= 90) return 'A+';
  if (mark >= 80) return 'A';
  if (mark >= 70) return 'B+';
  if (mark >= 60) return 'B';
  if (mark >= 50) return 'C';
  return 'F';
}

function average(values) {
  return values.length
    ? values.reduce((x, y) => x + y, 0) / values.length
    : 0;
}

export default function Performance({ learners, marks }) {
  const rows = learners
    .map((student) => {
      const own = marks.filter(
        (m) => m.studentId === student.id
      );

      const total = own.reduce(
        (sum, m) => sum + Number(m.marks),
        0
      );

      const pct = own.length
        ? total / own.length
        : 0;

      return {
        ...student,
        total,
        pct,
        grade: grade(pct),
        entries: own.length
      };
    })
    .filter((s) => s.entries);

  const percentages = rows.map(
    (r) => r.pct
  );

  const subjectRows = subjects.map(
    (subject) => {
      const values = marks
        .filter((m) => m.subject === subject)
        .map((m) => Number(m.marks));

      return {
        subject,
        value: average(values),
        count: values.length
      };
    }
  );

  const classAverage = average(
    percentages
  );

  const pass = rows.filter(
    (r) => r.pct >= 50
  ).length;

  const fail = rows.filter(
    (r) => r.pct < 50
  ).length;

  const highest = rows.length
    ? Math.max(...percentages)
    : 0;

  const lowest = rows.length
    ? Math.min(...percentages)
    : 0;

  return (
    <div className="page-stack">

      {/* INTRO */}
      <section className="insight-intro">
        <div>
          <span>
            READ THE MARGIN NOTES
          </span>

          <h2>
            What do the results{' '}
            <i>tell us?</i>
          </h2>

          <p>
            These indicators are calculated
            directly from the gradebook.
            No separate data entry is needed.
          </p>
        </div>

        <div className="insight-number">
          <strong>
            {classAverage
              ? classAverage.toFixed(1)
              : '—'}
          </strong>

          <span>
            class average %
          </span>
        </div>
      </section>

      {/* INSIGHT CARDS */}
      <div className="insight-grid">

        <div className="insight-card">
          <span>HIGHEST</span>

          <strong>
            {highest
              ? `${highest.toFixed(1)}%`
              : '—'}
          </strong>

          <small>
            top stored percentage
          </small>
        </div>

        <div className="insight-card">
          <span>LOWEST</span>

          <strong>
            {rows.length
              ? `${lowest.toFixed(1)}%`
              : '—'}
          </strong>

          <small>
            lowest stored percentage
          </small>
        </div>

        <div className="insight-card">
          <span>PASS COUNT</span>

          <strong>{pass}</strong>

          <small>
            50% or above
          </small>
        </div>

        <div className="insight-card">
          <span>FAIL COUNT</span>

          <strong>{fail}</strong>

          <small>
            below 50%
          </small>
        </div>

      </div>

      {/* SUBJECT + STUDENT VIEW */}
      <div className="two-column">

        {/* SUBJECT VIEW */}
        <section className="paper-panel">

          <SectionHeading
            eyebrow="SUBJECT VIEW"
            title="Average by subject"
          />

          {subjectRows.map((row) => (
            <div
              className="bar-row"
              key={row.subject}
            >

              <div>
                <b>{row.subject}</b>

                <small>
                  {row.count} mark
                  {row.count !== 1
                    ? 's'
                    : ''}
                </small>
              </div>

              <div className="bar-track">
                <span
                  style={{
                    width: `${Math.min(
                      row.value,
                      100
                    )}%`
                  }}
                />
              </div>

              <strong>
                {row.count
                  ? `${row.value.toFixed(
                      1
                    )}%`
                  : '—'}
              </strong>

            </div>
          ))}

        </section>

        {/* STUDENT VIEW */}
        <section className="paper-panel">

          <SectionHeading
            eyebrow="STUDENT VIEW"
            title="Performance notes"
          />

          {rows.length ? (
            <div className="student-notes">

              {[...rows]
                .sort(
                  (a, b) =>
                    b.pct - a.pct
                )
                .map((r) => (
                  <div
                    className="note-line"
                    key={r.id}
                  >

                    <span className="avatar small">
                      {r.name
                        .split(' ')
                        .map(
                          (n) => n[0]
                        )
                        .join('')
                        .slice(0, 2)}
                    </span>

                    <div>
                      <b>{r.name}</b>

                      <small>
                        {r.className} •{' '}
                        {r.entries}/5 subjects
                      </small>
                    </div>

                    <strong>
                      {r.pct.toFixed(1)}%
                    </strong>

                  </div>
                ))}

            </div>
          ) : (
            <EmptyState
              title="No performance data"
              text="Add marks in the gradebook to generate insights."
            />
          )}

        </section>

      </div>

      {/* PERFORMANCE TABLE */}
      <section className="paper-panel">

        <SectionHeading
          eyebrow="RESULT REGISTER"
          title="Student performance"
        />

        <div className="performance-table">

          <div className="table-head">
            <span>Student</span>
            <span>Total</span>
            <span>Percentage</span>
            <span>Grade</span>
            <span>Status</span>
          </div>

          {rows.length ? (
            rows.map((r) => (
              <div
                className="performance-row"
                key={r.id}
              >

                <div className="person-cell">
                  <span className="avatar small">
                    {r.name
                      .split(' ')
                      .map(
                        (n) => n[0]
                      )
                      .join('')
                      .slice(0, 2)}
                  </span>

                  <b>{r.name}</b>
                </div>

                <span>
                  {r.total}
                </span>

                <strong>
                  {r.pct.toFixed(1)}%
                </strong>

                <span className="grade-tag">
                  {r.grade}
                </span>

                <span
                  className={
                    r.pct >= 50
                      ? 'pass-tag'
                      : 'fail-tag'
                  }
                >
                  {r.pct >= 50
                    ? 'Pass'
                    : 'Fail'}
                </span>

              </div>
            ))
          ) : (
            <EmptyState
              title="Nothing to analyse"
              text="Stored marks will appear here."
            />
          )}

        </div>

      </section>

    </div>
  );
}

