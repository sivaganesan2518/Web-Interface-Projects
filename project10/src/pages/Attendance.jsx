
import React, { useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import EmptyState from '../components/EmptyState';

function key(date, className, studentId) {
  return `${date}|${className}|${studentId}`;
}

export default function Attendance({
  learners,
  attendance,
  setAttendance
}) {
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState(today);

  const classes = [
    ...new Set(learners.map((s) => s.className))
  ];

  const [className, setClassName] = useState(
    classes[0] || ''
  );

  const students = useMemo(
    () =>
      learners.filter(
        (s) =>
          !className ||
          s.className === className
      ),
    [learners, className]
  );

  function setStatus(studentId, status) {
    setAttendance({
      ...attendance,
      [key(date, className, studentId)]: {
        date,
        className,
        studentId,
        status
      }
    });
  }

  function studentRate(studentId) {
    const rows = Object.values(attendance).filter(
      (r) => r.studentId === studentId
    );

    if (!rows.length) {
      return null;
    }

    return (
      (rows.filter(
        (r) => r.status === 'Present'
      ).length /
        rows.length) *
      100
    );
  }

  const dayRows = students.map((s) => ({
    student: s,
    row: attendance[
      key(date, className, s.id)
    ]
  }));

  const present = dayRows.filter(
    (x) => x.row?.status === 'Present'
  ).length;

  const absent = dayRows.filter(
    (x) => x.row?.status === 'Absent'
  ).length;

  return (
    <div className="page-stack">

      {/* ATTENDANCE SUMMARY */}
      <section className="attendance-banner">
        <div>
          <span>
            ROLL CALL / {date}
          </span>

          <h2>
            {className || 'Choose a class'}{' '}
            <i>attendance</i>
          </h2>

          <p>
            Click a status once. The record is
            saved instantly in your browser.
          </p>
        </div>

        <div className="attendance-counts">
          <b>
            {present}
            <small>Present</small>
          </b>

          <b>
            {absent}
            <small>Absent</small>
          </b>

          <b>
            {students.length}
            <small>Students</small>
          </b>
        </div>
      </section>

      {/* ROLL CALL */}
      <section className="paper-panel">
        <SectionHeading
          eyebrow="ROLL CALL DESK"
          title="Mark today's class"
        >
          <div className="attendance-filters">

            <label>
              Date

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />
            </label>

            <label>
              Class

              <select
                value={className}
                onChange={(e) =>
                  setClassName(e.target.value)
                }
              >
                {classes.map((c) => (
                  <option
                    key={c}
                    value={c}
                  >
                    {c}
                  </option>
                ))}
              </select>
            </label>

          </div>
        </SectionHeading>

        {students.length ? (
          <div className="attendance-list">

            {students.map(
              ({
                id,
                name,
                roll,
                className: cls
              }) => {
                const row =
                  attendance[
                    key(
                      date,
                      className,
                      id
                    )
                  ];

                const rate =
                  studentRate(id);

                return (
                  <div
                    className="attendance-row"
                    key={id}
                  >

                    {/* STUDENT */}
                    <div className="attendance-person">
                      <span className="avatar">
                        {name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </span>

                      <div>
                        <b>{name}</b>

                        <small>
                          #{roll} • {cls}
                        </small>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div className="status-switch">

                      <button
                        type="button"
                        className={
                          row?.status ===
                          'Present'
                            ? 'status active-present'
                            : 'status'
                        }
                        onClick={() =>
                          setStatus(
                            id,
                            'Present'
                          )
                        }
                      >
                        Present
                      </button>

                      <button
                        type="button"
                        className={
                          row?.status ===
                          'Absent'
                            ? 'status active-absent'
                            : 'status'
                        }
                        onClick={() =>
                          setStatus(
                            id,
                            'Absent'
                          )
                        }
                      >
                        Absent
                      </button>

                    </div>

                    {/* ATTENDANCE RATE */}
                    <div className="attendance-rate">
                      <span
                        style={{
                          width: `${
                            rate ?? 0
                          }%`
                        }}
                      />

                      <b>
                        {rate == null
                          ? '—'
                          : `${rate.toFixed(
                              0
                            )}%`}
                      </b>
                    </div>

                  </div>
                );
              }
            )}

          </div>
        ) : (
          <EmptyState
            title="No learners in this class"
            text="Add learners from the directory first."
          />
        )}
      </section>

    </div>
  );
}

