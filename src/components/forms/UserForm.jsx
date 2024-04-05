import { useState, useEffect } from "react";
import {
  postUsuario,
  getUsuarioById,
  putUsuario,
} from "../../Repositorys/UsuarioRepository";
import { useNavigate, useParams } from "react-router-dom";
import appFirebase from "../../credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(appFirebase);

function UserForm() {
  const navigate = useNavigate();
  const params = useParams();
  const initialState = {
    usuarioId: 0,
    nickName: "",
    nombreCompleto: "",
    correo: "",
    clave: "",
    rol: "",
    activo: true,
  };
  const [usuario, setUsuario] = useState(initialState);
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "confirmarContrasena") {
      setConfirmarContrasena(value);
    } else {
      setUsuario({ ...usuario, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!params.id) {
        if (usuario.clave === confirmarContrasena) {
          await postUsuario(usuario);
          await createUserWithEmailAndPassword(
            auth,
            usuario.correo,
            usuario.clave
          );
          setUsuario(initialState);
        } else {
          alert("Las contraseñas no coinciden");
        }
      } else {
        await putUsuario(params.id, usuario);
      }
      navigate("/userConsult");
    } catch (error) {
      console.log(error);
    }
  };

  const datosUsuario = async (usuarioId) => {
    try {
      const data = await getUsuarioById(usuarioId);
      if (data) {
        const newData = {
          usuarioId: usuarioId,
          nickName: data.nickName,
          nombreCompleto: data.nombreCompleto,
          correo: data.correo,
          clave: data.clave,
          rol: data.rol,
          activo: data.activo,
        };
        setUsuario(newData);
      } else {
        console.log("No se encontraron datos");
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (params.id) {
      datosUsuario(params.id);
    }
    // eslint-disable-next-line
  }, []);

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
                    <label className="form-label">Correo electronico</label>
                    <input
                      type="text"
                      id="correo"
                      name="correo"
                      value={usuario.correo}
                      onChange={handleInputChange}
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
                            placeholder="Confirma tu contraseña"
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

export default UserForm;
