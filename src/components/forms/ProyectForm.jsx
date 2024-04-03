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
    <div className="container py-5">
      <div className="row mb-4">
        <div className="card-header">
          <h1 class="text-center">
            <h2>REGISTRO DE PROYECTOS</h2>
          </h1>
        </div>
      </div>
      <div className="row">
        {/*anchar*/}
        <div className="col-lg-10 mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-5 shadow-lg">
            <div className="tab-content">
              <div id="nav-tab-card" className="tab-pane fade show active">
                <form role="form">
                  <div className="mb-3">
                    <label className="form-label">Nombre del proyecto</label>
                    <input
                      type="text"
                      name="nickName"
                      className="form-control"
                      minLength="2"
                      maxLength="50"
                      placeholder="Ingrese el nombre del proyecto"
                      autoFocus
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      type="text"
                      name="nombreCompleto"
                      className="form-control"
                      placeholder="Ingrese su nombre completo"
                      min="1900"
                      max="2020"
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-4 mb-3">
                      <label className="form-label">Usuario</label>
                      <select className="form-select">
                        <option value="">Selecciona un usuario</option>
                      </select>
                    </div>
                    <div className="col-sm-4 mb-3 d-flex align-items-end">
                      <button
                        type="button"
                        className="btn btn-primary btn-md mr-2"
                      >
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
                  <button
                    type="button"
                    className="subscribe btn btn-primary btn-block rounded-pill shadow-sm"
                  >
                    {" "}
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProyectForm;
