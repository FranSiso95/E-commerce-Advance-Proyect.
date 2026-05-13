import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Cart from "./components/Cart";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
 const [carrito, setCarrito] = useState(() => {
  const carritoGuardado = localStorage.getItem("carrito");

  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
});
 const [carritoAbierto, setCarritoAbierto] = useState(false);
 const [busqueda, setBusqueda] = useState("");

 useEffect(() => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}, [carrito]);

const agregarAlCarrito = (producto, cantidad = 1) => {
  const existe = carrito.find((item) => item.id === producto.id);

  if (existe) {
    setCarrito(
      carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      )
    );
  } else {
    setCarrito([...carrito, { ...producto, cantidad }]);
  }
};

    const aumentarCantidad = (id) => {
      setCarrito(
        carrito.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    };

    const disminuirCantidad = (id) => {
      setCarrito(
        carrito
          .map((item) =>
            item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
          )
          .filter((item) => item.cantidad > 0)
      );
    };

    const eliminarProducto = (id) => {
      setCarrito(carrito.filter((item) => item.id !== id));
    };

  return (
  <div className="bg-gray-900 min-h-screen text-white animate-fadeIn">
    <HashRouter>
      <Navbar 
        busqueda={busqueda} 
        setBusqueda={setBusqueda} 
        setCarritoAbierto={setCarritoAbierto}
      />
      <Cart
        carrito={carrito}
        aumentarCantidad={aumentarCantidad}
        disminuirCantidad={disminuirCantidad}
        eliminarProducto={eliminarProducto}
        abierto={carritoAbierto}
        setAbierto={setCarritoAbierto}
      />

      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              agregarAlCarrito={agregarAlCarrito} 
              busqueda={busqueda} 
            />
          } 
        />

        <Route 
          path="/productos" 
          element={
            <Productos 
              agregarAlCarrito={agregarAlCarrito} 
              busqueda={busqueda} 
            />
          } 
        />

        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />

        <Route path="/admin" element={<ProtectedRoute> 
          <Admin /> </ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>

    <a
      href="https://wa.me/5493516332819"
      target="_blank"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg">
        💬
    </a>
</div>  
);
}

export default App;