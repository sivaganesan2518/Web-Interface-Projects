
import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Introduction", "/introduction"],
    ["Projects", "/projects"],
    ["Skills", "/skills"],
    ["Contact", "/contact"],
  ];

  return (
    <header className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">&lt;/&gt;</span>
          Siva<span>.</span>
        </NavLink>

        <nav>
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

