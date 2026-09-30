
import React, { useMemo, useState } from 'react';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import SectionHeading from '../components/SectionHeading';

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

function gradeClass(g) {
  return `grade-${g.replace('+', 'plus').toLowerCase()}`;
}

export default function Gradebook({ learners, marks, setMarks }) {
  const [studentId, setStudentId] = useState(learners[0]?.id || '');
  const [subject, setSubject] = useState(subjects[0]);
  const [score, setScore] = useState('');
  const [error, setError] = useState('');
  const [removeId, setRemoveId] = useState(null);

  const grouped = useMemo(
    () =>
      learners
        .map((s) => {
          const entries = marks.filter(
            (m) => m.studentId === s.id
          );

          const total = entries.reduce(
            (sum, m) => sum + Number(m.marks),
            0
          );

          const percentage = entries.length
            ? total / entries.length
            : 0;

          return {
            ...s,
            entries,
            total,
            percentage,
            grade: grade(percentage)
          };
        })
        .filter((s) => s.entries.length),
    [learners, marks]
  );

  function addMark(e) {
    e.preventDefault();
    setError('');

    const value = Number(score);

    if (!studentId) {
      setError('Choose a learner first.');
      return;
    }

    if (
      score === '' ||
      Number.isNaN(value) ||
      value < 0 ||
      value > 100
    ) {
      setError('Marks must be between 0 and 100.');
      return;
    }

    if (
      marks.some(
        (m) =>
          m.studentId === Number(studentId) &&
          m.subject === subject
      )
    ) {
      setError(
        'A mark for this subject already exists. Delete it before re-entering.'
      );
      return;
    }

    setMarks([
      ...marks,
      {
        id: Date.now(),
        studentId: Number(studentId),
        subject,
        marks: value
      }
    ]);

    setScore('');
  }

  function remove() {
    setMarks(
      marks.filter((m) => m.id !== removeId)
    );

    setRemoveId(null);
  }

  return (
    <div className="page-stack">

      {/* MARK ENTRY */}
      <section className="paper-panel grade-entry">
        <SectionHeading
          eyebrow="TEACHER ENTRY"
          title="Write a result into the book"
        >
          <span className="formula">
            Total ÷ subjects = percentage
          </span>
        </SectionHeading>

        <form
          onSubmit={addMark}
          className="grade-form"
        >
          <label>
            Learner

            <select
              value={studentId}
              onChange={(e) =>
                setStudentId(e.target.value)
              }
            >
              {learners.length ? (
                learners.map((s) => (
                  <option
                    key={s.id}
                    value={s.id}
                  >
                    {s.name} • {s.roll}
                  </option>
                ))
              ) : (
                <option value="">
                  No learners
                </option>
              )}
            </select>
          </label>

          <label>
            Subject

            <select
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
            >
              {subjects.map((s) => (
                <option
                  key={s}
                  value={s}
                >
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label>
            Marks

            <input
              type="number"
              min="0"
              max="100"
              value={score}
              onChange={(e) =>
                setScore(e.target.value)
              }
              placeholder="0 - 100"
            />
          </label>

          <button
            className="primary-btn"
            type="submit"
          >
            Save mark
          </button>
        </form>

        {error && (
          <p className="form-alert">
            {error}
          </p>
        )}
      </section>

      {/* GRADEBOOK */}
      <section className="paper-panel">
        <SectionHeading
          eyebrow="STORED RESULTS"
          title="Gradebook"
        >
          <span className="count-badge">
            {marks.length} subject entries
          </span>
        </SectionHeading>

        {grouped.length ? (
          <div className="gradebook-list">

            {grouped.map((s) => (
              <article
                className="result-card"
                key={s.id}
              >

                {/* RESULT HEADER */}
                <div className="result-head">

                  <div>
                    <span className="roll-tag">
                      #{s.roll}
                    </span>

                    <h3>{s.name}</h3>

                    <small>
                      {s.className}
                    </small>
                  </div>

                  <div className="result-summary">
                    <strong>
                      {s.total}
                    </strong>

                    <span>
                      Total
                    </span>

                    <b
                      className={gradeClass(
                        s.grade
                      )}
                    >
                      {s.grade}
                    </b>

                    <span>
                      {s.percentage.toFixed(1)}%
                    </span>
                  </div>

                </div>

                {/* SUBJECT MARKS */}
                <div className="subject-grid">

                  {subjects.map((sub) => {
                    const item = s.entries.find(
                      (m) => m.subject === sub
                    );

                    return (
                      <div
                        className={
                          item
                            ? 'subject-pill filled'
                            : 'subject-pill'
                        }
                        key={sub}
                      >

                        <span>
                          {sub}
                        </span>

                        {item ? (
                          <>
                            <b>
                              {item.marks}
                            </b>

                            <button
                              type="button"
                              onClick={() =>
                                setRemoveId(item.id)
                              }
                              aria-label={`Delete ${sub}`}
                            >
                              ×
                            </button>
                          </>
                        ) : (
                          <em>—</em>
                        )}

                      </div>
                    );
                  })}

                </div>

              </article>
            ))}

          </div>
        ) : (
          <EmptyState
            title="Gradebook is quiet"
            text="Choose a learner and enter their first subject mark above."
          />
        )}
      </section>

      {/* DELETE CONFIRMATION */}
      {removeId && (
        <ConfirmDialog
          message="Remove this subject mark from the stored gradebook?"
          onCancel={() =>
            setRemoveId(null)
          }
          onConfirm={remove}
        />
      )}

    </div>
  );
}

