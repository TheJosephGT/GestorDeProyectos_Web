import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalProyect({ show, handleClose, proyecto }) {
  if (!proyecto) return null;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{proyecto.titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{proyecto.descripcion}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalProyect;
