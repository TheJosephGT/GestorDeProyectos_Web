const API_URL = "http://gestortareasapi.somee.com/api/tareas";

export const getTasks = async () => {
  const respuesta = await fetch(API_URL);
  const data = (await respuesta).json();
  return data;
};

export const getTasksByProyectId = async (proyectoId) => {
  const respuesta = await fetch(`${API_URL}/tareasporidproyecto/${proyectoId}`);
  const data = (await respuesta).json();
  return data;
};

export const postTask = async (task) => {
  try {
    const requestBody = {
      nombre: String(task.nombre).trim(),
      proyectoId: parseInt(task.proyectoId),
      descripcion: String(task.descripcion).trim(),
      estado: String(task.estado).trim(),
      prioridad: String(task.prioridad).trim(),
      activo: task.activo,
      participantes: task.participantes,
    };

    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    await respuesta.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const putTask = async (taskId, task) => {
  try {
    const requestBody = {
      tareaId: taskId,
      nombre: String(task.nombre).trim(),
      proyectoId: parseInt(task.proyectoId),
      descripcion: String(task.descripcion).trim(),
      estado: String(task.estado).trim(),
      prioridad: String(task.prioridad).trim(),
      activo: task.activo,
      participantes: task.participantes,
    };
    const respuesta = await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    console.log(respuesta);
    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
};

export const getTaskById = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
};
