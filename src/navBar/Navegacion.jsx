import React from "react";
import { Link } from "react-router-dom";

function Navegacion() {
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark"
      style={{ backgroundColor: "#071820" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <i className="fa fa-laptop" />
        </a>
        <a className="navbar-brand" href="#">
          ProTasker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                to="/userForm"
              >
                Registrar usuarios
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Gestionar usuarios
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Registrar Proyectos
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Gestionar Proyectos
              </a>
            </li>
            <form method="post" action="Identity/Account/Logout">
              <span
                className="nav-link"
                onclick="this.parentNode.submit();"
                style={{
                  cursor: "pointer",
                  position: "fixed",
                  top: 10,
                  right: 10,
                }}
              >
                Cerrar sesión
                <span className="oi oi-account-logout" title="Cerrar sesión" />
                <p />
              </span>
            </form>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navegacion;
