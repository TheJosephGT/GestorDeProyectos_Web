import { useState, useEffect } from "react";
import {
  postUsuario,
  getUsuarioById,
  putUsuario,
} from "../../Repositorys/UsuarioRepository";
import UserItem from "./UserItem";
import { useNavigate, useParams } from "react-router-dom";
import appFirebase from "../../credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(appFirebase);

function UpdateUserForm() {
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
        setConfirmarContrasena(data.clave);
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
    <UserItem
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      usuario={usuario}
      confirmarContrasena={confirmarContrasena}
    />
  );
}

export default UpdateUserForm;
