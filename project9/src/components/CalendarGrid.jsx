import React, { useMemo } from "react";

const dayKey = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

export default function CalendarGrid({
  monthDate,
  tasks,
  selectedDate,
  onSelect,
}) {
  const days = useMemo(() => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const cells = [];

    // Previous month's empty cells
    for (let i = 0; i < startDay; i++) {
      cells.push(null);
    }

    // Current month's days
    for (let day = 1; day <= totalDays; day++) {
      cells.push(new Date(year, month, day));
    }

    return cells;
  }, [monthDate]);

  const tasksByDate = useMemo(() => {
    const grouped = {};

    tasks.forEach((task) => {
      if (!task.dueDate) return;

      if (!grouped[task.dueDate]) {
        grouped[task.dueDate] = [];
      }

      grouped[task.dueDate].push(task);
    });

    return grouped;
  }, [tasks]);

  const todayKey = dayKey(new Date());

  return (
    <div className="calendar-grid">
      {/* Weekday headings */}
      <div className="calendar-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => (
            <div className="calendar-weekday" key={day}>
              {day}
            </div>
          )
        )}
      </div>

      {/* Calendar days */}
      <div className="calendar-days">
        {days.map((date, index) => {
          if (!date) {
            return (
              <div
                className="calendar-cell empty"
                key={`empty-${index}`}
              />
            );
          }

          const dateKey = dayKey(date);
          const dayTasks = tasksByDate[dateKey] || [];

          const isToday = dateKey === todayKey;
          const isSelected = dateKey === selectedDate;

          const hasCompleted = dayTasks.some(
            (task) => task.completed
          );

          const hasPending = dayTasks.some(
            (task) => !task.completed
          );

          return (
            <button
              type="button"
              key={dateKey}
              className={`calendar-cell ${
                isToday ? "today" : ""
              } ${isSelected ? "selected" : ""}`}
              onClick={() => onSelect(dateKey)}
            >
              <span className="calendar-number">
                {date.getDate()}
              </span>

              {dayTasks.length > 0 && (
                <div className="calendar-task-info">
                  <div className="calendar-dots">
                    {dayTasks.slice(0, 3).map((task) => (
                      <span
                        key={task.id}
                        className={`calendar-dot priority-${(
                          task.priority || "medium"
                        ).toLowerCase()} ${
                          task.completed ? "completed" : ""
                        }`}
                      />
                    ))}
                  </div>

                  <span className="calendar-task-count">
                    {dayTasks.length}
                  </span>
                </div>
              )}

              {hasPending && (
                <span className="calendar-status pending-status" />
              )}

              {!hasPending && hasCompleted && (
                <span className="calendar-status completed-status">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}