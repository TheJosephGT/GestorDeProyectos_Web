import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTasksByProyectId,
  getTasksByUsuarioIdAndProyectId,
} from "../../Repositorys/TaskRepository";
import { getUsuarios } from "../../Repositorys/UsuarioRepository";
import ModalTaskUser from "../ModalTaskUser";

import appFirebase from "../../credenciales";
import { getAuth } from "firebase/auth";
const auth = getAuth(appFirebase);

function TaskConsultUser() {
  const navigate = useNavigate();
  const params = useParams();
  const [tareas, setTareas] = useState([]);
  const [records, setRecords] = useState([]);

  const [show, setShow] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    const tareaActual = tareas.find((tarea) => tarea.tareaId === id);
    setTareaSeleccionada(tareaActual);
    setShow(true);
  };

  const listTasksUser = async () => {
    try {
      const allUsers = await getUsuarios();
      const usuarioActual = allUsers.find(
        (usuario) => usuario.correo === auth.currentUser.email
      );
      const data = await getTasksByUsuarioIdAndProyectId(
        params.id,
        usuarioActual.usuarioId
      );
      setTareas(data);
      const activeTareas = data.filter((tarea) => tarea.activo);
      setRecords(activeTareas);
    } catch (error) {
      console.error("Error en listTasks:", error);
    }
  };
  useEffect(() => {
    if (params.id) {
      if (auth.currentUser.email !== "admin@gmail.com") {
        listTasksUser();
      }
    }
  }, []);

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Descripcion",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "Prioridad",
      selector: (row) => row.prioridad,
      sortable: true,
    },
    {
      name: "Marcar",
      button: true,
      cell: (row) => (
        <button
          className="btn btn-success btn-sm"
          onClick={() => handleShow(row.tareaId)}
        >
          Completar
        </button>
      ),
    },
  ];
  function handleFilter(event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = tareas.filter((item) => {
      if (item.activo === true) {
        return (
          item.nombre.toLowerCase().includes(searchValue) ||
          item.descripcion.toLowerCase().includes(searchValue) ||
          item.prioridad.toLowerCase().includes(searchValue)
        );
      }
    });
    setRecords(filteredData);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">GESTIONAR TAREAS</h1>
      <div className="text-end">
        <input type="text" placeholder="Buscar" onChange={handleFilter}></input>
      </div>
      <div className="text-start">
        {auth.currentUser.email === "admin@gmail.com" && (
          <button
            className="btn btn-success btn-md"
            onClick={() => navigate(`/taskForm/${params.id}`)}
          >
            Agregar
          </button>
        )}
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
      <ModalTaskUser
        show={show}
        handleClose={handleClose}
        tarea={tareaSeleccionada}
        updateTasks={listTasksUser}
      />
    </div>
  );
}

export default TaskConsultUser;
