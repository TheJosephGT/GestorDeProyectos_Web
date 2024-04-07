import { useState } from "react";
import { postUsuario } from "../../Repositorys/UsuarioRepository";
import UserItem from "./UserItem";
import { useNavigate } from "react-router-dom";
import appFirebase from "../../credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const auth = getAuth(appFirebase);

function UserForm() {
  const navigate = useNavigate();
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

      await signInWithEmailAndPassword(auth, "admin@gmail.com", "hola123");
      if (usuario) {
        console.log("Usuario logueado");
      } else {
        console.log("No se pudo loguear");
      }
      navigate("/userConsult");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {auth.currentUser.email === "admin@gmail.com" ? (
        <UserItem
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          usuario={usuario}
          confirmarContrasena={confirmarContrasena}
        />
      ) : (
        <h1>No tienes permisos para acceder a esta página</h1>
      )}
    </>
  );
}

export default UserForm;
