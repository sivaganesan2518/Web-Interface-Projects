import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './pages/Overview';
import LearnerDirectory from './pages/LearnerDirectory';
import Gradebook from './pages/Gradebook';
import Attendance from './pages/Attendance';
import Performance from './pages/Performance';
import StudyPlanner from './pages/StudyPlanner';

const seedLearners = [
  { id: 1, name: 'Arun Kumar', roll: '101', className: 'CSE-A', email: 'arun@example.com', phone: '9876543210', createdAt: '2026-09-24' },
  { id: 2, name: 'Meena S', roll: '102', className: 'CSE-A', email: 'meena@example.com', phone: '9876501234', createdAt: '2026-09-25' },
  { id: 3, name: 'Rahul K', roll: '103', className: 'CSE-B', email: 'rahul@example.com', phone: '9898989898', createdAt: '2026-09-26' },
  { id: 4, name: 'Divya R', roll: '104', className: 'IT-A', email: 'divya@example.com', phone: '9866123456', createdAt: '2026-09-27' }
];

const seedMarks = [
  { id: 1, studentId: 1, subject: 'Mathematics', marks: 91 },
  { id: 2, studentId: 1, subject: 'Tamil', marks: 82 },
  { id: 3, studentId: 1, subject: 'English', marks: 75 },
  { id: 4, studentId: 1, subject: 'Science', marks: 84 },
  { id: 5, studentId: 1, subject: 'Social Science', marks: 79 },
  { id: 6, studentId: 2, subject: 'Mathematics', marks: 86 },
  { id: 7, studentId: 2, subject: 'Tamil', marks: 78 },
  { id: 8, studentId: 2, subject: 'English', marks: 88 },
  { id: 9, studentId: 2, subject: 'Science', marks: 81 },
  { id: 10, studentId: 2, subject: 'Social Science', marks: 83 }
];

const seedAttendance = [];

const seedPlans = [
  {
    id: 1,
    title: 'Revise Data Structures',
    subject: 'DSA',
    date: '2026-10-02',
    priority: 'High',
    done: false
  },
  {
    id: 2,
    title: 'Practice Pandas exercises',
    subject: 'Data Science',
    date: '2026-10-03',
    priority: 'Medium',
    done: false
  },
  {
    id: 3,
    title: 'Read DBMS normalization',
    subject: 'DBMS',
    date: '2026-10-04',
    priority: 'Low',
    done: true
  }
];

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [learners, setLearners] = useState(() =>
    load('ac_learners', seedLearners)
  );

  const [marks, setMarks] = useState(() =>
    load('ac_marks', seedMarks)
  );

  const [attendance, setAttendance] = useState(() =>
    load('ac_attendance', seedAttendance)
  );

  const [plans, setPlans] = useState(() =>
    load('ac_plans', seedPlans)
  );

  useEffect(() => {
    localStorage.setItem('ac_learners', JSON.stringify(learners));
  }, [learners]);

  useEffect(() => {
    localStorage.setItem('ac_marks', JSON.stringify(marks));
  }, [marks]);

  useEffect(() => {
    localStorage.setItem('ac_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('ac_plans', JSON.stringify(plans));
  }, [plans]);

  const appData = {
    learners,
    setLearners,
    marks,
    setMarks,
    attendance,
    setAttendance,
    plans,
    setPlans
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="workspace">
        <Header learners={learners} />

        <main className="page-area">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/overview" replace />}
            />

            <Route
              path="/overview"
              element={<Overview {...appData} />}
            />

            <Route
              path="/learners"
              element={<LearnerDirectory {...appData} />}
            />

            <Route
              path="/gradebook"
              element={<Gradebook {...appData} />}
            />

            <Route
              path="/attendance"
              element={<Attendance {...appData} />}
            />

            <Route
              path="/performance"
              element={<Performance {...appData} />}
            />

            <Route
              path="/planner"
              element={<StudyPlanner {...appData} />}
            />

            <Route
              path="*"
              element={<Navigate to="/overview" replace />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}