import React from "react";
import { useState, useEffect } from "react";
import {
  postProyect,
  getProyectById,
  putProyect,
} from "../../Repositorys/ProyectRepository";
import { getUsuarios } from "../../Repositorys/UsuarioRepository";
import { useNavigate, useParams } from "react-router-dom";
import { set } from "firebase/database";

function ProyectForm() {
  const navigate = useNavigate();
  const params = useParams();
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

  const clearForm = () => {
    setProyect(initialState);
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
      if (!params.id) {
        await postProyect(proyect);
        setProyect(initialState);
      } else {
        await putProyect(params.id, proyect);
      }

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

  const datosProyecto = async (proyectoId) => {
    try {
      const data = await getProyectById(proyectoId);
      if (data) {
        // Formatear la fecha
        const formattedDate = new Date(data.fechaCreacion)
          .toISOString()
          .split("T")[0];
        const newData = {
          proyectoId: proyectoId,
          titulo: data.titulo,
          descripcion: data.descripcion,
          estado: data.estado,
          fechaCreacion: formattedDate, // Usar la fecha formateada
          progreso: data.progreso,
          activo: data.activo,
          participantes: data.participantes,
        };
        setProyect(newData);
      } else {
        console.error("No se encontró el proyecto");
      }
    } catch (error) {
      console.error("Error en datosProyecto", error);
    }
  };

  useEffect(() => {
    listUsuarios();
    if (params.id) {
      datosProyecto(params.id);
    }
  }, []);

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
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Titulo</label>
                    <input
                      type="text"
                      id="titulo"
                      name="titulo"
                      value={proyect.titulo}
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
                      value={proyect.descripcion}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Ingrese su nombre completo"
                      min="1900"
                      max="2020"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input
                      type="date"
                      id="fechaCreacion"
                      name="fechaCreacion"
                      value={proyect.fechaCreacion}
                      onChange={handleInputChange}
                      className="form-control"
                      minLength="2"
                      maxLength="50"
                      required
                    />
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
                        {proyect.participantes.map((participante) => {
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
  );
}

export default ProyectForm;
