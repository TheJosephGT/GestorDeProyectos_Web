import React, { useState } from "react";

function UserItem({
  handleSubmit,
  handleInputChange,
  usuario,
  confirmarContrasena,
}) {
  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="card-header">
          <h1 className="text-center">
            <h2>REGISTRO DE USUARIOS</h2>
          </h1>
        </div>
      </div>
      <div className="row">
        {/*anchar*/}
        <div className="col-lg-7 mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-5 shadow-lg">
            <div className="tab-content">
              <div id="nav-tab-card" className="tab-pane fade show active">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">NickName</label>
                    <input
                      type="text"
                      id="nickName"
                      name="nickName"
                      value={usuario.nickName}
                      onChange={handleInputChange}
                      className="form-control"
                      minLength="2"
                      maxLength="50"
                      placeholder="Ingrese su NickName"
                      autoFocus
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nombre completo</label>
                    <input
                      type="text"
                      id="nombreCompleto"
                      name="nombreCompleto"
                      value={usuario.nombreCompleto}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Ingrese su nombre completo"
                      min="1900"
                      max="2020"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      value={usuario.correo}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Ingrese su correo electrónico"
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="form-group">
                        <label>
                          <span className="hidden-xs">Contraseña</span>
                        </label>
                        <div className="input-group">
                          <input
                            type="password"
                            id="clave"
                            name="clave"
                            value={usuario.clave}
                            onChange={handleInputChange}
                            placeholder="Ingrese su contraseña"
                            className="form-control"
                            required
                          />
                          <input
                            type="password"
                            id="confirmarContrasena"
                            name="confirmarContrasena"
                            value={confirmarContrasena}
                            onChange={handleInputChange}
                            placeholder="Confirme su contraseña"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group mb-4">
                        <label className="form-label">Rol</label>
                        <input
                          type="text"
                          id="rol"
                          name="rol"
                          value={usuario.rol}
                          onChange={handleInputChange}
                          placeholder="Ingrese su rol"
                          className="form-control"
                          maxLength="100"
                          required
                        />
                      </div>
                    </div>
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
  );
}

export default UserItem;
