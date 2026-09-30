import React, { useEffect, useState } from "react";
import { Bell, CalendarDays, Clock3, FileText, Flag, FolderOpen, Save } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const blank = {
  title: "",
  description: "",
  dueDate: "",
  dueTime: "",
  priority: "Medium",
  category: "College",
  reminder: false
};

export default function AddTask({ onAdd, onUpdate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const editingTask = location.state?.task || null;

  const [form, setForm] = useState(
    editingTask
      ? {
          title: editingTask.title || "",
          description: editingTask.description || "",
          dueDate: editingTask.dueDate || "",
          dueTime: editingTask.dueTime || "",
          priority: editingTask.priority || "Medium",
          category: editingTask.category || "College",
          reminder: !!editingTask.reminder
        }
      : blank
  );

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        dueDate: editingTask.dueDate || "",
        dueTime: editingTask.dueTime || "",
        priority: editingTask.priority || "Medium",
        category: editingTask.category || "College",
        reminder: !!editingTask.reminder
      });
    }
  }, [editingTask]);

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  function submit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      return setError("Please enter a task title.");
    }

    if (!form.dueDate) {
      return setError("Please choose a due date.");
    }

    setError("");

    if (editingTask) {
      onUpdate(editingTask.id, {
        ...form,
        title: form.title.trim()
      });
    } else {
      onAdd({
        id: crypto.randomUUID(),
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      });
    }

    navigate("/tasks");
  }

  return (
    <div className="form-page">
      <div className="form-intro">
        <span className="eyebrow">
          {editingTask ? "EDIT TASK" : "CREATE SOMETHING CLEAR"}
        </span>

        <h2>
          {editingTask
            ? "Refine the task."
            : "Give your next action a home."}
        </h2>

        <p>
          Keep the details lightweight. You can change anything later.
        </p>
      </div>

      <form className="task-form" onSubmit={submit}>
        {error && <div className="form-error">{error}</div>}

        <label className="field wide">
          <span>
            <FileText size={15} /> Task title *
          </span>

          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Finish database assignment"
          />
        </label>

        <label className="field wide">
          <span>
            <FileText size={15} /> Description
          </span>

          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="A short note about what needs to be done..."
            rows="5"
          />
        </label>

        <div className="form-two">
          <label className="field">
            <span>
              <CalendarDays size={15} /> Due date *
            </span>

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => update("dueDate", e.target.value)}
            />
          </label>

          <label className="field">
            <span>
              <Clock3 size={15} /> Due time
            </span>

            <input
              type="time"
              value={form.dueTime}
              onChange={(e) => update("dueTime", e.target.value)}
            />
          </label>
        </div>

        <div className="form-two">
          <label className="field">
            <span>
              <Flag size={15} /> Priority
            </span>

            <select
              value={form.priority}
              onChange={(e) => update("priority", e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>

          <label className="field">
            <span>
              <FolderOpen size={15} /> Category
            </span>

            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            >
              <option>College</option>
              <option>Personal</option>
              <option>Work</option>
              <option>Other</option>
            </select>
          </label>
        </div>

        <label className="reminder-toggle">
          <input
            type="checkbox"
            checked={form.reminder}
            onChange={(e) => update("reminder", e.target.checked)}
          />

          <span className="toggle-ui" />

          <span>
            <strong>
              <Bell size={15} /> Reminder
            </strong>

            <small>
              Keep a reminder flag attached to this task.
            </small>
          </span>
        </label>

        <button
          className="button primary submit-button"
          type="submit"
        >
          <Save size={17} />
          {editingTask ? "Save changes" : "Create task"}
        </button>
      </form>
    </div>
  );
}