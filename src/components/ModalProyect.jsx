import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getUsuarios } from "./../Repositorys/UsuarioRepository";

function ModalProyect({ show, handleClose, proyecto, tarea }) {
  const [usuarios, setUsuarios] = useState([]);

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

  const data = proyecto || tarea;

  if (!data) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data.titulo || data.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <div className="table-responsive mt-3">
          <table
            className="table table-light table-striped"
            style={{ boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <thead>
              <tr>
                <th>Nombre</th>
                <th>NickName</th>
                <th>Rol</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              {data.participantes.map((participante) => {
                const usuarioSeleccionado = usuarios.find(
                  (usuario) =>
                    usuario.usuarioId === participante.usuarioId &&
                    usuario.activo === true
                );

                if (usuarioSeleccionado) {
                  return (
                    <tr key={participante.usuarioId}>
                      <td>{usuarioSeleccionado.nombreCompleto}</td>
                      <td>{usuarioSeleccionado.nickName}</td>
                      <td>{usuarioSeleccionado.rol}</td>
                      <td>{usuarioSeleccionado.correo}</td>
                    </tr>
                  );
                } else {
                  return null; // Si usuarioSeleccionado es null, no renderizar nada
                }
              })}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalProyect;
