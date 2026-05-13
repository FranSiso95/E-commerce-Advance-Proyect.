function Cart({
  carrito,
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto,
  abierto,
  setAbierto,
}) {
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const generarMensaje = () => {
    let mensaje = "Hola! Quiero hacer un pedido:%0A%0A";

    carrito.forEach((item) => {
      mensaje += `- ${item.nombre} x${item.cantidad} → $${item.precio * item.cantidad}%0A`;
    });

    mensaje += `%0ATotal: $${total}`;

    return mensaje;
  };

  return (
    <>
      {/* Fondo oscuro */}
      {abierto && (
        <div
          onClick={() => setAbierto(false)}
          className="fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      {/* Carrito */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-900 text-white shadow-2xl transform transition-transform duration-300 z-50 ${
          abierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-bold">Carrito</h2>
          <button onClick={() => setAbierto(false)}>✖</button>
        </div>

        <div className="p-4 overflow-y-auto h-[70%]">
          {carrito.length === 0 ? (
            <p>Vacío</p>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="mb-4 border-b border-gray-700 pb-2">
                <h3>{item.nombre}</h3>

                <div className="flex gap-2 items-center">
                  <button onClick={() => disminuirCantidad(item.id)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => aumentarCantidad(item.id)}>+</button>
                </div>

                <p>${item.precio * item.cantidad}</p>

                <button
                  onClick={() => eliminarProducto(item.id)}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-700">
          <p className="font-bold mb-2">Total: ${total}</p>

          <button
            onClick={() => {
              const confirmar = window.confirm(
                "¿Querés enviar este pedido por WhatsApp?"
              );

              if (!confirmar) return;

              window.open(
                `https://wa.me/5493516332819?text=${generarMensaje()}`,
                "_blank"
              );
            }}
            className="block text-center bg-green-600 hover:bg-green-700 w-full py-2 rounded"
          >
            Finalizar pedido
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;