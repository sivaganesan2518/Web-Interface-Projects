import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  CircleAlert,
  ListChecks,
  Plus,
  Sparkles
} from "lucide-react";

import StatCard from "../components/StatCard";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";

import { isOverdue, formatDate } from "../App";

const key = (date) => {
  const d = new Date(date);

  return `${d.getFullYear()}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

export default function Dashboard({
  tasks = [],
  onToggle
}) {
  const today = key(new Date());

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending =
    tasks.length - completed;

  const overdue = tasks.filter(
    isOverdue
  ).length;

  const progress = tasks.length
    ? Math.round(
        (completed / tasks.length) * 100
      )
    : 0;

  const todaysTasks = tasks.filter(
    (task) =>
      task.dueDate === today
  );

  const upcoming = tasks
    .filter(
      (task) =>
        !task.completed &&
        task.dueDate &&
        task.dueDate > today
    )
    .sort((a, b) =>
      `${a.dueDate}${a.dueTime || ""}`.localeCompare(
        `${b.dueDate}${b.dueTime || ""}`
      )
    )
    .slice(0, 4);

  const dateLabel =
    new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

  return (
    <div className="dashboard-page">

      {/* Welcome */}
      <section className="welcome-panel">

        <div>
          <span className="eyebrow">
            GOOD TO SEE YOU
          </span>

          <h2>
            Build a clear day,
            <br />
            <em>one task at a time.</em>
          </h2>

          <p>{dateLabel}</p>
        </div>

        <Link
          to="/add"
          className="button light"
        >
          <Plus size={18} />
          Add task
        </Link>

        <div className="welcome-spark">
          <Sparkles size={72} />
        </div>

      </section>

      {/* Statistics */}
      <div className="stat-grid">

        <StatCard
          label="Total tasks"
          value={tasks.length}
          detail="Across your workspace"
          icon={
            <ListChecks size={17} />
          }
        />

        <StatCard
          label="Completed"
          value={completed}
          detail={`${progress}% of all tasks`}
          icon={
            <CheckCircle2 size={17} />
          }
          tone="green"
        />

        <StatCard
          label="Pending"
          value={pending}
          detail="Still on your list"
          icon={
            <CalendarClock size={17} />
          }
          tone="orange"
        />

        <StatCard
          label="Overdue"
          value={overdue}
          detail="Needs attention"
          icon={
            <CircleAlert size={17} />
          }
          tone="red"
        />

      </div>

      {/* Dashboard main grid */}
      <div className="dashboard-grid">

        {/* Today's tasks */}
        <section className="content-card">

          <div className="section-heading">

            <div>
              <span className="eyebrow">
                TODAY
              </span>

              <h2>
                Today's tasks
              </h2>
            </div>

            <Link to="/tasks">
              View all
              <ArrowRight size={15} />
            </Link>

          </div>

          {todaysTasks.length ? (

            todaysTasks
              .slice(0, 4)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                />
              ))

          ) : (

            <EmptyState
              title="A quiet day"
              message="No tasks are scheduled for today."
            />

          )}

        </section>

        {/* Progress */}
        <section className="content-card progress-card">

          <div className="section-heading">

            <div>
              <span className="eyebrow">
                MOMENTUM
              </span>

              <h2>
                Progress
              </h2>
            </div>

          </div>

          <div
            className="progress-ring"
            style={{
              "--progress":
                `${progress * 3.6}deg`
            }}
          >

            <div>
              <strong>
                {progress}%
              </strong>

              <span>
                complete
              </span>
            </div>

          </div>

          <p className="progress-message">

            {tasks.length === 0
              ? "Add your first task to begin."
              : progress === 100
              ? "Everything is cleared. Nice work."
              : `${completed} completed, ${pending} still in motion.`}

          </p>

        </section>

      </div>

      {/* Upcoming Tasks */}
      <section className="content-card">

        <div className="section-heading">

          <div>
            <span className="eyebrow">
              NEXT UP
            </span>

            <h2>
              Upcoming tasks
            </h2>
          </div>

          <Link to="/calendar">
            Open calendar
            <ArrowRight size={15} />
          </Link>

        </div>

        {upcoming.length ? (

          <div className="upcoming-list">

            {upcoming.map((task) => {

              const taskDate =
                new Date(
                  `${task.dueDate}T00:00`
                );

              return (
                <div
                  className="upcoming-row"
                  key={task.id}
                >

                  <div className="upcoming-date">

                    <strong>
                      {taskDate.getDate()}
                    </strong>

                    <span>
                      {taskDate.toLocaleDateString(
                        "en-IN",
                        {
                          month: "short"
                        }
                      )}
                    </span>

                  </div>

                  <div>

                    <strong>
                      {task.title}
                    </strong>

                    <span>
                      {task.category} ·{" "}
                      {task.priority} ·{" "}
                      {formatDate(
                        task.dueDate
                      )}
                    </span>

                  </div>

                </div>
              );
            })}

          </div>

        ) : (

          <EmptyState
            title="No upcoming tasks"
            message="Your future workload is clear."
          />

        )}

      </section>

    </div>
  );
}