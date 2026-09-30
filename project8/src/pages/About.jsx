
import React from "react";

function About() {
  return (
    <section className="page section-page">
      <div className="page-heading">
        <p className="eyebrow">GET TO KNOW ME</p>
        <h1>About <span>Me</span></h1>
        <p>A personal introduction to my education, interests and learning journey.</p>
      </div>

      <div className="about-grid">
        <article className="glass-card about-main">
          <div className="icon-box">🛡️</div>
          <h2>Who I am</h2>
          <p>
            I am Sivaganesan K, a second-year B.E. student in CSE (Cyber Security)
            at Prince Dr. K. Vasudevan College of Engineering & Technology.
            I am building my foundation in computing and exploring how software,
            networks and security work together.
          </p>
          <p>
            My portfolio is a place to document my learning, projects and
            interests rather than simply listing qualifications.
          </p>
        </article>

        <article className="glass-card">
          <div className="icon-box">🎓</div>
          <h3>Education</h3>
          <p><strong>B.E. Computer Science & Engineering</strong></p>
          <p>Specialization: Cyber Security</p>
          <p>Prince Dr. K. Vasudevan College of Engineering & Technology</p>
          <p>Currently in 2nd Year</p>
        </article>

        <article className="glass-card">
          <div className="icon-box">🔎</div>
          <h3>Interests</h3>
          <div className="tag-list">
            <span>Cybersecurity</span>
            <span>Web Development</span>
            <span>Programming</span>
            <span>Databases</span>
            <span>Cloud Technology</span>
            <span>Technology Projects</span>
          </div>
        </article>

        <article className="glass-card wide">
          <div className="icon-box">🚀</div>
          <h3>My Learning Journey</h3>
          <p>
            My current focus is on strengthening programming and web-development
            fundamentals while learning more about cybersecurity. I prefer
            practical learning, so I use college projects and small applications
            to understand concepts by building them.
          </p>
        </article>
      </div>
    </section>
  );
}

export default About;

