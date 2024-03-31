import React from "react";
import { useState } from "react";

function ProyectForm() {
  const [venta, setVenta] = useState({
    VentaId: 0,
    Fecha: "",
    ClienteId: 0,
    Concepto: "",
    VentaDetalle: [],
    Ganancias: 0,
  });
  const [detalle, setDetalle] = useState({
    Marca: "",
    Color: "",
    Size: "",
    Cantidad: 0,
    Precio: 0,
  });
  const [listaClientes, setListaClientes] = useState([]);

  const Guardar = () => {
    // Lógica para guardar la venta
  };

  // Usuario de ejemplo
  const usuarioEjemplo = {
    Nombre: "Ejemplo",
    NickName: "ejemplo123",
    Rol: "Administrador",
    Correo: "ejemplo@example.com",
  };

  return (
    <form onSubmit={Guardar}>
      <div
        className="card col-lg-8 mx-auto"
        style={{ boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="card-header">
          <h1 class="text-center">
            <strong>Registro de Proyectos</strong>
          </h1>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3 mb-3">
              <label className="form-label">Nombre del proyecto</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="col-sm-3 mb-3">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese la descripción"
              />
            </div>
          </div>
          <hr />
          <h5 className="mb-3 fw-bold">Selecciona participantes:</h5>
          <div className="row">
            <div className="col-sm-4 mb-3">
              <label className="form-label">Usuario</label>
              <select className="form-select">
                <option value="">Selecciona un usuario</option>
              </select>
            </div>
            <div className="col-sm-4 mb-3 d-flex align-items-end">
              <button type="button" className="btn btn-primary btn-md mr-2">
                <i className="oi oi-cloud-download"></i> Seleccionar
              </button>
            </div>
          </div>
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
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{usuarioEjemplo.Nombre}</td>
                  <td>{usuarioEjemplo.NickName}</td>
                  <td>{usuarioEjemplo.Rol}</td>
                  <td>{usuarioEjemplo.Correo}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mr-2"
                    >
                      <i className="oi oi-cloud-download"></i> Eliminar
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>{usuarioEjemplo.Nombre}</td>
                  <td>{usuarioEjemplo.NickName}</td>
                  <td>{usuarioEjemplo.Rol}</td>
                  <td>{usuarioEjemplo.Correo}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mr-2"
                    >
                      <i className="oi oi-cloud-download"></i> Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-center">
          <button type="button" className="btn btn-success btn-lg mr-2">
            <i className="oi oi-cloud-download"></i> Guardar
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProyectForm;
