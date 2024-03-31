import React, { useState } from "react";
import DataTable from "react-data-table-component";

function TaskConsult() {
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
      name: "Prioridad",
      selector: (row) => row.Prioridad,
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
      Prioridad: "Alta",
    },
    {
      Nombre: "María García",
      Descripcion: "maria_g",
      Prioridad: "Alta",
    },
    {
      Nombre: "Carlos López",
      Descripcion: "carlitos99",
      Prioridad: "Alta",
    },
    {
      Nombre: "Ana Martínez",
      Descripcion: "anam",
      Prioridad: "Alta",
    },
    {
      Nombre: "Laura Rodríguez",
      Descripcion: "lau_rdz",
      Prioridad: "Alta",
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
        item.Descripcion.toLowerCase().includes(searchValue) ||
        item.Prioridad.toLowerCase().includes(searchValue)
      );
    });
    setRecords(filteredData);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Gestionar tareas</h1>
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

export default TaskConsult;
