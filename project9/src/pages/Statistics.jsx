import React from "react";
import {
  BarChart3,
  CheckCircle2,
  CircleAlert,
  ListChecks,
  Clock3,
} from "lucide-react";
import StatCard from "../components/StatCard";
import { isOverdue } from "../App";

const categories = ["College", "Personal", "Work", "Other"];
const priorities = ["Low", "Medium", "High"];

function BarRow({ label, value, total, className = "" }) {
  const width = total
    ? Math.max((value / total) * 100, value ? 5 : 0)
    : 0;

  return (
    <div className="bar-row">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <div className="bar-track">
        <span
          className={className}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function Statistics({ tasks }) {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = total - completed;

  const overdue = tasks.filter(isOverdue).length;

  const percent = total
    ? Math.round((completed / total) * 100)
    : 0;

  const byCategory = categories.map((category) => ({
    label: category,
    value: tasks.filter(
      (task) => task.category === category
    ).length,
  }));

  const byPriority = priorities.map((priority) => ({
    label: priority,
    value: tasks.filter(
      (task) => task.priority === priority
    ).length,
  }));

  const week = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();

    date.setDate(date.getDate() - (6 - i));

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

    return {
      label: date.toLocaleDateString("en-IN", {
        weekday: "short",
      }),
      value: tasks.filter(
        (task) =>
          task.completed &&
          task.dueDate === key
      ).length,
    };
  });

  const maxWeek = Math.max(
    ...week.map((item) => item.value),
    1
  );

  return (
    <div className="stats-page">
      <div className="page-heading-row">
        <div>
          <span className="eyebrow">YOUR NUMBERS</span>

          <h2>Insights</h2>

          <p>
            Live calculations from your local task data.
          </p>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard
          label="Total"
          value={total}
          icon={<ListChecks size={17} />}
        />

        <StatCard
          label="Completed"
          value={completed}
          icon={<CheckCircle2 size={17} />}
          tone="green"
        />

        <StatCard
          label="Pending"
          value={pending}
          icon={<Clock3 size={17} />}
          tone="orange"
        />

        <StatCard
          label="Overdue"
          value={overdue}
          icon={<CircleAlert size={17} />}
          tone="red"
        />
      </div>

      <div className="insight-grid">
        {/* Category chart */}
        <section className="chart-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                BREAKDOWN
              </span>

              <h2>Tasks by category</h2>
            </div>
          </div>

          {byCategory.map((item) => (
            <BarRow
              key={item.label}
              {...item}
              total={total}
            />
          ))}
        </section>

        {/* Priority chart */}
        <section className="chart-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                URGENCY
              </span>

              <h2>Tasks by priority</h2>
            </div>
          </div>

          {byPriority.map((item) => (
            <BarRow
              key={item.label}
              {...item}
              total={total}
              className={`priority-bar-${item.label.toLowerCase()}`}
            />
          ))}
        </section>

        {/* Completed vs Pending */}
        <section className="chart-card completion-chart">
          <div>
            <span className="eyebrow">
              STATUS MIX
            </span>

            <h2>Completed vs pending</h2>
          </div>

          <div className="big-percent">
            {percent}
            <span>%</span>
          </div>

          <div className="split-track">
            <span
              style={{
                width: `${percent}%`,
              }}
            />
          </div>

          <div className="legend">
            <span>
              <i className="legend-done" />
              Completed {completed}
            </span>

            <span>
              <i className="legend-pending" />
              Pending {pending}
            </span>
          </div>
        </section>

        {/* Weekly completion */}
        <section className="chart-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                LAST 7 DAYS
              </span>

              <h2>Weekly completion</h2>
            </div>

            <BarChart3 size={19} />
          </div>

          <div className="week-chart">
            {week.map((item, index) => (
              <div
                className="week-column"
                key={`${item.label}-${index}`}
              >
                <div className="week-bar-wrap">
                  <span
                    style={{
                      height: `${
                        (item.value / maxWeek) * 100
                      }%`,
                    }}
                    title={`${item.value} completed`}
                  />
                </div>

                <small>{item.label}</small>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}