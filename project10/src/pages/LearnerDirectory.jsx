import React, { useMemo, useState } from 'react';

import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import SectionHeading from '../components/SectionHeading';

const blank = {
  name: '',
  roll: '',
  className: '',
  email: '',
  phone: ''
};

export default function LearnerDirectory({ learners, setLearners }) {
  const [form, setForm] = useState(blank);
  const [query, setQuery] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [errors, setErrors] = useState({});
  const [removeId, setRemoveId] = useState(null);

  const classes = [...new Set(learners.map((s) => s.className))];

  const visible = useMemo(
    () =>
      learners.filter((s) => {
        const q = query.toLowerCase();

        const matchesText = [s.name, s.roll, s.email].some((v) =>
          v.toLowerCase().includes(q)
        );

        return (
          matchesText &&
          (classFilter === 'All' || s.className === classFilter)
        );
      }),
    [learners, query, classFilter]
  );

  function update(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  }

  function submit(e) {
    e.preventDefault();

    const next = {};

    if (!form.name.trim()) {
      next.name = 'Name is required.';
    }

    if (!form.roll.trim()) {
      next.roll = 'Roll number is required.';
    } else if (
      learners.some(
        (s) => s.roll.toLowerCase() === form.roll.trim().toLowerCase()
      )
    ) {
      next.roll = 'That roll number already exists.';
    }

    if (!form.className.trim()) {
      next.className = 'Class is required.';
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = 'Enter a valid email.';
    }

    if (!/^\d{10}$/.test(form.phone)) {
      next.phone = 'Enter a 10-digit phone number.';
    }

    setErrors(next);

    if (Object.keys(next).length) {
      return;
    }

    setLearners([
      ...learners,
      {
        ...form,
        id: Date.now(),
        createdAt: new Date().toISOString().slice(0, 10)
      }
    ]);

    setForm(blank);
  }

  function remove() {
    setLearners(learners.filter((s) => s.id !== removeId));
    setRemoveId(null);
  }

  return (
    <div className="page-stack">
      <div className="split-layout">
        <section className="paper-panel form-panel">
          <SectionHeading eyebrow="NEW RECORD" title="Add a learner" />

          <form onSubmit={submit} className="field-form">
            {['name', 'roll', 'className', 'email', 'phone'].map((field) => (
              <label key={field}>
                {field === 'className'
                  ? 'Department / Class'
                  : field[0].toUpperCase() + field.slice(1)}

                <input
                  name={field}
                  value={form[field]}
                  onChange={update}
                  placeholder={
                    field === 'roll'
                      ? 'e.g. 105'
                      : field === 'className'
                      ? 'e.g. CSE-A'
                      : field === 'phone'
                      ? '10-digit number'
                      : `Enter ${field}`
                  }
                />

                {errors[field] && (
                  <small className="error">{errors[field]}</small>
                )}
              </label>
            ))}

            <button className="primary-btn" type="submit">
              Add to register +
            </button>
          </form>
        </section>

        <section className="directory-panel">
          <SectionHeading eyebrow="DIRECTORY" title="Learners on file">
            <span className="count-badge">{learners.length} total</span>
          </SectionHeading>

          <div className="toolbar">
            <input
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, roll or email…"
            />

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <option>All</option>

              {classes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {visible.length ? (
            <div className="learner-table">
              <div className="table-head">
                <span>Learner</span>
                <span>Academic ID</span>
                <span>Contact</span>
                <span>Action</span>
              </div>

              {visible.map((s) => (
                <div className="learner-row" key={s.id}>
                  <div className="person-cell">
                    <span className="avatar">
                      {s.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </span>

                    <div>
                      <b>{s.name}</b>
                      <small>{s.className}</small>
                    </div>
                  </div>

                  <span className="mono">#{s.roll}</span>

                  <div>
                    <small>{s.email}</small>
                    <small>{s.phone}</small>
                  </div>

                  <button
                    className="icon-delete"
                    onClick={() => setRemoveId(s.id)}
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No matching learners"
              text="Try another search or add a new learner."
            />
          )}
        </section>
      </div>

      {removeId && (
        <ConfirmDialog
          message="Deleting a learner removes the directory record. Existing mark and attendance entries are kept in storage."
          onCancel={() => setRemoveId(null)}
          onConfirm={remove}
        />
      )}
    </div>
  );
}