import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";
import { isOverdue } from "../App";

export default function MyTasks({ tasks, onToggle, onDelete }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      const query = search.toLowerCase();

      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        (task.description || "").toLowerCase().includes(query);

      const matchesStatus =
        status === "All" ||
        (status === "Completed" && task.completed) ||
        (status === "Pending" &&
          !task.completed &&
          !isOverdue(task)) ||
        (status === "Overdue" && isOverdue(task));

      const matchesPriority =
        priority === "All" || task.priority === priority;

      const matchesCategory =
        category === "All" || task.category === category;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });
  }, [tasks, search, status, priority, category]);

  const remove = (id) => {
    if (window.confirm("Delete this task?")) {
      onDelete(id);
    }
  };

  return (
    <div className="tasks-page">

      {/* Page Heading */}
      <div className="page-heading-row">
        <div>
          <span className="eyebrow">YOUR WORKLOAD</span>

          <h2>Task library</h2>

          <p>
            {filtered.length} visible of {tasks.length} total
          </p>
        </div>

        <Link to="/add" className="button primary">
          <Plus size={17} />
          New task
        </Link>
      </div>

      {/* Filters */}
      <div className="filter-panel">

        <div className="search-box">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-icon">
          <SlidersHorizontal size={17} />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Overdue</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>College</option>
          <option>Personal</option>
          <option>Work</option>
          <option>Other</option>
        </select>

      </div>

      {/* Task List */}
      <div className="task-list">

        {filtered.length > 0 ? (
          filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={remove}
              onEdit={(taskToEdit) =>
                navigate("/add", {
                  state: {
                    task: taskToEdit
                  }
                })
              }
            />
          ))
        ) : (
          <EmptyState
            title="No matching tasks"
            message={
              tasks.length
                ? "Try changing your search or filters."
                : "Your task library is empty."
            }
          />
        )}

      </div>

    </div>
  );
}