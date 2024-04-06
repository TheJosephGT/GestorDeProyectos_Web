import { useState, useEffect } from "react";
import ModalProyect from "./ModalProyect";
import React from "react";
import { getProyects } from "../Repositorys/ProyectRepository";
import { getUsuarios } from "../Repositorys/UsuarioRepository";
import { Link } from "react-router-dom";

function Dashboard() {
  const [show, setShow] = useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  const handleClose = () => setShow(false);
  const [proyects, setProyects] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const listProyects = async () => {
    try {
      setProyects(await getProyects());
    } catch (error) {
      console.error(error);
    }
  };

  const listUsers = async () => {
    try {
      setUsuarios(await getUsuarios());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listProyects();
    listUsers();
  }, []);

  const handleShow = (id) => {
    const proyectoActual = proyects.find(
      (proyecto) => proyecto.proyectoId === id
    );
    setProyectoSeleccionado(proyectoActual);
    setShow(true);
  };

  const proyectsActivos = proyects.filter((proyecto) => proyecto.activo);
  const usersActivos = usuarios.filter((usuario) => usuario.activo);
  return (
    <>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <div className="align-items-center">
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{proyectsActivos.length}</h3>
                    <p>Proyectos registrados</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <Link to="/proyectConsult" className="small-box-footer">
                    Mas info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>53</h3>
                    <p>Tareas registradas</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer">
                    Mas info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{usersActivos.length}</h3>
                    <p>Usuarios registrados</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <Link to="userConsult" className="small-box-footer">
                    Mas info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>53</h3>
                    <p>Tareas pendientes</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <a href="#" className="small-box-footer">
                    Mas info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Proyectos</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">Proyectos</h1>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "1%" }}>#</th>
                  <th style={{ width: "20%" }}>Titulo</th>
                  <th style={{ width: "30%" }}>Fecha</th>
                  <th>Progreso</th>
                  <th style={{ width: "8%" }} className="text-center">
                    Status
                  </th>
                  <th style={{ width: "20%" }}></th>
                </tr>
              </thead>
              <tbody>
                {proyects.map(
                  (proyecto) =>
                    // Verificar si el proyecto está activo
                    proyecto.activo && (
                      <tr key={proyecto.id}>
                        <td>#</td>
                        <td>
                          <a style={{ fontSize: 18 }}>{proyecto.titulo}</a>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <a style={{ fontSize: 18 }}>
                                {proyecto.fechaCreacion.split("T")[0]}
                              </a>
                            </li>
                          </ul>
                        </td>
                        <td className="project_progress">
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-green"
                              role="progressbar"
                              aria-valuenow={proyecto.progreso}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: `${proyecto.progreso}%` }}
                            ></div>
                          </div>
                          <small>{`${proyecto.progreso}% Complete`}</small>
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">
                            {proyecto.estado}
                          </span>
                        </td>
                        <td className="project-actions text-right">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleShow(proyecto.proyectoId)}
                          >
                            <i className="fas fa-folder"></i>
                            Ver
                          </button>
                          <a className="btn btn-info btn-sm" href="#">
                            <i className="fas fa-pencil-alt"></i>
                            Editar
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                            <i className="fas fa-trash"></i>
                            Eliminar
                          </a>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <ModalProyect
        show={show}
        handleClose={handleClose}
        proyecto={proyectoSeleccionado}
      />
    </>
  );
}

export default Dashboard;
