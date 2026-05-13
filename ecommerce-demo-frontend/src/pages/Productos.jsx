import ProductList from "../components/ProductList";

function Productos({ agregarAlCarrito, busqueda }) {
  return (
    <ProductList
      agregarAlCarrito={agregarAlCarrito}
      busqueda={busqueda}
      modo="full"
    />
  );
}

export default Productos;