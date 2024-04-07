import { useState, useEffect } from "react";
import React from "react";
import { getProyects } from "../Repositorys/ProyectRepository";
import { getUsuarios } from "../Repositorys/UsuarioRepository";
import { getTasks } from "../Repositorys/TaskRepository";
import { Link } from "react-router-dom";

import appFirebase from "./../credenciales";
import { getAuth } from "firebase/auth";
const auth = getAuth(appFirebase);

function Dashboard() {
  const [proyects, setProyects] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [tasks, setTasks] = useState([]);

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

  const listTasks = async () => {
    try {
      setTasks(await getTasks());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listProyects();
    listUsers();
    listTasks();
  }, []);

  const proyectsActivos = proyects.filter((proyecto) => proyecto.activo);
  const usersActivos = usuarios.filter((usuario) => usuario.activo);
  const tasksActivos = tasks.filter(
    (task) =>
      task.activo &&
      proyectsActivos.some(
        (proyecto) => proyecto.proyectoId === task.proyectoId
      )
  );

  const usuarioActual = usersActivos.find(
    (usuario) => usuario.correo === auth.currentUser.email
  );
  console.log(usuarioActual);
  const tareasPendientes = tasks.filter((task) => {
    // Verifica si la tarea está activa y si el usuarioActual está incluido en la lista de participantes de la tarea
    return (
      task.activo &&
      task.participantes.some(
        (participante) => participante.usuarioId === usuarioActual.usuarioId
      ) &&
      proyectsActivos.some(
        (proyecto) => proyecto.proyectoId === task.proyectoId
      )
    );
  });
  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="align-items-center">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
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
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{tasksActivos.length}</h3>
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
              <div className="col-lg-3 col-6">
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
              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{tareasPendientes.length}</h3>
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
    </>
  );
}

export default Dashboard;
