import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import CalendarGrid from "../components/CalendarGrid";

const key = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

export default function Calendar({ tasks }) {
  const [month, setMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const [selected, setSelected] = useState(key(new Date()));

  const selectedTasks = useMemo(
    () => tasks.filter((t) => t.dueDate === selected),
    [tasks, selected]
  );

  const monthName = month.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const move = (amount) => {
    setMonth(
      new Date(month.getFullYear(), month.getMonth() + amount, 1)
    );
  };

  return (
    <div className="calendar-page">
      <div className="page-heading-row">
        <div>
          <span className="eyebrow">PLAN THE MONTH</span>

          <h2>{monthName}</h2>

          <p>Choose a day to see its tasks.</p>
        </div>

        <Link to="/add" className="button primary">
          <Plus size={17} />
          Add task
        </Link>
      </div>

      <div className="calendar-layout">
        <section className="calendar-card">
          <div className="calendar-toolbar">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft size={19} />
            </button>

            <strong>{monthName}</strong>

            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next month"
            >
              <ChevronRight size={19} />
            </button>
          </div>

          <CalendarGrid
            monthDate={month}
            tasks={tasks}
            selectedDate={selected}
            onSelect={setSelected}
          />
        </section>

        <aside className="selected-day-card">
          <div className="selected-day-top">
            <div className="mini-calendar-icon">
              <CalendarDays size={20} />
            </div>

            <div>
              <span>SELECTED DAY</span>

              <h3>
                {new Date(`${selected}T00:00`).toLocaleDateString(
                  "en-IN",
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }
                )}
              </h3>
            </div>
          </div>

          {selectedTasks.length ? (
            <div className="day-task-list">
              {selectedTasks.map((task) => (
                <div
                  className={`day-task ${task.completed ? "done" : ""}`}
                  key={task.id}
                >
                  <span
                    className={`mini-dot priority-${task.priority.toLowerCase()}`}
                  />

                  <div>
                    <strong>{task.title}</strong>

                    <small>
                      {task.dueTime || "Any time"} · {task.category}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="day-empty">
              <span>○</span>

              <p>No tasks on this date.</p>

              <Link to="/add" className="button secondary">
                Add one
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}