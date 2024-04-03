import React from "react";
import ImageLogin from "../assets/imagen_login.png";
import IconoLogin from "../assets/icono_perfil.jpg";
import "../login.css";
import { useNavigate } from "react-router-dom";

import appFirebase from "../credenciales";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(appFirebase);

function Login() {
  const navigate = useNavigate();
  const functionAutenticacion = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const usuario = await signInWithEmailAndPassword(auth, email, password);
      if (usuario) {
        console.log("Usuario logueado", usuario);
        navigate("/");
      } else {
        console.log("No se pudo loguear");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body shadow-lg">
              <img
                src={IconoLogin}
                alt="icono_login"
                className="estilo-profile"
              />
              <form onSubmit={functionAutenticacion}>
                <input
                  type="text"
                  placeholder="Ingresar email"
                  className="cajaTexto"
                  id="email"
                />
                <input
                  type="password"
                  placeholder="Ingresar contraseña"
                  className="cajaTexto"
                  id="password"
                />
                <button className="btnForm">Iniciar sesión</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <img src={ImageLogin} alt="imagen_login" className="tamaño-imagen" />
        </div>
      </div>
    </div>
  );
}

export default Login;
