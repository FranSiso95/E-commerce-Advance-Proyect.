import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { productos } from "../data/productos";

function Home() {
  return (
    <div>
      <Hero />

      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Productos destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productos.slice(0, 6).map((prod) => (
            <ProductCard
              key={prod.id}
              producto={prod}
              modo="preview"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;