import "./App.css";

function Pro() {
  return (
    <div className="main-container">

      <div className="cyber-box">
        <h1>Siva</h1>
        <p>CSE Cyber Security Student</p>
      </div>

      <div className="about-box">
        <h2>About Me</h2>
        <p>
          I am a student interested in programming and cybersecurity.
        </p>
      </div>

      <div className="bottom-container">

        <div className="box">
          <h2>Skills</h2>
          <ul>
            <li>Java</li>
            <li>Python</li>
            <li>React</li>
            <li>HTML</li>
            <li>CSS</li>
          </ul>
        </div>

        <div className="box">
          <h2>Contact</h2>
          <p>Email: siva@gmail.com</p>
          <p>Phone: 9876543210</p>
          <p>GitHub: github.com/siva</p>
        </div>

      </div>

      <p className="footer">
        Thank you for visiting my page!
      </p>

    </div>
  );
}

export default Pro;
