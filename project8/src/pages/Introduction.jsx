
import React from "react";

function Introduction() {
  const steps = [
    ["01", "Starting with Computer Science", "Learning the fundamentals of programming, problem solving and computer science."],
    ["02", "Exploring Web Technology", "Building small interfaces with HTML, CSS, JavaScript and React."],
    ["03", "Moving into Security", "Developing an interest in cybersecurity, networks and secure technology."],
    ["04", "Building My Future", "Combining software, security and cloud knowledge through practical projects."]
  ];

  return (
    <section className="page section-page">
      <div className="page-heading">
        <p className="eyebrow">MY STORY</p>
        <h1>My <span>Introduction</span></h1>
        <p>Where I started, what I am learning and where I want to go.</p>
      </div>

      <div className="intro-banner glass-card">
        <div>
          <p className="eyebrow">CURRENT FOCUS</p>
          <h2>Learning today to build better technology tomorrow.</h2>
        </div>
        <div className="cloud-icon">☁️</div>
      </div>

      <div className="timeline">
        {steps.map(([number, title, text]) => (
          <article className="timeline-item" key={number}>
            <div className="timeline-number">{number}</div>
            <div className="glass-card">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="goal-grid">
        <article className="glass-card">
          <h3>📚 Currently Learning</h3>
          <p>
            Programming, React, databases, data-related concepts and
            cybersecurity fundamentals.
          </p>
        </article>

        <article className="glass-card">
          <h3>💡 What Interests Me</h3>
          <p>
            Understanding how applications work and how technology can be
            designed more securely.
          </p>
        </article>

        <article className="glass-card">
          <h3>🎯 Future Goal</h3>
          <p>
            To grow into a skilled technology professional and build a career
            around cybersecurity and software.
          </p>
        </article>
      </div>
    </section>
  );
}

export default Introduction;

