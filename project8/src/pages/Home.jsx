
import React from "react";
import { Link } from "react-router-dom";
import profile from "../assets/profile.jpg";

function Home() {
  return (
    <section className="hero page">
      <div className="cloud cloud-one"></div>
      <div className="cloud cloud-two"></div>

      <div className="hero-content">
        <div className="hero-text">
          <p className="eyebrow">CYBERSECURITY • WEB • TECHNOLOGY</p>
          <h1>Hi, I'm <span>Sivaganesan K</span></h1>
          <h2>Cybersecurity Student & Technology Learner</h2>

          <p className="hero-description">
            I am a B.E. CSE (Cyber Security) student passionate about learning
            programming, web technologies, databases and modern technology.
            I enjoy turning what I learn into practical projects.
          </p>

          <div className="button-row">
            <Link to="/projects" className="btn primary">
              View My Projects
            </Link>

            <Link to="/contact" className="btn secondary">
              Contact Me
            </Link>
          </div>

          <div className="mini-stats">
            <div>
              <strong>BE</strong>
              <span>CSE Cyber Security</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Year</span>
            </div>

            <div>
              <strong>01</strong>
              <span>Goal: Keep Learning</span>
            </div>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="tech-ring"></div>

          <div className="photo-card">
            <img src={profile} alt="Sivaganesan K" />

            <div className="photo-label">
              <span className="status-dot"></span>
              Open to learning & opportunities
            </div>
          </div>
        </div>
      </div>

      <div className="terminal-card">
        <span className="terminal-top">● ● ●</span>

        <code>
          <span>const</span> student = &#123;<br />
          &nbsp;&nbsp;focus: <b>"Cybersecurity"</b>,<br />
          &nbsp;&nbsp;mindset: <b>"Learn • Build • Improve"</b><br />
          &#125;;
        </code>
      </div>
    </section>
  );
}

export default Home;
