import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navegacion />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/userForm" element={<UserForm />} />
      <Route path="/proyectForm" element={<ProyectForm />} />
      <Route path="/taskForm" element={<TaskFrom />} />
      <Route path="/userConsult" element={<UserConsult />} />
      <Route path="/proyectConsult" element={<ProyectConsult />} />
      <Route path="/taskConsult" element={<TaskConsult />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
