
import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>Sivaganesan K</strong>
        <p>Cybersecurity Student • Web & Technology Enthusiast</p>
      </div>

      <p>© {new Date().getFullYear()} Sivaganesan. Built with React.</p>
    </footer>
  );
}

export default Footer;

