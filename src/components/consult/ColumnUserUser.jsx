import React from "react";

function ColumnUserUser() {
  return [
    {
      name: "Nombre",
      selector: (row) => row.nombreCompleto,
      sortable: true,
    },
    {
      name: "NickName",
      selector: (row) => row.nickName,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.rol,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.correo,
      sortable: true,
    },
  ];
}

export default ColumnUserUser;
