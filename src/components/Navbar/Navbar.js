import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-light bg-light nav-bar-flex">
          <div className="logo">
            <h4>Grupo 6</h4>
            <p>Where's my book</p>
          </div>
          <div className="navbar-nav nav-bar-principal nav-bar-links">
            <Link className="nav-item nav-link" to="/">
              Home
            </Link>
            <Link className="nav-item nav-link" to="/personas">
              Persona
            </Link>
            <Link className="nav-item nav-link" to="/categorias">
              Categoria
            </Link>
          </div>
      </nav>
    </>
  );
}
