import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { obtenerProductos } from "../services/api";

function ProductList({ agregarAlCarrito, busqueda, modo = "full" }) {

  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
        cargarProductos();  
      }, []);

      const cargarProductos = async () => {

        try {
          const data = await obtenerProductos();
          setProductos(data);

        } catch (error) {
          console.log(error);
        }
    };

  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      {/* GRID DE PRODUCTOS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((prod) => (
            <ProductCard
              key={prod.id}
              producto={prod}
              agregarAlCarrito={agregarAlCarrito}
              modo={modo}
              onClick={() => {
                if (modo === "full") {
                  setProductoSeleccionado(prod);
                  setCantidad(1);
                }
              }}
            />
          ))
        ) : (
          <p className="text-white col-span-full text-center">
            No se encontraron productos
          </p>
        )}
      </div>

      {/* MODAL SOLO EN MODO FULL */}
      {productoSeleccionado && modo === "full" && (
        <>
          {/* BACKDROP */}
          <div
            onClick={() => setProductoSeleccionado(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          ></div>

          {/* MODAL */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white p-6 rounded-2xl w-80 relative animate-modal">

              {/* cerrar */}
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="absolute top-2 right-2 text-white"
              >
                ✖
              </button>

              {/* imagen */}
              <img
                src={productoSeleccionado.imagen}
                className="w-full h-40 object-cover rounded"
              />

              {/* nombre */}
              <h2 className="text-xl font-bold mt-4">
                {productoSeleccionado.nombre}
              </h2>

              {/* descripcion */}
              <p className="text-gray-400 mt-2 text-sm">
                {productoSeleccionado.descripcion}
              </p>

              {/* precio */}
              <p className="text-red-500 text-lg mt-2">
                ${productoSeleccionado.precio}
              </p>

              {/* cantidad */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <button
                  onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                  className="bg-red-600 hover:bg-red-700 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  -
                </button>

                <span className="text-xl font-bold">{cantidad}</span>

                <button
                  onClick={() => setCantidad((prev) => prev + 1)}
                  className="bg-green-600 hover:bg-green-700 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  +
                </button>
              </div>

              {/* agregar al carrito */}
              <button
                onClick={() => {
                  agregarAlCarrito(productoSeleccionado, cantidad);
                  setCantidad(1);
                  setProductoSeleccionado(null);
                }}
                className="bg-green-600 w-full py-2 mt-4 rounded"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductList; 