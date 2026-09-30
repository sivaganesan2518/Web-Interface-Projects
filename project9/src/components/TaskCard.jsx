import { CalendarDays, Check, Clock3, Pencil, Trash2 } from "lucide-react";
import { formatDate, isOverdue } from "../App";

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const overdue = isOverdue(task);

  return (
    <article className={`task-card ${task.completed ? "completed" : ""}`}>
      <button
        className={`check-button ${task.completed ? "checked" : ""}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark pending" : "Complete task"}
      >
        {task.completed && <Check size={15} />}
      </button>

      <div className="task-main">
        <div className="task-heading">
          <h3>{task.title}</h3>
          <span className={`priority priority-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </div>

        {task.description && <p className="task-description">{task.description}</p>}

        <div className="task-meta">
          <span><CalendarDays size={14} /> {formatDate(task.dueDate)}</span>
          {task.dueTime && <span><Clock3 size={14} /> {task.dueTime}</span>}
          <span className="category-chip">{task.category}</span>
          {overdue && !task.completed && <span className="overdue-chip">Overdue</span>}
          {task.completed && <span className="done-chip">Completed</span>}
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(task)} title="Edit"><Pencil size={16} /></button>
        <button onClick={() => onDelete(task.id)} title="Delete" className="delete-btn"><Trash2 size={16} /></button>
      </div>
    </article>
  );
}