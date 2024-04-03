import React from "react";

function UserForm() {
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
                <form role="form">
                  <div className="mb-3">
                    <label className="form-label">NickName</label>
                    <input
                      type="text"
                      name="nickName"
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
                      name="nombreCompleto"
                      className="form-control"
                      placeholder="Ingrese su nombre completo"
                      min="1900"
                      max="2020"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo electronico</label>
                    <input
                      type="text"
                      name="nombreCompleto"
                      className="form-control"
                      placeholder="Ingrese su correo electronico"
                      min="1900"
                      max="2020"
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
                            type="number"
                            placeholder="Ingrese su contraseña"
                            name
                            className="form-control"
                            required
                          />
                          <input
                            type="number"
                            placeholder="Confirma tu contraseña"
                            name
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
                          name="rol"
                          placeholder="Ingrese su rol"
                          className="form-control"
                          maxLength="100"
                          required
                        />
                      </div>
                    </div>
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

export default UserForm;
