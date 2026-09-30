import React from "react";
import { NavLink } from "react-router-dom";
import {
  CalendarDays,
  CheckSquare,
  Home,
  ListTodo,
  Plus,
  Settings,
  BarChart3,
  Sparkles
} from "lucide-react";

const links = [
  {
    to: "/",
    label: "Workspace",
    icon: Home
  },
  {
    to: "/add",
    label: "New task",
    icon: Plus
  },
  {
    to: "/tasks",
    label: "Task library",
    icon: ListTodo
  },
  {
    to: "/calendar",
    label: "Calendar",
    icon: CalendarDays
  },
  {
    to: "/statistics",
    label: "Insights",
    icon: BarChart3
  },
  {
    to: "/settings",
    label: "Preferences",
    icon: Settings
  }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Brand */}
      <div className="brand">
        <div className="brand-mark">
          <Sparkles size={19} />
        </div>

        <div>
          <strong>TaskNest</strong>
          <small>focus workspace</small>
        </div>
      </div>

      {/* Navigation label */}
      <div className="sidebar-label">
        NAVIGATION
      </div>

      {/* Navigation links */}
      <nav>
        {links.map(
          ({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <Icon
                size={18}
                strokeWidth={2}
              />

              <span>{label}</span>
            </NavLink>
          )
        )}
      </nav>

      {/* Focus note */}
      <div className="sidebar-note">
        <div className="note-icon">
          ✦
        </div>

        <strong>
          Make space for focus.
        </strong>

        <p>
          Keep your next action visible and
          your workload calm.
        </p>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <CheckSquare size={15} />

        <span>
          Everything stays on this device.
        </span>
      </div>

    </aside>
  );
}