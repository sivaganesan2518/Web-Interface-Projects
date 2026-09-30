
import React, { useState } from 'react';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import SectionHeading from '../components/SectionHeading';

const blank = {
  title: '',
  subject: '',
  date: '',
  priority: 'Medium'
};

export default function StudyPlanner({
  plans,
  setPlans
}) {
  const [form, setForm] = useState(blank);
  const [error, setError] = useState('');
  const [removeId, setRemoveId] = useState(null);

  function submit(e) {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.subject.trim() ||
      !form.date
    ) {
      setError(
        'Title, subject and date are required.'
      );
      return;
    }

    setPlans([
      ...plans,
      {
        ...form,
        title: form.title.trim(),
        subject: form.subject.trim(),
        id: Date.now(),
        done: false
      }
    ]);

    setForm(blank);
    setError('');
  }

  function toggle(id) {
    setPlans(
      plans.map((p) =>
        p.id === id
          ? { ...p, done: !p.done }
          : p
      )
    );
  }

  function remove() {
    setPlans(
      plans.filter((p) => p.id !== removeId)
    );

    setRemoveId(null);
  }

  const pending = plans.filter(
    (p) => !p.done
  ).length;

  return (
    <div className="page-stack">

      {/* PLANNER INTRO */}
      <section className="planner-cover">
        <div>
          <span>
            EXTRA MODULE / STUDENT LIFE
          </span>

          <h2>
            A small plan beats
            <br />
            <i>a crowded mind.</i>
          </h2>

          <p>
            Use this page for revision targets,
            assignment reminders or lab
            preparation. It is stored locally
            just like the academic records.
          </p>
        </div>

        <div className="plan-count">
          <strong>{pending}</strong>
          <span>open tasks</span>
        </div>
      </section>

      {/* FORM + PLANNER */}
      <div className="split-layout">

        {/* ADD TASK */}
        <section className="paper-panel form-panel">

          <SectionHeading
            eyebrow="ADD TO THE NOTEBOOK"
            title="New study task"
          />

          <form
            onSubmit={submit}
            className="field-form"
          >

            <label>
              Task

              <input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value
                  })
                }
                placeholder="e.g. Revise linked lists"
              />
            </label>

            <label>
              Subject

              <input
                value={form.subject}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subject: e.target.value
                  })
                }
                placeholder="e.g. DSA"
              />
            </label>

            <label>
              Due date

              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value
                  })
                }
              />
            </label>

            <label>
              Priority

              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority: e.target.value
                  })
                }
              >
                <option value="High">
                  High
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Low">
                  Low
                </option>
              </select>
            </label>

            {error && (
              <small className="error">
                {error}
              </small>
            )}

            <button
              className="primary-btn"
              type="submit"
            >
              Pin task +
            </button>

          </form>

        </section>

        {/* STUDY NOTEBOOK */}
        <section className="paper-panel">

          <SectionHeading
            eyebrow="UPCOMING WORK"
            title="Study notebook"
          >
            <div className="count-badge">
              {plans.length} notes
            </div>
          </SectionHeading>

          {plans.length ? (
            <div className="plan-list">

              {[...plans]
                .sort(
                  (a, b) =>
                    Number(a.done) -
                      Number(b.done) ||
                    a.date.localeCompare(
                      b.date
                    )
                )
                .map((p) => (
                  <div
                    className={
                      p.done
                        ? 'plan-row done'
                        : 'plan-row'
                    }
                    key={p.id}
                  >

                    {/* COMPLETE BUTTON */}
                    <button
                      type="button"
                      className="check-circle"
                      onClick={() =>
                        toggle(p.id)
                      }
                      aria-label={
                        p.done
                          ? 'Mark as pending'
                          : 'Mark as completed'
                      }
                    >
                      {p.done ? '✓' : ''}
                    </button>

                    {/* TASK DETAILS */}
                    <div className="plan-copy">
                      <b>{p.title}</b>

                      <small>
                        {p.subject} • due{' '}
                        {p.date}
                      </small>
                    </div>

                    {/* PRIORITY */}
                    <span
                      className={`priority ${p.priority.toLowerCase()}`}
                    >
                      {p.priority}
                    </span>

                    {/* DELETE */}
                    <button
                      type="button"
                      className="icon-delete"
                      onClick={() =>
                        setRemoveId(p.id)
                      }
                      aria-label="Delete task"
                    >
                      ×
                    </button>

                  </div>
                ))}

            </div>
          ) : (
            <EmptyState
              title="The planner is blank"
              text="Add a small study task from the left."
            />
          )}

        </section>

      </div>

      {/* DELETE CONFIRMATION */}
      {removeId && (
        <ConfirmDialog
          message="Remove this study task from the notebook?"
          onCancel={() =>
            setRemoveId(null)
          }
          onConfirm={remove}
        />
      )}

    </div>
  );
}

