const API_URL = "http://gestortareasapi.somee.com/api/tareas";

export const getTasksByProyectId = async (proyectoId) => {
  const respuesta = await fetch(`${API_URL}/tareasporidproyecto/${proyectoId}`);
  const data = (await respuesta).json();
  return data;
};
