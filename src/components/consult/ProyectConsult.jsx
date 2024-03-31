import React, { useState } from "react";
import DataTable from "react-data-table-component";

function ProyectConsult() {
  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.Nombre,
      sortable: true,
    },
    {
      name: "Descripcion",
      selector: (row) => row.Descripcion,
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
      Descripcion: "juancito123",
    },
    {
      Nombre: "María García",
      Descripcion: "maria_g",
    },
    {
      Nombre: "Carlos López",
      Descripcion: "carlitos99",
    },
    {
      Nombre: "Ana Martínez",
      Descripcion: "anam",
    },
    {
      Nombre: "Laura Rodríguez",
      Descripcion: "lau_rdz",
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
        item.Descripcion.toLowerCase().includes(searchValue)
      );
    });
    setRecords(filteredData);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Gestionar proyectos</h1>
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

export default ProyectConsult;
