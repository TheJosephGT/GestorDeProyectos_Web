import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putTask } from "../Repositorys/TaskRepository";
import { getUsuarios } from "../Repositorys/UsuarioRepository";
import { getTasks } from "../Repositorys/TaskRepository";
import { useState, useEffect } from "react";

import appFirebase from "./../credenciales";
import { getAuth } from "firebase/auth";
const auth = getAuth(appFirebase);

function ModalTaskUser({ show, handleClose, tarea, updateTasks }) {
  const [tareaEditada, setTareaEditada] = useState(tarea);

  useEffect(() => {
    setTareaEditada(tarea);
  }, [tarea]);

  const handleCompletar = async () => {
    const listUsers = await getUsuarios();
    const listTasks = await getTasks();

    const usuarioActual = listUsers.find(
      (usuario) => usuario.correo === auth.currentUser.email
    );

    const tareaActualIndex = listTasks.findIndex(
      (t) => t.tareaId === tareaEditada.tareaId
    );

    if (tareaActualIndex === -1) {
      console.error("No se encontró la tarea actual en la lista de tareas.");
      return;
    }

    const nuevaListaTareas = [...listTasks];
    const tareaActual = nuevaListaTareas[tareaActualIndex];

    const participantesActuales = tareaActual.participantes.filter(
      (participante) => participante.usuarioId !== usuarioActual.usuarioId
    );

    nuevaListaTareas[tareaActualIndex] = {
      ...tareaActual,
      participantes: participantesActuales,
    };

    try {
      await putTask(tareaEditada.tareaId, nuevaListaTareas[tareaActualIndex]);
      handleClose();
      updateTasks();
    } catch (error) {
      console.error("Error en handleCompletar:", error);
    }
  };

  if (!tareaEditada) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{tareaEditada.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{tareaEditada.descripcion}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCompletar}>
          Completar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalTaskUser;
