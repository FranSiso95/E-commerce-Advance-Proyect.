import { Link } from "react-router-dom";
import { productos } from "../data/productos";

function Navbar({ busqueda, setBusqueda, setCarritoAbierto }) {
  return (
    <nav className="bg-black text-white p-4 flex flex-wrap justify-between items-center gap-4 shadow-md">

      {/* Logo */}
      <h1 className="text-xl font-bold">Vassanella</h1>

      {/* Links */}
      <div className="flex gap-4 flex-wrap">
        <Link to="/" className="hover:text-red-400">Inicio</Link>
        <Link to="/productos" className="hover:text-red-400">Productos</Link>
        <Link to="/nosotros" className="hover:text-red-400">Nosotros</Link>
        <Link to="/contacto" className="hover:text-red-400">Contacto</Link>
      </div>

      {/* Buscador */}
      <div className="relative w-full md:w-auto">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="bg-white text-black px-3 py-1 rounded w-full md:w-60"
        />

        {busqueda && (
          <div className="absolute bg-white text-black mt-1 rounded shadow w-full z-50 max-h-60 overflow-y-auto">
            {productos
              .filter((p) =>
                p.nombre.toLowerCase().includes(busqueda.toLowerCase())
              )
              .slice(0, 5)
              .map((p) => (
                <div
                  key={p.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {p.nombre}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Carrito */}
      <button onClick={() => setCarritoAbierto(true)} className="text-xl">
        🛒
      </button>
    </nav>
  );
}

export default Navbar;