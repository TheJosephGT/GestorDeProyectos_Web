import React, { useState } from "react";
import DataTable from "react-data-table-component";

function UserConsult() {
  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.Nombre,
      sortable: true,
    },
    {
      name: "NickName",
      selector: (row) => row.NickName,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.Rol,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.Correo,
      sortable: true,
    },
    {
      name: "Participantes",
      button: true,
      cell: (row) => (
        <button
          className="btn btn-success btn-sm"
          onClick={() => handleEdit(row)}
        >
          Ver
        </button>
      ),
    },
    {
      name: "Editar",
      button: true,
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleEdit(row)}
        >
          Editar
        </button>
      ),
    },
    {
      name: "Eliminar",
      button: true,
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row)}
        >
          Eliminar
        </button>
      ),
    },
  ];

  const data = [
    {
      Nombre: "Juan Perez",
      NickName: "juancito123",
      Rol: "Desarrollador",
      Correo: "juan.perez@example.com",
    },
    {
      Nombre: "María García",
      NickName: "maria_g",
      Rol: "Diseñadora",
      Correo: "maria.garcia@example.com",
    },
    {
      Nombre: "Carlos López",
      NickName: "carlitos99",
      Rol: "Gerente de Proyecto",
      Correo: "carlos.lopez@example.com",
    },
    {
      Nombre: "Ana Martínez",
      NickName: "anam",
      Rol: "Analista de Datos",
      Correo: "ana.martinez@example.com",
    },
    {
      Nombre: "Laura Rodríguez",
      NickName: "lau_rdz",
      Rol: "Marketing",
      Correo: "laura.rodriguez@example.com",
    },
  ];

  const [records, setRecords] = useState(data);

  const handleEdit = (row) => {
    // Lógica para editar el usuario
    console.log("Editar usuario:", row);
  };

  const handleDelete = (row) => {
    // Lógica para eliminar el usuario
    console.log("Eliminar usuario:", row);
  };

  const handleViewParticipants = (row) => {
    // Lógica para ver participantes
    console.log("Ver participantes:", row);
  };

  function handleFilter(event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = data.filter((item) => {
      return (
        item.Nombre.toLowerCase().includes(searchValue) ||
        item.NickName.toLowerCase().includes(searchValue) ||
        item.Rol.toLowerCase().includes(searchValue) ||
        item.Correo.toLowerCase().includes(searchValue)
      );
    });
    setRecords(filteredData);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Gestionar Usuarios</h1>
      <div className="text-end">
        <input type="text" placeholder="Buscar" onChange={handleFilter}></input>
      </div>
      <DataTable
        columns={columns}
        data={records}
        pagination
        highlightOnHover
        striped
        pointerOnHover
        fixedHeader
      />
    </div>
  );
}

export default UserConsult;
