function SobreNosotros() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      
      {/* Card principal */}
      <div className="max-w-4xl w-full bg-gray-900 text-white rounded-2xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-gray-700 relative">

        {/* Efecto relieve superior */}
        <div className="absolute -top-2 -left-2 w-full h-full border-2 border-red-500 rounded-2xl opacity-40"></div>

        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-red-400">
          Sobre Nosotros
        </h1>

        {/* Texto */}
        <p className="text-base md:text-lg leading-relaxed text-gray-300">
          Somos una fábrica de pastas caseras de barrio, de esas que todavía
          trabajan como antes: con las manos, con tiempo y con mucho cariño.
          Acá no hay secretos raros ni procesos complicados, solo recetas
          tradicionales que pasan de generación en generación.
          <br /><br />
          Nos gusta pensar que cada plato que sale de nuestra cocina lleva un
          poquito de nuestra historia. Ravioles, tallarines, sorrentinos y
          ñoquis hechos como en casa, para que vos los compartas en la tuya.
          <br /><br />
          Atendemos a vecinos, familias y amigos que buscan comer rico sin
          vueltas, con ese sabor casero que te hace sentir en casa apenas te
          sentás a la mesa.
        </p>
      </div>
    </div>
  );
}

export default SobreNosotros;