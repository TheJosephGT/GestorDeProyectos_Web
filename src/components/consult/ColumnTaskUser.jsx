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
  ];
}

export default ColumnTaskUser;
