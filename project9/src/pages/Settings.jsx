import React, { useState } from "react";
import {
  Bell,
  Moon,
  Sun,
  Trash2,
  ShieldCheck,
  Settings2,
} from "lucide-react";

export default function Settings({
  tasks,
  settings,
  onSettingsChange,
  onClearCompleted,
  onClearAll,
}) {
  const [message, setMessage] = useState("");

  const change = (field, value) => {
    onSettingsChange((prev) => ({
      ...prev,
      [field]: value,
    }));

    setMessage("");
  };

  const clearCompleted = () => {
    onClearCompleted();
    setMessage("Completed tasks cleared.");
  };

  const clearAll = () => {
    const ok = settings.confirmDelete
      ? window.confirm(
          "This will permanently remove every TaskNest task from this browser. Continue?"
        )
      : true;

    if (!ok) return;

    onClearAll();
    setMessage("All tasks have been cleared.");
  };

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className="settings-page">
      <div className="page-heading-row">
        <div>
          <span className="eyebrow">PERSONALIZE</span>

          <h2>Preferences</h2>

          <p>
            TaskNest remembers these choices on this device.
          </p>
        </div>
      </div>

      {message && (
        <div className="success-message">
          <ShieldCheck size={17} />
          {message}
        </div>
      )}

      {/* Appearance */}
      <section className="settings-card">
        <div className="settings-title">
          <Settings2 size={19} />

          <div>
            <h3>Appearance</h3>
            <p>Choose how your workspace looks.</p>
          </div>
        </div>

        <div className="setting-row">
          <div className="setting-icon">
            {settings.darkMode ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </div>

          <div>
            <strong>
              {settings.darkMode
                ? "Dark mode"
                : "Light mode"}
            </strong>

            <span>
              Switch the TaskNest color theme.
            </span>
          </div>

          <button
            type="button"
            className={`switch ${
              settings.darkMode ? "on" : ""
            }`}
            onClick={() =>
              change(
                "darkMode",
                !settings.darkMode
              )
            }
            aria-label="Toggle dark mode"
            aria-pressed={settings.darkMode}
          >
            <span />
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section className="settings-card">
        <div className="settings-title">
          <Bell size={19} />

          <div>
            <h3>Notifications</h3>
            <p>
              Control reminder preferences.
            </p>
          </div>
        </div>

        <div className="setting-row">
          <div className="setting-icon">
            <Bell size={18} />
          </div>

          <div>
            <strong>Reminder preference</strong>

            <span>
              Allow reminder flags on tasks.
            </span>
          </div>

          <button
            type="button"
            className={`switch ${
              settings.notifications ? "on" : ""
            }`}
            onClick={() =>
              change(
                "notifications",
                !settings.notifications
              )
            }
            aria-label="Toggle notifications"
            aria-pressed={settings.notifications}
          >
            <span />
          </button>
        </div>
      </section>

      {/* Data controls */}
      <section className="settings-card danger-card">
        <div className="settings-title">
          <Trash2 size={19} />

          <div>
            <h3>Data controls</h3>

            <p>
              These actions affect tasks stored in
              this browser only.
            </p>
          </div>
        </div>

        <div className="setting-row">
          <div>
            <strong>
              Clear completed tasks
            </strong>

            <span>
              Remove {completedCount} completed{" "}
              {completedCount === 1
                ? "task"
                : "tasks"}
              .
            </span>
          </div>

          <button
            type="button"
            className="button secondary"
            onClick={clearCompleted}
            disabled={completedCount === 0}
          >
            Clear completed
          </button>
        </div>

        <div className="setting-row">
          <div>
            <strong>Clear all tasks</strong>

            <span>
              Remove {tasks.length} stored{" "}
              {tasks.length === 1
                ? "task"
                : "tasks"}
              .
            </span>
          </div>

          <button
            type="button"
            className="button danger"
            onClick={clearAll}
            disabled={tasks.length === 0}
          >
            Clear all
          </button>
        </div>
      </section>

      {/* Confirmation */}
      <label className="confirmation-check">
        <input
          type="checkbox"
          checked={settings.confirmDelete}
          onChange={(e) =>
            change(
              "confirmDelete",
              e.target.checked
            )
          }
        />

        <span>
          Ask for confirmation before clearing all
          data
        </span>
      </label>
    </div>
  );
}