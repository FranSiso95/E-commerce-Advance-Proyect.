function Contacto() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-6">

      <div className="max-w-4xl w-full bg-gray-900 text-white rounded-2xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-gray-700 relative">

        <div className="absolute -top-2 -left-2 w-full h-full border-2 border-green-500 rounded-2xl opacity-40"></div>

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-400">
          Contacto
        </h1>

        <p className="text-base md:text-lg leading-relaxed text-gray-300 mb-6">
          Estamos siempre cerca tuyo, listos para preparar tu pedido con la mejor
          onda de barrio.
          <br /><br />
          Podés escribirnos o venir directamente a consultar. Hacemos pedidos
          diarios, encargues especiales para fines de semana y también para
          reuniones familiares.
        </p>

        {/* Caja destacada */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-inner">
          <p>📍 Fábrica de pastas de barrio</p>
          <p>🕒 Atención todos los días con pedidos anticipados</p>
          <p>🍝 Pastas frescas hechas en el momento</p>
          <p>📦 Encargos personalizados</p>
        </div>

      </div>
    </div>
  );
}

export default Contacto;