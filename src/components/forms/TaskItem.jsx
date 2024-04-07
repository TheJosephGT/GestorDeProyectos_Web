import React from "react";

function TaskItem({
  handleSubmit,
  handleInputChange,
  task,
  handleUsuarioChange,
  usuarios,
  usuarioSeleccionadoId,
  handleSeleccionarUsuario,
  handleEliminarParticipante,
}) {
  return (
    <div>
      <div className="container py-5">
        <div className="row mb-4">
          <div className="card-header">
            <h1 className="text-center">
              <h2>REGISTRO DE TAREAS</h2>
            </h1>
          </div>
        </div>
        <div className="row">
          {/*anchar*/}
          <div className="col-lg-10 mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-5 shadow-lg">
              <div className="tab-content">
                <div id="nav-tab-card" className="tab-pane fade show active">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={task.nombre}
                        onChange={handleInputChange}
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
                        id="descripcion"
                        name="descripcion"
                        value={task.descripcion}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Ingrese su nombre completo"
                        min="1900"
                        max="2020"
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-sm-4 mb-3">
                        <label className="form-label">Prioridad</label>
                        <select
                          className="form-select"
                          name="prioridad"
                          id="prioridad"
                          value={task.prioridad}
                          onChange={handleInputChange}
                        >
                          <option value="Alto">Alto</option>
                          <option value="Medio">Medio</option>
                          <option value="Bajo">Bajo</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 mb-3">
                        <label className="form-label">Participantes</label>
                        <select
                          className="form-select"
                          name="usuarioSeleccionado"
                          value={usuarioSeleccionadoId}
                          onChange={handleUsuarioChange}
                        >
                          <option>Selecciona un usuario</option>
                          {usuarios.map(
                            (usuario) =>
                              usuario.rol !== "Administrador" && (
                                <option
                                  key={usuario.usuarioId}
                                  value={usuario.usuarioId}
                                >
                                  {`${usuario.nombreCompleto} - ${usuario.rol}`}
                                </option>
                              )
                          )}
                        </select>
                      </div>
                      <div className="col-sm-4 mb-3 d-flex align-items-end">
                        <button
                          type="button"
                          className="btn btn-primary btn-md mr-2"
                          onClick={() => handleSeleccionarUsuario()}
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
                          {task.participantes.map((participante) => {
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
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm mr-2"
                                      onClick={() =>
                                        handleEliminarParticipante(
                                          participante.usuarioId
                                        )
                                      }
                                    >
                                      <i className="oi oi-cloud-download"></i>{" "}
                                      Eliminar
                                    </button>
                                  </td>
                                </tr>
                              );
                            } else {
                              return null; // Si usuarioSeleccionado es null, no renderizar nada
                            }
                          })}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="submit"
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
    </div>
  );
}

export default TaskItem;
