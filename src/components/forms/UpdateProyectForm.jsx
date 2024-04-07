import React from "react";
import { useState, useEffect } from "react";
import {
  postProyect,
  getProyectById,
  putProyect,
} from "../../Repositorys/ProyectRepository";
import { getUsuarios } from "../../Repositorys/UsuarioRepository";
import { useNavigate, useParams } from "react-router-dom";
import ProyectItem from "./ProyectItem";

import appFirebase from "../../credenciales";
import { getAuth } from "firebase/auth";
const auth = getAuth(appFirebase);

function UpdateProyectForm() {
  const navigate = useNavigate();
  const params = useParams();
  const initialState = {
    id: 0,
    titulo: "",
    descripcion: "",
    estado: "Activo",
    fechaCreacion: "",
    progreso: 0,
    activo: true,
    participantes: [],
  };
  const [proyect, setProyect] = useState(initialState);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionadoId, setUsuarioSeleccionadoId] = useState(0);

  const handleInputChange = (event) => {
    setProyect({ ...proyect, [event.target.name]: event.target.value });
  };

  const handleUsuarioChange = (event) => {
    setUsuarioSeleccionadoId(parseInt(event.target.value));
  };

  const handleSeleccionarUsuario = () => {
    const usuarioSeleccionado = usuarios.find(
      (usuario) => usuario.usuarioId === parseInt(usuarioSeleccionadoId)
    );
    // Verificar si el usuario seleccionado ya está en la lista de participantes
    const participanteExistente = proyect.participantes.find(
      (participante) =>
        participante.usuarioId === usuarioSeleccionado?.usuarioId
    );
    if (usuarioSeleccionado && !participanteExistente) {
      setProyect({
        ...proyect,
        participantes: [
          ...proyect.participantes,
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
    const participantes = proyect.participantes.filter(
      (participante) => participante.usuarioId !== usuarioId
    );
    setProyect({ ...proyect, participantes });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!params.id) {
        await postProyect(proyect);
        setProyect(initialState);
      } else {
        await putProyect(params.id, proyect);
      }

      navigate("/proyectConsult");
    } catch (error) {
      console.log(error);
    }
  };

  const listUsuarios = async () => {
    try {
      const data = await getUsuarios();
      const activeUsers = data.filter((usuario) => usuario.activo);
      setUsuarios(activeUsers);
    } catch (error) {
      console.error("Error en listUsuarios", error);
    }
  };

  const datosProyecto = async (proyectoId) => {
    try {
      const data = await getProyectById(proyectoId);
      if (data) {
        // Formatear la fecha
        const formattedDate = new Date(data.fechaCreacion)
          .toISOString()
          .split("T")[0];
        const newData = {
          proyectoId: proyectoId,
          titulo: data.titulo,
          descripcion: data.descripcion,
          estado: data.estado,
          fechaCreacion: formattedDate,
          progreso: data.progreso,
          activo: data.activo,
          participantes: data.participantes,
        };
        setProyect(newData);
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
      datosProyecto(params.id);
    }
  }, []);

  return (
    <>
      {auth.currentUser.email === "admin@gmail.com" ? (
        <ProyectItem
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          proyect={proyect}
          handleUsuarioChange={handleUsuarioChange}
          usuarios={usuarios}
          usuarioSeleccionadoId={usuarioSeleccionadoId}
          handleSeleccionarUsuario={handleSeleccionarUsuario}
          handleEliminarParticipante={handleEliminarParticipante}
        />
      ) : (
        <h1>No tienes permisos para acceder a esta página</h1>
      )}
    </>
  );
}
export default UpdateProyectForm;
