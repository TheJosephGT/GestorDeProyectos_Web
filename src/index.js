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
import UserConsult from "./components/consult/UserConsult";
import ProyectConsult from "./components/consult/ProyectConsult";
import TaskConsult from "./components/consult/TaskConsult";
import Login from "./components/Login";
import UpdateProyectForm from "./components/forms/UpdateProyectForm";
import UpdateUserForm from "./components/forms/UpdateUserForm";
import TaskForm from "./components/forms/TaskForm";
import UpdateTaskForm from "./components/forms/UpdateTaskForm";

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
            <Route path="/updateUser/:id" element={<UpdateUserForm />} />
            <Route path="/proyectForm" element={<ProyectForm />} />
            <Route path="/updateProyect/:id" element={<UpdateProyectForm />} />
            <Route path="/taskForm/:id" element={<TaskForm />} />
            <Route
              path="/updateTaskForm/:proyectoId/:id"
              element={<UpdateTaskForm />}
            />
            <Route path="/userConsult" element={<UserConsult />} />
            <Route path="/proyectConsult" element={<ProyectConsult />} />
            <Route path="/taskConsult/:id" element={<TaskConsult />} />
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
