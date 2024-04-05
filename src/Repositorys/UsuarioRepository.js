const API_URL = "http://gestortareasapi.somee.com/api/Usuarios";

export const getUsuarios = async () => {
  const respuesta = await fetch(API_URL);
  const data = (await respuesta).json();
  return data;
};

export const getUsuarioById = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postUsuario = async (usuario) => {
  try {
    const requestBody = {
      nickName: String(usuario.nickName).trim(),
      nombreCompleto: String(usuario.nombreCompleto).trim(),
      correo: String(usuario.correo).trim(),
      clave: String(usuario.clave).trim(),
      rol: String(usuario.rol).trim(),
      activo: usuario.activo,
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

export const putUsuario = async (usuarioId, usuario) => {
  try {
    const requestBody = {
      usuarioId: usuarioId,
      nickName: String(usuario.nickName).trim(),
      nombreCompleto: String(usuario.nombreCompleto).trim(),
      correo: String(usuario.correo).trim(),
      clave: String(usuario.clave).trim(),
      rol: String(usuario.rol).trim(),
      activo: usuario.activo,
    };
    const respuesta = await fetch(`${API_URL}/${usuarioId}`, {
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

export const deleteUsuario = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
};
