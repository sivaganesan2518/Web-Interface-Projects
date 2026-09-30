
import React, { useState } from "react";

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section className="page section-page">
      <div className="page-heading">
        <p className="eyebrow">LET'S CONNECT</p>
        <h1>Contact <span>Me</span></h1>
        <p>
          Have a project idea, opportunity or just want to connect? Send a message.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <article className="glass-card">
            <div className="icon-box">📩</div>
            <h2>Get in touch</h2>

            <p>
              I am always interested in learning, building projects and connecting
              with people in technology.
            </p>

            <div className="contact-list">
              <a href="mailto:your-email@example.com">
                ✉️ your-email@example.com
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                🐙 GitHub Profile
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                💼 LinkedIn Profile
              </a>
            </div>
          </article>
        </div>

        <form
          className="glass-card contact-form"
          onSubmit={handleSubmit}
        >
          <label>
            Name
            <input
              type="text"
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="your@email.com"
              required
            />
          </label>

          <label>
            Message
            <textarea
              rows="6"
              placeholder="Write your message..."
              required
            ></textarea>
          </label>

          <button className="btn primary" type="submit">
            Send Message
          </button>

          {sent && (
            <p className="success-message">
              Message form submitted successfully. Add a backend/email service
              to receive messages.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
