import React from "react";
import { useNavigate } from "react-router-dom";

function ColumnProyectUser() {
  const navigate = useNavigate();
  return [
    {
      name: "Titulo",
      selector: (row) => row.titulo,
      sortable: true,
    },
    {
      name: "Descripcion",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "Tareas",
      button: true,
      cell: (row) => (
        <button
          className="btn btn-warning btn-sm"
          onClick={() => navigate(`/taskConsultUser/${row.proyectoId}`)}
        >
          Tareas
        </button>
      ),
    },
  ];
}

export default ColumnProyectUser;
