import React from "react";
import { useState, useEffect } from "react";
import { postProyect } from "../../Repositorys/ProyectRepository";
import { getUsuarios } from "../../Repositorys/UsuarioRepository";
import { useNavigate } from "react-router-dom";
import ProyectItem from "./ProyectItem";

function ProyectForm() {
  const navigate = useNavigate();
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
      await postProyect(proyect);
      setProyect(initialState);
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

  useEffect(() => {
    listUsuarios();
  }, []);

  return (
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
  );
}

export default ProyectForm;
