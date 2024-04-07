import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { getTasksByProyectId } from "../../Repositorys/TaskRepository";

function TaskConsult() {
  const navigate = useNavigate();
  const params = useParams();
  const [tareas, setTareas] = useState([]);
  const [records, setRecords] = useState([]);

  const listTasks = async (proyectoId) => {
    try {
      const data = await getTasksByProyectId(proyectoId);
      setTareas(data);
      const activeTareas = data.filter((tarea) => tarea.activo);
      setRecords(activeTareas);
    } catch (error) {
      console.error("Error en listTasks:", error);
    }
  };
  useEffect(() => {
    if (params.id) {
      listTasks(params.id);
    }
  }, []);

  const columns = [
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
          onClick={() =>
            navigate(`/updateTaskForm/${params.id}/${row.tareaId}`)
          }
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
    const filteredData = tareas.filter((item) => {
      if (item.activo === true) {
        return (
          item.nombre.toLowerCase().includes(searchValue) ||
          item.descripcion.toLowerCase().includes(searchValue) ||
          item.prioridad.toLowerCase().includes(searchValue)
        );
      }
    });
    setRecords(filteredData);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">GESTIONAR TAREAS</h1>
      <div className="text-end">
        <input type="text" placeholder="Buscar" onChange={handleFilter}></input>
      </div>
      <div className="text-start">
        <button
          className="btn btn-success btn-md"
          onClick={() => navigate(`/taskForm/${params.id}`)}
        >
          Agregar
        </button>
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
