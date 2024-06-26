import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  getProyects,
  deleteProyect,
  getProyectsByIdUsuario,
} from "../../Repositorys/ProyectRepository";
import { getUsuarios } from "../../Repositorys/UsuarioRepository";
import { useNavigate } from "react-router-dom";
import ModalProyect from "../ModalProyect";
import ProyectColumns from "./ColumnProyectUser";

import appFirebase from "../../credenciales";
import { getAuth } from "firebase/auth";
const auth = getAuth(appFirebase);

function ProyectConsult() {
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);
  const [records, setRecords] = useState([]);

  const [show, setShow] = useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    const proyectoActual = proyectos.find(
      (proyecto) => proyecto.proyectoId === id
    );
    setProyectoSeleccionado(proyectoActual);
    setShow(true);
  };

  const listProyects = async () => {
    try {
      const data = await getProyects();
      setProyectos(data);
      const activeProyects = data.filter((proyecto) => proyecto.activo);
      setRecords(activeProyects);
    } catch (error) {
      console.error("Error en ProyectConsult.listProyects:", error);
    }
  };

  const listProyectsUser = async () => {
    try {
      const allUsers = await getUsuarios();
      const usuarioActual = allUsers.find(
        (usuario) => usuario.correo === auth.currentUser.email
      );
      const data = await getProyectsByIdUsuario(usuarioActual.usuarioId);
      setProyectos(data);
      const activeProyects = data.filter((proyecto) => proyecto.activo);
      setRecords(activeProyects);
    } catch (error) {
      console.error("Error en ProyectConsult.listProyects:", error);
    }
  };
  useEffect(() => {
    if (auth.currentUser.email === "admin@gmail.com") {
      listProyects();
    } else {
      listProyectsUser();
    }
  }, []);

  const columns =
    auth.currentUser.email === "admin@gmail.com"
      ? [
          {
            name: "Titulo",
            selector: (row) => row.titulo,
            sortable: true,
          },
          {
            name: "Descripcion",
            selector: (row) => row.descripcion,
            sortable: true,
          },
          {
            name: "Tareas",
            button: true,
            cell: (row) => (
              <button
                className="btn btn-warning btn-sm"
                onClick={() => navigate(`/taskConsult/${row.proyectoId}`)}
              >
                Tareas
              </button>
            ),
          },
          {
            name: "Participantes",
            button: true,
            cell: (row) => (
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleShow(row.proyectoId)}
              >
                Participantes
              </button>
            ),
          },
          {
            name: "Editar",
            button: true,
            cell: (row) => (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate(`/updateProyect/${row.proyectoId}`)}
              >
                Editar
              </button>
            ),
          },
          {
            name: "Eliminar",
            button: true,
            cell: (row) => (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(row.proyectoId)}
              >
                Eliminar
              </button>
            ),
          },
        ]
      : ProyectColumns();

  const handleDelete = async (id) => {
    try {
      await deleteProyect(id);
      listProyects();
    } catch (error) {
      console.log(error);
    }
  };

  function handleFilter(event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = proyectos.filter((item) => {
      if (item.activo === true) {
        return (
          item.nombre?.toLowerCase().includes(searchValue) ||
          item.descripcion?.toLowerCase().includes(searchValue)
        );
      }
    });
    setRecords(filteredData);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">GESTIONAR PROYECTOS</h1>
      <div className="text-end">
        <input type="text" placeholder="Buscar" onChange={handleFilter}></input>
      </div>
      <DataTable
        columns={columns}
        data={records}
        pagination
        highlightOnHover
        striped
        pointerOnHover
        fixedHeader
      />
      <ModalProyect
        show={show}
        handleClose={handleClose}
        proyecto={proyectoSeleccionado}
      />
    </div>
  );
}

export default ProyectConsult;
