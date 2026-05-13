import { useEffect, useState } from "react";
import {
  obtenerProductos,
  crearProducto,
  eliminarProductoAPI,
  actualizarProducto
} from "../services/api";

function Admin() {

  const [productos, setProductos] = useState([]);

  const [nuevoProducto, setNuevoProducto] = useState({
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  imagen: "",
  categoria: ""
});

const [productoEditando, setProductoEditando] = useState(null);

const [mensaje, setMensaje] = useState("");

 const cargarProductos = async () => {

  try {

    const data = await obtenerProductos();
    setProductos(data);

  } catch (error) {

    console.log(error);

  }

};

  const handleChange = (e) => {

  setNuevoProducto({
    ...nuevoProducto,
    [e.target.name]: e.target.value
  });

};

  useEffect(() => {
    cargarProductos();
  }, []);
  
  

  const eliminarProducto = async (id) => {

    const confirmar = window.confirm(
    "¿Seguro que querés eliminar este producto?"
    );

    if (!confirmar) return;

  try {

    await eliminarProductoAPI(id);

    cargarProductos();

    setMensaje("Producto eliminado correctamente");

    

  } catch(error) {

    console.log(error);

  }

};

  const editarProducto = (producto) => {

    setProductoEditando(producto);

    setNuevoProducto({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      imagen: producto.imagen,
      categoria: producto.categoria
    });

  };

  const agregarProducto = async (e) => {

    e.preventDefault();

      if (!nuevoProducto.nombre.trim()) {
      setMensaje("El nombre es obligatorio");
      return;
      }

      if (!nuevoProducto.precio || nuevoProducto.precio <= 0) {
      setMensaje("El precio debe ser mayor a 0");
      return;
      }

      if (
      nuevoProducto.stock === "" ||
      nuevoProducto.stock < 0
      ) {
      setMensaje("El stock no puede ser negativo");
      return;
      }

    console.log(nuevoProducto);

    try {

      const formData = new FormData();

      formData.append("nombre", nuevoProducto.nombre);
      formData.append("descripcion", nuevoProducto.descripcion);
      formData.append("precio", nuevoProducto.precio);
      formData.append("stock", nuevoProducto.stock);
      formData.append("categoria", nuevoProducto.categoria);

      if (nuevoProducto.imagen) {
        formData.append("imagen", nuevoProducto.imagen);
      }

      if (productoEditando) {

        await actualizarProducto(
          productoEditando.id,
          formData
        );

      } else {

        await crearProducto(formData);

      }

      cargarProductos();

      setMensaje(
        productoEditando
          ? "Producto actualizado correctamente"
          : "Producto agregado correctamente"
      );

      setNuevoProducto({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: "",
        categoria: ""
      });

      setProductoEditando(null);

    } catch(error) {

      console.log(error);

    }
    };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-8">        
        Panel Administrador
      </h1>

      {mensaje && (
        <div className="bg-blue-600 p-3 rounded mb-6">
            {mensaje}
        </div>
      )}

      <form onSubmit={agregarProducto} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

        <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoProducto.nombre}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800"
        />

        <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={nuevoProducto.descripcion}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800"
        />

        <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={nuevoProducto.precio}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800"
        />

        <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={nuevoProducto.stock}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800"
        />

        <input
          type="file"
          name="imagen"
          onChange={(e) => {
            const archivo = e.target.files[0];

            setNuevoProducto((prev) => ({
              ...prev,
              imagen: archivo
            }));

          }}
          className="p-3 rounded bg-gray-800"
        />

        <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            value={nuevoProducto.categoria}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800"
        />

  <button
    type="submit"
    className="bg-green-600 hover:bg-green-700 p-3 rounded col-span-full"
  >
    {productoEditando ? "Actualizar Producto" : "Agregar Producto"}
  </button>

</form>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-700">

          <thead className="bg-gray-900">

            <tr>
              <th className="p-4 border">ID</th>
              <th className="p-4 border">Nombre</th>
              <th className="p-4 border">Precio</th>
              <th className="p-4 border">Stock</th>
              <th className="p-4 border">Acciones</th>
            </tr>

          </thead>

          <tbody>

            {productos.map((producto) => (

              <tr key={producto.id}>

                <td className="p-4 border">
                  {producto.id}
                </td>

                <td className="p-4 border">
                  {producto.nombre}
                </td>

                <td className="p-4 border">
                  ${producto.precio}
                </td>

                <td className="p-4 border">
                  {producto.stock}
                </td>

                <td className="p-4 border">

                  <button
                    onClick={() => editarProducto(producto)}
                    className="bg-yellow-600 px-3 py-1 rounded mr-2"
                    >
                    Editar
                    </button>

                  <button
                    onClick={() => eliminarProducto(producto.id)}
                    className="bg-red-600 px-3 py-1 rounded"
                    >
                    Eliminar
                    </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Admin;