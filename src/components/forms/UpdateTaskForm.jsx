import React from "react";
import { useState, useEffect } from "react";
import {
  postTask,
  getTaskById,
  putTask,
} from "../../Repositorys/TaskRepository.js";
import { getParticipantesProyecto } from "../../Repositorys/ProyectRepository.js";
import { useNavigate, useParams } from "react-router-dom";
import TaskItem from "./TaskItem";

function UpdateTaskForm() {
  const navigate = useNavigate();
  const params = useParams();
  const initialState = {
    id: 0,
    proyectoId: params.proyectoId,
    nombre: "",
    descripcion: "",
    estado: "Activo",
    prioridad: "",
    activo: true,
    participantes: [],
  };
  const [task, setTask] = useState(initialState);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionadoId, setUsuarioSeleccionadoId] = useState(0);

  const handleInputChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handleUsuarioChange = (event) => {
    setUsuarioSeleccionadoId(parseInt(event.target.value));
  };

  const handleSeleccionarUsuario = () => {
    const usuarioSeleccionado = usuarios.find(
      (usuario) => usuario.usuarioId === parseInt(usuarioSeleccionadoId)
    );
    // Verificar si el usuario seleccionado ya está en la lista de participantes
    const participanteExistente = task.participantes.find(
      (participante) =>
        participante.usuarioId === usuarioSeleccionado?.usuarioId
    );
    if (usuarioSeleccionado && !participanteExistente) {
      setTask({
        ...task,
        participantes: [
          ...task.participantes,
          {
            usuarioId: usuarioSeleccionado.usuarioId,
          },
        ],
      });
    } else {
      alert("¡El participante ya está agregado!");
    }

    setUsuarioSeleccionadoId(0);
  };

  const handleEliminarParticipante = (usuarioId) => {
    const participantes = task.participantes.filter(
      (participante) => participante.usuarioId !== usuarioId
    );
    setTask({ ...task, participantes });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!params.id) {
        await postTask(task);
        setTask(initialState);
      } else {
        await putTask(params.id, task);
      }

      navigate("/proyectConsult");
    } catch (error) {
      console.log(error);
    }
  };

  const listUsuarios = async () => {
    try {
      const data = await getParticipantesProyecto(params.proyectoId);
      const activeUsers = data.filter((usuario) => usuario.activo);
      setUsuarios(activeUsers);
    } catch (error) {
      console.error("Error en listUsuarios", error);
    }
  };

  const datosTarea = async (tareaId) => {
    try {
      const data = await getTaskById(tareaId);
      if (data) {
        const newData = {
          tareaId: tareaId,
          proyectoId: data.proyectoId,
          nombre: data.nombre,
          descripcion: data.descripcion,
          estado: data.estado,
          prioridad: data.prioridad,
          activo: data.activo,
          participantes: data.participantes,
        };
        setTask(newData);
      } else {
        console.error("No se encontró el proyecto");
      }
    } catch (error) {
      console.error("Error en datosProyecto", error);
    }
  };

  useEffect(() => {
    listUsuarios();
    if (params.id) {
      datosTarea(params.id);
    }
  }, []);

  return (
    <TaskItem
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      task={task}
      handleUsuarioChange={handleUsuarioChange}
      usuarios={usuarios}
      usuarioSeleccionadoId={usuarioSeleccionadoId}
      handleSeleccionarUsuario={handleSeleccionarUsuario}
      handleEliminarParticipante={handleEliminarParticipante}
    />
  );
}

export default UpdateTaskForm;
