import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  getUsuarios,
  deleteUsuario,
} from "../../Repositorys/UsuarioRepository";
import { useNavigate } from "react-router-dom";

function UserConsult() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [records, setRecords] = useState([]);

  const listUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
      const activeUsuarios = data.filter(
        (usuario) => usuario.activo && usuario.rol !== "Administrador"
      );
      setRecords(activeUsuarios);
    } catch (error) {
      console.error("Error en UserConsult.listUsuarios:", error);
    }
  };
  useEffect(() => {
    listUsuarios();
  }, []);
  const columns = [
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
    {
      name: "Editar",
      button: true,
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate(`/updateUser/${row.usuarioId}`)}
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
          onClick={() => handleDelete(row.usuarioId)}
        >
          Eliminar
        </button>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await deleteUsuario(id);
      listUsuarios();
    } catch (error) {
      console.log(error);
    }
  };

  function handleFilter(event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = usuarios.filter((item) => {
      if (item.activo === true) {
        return (
          item.nombreCompleto.toLowerCase().includes(searchValue) ||
          item.nickName.toLowerCase().includes(searchValue) ||
          item.rol.toLowerCase().includes(searchValue) ||
          item.correo.toLowerCase().includes(searchValue)
        );
      }
    });
    setRecords(filteredData);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">GESTIONAR USUARIOS</h1>
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
