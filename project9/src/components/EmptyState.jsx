import React from "react";
import { Link } from "react-router-dom";
import { Inbox, Plus } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  message = "Add a task to get started.",
  button = true
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Inbox size={26} />
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {button && (
        <Link className="button primary" to="/add">
          <Plus size={17} /> Add task
        </Link>
      )}
    </div>
  );
}