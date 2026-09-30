
import React from "react";

const categories = [
  {
    icon: "💻",
    title: "Programming",
    items: ["Java", "Python", "JavaScript"]
  },
  {
    icon: "🌐",
    title: "Web Development",
    items: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    icon: "🗄️",
    title: "Database",
    items: ["SQL", "DBMS"]
  },
  {
    icon: "🛡️",
    title: "Cybersecurity",
    items: ["Security Fundamentals", "Networking Basics", "Cybersecurity Learning"]
  },
  {
    icon: "☁️",
    title: "Cloud Computing",
    items: ["Cloud Fundamentals", "Cloud Concepts"]
  },
  {
    icon: "⚙️",
    title: "DevOps",
    items: ["Git", "GitHub", "Development Workflow"]
  },
  {
    icon: "🧰",
    title: "Tools",
    items: ["VS Code", "GitHub", "Vite", "Chrome DevTools"]
  }
];

function Skills() {
  return (
    <section className="page section-page">
      <div className="page-heading">
        <p className="eyebrow">MY TOOLKIT</p>
        <h1>Skills & <span>Technologies</span></h1>
        <p>
          A growing toolkit that I am developing through college learning and projects.
        </p>
      </div>

      <div className="skills-grid">
        {categories.map((category) => (
          <article className="skill-card glass-card" key={category.title}>
            <div className="skill-icon">{category.icon}</div>
            <h3>{category.title}</h3>

            <div className="tag-list">
              {category.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;

