import React from "react";

function ColumnTaskUser() {
  return [
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Descripcion",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "Prioridad",
      selector: (row) => row.prioridad,
      sortable: true,
    },
    {
      name: "Marcar",
      button: true,
      cell: (row) => (
        <button className="btn btn-success btn-sm" onClick={{}}>
          Completar
        </button>
      ),
    },
  ];
}

export default ColumnTaskUser;
