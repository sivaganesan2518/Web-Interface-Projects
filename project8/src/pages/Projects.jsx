
import React from "react";

const projects = [
  {
    icon: "🏨",
    title: "Hotel Room Booking System",
    description:
      "A simple room-booking application that manages room availability, booking, cancellation and exit operations.",
    tech: "Java / Programming Fundamentals",
  },
  {
    icon: "🏧",
    title: "ATM Simulation",
    description:
      "A beginner-friendly ATM simulation covering PIN verification, balance checking, deposits and withdrawals.",
    tech: "Java / File Handling",
  },
  {
    icon: "📊",
    title: "Online Attendance Tracker",
    description:
      "A React application for viewing students, changing attendance status and calculating present and absent counts.",
    tech: "React / JavaScript / CSS",
  },
  {
    icon: "🔐",
    title: "Password Strength Checker",
    description:
      "A web interface that checks password characteristics and gives users simple strength feedback.",
    tech: "HTML / CSS / JavaScript",
  },
  {
    icon: "🏐",
    title: "Volleyball Tournament Website",
    description:
      "A multi-section sports website with tournament information, rules, gallery, schedule and contact sections.",
    tech: "HTML / CSS / JavaScript",
  },
];

function Projects() {
  return (
    <section className="page section-page">
      <div className="page-heading">
        <p className="eyebrow">THINGS I BUILD</p>
        <h1>
          My <span>Projects</span>
        </h1>
        <p>
          Small projects that help me turn classroom concepts into practical
          experience.
        </p>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card glass-card" key={project.title}>
            <div className="project-icon">{project.icon}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <span className="tech-badge">{project.tech}</span>

            <div className="project-links">
              <button type="button" className="small-btn">
                GitHub
              </button>
              <button type="button" className="small-btn">
                Demo
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="note">
        GitHub and Demo buttons are placeholders until the project links are
        added.
      </p>
    </section>
  );
}

export default Projects;

