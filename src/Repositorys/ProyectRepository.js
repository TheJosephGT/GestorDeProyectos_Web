const API_URL = "http://gestortareasapi.somee.com/api/proyectos";

export const getProyects = async () => {
  const respuesta = await fetch(API_URL);
  const data = (await respuesta).json();
  return data;
};

export const getProyectById = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getParticipantesProyecto = async (proyectoId) => {
  const respuesta = await fetch(
    `${API_URL}/participantesproyecto/${proyectoId}`
  );
  const data = (await respuesta).json();
  return data;
};

export const postProyect = async (proyect) => {
  try {
    const requestBody = {
      titulo: String(proyect.titulo).trim(),
      descripcion: String(proyect.descripcion).trim(),
      estado: String(proyect.estado).trim(),
      fechaCreacion: proyect.fechaCreacion,
      progreso: parseInt(proyect.progreso),
      activo: proyect.activo,
      participantes: proyect.participantes,
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

export const putProyect = async (proyectoId, proyect) => {
  try {
    const requestBody = {
      proyectoId: proyectoId,
      titulo: String(proyect.titulo).trim(),
      descripcion: String(proyect.descripcion).trim(),
      estado: String(proyect.estado).trim(),
      fechaCreacion: proyect.fechaCreacion,
      progreso: parseInt(proyect.progreso),
      activo: proyect.activo,
      participantes: proyect.participantes,
    };
    const respuesta = await fetch(`${API_URL}/${proyectoId}`, {
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

export const deleteProyect = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
};
