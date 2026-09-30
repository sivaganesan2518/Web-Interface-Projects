import { useState } from "react";
import "./attendance.css";
function Project2() {

  const initialStudents = [
    { id: 1, name: "Jai", status: "Present" },
    { id: 2, name: "Sri", status: "Absent" },
    { id: 3, name: "Yuvi", status: "Present" },
    { id: 4, name: "Siva", status: "Present" },
    { id: 5, name: "Babu", status: "Absent" }
  ];

  const [students, setStudents] = useState(initialStudents);

  const changeStatus = (id, status) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, status: status }
          : student
      )
    );
  };

  const markAll = (status) => {
    setStudents(
      students.map((student) => ({
        ...student,
        status: status
      }))
    );
  };

  const present = students.filter(
    (student) => student.status === "Present"
  ).length;

  const absent = students.filter(
    (student) => student.status === "Absent"
  ).length;

  return (
    <div className="attendance-app">
      <h2>Student Attendance Tracker</h2>

      <h3>Total Students: {students.length}</h3>
      <h3>Present: {present}</h3>
      <h3>Absent: {absent}</h3>

      <button onClick={() => markAll("Present")}>
        Mark All Present
      </button>

      <button onClick={() => markAll("Absent")}>
        Mark All Absent
      </button>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.status}</td>

              <td>
                <button
                  onClick={() =>
                    changeStatus(student.id, "Present")
                  }
                >
                  Present
                </button>

                <button
                  onClick={() =>
                    changeStatus(student.id, "Absent")
                  }
                >
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Project2;