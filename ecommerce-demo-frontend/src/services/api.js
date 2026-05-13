const API_URL =
  "https://e-commerce-advance-proyect.onrender.com/productos";

// OBTENER PRODUCTOS
export const obtenerProductos = async () => {

  const response = await fetch(API_URL);

  const data = await response.json();

  console.log(data);

  return data;

};

// CREAR PRODUCTO
export const crearProducto = async (producto) => {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: obtenerHeaders(),
    body: producto,
  });

  return response.json();

};

// ELIMINAR PRODUCTO
export const eliminarProductoAPI = async (id) => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: obtenerHeaders(),
  });

  return response.json();

};

// ACTUALIZAR PRODUCTO
export const actualizarProducto = async (id, producto) => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: obtenerHeaders(),
    body: producto,
  });

  return response.json();

};

const obtenerHeaders = () => {

  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`
  };

};