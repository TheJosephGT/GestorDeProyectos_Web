import { useState } from "react";
import { postUsuario } from "../../Repositorys/UsuarioRepository";
import UserItem from "./UserItem";
import { useNavigate } from "react-router-dom";
import appFirebase from "../../credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
      navigate("/userConsult");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserItem
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      usuario={usuario}
      confirmarContrasena={confirmarContrasena}
    />
  );
}

export default UserForm;
