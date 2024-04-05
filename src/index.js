import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Navegacion from "./navBar/Navegacion";
import Dashboard from "./components/Dashboard";
import UserForm from "./components/forms/UserForm";
import ProyectForm from "./components/forms/ProyectForm";
import TaskFrom from "./components/forms/TaskForm";
import UserConsult from "./components/consult/UserConsult";
import ProyectConsult from "./components/consult/ProyectConsult";
import TaskConsult from "./components/consult/TaskConsult";
import Login from "./components/Login";

// Importando los modulos de firebase
import appFirebase from "./credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const auth = getAuth(appFirebase);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      setUsuario(usuarioFirebase);
      setCargando(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (cargando) return <div>Cargando...</div>;

  if (!usuario) {
    console.log("Usuario cerro sesion");
  }

  return (
    <BrowserRouter>
      {usuario ? (
        <div>
          <Navegacion />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/userForm" element={<UserForm />} />
            <Route path="/updateUser/:id" element={<UserForm />} />
            <Route path="/proyectForm" element={<ProyectForm />} />
            <Route path="/taskForm" element={<TaskFrom />} />
            <Route path="/userConsult" element={<UserConsult />} />
            <Route path="/proyectConsult" element={<ProyectConsult />} />
            <Route path="/taskConsult" element={<TaskConsult />} />
          </Routes>
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(<App />);
