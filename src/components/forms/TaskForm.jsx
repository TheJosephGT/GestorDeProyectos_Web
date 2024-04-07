import React from "react";
import { useState, useEffect } from "react";
import { postTask } from "../../Repositorys/TaskRepository.js";
import { getParticipantesProyecto } from "../../Repositorys/ProyectRepository.js";
import { useNavigate, useParams } from "react-router-dom";
import TaskItem from "./TaskItem";

function TaskForm() {
  const navigate = useNavigate();
  const params = useParams();
  const initialState = {
    id: 0,
    proyectoId: params.id,
    nombre: "",
    descripcion: "",
    estado: "Activo",
    prioridad: "Alta",
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
      await postTask(task);
      setTask(initialState);
      navigate("/proyectConsult");
    } catch (error) {
      console.log(error);
    }
  };

  const listUsuarios = async () => {
    try {
      const data = await getParticipantesProyecto(params.id);
      const activeUsers = data.filter((usuario) => usuario.activo);
      setUsuarios(activeUsers);
    } catch (error) {
      console.error("Error en listUsuarios", error);
    }
  };

  useEffect(() => {
    listUsuarios();
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

export default TaskForm;
