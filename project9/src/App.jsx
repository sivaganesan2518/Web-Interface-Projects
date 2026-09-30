import "./App.css";
import React, { useEffect, useMemo, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import MyTasks from "./pages/MyTasks";
import Calendar from "./pages/Calendar";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";

export const TASK_KEY = "tasknest_tasks_v2";
export const SETTINGS_KEY = "tasknest_settings_v2";

const defaultSettings = {
  darkMode: false,
  notifications: true,
  confirmDelete: true
};

// Read tasks from localStorage
function readTasks() {
  try {
    const value = JSON.parse(localStorage.getItem(TASK_KEY));

    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.error("Unable to read tasks:", error);
    return [];
  }
}

// Read settings from localStorage
function readSettings() {
  try {
    const value = JSON.parse(localStorage.getItem(SETTINGS_KEY));

    return {
      ...defaultSettings,
      ...(value || {})
    };
  } catch (error) {
    console.error("Unable to read settings:", error);

    return {
      ...defaultSettings
    };
  }
}

// Check whether a task is overdue
export function isOverdue(task) {
  if (task.completed || !task.dueDate) {
    return false;
  }

  const due = new Date(
    `${task.dueDate}T${task.dueTime || "23:59"}`
  );

  return due < new Date();
}

// Format date
export function formatDate(dateString) {
  if (!dateString) {
    return "No date";
  }

  return new Date(
    `${dateString}T00:00:00`
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

// Main application shell
function Shell({
  children,
  settings,
  onSettingsChange,
  tasks
}) {
  const location = useLocation();

  const titleMap = {
    "/": "Workspace",
    "/add": "New Task",
    "/tasks": "Task Library",
    "/calendar": "Calendar",
    "/statistics": "Insights",
    "/settings": "Preferences"
  };

  const title =
    titleMap[location.pathname] || "Workspace";

  return (
    <div className="app-shell">

      <Sidebar />

      <main className="main-area">

        <header className="topbar">

          <div>
            <span className="eyebrow">
              TASKNEST / {title.toUpperCase()}
            </span>

            <h1>{title}</h1>
          </div>

          <div className="topbar-meta">

            <span className="live-dot"></span>

            {tasks.length}{" "}
            {tasks.length === 1
              ? "task"
              : "tasks"}{" "}
            stored locally

          </div>

        </header>

        <div className="page-content">
          {children}
        </div>

      </main>

    </div>
  );
}

// Main App component
export default function App() {

  const [tasks, setTasks] = useState(readTasks);

  const [settings, setSettings] =
    useState(readSettings);

  // Save tasks whenever they change
  useEffect(() => {

    localStorage.setItem(
      TASK_KEY,
      JSON.stringify(tasks)
    );

  }, [tasks]);

  // Save settings and apply dark mode
  useEffect(() => {

    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(settings)
    );

    document.documentElement.classList.toggle(
      "dark-mode",
      settings.darkMode
    );

  }, [settings]);

  // Sync localStorage between browser tabs
  useEffect(() => {

    const onStorage = () => {

      setTasks(readTasks());

      setSettings(readSettings());

    };

    window.addEventListener(
      "storage",
      onStorage
    );

    return () => {

      window.removeEventListener(
        "storage",
        onStorage
      );

    };

  }, []);

  // Application actions
  const actions = useMemo(
    () => ({

      // Add new task
      addTask: (task) => {

        setTasks((prev) => [
          task,
          ...prev
        ]);

      },

      // Update existing task
      updateTask: (id, updates) => {

        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? {
                  ...task,
                  ...updates
                }
              : task
          )
        );

      },

      // Delete task
      deleteTask: (id) => {

        setTasks((prev) =>
          prev.filter(
            (task) => task.id !== id
          )
        );

      },

      // Complete / uncomplete task
      toggleTask: (id) => {

        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed:
                    !task.completed
                }
              : task
          )
        );

      },

      // Delete completed tasks
      clearCompleted: () => {

        setTasks((prev) =>
          prev.filter(
            (task) => !task.completed
          )
        );

      },

      // Delete every task
      clearAll: () => {

        setTasks([]);

      }

    }),
    []
  );

  return (

    <Shell
      settings={settings}
      onSettingsChange={setSettings}
      tasks={tasks}
    >

      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <Dashboard
              tasks={tasks}
              onToggle={actions.toggleTask}
            />
          }
        />

        {/* Add Task */}
        <Route
          path="/add"
          element={
            <AddTask
              tasks={tasks}
              onAdd={actions.addTask}
              onUpdate={actions.updateTask}
            />
          }
        />

        {/* My Tasks */}
        <Route
          path="/tasks"
          element={
            <MyTasks
              tasks={tasks}
              onToggle={actions.toggleTask}
              onDelete={actions.deleteTask}
              onUpdate={actions.updateTask}
            />
          }
        />

        {/* Calendar */}
        <Route
          path="/calendar"
          element={
            <Calendar
              tasks={tasks}
            />
          }
        />

        {/* Statistics */}
        <Route
          path="/statistics"
          element={
            <Statistics
              tasks={tasks}
            />
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <Settings
              tasks={tasks}
              settings={settings}
              onSettingsChange={
                setSettings
              }
              onClearCompleted={
                actions.clearCompleted
              }
              onClearAll={
                actions.clearAll
              }
            />
          }
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </Shell>

  );
}