import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import appFirebase from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(appFirebase);

function Navegacion() {
  const navigate = useNavigate();
  const cerrarSesionFunction = () => {
    signOut(auth);
    navigate("/login");
  };

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
              <Link
                className="nav-link"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                to="/userConsult"
              >
                Gestionar usuarios
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                to="/proyectForm"
              >
                Registrar proyectos
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                to="/proyectConsult"
              >
                Gestionar proyectos
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                onClick={() => {
                  cerrarSesionFunction();
                }}
                className="nav-link active"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                to="/login"
              >
                Cerrar sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navegacion;
